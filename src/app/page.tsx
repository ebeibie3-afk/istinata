'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_VERITAS_EVENTS } from '@/data/events';
import { ProsecutionSignalModal } from '@/components/ProsecutionSignalModal';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Sector badge helper
  const getBadgeClass = (sector: string) => {
    switch (sector) {
      case 'TRANSPORT_INFRASTRUCTURE': return 'badge-infra';
      case 'ENERGY': return 'badge-energy';
      case 'HEALTHCARE': return 'badge-health';
      case 'EU_FUNDS': return 'badge-eu';
      case 'BANKING_FINANCE': return 'badge-procurement';
      case 'POLITICAL_CORRUPTION': return 'badge-exclusive';
      default: return 'badge-procurement';
    }
  };

  const getSectorLabel = (sector: string) => {
    switch (sector) {
      case 'TRANSPORT_INFRASTRUCTURE': return 'Инфраструктура';
      case 'ENERGY': return 'Енергетика';
      case 'HEALTHCARE': return 'Здравеопазване';
      case 'EU_FUNDS': return 'Еврофондове';
      case 'BANKING_FINANCE': return 'Банков Надзор & Финанси';
      case 'POLITICAL_CORRUPTION': return 'Политическа Корупция';
      case 'PUBLIC_PROCUREMENT': return 'Обществени Поръчки';
      case 'JUDICIARY': return 'Правосъдие & Граници';
      default: return sector;
    }
  };

  // Filtered stories
  const filteredEvents = INITIAL_VERITAS_EVENTS.filter((evt) => {
    const matchesSearch = 
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.involvedCompanies.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
      evt.involvedInstitutions.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || evt.sector === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* 1. HERO СЕКЦИЯ (НАСИТЕНО ТЪМНОСИН ФОН #0F172A С БЯЛ ТЕКСТ) */}
      <section style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        padding: '3rem 2.5rem',
        marginBottom: '3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Left: Lead Investigation Editorial */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <span className="badge-exclusive">ИЗВЪНРЕДНО РАЗСЛЕДВАНЕ</span>
            <span style={{
              backgroundColor: '#1E293B',
              color: '#38BDF8',
              border: '1px solid #334155',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)'
            }}>
              ОДИТ НА СМЕТНА ПАЛАТА № 0300100421
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
            lineHeight: '1.2',
            marginBottom: '1.2rem',
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)'
          }}>
            АМ „Хемус": 1.18 млрд. лв. аванси, превъзлагане чрез договори за наем и заобикаляне на ЗОП
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: '#CBD5E1',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Официалният одитен доклад констатира превеждане на аванси от АПИ към държавното дружество „Автомагистрали" ЕАД без открити състезателни процедури, след което дейностите са превъзложени на частни консорциуми.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/flow-visualizer" style={{
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              padding: '0.8rem 1.8rem',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📊 Схема на Паричния Поток</span>
            </Link>

            <Link href="/evidence" style={{
              color: '#FFFFFF',
              border: '1px solid #475569',
              padding: '0.8rem 1.6rem',
              borderRadius: '4px',
              fontWeight: 600,
              fontSize: '0.92rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }}>
              📑 Първични Одитни Документи
            </Link>

            <Link href="/map" style={{
              color: '#38BDF8',
              border: '1px solid #0284C7',
              padding: '0.8rem 1.4rem',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.92rem',
              backgroundColor: 'rgba(2, 132, 199, 0.1)'
            }}>
              🗺️ Регионална Карта
            </Link>
          </div>
        </div>

        {/* Right: High Quality Documentary Photo */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '6px', border: '1px solid #334155' }}>
          <img 
            src="/hemus_lead.jpg" 
            alt="АМ Хемус Строителна Площадка и Одит" 
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            color: '#F8FAFC',
            padding: '8px 14px',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-sans)'
          }}>
            📷 Документален кадър: Лот 1–9 на АМ „Хемус" • Източник: Одит на МРРБ
          </div>
        </div>
      </section>

      {/* 2. ИНФОГРАФИЧЕН БЛОК (КОНТРАСТНИ КУТИИ С ПРОФЕСИОНАЛНИ ОДИТНИ ТЕКСТОВЕ) */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-crimson)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ОФИЦИАЛЕН ФИНАНСОВ РЕГИСТЪР (2009–2024)
          </span>
          <h2 style={{ fontSize: '2.2rem', marginTop: '0.3rem', color: 'var(--brand-navy)' }}>
            Документиран Мащаб на Обществените Средства
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {/* Card 1: 1.18 млрд. лв. */}
          <div className="counter-box-dark">
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              АМ „Хемус" (Инфраструктура)
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#DC2626', fontFamily: 'var(--font-serif)', margin: '0.4rem 0' }}>
              1.18 МЛРД.
            </div>
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
              Аванси без проведени търгове по ЗОП
            </div>
          </div>

          {/* Card 2: 4.2 млрд. лв. (Банков Надзор) */}
          <div className="counter-box-dark">
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              КТБ (Банков Надзор & Криза)
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#DC2626', fontFamily: 'var(--font-serif)', margin: '0.4rem 0' }}>
              4.2 МЛРД.
            </div>
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
              Държавен заем за гарантирани депозити
            </div>
          </div>

          {/* Card 3: 946 млн. лв. */}
          <div className="counter-box-dark">
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ББР (Кредитна Концентрация)
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#EAB308', fontFamily: 'var(--font-serif)', margin: '0.4rem 0' }}>
              946 МЛН.
            </div>
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
              Концентрирани към 8 едри групи
            </div>
          </div>

          {/* Card 4: 500 млн. лв. */}
          <div className="counter-box-dark">
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ДКК / Монтажи (Ремонт на Язовири)
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#EAB308', fontFamily: 'var(--font-serif)', margin: '0.4rem 0' }}>
              500 МЛН.
            </div>
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
              Авансово финансиране за над 400 язовира; констатирани незавършени обекти
            </div>
          </div>
        </div>
      </section>

      {/* 3. ТЪРСАЧКА И КАТЕГОРИИ */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '320px' }}>
            <input 
              type="text"
              placeholder="🔍 Търсене в архива (по лице, фирма, институция, ЕИК или казус)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '4px',
                padding: '0.85rem 1.1rem',
                color: '#0F172A',
                fontSize: '0.95rem',
                outline: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'Всички' },
              { id: 'TRANSPORT_INFRASTRUCTURE', label: 'Инфраструктура' },
              { id: 'BANKING_FINANCE', label: 'Банков Сектор' },
              { id: 'POLITICAL_CORRUPTION', label: 'Политическа Корупция' },
              { id: 'ENERGY', label: 'Енергетика' },
              { id: 'EU_FUNDS', label: 'Еврофондове' },
              { id: 'HEALTHCARE', label: 'Здравеопазване' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  backgroundColor: selectedCategory === cat.id ? '#0F172A' : '#FFFFFF',
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#475569',
                  border: '1px solid #CBD5E1',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. КАРТИ НА РАЗСЛЕДВАНИЯТА С ГЕНЕРАТОР НА СИГНАЛИ ДО ПРОКУРАТУРАТА */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--brand-navy)' }}>
              Архив на Разследванията ({filteredEvents.length})
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Всеки казус разполага с първични одитни актове и автоматичен генератор на сигнал по Чл. 205 от НПК.
            </p>
          </div>
          <Link href="/persons" style={{ color: '#1E40AF', fontWeight: 700, fontSize: '0.9rem' }}>
            Към Картотеката ➔
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="editorial-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  {/* Category Specific Badges */}
                  <span className={`badge-tag ${getBadgeClass(evt.sector)}`}>
                    {getSectorLabel(evt.sector)}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {evt.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', lineHeight: '1.35', marginBottom: '0.8rem', minHeight: '3.4rem', color: 'var(--brand-navy)' }}>
                  {evt.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '1.4rem' }}>
                  {evt.summary}
                </p>

                {evt.amountBgn && (
                  <div style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    padding: '0.7rem 1rem',
                    borderRadius: '4px',
                    marginBottom: '1.2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Документирана сума:
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#DC2626', fontFamily: 'var(--font-serif)' }}>
                      {(evt.amountBgn / 1000000).toLocaleString('bg-BG')} Млн. лв.
                    </span>
                  </div>
                )}

                {/* 📈 1. Скрити анекси в ЦАИС ЕОП */}
                {evt.contractAnnexes && (
                  <div style={{
                    backgroundColor: 'rgba(234, 179, 8, 0.08)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '4px',
                    marginBottom: '0.8rem',
                    fontSize: '0.78rem'
                  }}>
                    <div style={{ fontWeight: 800, color: '#B45309', display: 'flex', justifyContent: 'space-between' }}>
                      <span>📈 Анекси в ЦАИС ЕОП ({evt.contractAnnexes.annexesCount} бр.):</span>
                      <span>+{evt.contractAnnexes.priceIncreasePercentage}% оскъпяване</span>
                    </div>
                    <div style={{ color: '#475569', fontSize: '0.74rem', marginTop: '2px' }}>
                      Първоначален договор: <strong>{(evt.contractAnnexes.originalAmountBgn / 1000000).toFixed(1)} млн. лв.</strong> ➔ Реален разход: <strong>{(evt.contractAnnexes.finalAmountAfterAnnexesBgn / 1000000).toFixed(1)} млн. лв.</strong>
                    </div>
                  </div>
                )}

                {/* ⚠️ 2. Червен флаг: Прехвърляне на собственост (Държавен вестник) */}
                {evt.gazetteOwnershipFlags && evt.gazetteOwnershipFlags.length > 0 && (
                  <div style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '4px',
                    marginBottom: '0.8rem',
                    fontSize: '0.76rem',
                    color: '#991B1B'
                  }}>
                    <span style={{ fontWeight: 800 }}>⚠️ СМЯНА НА СОБСТВЕНОСТ (Държавен вестник):</span>
                    <div style={{ marginTop: '2px', color: '#7F1D1D' }}>
                      Фирмата е прехвърлена на <strong>{evt.gazetteOwnershipFlags[0].newOwnerType}</strong> на {evt.gazetteOwnershipFlags[0].transferDate} след аванса.
                    </div>
                  </div>
                )}

                {/* ⚖️ 3. Статус на Сигнала (Прокуратура / EPPO) */}
                {evt.signalStatus && (
                  <div style={{
                    backgroundColor: '#0F172A',
                    color: '#F8FAFC',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '4px',
                    marginBottom: '0.8rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ color: '#38BDF8', fontWeight: 800 }}>{evt.signalStatus.incomingNumber}</span>
                      <div style={{ color: '#94A3B8', fontSize: '0.7rem' }}>Орган: {evt.signalStatus.targetBody}</div>
                    </div>
                    <span style={{
                      backgroundColor: evt.signalStatus.currentStatus.includes('АКТИВНО') ? '#065F46' : '#991B1B',
                      color: '#FFFFFF',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontWeight: 800,
                      fontSize: '0.68rem'
                    }}>
                      {evt.signalStatus.currentStatus}
                    </span>
                  </div>
                )}

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                  <strong>Обекти & ЕИК:</strong> {evt.involvedCompanies.slice(0, 2).join(', ')}
                </div>
              </div>

              {/* Bottom Interactive Action Bar with Prosecution Signal Generator */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link href="/flow-visualizer" style={{ color: '#1E40AF', fontSize: '0.88rem', fontWeight: 700 }}>
                    Виж схемата на парите ➔
                  </Link>
                  <Link href="/evidence" style={{ color: '#0369A1', fontSize: '0.82rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span>📄 {evt.evidence.length} Документ(а)</span>
                  </Link>
                </div>

                {/* Prosecution Signal Bot Trigger */}
                <div style={{ paddingTop: '4px' }}>
                  <ProsecutionSignalModal event={evt} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
