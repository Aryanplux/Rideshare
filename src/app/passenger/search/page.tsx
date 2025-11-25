"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SkeletonRideCard } from "@/components/ui/skeleton"
import { Calendar, Clock, Filter, MapPin, Search, Star, Zap, Check } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { pageVariants, containerVariants, itemVariants } from "@/lib/animations"

export default function PassengerSearchPage() {
    const [flexible, setFlexible] = useState(true)
    const [searched, setSearched] = useState(false)
    const [booked, setBooked] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setBooked(false)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setSearched(true)
        }, 1500)
    }

    const handleBook = () => {
        setBooked(true)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-10 px-4 md:px-6">
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-3xl font-bold">Find a Ride</h1>
                            <p className="text-muted-foreground">Book your seat on a verified return trip.</p>
                        </motion.div>
                        {!booked && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg"
                            >
                                <Button
                                    variant={flexible ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setFlexible(true)}
                                    className="text-xs transition-all"
                                >
                                    Flexible Window
                                </Button>
                                <Button
                                    variant={!flexible ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setFlexible(false)}
                                    className="text-xs transition-all"
                                >
                                    Fixed Time
                                </Button>
                            </motion.div>
                        )}
                    </div>

                    {!booked ? (
                        <>
                            {/* Search Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="border-none shadow-lg bg-gradient-to-br from-secondary/20 to-transparent glass-strong">
                                    <CardContent className="p-4">
                                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="relative"
                                            >
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9 bg-background transition-all focus:ring-2 focus:ring-primary" placeholder="From City A" defaultValue="New York" />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="relative"
                                            >
                                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9 bg-background transition-all focus:ring-2 focus:ring-primary" placeholder="To City B" defaultValue="Boston" />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="relative"
                                            >
                                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9 bg-background transition-all focus:ring-2 focus:ring-primary" type="date" />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <Button type="submit" className="w-full gap-2 hover-lift group">
                                                    <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                    Search
                                                </Button>
                                            </motion.div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Loading State */}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground">Searching for rides...</p>
                                    </div>
                                    {[1, 2].map((i) => (
                                        <SkeletonRideCard key={i} />
                                    ))}
                                </motion.div>
                            )}

                            {/* Results */}
                            {searched && !loading && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className="space-y-4"
                                >
                                    <motion.div
                                        variants={itemVariants}
                                        className="flex items-center justify-between"
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            Showing <span className="font-medium text-foreground">3 rides</span> for <span className="font-medium text-foreground">Today</span>
                                        </p>
                                        <Button variant="ghost" size="sm" className="gap-2 hover-lift">
                                            <Filter className="h-4 w-4" /> Filter
                                        </Button>
                                    </motion.div>

                                    {/* Result Card 1 - Best Match */}
                                    <motion.div variants={itemVariants}>
                                        <Card className="hover:border-primary transition-all cursor-pointer group hover-lift glass">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                                    <div className="flex items-center gap-4">
                                                        <motion.div
                                                            whileHover={{ scale: 1.1 }}
                                                            className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-lg border border-primary/20"
                                                        >
                                                            JD
                                                        </motion.div>
                                                        <div>
                                                            <h3 className="font-semibold flex items-center gap-2">
                                                                John Doe
                                                                <span className="flex items-center text-xs font-normal text-muted-foreground">
                                                                    <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" /> 4.9
                                                                </span>
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                                <motion.span
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ delay: 0.3, type: "spring" }}
                                                                    className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1"
                                                                >
                                                                    <Zap className="h-3 w-3" /> Return Leg Deal
                                                                </motion.span>
                                                                <span>• Toyota Camry</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold">14:00</p>
                                                            <p className="text-xs text-muted-foreground">City A</p>
                                                        </div>
                                                        <div className="flex flex-col items-center px-4 relative">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: "5rem" }}
                                                                transition={{ delay: 0.4, duration: 0.5 }}
                                                                className="h-[2px] bg-border absolute top-1/2 -translate-y-1/2"
                                                            />
                                                            <span className="text-xs text-muted-foreground bg-background px-2 relative z-10">4h 30m</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold">18:30</p>
                                                            <p className="text-xs text-muted-foreground">City B</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                                                        <div className="text-right">
                                                            <motion.span
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ delay: 0.5, type: "spring" }}
                                                                className="text-2xl font-bold text-emerald-500"
                                                            >
                                                                $35
                                                            </motion.span>
                                                            <p className="text-xs text-muted-foreground line-through">$50 standard</p>
                                                        </div>
                                                        <Button className="w-full md:w-auto hover-lift group" onClick={handleBook}>
                                                            Book Seat
                                                            <motion.span
                                                                className="ml-2"
                                                                animate={{ x: [0, 4, 0] }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                            >
                                                                →
                                                            </motion.span>
                                                        </Button>
                                                    </div>
                                                </div>

                                                {flexible && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        transition={{ delay: 0.6 }}
                                                        className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-muted-foreground"
                                                    >
                                                        <Clock className="h-4 w-4 text-primary" />
                                                        <span>Flexible Window: Driver can wait ±30 mins for pickup.</span>
                                                    </motion.div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>

                                    {/* Result Card 2 */}
                                    <motion.div variants={itemVariants}>
                                        <Card className="hover:border-primary/50 transition-all cursor-pointer opacity-75 hover:opacity-100 hover-lift glass">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center font-bold text-lg border border-secondary/20">
                                                            AS
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold flex items-center gap-2">
                                                                Alice Smith
                                                                <span className="flex items-center text-xs font-normal text-muted-foreground">
                                                                    <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" /> 4.8
                                                                </span>
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                                <span>• Honda Civic</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold">16:00</p>
                                                            <p className="text-xs text-muted-foreground">City A</p>
                                                        </div>
                                                        <div className="flex flex-col items-center px-4 relative">
                                                            <div className="h-[2px] w-20 bg-border absolute top-1/2 -translate-y-1/2" />
                                                            <span className="text-xs text-muted-foreground bg-background px-2 relative z-10">4h 45m</span>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold">20:45</p>
                                                            <p className="text-xs text-muted-foreground">City B</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                                                        <div className="text-right">
                                                            <span className="text-2xl font-bold">$48</span>
                                                        </div>
                                                        <Button variant="outline" className="w-full md:w-auto hover-lift" onClick={handleBook}>
                                                            Book Seat
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Card className="border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-transparent glass-strong">
                                <CardContent className="pt-6 flex flex-col items-center text-center space-y-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, rotate: 360 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                        className="h-20 w-20 bg-emerald-500 rounded-full flex items-center justify-center"
                                    >
                                        <Check className="h-10 w-10 text-white" />
                                    </motion.div>
                                    <div className="space-y-2">
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-3xl font-bold text-emerald-600"
                                        >
                                            Booking Requested!
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-muted-foreground max-w-md"
                                        >
                                            We've sent your request to the driver. You'll be notified once they accept.
                                        </motion.p>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="p-4 bg-background/50 rounded-lg border w-full max-w-sm"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm text-muted-foreground">Total Fare</span>
                                            <span className="text-xl font-bold text-emerald-500">$35.00</span>
                                        </div>
                                        <Button className="w-full hover-lift" variant="outline" onClick={() => setBooked(false)}>
                                            Search More Rides
                                        </Button>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </main>
        </div>
    )
}
