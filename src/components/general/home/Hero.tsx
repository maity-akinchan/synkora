// import { Button } from "@/components/general/home/ui/button";
// import { ArrowRight } from "lucide-react";
// import heroMockups from "@/assets/home/hero-mockups.jpg";
// import Link from "next/link";
// import Image from "next/image";

// export const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
//       {/* Central green radial glow */}
//       <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
//         <div className="h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(178,255,31,0.22),rgba(0,0,0,0))] blur-3xl" />
//       </div>

//       {/* Subtle grid */}
//       <div className="absolute inset-0 opacity-[0.12]">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               `linear-gradient(rgba(150,150,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,150,0.08) 1px, transparent 1px)`,
//             backgroundSize: "80px 80px",
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-6 text-center relative z-10">
//         <div className="max-w-5xl mx-auto">
//           {/* Headline */}
//           <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
//             Your team's visual
//             <br />
//             command center<span className="align-top">.</span>
//           </h1>

//           {/* Blue pulse dot near headline end */}
//           <span className="inline-block h-3 w-3 align-middle rounded-full bg-blue-500 ml-2 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

//           {/* Subheading */}
//           <p className="mt-6 text-base md:text-lg text-neutral-400 max-w-2xl mx-auto">
//             Task management, live dashboards, and whiteboard collaboration in one powerful workspace.
//           </p>

//           {/* CTAs */}
//           <div className="mt-10 flex items-center justify-center gap-4">
//             <Button variant="outline" className="h-12 rounded-full px-8 text-sm tracking-wide bg-neutral-900/60 border-neutral-800 text-white hover:border-neutral-700">
//               <Link href="/login">LOGIN</Link>
//             </Button>
//             <Button
//               variant="hero"
//               size="lg"
//               className="h-12 rounded-full px-8 text-sm font-semibold text-black bg-lime-300 hover:bg-lime-200 transition-transform will-change-transform hover:scale-[1.03] shadow-[0_0_0_6px_rgba(180,255,20,0.16),0_0_50px_rgba(180,255,20,0.3)]"
//             >
//               <Link href="/signup">Sign up</Link>
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Floating user badges */}
//       <div className="absolute left-[14%] top-[44%] hidden md:flex items-center gap-2 rounded-full bg-neutral-900/60 border border-neutral-800 px-3 py-1 text-xs text-white shadow-lg">
//         <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400" />
//         Sarah
//       </div>
//       <div className="absolute right-[18%] top-[36%] hidden md:flex items-center gap-2 rounded-full bg-neutral-900/60 border border-neutral-800 px-3 py-1 text-xs text-white shadow-lg">
//         <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-400" />
//         Elieh
//       </div>

//       {/* Peripheral mockups */}
//       <div className="pointer-events-none absolute -left-2 top-[34%] hidden lg:block opacity-80">
//         <img src="/img/window.svg" alt="window" className="h-40 w-auto" />
//       </div>
//       <div className="pointer-events-none absolute right-8 top-[28%] hidden lg:block opacity-80">
//         <img src="/img/globe.svg" alt="globe" className="h-40 w-auto" />
//       </div>
//       <div className="pointer-events-none absolute left-24 bottom-32 hidden lg:block opacity-60">
//         <img src="/img/file.svg" alt="file" className="h-44 w-auto" />
//       </div>
//       <div className="pointer-events-none absolute right-24 bottom-24 hidden lg:block opacity-70">
//         <Image src={heroMockups} alt="Synkora dashboard mockups" className="w-80 h-auto object-contain" />
//       </div>
//     </section>
//   );
// };

import { Button } from "@/components/general/home/ui/button";
import { ArrowRight } from "lucide-react";
import heroMockups from "@/assets/home/hero-mockups.jpg";
import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Central green radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(178,255,31,0.22),rgba(0,0,0,0))] blur-3xl" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.12]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              `linear-gradient(rgba(150,150,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,150,0.08) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
            Your team's visual
            <br />
            command center<span className="align-top">.</span>
          </h1>

          {/* Blue pulse dot near headline end */}
          <span className="inline-block h-3 w-3 align-middle rounded-full bg-blue-500 ml-2 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

          {/* Subheading */}
          <p className="mt-6 text-base md:text-lg text-neutral-400 max-w-2xl mx-auto">
            Task management, live dashboards, and whiteboard collaboration in one powerful workspace.
          </p>

          {/* CTAs */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <Button variant="outline" className="h-12 rounded-full px-8 text-sm tracking-wide bg-neutral-900/60 border-neutral-800 text-white hover:border-neutral-700">
              <Link href="/login">LOGIN</Link>
            </Button>
            <Button
              variant="hero"
              size="lg"
              className="h-12 rounded-full px-8 text-sm font-semibold text-black bg-lime-300 hover:bg-lime-200 transition-transform will-change-transform hover:scale-[1.03] shadow-[0_0_0_6px_rgba(180,255,20,0.16),0_0_50px_rgba(180,255,20,0.3)]"
            >
              <Link href="/signup">Sign up</Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating user badges */}
      <div className="absolute left-[14%] top-[44%] hidden md:flex items-center gap-2 rounded-full bg-neutral-900/60 border border-neutral-800 px-3 py-1 text-xs text-white shadow-lg">
        <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-blue-400" />
        Sarah
      </div>
      <div className="absolute right-[18%] top-[36%] hidden md:flex items-center gap-2 rounded-full bg-neutral-900/60 border border-neutral-800 px-3 py-1 text-xs text-white shadow-lg">
        <span className="inline-block h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-400" />
        Elieh
      </div>

      {/* Main hero images - Left side mind map */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] hidden lg:block m-4">
        <div className="relative">
          <Image 
            src="/hero-mindmap.png" 
            alt="Mind map visualization" 
            width={220} 
            height={220} 
            className="rounded-lg shadow-2xl"
          />
          {/* Pink label above mind map */}
          <div className="absolute -top-6 -left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
            248
          </div>
        </div>
      </div>

      {/* Main hero images - Right side smartwatch */}
      <div className="pointer-events-none absolute right-[5%] top-[18%] hidden lg:block m-4">
        <Image 
          src="/hero-smartwatch.png" 
          alt="Smartwatch task management" 
          width={150} 
          height={180} 
          className="rounded-lg shadow-2xl"
        />
      </div>

      {/* Lower section cards */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 hidden lg:flex gap-4 w-full max-w-5xl px-8">
        {/* Dashboard card */}
        <div className="flex-1 max-w-xs mx-2">
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-3 shadow-2xl border border-neutral-800">
            <Image 
              src="/hero-dashboard.png" 
              alt="Dashboard interface" 
              width={300} 
              height={200} 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>


        {/* Credentials card
        <div className="flex-1 max-w-xs mx-2">
          <div className="bg-neutral-900/80 backdrop-blur-sm rounded-xl p-3 shadow-2xl border border-neutral-800">
            <Image 
              src="/hero-credentials.png" 
              alt="Credentials interface" 
              width={300} 
              height={200} 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};