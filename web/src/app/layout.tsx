import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexMono = IBM_Plex_Mono({ weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "NIYAMAI | Regulatory Intelligence",
  description: "AI-powered regulatory intelligence infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexMono.variable} antialiased bg-background text-foreground flex h-screen overflow-hidden`}>
        <Sidebar className="hidden md:flex" />
        <div className="flex-1 flex flex-col h-screen min-w-0 md:ml-64 bg-analytical transition-all">
           <TopNav />
           <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
             <div className="mx-auto max-w-7xl h-full">
               {children}
             </div>
           </main>
        </div>
        <Toaster position="bottom-right" richColors theme="light" />
      </body>
    </html>
  );
}

