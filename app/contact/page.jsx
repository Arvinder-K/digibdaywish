"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { saveContactMessage } from '../../lib/feedback';

export default function ContactPage() {
    const [status, setStatus] = useState('idle'); // idle | submitting | success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        try {
            saveContactMessage(data);
            setTimeout(() => {
                setStatus('success');
                e.target.reset(); // Clear form
            }, 1000);
        } catch (err) {
            console.error(err);
            setStatus('idle');
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.iconWrap}>
                        <Mail size={32} color="#8b5cf6" />
                    </div>
                    <h1 style={styles.title}>Contact Us</h1>
                    <p style={styles.subtitle}>Have a question or suggestion? We'd love to hear from you. We usually respond within 24–48 hours.</p>
                </div>

                <div style={styles.formContainer}>
                    {status === 'success' ? (
                        <div style={styles.successState}>
                            <CheckCircle size={64} color="#10b981" style={{marginBottom: '1rem'}} />
                            <h2>Message Sent!</h2>
                            <p>Thank you for reaching out. We will get back to you shortly.</p>
                            <button onClick={() => setStatus('idle')} style={styles.resetBtn}>Send Another Message</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Name</label>
                                <input name="name" type="text" required placeholder="John Doe" style={styles.input} />
                            </div>
                            
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Email</label>
                                <input name="email" type="email" required placeholder="john@example.com" style={styles.input} />
                            </div>
                            
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Message</label>
                                <textarea name="message" required placeholder="How can we help?" style={{...styles.input, minHeight: '150px', resize: 'none'}} />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                style={styles.submitBtn}
                            >
                                {status === 'submitting' ? 'Sending...' : (
                                    <><Send size={18} /> Send Message</>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                <div style={styles.actions}>
                    <Link href="/" style={styles.backBtn}>Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '3rem 1rem',
        fontFamily: "'Inter', sans-serif",
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    iconWrap: {
        width: '64px',
        height: '64px',
        background: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.2)'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: '#1e293b',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '1rem'
    },
    subtitle: {
        fontSize: '1.05rem',
        color: '#64748b',
        lineHeight: '1.6',
        maxWidth: '500px',
        margin: '0 auto'
    },
    contactInfo: {
        display: 'none'
    },
    emailText: {
        display: 'none'
    },
    formContainer: {
        background: 'white',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontWeight: '700',
        color: '#475569',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    input: {
        padding: '16px',
        borderRadius: '12px',
        border: '1.5px solid #e2e8f0',
        fontSize: '1rem',
        outline: 'none',
        color: '#1e293b',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s',
        background: '#f8fafc'
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '16px',
        background: '#1e293b',
        color: 'white',
        borderRadius: '12px',
        fontWeight: '800',
        fontSize: '1.05rem',
        border: 'none',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'transform 0.2s, background 0.2s'
    },
    successState: {
        textAlign: 'center',
        padding: '2rem 0',
        color: '#1e293b'
    },
    resetBtn: {
        marginTop: '2rem',
        padding: '10px 20px',
        background: 'transparent',
        border: '1.5px solid #e2e8f0',
        borderRadius: '8px',
        fontWeight: '700',
        color: '#64748b',
        cursor: 'pointer'
    },
    actions: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center'
    },
    backBtn: {
        fontWeight: '700',
        color: '#64748b',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '100px',
        transition: 'background 0.2s',
        ':hover': { background: 'rgba(0,0,0,0.05)' }
    }
};
