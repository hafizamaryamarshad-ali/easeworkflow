"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideButtons() {
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("site-footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();

      if (rect.top <= window.innerHeight) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className={hidden ? "side-buttons-hidden" : "side-tabs-container"}>
      <a href="/#privacy" onClick={handlePrivacyClick} className="side-tab">
        PRIVACY
      </a>

      <Link href="/contact" className="side-tab">
        GET IN TOUCH
      </Link>
    </div>
  );
}