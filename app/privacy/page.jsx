import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | DigiBdayWish',
    description: 'Privacy Policy and Cookie Usage for DigiBdayWish'
};

export default function PrivacyPolicy() {
    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Privacy Policy</h1>
                    <p style={styles.lastUpdated}>Last Updated: April 2026</p>
                </div>

                <div style={styles.content}>
                    <section style={styles.section}>
                        <h2 style={styles.heading}>1. Introduction</h2>
                        <p style={styles.text}>
                            Welcome to DigiBdayWish. We respect your privacy and are committed to protecting your personal data. 
                            This privacy policy will inform you as to how we look after your personal data when you visit our website 
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>2. The Data We Collect</h2>
                        <p style={styles.text}>
                            We only collect minimal data to provide our service:
                        </p>
                        <ul style={styles.list}>
                            <li><strong>Identity Data:</strong> Name (optional when leaving feedback).</li>
                            <li><strong>Feedback Data:</strong> Star ratings and messages submitted via our forms.</li>
                            <li><strong>Technical Data:</strong> Basic usage data via cookies and Google Ads infrastructure.</li>
                        </ul>
                        <p style={styles.text}>
                            <strong>Important:</strong> DigiBdayWish is a stateless application. Feedback and tracking configurations 
                            are primarily stored locally on your device via <code>localStorage</code>. No personal data is sold or stored in a central database by us.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>3. Google AdSense and Third-Party Vendors</h2>
                        <p style={styles.text}>
                            We use Google AdSense to display advertisements on our site.
                        </p>
                        <ul style={styles.list}>
                            <li>Third party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites.</li>
                            <li>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</li>
                            <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={styles.link}>Google Ads Settings</a>.</li>
                        </ul>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>4. Cookies</h2>
                        <p style={styles.text}>
                            Our website uses cookies and <code>localStorage</code> to remember your consent preferences and to serve relevant advertisements. 
                            You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>5. Your Legal Rights (GDPR)</h2>
                        <p style={styles.text}>
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                        </p>
                        <ul style={styles.list}>
                            <li>Request access to your personal data.</li>
                            <li>Request erasure of your personal data.</li>
                            <li>Withdraw consent at any time.</li>
                        </ul>
                        <p style={styles.text}>
                            Since our application stores data locally on your device, you can exercise the right to erasure at any time by clearing your browser's <code>localStorage</code> and cookies.
                        </p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.heading}>6. Contact Us</h2>
                        <p style={styles.text}>
                            If you have any questions about this privacy policy or our privacy practices, please reach out via our {' '}
                            <Link href="/contact" style={styles.link}>Contact Us form</Link>.
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
    link: {
        color: '#8b5cf6',
        textDecoration: 'underline',
        fontWeight: '600'
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
