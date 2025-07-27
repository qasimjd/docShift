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
import { formatBytes } from "../FileUpload";

interface File {
  id: string;
  userId: string;
  title: string;
  fileUrl: string;
  fileData: string;
  fileSize: number;
  summary: string | null;
  hasSummary: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

function ContributorsOverviewTable({ files }: { files: File[] }) {
  const router = useRouter();

  const handleRowClick = (documentId: string) => {
    router.push(`/dashboard/summary/${documentId}`);
  };

  return (
    <div
      className="max-w-4xl mx-auto rounded-xl gradient-card shadow-sm flex flex-col"
      style={{ maxHeight: "calc(100vh - 12rem)", minHeight: "calc(100vh - 12rem)" }}
    >
      <div className="p-6 pb-4">
        <h2 className="text-xl font-semibold text-foreground">Recent File Uploads</h2>
      </div>

      <div className="flex-1 overflow-auto px-6">
        <Table className="table-fixed">
          <TableHeader className="sticky top-0 z-10 rounded-full bg-black hover:bg-black/80">
            <TableRow className="text-white bg-black hover:bg-black/80 rounded-full">
              <TableHead className="w-[250px] text-/40">File Name</TableHead>
              <TableHead className="hidden lg:table-cell text-white">Uploaded</TableHead>
              <TableHead className="hidden lg:table-cell text-white">Size</TableHead>
              <TableHead className="text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex flex-col items-center justify-center pt-12">
                    <FileText className="size-36 opacity-30 text-black" />
                    <p className="mt-4 text-center text-gray-500 lg:px-28">
                        No files uploaded yet. Start by uploading a PDF document to generate summaries.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              files.map((file) => (
                <TableRow
                  key={file.id}
                  className="hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(file.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex gap-1 items-center max-w-[220px] truncate">
                      <FileText className="size-5 text-pcolor flex-shrink-0" />
                      <span className="truncate">{file.title || "Untitled Document"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {file.createdAt ? new Date(file.createdAt).toLocaleDateString() : "Unknown"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{formatBytes(file.fileSize)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        file.hasSummary
                          ? "text-white bg-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "text-white bg-red-600 dark:bg-blue-900/20 dark:text-red-400"
                      }`}
                    >
                      {file.hasSummary ? "Success" : "Failed"}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-6 pt-4">
        <p className="text-center text-sm text-muted-foreground">
          File upload history and processing status
        </p>
      </div>
    </div>
  );
}

export default ContributorsOverviewTable;
