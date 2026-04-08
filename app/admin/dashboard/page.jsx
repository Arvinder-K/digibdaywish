"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllFeedback, updateFeedbackStatus, deleteFeedback, getAnalytics, getContactMessages, deleteContactMessage } from '../../../lib/feedback';
import { Users, MessageCircle, Star, Check, X, Shield, RefreshCw, Trash2, Mail } from 'lucide-react';

export default function AdminDashboard() {
    const [feedback, setFeedback] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('feedback'); // 'feedback' | 'messages'
    const [analytics, setAnalytics] = useState({ visits: 0, totalFeedback: 0, approvedCount: 0, avgRating: 0 });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const isAdmin = localStorage.getItem('digibday_is_admin');
        if (isAdmin !== 'true') {
            router.push('/admin/login');
            return;
        }
        refreshData();
        setLoading(false);
    }, []);

    const refreshData = () => {
        setFeedback(getAllFeedback().reverse());
        setMessages(getContactMessages().reverse());
        setAnalytics(getAnalytics());
    };

    const handleAction = (id, action) => {
        if (action === 'delete') {
            if (confirm('Are you sure you want to delete this feedback?')) {
                deleteFeedback(id);
            }
        } else {
            updateFeedbackStatus(id, action);
        }
        refreshData();
    };

    const handleMessageDelete = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            deleteContactMessage(id);
            refreshData();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('digibday_is_admin');
        router.push('/admin/login');
    };

    if (loading) return null;

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.brand}>
                    <Shield size={24} color="#8b5cf6" />
                    <span style={styles.brandText}>DigiBdayWish Admin</span>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>

            {/* Analytics Grid */}
            <div style={styles.grid}>
                <StatCard 
                    icon={<Users color="#8b5cf6" />} 
                    label="Total Visits" 
                    value={analytics.visits} 
                    bgColor="#f5f3ff"
                />
                <StatCard 
                    icon={<MessageCircle color="#3b82f6" />} 
                    label="Submissions" 
                    value={analytics.totalFeedback} 
                    bgColor="#eff6ff"
                />
                <StatCard 
                    icon={<Check color="#10b981" />} 
                    label="Approved" 
                    value={analytics.approvedCount} 
                    bgColor="#ecfdf5"
                />
                <StatCard 
                    icon={<Star color="#fbbf24" />} 
                    label="Avg Rating" 
                    value={analytics.avgRating} 
                    bgColor="#fffbeb"
                />
            </div>

            {/* Feedback Management */}
            <div style={styles.content}>
                <div style={styles.sectionHeader}>
                    <div style={styles.tabContainer}>
                        <button 
                            onClick={() => setActiveTab('feedback')} 
                            style={{...styles.tabBtn, borderBottom: activeTab === 'feedback' ? '3px solid #8b5cf6' : '3px solid transparent', color: activeTab === 'feedback' ? '#1e293b' : '#64748b'}}
                        >
                            Wall of Love ({feedback.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('messages')} 
                            style={{...styles.tabBtn, borderBottom: activeTab === 'messages' ? '3px solid #8b5cf6' : '3px solid transparent', color: activeTab === 'messages' ? '#1e293b' : '#64748b'}}
                        >
                            Inbox ({messages.length})
                        </button>
                    </div>

                    <button onClick={refreshData} style={styles.refreshBtn}>
                        <RefreshCw size={18} /> Refresh
                    </button>
                </div>

                <div style={styles.tableContainer}>
                    <AnimatePresence mode="popLayout">
                        {activeTab === 'feedback' ? (
                            feedback.length > 0 ? (
                                feedback.map((item) => (
                                <motion.div 
                                    key={item.id} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    style={{
                                        ...styles.feedbackCard,
                                        borderLeft: `6px solid ${
                                            item.status === 'approved' ? '#10b981' : 
                                            item.status === 'rejected' ? '#ef4444' : '#94a3b8'
                                        }`
                                    }}
                                >
                                    <div style={styles.feedbackInfo}>
                                        <div style={styles.feedbackHeader}>
                                            <span style={styles.name}>{item.name}</span>
                                            <div style={styles.ratingStars}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        size={14} 
                                                        fill={i < item.rating ? '#fbbf24' : 'none'} 
                                                        color={i < item.rating ? '#fbbf24' : '#cbd5e1'} 
                                                    />
                                                ))}
                                            </div>
                                            <span style={{
                                                ...styles.statusBadge,
                                                background: item.status === 'approved' ? '#ecfdf5' : 
                                                           item.status === 'rejected' ? '#fef2f2' : '#f1f5f9',
                                                color: item.status === 'approved' ? '#059669' : 
                                                       item.status === 'rejected' ? '#dc2626' : '#64748b'
                                            }}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div style={styles.tagGrid}>
                                            {(item.message || "").split(', ').filter(Boolean).map((tag, idx) => (
                                                <span key={idx} style={styles.tagChip}>
                                                    {tag}
                                                </span>
                                            ))}
                                            {(!item.message || item.message.trim() === "") && (
                                                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontStyle: 'italic' }}>
                                                    No tags selected
                                                </span>
                                            )}
                                        </div>
                                        <span style={styles.time}>{new Date(item.timestamp).toLocaleString()}</span>
                                    </div>
                                    
                                    <div style={styles.actions}>
                                        <button 
                                            onClick={() => handleAction(item.id, 'approved')} 
                                            style={{
                                                ...styles.actionBtn,
                                                background: item.status === 'approved' ? '#10b981' : '#f1f5f9',
                                                color: item.status === 'approved' ? 'white' : '#10b981'
                                            }}
                                            title="Approve"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(item.id, 'rejected')} 
                                            style={{
                                                ...styles.actionBtn,
                                                background: item.status === 'rejected' ? '#ef4444' : '#f1f5f9',
                                                color: item.status === 'rejected' ? 'white' : '#ef4444'
                                            }}
                                            title="Reject"
                                        >
                                            <X size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleAction(item.id, 'delete')} 
                                            style={{...styles.actionBtn, background: '#f8fafc', color: '#64748b'}}
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div style={styles.empty}>No feedback yet. 📥</div>
                        )
                    ) : null}
                        
                        {activeTab === 'messages' ? (
                            messages.length > 0 ? (
                                messages.map((msg) => (
                                    <motion.div 
                                        key={msg.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        style={{...styles.feedbackCard, borderLeft: '6px solid #3b82f6'}}
                                    >
                                        <div style={styles.feedbackInfo}>
                                            <div style={styles.feedbackHeader}>
                                                <span style={styles.name}>{msg.name}</span>
                                                <span style={styles.emailBadge}>{msg.email}</span>
                                            </div>
                                            <p style={{...styles.message, color: '#1e293b', fontWeight: '500', marginTop: '8px'}}>{msg.message}</p>
                                            <span style={styles.time}>{new Date(msg.timestamp).toLocaleString()}</span>
                                        </div>
                                        
                                        <div style={styles.actions}>
                                            <button 
                                                onClick={() => handleMessageDelete(msg.id)} 
                                                style={{...styles.actionBtn, background: '#fef2f2', color: '#ef4444'}}
                                                title="Delete Message"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div style={styles.empty}>Inbox is empty. 📭</div>
                            )
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

const StatCard = ({ icon, label, value, bgColor }) => (
    <div style={styles.statCard}>
        <div style={{...styles.statIcon, background: bgColor}}>{icon}</div>
        <div style={styles.statContent}>
            <span style={styles.statLabel}>{label}</span>
            <span style={styles.statValue}>{value}</span>
        </div>
    </div>
);

const styles = {
    container: {
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Inter, sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem'
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    brandText: {
        fontSize: '1.25rem',
        fontWeight: '900',
        color: '#1e293b'
    },
    logoutBtn: {
        padding: '8px 16px',
        borderRadius: '10px',
        background: 'white',
        border: '1.5px solid #e2e8f0',
        color: '#64748b',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '0.85rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '3rem'
    },
    statCard: {
        background: 'white',
        padding: '1.5rem',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    },
    statIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    statLabel: {
        color: '#64748b',
        fontSize: '0.85rem',
        fontWeight: '600'
    },
    statValue: {
        fontSize: '1.5rem',
        fontWeight: '900',
        color: '#1e293b'
    },
    content: {
        background: 'white',
        borderRadius: '32px',
        padding: '2rem',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '1px solid #e2e8f0'
    },
    tabContainer: {
        display: 'flex',
        gap: '20px'
    },
    tabBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: '800',
        padding: '0 0 12px 0',
        cursor: 'pointer',
        transition: 'color 0.2s',
        position: 'relative',
        top: '1px' // Cover the border
    },
    refreshBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        color: '#8b5cf6',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '0.9rem'
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    feedbackCard: {
        background: '#f8fafc',
        padding: '1.25rem',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
    },
    feedbackInfo: {
        flex: 1
    },
    feedbackHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px'
    },
    name: {
        fontWeight: '800',
        color: '#1e293b'
    },
    ratingStars: {
        display: 'flex',
        gap: '2px'
    },
    statusBadge: {
        padding: '4px 10px',
        borderRadius: '8px',
        fontSize: '0.7rem',
        fontWeight: '900',
        letterSpacing: '0.05em'
    },
    tagGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        margin: '12px 0'
    },
    tagChip: {
        background: 'white',
        padding: '8px 14px',
        borderRadius: '10px',
        fontSize: '0.9rem',
        fontWeight: '700',
        color: '#0f172a', // Darker text for clarity
        border: '2px solid #e2e8f0', // Thicker border
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    time: {
        fontSize: '0.8rem',
        color: '#475569', // Darker gray for clarity
        fontWeight: '600'
    },
    actions: {
        display: 'flex',
        gap: '8px'
    },
    actionBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    },
    empty: {
        textAlign: 'center',
        padding: '3rem',
        color: '#94a3b8',
        fontWeight: '600'
    },
    emailBadge: {
        background: '#eff6ff',
        color: '#3b82f6',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: '700'
    }
};
