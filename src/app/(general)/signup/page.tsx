import AuthForm from "@/components/signup/sign-form"

export default function LoginPage() {
    return (
        <main className="min-h-dvh w-full bg-black text-white">
            <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 md:py-20">
                {/* Left gradient panel */}
                <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-4 shadow-xl ring-1 ring-white/10">
                    {/* subtle gradient accent panel */}
                    <div
                        aria-hidden="true"
                        className="h-full w-full rounded-2xl bg-gradient-to-b from-white via-fuchsia-300 to-purple-700 p-6 md:p-10"
                    >
                        <div className="flex h-full flex-col justify-end rounded-2xl bg-black/10 p-4 md:p-8">
                            <div className="mx-auto max-w-sm text-center">
                                <h2 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">Get Started with us</h2>
                                <p className="mt-2 text-sm text-white/80">Complete these easy steps to register your account</p>

                                <div className="mt-6 space-y-3">

                                    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-black">
                                        <div className="flex items-center gap-3">
                                            <span
                                                aria-hidden
                                                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-white"
                                            >
                                                1
                                            </span>
                                            <span className="text-sm font-medium">Set up your account</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between rounded-xl bg-black/40 px-4 py-3 ring-1 ring-white/10">
                                        <div className="flex items-center gap-3">
                                            <span
                                                aria-hidden
                                                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
                                            >
                                                2
                                            </span>
                                            <span className="text-sm text-white/85">Set up your workspace</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between rounded-xl bg-black/40 px-4 py-3 ring-1 ring-white/10">
                                        <div className="flex items-center gap-3">
                                            <span
                                                aria-hidden
                                                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20"
                                            >
                                                3
                                            </span>
                                            <span className="text-sm text-white/85">Set up your profile</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right form column */}
                <div className="rounded-3xl bg-neutral-950 p-6 ring-1 ring-white/10 md:p-10">
                    <div className="mx-auto w-full max-w-md">
                        <header className="text-center">
                            <h1 className="text-pretty text-2xl font-semibold md:text-3xl">Sign Up Account</h1>
                            <p className="mt-2 text-sm text-white/70">Enter your details to create your account</p>
                        </header>

                        <AuthForm />
                    </div>
                </div>
            </section>
        </main>
    )
}
