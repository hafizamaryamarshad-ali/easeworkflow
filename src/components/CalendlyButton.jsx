"use client";

export default function CalendlyButton({ mainColor }) {
  const openCalendly = () => {
    window.open(
      "https://calendly.com/hafizamaryamarshada/30min",
      "_blank"
    );
  };

  return (
    <div
      onClick={openCalendly}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        fontSize: "0.9rem",
        fontWeight: 600,
        borderRadius: "50%",
        background: mainColor,
        color: "#fff",
        cursor: "pointer",
      }}
    >
      📅
    </div>
  );
}