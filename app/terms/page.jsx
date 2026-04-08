import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | DigiBdayWish',
    description: 'Terms of Service for DigiBdayWish'
};

export default function TermsOfService() {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Terms of Service</h1>
                    <p style={styles.lastUpdated}>Last Updated: April 2026</p>
                </div>

                <div style={styles.content}>
                    <section style={styles.section}>
                        <h2 style={styles.heading}>1. Acceptance of Terms</h2>
                        <p style={styles.text}>
                            By accessing and using DigiBdayWish ("the Service", "we", "us"), you accept and agree to be bound by the terms
                            and provision of this agreement.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>2. Service Description</h2>
                        <p style={styles.text}>
                            DigiBdayWish is a free online tool that allows users to create, customize, and share digital birthday wishes.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>3. User Responsibilities & Prohibited Content</h2>
                        <p style={styles.text}>
                            When using our service, you agree not to:
                        </p>
                        <ul style={styles.list}>
                            <li>Create or share content that is abusive, threatening, obscene, defamatory, or racially, sexually, or otherwise objectionable.</li>
                            <li>Use the service for any unlawful purpose or for the promotion of illegal activities.</li>
                            <li>Attempt to harass, abuse, or harm another person or group through our platform.</li>
                        </ul>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>4. Content Moderation</h2>
                        <p style={styles.text}>
                            Any feedback or testimonials submitted to the site are subject to admin approval before they appear on the public "Wall of Love". We reserve the right to reject or delete any feedback that violates these terms.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>5. Disclaimer of Warranties</h2>
                        <p style={styles.text}>
                            The service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied,
                            and hereby disclaim all warranties including, without limitation, implied warranties or conditions of merchantability.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>6. Limitation of Liability</h2>
                        <p style={styles.text}>
                            In no event shall DigiBdayWish be liable for any damages (including, without limitation, damages for loss of data or profit)
                            arising out of the use or inability to use the materials on our website.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>7. Changes to Terms</h2>
                        <p style={styles.text}>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or
                            use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>8. Contact Us</h2>
                        <p style={styles.text}>
                            If you have any questions about these Terms, please reach out via our {' '}
                            <Link href="/contact" style={{color: '#8b5cf6', fontWeight: '600', textDecoration: 'underline'}}>Contact Us form</Link>.
                        </p>
                    </section>

                    <div style={styles.actions}>
                        <Link href="/" style={styles.backBtn}>Back to Home</Link>
                    </div>
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
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
    },
    header: {
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '2rem',
        marginBottom: '2rem',
        textAlign: 'center'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: '#1e293b',
        fontFamily: "'Outfit', sans-serif",
        marginBottom: '0.5rem'
    },
    lastUpdated: {
        color: '#64748b',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    content: {
        color: '#334155'
    },
    section: {
        marginBottom: '2.5rem'
    },
    heading: {
        fontSize: '1.25rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '1rem'
    },
    text: {
        fontSize: '1rem',
        lineHeight: '1.7',
        marginBottom: '1rem'
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '1.5rem',
        marginBottom: '1.5rem',
        lineHeight: '1.7'
    },
    actions: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center'
    },
    backBtn: {
        padding: '12px 24px',
        background: '#1e293b',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '12px',
        fontWeight: '700',
        transition: 'all 0.2s'
    }
};
