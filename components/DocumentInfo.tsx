import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, HardDrive } from 'lucide-react'

interface Document {
    title: string;
    size: string;
    fileUrl: string;
    uploaded: string | null;
}


const DocumentInfo = ({ document }: { document: Document }) => {
    return (
        <Card className='gradient-card'>
            <CardHeader>
                    <CardTitle>
                        Document Information
                    </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 bg-muted/20 rounded-lg border">
                        <p className="text-xs font-medium text-muted-foreground mb-2">File Name</p>
                        <p className="text-sm font-semibold text-foreground truncate">{document.title}</p>
                    </div>
                    <div className="p-2 bg-muted/20 rounded-lg border">
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2">
                            <Calendar className="h-3 w-3" />
                            Uploaded
                        </p>
                        <p className="text-sm font-semibold text-foreground">{document.uploaded}</p>
                    </div>
                    <div className="p-2 bg-muted/20 rounded-lg border">
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-2">
                            <HardDrive className="h-3 w-3" />
                            File Size
                        </p>
                        <p className="text-sm font-semibold text-foreground">{document.size}</p>
                    </div>
                    <div className="p-2 bg-muted/20 rounded-lg border">
                        <p className="text-xs font-medium text-muted-foreground mb-2">File Type</p>
                        <p className="text-sm font-semibold text-foreground">
                            {document.title.split('.').pop()?.toUpperCase()}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default DocumentInfo
