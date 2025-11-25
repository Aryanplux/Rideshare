"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Car, User, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserRole } from "@/lib/context/AuthContext"

interface RoleSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSelectRole: (role: UserRole) => void
}

export function RoleSelectionModal({ isOpen, onClose, onSelectRole }: RoleSelectionModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="w-full max-w-3xl"
                        >
                            <Card className="glass-strong border-primary/20">
                                <CardContent className="p-8">
                                    {/* Close button */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>

                                    {/* Header */}
                                    <div className="text-center mb-8">
                                        <motion.h2
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-3xl font-bold mb-2"
                                        >
                                            Choose Your Role
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-muted-foreground"
                                        >
                                            Select how you want to use RideShare
                                        </motion.p>
                                    </div>

                                    {/* Role Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Passenger Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            onClick={() => onSelectRole("passenger")}
                                            className="cursor-pointer"
                                        >
                                            <Card className="border-2 border-transparent hover:border-accent transition-all bg-gradient-to-br from-accent/10 to-transparent h-full">
                                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4 h-full">
                                                    <motion.div
                                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                                        className="p-4 bg-accent/20 rounded-full"
                                                    >
                                                        <User className="h-12 w-12 text-accent" />
                                                    </motion.div>
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl font-bold mb-2">I'm a Passenger</h3>
                                                        <p className="text-muted-foreground text-sm">
                                                            Find affordable rides and save money on your trips
                                                        </p>
                                                    </div>
                                                    <ul className="text-sm text-left space-y-2 w-full">
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                            Search for rides
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                            Book seats easily
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                                                            Save on return trips
                                                        </li>
                                                    </ul>
                                                    <Button className="w-full group bg-accent hover:bg-accent/90">
                                                        Continue as Passenger
                                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>

                                        {/* Driver Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            onClick={() => onSelectRole("driver")}
                                            className="cursor-pointer"
                                        >
                                            <Card className="border-2 border-transparent hover:border-primary transition-all bg-gradient-to-br from-primary/10 to-transparent h-full">
                                                <CardContent className="p-6 flex flex-col items-center text-center space-y-4 h-full">
                                                    <motion.div
                                                        whileHover={{ rotate: -5, scale: 1.1 }}
                                                        className="p-4 bg-primary/20 rounded-full"
                                                    >
                                                        <Car className="h-12 w-12 text-primary" />
                                                    </motion.div>
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl font-bold mb-2">I'm a Driver</h3>
                                                        <p className="text-muted-foreground text-sm">
                                                            Earn money by sharing your rides and filling empty seats
                                                        </p>
                                                    </div>
                                                    <ul className="text-sm text-left space-y-2 w-full">
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            Post your trips
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            Earn on return legs
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                            AI-powered matching
                                                        </li>
                                                    </ul>
                                                    <Button className="w-full group">
                                                        Continue as Driver
                                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
