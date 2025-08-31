import { Geist, Geist_Mono } from "next/font/google";
import "./general.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <div
            className="min-h-screen sm:py-12 md:py-0 sm:w-screen md:w-[100%]"
            style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}
          >
              {children}
          </div>

        </main>
      </body>
    </html>
  );
}
