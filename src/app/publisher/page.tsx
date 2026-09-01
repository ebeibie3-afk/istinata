'use client';

import React, { useState } from 'react';
import { INITIAL_VERITAS_EVENTS } from '@/data/events';
import { generateReelScript } from '@/lib/reelsGenerator';

export default function AutoPublisherPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scripts = INITIAL_VERITAS_EVENTS.map(generateReelScript);

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge" style={{ backgroundColor: 'rgba(24, 119, 242, 0.2)', color: '#60a5fa', border: '1px solid #1877f2', marginBottom: '1rem' }}>
          📢 АВТОМАТИЗИРАН ПУБЛИКАТОР ЗА FACEBOOK: „НЕ НА МАФИЯТА"
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
          Център за Публикации и Видео Емисии
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto' }}>
          Готови публикации за стената, Reel видео сценарии и официални документи, форматирани за мигновено качване във Facebook страницата.
        </p>
      </div>

      {/* Direct Facebook Link & Asset Guide */}
      <div className="glass-panel" style={{ padding: '1.8rem', marginBottom: '2.5rem', border: '1px solid var(--border-accent)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
          🎨 Графични Активи за Страницата (Запазени на Desktop в папка NE_NA_MAFIQTA_BRANDING):
        </h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <li>✅ <strong>Профилна снимка (Аватар):</strong> <code>Desktop\NE_NA_MAFIQTA_BRANDING\PROFILE_PICTURE_AVATAR.jpg</code></li>
          <li>✅ <strong>Корица (Cover Banner 16:9):</strong> <code>Desktop\NE_NA_MAFIQTA_BRANDING\COVER_BANNER_16x9.jpg</code></li>
          <li>🔗 <strong>Facebook Страница:</strong> <a href="https://www.facebook.com/profile.php?id=61593934623851" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Отвори страницата директно</a></li>
        </ul>
      </div>

      {/* Grid of Ready-to-Publish Posts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {scripts.map((script, idx) => (
          <div key={script.eventId} className="glass-panel" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-infra">Пост #{idx + 1}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>100% ДОКУМЕНТИРАН</span>
              </div>

              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                {script.hook}
              </h2>

              <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', maxHeight: '180px', overflowY: 'auto' }}>
                {script.facebookCaption}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(script.facebookCaption);
                  setCopiedIdx(idx);
                  setTimeout(() => setCopiedIdx(null), 2500);
                }}
                style={{
                  width: '100%',
                  backgroundColor: copiedIdx === idx ? 'var(--accent-emerald)' : '#1877f2',
                  color: '#fff',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {copiedIdx === idx ? '✅ Публикацията е копирана!' : '📋 Копирай готовия пост за Facebook'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
