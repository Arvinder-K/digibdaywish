"use client";
import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import EngagementCard from './EngagementCard';
import { recordVisit } from '../lib/feedback';

// 🎨 ANIMATED DECORATIONS
const FloatingDecorations = ({ type }) => {
  const emojis = {
    cake: ['🎂', '🧁', '🍰', '✨', '🎈'],
    bouquet: ['💐', '🌹', '🌸', '🌷', '✨'],
    giftbox: ['🎁', '💝', '🎀', '💎', '✨'],
    balloons: ['🎈', '🎊', '🎉', '🌟', '✨'],
    love: ['❤️', '💖', '💘', '💝', '💕'],
  }[type] || ['✨', '🌟', '🎉'];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            y: '110vh', 
            x: `${Math.random() * 100}vw`,
            rotate: 0 
          }}
          animate={{ 
            opacity: [0, 0.5, 0], 
            y: '-10vh',
            rotate: 360,
            x: `${Math.random() * 100}vw`
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          style={{ 
            position: 'absolute', 
            fontSize: `${1.5 + Math.random() * 2}rem`,
            filter: 'blur(1px)'
          }}
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
};

// 🎵 MUSIC EQUALIZER
const MusicVisualizer = ({ color }) => (
  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '24px' }}>
    {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
      <motion.div
        key={i}
        animate={{ height: [`${h * 10}px`, `${h * 24}px`, `${h * 10}px`] }}
        transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "easeInOut" }}
        style={{ width: '4px', background: color, borderRadius: '10px' }}
      />
    ))}
  </div>
);

export default function WishViewer({ wish }) {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    recordVisit();
  }, []);

  const handleOpen = () => {
    setOpened(true);
    fireConfetti();
    if (wish?.music_choice !== 'none' && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log('Audio play failed', e));
      setIsPlaying(true);
    }
  };

  const fireConfetti = () => {
    const scalar = 2;
    const triangle = confetti.shapeFromPath({ path: 'M0 10 L5 0 L10 10z' });

    confetti({
      shapes: [triangle],
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [wish.theme_color, '#ffffff', '#ffd700']
    });
  };

  const getEmoji = (type) => {
    const map = { cake: '🎂', bouquet: '💐', giftbox: '🎁', balloons: '🎈', love: '❤️' };
    return map[type] || '🎁';
  };

  if (!wish) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${wish.theme_color}, ${wish.theme_color}dd, ${wish.theme_color})`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
      padding: '20px',
      margin: 0,
      fontFamily: "'Outfit', sans-serif"
    }}>
      
      {/* 🔮 PREMIUM OVERLAYS */}
      <div style={styles.vignette}></div>
      {isMounted && <FloatingDecorations type={wish.gift_type} />}

      {/* Background audio */}
      {wish.music_choice !== 'none' && (
        <audio ref={audioRef} loop>
          <source src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`} type="audio/mpeg" />
        </audio>
      )}

      {/* 🎵 MINI PLAYER */}
      {isPlaying && isMounted && (
        <div style={styles.miniPlayer}>
          <MusicVisualizer color="white" />
          <span style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.8 }}>{wish.music_choice}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="unopened"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0, filter: 'blur(20px)' }}
            transition={{ type: 'spring', damping: 15 }}
            style={{ textAlign: 'center', cursor: 'pointer', zIndex: 10 }}
            onClick={handleOpen}
          >
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, -5, 5, 0],
                scale: [1, 1.05, 1]
              }} 
              transition={{ repeat: Infinity, duration: 4 }}
              style={{ fontSize: '10rem', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
            >
              🎁
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }}
              style={styles.landingTitle}
            >
              For {wish.recipient_name}
            </motion.h1>
            
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ type: 'spring', delay: 0.6 }}
              style={styles.openHint}
            >
              Tap to Reveal Surprise ✨
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 1 }}
            style={styles.glassCard}
          >
            <div style={styles.glassGlow}></div>
            
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={styles.finalEmoji}
            >
              {getEmoji(wish.gift_type)}
            </motion.div>
            
            <h1 style={styles.mainTitle}>Happy Birthday!</h1>
            <h2 style={styles.recipientName}>{wish.recipient_name}</h2>
            
            <div style={styles.divider}></div>
            
            <p style={styles.messageText}>{wish.message}</p>

            <div style={styles.actionRow}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.primaryBtn}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied! Share it with " + wish.recipient_name);
                }}
              >
                🔗 Copy Link
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.secondaryBtn}
                onClick={() => window.location.href = '/'}
              >
                Create One
              </motion.button>
            </div>
            
            <EngagementCard themeColor={wish.theme_color} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  vignette: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.2) 100%)',
    pointerEvents: 'none',
    zIndex: 1
  },

  landingTitle: {
    fontSize: '2.5rem',
    marginTop: '2rem',
    fontWeight: '900',
    textShadow: '0 4px 8px rgba(0,0,0,0.2)',
    letterSpacing: '-0.02em'
  },

  openHint: {
    marginTop: '1.5rem',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '12px 24px',
    borderRadius: '100px',
    fontSize: '0.9rem',
    fontWeight: '700',
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  },

  glassCard: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    padding: '3.5rem 2.5rem',
    borderRadius: '40px',
    border: '1px solid rgba(255,255,255,0.25)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
    zIndex: 10,
    position: 'relative',
    overflow: 'hidden'
  },

  glassGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    pointerEvents: 'none'
  },

  finalEmoji: {
    fontSize: '6.5rem',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))',
  },

  mainTitle: {
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    opacity: 0.8,
    fontWeight: '800',
    marginBottom: '0.5rem'
  },

  recipientName: {
    fontSize: '3.5rem',
    fontWeight: '900',
    lineHeight: 1,
    marginBottom: '2rem',
    textShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },

  divider: {
    height: '2px',
    width: '40px',
    background: 'white',
    margin: '0 auto 2rem',
    opacity: 0.5,
    borderRadius: '10px'
  },

  messageText: {
    fontSize: '1.3rem',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    opacity: 0.95,
    fontWeight: '500',
    marginBottom: '3rem'
  },

  actionRow: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center'
  },

  primaryBtn: {
    background: 'white',
    color: '#1e293b',
    padding: '14px 28px',
    borderRadius: '16px',
    border: 'none',
    fontWeight: '800',
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  },

  secondaryBtn: {
    background: 'rgba(0,0,0,0.2)',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.3)',
    fontWeight: '800',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },

  miniPlayer: {
    position: 'absolute',
    top: '30px',
    right: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0,0,0,0.2)',
    padding: '8px 16px',
    borderRadius: '100px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    zIndex: 100
  }
};
