"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const giftOptions = [
  { id: "cake", emoji: "🎂", title: "Cake", color: "#f472b6" },
  { id: "bouquet", emoji: "💐", title: "Bouquet", color: "#34d399" },
  { id: "giftbox", emoji: "🎁", title: "Gift Box", color: "#fb923c" },
  { id: "balloons", emoji: "🎈", title: "Balloons", color: "#60a5fa" },
  { id: "love", emoji: "❤️", title: "Love", color: "#f87171" },
];

const giftVariants = {
  cake: ["🎂", "🍰", "🧁", "🎉", "❤️"],
  bouquet: ["💐", "🌹", "🌷", "🌸"],
  giftbox: ["🎁", "🎀", "💝"],
  balloons: ["🎈", "🎊", "🎉"],
  love: ["❤️", "💖", "💘", "💝"],
};

export default function Step1Gift({ formData, updateForm, nextStep }) {
  const [selectedGift, setSelectedGift] = useState(null);

  const handleGiftClick = (gift, e) => {
    setSelectedGift(gift.id);

    updateForm("gift_type", gift.id);
    updateForm("gift_color", gift.color);
    updateForm("gift_design", "");
    updateForm("gift_emoji", gift.emoji);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: [gift.color, "#a855f7", "#ffffff"],
    });
  };

  const handleVariantPick = (emoji) => {
    updateForm("gift_design", emoji);
    updateForm("gift_emoji", emoji);
    setTimeout(() => nextStep(), 400);
  };

  const variants = selectedGift ? giftVariants[selectedGift] : [];

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* TITLE */}
        <h1 style={styles.title}>
          {selectedGift ? "Choose a Design Style" : "Choose Your Gift"}
        </h1>

        <AnimatePresence mode="wait">
          {!selectedGift && (
            <motion.div key="gifts" style={styles.grid}>
              {giftOptions.map((gift) => (
                <motion.div
                  key={gift.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleGiftClick(gift, e)}
                  style={{
                    ...styles.card,
                    boxShadow: `0 0 20px ${gift.color}55`,
                  }}
                >
                  <div style={{
                    ...styles.iconWrap,
                    background: `linear-gradient(135deg, ${gift.color}, #a855f7)`
                  }}>
                    {gift.emoji}
                  </div>
                  <h3>{gift.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedGift && (
            <motion.div key="variants" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button 
                style={styles.backBtn}
                onClick={() => setSelectedGift(null)}
              >
                ← Back
              </button>

              <div style={styles.grid}>
                {variants.map((emoji, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVariantPick(emoji)}
                    style={styles.variantCard}
                  >
                    <div style={styles.bigEmoji}>{emoji}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* 🎨 STYLES */
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
    position: "relative",
    zIndex: 2
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
    gap: "1.5rem",
    maxWidth: "800px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2
  },

  card: {
    padding: "2rem 1.5rem",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  iconWrap: {
    width: "80px",
    height: "80px",
    borderRadius: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    margin: "0 auto 1.5rem",
    color: "#fff",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },

  variantCard: {
    padding: "2rem",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  bigEmoji: { fontSize: "4rem" },

  backBtn: {
    marginBottom: "2rem",
    padding: "0.8rem 1.5rem",
    borderRadius: "100px",
    background: "white",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
  },

  glow1: {
    position: "absolute",
    width: "40vw",
    height: "40vw",
    background: "#f472b6",
    filter: "blur(100px)",
    top: "-10vw",
    left: "-10vw",
    opacity: 0.2,
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
    opacity: 0.2,
    zIndex: 1
  }
};