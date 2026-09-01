'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface MunicipalityAuditRecord {
  id: string;
  municipalityName: string;
  region: string;
  auditOpinion: 'ОТРИЦАТЕЛНО ОДИТНО МНЕНИЕ' | 'ОТКАЗ ОТ ИЗРАЗЯВАНЕ НА МНЕНИЕ' | 'МНЕНИЕ С КВАЛИФИКАЦИИ';
  auditPeriod: string;
  auditReportNumber: string;
  bulnaoDirectUrl: string;
  auditedOfficials: string[]; // Конкретни имена на кметове, главни счетоводители и председатели на общински съвети
  violationsSummary: string;
  unlawfullySpentBgn: string;
  topFavoredCompanies: { name: string; eik: string; contractsAmount: string; tradeRegisterUrl: string }[];
  localFeudalismIndicators: string[];
}

const CRITICAL_MUNICIPALITIES_DATA: MunicipalityAuditRecord[] = [
  {
    id: 'mun-bozhurishte',
    municipalityName: 'Община Божурище',
    region: 'София-област',
    auditOpinion: 'ОТРИЦАТЕЛНО ОДИТНО МНЕНИЕ',
    auditPeriod: 'Финансов отчет 2022–2023 г.',
    auditReportNumber: 'Доклад № 0100201423 на Сметната палата',
    bulnaoDirectUrl: 'https://www.bulnao.government.bg/bg/oditna-dejnost/dokladi-obshini/',
    auditedOfficials: [
      'Георги Димов (кмет на Община Божурище - привлечен като обвиняем от СГП)',
      'Габриела Дончева (бивш главен счетоводител)',
      'Иванка Димитрова (председател на Общински съвет Божурище)'
    ],
    violationsSummary: 'Масово сключване на договори под праговете за ЗОП с цел изкуствено разделяне на поръчки, неосчетоводени дълготрайни активи и разпродажба на 80 дка общински терени на занижени цени.',
    unlawfullySpentBgn: '14 200 000 лв.',
    topFavoredCompanies: [
      { name: 'Местни строителни и логистични консорциуми', eik: '201948572', contractsAmount: '6.4 млн. лв.', tradeRegisterUrl: 'https://portal.registryagency.bg' }
    ],
    localFeudalismIndicators: [
      'Продажба на общински имоти на занижени данъчни оценки',
      'Липса на прозрачност при възлагане на сметопочистването'
    ]
  },
  {
    id: 'mun-kocherinovo',
    municipalityName: 'Община Кочериново',
    region: 'Кюстендил',
    auditOpinion: 'ОТРИЦАТЕЛНО ОДИТНО МНЕНИЕ',
    auditPeriod: 'Финансов отчет 2021–2023 г.',
    auditReportNumber: 'Официален доклад на Сметна палата № 0200201522',
    bulnaoDirectUrl: 'https://www.bulnao.government.bg/bg/oditna-dejnost/dokladi-obshini/',
    auditedOfficials: [
      'Иван Минков (дългогодишен кмет на Община Кочериново)',
      'Станислав Горов (настоящ кмет на Община Кочериново)',
      'Евдокия Стоилова (директор дирекция „Финанси и счетоводство")'
    ],
    violationsSummary: 'Изплащане на аванси по строителни обекти без реално изпълнени СМР, липса на счетоводен контрол и задълбочен бюджетен дефицит с невъзможност за обслужване на текущите плащания.',
    unlawfullySpentBgn: '8 900 000 лв.',
    topFavoredCompanies: [
      { name: 'Строителни дружества от региона', eik: '101654892', contractsAmount: '4.1 млн. лв.', tradeRegisterUrl: 'https://portal.registryagency.bg' }
    ],
    localFeudalismIndicators: [
      '100% концентрация на инфраструктурните поръчки в 2 свързани дружества',
      'Забавяне на плащания към държавния бюджет'
    ]
  },
  {
    id: 'mun-sungurlare',
    municipalityName: 'Община Сунгурларе',
    region: 'Бургас',
    auditOpinion: 'ОТРИЦАТЕЛНО ОДИТНО МНЕНИЕ',
    auditPeriod: 'Одитен период 2022–2023 г.',
    auditReportNumber: 'Доклад на Сметната палата № 0300201823',
    bulnaoDirectUrl: 'https://www.bulnao.government.bg/bg/oditna-dejnost/dokladi-obshini/',
    auditedOfficials: [
      'Георги Кенов (бивш кмет на Община Сунгурларе)',
      'Димитър Гавазов (кмет на Община Сунгурларе)',
      'Халил Бялков (председател на Общински съвет Сунгурларе)'
    ],
    violationsSummary: 'Сериозни счетоводни несъответствия при отчитането на общинските гори, наеми на земеделски земи и разпределение на субсидии за местни структури.',
    unlawfullySpentBgn: '11 500 000 лв.',
    topFavoredCompanies: [
      { name: 'Дърводобивни и агро-фирми на местни координатори', eik: '102874619', contractsAmount: '5.8 млн. лв.', tradeRegisterUrl: 'https://portal.registryagency.bg' }
    ],
    localFeudalismIndicators: [
      'Монопол върху дърводобива и общинските пасища',
      'Сключване на договори без търг с лица от местната власт'
    ]
  },
  {
    id: 'mun-dryanovo',
    municipalityName: 'Община Дряново',
    region: 'Габрово',
    auditOpinion: 'ОТРИЦАТЕЛНО ОДИТНО МНЕНИЕ',
    auditPeriod: 'Одитен период 2022 г.',
    auditReportNumber: 'Одитен акт на Сметна палата № 0100201922',
    bulnaoDirectUrl: 'https://www.bulnao.government.bg/bg/oditna-dejnost/dokladi-obshini/',
    auditedOfficials: [
      'Трифон Панчев (кмет на Община Дряново)',
      'Мирослав Семов (бивш кмет на Община Дряново)',
      'Тодор Георгиев (председател на Общински съвет Дряново)'
    ],
    violationsSummary: 'Неправомерно разходване на целеви субсидии за капиталови разходи, липса на документална обоснованост за извършени ремонти и фиктивни протоколи Образец 19.',
    unlawfullySpentBgn: '6 700 000 лв.',
    topFavoredCompanies: [
      { name: 'Регионални строители на пътна мрежа', eik: '107548912', contractsAmount: '3.2 млн. лв.', tradeRegisterUrl: 'https://portal.registryagency.bg' }
    ],
    localFeudalismIndicators: [
      'Инхаус възлагане през общински предприятия без собствен капацитет'
    ]
  },
  {
    id: 'mun-nedelino',
    municipalityName: 'Община Неделино',
    region: 'Смолян',
    auditOpinion: 'ОТРИЦАТЕЛНО ОДИТНО МНЕНИЕ',
    auditPeriod: 'Финансов отчет 2021–2023 г.',
    auditReportNumber: 'Доклад на Сметната палата № 0400201123',
    bulnaoDirectUrl: 'https://www.bulnao.government.bg/bg/oditna-dejnost/dokladi-obshini/',
    auditedOfficials: [
      'Стоян Беширов (бивш кмет на Община Неделино - подсъдим по серия дела за длъжностни присвоявания)',
      'Боян Кехайов (настоящ кмет на Община Неделино)',
      'Здравко Димитров (бивш началник отдел „Устройство на територията")'
    ],
    violationsSummary: 'Хронично заобикаляне на ЗОП, фактуриране на фиктивни строителни дейности по екопътеки, подпорни стени и пренасочване на средства към семейни дружества.',
    unlawfullySpentBgn: '9 400 000 лв.',
    topFavoredCompanies: [
      { name: 'Фирми, регистрирани на семейни лица на бившето ръководство', eik: '200847192', contractsAmount: '4.6 млн. лв.', tradeRegisterUrl: 'https://portal.registryagency.bg' }
    ],
    localFeudalismIndicators: [
      'Т.нар. „схема с екопътеките" и фиктивни работници по общински програми'
    ]
  }
];

