"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "passenger" | "driver" | null

interface User {
    id: string
    name: string
    email: string
    role: UserRole
    phone: string
    avatar?: string
    // Driver-specific
    licenseNumber?: string
    vehicleInfo?: {
        make: string
        model: string
        year: number
        seats: number
    }
}

interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    userRole: UserRole
    login: (email: string, password: string) => Promise<void>
    signup: (role: UserRole, userData: Partial<User>) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("rideshare_user")
        if (savedUser) {
            const userData = JSON.parse(savedUser)
            setUser(userData)
            setIsAuthenticated(true)
        }
    }, [])

    const login = async (email: string, password: string) => {
        // Mock login - in real app, this would call an API
        // For demo, check if user exists in localStorage
        const savedUser = localStorage.getItem("rideshare_user")
        if (savedUser) {
            const userData = JSON.parse(savedUser)
            if (userData.email === email) {
                setUser(userData)
                setIsAuthenticated(true)
            }
        }
    }

    const signup = async (role: UserRole, userData: Partial<User>) => {
        // Mock signup - create user object
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: userData.name || "",
            email: userData.email || "",
            role: role,
            phone: userData.phone || "",
            avatar: userData.avatar,
            licenseNumber: userData.licenseNumber,
            vehicleInfo: userData.vehicleInfo,
        }

        // Save to localStorage
        localStorage.setItem("rideshare_user", JSON.stringify(newUser))
        setUser(newUser)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("rideshare_user")
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                userRole: user?.role || null,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
