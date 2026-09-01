'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LegalSignalTrackingRecord {
  id: string;
  caseTitle: string;
  involvedEntity: string;
  targetInstitution: string; // e.g. "Върховна Прокуратура", "ГДБОП", "КПК", "Европейска прокуратура (EPPO)"
  incomingNumber: string;
  submissionDate: string;
  currentStatus: 'ОТКАЗ ОТ ДОСЪДЕБНО ПРОИЗВОДСТВО' | 'СПРЯНА ПРОВЕРКА / ЧАДЪР' | 'АКТИВНО РАЗСЛЕДВАНЕ НА EPPO' | 'ЛИПСА НА ОТГОВОР В ЗАКОНОВ СРОК';
  statusColor: string;
  prosecutorAssigned: string;
  daysPassed: number;
  officialRefusalRationale?: string;
  evidencePackageUrl: string;
}

const SIGNALS_TRACKING_DATA: LegalSignalTrackingRecord[] = [
  {
    id: 'SIG-HEMUS-001',
    caseTitle: 'АМ „Хемус": 1.18 млрд. лв. аванси и инхаус превъзлагане',
    involvedEntity: 'Агенция „Пътна инфраструктура" & „Автомагистрали" ЕАД',
    targetInstitution: 'Софийска градска прокуратура / КПК',
    incomingNumber: 'Вх. № 14208/2021-СГП',
    submissionDate: '2021-11-15',
    currentStatus: 'СПРЯНА ПРОВЕРКА / ЧАДЪР',
    statusColor: '#DC2626',
    prosecutorAssigned: 'Специализиран отдел за стопански престъпления',
    daysPassed: 1020,
    officialRefusalRationale: 'Множество разделени досъдебни производства без повдигнати обвинения на висшите разпоредители с бюджета.',
    evidencePackageUrl: '/evidence'
  },
  {
    id: 'SIG-KAPITAN-002',
    caseTitle: 'ГКПП „Капитан Андреево": Лабораторен монопол на границата',
    involvedEntity: 'БАБХ / „Евролаб 2011" ЕООД',
    targetInstitution: 'Европейска прокуратура (EPPO) & Върховна прокуратура',
    incomingNumber: 'Вх. № EPPO-BG-2022-089',
    submissionDate: '2022-06-10',
    currentStatus: 'АКТИВНО РАЗСЛЕДВАНЕ НА EPPO',
    statusColor: '#10B981',
    prosecutorAssigned: 'Делегирани европейски прокурори (София)',
    daysPassed: 810,
    officialRefusalRationale: 'Проверки на място с изземване на документация и договори за наем на гранични съоръжения.',
    evidencePackageUrl: '/evidence'
  },
  {
    id: 'SIG-DKK-DAMS-003',
    caseTitle: 'ДКК: 500 млн. лв. аванси за ремонт на язовири',
    involvedEntity: 'Държавна консолидационна компания / „Монтажи" ЕАД',
    targetInstitution: 'Софийска градска прокуратура',
    incomingNumber: 'Вх. № 8912/2021-СГП',
    submissionDate: '2021-09-20',
    currentStatus: 'ЛИПСА НА ОТГОВОР В ЗАКОНОВ СРОК',
    statusColor: '#EAB308',
    prosecutorAssigned: 'Неустановен / Преписка на трупчета',
    daysPassed: 1075,
    officialRefusalRationale: 'Липса на публичен доклад за хода на следствените действия въпреки констатациите на Сметната палата.',
    evidencePackageUrl: '/evidence'
  },
  {
    id: 'SIG-BBR-LOANS-004',
    caseTitle: 'ББР: Кредитна концентрация към 8 едри групи (946 млн. лв.)',
    involvedEntity: 'Българска банка за развитие ЕАД',
    targetInstitution: 'Комисия за противодействие на корупцията (КПК)',
    incomingNumber: 'Вх. № КПК-СИГ-2021-314',
    submissionDate: '2021-06-18',
    currentStatus: 'ОТКАЗ ОТ ДОСЪДЕБНО ПРОИЗВОДСТВО',
    statusColor: '#DC2626',
    prosecutorAssigned: 'Отдел за превенция и конфликт на интереси',
    daysPassed: 1170,
    officialRefusalRationale: '„Не са открити данни за конфликт на интереси или престъпление по служба при отпускане на кредитните линии."',
    evidencePackageUrl: '/evidence'
  }
];

