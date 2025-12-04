import { Navbar } from "@/components/layout/Navbar";

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
