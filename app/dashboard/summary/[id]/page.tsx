import React from 'react'
import { ArrowBigLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import DocumentInfo from '@/components/DocumentInfo';
import FilePreviewSection from '@/components/FilePreviewSection';
import SummarySection from '@/components/SummarySection';
import { getFilesById } from '@/actions/file.action';
import { getFileSize, formatDate } from '@/lib/utils';


const summaryPage = async ({ params }: { params: Promise<{ id?: string }> }) => {
    const { id } = await params;

    if (!id) throw new Error("Document ID is required");
    const documentData = await getFilesById(id);

    // Transform the document data to match the expected interface
    const document = {
        title: documentData.title,
        size: getFileSize(documentData.fileSize),
        fileUrl: documentData.fileUrl,
        uploaded: formatDate(documentData.createdAt),
    };

    console.log("Fetched document:", documentData)

    return (
        <div className="px-6 max-w-6xl mx-auto space-y-6">
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
            <Card>
                <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Document ID</p>
                            <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{id}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default summaryPage
