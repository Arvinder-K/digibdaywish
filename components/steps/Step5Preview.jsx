"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const musicUrls = {
  happy: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  romantic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  party: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  soft: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
};

export default function Step5Preview({ formData = {}, prevStep }) {
  const audioRef = useRef(null);
  const [shareUrl, setShareUrl] = useState("");

  const safe = formData || {};

  const emoji = safe.gift_emoji || "✨";
  const message = safe.message || "Your message will appear here...";
  const theme = safe.theme_color || "#a855f7";
  const music = safe.music_choice || "none";

  // ✅ Safe client URL (Vercel fix)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  // 🎉 Confetti + Music
  useEffect(() => {
    const end = Date.now() + 2000;

    const frame = () => {
      confetti({
        particleCount: 4,
        spread: 60,
        origin: { x: 0.3 },
        colors: [theme, "#fff"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    if (music !== "none" && musicUrls[music]) {
      audioRef.current = new Audio(musicUrls[music]);
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => { });
    }

    return () => audioRef.current?.pause();
  }, [theme, music]);

  // 🔗 SHARE
  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(message + " 🎉 " + shareUrl)}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
  };

  return (
    <div style={styles.page}>

      {/* 🎉 FINAL CARD */}
      <div style={{ ...styles.card, background: theme }}>
        <div style={styles.overlay}></div>

        <motion.div
          style={{ position: "relative", zIndex: 2 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {/* Emoji */}
          <div style={styles.emoji}>{emoji}</div>

          {/* ✅ ONLY USER MESSAGE */}
          <p style={styles.message}>
            {message}
          </p>

          {/* Music */}
          <p style={styles.music}>
            {music !== "none" ? `🎵 ${music}` : "🔇 No music"}
          </p>
        </motion.div>
      </div>

      {/* SHARE */}
      <h3>Share 🎉</h3>

      <div style={styles.shareWrap}>
        <button style={styles.whatsapp} onClick={shareWhatsApp}>
          WhatsApp
        </button>

        <button style={styles.copy} onClick={copyLink}>
          Copy Link
        </button>
      </div>

      {/* BACK */}
      <div style={styles.btnWrap}>
        <button onClick={prevStep}>⬅ Back</button>
      </div>

    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "2rem",
    textAlign: "center",
    background: "linear-gradient(135deg,#fdf2f8,#f3e8ff,#eff6ff)"
  },

  card: {
    padding: "2.5rem",
    borderRadius: "25px",
    color: "white",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)"
  },

  emoji: {
    fontSize: "4rem",
    marginBottom: "1rem"
  },

  message: {
    fontSize: "1.4rem",
    lineHeight: "1.6"
  },

  music: {
    marginTop: "1rem",
    opacity: 0.8
  },

  shareWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "1rem"
  },

  whatsapp: {
    background: "#25D366",
    color: "white",
    padding: "10px 15px",
    borderRadius: "20px"
  },

  copy: {
    background: "#333",
    color: "white",
    padding: "10px 15px",
    borderRadius: "20px"
  },

  btnWrap: {
    marginTop: "2rem"
  }
};