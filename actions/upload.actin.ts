"use server";

import { fetchAndExtractPdf } from "@/lib/langchain";


export const generatePDFSummary = async (pdfFile: PDFFile) => {
    
    if (!pdfFile || !pdfFile.fileUrl) {
        return {
            success: false,
            message: "Invalid PDF file data",
            data: null,
        };
    };

    try {
        const pdfText = await fetchAndExtractPdf(pdfFile.fileUrl);
        console.log("Extracted PDF text:", pdfText);
        
    } catch (error) {
        console.error("Error generating PDF summary:", error);
        return {
            success: false,
            message: "Failed to generate PDF summary",
            data: null,
        };        
    }
};