"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Calendar, Clock, MapPin, Sparkles, Users, Check, TrendingUp } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { pageVariants, itemVariants, containerVariants } from "@/lib/animations"
import Confetti from "react-confetti"
import { useWindowSize } from "@/lib/hooks"

export default function DriverPostPage() {
    const [step, setStep] = useState<"form" | "prediction" | "confirmed">("form")
    const [selectedReturn, setSelectedReturn] = useState<number | null>(null)
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useWindowSize()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setStep("prediction")
    }

    const handleConfirm = () => {
        setStep("confirmed")
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
    }

    const steps = [
        { id: 1, name: "Trip Details", status: step === "form" ? "current" : "complete" },
        { id: 2, name: "Return Match", status: step === "prediction" ? "current" : step === "confirmed" ? "complete" : "upcoming" },
        { id: 3, name: "Confirmation", status: step === "confirmed" ? "current" : "upcoming" },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}

            <main className="flex-1 container py-10 px-4 md:px-6">
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    className="max-w-2xl mx-auto space-y-8"
                >
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between">
                        {steps.map((s, index) => (
                            <div key={s.id} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.1, type: "spring" }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${s.status === "complete"
                                                ? "bg-primary text-primary-foreground"
                                                : s.status === "current"
                                                    ? "bg-primary/20 text-primary ring-4 ring-primary/20"
                                                    : "bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        {s.status === "complete" ? <Check className="h-5 w-5" /> : s.id}
                                    </motion.div>
                                    <span className="text-xs mt-2 font-medium">{s.name}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="flex-1 h-0.5 bg-secondary mx-2">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: s.status === "complete" ? "100%" : "0%" }}
                                            transition={{ duration: 0.5 }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold"
                        >
                            Post a Trip
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground"
                        >
                            Share your ride and let us find your return match.
                        </motion.p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === "form" ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="glass-strong">
                                    <CardHeader>
                                        <CardTitle>Trip Details</CardTitle>
                                        <CardDescription>Where are you heading?</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="space-y-2"
                                                >
                                                    <label className="text-sm font-medium">From</label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input className="pl-9 transition-all focus:ring-2 focus:ring-primary" placeholder="City A" required />
                                                    </div>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="space-y-2"
                                                >
                                                    <label className="text-sm font-medium">To</label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input className="pl-9 transition-all focus:ring-2 focus:ring-primary" placeholder="City B" required />
                                                    </div>
                                                </motion.div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="space-y-2"
                                                >
                                                    <label className="text-sm font-medium">Date</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input className="pl-9 transition-all focus:ring-2 focus:ring-primary" type="date" required />
                                                    </div>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="space-y-2"
                                                >
                                                    <label className="text-sm font-medium">Time</label>
                                                    <div className="relative">
                                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input className="pl-9 transition-all focus:ring-2 focus:ring-primary" type="time" required />
                                                    </div>
                                                </motion.div>
                                            </div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <Button type="submit" className="w-full group hover-lift" size="lg">
                                                    Find Matches & Post
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </motion.div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : step === "prediction" ? (
                            <motion.div
                                key="prediction"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <Card className="border-primary/50 bg-gradient-to-br from-primary/10 to-transparent glass-strong">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-primary mb-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Sparkles className="h-5 w-5" />
                                            </motion.div>
                                            <span className="font-semibold text-sm uppercase tracking-wider">AI Prediction</span>
                                        </div>
                                        <CardTitle className="text-2xl">High Return Demand Detected!</CardTitle>
                                        <CardDescription>
                                            We found <span className="font-bold text-foreground">3 potential passengers</span> looking for a return ride from City B to City A on your selected date.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-primary/20"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-primary/20 rounded-full">
                                                    <Users className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Estimated Earnings</p>
                                                    <p className="text-xs text-muted-foreground">Includes return leg bonus</p>
                                                </div>
                                            </div>
                                            <div className="text-2xl font-bold text-emerald-500">$120 - $150</div>
                                        </motion.div>
                                    </CardContent>
                                </Card>

                                <div className="grid gap-4">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                        Recommended Return Slots
                                    </h3>
                                    {[1, 2].map((i, index) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                        >
                                            <Card
                                                className={`cursor-pointer transition-all hover-lift ${selectedReturn === i
                                                        ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                                                        : 'hover:border-primary/50'
                                                    }`}
                                                onClick={() => setSelectedReturn(i)}
                                            >
                                                <CardContent className="p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-center p-2 bg-secondary rounded-lg min-w-[60px]">
                                                            <p className="text-xs font-medium uppercase text-muted-foreground">Return</p>
                                                            <p className="font-bold">6:00 PM</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">City B <ArrowRight className="inline h-3 w-3 mx-1" /> City A</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">
                                                                    95% Match Probability
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant={selectedReturn === i ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedReturn(i)
                                                        }}
                                                    >
                                                        {selectedReturn === i ? <><Check className="h-4 w-4 mr-1" /> Selected</> : "Select"}
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1" onClick={() => setStep("form")}>
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1 hover-lift"
                                        onClick={handleConfirm}
                                        disabled={!selectedReturn}
                                    >
                                        Confirm Trip
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="confirmed"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
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
                                                Trip Published!
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-muted-foreground max-w-md"
                                            >
                                                Your trip from City A to City B is live. We've also reserved your return slot preference.
                                            </motion.p>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="p-4 bg-background/50 rounded-lg border w-full max-w-sm"
                                        >
                                            <p className="text-sm font-medium text-muted-foreground mb-2">Next Steps</p>
                                            <ul className="text-sm text-left space-y-2">
                                                {["Wait for passenger requests", "Review and approve riders", "Earn bonus on return leg completion"].map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + index * 0.1 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                        {item}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                        <Button onClick={() => setStep("form")} variant="outline" className="hover-lift">
                                            Post Another Trip
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </main>
        </div>
    )
}
