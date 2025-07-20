import React from 'react'
import { ArrowBigLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import DocumentInfo from '@/components/DocumentInfo';
import FilePreviewSection from '@/components/FilePreviewSection';
import SummarySection from '@/components/SummarySection';
import { getFilesById } from '@/actions/file.action';
import { getFileSize, formatDate } from '@/lib/utils';
import ChatOnSummarySection from '@/components/ChatOnSummarySection';


const summaryPage = async ({ params }: { params: Promise<{ id?: string }> }) => {
    const { id } = await params;

    if (!id) throw new Error("Document ID is required");
    const documentData = await getFilesById(id);

    const document = {
        title: documentData.title,
        size: getFileSize(documentData.fileSize),
        fileUrl: documentData.fileUrl,
        uploaded: formatDate(documentData.createdAt),
        fileData: documentData.fileData
    };

    console.log("Fetched document:", documentData)

    return (
        <div className="px-6 max-w-6xl mx-auto space-y-6 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Document Details</h1>
                <Button variant="link" asChild>
                    <Link href="/dashboard">
                        <ArrowBigLeft className="h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>

            {/* Document Info and File Preview Section - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Document Info Section */}
                <DocumentInfo document={document} />

                {/* File Preview Section */}
                <FilePreviewSection documentName={document.title} documentUrl={document.fileUrl} />
            </div>

            {/* Summary Section */}
            {documentData.summary && <SummarySection documentSummary={documentData.summary} />}

            {/* Additional Details */}
            <ChatOnSummarySection fileData={document.fileData} />
        </div>
    )
}

export default summaryPage
