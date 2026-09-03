"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { EASEWORKFLOW_LINKEDIN_URL } from "../../data/socialLinks";
import "./team.css";

type TeamMember = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  category: string;
  bio: string;
  image: string;
  linkedin: string;
  featured?: boolean;
};

const teamMembers: TeamMember[] = [
  { id: "01", firstName: "MUHAMMAD", lastName: "UMER", role: "CEO & Co-Founder", category: "Leadership", bio: "Driving the vision of EaseWorkflow and transforming complex healthcare operations into simpler, smarter workflows.", image: "/images/profile team.png", linkedin: EASEWORKFLOW_LINKEDIN_URL, featured: true },
  { id: "02", firstName: "NABEEL", lastName: "TAHIR", role: "CTO & Co-Founder", category: "Technology", bio: "Building secure infrastructure, scalable systems, and the technology foundation behind intelligent healthcare automation.", image: "/images/team/nabeel-tahir.png", linkedin: "#" },
  { id: "03", firstName: "HUSNAIN", lastName: "HABIB", role: "Full-Stack Developer", category: "Engineering", bio: "Crafting responsive interfaces and dependable full-stack experiences that keep every workflow connected.", image: "/images/team/husnain-habib.png", linkedin: "#" },
  { id: "04", firstName: "MUHAMMAD", lastName: "HAMZA", role: "AI Automation", category: "Artificial Intelligence", bio: "Designing intelligent automation systems and AI-powered agents that reduce repetitive work and improve efficiency.", image: "/images/team/muhammad-hamza.png", linkedin: "#" },
  { id: "05", firstName: "FAIZA", lastName: "NOOR", role: "Business Development", category: "Growth", bio: "Building meaningful partnerships, expanding market opportunities, and connecting healthcare organizations with better workflows.", image: "/images/team/faiza-noor.png", linkedin: "#" },
  { id: "06", firstName: "MAIRA", lastName: "KHAN", role: "Social Media", category: "Brand & Community", bio: "Shaping the EaseWorkflow story through thoughtful content, visual communication, and meaningful community engagement.", image: "/images/team/maira-khan.png", linkedin: "#" },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const rosterReveal: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5ZM8 19H5V9h3v10ZM6.5 7.65A1.75 1.75 0 1 1 6.5 4.15a1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-5.4c0-3.24-4-2.99-4 0V19H9V9h3v1.7c1.4-2.58 7-2.78 7 2.48V19Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileAction({ member, expanded = false }: { member: TeamMember; expanded?: boolean }) {
  const label = `${member.firstName} ${member.lastName}`;

  if (member.linkedin === "#") {
    return <span className={`team-social team-social-disabled${expanded ? " team-social-expanded" : ""}`} aria-label={`LinkedIn profile for ${label} is not available yet`}><LinkedInIcon />{expanded && <span>LinkedIn</span>}</span>;
  }

  return <a className={`team-social${expanded ? " team-social-expanded" : ""}`} href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Open the LinkedIn profile of ${label}`}><LinkedInIcon />{expanded && <span>LinkedIn</span>}</a>;
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.article className="team-card" variants={reveal} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <div className="team-card-visual">
        <span className="team-card-number">{member.id}</span>
        <span className="team-card-category">{member.category}</span>
        <Image src={member.image} alt={`${member.firstName} ${member.lastName}, ${member.role}`} fill sizes="(max-width: 700px) 92vw, (max-width: 1050px) 45vw, 350px" className="team-card-avatar" priority={index < 2} />
      </div>

      <div className="team-card-copy">
        <p className="team-card-role">{member.role}</p>
        <h3>{member.firstName} <strong>{member.lastName}</strong></h3>
        <p className="team-card-bio">{member.bio}</p>
        <div className="team-card-footer">
          <ProfileAction member={member} />
          <span className="team-card-rule" />
          <span className="team-card-detail">Team profile <ArrowIcon /></span>
        </div>
      </div>
    </motion.article>
  );
}

export default function TeamPage() {
  const ceo = teamMembers[0];
  const team = teamMembers.slice(1);

  return (
    <main className="team-page">
      <div className="team-backdrop" aria-hidden="true"><span /><span /></div>

      <motion.header className="team-hero" initial="hidden" animate="visible" variants={reveal}>
        <div className="team-kicker"><span /> EaseWorkflow / People</div>
        <h1>Built by people who make <span>complex work feel simple.</span></h1>
        <p>Healthcare insight, product thinking, and automation engineering—working together to build dependable workflows for modern clinics.</p>
      </motion.header>

      <motion.section className="team-leader" aria-labelledby="team-leader-title" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={reveal}>
        <div className="team-leader-copy">
          <div className="team-leader-heading">
            <span className="team-section-label">Our leadership</span>
            <span className="team-leader-index">01 / 06</span>
            <h2 id="team-leader-title">A clear vision for calmer clinic operations.</h2>
          </div>
          <p className="team-leader-intro">EaseWorkflow is led with one practical belief: technology should remove friction from care teams, not add another layer for them to manage.</p>
          <blockquote className="team-ceo-quote">{ceo.bio}</blockquote>
          <div className="team-ceo-identity">
            <div>
              <span>{ceo.role}</span>
              <h3>{ceo.firstName} <strong>{ceo.lastName}</strong></h3>
            </div>
            <ProfileAction member={ceo} expanded />
          </div>
        </div>

        <article className="team-ceo-card" aria-label={`${ceo.firstName} ${ceo.lastName}, ${ceo.role}`}>
          <div className="team-ceo-halo" aria-hidden="true" />
          <div className="team-ceo-portrait">
            <Image src={ceo.image} alt={`${ceo.firstName} ${ceo.lastName}, ${ceo.role}`} fill priority sizes="(max-width: 760px) 88vw, 520px" />
          </div>
        </article>
      </motion.section>

      <section className="team-roster" aria-labelledby="team-roster-title">
        <motion.div className="team-roster-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
          <div>
            <span className="team-section-label">Meet the team</span>
            <h2 id="team-roster-title">Different disciplines. One shared standard.</h2>
          </div>
          <p>Five specialists supporting the technology, engineering, automation, growth, and communication behind EaseWorkflow.</p>
        </motion.div>

        <motion.div className="team-roster-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={rosterReveal}>
          {team.map((member, index) => <TeamCard key={member.id} member={member} index={index} />)}
        </motion.div>
      </section>

      <motion.footer className="team-closing" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
        <span>06</span><i /><p>Different expertise. <strong>One workflow vision.</strong></p>
      </motion.footer>
    </main>
  );
}
