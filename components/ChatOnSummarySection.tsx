import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChatForm } from './ChatForm'


const ChatOnSummarySection = ({ fileData }: { fileData: string }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='sr-only'>AI Chat</CardTitle>
            </CardHeader>
            <CardContent className='px-0 lg:px-12'>
                <ChatForm fileData={fileData} />
            </CardContent>
        </Card>
    )
}

export default ChatOnSummarySection
