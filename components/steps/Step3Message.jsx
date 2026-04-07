import React from "react";
import { motion } from "framer-motion";

const messageTypes = [
  { id: "short", label: "Short 💬" },
  { id: "long", label: "Long 📝" }
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

export default function Step3Message({ formData, updateForm, nextStep, prevStep }) {

  const previewEmoji = formData.gift_emoji || "✨";

  const generateMessage = () => {
    const category =
      formData.gift_type === "love" ? "love" :
        formData.gift_type === "bouquet" ? "friendship" :
          "birthday";

    const messages = messageCategories[category];
    const random = messages[Math.floor(Math.random() * messages.length)];

    updateForm("message", random);
  };

  return (
    <div style={styles.page}>

      {/* 🎉 PREMIUM PREVIEW */}
      <div style={{ ...styles.previewCard, background: formData.theme_color }}>
        <div style={styles.overlay}></div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <div style={styles.previewEmoji}>{previewEmoji}</div>

          <h2>{formData.recipient_name || "Recipient Name"}</h2>

          <p>
            {formData.message || "Your message will appear here..."}
          </p>
        </motion.div>
      </div>

      {/* TITLE */}
      <h2 style={styles.title}>Write Your Message</h2>

      {/* MESSAGE TYPE */}
      <div style={styles.toggleWrap}>
        {messageTypes.map(type => (
          <button
            key={type.id}
            onClick={() => updateForm("message_type", type.id)}
            style={{
              ...styles.toggleBtn,
              background:
                formData.message_type === type.id
                  ? formData.theme_color
                  : "#eee",
              color:
                formData.message_type === type.id
                  ? "white"
                  : "#333"
            }}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* INPUT */}
      {formData.message_type === "short" ? (
        <input
          placeholder="Write short message..."
          value={formData.message}
          onChange={(e) => updateForm("message", e.target.value)}
          style={styles.input}
        />
      ) : (
        <textarea
          placeholder="Write heartfelt message..."
          value={formData.message}
          onChange={(e) => updateForm("message", e.target.value)}
          rows={5}
          style={styles.textarea}
        />
      )}

      {/* ✨ AI SUGGEST */}
      <button style={styles.aiBtn} onClick={generateMessage}>
        ✨ Suggest Message
      </button>

      {/* BUTTONS */}
      <div style={styles.btnWrap}>
        <button style={styles.backBtn} onClick={prevStep}>
          ⬅ Back
        </button>

        <button
          style={styles.nextBtn}
          onClick={nextStep}
          disabled={!formData.message}
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
    fontWeight: "800",
    margin: "2rem 0"
  },

  toggleWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "1.5rem"
  },

  toggleBtn: {
    padding: "10px 20px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer"
  },

  input: {
    padding: "12px",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "12px",
    border: "1px solid #ddd"
  },

  textarea: {
    padding: "12px",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "12px",
    border: "1px solid #ddd"
  },

  aiBtn: {
    marginTop: "1rem",
    padding: "10px 20px",
    borderRadius: "20px",
    background: "#fb923c",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  btnWrap: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem"
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
    fontSize: "4rem",
    marginBottom: "1rem"
  }
};