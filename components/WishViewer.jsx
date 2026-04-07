"use client";
import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishViewer({ wish }) {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    setOpened(true);
    fireConfetti();
    if (wish?.music_choice !== 'none' && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log('Audio play failed', e));
    }
  };

  const fireConfetti = () => {
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: [wish?.theme_color || '#ff0000']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: [wish?.theme_color || '#ff0000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const getEmoji = (type) => {
    const map = { cake: '🎂', bouquet: '💐', giftbox: '🎁', balloons: '🎈', love: '❤️' };
    return map[type] || '🎁';
  };

  if (!wish) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: wish.theme_color,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      overflow: 'hidden',
      position: 'relative',
      padding: '20px',
      margin: 0
    }}>
      {/* Background audio */}
      {wish.music_choice !== 'none' && (
        <audio ref={audioRef} loop>
          <source src={`https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3`} type="audio/mpeg" />
        </audio>
      )}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="unopened"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            style={{ textAlign: 'center', cursor: 'pointer', zIndex: 10 }}
            onClick={handleOpen}
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ fontSize: '8rem', textShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
            >
              🎁
            </motion.div>
            <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              A gift for {wish.recipient_name}
            </h1>
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', opacity: 0.8 }}>Turn up your volume! 🔊</p>
            <button 
              style={{ 
                marginTop: '2rem', 
                background: 'white', 
                color: wish.theme_color, 
                fontSize: '1.3rem', 
                padding: '16px 32px',
                border: 'none',
                borderRadius: '50px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              Tap to Open!
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="opened"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              padding: '3rem',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.3)',
              textAlign: 'center',
              maxWidth: '600px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            <div className="animated-float" style={{ fontSize: '6rem', marginBottom: '1rem', textShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
              {getEmoji(wish.gift_type)}
            </div>
            
            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              Happy Birthday, {wish.recipient_name}!
            </h1>
            
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              padding: '2rem',
              borderRadius: '16px',
              fontSize: '1.4rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              margin: '0 auto',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}>
              {wish.message}
            </div>

            <div style={{ marginTop: '3rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <button 
                style={{ 
                   background: 'white', 
                   color: wish.theme_color,
                   padding: '12px 24px',
                   borderRadius: '50px',
                   border: 'none',
                   fontWeight: '800',
                   cursor: 'pointer'
                }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied! Share it with " + wish.recipient_name);
                }}
              >
                🔗 Copy Link
              </button>
              <button 
                style={{ 
                   background: 'transparent', 
                   color: 'white',
                   padding: '12px 24px',
                   borderRadius: '50px',
                   border: '2px solid white',
                   fontWeight: '800',
                   cursor: 'pointer'
                }}
                onClick={() => window.location.href = '/'}
              >
                Create Another
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
