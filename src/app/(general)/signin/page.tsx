'use client';

import SignInForm from "@/components/signin/signin-form"

export default function SignIn() {
    return (
        <main className="min-h-screen w-full bg-black text-white">
            <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 md:py-20">
                {/* Left video panel */}
                <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-xl ring-1 ring-white/10">
                    <video
                        className="h-150 w-150 object-cover rounded-3xl"
                        src="/signin.mp4"
                        autoPlay
                        muted
                        playsInline
                    />
                </div>

                {/* Right form column */}
                <div className="rounded-3xl bg-neutral-950 p-6 ring-1 ring-white/10 md:p-10">
                    <div className="mx-auto w-full max-w-md">
                        <header className="text-center">
                            <h1 className="text-pretty text-2xl font-semibold md:text-3xl">Sign In</h1>
                            <p className="mt-2 text-sm text-white/70">
                                Enter your details to access your account
                            </p>
                        </header>

                        <SignInForm />
                    </div>
                </div>
            </section>
        </main>
    )
}
