import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export const fetchAndExtractPdf = async (pdfPath: string) => {
    const response = await fetch(pdfPath);
    if (!response.ok) {
        return {
            success: false,
            message: `Failed to fetch PDF from pdfPath: ${response.statusText}`,
            data: null,
        };
    }
    const pdfBlob = await response.blob();
    const arryBuffer = await pdfBlob.arrayBuffer();
    const loader = new PDFLoader(new Blob([arryBuffer], { type: "application/pdf" }));
    if (!loader) {
        return {
            success: false,
            message: "Failed to create PDFLoader",
            data: null,
        };
    }

    const docs = await loader.load();
    return {
        success: true,
        message: "PDF loaded successfully",
        data: docs.map((doc) => doc.pageContent).join("\n"),
    };
};