import ContributorsOverviewTable from '@/components/ui/contributors-overview-table'
// import ActivityWrapper from '@/components/ActivityWrapper'
// import { CreditInfo } from '@/components/ui/activity-card'
import FileUploadSection from '@/components/FileUploadSection'
import { getFilesByUser } from '@/actions/file.action'
import { SubscriptionStatus } from '@/components/subscription-status'

const dashboardPage = async () => {

    const userFiles = await getFilesByUser();


    return (
        <>
            {/* Main Content */}
            <main className="container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                    {/* Left Column - File Upload & Statistics */}
                    <div className="space-y-6 col-span-2 sm:space-y-6">

                        {/* File Upload Section */}
                        <section className="w-full">
                            <FileUploadSection />
                        </section>

                        {/* Statistics Card */}
                        <section className="w-full">
                            <SubscriptionStatus />
                        </section>
                    </div>

                    {/* Right Column - Recent Activity */}
                    <div className="w-full col-span-3">
                        <ContributorsOverviewTable files={userFiles} />
                    </div>
                </div>
            </main>
        </>
    )
}

export default dashboardPage
