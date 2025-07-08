"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const documents = [
    {
        id: "1",
        name: "document-analysis.pdf",
        uploaded: "2 hours ago",
        size: "2.4 MB",
        status: "Success",
    },
    {
        id: "2",
        name: "financial-report.xlsx",
        uploaded: "5 hours ago",
        size: "1.8 MB",
        status: "Success",
    },
    {
        id: "3",
        name: "presentation-slides.pptx",
        uploaded: "1 day ago",
        size: "12.3 MB",
        status: "Processing",
    },
    {
        id: "4",
        name: "contract-agreement.docx",
        uploaded: "2 days ago",
        size: "856 KB",
        status: "Processing",
    },
    {
        id: "5",
        name: "user-manual.pdf",
        uploaded: "3 days ago",
        size: "4.1 MB",
        status: "Success",
    },
    {
        id: "6",
        name: "design-mockups.zip",
        uploaded: "1 week ago",
        size: "15.7 MB",
        status: "Failed",
    },
    {
        id: "7",
        name: "design-mockups.zip",
        uploaded: "1 week ago",
        size: "15.7 MB",
        status: "Failed",
    },
    {
        id: "8",
        name: "design-mockups.zip",
        uploaded: "1 week ago",
        size: "15.7 MB",
        status: "Failed",
    },
    {
        id: "9",
        name: "design-mockups.zip",
        uploaded: "1 week ago",
        size: "15.7 MB",
        status: "Failed",
    },
];

function ContributorsOverviewTable() {
    const router = useRouter();

    const handleRowClick = (documentId: string) => {
        router.push(`/dashboard/summary/${documentId}`);
    };

    return (
        <div className="max-w-4xl mx-auto rounded-xl border border-border bg-background shadow-sm flex flex-col" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
            <div className="p-6 pb-4">
                <h2 className="text-xl font-semibold text-foreground">Recent File Uploads</h2>
            </div>
            <div className="flex-1 overflow-auto px-6">
                <Table className="table-fixed">
                    <TableHeader className="sticky top-0 bg-background z-10">
                        <TableRow>
                            <TableHead className="w-[250px]">File Name</TableHead>
                            <TableHead className="hidden lg:table-cell">Uploaded</TableHead>
                            <TableHead className="hidden lg:table-cell">Size</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {documents.map((document) => (
                            <TableRow 
                                key={document.id} 
                                className="hover:bg-muted/40 transition-colors cursor-pointer"
                                onClick={() => handleRowClick(document.id)}
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-1">
                                        <FileText className="size-5 text-pcolor" />
                                        {document.name}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">{document.uploaded}</TableCell>
                                <TableCell className="hidden lg:table-cell">{document.size}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${document.status === "Success"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                            : document.status === "Processing"
                                                ? "bg-orange-100 text-orange-600 dark:bg-blue-900/20 dark:text-orange-400"
                                                : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                                            }`}
                                    >
                                        {document.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="p-6 pt-4">
                <p className="text-center text-sm text-muted-foreground">File upload history and processing status</p>
            </div>
        </div>
    );
}

export default ContributorsOverviewTable;
