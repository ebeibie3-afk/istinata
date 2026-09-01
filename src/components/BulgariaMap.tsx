'use client';

import React, { useState } from 'react';

export interface RegionData {
  id: string;
  name: string;
  totalTrackedBgn: number;
  eventsCount: number;
  highlightCase: string;
}

const BULGARIA_REGIONS: RegionData[] = [
  { id: 'SOF', name: 'София-град', totalTrackedBgn: 850000000, eventsCount: 14, highlightCase: 'Централни обществени поръчки, НЗОК и министерства' },
  { id: 'SFO', name: 'София-област', totalTrackedBgn: 120000000, eventsCount: 4, highlightCase: 'АМ „Хемус" Лот 1 и регионални пътни ремонти' },
  { id: 'PDV', name: 'Пловдив', totalTrackedBgn: 210000000, eventsCount: 6, highlightCase: 'Общински инфраструктурни проекти и болнични заведения' },
  { id: 'VAR', name: 'Варна', totalTrackedBgn: 180000000, eventsCount: 5, highlightCase: 'Пристанищни съоръжения и брегоукрепване' },
  { id: 'BUR', name: 'Бургас', totalTrackedBgn: 240000000, eventsCount: 7, highlightCase: 'Пътни възли, общински поръчки и Южно Черноморие' },
  { id: 'RSE', name: 'Русе', totalTrackedBgn: 75000000, eventsCount: 3, highlightCase: 'Дунавски мост и трансгранични проекти' },
  { id: 'STZ', name: 'Стара Загора', totalTrackedBgn: 320000000, eventsCount: 8, highlightCase: 'Марица-Изток енергийни поръчки и ремонти' },
  { id: 'BLG', name: 'Благоевград', totalTrackedBgn: 95000000, eventsCount: 4, highlightCase: 'АМ „Струма" и ПРСР къщи за гости' },
  { id: 'VTR', name: 'Велико Търново', totalTrackedBgn: 110000000, eventsCount: 4, highlightCase: 'АМ „Хемус" междинни лотове' },
  { id: 'PLE', name: 'Плевен', totalTrackedBgn: 85000000, eventsCount: 3, highlightCase: 'АМ „Хемус" Лот 3 и общински търгове' },
  { id: 'SLV', name: 'Сливен', totalTrackedBgn: 45000000, eventsCount: 2, highlightCase: 'Регионални програми за развитие' },
  { id: 'DOB', name: 'Добрич', totalTrackedBgn: 55000000, eventsCount: 2, highlightCase: 'Земеделски субсидии и водни цикли' },
  { id: 'SHU', name: 'Шумен', totalTrackedBgn: 60000000, eventsCount: 2, highlightCase: 'Пътни съоръжения и водни цикли' },
  { id: 'KZD', name: 'Кърджали', totalTrackedBgn: 70000000, eventsCount: 3, highlightCase: 'Общински инфраструктурни проекти' },
  { id: 'HAS', name: 'Хасково', totalTrackedBgn: 160000000, eventsCount: 5, highlightCase: 'ГКПП Капитан Андреево и митнически контрол' },
  { id: 'PAZ', name: 'Пазарджик', totalTrackedBgn: 65000000, eventsCount: 2, highlightCase: 'Инфраструктура и земеделски програми' },
  { id: 'PER', name: 'Перник', totalTrackedBgn: 50000000, eventsCount: 2, highlightCase: 'Воден цикъл и рекултивация' },
  { id: 'KNL', name: 'Кюстендил', totalTrackedBgn: 40000000, eventsCount: 2, highlightCase: 'Земеделски субсидии и ПРСР' },
  { id: 'MNT', name: 'Монтана', totalTrackedBgn: 45000000, eventsCount: 2, highlightCase: 'Път E79 модернизация' },
  { id: 'VRC', name: 'Враца', totalTrackedBgn: 70000000, eventsCount: 3, highlightCase: 'АЕЦ Козлодуй доставки и пътна мрежа' },
  { id: 'VDN', name: 'Видин', totalTrackedBgn: 80000000, eventsCount: 3, highlightCase: 'Скоростен път Видин-Ботевград' },
  { id: 'GAB', name: 'Габрово', totalTrackedBgn: 35000000, eventsCount: 1, highlightCase: 'Тунел под Шипка надзор' },
  { id: 'LVR', name: 'Ловеч', totalTrackedBgn: 90000000, eventsCount: 3, highlightCase: 'АМ „Хемус" Лот 2 трасе' },
  { id: 'SML', name: 'Смолян', totalTrackedBgn: 40000000, eventsCount: 2, highlightCase: 'Родопска пътна инфраструктура' },
  { id: 'TGV', name: 'Търговище', totalTrackedBgn: 30000000, eventsCount: 1, highlightCase: 'Общински инфраструктурни проекти' },
  { id: 'RAZ', name: 'Разград', totalTrackedBgn: 35000000, eventsCount: 1, highlightCase: 'Земеделски програми' },
  { id: 'SLS', name: 'Силистра', totalTrackedBgn: 30000000, eventsCount: 1, highlightCase: 'Дунавски проекти' },
  { id: 'YAM', name: 'Ямбол', totalTrackedBgn: 40000000, eventsCount: 2, highlightCase: 'Гранични и земеделски програми' }
];

export const BulgariaInteractiveMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(BULGARIA_REGIONS[0]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
      {/* Regions Grid Selector */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Изберете Област (28 Области в България)
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '8px',
          maxHeight: '420px',
          overflowY: 'auto',
          paddingRight: '6px'
        }}>
          {BULGARIA_REGIONS.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg)}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                border: selectedRegion.id === reg.id ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                backgroundColor: selectedRegion.id === reg.id ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedRegion.id === reg.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {reg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Region Detailed Card */}
      <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-accent)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <span className="badge" style={{ backgroundColor: 'rgba(0, 240, 255, 0.15)', color: 'var(--accent-cyan)' }}>
            ОБЛАСТЕН ДОСИЕ РАДАР
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Код: {selectedRegion.id}
          </span>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Област {selectedRegion.name}
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Документирани средства
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
              {(selectedRegion.totalTrackedBgn / 1000000).toFixed(1)} Млн. лв.
            </div>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Одитни събития
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
              {selectedRegion.eventsCount} Казуса
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <strong style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ключов фокус на одит:</strong>
          <p style={{ color: 'var(--text-primary)', marginTop: '0.3rem', lineHeight: '1.5' }}>
            {selectedRegion.highlightCase}
          </p>
        </div>

        <a
          href={`/timeline?region=${encodeURIComponent(selectedRegion.name)}`}
          style={{
            display: 'inline-block',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'var(--accent-cyan)',
            color: '#000',
            fontWeight: 700,
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}
        >
          Прегледай хронологията за Област {selectedRegion.name} →
        </a>
      </div>
    </div>
  );
};
