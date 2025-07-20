"use client"

import { cn } from "@/lib/utils"
import { useChat } from "@ai-sdk/react"
import { ArrowUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"
import { Message } from "ai"
import { saveChatMessage } from "@/actions/message.action"

interface ChatFormProps extends React.ComponentProps<"form"> {
    fileData: string
    userId: string
    fileId: string
    initialMessages: Message[]
}

export function ChatForm({ className, fileData, userId, fileId, initialMessages, ...props }: ChatFormProps) {
    const { messages, input, setInput, append } = useChat({
        api: "/api/chat",
        body: { fileData: fileData || "", userId, fileId },
        initialMessages: initialMessages || [],
    })

    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const el = scrollRef.current
        if (el) {
            el.scrollTop = el.scrollHeight
        }
    }, [messages])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const messageContent = input.trim()
        if (!messageContent) return
        void append({ content: messageContent, role: "user" })
        saveChatMessage({
            fileId,
            userId,
            role: "user",
            content: messageContent,
        })
        setInput("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
        }
    }

    const header = (
        <header className="m-auto flex max-w-96 flex-col gap-5 text-center">
            <h1 className="text-2xl font-semibold">Chat with AI</h1>
            <p className="text-muted-foreground text-sm">
                Discuss your document with our AI assistant. Ask questions, get summaries, and more.
                <br />
                <span className="text-xs">Press Enter to send a message</span>
            </p>
        </header>
    )

    const { user } = useUser();
    const messageList = (
        <div className="my-4 flex min-h-full flex-col gap-4">
            {messages.map((m, i) => {
                const isUser = m.role === "user";
                const userImage = user?.imageUrl || ""

                return (
                    <div
                        key={i}
                        className={cn(
                            "flex items-start gap-3",
                            isUser ? "justify-end" : "justify-start"
                        )}
                    >
                        {!isUser && (
                            <Avatar>
                                <AvatarImage src="/ai.png" alt="AI Avatar" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        )}

                        <div
                            data-role={m.role}
                            className={cn(
                                "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                                isUser
                                    ? "self-end bg-pcolor text-white"
                                    : "self-start bg-gray-100 text-black"
                            )}
                        >
                            {m.content}
                        </div>

                        {isUser && (
                            <Avatar>
                                <AvatarImage src={userImage} alt="User Avatar" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                );
            })}
        </div>
    );


    return (
        <main
            className={cn(
                "mx-auto flex h-[70vh] w-full max-w-[55rem] flex-col",
                className,
            )}
            {...props}
        >
            {/* attach ref here */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:px-6">
                {messages.length ? messageList : header}
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative mx-6 mb-6 flex items-center rounded-[16px] border px-3 py-1.5 pr-8
                   focus-within:ring-2 focus-within:ring-ring/10"
            >
                <AutoResizeTextarea
                    onKeyDown={handleKeyDown}
                    onChange={setInput}
                    value={input}
                    placeholder="Enter a message"
                    className="flex-1 bg-transparent placeholder:text-muted-foreground focus:outline-none"
                />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="absolute bottom-1 right-1 size-6 rounded-full">
                            <ArrowUpIcon size={16} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={12}>Submit</TooltipContent>
                </Tooltip>
            </form>
        </main>
    )
}