"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, ExternalLink, Heart, Globe, Github } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { getApprovedFeedback } from '../lib/feedback';

const Footer = () => {
    const pathname = usePathname();
    const [approvedFeedback, setApprovedFeedback] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (pathname.startsWith('/admin')) return;
        
        let interval;
        getApprovedFeedback().then(feedback => {
            setApprovedFeedback(feedback);
            
            if (feedback.length > 1) {
                interval = setInterval(() => {
                    setCurrentIndex(prev => (prev + 1) % feedback.length);
                }, 6000);
            }
        }).catch(console.error);

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [pathname]);

    if (pathname.startsWith('/admin')) return null;

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.topSection}>
                    {/* 🚀 COLUMN 1: BRAND STORY */}
                    <div style={styles.column}>
                        <h2 style={styles.brandTitle}>DigiBdayWish ✨</h2>
                        <p style={styles.brandDesc}>
                            Sparking joy one digital surprise at a time. Create magical, personalized birthday memories in seconds.
                        </p>
                        <div style={styles.socialIcons}>
                            <Globe size={18} style={styles.socialIcon} />
                            <Github size={18} style={styles.socialIcon} />
                        </div>
                    </div>

                    {/* 💌 COLUMN 2: TESTIMONIALS */}
                    <div style={styles.column}>
                        <h3 style={styles.colTitle}>Wall of Love 💖</h3>
                        <div style={styles.feedbackCard}>
                            <AnimatePresence mode="wait">
                                {approvedFeedback.length > 0 ? (
                                    <motion.div 
                                        key={approvedFeedback[currentIndex].id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div style={styles.rating}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    size={12} 
                                                    fill={i < approvedFeedback[currentIndex].rating ? "#fbbf24" : "none"} 
                                                    color={i < approvedFeedback[currentIndex].rating ? "#fbbf24" : "rgba(255,255,255,0.2)"} 
                                                />
                                            ))}
                                        </div>
                                        <p style={styles.feedbackMsg}>"{approvedFeedback[currentIndex].message}"</p>
                                        <p style={styles.author}>— {approvedFeedback[currentIndex].name}</p>
                                    </motion.div>
                                ) : (
                                    <div style={styles.placeholder}>
                                        <p>No feedback approved yet. Be the first to share the love!</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* 🛠️ COLUMN 3: CREDITS */}
                    <div style={styles.column}>
                        <h3 style={styles.colTitle}>Recognition 🏆</h3>
                        <p style={styles.brandDesc}>
                            Crafted with precision for a viral birthday experience.
                        </p>
                        <a 
                            href="https://w3htmlschool.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={styles.creditBadge}
                        >
                            <div style={styles.badgeContent}>
                                <span style={styles.badgeLabel}>Design & Developed by</span>
                                <span style={styles.badgeName}>w3htmlschool</span>
                            </div>
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>

                <div style={styles.divider}></div>

                {/* 📜 BOTTOM SECTION */}
                <div style={styles.bottomSection}>
                    <p style={styles.disclaimerText}>
                        This site uses cookies and Google Ads to personalize content and ads, and to analyze our traffic.
                    </p>
                    <div style={styles.bottomLinksRow}>
                        <p style={styles.copyright}>© {new Date().getFullYear()} DigiBdayWish. All rights reserved.</p>
                        <div style={styles.bottomLinks}>
                            <Link href="/privacy" style={styles.bottomLink}>Privacy Policy</Link>
                            <span style={styles.dot}>•</span>
                            <Link href="/terms" style={styles.bottomLink}>Terms of Service</Link>
                            <span style={styles.dot}>•</span>
                            <Link href="/about" style={styles.bottomLink}>About</Link>
                            <span style={styles.dot}>•</span>
                            <Link href="/contact" style={styles.bottomLink}>Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        width: '100%',
        background: '#0f172a', // Deep Slate Dark Theme
        color: '#f8fafc',
        padding: '5rem 2rem 2rem',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10,
        fontFamily: "'Inter', sans-serif"
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    topSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem',
        textAlign: 'left'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    brandTitle: {
        fontFamily: "'Outfit', sans-serif",
        fontSize: '1.75rem',
        fontWeight: '900',
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em',
        background: 'linear-gradient(to right, #8b5cf6, #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    brandDesc: {
        fontSize: '0.95rem',
        lineHeight: '1.6',
        color: '#94a3b8',
        marginBottom: '1.5rem',
    },
    socialIcons: {
        display: 'flex',
        gap: '15px',
        color: '#64748b'
    },
    socialIcon: {
        cursor: 'pointer',
        transition: 'color 0.2s',
        ':hover': { color: '#8b5cf6' }
    },
    colTitle: {
        fontFamily: "'Outfit', sans-serif",
        fontSize: '1.1rem',
        fontWeight: '800',
        marginBottom: '1.5rem',
        color: 'white',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    feedbackCard: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '1.5rem',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    rating: {
        display: 'flex',
        gap: '3px',
        marginBottom: '1rem'
    },
    feedbackMsg: {
        fontSize: '0.95rem',
        fontStyle: 'italic',
        lineHeight: '1.6',
        color: '#e2e8f0',
        marginBottom: '0.75rem'
    },
    author: {
        fontSize: '0.8rem',
        fontWeight: '700',
        color: '#8b5cf6',
        textTransform: 'uppercase'
    },
    placeholder: {
        fontSize: '0.85rem',
        color: '#64748b',
        textAlign: 'center'
    },
    creditBadge: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        textDecoration: 'none',
        color: '#a78bfa',
        transition: 'all 0.3s ease',
        marginTop: 'auto'
    },
    badgeContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    badgeLabel: {
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        opacity: 0.8
    },
    badgeName: {
        fontSize: '1rem',
        fontWeight: '900',
        color: 'white'
    },
    divider: {
        height: '1px',
        background: 'rgba(255,255,255,0.05)',
        marginBottom: '2rem'
    },
    bottomSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        color: '#64748b',
        fontSize: '0.85rem',
        fontWeight: '500'
    },
    disclaimerText: {
        fontSize: '0.75rem',
        color: '#475569',
        textAlign: 'center',
        marginBottom: '0.5rem',
        maxWidth: '600px'
    },
    bottomLinksRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        width: '100%'
    },
    bottomLinks: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    bottomLink: {
        cursor: 'pointer',
        transition: 'color 0.2s',
        textDecoration: 'none',
        color: 'inherit'
    },
    dot: {
        opacity: 0.3
    },
    copyright: {
        opacity: 0.8,
        textAlign: 'center'
    }
};

export default Footer;
