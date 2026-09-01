'use client';

import React, { useEffect, useState } from 'react';

export default function HoneypotGuard() {
  const [isBotDetected, setIsBotDetected] = useState(false);

  useEffect(() => {
    // Check if client was previously flagged as an automated scraper
    if (typeof window !== 'undefined') {
      const isBlocked = localStorage.getItem('__veritas_sec_flag');
      if (isBlocked === 'BLOCKED_SCRAPER_BOT') {
        setIsBotDetected(true);
      }
    }
  }, []);

  const handleHoneypotTrigger = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('__veritas_sec_flag', 'BLOCKED_SCRAPER_BOT');
        sessionStorage.setItem('__veritas_sec_flag', 'BLOCKED_SCRAPER_BOT');
      }
      setIsBotDetected(true);
    }
  };

  if (isBotDetected) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#020617',
        color: '#EF4444',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          border: '2px solid #EF4444',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '600px',
          backgroundColor: '#0B132B',
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)'
        }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem', color: '#FFFFFF' }}>
            [SECURITY ALERT: AUTOMATED SCRAPER DETECTED]
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.6' }}>
            Вашата заявка задейства автоматичен филтър за защита на данните (Honeypot Trap). 
            Достъпът до независимите регистри и преписки на veritras.online е временно блокиран за този клиент.
          </p>
          <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '1.5rem', borderTop: '1px solid #1E293B', paddingTop: '10px' }}>
            ERROR_CODE: 0x41_HONEYPOT_BOT_INTERCEPTED // VERITAS_DEFENSE_V2
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      aria-hidden="true" 
      style={{ 
        position: 'absolute', 
        left: '-9999px', 
        top: '-9999px', 
        width: '1px', 
        height: '1px', 
        opacity: 0, 
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <label htmlFor="sys_auth_email_verification" aria-hidden="true" style={{ display: 'none' }}> </label>
      <input
        id="sys_auth_email_verification"
        type="text"
        name="sys_auth_email_verification"
        tabIndex={-1}
        autoComplete="off"
        onChange={handleHoneypotTrigger}
      />
      <label htmlFor="sys_auth_token_key" aria-hidden="true" style={{ display: 'none' }}> </label>
      <input
        id="sys_auth_token_key"
        type="text"
        name="sys_auth_token_key"
        tabIndex={-1}
        autoComplete="off"
        onChange={handleHoneypotTrigger}
      />
    </div>
  );
}