export default function SignalsTrackerPage() {
  const [filter, setFilter] = useState('ALL');

  const filteredSignals = SIGNALS_TRACKING_DATA.filter(sig => 
    filter === 'ALL' || sig.currentStatus === filter
  );

  return (
    <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
          <span className="badge-exclusive">РЕГИСТЪР НА СИГНАЛИТЕ ПО ЧЛ. 205 НПК</span>
          <span className="badge-audit">ПРОСЛЕДЯВАНЕ НА ИНСТИТУЦИОНАЛНИЯ ОТГОВОР</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>
          Проследяване на Сигналите и Входящите Номера
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '850px' }}>
          Публичен регистър на изпратените граждански и одитни сигнали до Прокуратурата, КПК, ГДБОП и EPPO. Тук се документира кои институции работят и кои поставят преписките „на трупчета".
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { id: 'ALL', label: 'Всички Сигнали' },
          { id: 'СПРЯНА ПРОВЕРКА / ЧАДЪР', label: '🛑 Спрени Проверки / Чадър' },
          { id: 'ЛИПСА НА ОТГОВОР В ЗАКОНОВ СРОК', label: '⏳ Без Отговор' },
          { id: 'АКТИВНО РАЗСЛЕДВАНЕ НА EPPO', label: '🇪🇺 Разследвания на EPPO' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              backgroundColor: filter === tab.id ? '#0F172A' : '#F8FAFC',
              color: filter === tab.id ? '#FFFFFF' : '#475569',
              border: filter === tab.id ? '2px solid #38BDF8' : '1px solid #E2E8F0',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Signals Tracking Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        {filteredSignals.map(sig => (
          <div key={sig.id} className="editorial-card" style={{ padding: '2rem' }}>
            
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '1.2rem', marginBottom: '1.2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', backgroundColor: '#0F172A', color: '#38BDF8', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    {sig.incomingNumber}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Подаден на: {sig.submissionDate} ({sig.daysPassed} дни без присъда)
                  </span>
                </div>
                <h2 style={{ fontSize: '1.35rem', color: 'var(--brand-navy)', fontWeight: 800, margin: '4px 0 0 0' }}>
                  {sig.caseTitle}
                </h2>
                <div style={{ fontSize: '0.88rem', color: '#475569', marginTop: '2px' }}>
                  Сезиран орган: <strong>{sig.targetInstitution}</strong> • Обект: {sig.involvedEntity}
                </div>
              </div>

              {/* Status Badge */}
              <div style={{
                backgroundColor: sig.currentStatus.includes('АКТИВНО') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                border: `1px solid ${sig.statusColor}`,
                color: sig.statusColor,
                padding: '6px 14px',
                borderRadius: '6px',
                fontWeight: 900,
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}>
                {sig.currentStatus}
              </div>
            </div>

            {/* Middle Bar: Rationale and Prosecutor */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.2rem', fontSize: '0.88rem' }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                  Разпределен Наблюдаващ Орган:
                </span>
                <span style={{ fontWeight: 700, color: '#1E293B' }}>{sig.prosecutorAssigned}</span>
              </div>

              <div style={{ backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: '6px', border: '1px solid #FECACA' }}>
                <span style={{ fontSize: '0.72rem', color: '#991B1B', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                  Констатиран Институционален Резултат:
                </span>
                <span style={{ color: '#7F1D1D', fontWeight: 600 }}>{sig.officialRefusalRationale}</span>
              </div>
            </div>

            {/* Bottom Bar: Action Links */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '0.8rem' }}>
              <Link href={sig.evidencePackageUrl} style={{ color: '#1E40AF', fontSize: '0.82rem', fontWeight: 700 }}>
                📑 Виж приложените одитни доказателства към сигнала ➔
              </Link>
              <Link href="/whistleblower" style={{ color: '#E11D48', fontSize: '0.82rem', fontWeight: 800 }}>
                🔒 Подай нов допълващ сигнал за този казус ➔
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
