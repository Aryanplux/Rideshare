import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-muted shimmer",
                className
            )}
            {...props}
        />
    )
}

function SkeletonCard() {
    return (
        <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
            <Skeleton className="h-3 w-40" />
        </div>
    )
}

function SkeletonRideCard() {
    return (
        <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    )
}

export { Skeleton, SkeletonCard, SkeletonRideCard }
