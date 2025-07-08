import React from 'react'
import { FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SummarySection = ({documentSummary}: {documentSummary:string}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Summary
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border-l-4 border-blue-500">
                        <p className="text-base leading-relaxed text-foreground m-0">
                            {documentSummary}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SummarySection
