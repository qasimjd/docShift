import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid"
import {
    Upload,
    Brain,
    Search,
    Download,
} from "lucide-react";

const howItWorksItems: BentoItem[] = [
    {
        title: "Upload Your Document",
        meta: "Step 1",
        description:
            "Drag and drop or paste content. We support PDF, DOCX, and TXT files.",
        icon: <Upload className="w-4 h-4 text-blue-500" />,
        status: "Ready",
        tags: ["PDF", "DOCX", "TXT"],
        colSpan: 1,
        hasPersistentHover: false,
        cta: "Upload now →"
    },
    {
        title: "AI Summarization",
        meta: "Step 2",
        description: "Our AI instantly breaks down your document into a clear, human-readable summary.",
        icon: <Brain className="w-4 h-4 text-emerald-500" />,
        status: "Processing",
        tags: ["AI", "Smart"],
        colSpan: 2,
        hasPersistentHover: true,
        cta: "See magic →"
    },
    {
        title: "Interactive Exploration",
        meta: "Step 3",
        description: "Search, ask questions, and extract key points using natural language.",
        icon: <Search className="w-4 h-4 text-purple-500" />,
        status: "Interactive",
        tags: ["Search", "Q&A"],
        colSpan: 2,
        hasPersistentHover: false,
        cta: "Explore →"
    },
    {
        title: "Download & Share",
        meta: "Step 4",
        description: "Export your summary or send it directly to colleagues.",
        icon: <Download className="w-4 h-4 text-sky-500" />,
        status: "Export",
        tags: ["Share", "Export"],
        colSpan: 1,
        hasPersistentHover: false,
        cta: "Share now →"
    },
];

function BentoGridDemo() {
    return (
		<section className="py-16 md:py-28 w-full mx-auto max-w-5xl" id='how-it-works'>
			<div className="mx-auto space-y-8 px-4">
                <h2 className="text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
                    How It Works
                </h2>
                <p className="text-center mt-5 opacity-75">
                    Transform your documents into actionable insights with our AI-powered platform in just four simple steps.
                </p>
                <BentoGrid items={howItWorksItems} />
            </div>
        </section>
    )
}

export { BentoGridDemo }
