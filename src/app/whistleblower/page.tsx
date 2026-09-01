'use client';

import React, { useState } from 'react';

export default function WhistleblowerPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Заглавен блок */}
        <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: '1.5rem', textAlign: 'left' }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            🔒 КРИПТИРАНА СИСТЕМА ЗА СИГНАЛИ
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, color: '#FFFFFF', marginTop: '1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
            Подайте Сигнал с Нулев Риск
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: '1.6', maxWidth: '800px', margin: 0 }}>
            В съответствие с Директива (ЕС) 2019/1937 за защита на лицата, подаващи сигнали. 
            Ние не събираме лични данни, не записваме IP адреси и гарантираме пълна криптографска анонимност на източниците.
          </p>
        </div>

        {/* Инструкции за сигурност преди изпращане */}
        <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '10px', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            🛑 ЗАДЪЛЖИТЕЛЕН ПРОТОКОЛ ЗА СИГУРНОСТ
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
            Преди да прикачите или изпратите какъвто и да е документ (снимка, PDF, договор, фактура), уверете се, че сте спазили следните стъпки, за да избегнете дигитално проследяване:
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ backgroundColor: '#020617', padding: '1.2rem', borderRadius: '6px', border: '1px solid #1E293B', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: '#34D399', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                1. ИЗЧИСТЕТЕ МЕТАДАННИТЕ (EXIF)
              </span>
              Снимките и PDF файловете съдържат дата, час, GPS координати и модел на устройството. Използвайте безплатни инструменти като <a href="https://exifpurge.com" target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline' }}>ExifPurge</a> или скриптове, за да ги изтриете преди изпращане.
            </div>

            <div style={{ backgroundColor: '#020617', padding: '1.2rem', borderRadius: '6px', border: '1px solid #1E293B', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: '#34D399', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                2. ИЗПОЛЗВАЙТЕ TOR БРАУЗЪР
              </span>
              За да заредите този сайт без Вашият интернет доставчик да разбере, изтеглете и отворете официалния <a href="https://www.torproject.org" target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline' }}>Tor Browser</a>. Той маскира напълно Вашия IP адрес и трафик.
            </div>
          </div>
        </div>

        {/* Защитени канали за комуникация */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          {/* Канал 1: ProtonMail */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '10px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📧</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Криптиран Имейл (PGP)</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '6px', lineHeight: '1.5' }}>
                Швейцарската платформа Proton предлага пълно криптиране от край до край (End-to-End Encryption).
              </p>
              <div style={{ backgroundColor: '#020617', padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid #1E293B', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#34D399', marginTop: '1rem', wordBreak: 'break-all', userSelect: 'all' }}>
                veritas.bulgaria@proton.me
              </div>
            </div>
            <button 
              onClick={() => copyToClipboard('veritas.bulgaria@proton.me')}
              style={{
                width: '100%',
                marginTop: '1.2rem',
                backgroundColor: copied ? '#059669' : '#1E293B',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid #334155',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {copied ? '✓ Копирано в клипборда!' : '📋 Копирай Имейла'}
            </button>
          </div>

          {/* Канал 2: Signal / Session */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '10px', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Signal / Session Messenger</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: '6px', lineHeight: '1.5' }}>
                Най-сигурните криптирани мобилни протоколи. Session не изисква телефонен номер за регистрация.
              </p>
              <div style={{ backgroundColor: '#020617', padding: '0.8rem 1rem', borderRadius: '6px', border: '1px solid #1E293B', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#34D399', marginTop: '1rem' }}>
                Потребителско име: @veritas.bulgaria
              </div>
            </div>
            <a 
              href="https://signal.me/#u/veritas.bulgaria" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '100%',
                display: 'block',
                textAlign: 'center',
                marginTop: '1.2rem',
                backgroundColor: '#059669',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                padding: '0.75rem',
                borderRadius: '6px',
                textDecoration: 'none'
              }}
            >
              Отвори Signal Чат ➔
            </a>
          </div>

        </div>

        {/* Декларация за юридическа защита */}
        <div style={{ textAlign: 'center', color: '#64748B', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', lineHeight: '1.6', borderTop: '1px solid #1E293B', paddingTop: '1.5rem' }}>
          Платформата veritras.online не съхранява бази данни на физически сървъри в Република България. <br />
          Всички източници са защитени съгласно Директива (ЕС) 2019/1937 и международното право за разследваща журналистика.
        </div>

      </div>
    </div>
  );
}
