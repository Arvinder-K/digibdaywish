"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Step3Share({ formData, prevStep }) {
  const [loading, setLoading] = useState(true);
  const [wishId, setWishId] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const themeColor = formData.theme_color || "#a855f7";
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/w/${wishId}` : "";

  useEffect(() => {
    const saveWish = async () => {
      try {
        const res = await fetch("/api/wish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
          const data = await res.json();
          setWishId(data.id);
          fireSuccessConfetti();
        } else {
          setError("Failed to create magic link. Please try again.");
        }
      } catch (err) {
        setError("Network error. Check your connection.");
      } finally {
        setLoading(false);
      }
    };

    saveWish();
  }, []);

  const fireSuccessConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: [themeColor, "#ffffff", "#a855f7"]
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `🎉 I've created a special birthday surprise for ${formData.recipient_name}! Check it out here: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Birthday Surprise! 🎉",
          text: `Check out this digital birthday gift for ${formData.recipient_name}!`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* TITLE */}
        <h1 style={styles.title}>All Set! 🎉</h1>

        <div style={styles.card}>
          {loading ? (
            <div style={styles.loadingArea}>
              <div style={styles.spinner}>✨</div>
              <h2 style={styles.loadingText}>Generating your magic link...</h2>
              <p style={styles.loadingSub}>Almost there!</p>
            </div>
          ) : error ? (
            <div style={styles.errorArea}>
              <div style={{ fontSize: "3rem" }}>⚠️</div>
              <h2>Oops!</h2>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} style={styles.retryBtn}>Try Again</button>
            </div>
          ) : (
            <>
              <p style={styles.subtitle}>
                Your digital surprise for <strong>{formData.recipient_name}</strong> is ready to be shared!
              </p>

              {/* 🔗 LINK BOX */}
              <div style={styles.linkBox}>
                <div style={styles.urlText}>{shareUrl}</div>
                <button 
                  onClick={copyToClipboard} 
                  style={{ ...styles.copyBtn, background: copied ? "#22c55e" : "#f8fafc", color: copied ? "white" : "#1e293b" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* 📤 SHARE BUTTONS */}
              <div style={styles.shareGrid}>
                <button onClick={shareWhatsApp} style={styles.whatsappBtn}>
                  Share on WhatsApp 💬
                </button>
                {typeof navigator !== "undefined" && navigator.share && (
                  <button onClick={handleNativeShare} style={styles.shareOtherBtn}>
                    Share to Other Apps 📤
                  </button>
                )}
              </div>

              {/* 🖼️ COMPLETE CARD PREVIEW */}
            <div style={styles.fullPreviewSection}>
              <p style={styles.previewLabel}>Final Card Preview</p>
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                style={{ ...styles.fullCard, background: themeColor }}
              >
                <div style={styles.fullCardOverlay}></div>
                <div style={{ position: "relative", zIndex: 10 }}>
                  <div style={styles.fullCardEmoji}>{formData.gift_emoji || "🎁"}</div>
                  <h3 style={styles.fullCardName}>{formData.recipient_name}</h3>
                  <p style={styles.fullCardMessage}>"{formData.message}"</p>
                  <div style={styles.fullCardMusic}>
                    {formData.music_choice !== "none" ? `🎵 ${formData.music_choice}` : "🔇 Silence"}
                  </div>
                </div>
              </motion.div>
            </div>
            </>
          )}

          {/* BACK */}
          <div style={styles.footer}>
            <button onClick={prevStep} style={styles.backBtn}>← Back to Customization</button>
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
    marginBottom: "2rem"
  },

  linkBox: {
    display: "flex",
    background: "white",
    padding: "8px",
    borderRadius: "16px",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #e2e8f0",
    marginBottom: "24px"
  },

  urlText: {
    flex: 1,
    fontSize: "0.8rem",
    color: "#64748b",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "left",
    paddingLeft: "8px"
  },

  copyBtn: {
    padding: "8px 16px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    fontSize: "0.8rem",
    fontWeight: "700",
    cursor: "pointer"
  },

  shareGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    marginBottom: "24px"
  },

  whatsappBtn: {
    padding: "14px",
    background: "#25D366",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontWeight: "800",
    cursor: "pointer"
  },

  shareOtherBtn: {
    padding: "14px",
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontWeight: "800",
    cursor: "pointer"
  },

  fullPreviewSection: {
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "1px solid #f1f5f9"
  },

  previewLabel: {
    fontSize: "0.75rem",
    fontWeight: "800",
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: "16px",
    letterSpacing: "0.05em"
  },

  fullCard: {
    padding: "2rem 1.5rem",
    borderRadius: "24px",
    color: "white",
    textAlign: "center",
    maxWidth: "340px",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
  },

  fullCardOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(6px)"
  },

  fullCardEmoji: {
    fontSize: "3.5rem",
    marginBottom: "12px"
  },

  fullCardName: {
    fontSize: "1.2rem",
    fontWeight: "900",
    marginBottom: "8px",
    textShadow: "0 2px 4px rgba(0,0,0,0.2)"
  },

  fullCardMessage: {
    fontSize: "0.9rem",
    lineHeight: "1.5",
    opacity: 0.95,
    marginBottom: "16px",
    whiteSpace: "pre-wrap"
  },

  fullCardMusic: {
    fontSize: "0.7rem",
    background: "rgba(0,0,0,0.2)",
    padding: "4px 12px",
    borderRadius: "100px",
    display: "inline-block"
  },

  footer: {
    marginTop: "24px"
  },

  backBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "0.85rem"
  },

  loadingArea: { padding: "40px 0" },
  spinner: { fontSize: "2.5rem", animation: "spin 2s linear infinite", display: "inline-block", marginBottom: "15px" },
  loadingText: { fontSize: "1.2rem", fontWeight: "800" },
  loadingSub: { color: "#94a3b8", fontSize: "0.85rem" },

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
