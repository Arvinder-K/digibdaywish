"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('digibday_cookie_consent');
        if (!consent) {
            // Slight delay so it doesn't instantly jump text on page load
            const timer = setTimeout(() => setShowConsent(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleConsent = (accepted) => {
        localStorage.setItem('digibday_cookie_consent', accepted ? 'accepted' : 'declined');
        setShowConsent(false);
        if (accepted) {
            // Usually where you would initialize Google Analytics / AdSense
            console.log("Cookies accepted. AdSense can load now.");
        } else {
            console.log("Cookies declined. Tracking blocked.");
        }
    };

    return (
        <AnimatePresence>
            {showConsent && (
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={styles.wrapper}
                >
                    <div style={styles.card}>
                        <div style={styles.content}>
                            <h4 style={styles.title}>🍪 We value your privacy</h4>
                            <p style={styles.text}>
                                We use cookies and Google Ads to improve your experience and show relevant ads. 
                                By clicking "Accept", you agree to our use of cookies. 
                                Read our <Link href="/privacy" style={styles.link}>Privacy Policy</Link> and <Link href="/terms" style={styles.link}>Terms of Service</Link> for details.
                            </p>
                        </div>
                        <div style={styles.actions}>
                            <button 
                                onClick={() => handleConsent(false)} 
                                style={styles.declineBtn}
                            >
                                Decline
                            </button>
                            <button 
                                onClick={() => handleConsent(true)} 
                                style={styles.acceptBtn}
                            >
                                Accept All
                            </button>
                            <button 
                                onClick={() => setShowConsent(false)} 
                                style={styles.closeBtn}
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const styles = {
    wrapper: {
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none'
    },
    card: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1.25rem 1.5rem',
        borderRadius: '16px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        pointerEvents: 'auto',
        fontFamily: "'Inter', sans-serif"
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: '1rem',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '4px'
    },
    text: {
        fontSize: '0.85rem',
        color: '#475569',
        lineHeight: '1.5'
    },
    link: {
        color: '#8b5cf6',
        textDecoration: 'underline',
        fontWeight: '600'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    declineBtn: {
        padding: '10px 16px',
        background: 'transparent',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        color: '#64748b',
        fontSize: '0.85rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    acceptBtn: {
        padding: '10px 20px',
        background: '#1e293b',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.85rem',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.2s'
    },
    closeBtn: {
        background: 'transparent',
        border: 'none',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '4px',
        marginLeft: '4px'
    }
};
