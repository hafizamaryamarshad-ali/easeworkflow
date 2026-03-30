"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideButtons() {
  const pathname = usePathname();
  const router = useRouter();

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === "/") {
      const el = document.getElementById("privacy");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push("/#privacy");
    }
  };

  return (
    <div className="side-tabs-container">
      <a href="/#privacy" onClick={handlePrivacyClick} className="side-tab">
        PRIVACY
      </a>

      <Link href="/contact" className="side-tab">
        GET IN TOUCH
      </Link>
    </div>
  );
}