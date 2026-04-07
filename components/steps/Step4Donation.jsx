"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const amounts = [
  { value: 10, label: "₹10", desc: "☕ Coffee" },
  { value: 30, label: "₹30", desc: "🍿 Snack" },
  { value: 50, label: "₹50", desc: "🎁 Support" }
];

export default function Step4Donation({ formData, nextStep, prevStep, updateForm }) {
  const [selected, setSelected] = useState(formData.donation_amount || null);
  const theme = formData.theme_color || "#a855f7";

  const handleSelect = (val) => {
    setSelected(val);
    updateForm("donation_amount", val);
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* TITLE */}
        <h1 style={styles.title}>Support this Project</h1>

        <div style={styles.card}>
          <p style={styles.subtitle}>
            If you enjoyed creating this gift, consider supporting the developer with a small donation.
          </p>

          <div style={styles.amountWrap}>
            {amounts.map(a => (
              <motion.div
                key={a.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(a.value)}
                style={{
                  ...styles.amountCard,
                  background: selected === a.value ? `${theme}11` : "white",
                  border: selected === a.value ? `2.5px solid ${theme}` : "1.5px solid #f1f5f9",
                  boxShadow: selected === a.value ? `0 10px 20px ${theme}22` : "none"
                }}
              >
                <h3 style={{ ...styles.amountLabel, color: selected === a.value ? theme : "#1e293b" }}>{a.label}</h3>
                <p style={styles.amountDesc}>{a.desc}</p>
              </motion.div>
            ))}
          </div>

          <div style={styles.infoBox}>
            <span style={styles.infoIcon}>🔒</span>
            <span style={styles.infoText}>Secure payment via Razorpay / PayPal</span>
          </div>

          {/* NAVIGATION */}
          <div style={styles.btnWrap}>
            <button onClick={prevStep} style={styles.backBtn}>Back</button>
            <button 
              onClick={nextStep} 
              style={{
                ...styles.nextBtn,
                background: selected 
                  ? `linear-gradient(135deg, ${theme}, #a855f7)` 
                  : "linear-gradient(135deg, #94a3b8, #64748b)",
                boxShadow: selected ? `0 10px 25px ${theme}44` : "none"
              }}
            >
              {selected ? "Proceed ➜" : "Skip for Now ➜"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* 🎨 STYLES (REPLICATING STEP 1) */
const styles = {
  page: {
    padding: "2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg,#fdf2f8,#f3e8ff,#eff6ff)",
    minHeight: "100vh"
  },

  title: {
    fontSize: "2.5rem",
    fontWeight: "900",
    margin: "4rem 0 3rem",
    background: "linear-gradient(to right, #ec4899, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    zIndex: 2,
    position: "relative"
  },

  card: {
    padding: "2.5rem",
    borderRadius: "32px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    maxWidth: "500px",
    margin: "0 auto 4rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
    textAlign: "center",
    position: "relative",
    zIndex: 2
  },

  subtitle: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "2.5rem"
  },

  amountWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
    marginBottom: "2.5rem"
  },

  amountCard: {
    padding: "1.5rem",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },

  amountLabel: {
    fontSize: "1.2rem",
    fontWeight: "900",
    marginBottom: "4px"
  },

  amountDesc: {
    fontSize: "0.8rem",
    color: "#94a3b8",
    fontWeight: "600"
  },

  infoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "2rem",
    padding: "10px",
    background: "#f0fdf4",
    borderRadius: "12px",
    color: "#16a34a",
    fontSize: "0.8rem",
    fontWeight: "700"
  },

  btnWrap: {
    display: "flex",
    gap: "12px"
  },

  backBtn: {
    flex: 1,
    padding: "16px",
    borderRadius: "100px",
    background: "white",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    fontWeight: "700",
    cursor: "pointer"
  },

  nextBtn: {
    flex: 2,
    padding: "16px",
    borderRadius: "100px",
    border: "none",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },

  glow1: {
    position: "absolute",
    width: "40vw",
    height: "40vw",
    background: "#f472b6",
    filter: "blur(100px)",
    top: "-10vw",
    left: "-10vw",
    opacity: 0.15,
    zIndex: 1
  },

  glow2: {
    position: "absolute",
    width: "40vw",
    height: "40vw",
    background: "#60a5fa",
    filter: "blur(100px)",
    bottom: "-10vw",
    right: "-10vw",
    opacity: 0.15,
    zIndex: 1
  }
};