"use client"

import { useEffect, useState, useRef } from "react"
import { PartyPopper, Stars, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CongratulationsPage() {
    const [animateText, setAnimateText] = useState(false)
    const particlesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Trigger animation after component mounts
        setAnimateText(true)

        // Create random particles
        if (particlesRef.current) {
            const container = particlesRef.current
            container.innerHTML = ""

            for (let i = 0; i < 100; i++) {
                const particle = document.createElement("div")

                // Random properties
                const size = Math.random() * 8 + 4
                const posX = Math.random() * 100
                const posY = Math.random() * 100
                const delay = Math.random() * 5
                const duration = Math.random() * 10 + 10
                const color = [
                    "rgba(255, 0, 93, 0.8)",
                    "rgba(131, 56, 236, 0.8)",
                    "rgba(58, 134, 255, 0.8)",
                    "rgba(255, 190, 11, 0.8)",
                    "rgba(251, 86, 7, 0.8)",
                ][Math.floor(Math.random() * 5)]

                // Apply styles
                particle.className = "absolute rounded-full"
                particle.style.width = `${size}px`
                particle.style.height = `${size}px`
                particle.style.backgroundColor = color
                particle.style.left = `${posX}%`
                particle.style.top = `${posY}%`
                particle.style.opacity = "0"
                particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`
                particle.style.boxShadow = `0 0 ${size * 2}px ${color}`

                container.appendChild(particle)
            }
        }
    }, [])

    return (
        <div
            className="relative w-full overflow-hidden flex items-center justify-center"
            style={{ minHeight: "calc(100vh - 155px)" }}
        >
            {/* Animated background elements */}
            <div ref={particlesRef} className="absolute inset-0 z-0 overflow-hidden" />

            {/* Floating circles */}
            <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={`circle-${i}`}
                        className="absolute rounded-full opacity-60 blur-md animate-float"
                        style={{
                            width: `${Math.random() * 200 + 50}px`,
                            height: `${Math.random() * 200 + 50}px`,
                            background: `radial-gradient(circle, rgba(255, 0, 93, 0.2) 0%, rgba(131, 56, 236, 0.1) 70%, transparent 100%)`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 20 + 20}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20 text-center p-8 max-w-3xl mx-auto">
                <div
                    className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${animateText ? "scale-100 opacity-100" : "scale-90 opacity-0"
                        }`}
                >
                    <div className="flex justify-center mb-6 gap-4">
                        <PartyPopper className="h-12 w-12 text-[rgba(255,190,11,0.9)] animate-bounce" />
                        <Stars className="h-12 w-12 text-[rgba(255,0,93,0.9)] animate-spin duration-4000" />
                        <Rocket className="h-12 w-12 text-[rgba(58,134,255,0.9)] animate-float" />
                    </div>
                    <h1 className="text-[clamp(3rem,5vw,6rem)] font-bold mb-6 text-center bg-gradient-to-r from-[#FF005D] via-[#8338EC] to-[#3A86FF] bg-clip-text text-transparent animate-pulse w-full">
                        Congratulations!
                    </h1>
                    <div className="bg-[rgba(23,15,36,0.7)] backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_30px_rgba(255,0,93,0.3),0_0_15px_rgba(131,56,236,0.3)_inset] border border-[rgba(255,255,255,0.1)] animate-glow">
                        <h2 className="text-[clamp(1.5rem,5vw,2.5rem)] font-semibold mb-4 text-white ">
                            You've Successfully Joined ABCD!
                        </h2>

                        <p className="text-[clamp(1rem,3vw,1.25rem)] text-[rgba(255,255,255,0.8)] mb-8 leading-relaxed">
                            We're thrilled to welcome you to our community. Get ready for an amazing journey ahead!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-gradient-to-r from-[#FF005D] to-[#8338EC] text-white font-medium py-6 px-8 text-lg border-none shadow-[0_0_15px_rgba(255,0,93,0.5)] transition-all duration-300 animate-pulse hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(255,0,93,0.7)]">
                                Explore Dashboard
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-transparent text-white font-medium py-6 px-8 text-lg border-2 border-[rgba(255,255,255,0.2)] shadow-[0_0_15px_rgba(131,56,236,0.3)] transition-all duration-300 hover:border-[rgba(255,0,93,0.7)] hover:bg-[rgba(255,0,93,0.1)]"
                            >
                                <Link href="/">Return Home</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated confetti elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10 pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-fall"
                        style={{
                            backgroundColor: [
                                "#FF005D", // Pink
                                "#8338EC", // Purple
                                "#3A86FF", // Blue
                                "#FFBE0B", // Yellow
                                "#FB5607", // Orange
                            ][i % 5],
                            width: `${Math.random() * 20 + 5}px`,
                            height: `${Math.random() * 20 + 5}px`,
                            left: `${Math.random() * 100}%`,
                            top: `-50px`,
                            opacity: Math.random() * 0.7 + 0.3,
                            borderRadius: Math.random() > 0.5 ? "9999px" : "0",
                            boxShadow: `0 0 10px ${["#FF005D", "#8338EC", "#3A86FF", "#FFBE0B", "#FB5607"][i % 5]}`,
                            animationDuration: `${Math.random() * 5 + 3}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Animated stars */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-5 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="absolute bg-white rounded-full shadow-[0_0_10px_white] animate-twinkle"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 5 + 2}s`,
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes glow {
          0% {
            box-shadow: 0 0 20px rgba(255, 0, 93, 0.3), 0 0 15px rgba(131, 56, 236, 0.3) inset;
          }
          100% {
            box-shadow: 0 0 40px rgba(255, 0, 93, 0.5), 0 0 25px rgba(131, 56, 236, 0.5) inset;
          }
        }
        
        @keyframes floatParticle {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(${Math.random() > 0.5 ? "+" : "-"}${Math.random() * 100 + 50}px, ${Math.random() > 0.5 ? "+" : "-"}${Math.random() * 100 + 50}px) scale(1);
            opacity: 0;
          }
        }
      `}</style>

            {/* Add Tailwind custom animations */}
            <style jsx global>{`
        @import "tailwindcss/preflight;
        @tailwind utilities;

        @layer utilities {
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
          
          .animate-spin {
            animation: spin 4s linear infinite;
          }
          
          .animate-bounce {
            animation: bounce 2s ease infinite;
          }
          
          .animate-fall {
            animation: fall 5s linear infinite;
          }
          
          .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
          }
          
          .animate-glow {
            animation: glow 4s ease-in-out infinite alternate;
          }
          
          .duration-4000 {
            animation-duration: 4000ms;
          }
        }
      `}</style>
        </div>
    )
}
