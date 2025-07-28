"use client"

import { cn } from "@/lib/utils"
import { useChat } from "@ai-sdk/react"
import { ArrowUpIcon, Lock, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea } from "@/components/autoresize-textarea"
import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"
import { Message } from "ai"
import { saveChatMessage } from "@/actions/message.action"
import Link from "next/link"

interface ChatFormProps extends React.ComponentProps<"form"> {
    fileData: string
    userId: string
    fileId: string
    initialMessages: Message[]
}

interface UserPlan {
    plan: 'free' | 'pro'
}

export function ChatForm({ className, fileData, userId, fileId, initialMessages, ...props }: ChatFormProps) {
    const { user } = useUser()
    const [userPlan, setUserPlan] = useState<UserPlan | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserPlan = async () => {
            try {
                const response = await fetch('/api/stripe/subscription')
                if (response.ok) {
                    const data = await response.json()
                    setUserPlan({ plan: data.user.plan })
                }
            } catch (error) {
                console.error('Error fetching user plan:', error)
                setUserPlan({ plan: 'free' })
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchUserPlan()
        } else {
            setLoading(false)
        }
    }, [user])

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
        <header className="m-auto flex max-w-96 flex-col gap-5 text-center mt-10">
            <h1 className="text-2xl font-semibold">Chat with AI</h1>
            <p className="text-muted-foreground text-sm">
                Discuss your document with our AI assistant. Ask questions, get summaries, and more.
                <br />
                <span className="text-xs">Press Enter to send a message</span>
            </p>
        </header>
    )

    const messageList = (
        <div className="my-4 py-6 flex min-h-full flex-col gap-4">
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
                                "max-w-[65%] rounded-xl px-3 py-2 text-sm",
                                isUser
                                    ? "self-end bg-black text-white"
                                    : "self-start chat-gradeant"
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

    // Show loading state
    if (loading) {
        return (
            <main className={cn("mx-auto flex h-[70vh] w-full max-w-6xl flex-col gradient-card", className)} {...props}>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
            </main>
        )
    }

    const isPro = userPlan?.plan === 'pro'

    return (
        <main
            className={cn(
                "mx-auto flex h-[70vh] w-full max-w-6xl flex-col gradient-card relative",
                className,
            )}
            {...props}
        >
            {/* Protected Layer Overlay for Free Users */}
            {!isPro && (
                <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                    <div className="gradient-card p-8 rounded-2xl shadow-2xl max-w-sm mx-4 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900/30">
                                <Lock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Pro Feature Locked
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                            AI Chat is available for Pro users only. Upgrade your plan to unlock this feature and start chatting with your documents.
                        </p>

                        <Button 
                            asChild
                            className="w-full hover:shadow-xl transition-all duration-200"
                        >
                            <Link href="/#pricing" className="flex items-center justify-center gap-2">
                                <Crown className="w-4 h-4" />
                                Upgrade to Pro
                            </Link>
                        </Button>
                    </div>
                </div>
            )}

            <div className={cn("flex-1 overflow-y-auto p-4 md:px-6", !isPro && "blur-sm pointer-events-none")} ref={scrollRef}>
                {messages.length ? messageList : header}
            </div>

            <form
                onSubmit={handleSubmit}
                className={cn(
                    "relative mx-6 mb-6 flex items-center rounded-[16px] border-2 border-black dark:border-pcolor px-3 py-1.5 pr-8 focus-within:ring-2 focus-within:ring-ring/10",
                    !isPro && "blur-sm pointer-events-none"
                )}
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
                            <ArrowUpIcon size={16} className="text-black dark:text-pcolor" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={12}>Submit</TooltipContent>
                </Tooltip>
            </form>
        </main>
    )
}