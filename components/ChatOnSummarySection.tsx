import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChatForm } from './ChatForm'
import { Message } from 'ai';


const ChatOnSummarySection = ({ fileData, userId, fileId, initialMessages }: { fileData: string; userId: string; fileId: string; initialMessages: Message[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='sr-only'>AI Chat</CardTitle>
            </CardHeader>
            <CardContent className='px-0 lg:px-12'>
                <ChatForm
                    fileData={fileData}
                    userId={userId}
                    fileId={fileId}
                    initialMessages={initialMessages}
                />
            </CardContent>
        </Card>
    )
}

export default ChatOnSummarySection
