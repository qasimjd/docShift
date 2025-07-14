import ContributorsOverviewTable from "@/components/ui/contributors-overview-table";

// Mock data for demo purposes
const mockFiles = [
  {
    id: "1",
    userId: "user-1",
    title: "Project Requirements.pdf",
    fileUrl: "https://example.com/file1.pdf",
    fileData: "Sample file data",
    fileSize: 2048576, // 2MB
    summary: "This document outlines the key requirements for the project including technical specifications and deliverables.",
    hasSummary: true,
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "2",
    userId: "user-2",
    title: "Meeting Notes Q1.docx",
    fileUrl: "https://example.com/file2.docx",
    fileData: "Meeting notes content",
    fileSize: 512000, // 512KB
    summary: "Quarterly meeting notes covering project progress, team updates, and strategic planning.",
    hasSummary: true,
    createdAt: new Date("2024-01-10T14:15:00Z"),
    updatedAt: new Date("2024-01-10T14:15:00Z"),
  },
  {
    id: "3",
    userId: "user-1",
    title: "Budget Analysis.xlsx",
    fileUrl: "https://example.com/file3.xlsx",
    fileData: "Budget spreadsheet data",
    fileSize: 1024000, // 1MB
    summary: null,
    hasSummary: false,
    createdAt: new Date("2024-01-05T09:45:00Z"),
    updatedAt: new Date("2024-01-05T09:45:00Z"),
  },
  {
    id: "4",
    userId: "user-3",
    title: "Technical Documentation.md",
    fileUrl: "https://example.com/file4.md",
    fileData: "Markdown documentation",
    fileSize: 256000, // 256KB
    summary: "Comprehensive technical documentation covering system architecture and implementation details.",
    hasSummary: true,
    createdAt: new Date("2024-01-02T16:20:00Z"),
    updatedAt: new Date("2024-01-02T16:20:00Z"),
  },
];

const DemoOne = () => {
  return <ContributorsOverviewTable files={mockFiles} />;
};

export { DemoOne };
