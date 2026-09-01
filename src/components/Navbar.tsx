import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      {/* Top Institutional Legal Strip */}
      <div style={{
        backgroundColor: '#0F172A',
        color: '#F8FAFC',
        padding: '0.35rem 1.5rem',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.04em'
      }}>
        <div style={{
          maxWidth: '1350px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <span>⚖️ ЦЕНТЪР ЗА ГРАЖДАНСКИ ОДИТ И РАЗСЛЕДВАНИЯ (veritras.online)</span>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <span>ПЛАТФОРМАТА УПРАЖНЯВА ПРАВАТА НА ГРАЖДАНИТЕ ПО ЧЛ. 41 ОТ КРБ И ПРОЦЕДУРИТЕ ПО ЗДОИ</span>
            <span>•</span>
            <span style={{ color: '#38BDF8' }}>100% ВЕРИФИЦИРАНИ ОДИТНИ АКТОВЕ</span>
          </div>
        </div>
      </div>

      {/* Main Clean Editorial Header */}
      <div style={{
        maxWidth: '1350px',
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '4px',
            backgroundColor: '#0F172A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: '1.25rem',
            fontFamily: 'var(--font-serif)'
          }}>
            V
          </div>
          <div>
            <div style={{
              fontSize: '1.45rem',
              fontWeight: 900,
              fontFamily: 'var(--font-serif)',
              color: '#0F172A',
              lineHeight: '1.1'
            }}>
              VERITAS
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748B', letterSpacing: '0.05em', fontWeight: 700, textTransform: 'uppercase' }}>
              Център за граждански одит • veritras.online
            </div>
          </div>
        </Link>

        {/* Minimalist Editorial Menu */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.6rem', fontSize: '0.9rem', fontWeight: 600, color: '#1A2B4C' }}>
          <Link href="/" style={{ borderBottom: '2px solid #0F172A', paddingBottom: '2px' }}>
            Начало
          </Link>
          <Link href="/sectors" style={{ color: '#475569', transition: 'color 0.2s' }}>
            Разследвания
          </Link>
          <Link href="/persons" style={{ color: '#475569', transition: 'color 0.2s' }}>
            Черна Книга
          </Link>
          <Link href="/flow-visualizer" style={{ color: '#475569', transition: 'color 0.2s' }}>
            Парични Потоци
          </Link>
          <Link href="/evidence" style={{ color: '#475569', transition: 'color 0.2s' }}>
            Одитни Доклади
          </Link>
        </nav>

        {/* Action Button: Signal (#e11d48 with hover) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/whistleblower" className="btn-whistleblower">
            <span>🔒 ПОДАЙ СИГНАЛ</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
