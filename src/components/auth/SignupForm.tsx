"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { X, User, Mail, Phone, Lock, Car, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UserRole, useAuth } from "@/lib/context/AuthContext"
import { useRouter } from "next/navigation"

interface SignupFormProps {
    isOpen: boolean
    onClose: () => void
    role: UserRole
}

export function SignupForm({ isOpen, onClose, role }: SignupFormProps) {
    const { signup } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        licenseNumber: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        vehicleSeats: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const userData: any = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        }

        if (role === "driver") {
            userData.licenseNumber = formData.licenseNumber
            userData.vehicleInfo = {
                make: formData.vehicleMake,
                model: formData.vehicleModel,
                year: parseInt(formData.vehicleYear),
                seats: parseInt(formData.vehicleSeats),
            }
        }

        await signup(role, userData)
        onClose()
        router.push("/dashboard")
    }

    if (!isOpen) return null

    return (
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
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-full max-w-md my-8"
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
                            <div className="text-center mb-6">
                                <motion.h2
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl font-bold mb-2"
                                >
                                    Sign Up as {role === "driver" ? "Driver" : "Passenger"}
                                </motion.h2>
                                <p className="text-muted-foreground text-sm">
                                    Create your account to get started
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Driver-specific fields */}
                                {role === "driver" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="space-y-4 pt-4 border-t border-border"
                                    >
                                        <p className="text-sm font-medium text-muted-foreground">Driver Information</p>

                                        {/* License Number */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">License Number</label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    className="pl-9"
                                                    placeholder="DL123456789"
                                                    value={formData.licenseNumber}
                                                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Vehicle Info */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Vehicle Information</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Input
                                                    placeholder="Make (Toyota)"
                                                    value={formData.vehicleMake}
                                                    onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                                                    required
                                                />
                                                <Input
                                                    placeholder="Model (Camry)"
                                                    value={formData.vehicleModel}
                                                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                                                    required
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Year (2020)"
                                                    value={formData.vehicleYear}
                                                    onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                                                    required
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Seats (4)"
                                                    value={formData.vehicleSeats}
                                                    onChange={(e) => setFormData({ ...formData, vehicleSeats: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <Button type="submit" className="w-full hover-lift" size="lg">
                                    Create Account
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    By signing up, you agree to our Terms of Service and Privacy Policy
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    )
}
