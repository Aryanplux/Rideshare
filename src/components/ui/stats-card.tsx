"use client"

import * as React from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: number
    suffix?: string
    prefix?: string
    icon: LucideIcon
    trend?: {
        value: number
        isPositive: boolean
    }
    color?: "primary" | "accent" | "secondary"
    delay?: number
}

const colorClasses = {
    primary: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
    accent: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
    secondary: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
}

const iconColorClasses = {
    primary: "text-emerald-500 bg-emerald-500/10",
    accent: "text-amber-500 bg-amber-500/10",
    secondary: "text-blue-500 bg-blue-500/10",
}

export function StatsCard({
    title,
    value,
    suffix = "",
    prefix = "",
    icon: Icon,
    trend,
    color = "primary",
    delay = 0,
}: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm transition-shadow hover:shadow-xl",
                colorClasses[color]
            )}
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity hover:opacity-100" />

            <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: delay + 0.2 }}
                            className="text-3xl font-bold"
                        >
                            {prefix}
                            <CountUp
                                end={value}
                                duration={2}
                                delay={delay}
                                separator=","
                                decimals={suffix === "%" ? 1 : 0}
                            />
                            {suffix}
                        </motion.div>
                    </div>

                    {trend && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: delay + 0.4 }}
                            className={cn(
                                "mt-2 flex items-center gap-1 text-xs font-medium",
                                trend.isPositive ? "text-emerald-500" : "text-red-500"
                            )}
                        >
                            <span>{trend.isPositive ? "↑" : "↓"}</span>
                            <span>{Math.abs(trend.value)}%</span>
                            <span className="text-muted-foreground">vs last month</span>
                        </motion.div>
                    )}
                </div>

                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: delay + 0.3, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn(
                        "rounded-lg p-3",
                        iconColorClasses[color]
                    )}
                >
                    <Icon className="h-6 w-6" />
                </motion.div>
            </div>
        </motion.div>
    )
}
