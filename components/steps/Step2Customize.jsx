import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const colors = [
  '#f472b6', '#a855f7', '#fb923c', '#60a5fa', '#34d399'
];

const musicOptions = [
  { id: 'none', title: 'No Music', emoji: '🔇', url: null },
  { id: 'happy', title: 'Happy Birthday', emoji: '🎶', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'romantic', title: 'Romantic', emoji: '❤️', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'party', title: 'Party', emoji: '🎉', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export default function Step2Customize({ formData, updateForm, nextStep, prevStep }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(null);

  const previewEmoji = formData.gift_emoji || "✨";

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

      {/* 🌟 PREMIUM PREVIEW */}
      <div style={{ ...styles.previewCard, background: formData.theme_color }}>
        <div style={styles.overlay}></div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <div style={styles.previewEmoji}>{previewEmoji}</div>

          <h2>{formData.recipient_name || "Recipient Name"}</h2>

          <p>{formData.message || "Your message will appear here..."}</p>

          <p style={{ opacity: 0.8 }}>
            {formData.music_choice !== "none"
              ? `🎵 ${formData.music_choice}`
              : "🔇 No music"}
          </p>
        </motion.div>
      </div>

      {/* TITLE */}
      <h2 style={styles.title}>Customize Your Gift</h2>

      {/* NAME INPUT */}
      <input
        placeholder="Enter Name"
        value={formData.recipient_name}
        onChange={(e) => updateForm("recipient_name", e.target.value)}
        style={styles.input}
      />

      {/* 🎵 MUSIC */}
      <div style={styles.section}>
        {musicOptions.map(track => (
          <motion.div
            key={track.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => updateForm("music_choice", track.id)}
            style={{
              ...styles.musicCard,
              border: formData.music_choice === track.id
                ? `2px solid ${formData.theme_color}`
                : "1px solid #eee"
            }}
          >
            {track.emoji} {track.title}

            {track.url && (
              <button
                onClick={(e) => { e.stopPropagation(); playMusic(track); }}
                style={styles.playBtn}
              >
                {playing === track.id ? "Pause" : "Play"}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* 🎨 COLORS */}
      <div style={styles.colorWrap}>
        {colors.map(color => (
          <div
            key={color}
            onClick={() => updateForm("theme_color", color)}
            style={{
              ...styles.color,
              background: color,
              boxShadow: formData.theme_color === color
                ? `0 0 15px ${color}`
                : "none"
            }}
          />
        ))}
      </div>

      {/* 🔘 BUTTONS */}
      <div style={styles.btnWrap}>
        <button style={styles.backBtn} onClick={prevStep}>
          ⬅ Back
        </button>

        <button
          style={styles.nextBtn}
          onClick={nextStep}
          disabled={!formData.recipient_name}
        >
          Next ➜
        </button>
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

  title: {
    fontSize: "1.8rem",
    margin: "2rem 0",
    fontWeight: "800"
  },

  input: {
    padding: "12px",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    marginBottom: "2rem"
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  musicCard: {
    padding: "10px",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between"
  },

  playBtn: {
    background: "#eee",
    borderRadius: "10px",
    padding: "5px 10px"
  },

  colorWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "2rem 0"
  },

  color: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer"
  },

  btnWrap: {
    display: "flex",
    justifyContent: "space-between"
  },

  backBtn: {
    padding: "10px 20px",
    borderRadius: "20px"
  },

  nextBtn: {
    padding: "10px 20px",
    borderRadius: "20px",
    background: "#a855f7",
    color: "white"
  },

  /* PREMIUM PREVIEW */
  previewCard: {
    padding: "2rem",
    borderRadius: "20px",
    color: "white",
    marginBottom: "2rem",
    position: "relative"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)"
  },

  previewEmoji: {
    fontSize: "4rem"
  }
};