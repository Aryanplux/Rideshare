"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Leaf, Menu, X, LogOut, LayoutDashboard } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/context/AuthContext"
import { RoleSelectionModal } from "@/components/auth/RoleSelectionModal"
import { SignupForm } from "@/components/auth/SignupForm"
import { UserRole } from "@/lib/context/AuthContext"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [showSignupForm, setShowSignupForm] = useState(false)
    const [selectedRole, setSelectedRole] = useState<UserRole>(null)
    const pathname = usePathname()
    const { scrollY } = useScroll()
    const { isAuthenticated, user, logout, userRole } = useAuth()

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(15, 23, 42, 0.0)", "rgba(15, 23, 42, 0.95)"]
    )

    const backdropBlur = useTransform(
        scrollY,
        [0, 100],
        ["blur(0px)", "blur(20px)"]
    )

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleRoleSelect = (role: UserRole) => {
        setSelectedRole(role)
        setShowRoleModal(false)
        setShowSignupForm(true)
    }

    const handleSignup = () => {
        setShowRoleModal(true)
    }

    // Role-based navigation
    const guestNavLinks = [
        { href: "/driver/post", label: "Drive" },
        { href: "/passenger/search", label: "Ride" },
        { href: "/how-it-works", label: "How it Works" },
    ]

    const driverNavLinks = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/driver/post", label: "Post Trip" },
        { href: "/driver/trips", label: "My Trips" },
    ]

    const passengerNavLinks = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/passenger/search", label: "Find Ride" },
        { href: "/passenger/bookings", label: "My Bookings" },
    ]

    const navLinks = isAuthenticated
        ? userRole === "driver"
            ? driverNavLinks
            : passengerNavLinks
        : guestNavLinks

    return (
        <>
            <motion.header
                style={{ backgroundColor, backdropFilter: backdropBlur }}
                className="sticky top-0 z-50 w-full border-b border-border/40 transition-all"
            >
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="bg-primary p-1.5 rounded-lg"
                        >
                            <Car className="h-5 w-5 text-primary-foreground" />
                        </motion.div>
                        <span className="group-hover:text-primary transition-colors">
                            Ride<span className="text-primary">Share</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group"
                            >
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:text-primary transition-colors"
                                >
                                    {link.label}
                                </motion.span>
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        {!isAuthenticated && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full"
                            >
                                <Leaf className="h-3 w-3" />
                                <span>Eco-Friendly</span>
                            </motion.div>
                        )}

                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-sm">
                                        {user?.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium">{user?.name}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" className="hover-lift">Log in</Button>
                                <Button size="sm" className="hover-lift" onClick={handleSignup}>Sign up</Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isMobileMenuOpen ? "auto" : 0,
                        opacity: isMobileMenuOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden overflow-hidden border-t border-border/40"
                >
                    <nav className="container py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-sm font-medium hover:text-primary transition-colors ${pathname === link.href ? "text-primary" : ""
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-sm">
                                            {user?.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{user?.name}</p>
                                            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={logout} className="w-full gap-2">
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" className="w-full">Log in</Button>
                                    <Button size="sm" className="w-full" onClick={handleSignup}>Sign up</Button>
                                </>
                            )}
                        </div>
                    </nav>
                </motion.div>
            </motion.header>

            {/* Modals */}
            <RoleSelectionModal
                isOpen={showRoleModal}
                onClose={() => setShowRoleModal(false)}
                onSelectRole={handleRoleSelect}
            />
            <SignupForm
                isOpen={showSignupForm}
                onClose={() => setShowSignupForm(false)}
                role={selectedRole}
            />
        </>
    )
}
