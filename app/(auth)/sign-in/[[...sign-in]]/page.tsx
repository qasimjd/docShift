import { SignIn } from '@clerk/nextjs'
import { Card, CardContent } from "@/components/ui/card"
import { BackgroundCircles } from "@/components/ui/background-circles"

function page() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-6xl">
                <div className="flex flex-col gap-4 sm:gap-6">
                    <Card className="overflow-hidden p-0 border-none bg-background">
                        <CardContent className="grid p-0 md:grid-cols-1 lg:grid-cols-2">
                            {/* Sign-in form section */}
                            <div className="flex items-center justify-center mx-auto sm:p-6 md:p-8 lg:p-12 order-2 lg:order-2">
                                <div className="w-full max-w-sm">
                                    <SignIn />
                                </div>
                            </div>
                            
                            {/* Background section - now visible on all screens but with responsive design */}
                            <div className="relative overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[600px] order-1 lg:order-1">
                                <BackgroundCircles 
                                    variant="tertiary"
                                    title="Welcome Back"
                                    description="Sign in to continue your journey"
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* Terms and Privacy section */}
                    <div className="text-balance text-center text-xs sm:text-sm text-muted-foreground px-2 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page