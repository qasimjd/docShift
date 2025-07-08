import DashboardNav from "@/components/DashboardNav";

export default function DashboardLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <DashboardNav />
            <div className="pt-24">
                {children}
            </div>
        </div>
    );
}
