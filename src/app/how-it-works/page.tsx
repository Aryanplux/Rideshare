import { Navbar } from "@/components/layout/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Car, Search, ShieldCheck } from "lucide-react"

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-10 px-4 md:px-6">
                <div className="max-w-3xl mx-auto space-y-10">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold">How RideShare Works</h1>
                        <p className="text-xl text-muted-foreground">
                            Connecting drivers with empty return seats to passengers looking for a ride.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Car className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <h3 className="text-2xl font-bold">1. Drivers Post a Trip</h3>
                                <p className="text-muted-foreground">
                                    Drivers enter their trip details. Our AI immediately predicts demand for the return leg and suggests the best time to return to maximize earnings.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <Search className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <h3 className="text-2xl font-bold">2. Passengers Find a Match</h3>
                                <p className="text-muted-foreground">
                                    Passengers search for rides. They can opt for a "Flexible Window" to get better rates and help drivers fill their seats.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <ShieldCheck className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <h3 className="text-2xl font-bold">3. Travel & Save</h3>
                                <p className="text-muted-foreground">
                                    Book the ride securely. Drivers earn more by monetizing their return trip, and passengers travel comfortably for less.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Card className="bg-secondary/20 border-none">
                        <CardContent className="p-8 text-center space-y-4">
                            <h3 className="text-2xl font-bold">Ready to get started?</h3>
                            <p className="text-muted-foreground">Join thousands of users saving money and the planet.</p>
                            <div className="flex justify-center gap-4">
                                <a href="/driver/post" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                                    Drive Now
                                </a>
                                <a href="/passenger/search" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                    Find a Ride
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
