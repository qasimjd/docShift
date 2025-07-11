"use client";

import { useUploadThing } from "@/lib/uploadthing";
import React, { useState, useRef } from 'react'
import FileUpload, { formatBytes } from "./FileUpload";
import { toast } from "sonner";
import { generatePDFSummary } from "@/actions/upload.actino";

const FileUploadSection = () => {
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
    const uploadToastRefs = useRef<Record<string, string | number>>({});

    const { startUpload } = useUploadThing("pdfUploader", {
        onClientUploadComplete: (res) => {
            const fileName = res[0].name;
            if (uploadToastRefs.current[fileName]) {
                toast.dismiss(uploadToastRefs.current[fileName]);
            }
            toast.success(`${fileName} uploaded successfully!`, {
                description: `File size: ${formatBytes(res[0].size)}`,
                duration: 4000,
            });

            setUploadingFiles(prev => {
                const newSet = new Set(prev);
                newSet.delete(fileName);
                return newSet;
            });
            setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[fileName];
                return newProgress;
            });
            delete uploadToastRefs.current[fileName];

            console.log("Upload completed successfully:", res);
        },
        onUploadError: (error) => {
            const failedFiles = Array.from(uploadingFiles);
            failedFiles.forEach(fileName => {
                if (uploadToastRefs.current[fileName]) {
                    toast.dismiss(uploadToastRefs.current[fileName]);
                }
                toast.error(`Failed to upload ${fileName}`, {
                    description: error.message || "Unknown error occurred",
                    duration: 5000,
                });
            });

            setUploadingFiles(new Set());
            setUploadProgress({});
            uploadToastRefs.current = {};

            console.error("Upload error:", error);
        },
        onUploadBegin: (file) => {
            const fileName = file;

            setUploadingFiles(prev => new Set([...prev, fileName]));

            setUploadProgress(prev => ({ ...prev, [fileName]: 0 }));

            const toastId = toast.loading(
                `Uploading ${fileName}...`,
                {
                    description: "Preparing file for upload",
                    duration: Infinity,
                }
            );

            uploadToastRefs.current[fileName] = toastId;

            console.log("Upload beginning for file:", {
                name: fileName,
                timestamp: new Date().toISOString(),
                uploadId: toastId,
            });
        },

        onUploadProgress: (progress) => {
            console.log("Upload progress:", progress);

            setUploadProgress(prev => {
                const newProgress = { ...prev };
                uploadingFiles.forEach(fileName => {
                    newProgress[fileName] = progress;

                    if (uploadToastRefs.current[fileName]) {
                        toast.loading(
                            `Uploading ${fileName}... ${Math.round(progress)}%`,
                            {
                                id: uploadToastRefs.current[fileName],
                                description: `Progress: ${Math.round(progress)}% complete`,
                            }
                        );
                    }
                });
                return newProgress;
            });
        },
    });

    const onSuccess = async (file: File) => {
        try {
            toast.info(`Starting upload for ${file.name}`, {
                description: `File size: ${formatBytes(file.size)}`,
                duration: 2000,
            });

            const res = await startUpload([file]);

            if (res && res.length > 0) {
                const uploadResult = res[0];
                const pdfFile = uploadResult.serverData;

                if (!pdfFile) {
                    toast.error("Upload failed: No file data received");
                    return;
                }

                const processingToast = toast.loading(
                    `Processing ${file.name}...`,
                    {
                        description: "Generating AI summary of your document",
                        duration: Infinity,
                    }
                );

                try {
                    const response = await generatePDFSummary(pdfFile);
                    const pdfSummary = response?.data?.summary;
                    const savedFile = response?.data?.savedFile;
                    toast.dismiss(processingToast);

                    if (response?.success === false) {
                        toast.error(`Processing failed for ${file.name}`, {
                            description: response.message,
                            duration: 5000,
                        });
                        return;
                    }

                    // Show success for processing
                    toast.success(`${file.name} processed successfully!`, {
                        description: "Document summary has been generated",
                        duration: 4000,
                    });

                    console.log("PDF Summary generated:", {
                        fileName: savedFile?.title,
                        pdfSummary,
                        timestamp: new Date().toISOString(),
                    });

                } catch (summaryError) {
                    toast.dismiss(processingToast);
                    toast.error(`Failed to process ${file.name}`, {
                        description: "Error generating document summary",
                        duration: 5000,
                    });
                    console.error("Summary generation failed:", summaryError);
                }

            } else {
                toast.error("Upload failed: No response received");
            }
        } catch (error) {
            console.error("Upload failed with error:", error);
            toast.error(`Upload failed for ${file.name}`, {
                description: error instanceof Error ? error.message : "Unknown error occurred",
                duration: 5000,
            });
        }
    }

    return (
        <>
            <FileUpload
                acceptedFileTypes={["/pdf"]}
                maxFileSize={20 * 1024 * 1024}
                onUploadSuccess={onSuccess}
                onUploadError={(error) => {
                    toast.error(`File validation failed`, {
                        description: error.message || "Please check your file and try again",
                        duration: 4000,
                    });
                }}
            />
        </>
    )
}

export default FileUploadSection
