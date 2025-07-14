"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ExternalLink, FileText, Image as ImageIcon, FileVideo, FileAudio } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';

// Utility function to get file type from URL
const getFileType = (url: string): 'pdf' | 'image' | 'video' | 'audio' | 'unknown' => {
    const extension = url.toLowerCase().split('.').pop() || '';
    
    if (extension === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) return 'image';
    if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(extension)) return 'video';
    if (['mp3', 'wav', 'ogg', 'aac', 'm4a'].includes(extension)) return 'audio';
    
    return 'unknown';
};

// Utility function to get file icon
const getFileIcon = (fileType: string) => {
    switch (fileType) {
        case 'pdf':
            return <FileText className="h-8 w-8 text-red-500" />;
        case 'image':
            return <ImageIcon className="h-8 w-8 text-blue-500" />;
        case 'video':
            return <FileVideo className="h-8 w-8 text-purple-500" />;
        case 'audio':
            return <FileAudio className="h-8 w-8 text-green-500" />;
        default:
            return <FileText className="h-8 w-8 text-gray-500" />;
    }
};

const DocumentViewerContent = () => {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');
    const title = searchParams.get('title') || 'Document';

    if (!url) {
        return (
            <div className="container mx-auto px-4 py-8 max-h-screen">
                <Card>
                    <CardContent className="p-8 text-center">
                        <h2 className="text-xl font-semibold mb-4">No Document URL Provided</h2>
                        <p className="text-muted-foreground mb-4">
                            Please provide a valid document URL to view.
                        </p>
                        <Button asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const fileType = getFileType(url);

    const handleDownload = async () => {
        try {
            // For UploadThing URLs, we can download directly
            const response = await fetch(url);
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = title;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the object URL
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback to opening in new tab
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleOpenInNewTab = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                    <Button variant="outline" onClick={handleOpenInNewTab}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in New Tab
                    </Button>
                </div>
            </div>

            {/* Document Viewer */}
            <Card>
                <CardHeader>
                    <CardTitle></CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex">
                    <div className="w-full h-[65vh] relative">
                        {fileType === 'pdf' ? (
                            <div className="w-full h-full">
                                <iframe
                                    src={`${url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                                    className="w-full h-full border-0 rounded-b-lg"
                                    title={title}
                                    loading="lazy"
                                    onError={(e) => {
                                        console.error('PDF iframe failed to load:', e);
                                        // You could set a state here to show fallback UI
                                    }}
                                />
                                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-xs text-muted-foreground">
                                    Use Ctrl+scroll to zoom
                                </div>
                            </div>
                        ) : fileType === 'image' ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <NextImage
                                    src={url}
                                    alt={title || 'Document image'}
                                    width={800}
                                    height={600}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        console.error('Image failed to load:', e);
                                        // You could set a state here to show fallback UI
                                    }}
                                />
                            </div>
                        ) : fileType === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <video
                                    src={url}
                                    className="w-full h-full object-contain"
                                    controls
                                    onError={(e) => {
                                        console.error('Video failed to load:', e);
                                        // You could set a state here to show fallback UI
                                    }}
                                />
                            </div>
                        ) : fileType === 'audio' ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <audio
                                    src={url}
                                    className="w-full"
                                    controls
                                    onError={(e) => {
                                        console.error('Audio failed to load:', e);
                                        // You could set a state here to show fallback UI
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full bg-muted/10">
                                <div className="text-center justify-center space-y-4">
                                    <div className="flex justify-center mb-2">
                                        <span className="text-4xl text-pcolor">{getFileIcon(fileType)}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold">Document Preview Not Available</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        This document type cannot be previewed in the browser. 
                                        Use the download or open in new tab options above.
                                    </p>
                                    <div className="flex justify-center space-x-2">
                                        <Button onClick={handleDownload}>
                                            <Download className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                        <Button variant="outline" onClick={handleOpenInNewTab}>
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Open in New Tab
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

const DocumentViewer = () => {
    return (
        <Suspense fallback={
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardContent className="p-8 text-center">
                        <div className="animate-pulse">
                            <div className="h-4 bg-muted rounded w-1/4 mx-auto mb-4"></div>
                            <div className="h-8 bg-muted rounded w-1/2 mx-auto"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        }>
            <DocumentViewerContent />
        </Suspense>
    );
};

export default DocumentViewer;
