import React from 'react';
import Link from 'next/link';
import { Gift, Heart, Shield, Sparkles } from 'lucide-react';

export const metadata = {
    title: 'About Us | DigiBdayWish',
    description: 'Learn more about DigiBdayWish and our mission.'
};

export default function AboutPage() {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>About DigiBdayWish 🎂</h1>
                    <p style={styles.subtitle}>Sparking joy, one digital birthday at a time.</p>
                </div>

                <div style={styles.content}>
                    <section style={styles.section}>
                        <h2 style={styles.heading}>Our Mission</h2>
                        <p style={styles.text}>
                            We believe that birthdays should feel special, no matter the distance. Our mission is to help people create memorable, beautiful, and personalized digital birthday experiences that can be shared instantly with a simple web link.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>Why Choose Us?</h2>
                        <div style={styles.featureGrid}>
                            <FeatureCard 
                                icon={<Sparkles color="#8b5cf6" size={28} />}
                                title="Custom Templates"
                                desc="Choose from multiple vibrant, animated themes."
                            />
                            <FeatureCard 
                                icon={<Gift color="#f43f5e" size={28} />}
                                title="Easy Sharing"
                                desc="Just generate a link and send via WhatsApp, Email, or SMS."
                            />
                            <FeatureCard 
                                icon={<Shield color="#10b981" size={28} />}
                                title="Privacy Focused"
                                desc="We don't collect or sell your personal recipient data."
                            />
                            <FeatureCard 
                                icon={<Heart color="#ec4899" size={28} />}
                                title="Simple UI"
                                desc="Create a stunning wish in less than a minute."
                            />
                        </div>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>Trust & Privacy</h2>
                        <p style={styles.text}>
                            DigiBdayWish is built with a privacy-first mindset. When you create a birthday wish, all personalization data (like the recipient's name and your message) is embedded directly into the shareable link. We don't store your recipient's personal data in a database, ensuring your privacy is completely respected.
                        </p>
                    </section>

                    <section style={styles.founderSection}>
                        <p style={styles.founderText}>
                            "Designed with ❤️ to make the web a happier place."
                        </p>
                        <p style={styles.founderSub}>- The w3htmlschool Team</p>
                    </section>

                    <div style={styles.actions}>
                        <Link href="/" style={styles.createBtn}>Create a Wish Now ✨</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({ icon, title, desc }) => (
    <div style={styles.featureCard}>
        <div style={styles.iconWrap}>{icon}</div>
        <h3 style={styles.featureTitle}>{title}</h3>
        <p style={styles.featureDesc}>{desc}</p>
    </div>
);

const styles = {
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '3rem 1rem',
        fontFamily: "'Inter', sans-serif",
    },
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: '#1e293b',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '1rem'
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#64748b',
        fontWeight: '500'
    },
    content: {
        color: '#334155'
    },
    section: {
        marginBottom: '3rem'
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '1rem'
    },
    text: {
        fontSize: '1.05rem',
        lineHeight: '1.7',
        color: '#475569'
    },
    featureGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '1.5rem'
    },
    featureCard: {
        background: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    iconWrap: {
        background: 'white',
        padding: '12px',
        borderRadius: '12px',
        marginBottom: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    featureTitle: {
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '0.5rem'
    },
    featureDesc: {
        fontSize: '0.9rem',
        color: '#64748b',
        lineHeight: '1.5'
    },
    founderSection: {
        background: 'linear-gradient(135deg, #fdf2f8, #f3e8ff)',
        padding: '2rem',
        borderRadius: '16px',
        textAlign: 'center',
        marginTop: '2rem'
    },
    founderText: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: '#8b5cf6',
        fontStyle: 'italic',
        marginBottom: '0.5rem'
    },
    founderSub: {
        fontSize: '0.9rem',
        color: '#475569',
        fontWeight: '600'
    },
    actions: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center'
    },
    createBtn: {
        padding: '16px 32px',
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '100px',
        fontWeight: '800',
        fontSize: '1.1rem',
        boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)',
        transition: 'transform 0.2s'
    }
};
