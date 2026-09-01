'use client';

import React, { useState } from 'react';
import { INITIAL_VERITAS_EVENTS } from '@/data/events';
import { generateReelScript, ReelScript } from '@/lib/reelsGenerator';

export default function ReelsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scripts: ReelScript[] = INITIAL_VERITAS_EVENTS.map(generateReelScript);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge" style={{ backgroundColor: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', border: '1px solid rgba(244, 63, 94, 0.3)', marginBottom: '1rem' }}>
          🎬 АВТОМАТИЗИРАНИ СЦЕНАРИИ ЗА REELS & ВИДЕА
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
          Facebook Reels Скриптове
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          Всеки разследван случай се превръща автоматично в 60-секунден видео сценарий, готов за публикуване в страницата.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {scripts.map((script) => (
          <div key={script.eventId} className="glass-panel" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Hook Header */}
              <div style={{
                backgroundColor: 'rgba(244, 63, 94, 0.1)',
                borderLeft: '4px solid var(--accent-rose)',
                padding: '0.8rem 1rem',
                borderRadius: '4px',
                marginBottom: '1.2rem'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase' }}>
                  ХУК / ЗАГЛАВИЕ (0:00 - 0:03)
                </span>
                <p style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  {script.hook}
                </p>
              </div>

              {/* Facts Timeline */}
              <div style={{ marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  ФАКТИ И ЧИСЛА (0:04 - 0:45)
                </span>
                <ul style={{ listStyle: 'none', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {script.facts.map((fact, index) => (
                    <li key={index} style={{ paddingLeft: '0.5rem', borderLeft: '2px solid rgba(255, 255, 255, 0.1)' }}>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Prompt */}
              <div style={{
                backgroundColor: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                padding: '0.8rem',
                borderRadius: '8px',
                marginBottom: '1.2rem',
                fontSize: '0.85rem',
                color: 'var(--accent-cyan)'
              }}>
                <strong>🎥 Визуална инструкция:</strong> {script.visualPrompt}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {script.sourceCitation}
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', gap: '0.8rem' }}>
              <button
                onClick={() => handleCopy(script.eventId, script.facebookCaption)}
                style={{
                  flex: 1,
                  backgroundColor: copiedId === script.eventId ? 'var(--accent-emerald)' : '#1877f2',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {copiedId === script.eventId ? '✅ Копиран пост за Facebook!' : '📋 Копирай текст за Reel'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
