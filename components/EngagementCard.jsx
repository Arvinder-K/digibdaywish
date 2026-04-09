"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, MessageSquare, Star, X, CheckCircle } from 'lucide-react';
import { saveFeedback, getAnalytics } from '../lib/feedback';

const FEEDBACK_OPTIONS = [
    "😊 Easy to use",
    "🎉 Loved the design",
    "🚀 Fast experience",
    "💡 Unique idea",
    "🐛 Found a bug",
    "🎨 Need more templates",
    "⚙️ Can be improved"
];

const EngagementCard = ({ themeColor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
    const [errorMessage, setErrorMessage] = useState('');
    const [analytics, setAnalytics] = useState({ visits: 0, totalFeedback: 0, approvedCount: 0, avgRating: 0 });

    useEffect(() => {
        getAnalytics().then(setAnalytics).catch(console.error);
    }, [formStatus]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'DigiBdayWish - Sparking Smiles 🎉',
            text: 'I found this amazing way to send digital birthday surprises! Check it out! 🎂',
            url: window.location.origin
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                navigator.clipboard.writeText(window.location.origin);
                alert('Link copied to clipboard! 📋');
            }
        } catch (err) {
            console.error('Sharing failed', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        if (rating === 0) {
            setErrorMessage('Please provide a rating! ⭐');
            return;
        }

        if (selectedTags.length === 0) {
            setErrorMessage('Please select at least one option! 👆');
            return;
        }

        const data = {
            name: formData.get('name'),
            message: selectedTags.join(', '),
            rating: rating
        };

        setFormStatus('submitting');
        try {
            await saveFeedback(data);
            setFormStatus('success');
            setTimeout(() => {
                setIsModalOpen(false);
                setFormStatus('idle');
                setRating(0);
                setSelectedTags([]);
            }, 2000);
        } catch (err) {
            setErrorMessage(err.message);
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 3000);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.title}>Loved this birthday surprise? 🎉</h3>
                <p style={styles.subtitle}>Help us spread more smiles 💖</p>

                <div style={styles.btnRow}>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        style={styles.actionBtn}
                        onClick={handleShare}
                    >
                        <Share2 size={18} /> Share
                    </motion.button>

                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        style={styles.actionBtn}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <MessageSquare size={18} /> Give Feedback
                    </motion.button>
                </div>

                <div style={styles.stats}>
                    <div style={styles.ratingRow}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                                key={star} 
                                size={20} 
                                fill={star <= analytics.avgRating ? '#ffb900' : 'none'} 
                                color={star <= analytics.avgRating ? '#ffb900' : '#cbd5e1'} 
                            />
                        ))}
                        <span style={styles.ratingText}>
                            {analytics.avgRating}/5 from {analytics.approvedCount} users
                        </span>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div style={styles.modalOverlay}>
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={styles.modal}
                        >
                            <button style={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>

                            {formStatus === 'success' ? (
                                <div style={styles.successView}>
                                    <CheckCircle size={60} color="#10b981" />
                                    <h2 style={{marginTop: '1rem'}}>Thank You!</h2>
                                    <p>Your feedback is pending approval. ✨</p>
                                </div>
                            ) : (
                                <>
                                    <h2 style={styles.modalTitle}>Your Experience Matters</h2>
                                    <p style={styles.modalSubtitle}>What did you think about DigiBdayWish? ✨</p>

                                    <form style={styles.form} onSubmit={handleSubmit}>
                                        <div style={styles.starsInput}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star 
                                                    key={star} 
                                                    size={32}
                                                    style={{ cursor: 'pointer' }}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setRating(star)}
                                                    fill={(hoverRating || rating) >= star ? '#ffb900' : 'none'}
                                                    color={(hoverRating || rating) >= star ? '#ffb900' : '#cbd5e1'}
                                                />
                                            ))}
                                        </div>

                                        <input 
                                            name="name" 
                                            placeholder="Your Name (Optional)" 
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
                                                        background: selectedTags.includes(tag) ? themeColor : '#f1f5f9',
                                                        color: selectedTags.includes(tag) ? '#fff' : '#64748b',
                                                        borderColor: selectedTags.includes(tag) ? themeColor : '#e2e8f0'
                                                    }}
                                                >
                                                    {tag}
                                                </motion.button>
                                            ))}
                                        </div>

                                        {formStatus === 'error' && (
                                            <p style={{color: '#ef4444', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center'}}>
                                                {errorMessage}
                                            </p>
                                        )}

                                        <motion.button 
                                            whileHover={{ scale: 1.02 }} 
                                            whileTap={{ scale: 0.98 }}
                                            style={{...styles.submitBtn, background: themeColor}}
                                            disabled={formStatus === 'submitting'}
                                        >
                                            {formStatus === 'submitting' ? 'Sending...' : 'Submit Feedback'}
                                        </motion.button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 0',
        zIndex: 10
    },
    card: {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
        maxWidth: '450px',
        width: '90%',
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: '800',
        marginBottom: '0.5rem',
        color: 'white'
    },
    subtitle: {
        fontSize: '0.9rem',
        opacity: 0.8,
        color: 'white',
        marginBottom: '1.5rem'
    },
    btnRow: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '1.5rem'
    },
    actionBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderRadius: '12px',
        background: 'white',
        color: '#1e293b',
        border: 'none',
        fontWeight: '700',
        fontSize: '0.85rem',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    ratingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    ratingText: {
        fontSize: '0.8rem',
        fontWeight: '600',
        color: 'white',
        opacity: 0.9,
        marginLeft: '4px'
    },

    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
    },
    modal: {
        background: 'white',
        borderRadius: '24px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        color: '#1e293b',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
    },
    closeBtn: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        cursor: 'pointer'
    },
    modalTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        marginBottom: '0.5rem',
        textAlign: 'center'
    },
    modalSubtitle: {
        fontSize: '0.9rem',
        color: '#64748b',
        textAlign: 'center',
        marginBottom: '2rem'
    },
    starsInput: {
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '2rem'
    },
    input: {
        width: '100%',
        padding: '14px',
        borderRadius: '12px',
        border: '1.5px solid #e2e8f0',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        outline: 'none',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s',
        color: '#1e293b'
    },
    tagGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '2rem'
    },
    tag: {
        padding: '8px 16px',
        borderRadius: '100px',
        border: '1px solid',
        fontSize: '0.85rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap'
    },
    submitBtn: {
        width: '100%',
        padding: '16px',
        borderRadius: '12px',
        border: 'none',
        color: 'white',
        fontWeight: '800',
        cursor: 'pointer',
        fontSize: '1rem',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
    },
    successView: {
        textAlign: 'center',
        padding: '2rem 0'
    }
};

export default EngagementCard;
