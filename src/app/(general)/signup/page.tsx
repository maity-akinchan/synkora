import AuthForm from "@/components/signup/sign-form"

export default function LoginPage() {
    return (
        <main className="min-h-dvh w-full bg-black text-white">
            <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 md:py-20">
                {/* Left video panel */}
                <div className="relative overflow-hidden rounded-3xl bg-neutral-900 p-0 shadow-xl ring-1 ring-white/10">
                    <video
                        className="h-full w-full object-cover rounded-3xl"
                        src="/signup.mp4"
                        autoPlay
                        // loop
                        muted
                        playsInline
                    />
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