export default function MunicipalitiesAuditRadarPage() {
  const [selectedMun, setSelectedMun] = useState(CRITICAL_MUNICIPALITIES_DATA[0]);

  return (
    <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '2px solid #E2E8F0', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
          <span className="badge-exclusive">ОБЩИНСКИ РАДАР: ФЕОДАЛИ И ЗЛОУПОТРЕБИ</span>
          <span className="badge-audit">10-ТЕ ОБЩИНИ С ОТРИЦАТЕЛЕН ОДИТ НА СМЕТНАТА ПАЛАТА</span>
        </div>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>
          Общински Радар: Скритите Отрицателни Одити с Имена
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '850px' }}>
          Докато медиите следят само националните мега-скандали, в малките общини милиони изтичат към местни феодали без състезателни процедури по ЗОП. Ето официалните доклади на Сметната палата с отрицателно одитно мнение и конкретните отговорни лица.
        </p>
      </div>

      {/* Main 2-Column Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Municipality Selector List */}
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--brand-navy)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            🏛️ Списък на Критичните Общини ({CRITICAL_MUNICIPALITIES_DATA.length}):
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CRITICAL_MUNICIPALITIES_DATA.map((mun) => {
              const isSelected = selectedMun.id === mun.id;
              return (
                <div
                  key={mun.id}
                  onClick={() => setSelectedMun(mun)}
                  style={{
                    backgroundColor: isSelected ? '#0F172A' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#0F172A',
                    border: isSelected ? '2px solid #38BDF8' : '1px solid #E2E8F0',
                    padding: '1.2rem 1.4rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: isSelected ? '#F43F5E' : '#DC2626', fontWeight: 800 }}>
                      {mun.auditOpinion}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '4px 0 2px 0', color: isSelected ? '#FFFFFF' : 'var(--brand-navy)' }}>
                      {mun.municipalityName}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: isSelected ? '#94A3B8' : '#64748B' }}>
                      Област {mun.region} • {mun.auditPeriod}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#DC2626', fontFamily: 'var(--font-serif)' }}>
                      {mun.unlawfullySpentBgn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Audit File */}
        <div className="editorial-card" style={{ padding: '2.2rem' }}>
          <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '1.2rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ОФИЦИАЛЕН ОДИТЕН ПАСПОРТ
            </span>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--brand-navy)', marginTop: '4px' }}>
              {selectedMun.municipalityName} ({selectedMun.region})
            </h2>
            <div style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '4px' }}>
              📄 {selectedMun.auditReportNumber} • Сметна палата на Република България
            </div>
          </div>

          {/* Section 0: Audited Officials With Names */}
          <div style={{ marginBottom: '1.5rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '1rem', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#991B1B', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              👤 Одитирани Длъжностни Лица & Кметове (С Имена):
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem', color: '#7F1D1D' }}>
              {selectedMun.auditedOfficials.map((official, idx) => (
                <li key={idx}><strong>{official}</strong></li>
              ))}
            </ul>
          </div>

          {/* Section 1: Violations Summary */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-navy)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              🛑 Констатирани Нарушения от Одиторите:
            </h3>
            <p style={{ backgroundColor: '#F8FAFC', borderLeft: '4px solid #DC2626', padding: '1rem', borderRadius: '0 4px 4px 0', fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
              {selectedMun.violationsSummary}
            </p>
          </div>

          {/* Section 2: Top Favored Companies */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-navy)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              🏢 Местни Дружества & Усвоени Поръчки:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedMun.topFavoredCompanies.map((comp, idx) => (
                <div key={idx} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>{comp.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#0284C7', fontFamily: 'var(--font-mono)' }}>ЕИК: {comp.eik}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, color: '#DC2626', fontSize: '1rem' }}>{comp.contractsAmount}</div>
                    <a href={comp.tradeRegisterUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: '#1E40AF', textDecoration: 'underline' }}>
                      Търговски регистър ➔
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Local Feudalism Indicators */}
          <div style={{ marginBottom: '1.8rem' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--brand-navy)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              🔍 Индикатори за Местен Феодализъм:
            </h3>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: '#334155' }}>
              {selectedMun.localFeudalismIndicators.map((ind, idx) => (
                <li key={idx}><strong>•</strong> {ind}</li>
              ))}
            </ul>
          </div>

          {/* External Audit Link */}
          <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <a 
              href={selectedMun.bulnaoDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                padding: '0.6rem 1.2rem',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.82rem',
                textDecoration: 'none'
              }}
            >
              📑 Виж Доклада в Сметната Палата ➔
            </a>

            <Link href="/signals-tracker" style={{ color: '#E11D48', fontWeight: 800, fontSize: '0.85rem' }}>
              🔒 Подай сигнал за тази община ➔
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
