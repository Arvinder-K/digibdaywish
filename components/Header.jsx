import React from 'react';

const stepLabels = ['Gift', 'Details', 'Support', 'Share'];

export default function Header({ step, totalSteps }) {
  const progress = (step / totalSteps) * 100;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(124, 58, 237, 0.1)',
      padding: '1.6rem 2.5rem',
    }}>
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: '1.6rem' }}>
        <h1 style={{
          fontSize: '1.9rem',
          fontWeight: 900,
          fontFamily: 'Outfit, sans-serif',
          background: 'linear-gradient(135deg, #e8336d, #7c3aed, #4f46e5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.03em',
          margin: 0,
        }}>
          ✨ DigiBdayWish
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.75rem', marginTop: '4px',
          letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
        }}>
          Create · Personalize · Share
        </p>
      </div>

      {/* Step indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '1.2rem' }}>
        {stepLabels.map((label, idx) => {
          const num = idx + 1;
          const isActive = num === step;
          const isDone = num < step;
          return (
            <React.Fragment key={num}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 auto', minWidth: '52px' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem', fontFamily: 'Outfit,sans-serif',
                  background: isActive
                    ? 'linear-gradient(135deg, #e8336d, #7c3aed)'
                    : isDone
                    ? 'rgba(124, 58, 237, 0.12)'
                    : 'rgba(124, 58, 237, 0.05)',
                  border: isActive
                    ? 'none'
                    : isDone
                    ? '1.5px solid rgba(124,58,237,0.35)'
                    : '1.5px solid rgba(124,58,237,0.12)',
                  color: isActive ? 'white' : isDone ? '#7c3aed' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 4px 16px rgba(232,51,109,0.4)' : 'none',
                  transition: 'all 0.35s ease',
                }}>
                  {isDone ? '✓' : num}
                </div>
                <span style={{
                  fontSize: '0.62rem', marginTop: '5px', fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: isActive ? '#e8336d' : isDone ? '#7c3aed' : 'var(--text-muted)',
                  transition: 'color 0.3s',
                }}>
                  {label}
                </span>
              </div>
              {idx < totalSteps - 1 && (
                <div style={{
                  flex: 1, height: '2px', marginBottom: '18px',
                  background: isDone
                    ? 'linear-gradient(90deg, #7c3aed, rgba(124,58,237,0.2))'
                    : 'rgba(124,58,237,0.08)',
                  transition: 'background 0.4s ease',
                  borderRadius: '100px',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ height: '4px', background: 'rgba(124,58,237,0.08)', borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #e8336d, #7c3aed, #4f46e5)',
          borderRadius: '100px',
          boxShadow: '0 0 8px rgba(232,51,109,0.5)',
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  );
}
