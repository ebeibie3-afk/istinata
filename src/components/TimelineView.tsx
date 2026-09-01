import React from 'react';
import { VeritasEvent } from '@/types';

interface TimelineProps {
  events: VeritasEvent[];
}

export const TimelineView: React.FC<TimelineProps> = ({ events }) => {
  const getSectorBadge = (sector: string) => {
    switch (sector) {
      case 'TRANSPORT_INFRASTRUCTURE':
        return <span className="badge-tag badge-infra">🛣️ Инфраструктура</span>;
      case 'HEALTHCARE':
        return <span className="badge-tag badge-health">🏥 Здравеопазване</span>;
      case 'EU_FUNDS':
        return <span className="badge-tag badge-eu">🇪🇺 ЕС Фондове</span>;
      case 'JUDICIARY':
        return <span className="badge-tag" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>⚖️ Правосъдие & Митници</span>;
      case 'POLITICAL_CORRUPTION':
        return <span className="badge-tag" style={{ backgroundColor: '#FFE4E6', color: '#BE123C' }}>🏛️ Политическа Корупция</span>;
      case 'ENERGY':
        return <span className="badge-tag badge-energy">⚡ Енергетика</span>;
      case 'BANKING_FINANCE':
        return <span className="badge-tag" style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}>🏦 Банки & Финанси</span>;
      default:
        return <span className="badge-tag badge-eu">{sector}</span>;
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', padding: '1rem 0' }}>
      {/* Central line */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '20px',
        width: '3px',
        background: '#E2E8F0',
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        {events.map((event) => (
          <div key={event.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            {/* Timeline node */}
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: '#0F172A',
              boxShadow: '0 0 0 4px #FFFFFF, 0 0 0 6px #E2E8F0',
              marginTop: '1.2rem',
              zIndex: 2,
              flexShrink: 0
            }} />

            {/* Event Card */}
            <div className="editorial-card" style={{ flex: 1, padding: '1.6rem', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    📅 {event.date}
                  </span>
                  {getSectorBadge(event.sector)}
                </div>
                {event.amountBgn && (
                  <span style={{
                    fontSize: '1.05rem',
                    fontWeight: 900,
                    color: 'var(--accent-alert)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {event.amountBgn.toLocaleString('bg-BG')} лв.
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-navy)', marginBottom: '0.6rem', fontFamily: 'var(--font-serif)' }}>
                {event.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
                {event.summary}
              </p>

              {/* Institutions and Companies */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-muted)' }}>Институции: </strong>
                  <span style={{ color: 'var(--text-primary)' }}>{event.involvedInstitutions.join(', ')}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-muted)' }}>Бенефициенти/Фирми: </strong>
                  <span style={{ color: 'var(--text-primary)' }}>{event.involvedCompanies.join(', ')}</span>
                </div>
              </div>

              {/* Evidence Docs & Reels Ready Trigger */}
              <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Официални източници:</span>
                  {event.evidence.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--accent-cyan)'
                      }}
                    >
                      📄 {doc.sourceName}
                    </a>
                  ))}
                </div>

                {event.reelsMetadata && (
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--accent-rose)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>🎬 Готово за Reel</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
