import ContributorsOverviewTable from '@/components/ui/contributors-overview-table'
import FileUploadSection from '@/components/FileUploadSection'
import { getFilesByUser } from '@/actions/file.action'
import { SubscriptionStatus } from '@/components/subscription-status'

const dashboardPage = async () => {
  const userFiles = await getFilesByUser()

  return (
    <div className="min-h-[calc(100vh-104px)] bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <FileUploadSection />
            <SubscriptionStatus />
          </div>

          <div className="col-span-1 lg:col-span-3">
            <ContributorsOverviewTable files={userFiles} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default dashboardPage
