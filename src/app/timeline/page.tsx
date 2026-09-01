'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { INITIAL_VERITAS_EVENTS } from "@/data/events";
import { TimelineView } from "@/components/TimelineView";

function TimelineContent() {
  const searchParams = useSearchParams();
  const sectorParam = searchParams.get('sector');

  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  useEffect(() => {
    if (sectorParam) {
      setSelectedSector(sectorParam);
    }
  }, [sectorParam]);

  const sectorsConfig = [
    { key: 'ALL', label: `Всички Сектори (${INITIAL_VERITAS_EVENTS.length})`, icon: '📊' },
    { key: 'TRANSPORT_INFRASTRUCTURE', label: 'Инфраструктура', icon: '🛣️' },
    { key: 'HEALTHCARE', label: 'Здравеопазване', icon: '🏥' },
    { key: 'EU_FUNDS', label: 'ЕС Фондове (ИСУН)', icon: '🇪🇺' },
    { key: 'JUDICIARY', label: 'Правосъдие & Митници', icon: '⚖️' },
    { key: 'POLITICAL_CORRUPTION', label: 'Политическа Корупция', icon: '🏛️' },
    { key: 'ENERGY', label: 'Енергетика', icon: '⚡' },
    { key: 'BANKING_FINANCE', label: 'Банки & Фалити', icon: '🏦' }
  ];

  const filteredEvents = selectedSector === 'ALL'
    ? INITIAL_VERITAS_EVENTS
    : INITIAL_VERITAS_EVENTS.filter(e => e.sector === selectedSector);

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-eu" style={{ marginBottom: '1rem', display: 'inline-block' }}>
          📅 ПЪЛЕН ХРОНОЛОГИЧЕН ОДИТ
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--brand-navy)', marginBottom: '0.8rem', fontFamily: 'var(--font-serif)' }}>
          Хронология на Публичните Средства
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
          Филтрирайте и преглеждайте всички документирани събития, обществени поръчки, одити на Сметната палата и европейски субсидии по дати.
        </p>
      </div>

      {/* Sector quick filters with active state and count */}
      <div style={{
        display: 'flex',
        gap: '0.6rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '2.5rem'
      }}>
        {sectorsConfig.map((s) => {
          const isActive = selectedSector === s.key;
          const count = s.key === 'ALL' 
            ? INITIAL_VERITAS_EVENTS.length 
            : INITIAL_VERITAS_EVENTS.filter(e => e.sector === s.key).length;

          return (
            <button
              key={s.key}
              onClick={() => setSelectedSector(s.key)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: isActive ? '2px solid var(--accent-alert)' : '1px solid var(--border-color)',
                backgroundColor: isActive ? '#0F172A' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 12px rgba(15, 23, 42, 0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{s.icon}</span>
              <span>{s.label} {s.key !== 'ALL' && `(${count})`}</span>
            </button>
          );
        })}
      </div>

      {/* Counter summary */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        Намерени <b>{filteredEvents.length}</b> одитирани събития
      </div>

      <TimelineView events={filteredEvents} />
    </div>
  );
}

export default function TimelinePage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#94A3B8' }}>Зареждане на хронологията...</div>}>
      <TimelineContent />
    </Suspense>
  );
}
