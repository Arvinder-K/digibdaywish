"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // Static credentials
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('digibday_is_admin', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials! 🛑');
        }
    };

    return (
        <div style={styles.container}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.card}
            >
                <div style={styles.iconCircle}>
                    <Lock size={32} color="#8b5cf6" />
                </div>
                <h1 style={styles.title}>Admin Login</h1>
                <p style={styles.subtitle}>Manage feedback & analytics</p>

                <form onSubmit={handleLogin} style={styles.form}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    {error && <p style={styles.error}>{error}</p>}
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={styles.button}
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Inter, sans-serif'
    },
    card: {
        background: 'white',
        padding: '3rem 2rem',
        borderRadius: '32px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    },
    iconCircle: {
        width: '64px',
        height: '64px',
        background: '#f5f3ff',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem'
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '900',
        color: '#1e293b',
        marginBottom: '0.5rem'
    },
    subtitle: {
        color: '#64748b',
        fontSize: '0.9rem',
        marginBottom: '2rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    input: {
        padding: '14px',
        borderRadius: '12px',
        border: '1.5px solid #e2e8f0',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        color: '#1e293b'
    },
    button: {
        padding: '16px',
        borderRadius: '12px',
        border: 'none',
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        color: 'white',
        fontWeight: '800',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '1rem'
    },
    error: {
        color: '#ef4444',
        fontSize: '0.85rem',
        fontWeight: '600'
    }
};
