"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideButtons() {
  const pathname = usePathname();
  const router = useRouter();
  const [hideOnHero, setHideOnHero] = useState(false);

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

  // Hide side buttons while the home hero section is in view
  useEffect(() => {
    if (pathname !== "/") {
      setHideOnHero(false);
      return;
    }

    const heroEl = document.getElementById("hero");
    if (!heroEl) {
      setHideOnHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideOnHero(entry.isIntersecting);
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div
      className="side-tabs-container"
      style={{
        opacity: hideOnHero ? 0 : 1,
        pointerEvents: hideOnHero ? "none" : "auto",
        transition: "opacity 0.3s ease",
      }}
    >
      <a href="/#privacy" onClick={handlePrivacyClick} className="side-tab">
        PRIVACY
      </a>

      <Link href="/contact" className="side-tab">
        GET IN TOUCH
      </Link>
    </div>
  );
}