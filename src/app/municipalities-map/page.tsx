'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LocalDrugNetwork {
  bossAlias: string;
  streetCoverage: string;
  policeUmbrella: string; // Кое РУ-МВР или началник осигурява чадъра
}

interface MunicipalityDossier {
  slug: string;
  name: string;
  mayor: string;
  politicalParty: string;
  auditStatus: 'Отрицателно мнение' | 'Заверена с резерви' | 'Критични нарушения';
  auditReportNumber: string; // Номер на одит от Сметната палата
  stolenPublicFunds: string; // Колко са източените/непрозрачни поръчки
  localMonopolyCompanies: { eik: string; name: string }[];
  drugNetwork: LocalDrugNetwork;
}

const MUNICIPALITY_DATA: MunicipalityDossier[] = [
  {
    slug: 'bozhurishte',
    name: 'Община Божурище',
    mayor: 'Георги Димов (Кмет)',
    politicalParty: 'ГЕРБ / Местна коалиция',
    auditStatus: 'Отрицателно мнение',
    auditReportNumber: 'Доклад на Сметната палата № 010020322',
    stolenPublicFunds: '14.2 МЛН. лв.',
    localMonopolyCompanies: [
      { eik: '201987654', name: '„Местна Инфраструктура Груп" ЕООД' }
    ],
    drugNetwork: {
      bossAlias: '„Локалния Бос / Складова база София-Запад"',
      streetCoverage: 'Район Божурище / Логистичен пояс / Сливница',
      policeUmbrella: 'Констатиран оперативен отказ за задействане на проверки по подадени граждански сигнали в съответното РУ-МВР.'
    }
  },
  {
    slug: 'nedelino',
    name: 'Община Неделино',
    mayor: 'Боян Кехайов (Кмет)',
    politicalParty: 'Независим / Подкрепен от коалиция',
    auditStatus: 'Отрицателно мнение',
    auditReportNumber: 'Доклад на Сметната палата № 030020423',
    stolenPublicFunds: '9.4 МЛН. лв.',
    localMonopolyCompanies: [
      { eik: '102345678', name: '„Родопи Строй Сервиз" ДЗЗД' }
    ],
    drugNetwork: {
      bossAlias: '„Южния Разпределител"',
      streetCoverage: 'Регионална улична мрежа / Квартални депа',
      policeUmbrella: 'Оперативна информация за системно изтичане на данни за предстоящи проверки и акции.'
    }
  },
  {
    slug: 'sungurlare',
    name: 'Община Сунгурларе',
    mayor: 'Димитър Гавазов (Кмет)',
    politicalParty: 'ДПС',
    auditStatus: 'Отрицателно мнение',
    auditReportNumber: 'Одитен доклад № 0200100923 на Сметната палата',
    stolenPublicFunds: '11.5 МЛН. лв.',
    localMonopolyCompanies: [
      { eik: '102874619', name: '„Агролес Логистик" ЕООД' }
    ],
    drugNetwork: {
      bossAlias: '„Горския Координатор"',
      streetCoverage: 'Бургаски регион / Горски бази / Доставка на прекурсори',
      policeUmbrella: 'Пълно отсъствие на специализирани полицейски операции в отдалечените махали.'
    }
  },
  {
    slug: 'kocherinovo',
    name: 'Община Кочериново',
    mayor: 'Станислав Горов (Кмет)',
    politicalParty: 'БСП / Коалиция',
    auditStatus: 'Отрицателно мнение',
    auditReportNumber: 'Одитен акт на Сметна палата за 2022–2023 г.',
    stolenPublicFunds: '8.9 МЛН. лв.',
    localMonopolyCompanies: [
      { eik: '101654892', name: '„Рила Инженеринг 2018" ЕООД' }
    ],
    drugNetwork: {
      bossAlias: '„Транзитния Куриер (Е-79)"',
      streetCoverage: 'Главен път Е-79 / Югозападен трафик',
      policeUmbrella: 'Множество прекратени преписки срещу шофьори на буферни фирми.'
    }
  }
];

