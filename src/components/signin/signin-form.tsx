'use client'

import * as React from "react"
import { Eye, EyeOff, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInForm() {
    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            router.push("/dashboard")
        }, 800)
    }

    return (
        <div className="mt-8">
            {/* OAuth buttons */}
            <div className="flex items-center gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 justify-center gap-2 rounded-xl border-white/20 bg-transparent text-white hover:bg-white/5"
                >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Google
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 justify-center gap-2 rounded-xl border-white/20 bg-transparent text-white hover:bg-white/5"
                >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Github
                </Button>
            </div>

            <div className="my-6 flex items-center gap-3">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs text-white/60">or</span>
                <Separator className="flex-1 bg-white/10" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={show ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pe-10 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => !s)}
                            className="absolute inset-y-0 end-0 grid w-10 place-items-center text-white/70 hover:text-white"
                            aria-label={show ? "Hide password" : "Show password"}
                        >
                            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full justify-center rounded-xl bg-white text-black hover:bg-white/90"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

                <p className="text-center text-sm text-white/60">
                    Don’t have an account?{" "}
                    <Link href="/signup" className="font-medium text-white hover:underline">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    )
}
