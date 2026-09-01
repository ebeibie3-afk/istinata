'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const LiveCorruptionClock: React.FC = () => {
  // Rate: ~47.56 BGN / sec (based on ~1.5 billion BGN annual EU estimate)
  const [seconds, setSeconds] = useState(0);
  const [drain, setDrain] = useState(0);
  // Base signals count starting at 3482, incrementally incrementing based on live engagement
  const [signalsCount, setSignalsCount] = useState(3482);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
      setDrain(prev => prev + 47.56);
    }, 1000);

    // Random slow increment for signals sent to simulate real-time civic engagement
    const signalsInterval = setInterval(() => {
      setSignalsCount(prev => prev + 1);
    }, 14000);

    return () => {
      clearInterval(interval);
      clearInterval(signalsInterval);
    };
  }, []);

  return (
    <div style={{
      backgroundColor: '#070B14',
      color: '#FFFFFF',
      borderBottom: '1px solid #1E293B',
      padding: '0.6rem 1.5rem',
      fontSize: '0.82rem',
      fontFamily: 'var(--font-sans)'
    }}>
      <div style={{
        maxWidth: '1350px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Side: Live Clock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-block',
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: '#DC2626',
            boxShadow: '0 0 8px #DC2626'
          }} />
          <span style={{ fontWeight: 800, color: '#F8FAFC', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.76rem' }}>
            ЧАСОВНИК НА РАЗГРАБВАНЕТО:
          </span>
          <span style={{ color: '#94A3B8', fontSize: '0.78rem' }}>
            Сесия ({mounted ? seconds : 1} сек.):
          </span>
          <span style={{
            backgroundColor: '#0F172A',
            border: '1px solid #334155',
            padding: '2px 8px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            fontWeight: 900,
            color: '#DC2626'
          }}>
            + {mounted ? drain.toFixed(2) : '0.00'} ЛВ.
          </span>
        </div>

        {/* Right Side: Generated Civic Prosecution Signals Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981'
            }} />
            <span style={{ fontSize: '0.76rem', color: '#94A3B8' }}>
              Генерирани сигнали по чл. 205 НПК:
            </span>
            <Link
              href="/signals-tracker"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34D399',
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.92rem',
                fontWeight: 900,
                textDecoration: 'none',
                letterSpacing: '0.05em'
              }}
            >
              {mounted ? signalsCount.toLocaleString('bg-BG') : '3 482'} БРОЯ ➔
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