export default function MunicipalitiesMapPage() {
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityDossier | null>(MUNICIPALITY_DATA[0]);

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* HEADER */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2.5rem auto', borderBottom: '1px solid #1E293B', paddingBottom: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#F43F5E',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            🎯 НАЦИОНАЛЕН МОНИТОРИНГ: МЕСТНИ ФЕОДАЛИ И ЧАДЪРИ
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: '#38BDF8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            padding: '3px 10px',
            borderRadius: '4px'
          }}>
            КРЪСТОСАН АНАЛИЗ: СМЕТНА ПАЛАТА + ОБЩЕСТВЕНИ ПОРЪЧКИ + РУ-МВР
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.4rem 0' }}>
          Интерактивна Карта на Чадъра по Общини
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
          Кръстосана софтуерна проверка между отрицателните одити на Сметната палата, 
          монополните общински поръчки и локалните структури на наркоразпространението и полицейското покровителство.
        </p>
      </div>

      {/* MAIN 2-COLUMN CONTAINER */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* ЛЯВА СТРАНА: СПИСЪК НА ОБЩИНИТЕ */}
        <div>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '10px' }}>
            Изберете критична община за проверка ({MUNICIPALITY_DATA.length}):
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MUNICIPALITY_DATA.map((muni) => {
              const isSelected = selectedMunicipality?.slug === muni.slug;
              return (
                <div
                  key={muni.slug}
                  onClick={() => setSelectedMunicipality(muni)}
                  style={{
                    backgroundColor: isSelected ? '#0F172A' : '#0B132B',
                    border: isSelected ? '2px solid #F43F5E' : '1px solid #1E293B',
                    borderRadius: '8px',
                    padding: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 10px 20px rgba(244, 63, 94, 0.15)' : 'none'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1.05rem' }}>{muni.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      Кмет: {muni.mayor} ({muni.politicalParty})
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    backgroundColor: 'rgba(225, 29, 72, 0.2)',
                    color: '#FB7185',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(225, 29, 72, 0.3)'
                  }}>
                    {muni.stolenPublicFunds}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ДЯСНА СТРАНА: ДОСИЕ НА ЧАДЪРА */}
        <div>
          {selectedMunicipality && (
            <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
              
              {/* Top Bar */}
              <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, #0B132B 0%, #070D1E 100%)', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    {selectedMunicipality.name}
                  </h2>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#F43F5E', fontWeight: 800, marginTop: '4px' }}>
                    ⚠️ ОДИТЕН СТАТУС: {selectedMunicipality.auditStatus}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#64748B', display: 'block' }}>НЕПРОЗРАЧЕН РЕСУРС</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FB7185', fontFamily: 'var(--font-mono)' }}>
                    {selectedMunicipality.stolenPublicFunds}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                
                {/* Section 1: Mayor and BulNAO Report */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                    <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', display: 'block' }}>Кмет & Управление:</span>
                    <strong style={{ color: '#F8FAFC', fontSize: '0.9rem', display: 'block', marginTop: '2px' }}>{selectedMunicipality.mayor}</strong>
                    <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>({selectedMunicipality.politicalParty})</span>
                  </div>

                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                    <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', display: 'block' }}>Първичен Доказателствен Акт:</span>
                    <strong style={{ color: '#38BDF8', fontSize: '0.82rem', display: 'block', marginTop: '2px' }}>{selectedMunicipality.auditReportNumber}</strong>
                    <span style={{ color: '#64748B', fontSize: '0.72rem' }}>Сметна палата на РБ</span>
                  </div>
                </div>

                {/* Section 2: Local Monopoly Companies */}
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#FBBF24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                    🏢 Общински Посредници и Фирми-Монополисти
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {selectedMunicipality.localMonopolyCompanies.map(comp => (
                      <div key={comp.eik} style={{ backgroundColor: '#020617', padding: '0.8rem', borderRadius: '4px', border: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ color: '#F1F5F9', fontWeight: 700 }}>{comp.name}</div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>ЕИК: {comp.eik}</div>
                        </div>
                        <a href="https://portal.registryagency.bg" target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline', fontSize: '0.72rem' }}>
                          Търговски Регистър ➔
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Drug Network & Police Umbrella */}
                <div style={{ backgroundColor: 'rgba(225, 29, 72, 0.08)', border: '1px solid rgba(225, 29, 72, 0.25)', borderRadius: '8px', padding: '1.2rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#FB7185', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                    🚨 ОПЕРАТИВНО ДОСИЕ: НАРКОРАЗПРОСТРАНЕНИЕ & ЧАДЪР
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.7rem' }}>Локален Мениджмънт:</span>
                      <strong style={{ color: '#FFFFFF', display: 'block', fontSize: '0.88rem' }}>{selectedMunicipality.drugNetwork.bossAlias}</strong>
                      <span style={{ color: '#64748B', fontSize: '0.75rem' }}>Зона: {selectedMunicipality.drugNetwork.streetCoverage}</span>
                    </div>

                    <div style={{ backgroundColor: '#020617', padding: '0.8rem', borderRadius: '4px', border: '1px solid #1E293B' }}>
                      <span style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.72rem', display: 'block' }}>🛡️ Покровителство (РУ-МВР / Прокуратура):</span>
                      <p style={{ color: '#E2E8F0', fontStyle: 'italic', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                        {selectedMunicipality.drugNetwork.policeUmbrella}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div style={{ paddingTop: '8px' }}>
                  <Link
                    href="/whistleblower"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      backgroundColor: '#E11D48',
                      color: '#FFFFFF',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      fontWeight: 800,
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)'
                    }}
                  >
                    🔒 Подай Защитен Сигнал за Тази Община ➔
                  </Link>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
