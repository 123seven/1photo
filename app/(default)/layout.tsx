import { Background } from "@/components/layout/bg";
import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="container mx-auto h-screen px-4 py-8 flex min-h-screen flex-col dark:bg-black">
      {/* <Background /> */}
      <NavMobile />
      <NavBar scroll={true} />
      <main className="flex-1 ">{children}</main>
    </div>
  );
}
