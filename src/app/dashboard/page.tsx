"use client"

import { Navbar } from "@/components/layout/Navbar"
import { useAuth } from "@/lib/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/ui/stats-card"
import {
    Car, Calendar, DollarSign, TrendingUp, MapPin, Clock,
    Users, Star, ArrowRight, Plus
} from "lucide-react"
import Link from "next/link"
import { pageVariants, containerVariants, itemVariants } from "@/lib/animations"

export default function DashboardPage() {
    const { isAuthenticated, user, userRole } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/")
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated || !user) {
        return null
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container py-10 px-4 md:px-6">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={pageVariants}
                    className="space-y-8"
                >
                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl font-bold"
                            >
                                Welcome back, {user.name}! 👋
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-muted-foreground"
                            >
                                {userRole === "driver"
                                    ? "Manage your trips and track your earnings"
                                    : "Find rides and manage your bookings"}
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link href={userRole === "driver" ? "/driver/post" : "/passenger/search"}>
                                <Button size="lg" className="gap-2 hover-lift">
                                    <Plus className="h-5 w-5" />
                                    {userRole === "driver" ? "Post New Trip" : "Search Rides"}
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Role-specific Dashboard */}
                    {userRole === "driver" ? <DriverDashboard user={user} /> : <PassengerDashboard user={user} />}
                </motion.div>
            </main>
        </div>
    )
}

function DriverDashboard({ user }: { user: any }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Active Trips"
                    value={3}
                    icon={Car}
                    trend={{ value: 2, isPositive: true }}
                    color="primary"
                    delay={0}
                />
                <StatsCard
                    title="This Week"
                    value={450}
                    prefix="$"
                    icon={DollarSign}
                    trend={{ value: 12, isPositive: true }}
                    color="accent"
                    delay={0.1}
                />
                <StatsCard
                    title="Total Earnings"
                    value={12500}
                    prefix="$"
                    icon={TrendingUp}
                    trend={{ value: 8, isPositive: true }}
                    color="secondary"
                    delay={0.2}
                />
                <StatsCard
                    title="Rating"
                    value={4.9}
                    suffix="/5"
                    icon={Star}
                    color="accent"
                    delay={0.3}
                />
            </div>

            {/* Active Trips & Return Matches */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Trips */}
                <motion.div variants={itemVariants}>
                    <Card className="glass h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Car className="h-5 w-5 text-primary" />
                                Active Trips
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover-lift cursor-pointer">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            <span className="font-medium">New York → Boston</span>
                                        </div>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                            Confirmed
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Tomorrow
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            2:00 PM
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            2/4 seats
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Link href="/driver/trips">
                                <Button variant="outline" className="w-full gap-2">
                                    View All Trips
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Return Match Suggestions */}
                <motion.div variants={itemVariants}>
                    <Card className="glass h-full bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-accent" />
                                Return Match Suggestions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">Boston → New York</span>
                                    <span className="text-accent font-bold">$120</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    3 passengers looking for this route tomorrow evening
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full">
                                        95% Match
                                    </span>
                                    <span className="text-muted-foreground">6:00 PM - 8:00 PM</span>
                                </div>
                            </div>
                            <Button className="w-full gap-2 bg-accent hover:bg-accent/90">
                                View All Matches
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Vehicle Info */}
            {user.vehicleInfo && (
                <motion.div variants={itemVariants}>
                    <Card className="glass">
                        <CardHeader>
                            <CardTitle>Your Vehicle</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-primary/10 rounded-lg">
                                    <Car className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">
                                        {user.vehicleInfo.year} {user.vehicleInfo.make} {user.vehicleInfo.model}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {user.vehicleInfo.seats} seats • License: {user.licenseNumber}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    )
}

function PassengerDashboard({ user }: { user: any }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Upcoming Rides"
                    value={2}
                    icon={Calendar}
                    color="accent"
                    delay={0}
                />
                <StatsCard
                    title="Total Trips"
                    value={24}
                    icon={Car}
                    trend={{ value: 15, isPositive: true }}
                    color="primary"
                    delay={0.1}
                />
                <StatsCard
                    title="Money Saved"
                    value={340}
                    prefix="$"
                    icon={DollarSign}
                    trend={{ value: 20, isPositive: true }}
                    color="accent"
                    delay={0.2}
                />
                <StatsCard
                    title="CO₂ Saved"
                    value={125}
                    suffix=" kg"
                    icon={TrendingUp}
                    color="primary"
                    delay={0.3}
                />
            </div>

            {/* Upcoming Rides & Saved Routes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Rides */}
                <motion.div variants={itemVariants}>
                    <Card className="glass h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-accent" />
                                Upcoming Rides
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover-lift cursor-pointer">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                                            JD
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">New York → Boston</span>
                                                <span className="text-accent font-bold">$35</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                Tomorrow, 2:00 PM
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full">
                                            Confirmed
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                                            4.9
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <Link href="/passenger/bookings">
                                <Button variant="outline" className="w-full gap-2">
                                    View All Bookings
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Saved Routes */}
                <motion.div variants={itemVariants}>
                    <Card className="glass h-full bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                Saved Routes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {["New York → Boston", "Boston → New York"].map((route, i) => (
                                <div key={i} className="p-4 rounded-lg bg-primary/10 border border-primary/20 hover-lift cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{route}</p>
                                            <p className="text-xs text-muted-foreground">Searched 3 times</p>
                                        </div>
                                        <Button size="sm" variant="ghost">
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Link href="/passenger/search">
                                <Button className="w-full gap-2">
                                    Search New Route
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}
