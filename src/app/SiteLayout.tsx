"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ThemeProvider from "../theme/ThemeProvider";
import BackButton from "../BackButton";
import SideButtons from "../SideButtons";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider>
      <Navbar />
      <SideButtons />
      <BackButton />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
