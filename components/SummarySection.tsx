import React from 'react'
import { FileText, AlertCircle, CheckCircle2, Star, BookOpen, Target, Lightbulb, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SummarySectionProps {
    documentSummary: string;
}

interface ParsedSection {
    title: string;
    bullets: string[];
    paragraphs: string[];
}

interface ParsedSections {
    [key: string]: ParsedSection;
}

const SummarySection = ({ documentSummary }: SummarySectionProps) => {

    // Enhanced markdown parser to handle structured sections
    const parseStructuredMarkdown = (content: string): ParsedSections => {
        const sections = content.split('##').filter(section => section.trim());
        const parsedSections: ParsedSections = {};

        sections.forEach(section => {
            const lines = section.trim().split('\n');
            const sectionTitle = lines[0].trim();
            const sectionContent = lines.slice(1).join('\n').trim();

            // Parse bullet points
            const bulletPoints = sectionContent
                .split('\n')
                .filter(line => line.trim().startsWith('•'))
                .map(line => line.replace(/^•\s*/, '').trim());

            // Parse regular paragraphs (non-bullet content)
            const paragraphs = sectionContent
                .split('\n')
                .filter(line => !line.trim().startsWith('•') && line.trim() && !line.includes('---'))
                .map(line => line.trim())
                .filter(line => line);

            parsedSections[sectionTitle.toLowerCase()] = {
                title: sectionTitle,
                bullets: bulletPoints,
                paragraphs: paragraphs
            };
        });

        return parsedSections;
    };

    // Process bold text in content
    const processBoldText = (text: string) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">$1</strong>');
    };

    const sections = parseStructuredMarkdown(documentSummary);

    // Fallback to simple parsing if structured format isn't found
    const renderFallbackContent = () => {
        const paragraphs = documentSummary.split('\n\n');
        return paragraphs.map((paragraph, index) => {
            if (paragraph.includes('•') || paragraph.includes('-')) {
                const bulletPoints = paragraph.split('\n').filter(line =>
                    line.trim().startsWith('•') || line.trim().startsWith('-')
                );

                if (bulletPoints.length > 0) {
                    return (
                        <ul key={index} className="space-y-3 my-4">
                            {bulletPoints.map((point, pointIndex) => (<li key={pointIndex} className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: processBoldText(point.replace(/^[•-]\s*/, '')) }} />
                            </li>
                            ))}
                        </ul>
                    );
                }
            }

            return (
                <p key={index} className="text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: processBoldText(paragraph) }} />
            );
        });
    };

    return (
        <Card className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/50 dark:via-amber-950/30 dark:to-yellow-950/30 rounded-2xl sm:p-8 border border-orange-200 dark:border-orange-700 shadow-inner relative">
            <CardHeader className="pb-6">
                <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center gap-1">
                        <FileText className="h-6 w-6 text-pcolor" />
                        <span className="text-gray-900 dark:text-gray-100 max-sm:text-sm">Document Summary</span>
                    </div>
                    <Badge variant="secondary" className="bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 max-sm:text-xs">
                        <BookOpen className="h-3 w-3 mr-1" />
                        AI Generated
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Single Unified Section with Step-by-Step Content */}
                <div className="relative">
                    <div className="space-y-8 relative z-10">

                        {/* Check if we have structured content */}
                        {Object.keys(sections).length > 0 ? (
                            <>
                                {/* Step 1: Document Overview */}
                                {sections['document overview'] && (
                                    <div className="relative">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Target className="h-5 w-5 text-orange-600" />
                                                    <h3 className="font-semibold text-orange-900 dark:text-orange-100 text-base">Document Overview</h3>
                                                </div>
                                                <div className="space-y-2">
                                                    {sections['document overview'].paragraphs.map((paragraph: string, index: number) => (
                                                        <p key={index} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-orange-200 dark:border-orange-800"
                                                            dangerouslySetInnerHTML={{ __html: processBoldText(paragraph) }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Key Highlights */}
                                {sections['key highlights'] && (
                                    <div className="relative">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Star className="h-5 w-5 text-orange-500" />
                                                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 text-base">Key Highlights</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {sections['key highlights'].bullets.map((bullet: string, index: number) => (
                                                        <li key={index} className="flex items-start gap-3 pl-4">
                                                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                                            <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                                                                dangerouslySetInnerHTML={{ __html: processBoldText(bullet) }} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Important Details */}
                                {sections['important details'] && (
                                    <div className="relative">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Lightbulb className="h-5 w-5 text-orange-400" />
                                                    <h3 className="font-semibold text-orange-700 dark:text-orange-300 text-base">Important Details</h3>
                                                </div>
                                                <ul className="space-y-3">
                                                    {sections['important details'].bullets.map((bullet: string, index: number) => (
                                                        <li key={index} className="flex items-start gap-3 pl-4">
                                                            <AlertCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                                            <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                                                                dangerouslySetInnerHTML={{ __html: processBoldText(bullet) }} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Impact & Relevance */}
                                {sections['impact & relevance'] && (
                                    <div className="relative">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <TrendingUp className="h-5 w-5 text-orange-300" />
                                                    <h3 className="font-semibold text-orange-600 dark:text-orange-400 text-base">Impact & Relevance</h3>
                                                </div>
                                                <div className="space-y-2">
                                                    {sections['impact & relevance'].paragraphs.map((paragraph: string, index: number) => (
                                                        <p key={index} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-orange-200 dark:border-orange-800"
                                                            dangerouslySetInnerHTML={{ __html: processBoldText(paragraph) }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Fallback for non-structured content */
                            <div className="relative">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FileText className="h-5 w-5 text-orange-600" />
                                            <h3 className="font-semibold text-orange-900 dark:text-orange-100 text-base">Document Summary</h3>
                                        </div>
                                        <div className="prose prose-gray dark:prose-invert max-w-none pl-4">
                                            {renderFallbackContent()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SummarySection
