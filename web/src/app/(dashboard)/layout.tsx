import "../globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar className="hidden md:flex" />
      <div className="flex-1 flex flex-col h-screen min-w-0 md:ml-64 bg-analytical transition-all">
         <TopNav />
         <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
           <div className="mx-auto max-w-7xl h-full">
             {children}
           </div>
         </main>
      </div>
    </>
  );
}
