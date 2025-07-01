'use client';
import { Upload, FileText, Search, MessageCircleQuestion, Share2, DollarSign } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const features = [
	{
		title: 'Upload Any Document',
		icon: Upload,
		description: 'Upload PDFs, Word docs, or text files instantly and start getting insights.',
	},
	{
		title: 'Smart Summaries',
		icon: FileText,
		description: 'Get summaries, bullet points, or TL;DRs tailored to your needs.',
	},
	{
		title: 'AI-Powered Search',
		icon: Search,
		description: 'Search across all your documents with intelligent AI technology.',
	},
	{
		title: 'Ask Questions',
		icon: MessageCircleQuestion,
		description: 'Ask questions about your documents and get smart, contextual answers.',
	},
	{
		title: 'Share & Save',
		icon: Share2,
		description: 'Share, download, or save your document summaries with ease.',
	},
	{
		title: 'Affordable Pricing',
		icon: DollarSign,
		description: 'Affordable pricing with a generous free tier to get you started.',
	},
];

export default function DemoOne() {
	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto w-full max-w-5xl space-y-8 px-4">
				<AnimatedContainer className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
						Why DocSift?
					</h2>
					<p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
						Reading takes time. Understanding takes effort. DocSift saves both. Whether you're a student, a legal professional, or a business owner, DocSift gives you instant insights from any document.
					</p>
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.4}
					className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
				>
					{features.map((feature, i) => (
						<FeatureCard key={i} feature={feature} />
					))}
				</AnimatedContainer>
			</div>
		</section>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 1 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
