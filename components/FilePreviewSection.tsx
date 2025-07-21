"use client";

import React from 'react'
import { FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const FilePreviewSection = ({documentName, documentUrl}: {documentName: string, documentUrl:string}) => {
    const router = useRouter();

    const handleViewDocument = () => {
        // Always use our internal document viewer for all files
        router.push(`/document-viewer?url=${encodeURIComponent(documentUrl)}&title=${encodeURIComponent(documentName)}`);
    };


    return (
        <Card className='gradient-card'>
            <CardHeader>
                <CardTitle>File Preview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center">
                    <div
                        className="cursor-pointer hover:scale-105 transition-transform duration-200 p-4 rounded-lg hover:bg-muted/50"
                        onClick={handleViewDocument}
                    >
                        <FileText className="size-16 text-pcolor" />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-lg font-semibold text-foreground">{documentName}</p>
                        <p className="text-sm text-muted-foreground">Click the icon above to view the document</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default FilePreviewSection
