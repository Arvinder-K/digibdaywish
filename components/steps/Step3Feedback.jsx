"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Send } from "lucide-react";
import { saveFeedback } from "../../lib/feedback";

const FEEDBACK_OPTIONS = [
  "😊 Easy to use",
  "🎉 Loved the design",
  "🚀 Fast experience",
  "💡 Unique idea",
  "🐛 Found a bug",
  "🎨 Need more templates",
  "⚙️ Can be improved"
];

export default function Step3Feedback({ nextStep, prevStep }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
        setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (rating === 0 || selectedTags.length === 0) return;
    
    setIsSubmitting(true);
    try {
      await saveFeedback({ 
        name, 
        message: selectedTags.join(", "), 
        rating 
      });
      setSubmitted(true);
      setTimeout(() => nextStep(), 1500);
    } catch (err) {
      alert(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={styles.title}>How was your experience?</h1>

        <div style={styles.card}>
          <p style={styles.subtitle}>
            Your feedback helps us make DigiBdayWish better for everyone! 💖
          </p>

          <div style={styles.starsWrap}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={40}
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                fill={(hoverRating || rating) >= star ? "#fbbf24" : "none"}
                color={(hoverRating || rating) >= star ? "#fbbf24" : "#cbd5e1"}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            
            <div style={styles.tagGrid}>
              {FEEDBACK_OPTIONS.map(tag => (
                <motion.button
                  key={tag}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTag(tag)}
                  style={{
                    ...styles.tag,
                    background: selectedTags.includes(tag) ? "#8b5cf6" : "rgba(255,255,255,0.5)",
                    color: selectedTags.includes(tag) ? "#fff" : "#64748b",
                    borderColor: selectedTags.includes(tag) ? "#8b5cf6" : "#e2e8f0"
                  }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>

          <div style={styles.btnWrap}>
            <button onClick={prevStep} style={styles.backBtn}>Back</button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || selectedTags.length === 0 || isSubmitting || submitted}
              style={{
                ...styles.nextBtn,
                background: submitted 
                  ? "#10b981" 
                  : (rating > 0 && selectedTags.length > 0)
                    ? "linear-gradient(135deg, #8b5cf6, #ec4899)" 
                    : "#cbd5e1",
                cursor: (rating === 0 || selectedTags.length === 0 || isSubmitting || submitted) ? "not-allowed" : "pointer"
              }}
            >
              {submitted ? "Thank You!" : isSubmitting ? "Sending..." : (rating > 0 && selectedTags.length > 0) ? "Submit & Continue" : "Pick Tags to Continue"}
            </button>
          </div>
          
          <button onClick={nextStep} style={styles.skipLink}>
            Skip for now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    padding: "2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg,#fdf2f8,#f3e8ff,#eff6ff)",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif"
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "900",
    margin: "4rem 0 2rem",
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
    margin: "0 auto",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
    position: "relative",
    zIndex: 2
  },
  subtitle: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "2rem"
  },
  starsWrap: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "2rem"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "2rem"
  },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1.5px solid #e2e8f0",
    fontSize: "0.95rem",
    outline: "none",
    color: "#1e293b",
    background: "rgba(255,255,255,0.5)"
  },
  tagGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
  },
  tag: {
    padding: "8px 16px",
    borderRadius: "100px",
    border: "1px solid",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
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
    transition: "all 0.3s ease"
  },
  skipLink: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    marginTop: "1.5rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline"
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
