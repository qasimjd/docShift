"use client";

import { useUploadThing } from "@/lib/uploadthing";
import React from 'react'
import FileUpload from "./FileUpload";
import { toast } from "sonner";
import { generatePDFSummary } from "@/actions/upload.actin";

const FileUploadSection = () => {
    const { startUpload } = useUploadThing("pdfUploader", {
        onClientUploadComplete: (res) => {
            console.log("Upload completed successfully!", res);
        },
        onUploadError: (error) => {
            console.error("Upload error:", error);
        },
        onUploadBegin: (file) => {
            console.log("Upload beginning for file:", file);
        },
    });

    const onSuccess = async (file: File) => {
        try {
            const res = await startUpload([file]);

            if (res && res.length > 0) {
                const uploadResult = res[0];
                const pdfFile = uploadResult.serverData;
                const summaary = await generatePDFSummary(pdfFile);
                if (summaary?.success === false) {
                    toast.error(summaary.message);
                    return;
                }
                console.log("PDF Summary:", summaary);

            } else {
                toast.error("Upload failed: No response received");
            }
        } catch (error) {
            console.error("Upload failed with error:", error);
        }
    }

    return (
        <>
            <FileUpload
                acceptedFileTypes={["/pdf"]}
                maxFileSize={20 * 1024 * 1024}
                onUploadSuccess={onSuccess}
                onUploadError={(error) => { toast.error(`File upload failed: ${error.message || error}`); }}
            />
        </>
    )
}

export default FileUploadSection
