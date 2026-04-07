"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setError('Failed to fetch stats');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f7fa', color: '#1a202c' }}><h2>Loading Admin Stats...</h2></div>;
  if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f7fa', color: '#e53e3e' }}><h1>{error}</h1></div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', padding: '40px 20px', color: '#2d3748', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2.5rem', textAlign: 'center', fontSize: '2.5rem' }}>⚙️ DigiBdayWish Admin</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <motion.div 
            whileHover={{ y: -5 }}
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(118, 75, 162, 0.3)' }}
          >
            <h3 style={{ margin: 0, opacity: 0.9, fontSize: '1.2rem', fontWeight: 'normal' }}>Total Pages Created</h3>
            <p style={{ margin: '15px 0 0', fontSize: '4rem', fontWeight: 'bold' }}>{stats.total_pages}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #ff8e8b 100%)', color: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)' }}
          >
            <h3 style={{ margin: 0, opacity: 0.9, fontSize: '1.2rem', fontWeight: 'normal' }}>Total Unique Users</h3>
            <p style={{ margin: '15px 0 0', fontSize: '4rem', fontWeight: 'bold' }}>{stats.total_users}</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(67, 233, 123, 0.3)' }}
          >
            <h3 style={{ margin: 0, opacity: 0.9, fontSize: '1.2rem', fontWeight: 'normal' }}>Total Donations</h3>
            <p style={{ margin: '15px 0 0', fontSize: '4rem', fontWeight: 'bold' }}>{stats.total_donations}</p>
          </motion.div>
        </div>

        <div style={{ marginTop: '4rem', background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0, color: '#1a202c' }}>System Status</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem', marginTop: '1rem', color: '#4a5568' }}>
            <div style={{ width: '14px', height: '14px', background: '#48bb78', borderRadius: '50%', boxShadow: '0 0 10px #48bb78' }}></div>
            Backend API is online & Database is synced.
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ background: '#e2e8f0', color: '#2d3748', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', marginTop: '2rem', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.target.style.background = '#cbd5e0'}
            onMouseOut={(e) => e.target.style.background = '#e2e8f0'}
          >
            Back to Application ➜
          </button>
        </div>
      </div>
    </div>
  );
}
