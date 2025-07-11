import { SignUp } from '@clerk/nextjs'
import { Card, CardContent } from "@/components/ui/card"
import { BackgroundCircles } from "@/components/ui/background-circles"

function page() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-6xl">
                <div className="flex flex-col gap-6">
                    <Card className="overflow-hidden p-0 border-none bg-background">
                        <CardContent className="grid p-0 lg:grid-cols-2">
                            <div className="relative hidden lg:block overflow-hidden min-h-[600px]">
                                <BackgroundCircles 
                                    variant="tertiary"
                                    title="Welcome Aboard"
                                    description="Sign up to start your journey"
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                            <div className="flex items-center justify-center p-8 lg:p-12">
                                <SignUp />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page