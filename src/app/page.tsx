"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatsCard } from "@/components/ui/stats-card"
import { ArrowRight, Calendar, Car, MapPin, ShieldCheck, TrendingUp, Users, Zap, Leaf, DollarSign } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { containerVariants, itemVariants, fadeInVariants } from "@/lib/animations"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Gradient Background */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 -z-10" />

          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col items-center text-center space-y-8"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 pulse-glow">
                  <Zap className="h-3 w-3 mr-1" />
                  New: AI-Powered Return-Ride Optimization
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl"
              >
                Don&apos;t Drive Empty. <br />
                <span className="gradient-text">Maximize Your Return Trip.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-lg md:text-xl max-w-[700px]"
              >
                The first ride-sharing platform designed to fill your empty return leg.
                Save costs, reduce carbon footprint, and travel smarter with AI-powered matching.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <Link href="/driver/post">
                  <Button size="lg" className="w-full sm:w-auto gap-2 group hover-lift">
                    <Car className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    I&apos;m a Driver
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/passenger/search">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 group glass hover-lift">
                    <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    I need a Ride
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-secondary/30 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <StatsCard
                title="Active Drivers"
                value={12500}
                icon={Users}
                trend={{ value: 12, isPositive: true }}
                color="primary"
                delay={0}
              />
              <StatsCard
                title="Trips Completed"
                value={45800}
                icon={Car}
                trend={{ value: 8, isPositive: true }}
                color="secondary"
                delay={0.1}
              />
              <StatsCard
                title="Return Match Rate"
                value={89.5}
                suffix="%"
                icon={TrendingUp}
                trend={{ value: 5, isPositive: true }}
                color="primary"
                delay={0.2}
              />
              <StatsCard
                title="CO₂ Saved"
                value={2340}
                suffix=" tons"
                icon={Leaf}
                trend={{ value: 15, isPositive: true }}
                color="accent"
                delay={0.3}
              />
            </motion.div>
          </div>
        </section>

        {/* Features Grid with Animations */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 hover-lift h-full">
                  <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="p-4 bg-primary/10 rounded-full"
                    >
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Return-First Matching</h3>
                    <p className="text-muted-foreground">
                      Our AI predicts your return trip and proactively matches you with passengers needing a ride back.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-accent/5 to-transparent border-accent/20 hover-lift h-full">
                  <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-4 bg-accent/10 rounded-full"
                    >
                      <Calendar className="h-8 w-8 text-accent" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Flexible Windows</h3>
                    <p className="text-muted-foreground">
                      Passengers can set flexible pickup windows, making it easier to sync with your schedule.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-gradient-to-br from-blue-500/5 to-transparent border-blue-500/20 hover-lift h-full">
                  <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-4 bg-blue-500/10 rounded-full"
                    >
                      <ShieldCheck className="h-8 w-8 text-blue-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Verified & Secure</h3>
                    <p className="text-muted-foreground">
                      ID verification and community ratings ensure a safe journey for everyone.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 -z-10" />
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 md:p-12 text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to <span className="gradient-text">Optimize</span> Your Journey?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join thousands of drivers and passengers who are saving money and reducing their carbon footprint.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/driver/post">
                  <Button size="lg" className="gap-2 hover-lift">
                    Start Driving <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="gap-2 glass">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
