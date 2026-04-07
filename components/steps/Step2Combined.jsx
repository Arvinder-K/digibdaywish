"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = ["#f472b6", "#a855f7", "#fb923c", "#60a5fa", "#34d399"];

const musicOptions = [
  { id: "none", title: "No Music", emoji: "🔇", url: null },
  { id: "happy", title: "Happy Birthday", emoji: "🎶", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "romantic", title: "Romantic", emoji: "❤️", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "party", title: "Party", emoji: "🎉", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
];

const messageCategories = {
  birthday: [
    "Happy Birthday! 🎂 Wishing you endless happiness!",
    "May your day be filled with love and laughter 🎉",
    "Another year older, wiser, and amazing 💖"
  ],
  love: [
    "You mean everything to me ❤️",
    "Every moment with you is special 💖",
    "I’m lucky to have you 💕"
  ],
  friendship: [
    "Friends like you are rare 💙",
    "Thanks for always being there 🤝",
    "Life is better with you 🌟"
  ]
};

const supportAmounts = [
  { value: 10, label: "₹10" },
  { value: 30, label: "₹30" },
  { value: 50, label: "₹50" },
  { value: 100, label: "₹100" }
];

export default function Step2Combined({ formData, updateForm, nextStep, prevStep }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(null);
  const [showSupport, setShowSupport] = useState(false);

  const previewEmoji = formData.gift_emoji || "✨";

  const generateMessage = () => {
    const category =
      formData.gift_type === "love" ? "love" :
        formData.gift_type === "bouquet" ? "friendship" : "birthday";
    const messages = messageCategories[category];
    const random = messages[Math.floor(Math.random() * messages.length)];
    updateForm("message", random);
  };

  const playMusic = (track) => {
    if (!track.url) return;
    if (playing === track.id) {
      audioRef.current.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = new Audio(track.url);
      audioRef.current.play();
      setPlaying(track.id);
    }
  };

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  return (
    <div style={styles.container}>
      
      {/* 🔮 STICKY FLOATING PREVIEW */}
      <div style={styles.previewSticky}>
        <motion.div
          layoutId="previewCard"
          style={{ ...styles.previewCard, background: formData.theme_color }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div style={styles.previewOverlay}></div>
          <div style={{ position: "relative", zIndex: 10 }}>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
              <div style={styles.previewEmoji}>{previewEmoji}</div>
              <h2 style={styles.previewName}>{formData.recipient_name || "Name"}</h2>
              <p style={styles.previewMessage}>"{formData.message || "Your message..."}"</p>
              <div style={styles.previewMusic}>
                {formData.music_choice !== "none" ? `🎵 ${formData.music_choice}` : "🔇 Silence"}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div style={styles.formContent}>
        
        {/* SECTION 1: RECIPIENT */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>1. Recipient Details</h3>
          <input
            placeholder="Enter recipient's name"
            value={formData.recipient_name}
            onChange={(e) => updateForm("recipient_name", e.target.value)}
            style={styles.input}
          />
        </section>

        {/* SECTION 2: MESSAGE */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>2. Write Your Message</h3>
            <button onClick={generateMessage} style={styles.aiBtn}>
              ✨ Smart Suggest
            </button>
          </div>
          
          <div style={styles.toggleWrap}>
            <button
              onClick={() => updateForm("message_type", "short")}
              style={{ ...styles.toggleBtn, borderBottom: formData.message_type === "short" ? `2px solid ${formData.theme_color}` : "none" }}
            >
              Short 💬
            </button>
            <button
              onClick={() => updateForm("message_type", "long")}
              style={{ ...styles.toggleBtn, borderBottom: formData.message_type === "long" ? `2px solid ${formData.theme_color}` : "none" }}
            >
              Long 📝
            </button>
          </div>

          {formData.message_type === "short" ? (
            <input
              placeholder="Short & Sweet..."
              value={formData.message}
              onChange={(e) => updateForm("message", e.target.value)}
              style={styles.input}
            />
          ) : (
            <textarea
              placeholder="Heartfelt & Long..."
              value={formData.message}
              onChange={(e) => updateForm("message", e.target.value)}
              rows={4}
              style={styles.textarea}
            />
          )}
        </section>

        {/* SECTION 3: THEME & MUSIC */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>3. Theme & Customization</h3>
          
          <p style={styles.label}>Theme Color</p>
          <div style={styles.colorWrap}>
            {colors.map(color => (
              <motion.div
                key={color}
                whileHover={{ scale: 1.2 }}
                onClick={() => updateForm("theme_color", color)}
                style={{
                  ...styles.colorCircle,
                  background: color,
                  border: formData.theme_color === color ? "3px solid #fff" : "1px solid #ddd",
                  boxShadow: formData.theme_color === color ? `0 0 15px ${color}` : "none"
                }}
              />
            ))}
          </div>

          <p style={styles.label}>Music Choice</p>
          <div style={styles.musicGrid}>
            {musicOptions.map(track => (
              <motion.div
                key={track.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateForm("music_choice", track.id)}
                style={{
                  ...styles.musicItem,
                  background: formData.music_choice === track.id ? `${formData.theme_color}11` : "#fff",
                  border: formData.music_choice === track.id ? `2.5px solid ${formData.theme_color}` : "1.5px solid #eee"
                }}
              >
                <div style={styles.musicInfo}>
                  <span>{track.emoji}</span>
                  <span style={styles.musicTitle}>{track.title}</span>
                </div>
                {track.id !== "none" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); playMusic(track); }}
                    style={{ ...styles.playBtn, background: playing === track.id ? formData.theme_color : "#f1f5f9", color: playing === track.id ? "#fff" : "#334155" }}
                  >
                    {playing === track.id ? "Pause" : "Play"}
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: SUPPORT (OPTIONAL) */}
        <section style={styles.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={styles.sectionTitle}>4. Support this project (optional)</h3>
            <div style={styles.badge}>Secure</div>
          </div>
          
          <div style={styles.donationRow}>
            {supportAmounts.map(amt => (
              <button
                key={amt.value}
                onClick={() => updateForm("donation_amount", amt.value)}
                style={{
                  ...styles.donBtn,
                  background: formData.donation_amount === amt.value ? formData.theme_color : "#f8fafc",
                  color: formData.donation_amount === amt.value ? "white" : "#1e293b",
                }}
              >
                {amt.label}
              </button>
            ))}
          </div>
        </section>

      </div>

      {/* 🧭 NAVIGATION (STICKY BOTTOM) */}
      <div style={styles.stickyNav}>
        <button onClick={prevStep} style={styles.backBtn}>Back</button>
        <button 
          onClick={nextStep} 
          disabled={!formData.recipient_name || !formData.message}
          style={{
            ...styles.generateBtn,
            background: `linear-gradient(135deg, ${formData.theme_color}, #a855f7)`,
            boxShadow: `0 10px 25px ${formData.theme_color}44`
          }}
        >
          Generate magic link ✨
        </button>
      </div>

    </div>
  );
}

const styles = {
  container: {
    paddingBottom: "100px",
    maxWidth: "500px",
    margin: "0 auto",
  },
  previewSticky: {
    position: "sticky",
    top: "10px",
    zIndex: 100,
    marginBottom: "2rem",
  },
  previewCard: {
    borderRadius: "24px",
    padding: "24px",
    color: "white",
    textAlign: "center",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
  },
  previewOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(4px)",
  },
  previewEmoji: {
    fontSize: "3rem",
    marginBottom: "12px",
    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))"
  },
  previewName: {
    fontSize: "1.5rem",
    fontWeight: "800",
    marginBottom: "8px"
  },
  previewMessage: {
    fontSize: "0.95rem",
    lineHeight: "1.4",
    opacity: 0.9,
    marginBottom: "12px"
  },
  previewMusic: {
    fontSize: "0.8rem",
    background: "rgba(0,0,0,0.2)",
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "100px",
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  section: {
    background: "white",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
    border: "1px solid #f1f5f9"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px"
  },
  sectionTitle: {
    fontSize: "1.1rem",
    fontWeight: "800",
    color: "#1e293b",
  },
  aiBtn: {
    background: "#f0fdf4",
    border: "none",
    color: "#15803d",
    padding: "6px 12px",
    borderRadius: "100px",
    fontSize: "0.8rem",
    fontWeight: "700",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "2.5px solid #f1f5f9",
    background: "#f8fafc",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s",
  },
  textarea: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "2.5px solid #f1f5f9",
    background: "#f8fafc",
    fontSize: "1rem",
    outline: "none",
    resize: "none",
  },
  toggleWrap: {
    display: "flex",
    gap: "20px",
    marginBottom: "12px"
  },
  toggleBtn: {
    padding: "4px 0",
    background: "none",
    border: "none",
    color: "#64748b",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "0.9rem"
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "12px",
    marginTop: "16px"
  },
  colorWrap: {
    display: "flex",
    gap: "12px",
  },
  colorCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  musicGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px",
  },
  musicItem: {
    padding: "12px 16px",
    borderRadius: "16px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.2s"
  },
  musicInfo: {
    display: "flex",
    gap: "12px",
    fontSize: "1.1rem"
  },
  musicTitle: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#334155"
  },
  playBtn: {
    padding: "6px 12px",
    borderRadius: "10px",
    border: "none",
    fontSize: "0.75rem",
    fontWeight: "800",
    cursor: "pointer",
  },
  badge: {
    fontSize: "0.65rem",
    background: "#dcfce7",
    color: "#16a34a",
    padding: "2px 8px",
    borderRadius: "100px",
    fontWeight: "800",
    textTransform: "uppercase"
  },
  donationRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
    marginTop: "12px"
  },
  donBtn: {
    padding: "10px 0",
    borderRadius: "12px",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: "800",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  stickyNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    padding: "16px 20px 32px",
    display: "flex",
    gap: "12px",
    borderTop: "1.5px solid #f1f5f9",
    zIndex: 1000
  },
  backBtn: {
    flex: 1,
    padding: "16px",
    borderRadius: "100px",
    background: "white",
    border: "2px solid #f1f5f9",
    color: "#64748b",
    fontWeight: "700",
    cursor: "pointer"
  },
  generateBtn: {
    flex: 2,
    padding: "16px",
    borderRadius: "100px",
    border: "none",
    color: "white",
    fontWeight: "800",
    fontSize: "1rem",
    cursor: "pointer"
  }
};
