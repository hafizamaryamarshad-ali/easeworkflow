"use client";

import { motion } from "framer-motion";
import { FaRobot, FaCalendarAlt, FaVideo } from "react-icons/fa";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "EMR Integration",
    description:
      "Centralize patient data with secure, real-time EMR integration for better clinical decisions and efficiency.",
    points: ["Real-time patient records", "Secure data sync", "AI-assisted insights"],
    image: "/images/4.png",
    icon: <FaRobot />,
  },
  {
    title: "Smart Scheduling",
    description:
      "Automated scheduling and follow-ups to reduce manual effort and optimize patient flow.",
    points: ["Auto reminders", "Smart booking", "Reduced no-shows"],
    image: "/images/5.png",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Telemedicine",
    description:
      "Deliver seamless remote consultations with secure and reliable communication.",
    points: ["Video consultations", "Secure calls", "Instant access"],
    image: "/images/6.png",
    icon: <FaVideo />,
  },
];

const cardVariants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "var(--card-shadow-soft)",
  },
  hover: {
    y: -6,
    scale: 1.02,
    boxShadow: "var(--card-shadow-soft-hover)",
  },
};

const imageVariants = {
  rest: {
    scale: 1,
    filter: "brightness(0.9) contrast(1.1)",
  },
  hover: {
    scale: 1.1,
    filter: "brightness(1.1) contrast(1.1)",
    transition: { duration: 0.35 },
  },
};

export default function Services() {
  const router = useRouter();

  return (
    <section
      style={{
        scrollMarginTop: "80px",
        padding: "110px 20px",
        background: "var(--color-bg)",
        color: "var(--color-text-primary)",
        position: "relative",
        overflow: "hidden",
      }}
      id="services"
    >
      {/* Soft background accents */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "-120px",
          width: "260px",
          height: "260px",
          background:
            "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25), transparent 70%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "-100px",
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(circle at 70% 70%, rgba(59,130,246,0.3), transparent 70%)",
          filter: "blur(14px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>
            Our Services
          </h2>
          <p
            style={{
              opacity: 0.7,
              marginTop: "12px",
              fontSize: "1.02rem",
            }}
          >
            AI-powered healthcare solutions designed to streamline every step of care
          </p>
        </div>

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {services.map((item, i) => (
            <motion.div
              key={i}
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={cardVariants}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "default",
                border: "1px solid var(--card-border)",
                background: "rgba(15,23,42,0.96)",
              }}
            >
              <motion.img
                src={item.image}
                variants={imageVariants}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "brightness(0.9) contrast(1.1)",
                  transition: "transform 0.35s ease, filter 0.35s ease",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.78) 35%, rgba(15,23,42,0.45) 65%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: "auto 0 0 0",
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  maxWidth: "100%",
                  color: "var(--text-light)",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(15,23,42,0.7)",
                      color: "var(--card-icon-color)",
                      fontSize: "18px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>

                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      margin: 0,
                      textShadow: "0 1px 6px rgba(15,23,42,0.9)",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    margin: 0,
                    color: "rgba(241,245,249,0.9)",
                    textShadow: "0 1px 4px rgba(15,23,42,0.85)",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MAIN SECTION */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
        {/* IMAGE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <motion.img
            src={services[1].image}
            whileHover={{ scale: 1.02 }}
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          />

          <motion.img
            src={services[2].image}
            whileHover={{ scale: 1.02 }}
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "18px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
            }}
          />
        </div>

        {/* TEXT */}
        <div>
          <p style={{ color: "#0ea5e9", fontWeight: 600 }}>
            More than 25 Years of Experience
          </p>

          <h2 style={{ fontSize: "2.4rem", fontWeight: 800 }}>
            We are passionate about Healthcare
          </h2>

          <p style={{ opacity: 0.65 }}>{services[0].description}</p>

          <div style={{ marginTop: "22px" }}>
            {services[0].points.map((point, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#0ea5e9",
                  }}
                />
                {point}
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/services-details")}
            style={{
              marginTop: "25px",
              padding: "12px 26px",
              background: "#0ea5e9",
              border: "none",
              borderRadius: "25px",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(14,165,233,0.6)",
            }}
          >
            Discover More
          </motion.button>
        </div>
      </div>
      </div>
    </section>
  );
}