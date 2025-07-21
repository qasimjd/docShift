import React from 'react'
import { ChatForm } from './ChatForm'
import { Message } from 'ai';


const ChatOnSummarySection = ({ fileData, userId, fileId, initialMessages }: { fileData: string; userId: string; fileId: string; initialMessages: Message[] }) => {
    return (
        <ChatForm
            fileData={fileData}
            userId={userId}
            fileId={fileId}
            initialMessages={initialMessages}
        />
    )
}

export default ChatOnSummarySection
