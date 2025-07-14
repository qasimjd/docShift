"use server";

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';


export const generateSummaryWithGemini = async (fileText: string) => {
    if (!fileText) {
        throw new Error("File text is required to generate a summary");
    }

    try {
        const { text } = await generateText({
            model: google("gemini-1.5-flash"),
            system:
                "You are an expert AI writing assistant for a document summarization platform called DocShift. " +
                "You generate clear, professional, and concise summaries that help users quickly understand the key ideas in a document. " +
                "You write in a neutral, informative tone suitable for students, professionals, and researchers. " +
                "Always provide structured, actionable summaries that save users time.",
            prompt: `
Create a comprehensive, beautifully structured markdown summary with clear sections. Use the exact format below:

## Document Overview
**[Start with a compelling 1-2 sentence description of what this document is and its main purpose]**

## Key Highlights
• **[Most important point 1]**
• **[Most important point 2]**  
• **[Most important point 3]**
• **[Most important point 4]**

## Important Details
• **[Critical detail or finding 1]**
• **[Critical detail or finding 2]**
• **[Critical detail or finding 3]**

## Impact & Relevance
**[2-3 sentences about who this matters to, practical applications, and next steps]**

---

**FORMATTING RULES:**
- Always use **bold text** for important terms and key phrases
- Use bullet points (•) for all lists
- Keep each bullet point concise but informative
- Use ## headers for sections exactly as shown
- Make the content scannable and easy to digest
- Focus on actionable insights and key takeaways

**CONTENT GUIDELINES:**
- Document Overview: Clearly state what type of document this is and its primary purpose
- Key Highlights: 4 most important points, findings, or arguments
- Important Details: Specific data, methods, qualifications, or notable information
- Impact & Relevance: Who benefits, practical value, and future implications

Document to Summarize:
${fileText}
  `,
        });

        return text;

    } catch (error: any) {
        console.error("Error generating summary:", error);

        // Handle specific OpenAI error types
        if (error?.cause?.statusCode === 429 || error?.message?.includes('quota')) {
            throw new Error("QUOTA_EXCEEDED");
        }

        if (error?.cause?.statusCode === 401) {
            throw new Error("API_KEY_INVALID");
        }

        if (error?.cause?.statusCode >= 500) {
            throw new Error("SERVICE_UNAVAILABLE");
        }

        throw new Error("AI_PROCESSING_FAILED");
    }
};
