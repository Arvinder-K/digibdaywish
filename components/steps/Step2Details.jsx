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

export default function Step2Details({ formData, updateForm, nextStep, prevStep }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(null);

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
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* TITLE */}
        <h1 style={styles.title}>Personalize Your Gift</h1>

        <div style={styles.card}>
          {/* SECTION 1: RECIPIENT */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Recipient's Name</label>
            <input
              placeholder="Who is this for?"
              value={formData.recipient_name}
              onChange={(e) => updateForm("recipient_name", e.target.value)}
              style={styles.input}
            />
          </div>

          {/* SECTION 2: MESSAGE */}
          <div style={styles.inputGroup}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <label style={styles.label}>Your Message</label>
              <button onClick={generateMessage} style={styles.aiBtn}>✨ Suggest</button>
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
                rows={3}
                style={styles.textarea}
              />
            )}
          </div>

          {/* SECTION 3: THEME COLOR */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Theme Color</label>
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
          </div>

          {/* SECTION 4: MUSIC */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Background Music</label>
            <div style={styles.musicGrid}>
              {musicOptions.map(track => (
                <motion.div
                  key={track.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateForm("music_choice", track.id)}
                  style={{
                    ...styles.musicItem,
                    background: formData.music_choice === track.id ? `${formData.theme_color}11` : "#fff",
                    border: formData.music_choice === track.id ? `2px solid ${formData.theme_color}` : "1px solid #eee"
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
          </div>

          {/* NAVIGATION */}
          <div style={styles.btnWrap}>
            <button onClick={prevStep} style={styles.backBtn}>Back</button>
            <button 
              onClick={nextStep} 
              disabled={!formData.recipient_name || !formData.message}
              style={{
                ...styles.nextBtn,
                background: `linear-gradient(135deg, ${formData.theme_color}, #a855f7)`,
                boxShadow: `0 10px 25px ${formData.theme_color}44`
              }}
            >
              Continue ➜
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
    textAlign: "left",
    position: "relative",
    zIndex: 2
  },

  inputGroup: {
    marginBottom: "2rem"
  },

  label: {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "800",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "12px"
  },

  input: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "2px solid #f1f5f9",
    background: "white",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s"
  },

  textarea: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "16px",
    border: "2px solid #f1f5f9",
    background: "white",
    fontSize: "1rem",
    outline: "none",
    resize: "none"
  },

  aiBtn: {
    background: "#f0fdf4",
    border: "none",
    color: "#15803d",
    padding: "4px 12px",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: "800",
    cursor: "pointer",
  },

  toggleWrap: {
    display: "flex",
    gap: "15px",
    marginBottom: "10px"
  },

  toggleBtn: {
    padding: "4px 0",
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "0.8rem",
    textTransform: "uppercase"
  },

  colorWrap: {
    display: "flex",
    gap: "15px",
  },

  colorCircle: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  musicGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "10px"
  },

  musicItem: {
    padding: "12px 16px",
    borderRadius: "16px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  musicInfo: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },

  musicTitle: {
    fontSize: "0.9rem",
    fontWeight: "700"
  },

  playBtn: {
    padding: "6px 12px",
    borderRadius: "10px",
    border: "none",
    fontSize: "0.7rem",
    fontWeight: "800",
    cursor: "pointer"
  },

  btnWrap: {
    display: "flex",
    gap: "12px",
    marginTop: "3rem"
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
    cursor: "pointer"
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
