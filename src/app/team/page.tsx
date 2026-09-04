import type { Metadata } from "next";
import { ArrowRight, Braces, Bot, BriefcaseBusiness, Crown, Megaphone, Network } from "lucide-react";
import Link from "next/link";
import "./team.css";

export const metadata: Metadata = {
  title: "Our Team | EaseWorkflow",
  description: "Meet the people building intelligent automation and digital products at EaseWorkflow.",
};

const team = [
  {
    name: "Muhammad Umer",
    role: "CEO & Founder",
    initials: "MU",
    icon: Crown,
    accent: "cyan",
  },
  {
    name: "Nabeel Tahir",
    role: "CTO & Co-Founder",
    initials: "NT",
    icon: Network,
    accent: "indigo",
  },
  {
    name: "Husnain Habib",
    role: "Full-Stack Developer",
    initials: "HH",
    icon: Braces,
    accent: "blue",
  },
  {
    name: "Muhammad Hamza",
    role: "AI Automation Engineer",
    initials: "MH",
    icon: Bot,
    accent: "violet",
  },
  {
    name: "Faiza Noor",
    role: "Business Development Specialist",
    initials: "FN",
    icon: BriefcaseBusiness,
    accent: "sky",
  },
  {
    name: "Maira Khan",
    role: "Social Media Specialist",
    initials: "MK",
    icon: Megaphone,
    accent: "indigo",
  },
];

export default function TeamPage() {
  return (
    <div className="team-page">
      <div className="team-orb team-orb-one" aria-hidden="true" />
      <div className="team-orb team-orb-two" aria-hidden="true" />

      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-kicker"><span /> The people behind EaseWorkflow</div>
        <h1 id="team-title">Small team.<br /><em>Big systems.</em></h1>
        <p>
          A focused group of strategists, engineers, and storytellers turning
          ambitious ideas into practical automation.
        </p>
      </section>

      <section className="team-content" aria-label="EaseWorkflow team members">
        <div className="team-grid">
          {team.map(({ name, role, initials, icon: Icon, accent }, index) => (
            <article className={`member-card member-${accent}`} key={name}>
              <div className="member-topline">
                <span className="member-number">0{index + 1}</span>
                <span className="member-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
              </div>
              <div className="member-monogram" aria-hidden="true">{initials}</div>
              <div className="member-copy">
                <h2>{name}</h2>
                <p>{role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-cta" aria-label="Start a project with EaseWorkflow">
        <div>
          <span>Have a bold idea?</span>
          <h2>Let&apos;s build what&apos;s next.</h2>
        </div>
        <Link href="/contact">Start a conversation <ArrowRight size={18} /></Link>
      </section>
    </div>
  );
}
