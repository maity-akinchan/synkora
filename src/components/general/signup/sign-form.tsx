"use client"

import * as React from "react"
import { Eye, EyeOff, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {onSignup} from "@/lib/commons/auth";

export default function AuthForm() {
    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const nullfunc = () => {console.log("xD")}
        onSignup(e, nullfunc, nullfunc, nullfunc)
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
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Name"
                            className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            placeholder="last name"
                            className="rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
                            required
                        />
                    </div>
                </div>

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
                            minLength={8}
                            className="pe-10 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/40"
                            required
                            aria-describedby="password-hint"
                        />
                        <button
                            type="button"
                            onClick={() => setShow((s) => !s)}
                            className="absolute inset-y-0 end-0 grid w-10 place-items-center text-white/70 hover:text-white"
                            aria-label={show ? "Hide password" : "Show password"}
                        >
                            {show ? (
                                <EyeOff className="h-4 w-4" aria-hidden="true" />
                            ) : (
                                <Eye className="h-4 w-4" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <p id="password-hint" className="text-xs text-white/60">
                        Must have 8 characters
                    </p>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full justify-center rounded-xl bg-white text-black hover:bg-white/90"
                >
                    {loading ? "Signing up..." : <Button type="submit">Sign Up</Button>}
                </Button>

                <p className="text-center text-sm text-white/60">
                    Already have an account?{" "}
                    <Link href="/signin" className="font-medium text-white hover:underline">
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    )
}

