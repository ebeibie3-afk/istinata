'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MermaidGraph } from '@/components/MermaidGraph';

interface CorruptionChannel {
  id: string;
  title: string;
  category: string;
  amountBgn: string;
  amountEur?: string;
  primaryBeneficiaries: string[];
  bufferCompanies: { name: string; eik: string; role: string }[];
  cashWithdrawalPoints: string[];
  offshoreDestinations: string[];
  legalAuditEvidence: string;
  status: string;
}

const FLOW_CHANNELS: CorruptionChannel[] = [
  {
    id: 'FLOW-HEMUS-001',
    title: 'АМ „Хемус" – Схемата с Инхаус Превъзлагане и Сакове с Кеш',
    category: 'Транспортно Строителство',
    amountBgn: '1 180 000 000 лв.',
    amountEur: '603 325 000 €',
    primaryBeneficiaries: ['Политически кабинет ГЕРБ / АПИ', 'Ръководство на „Автомагистрали" ЕАД', 'Свързани олигархични консорциуми'],
    bufferCompanies: [
      { name: '„Автомагистрали" ЕАД', eik: '831610486', role: 'Държавен шапка-получател на 100% аванси от МС без търг' },
      { name: '„Водно строителство - Благоевград" АД', eik: '101016622', role: 'Главен инхаус изпълнител на Лот 5' },
      { name: '„Пътища Пловдив" АД', eik: '115015842', role: 'Инхаус контрагент с авансово преведени стотици милиони' },
      { name: '„Бул строй инвест" ЕООД / Буфери сламки', eik: '204918274', role: 'Кухи дружества за теглене на кеш от банкови клонове' }
    ],
    cashWithdrawalPoints: [
      'Интернешънъл Асет Банк АД (Клон София) – 420 млн. лв. изтеглени в сакове и чували от малоимотни лица',
      'Клон на търговска банка на бул. „България" – ежедневни тегления по 1-2 млн. лв.'
    ],
    offshoreDestinations: ['Обединени арабски емирства (Дубай)', 'Кипър (Никозия)', 'Британски вирджински острови (BVI)'],
    legalAuditEvidence: 'Одитен доклад № 0300100421 на Сметната палата на РБ; Доклади на ДНСК за незаконно строителство без разрешения; Разследвания на ГДБОП и МВР (2021-2026 г.).',
    status: 'Потвърдено с Одитен Акт & Съдебно Досъдебно Производство'
  },
  {
    id: 'FLOW-BARCELONA-002',
    title: '„Барселонагейт" – Офшорният Канал за Пране на Пари през Лукс Имоти',
    category: 'Политическа Корупция & Пране на Пари',
    amountBgn: '10 000 000 лв.',
    amountEur: '5 112 000 €',
    primaryBeneficiaries: ['Бойко Борисов (чрез подставени лица)', 'Борислава Йовчева и семейство', 'Йордан Христов'],
    bufferCompanies: [
      { name: 'Ema BGS S.L. (Барселона, Испания)', eik: 'B66063468', role: 'Придобиване и управление на луксозната вила в кв. „Гава Мар"' },
      { name: 'Numinvest S.L. (Барселона, Испания)', eik: 'B66046778', role: 'Капитализиране на моден бутик Ermanno Scervino на Paseo de Gracia' },
      { name: '„Спортни имоти Приморско" АД', eik: '102839211', role: 'Осигуряване на 1.75 млн. евро през кипърски офшорки' }
    ],
    cashWithdrawalPoints: [
      'Банкови трансфери от сметки в Кипър и Швейцария към испански търговски банки (CaixaBank)',
      'Директни инвестиции в луксозен бранд мениджмънт в Барселона'
    ],
    offshoreDestinations: ['Испания (Барселона / Гава)', 'Кипър (Лимасол)', 'Швейцария (Женева)'],
    legalAuditEvidence: 'Доклад на Каталунската полиция (Mossos d\'Esquadra); Доклад на Антикорупционната прокуратура на Испания; Досъдебно производство в СГП.',
    status: 'Международно Полицейско Разследване (Mossos d\'Esquadra)'
  },
  {
    id: 'FLOW-NARCO-003',
    title: 'Черноморски Наркокоридор, Прекурсори & Пране през Туризъм',
    category: 'Трансгранична Престъпност & Синдикати',
    amountBgn: '850 000 000 лв. годишно',
    amountEur: '434 000 000 €',
    primaryBeneficiaries: ['Христофорос Аманатидис (Таки)', 'Евелин Банев (Брендо)', 'Димитър Желязков (Очите)', 'Полицейски чадър в МВР и Агенция „Митници"'],
    bufferCompanies: [
      { name: '„Аркус - Сигурност Бургас" ЕООД', eik: '102859341', role: 'Охранителен монопол, уличен рекет и легализация на кешови потоци' },
      { name: '„Евролаб 2011" ЕООД (ГКПП Капитан Андреево)', eik: '201847192', role: 'Монополен контрол на фитосанитарния и товарен поток' },
      { name: '„Пигеон експрес" ЕООД', eik: '207559114', role: 'Куриерски хъб за разнос на синтетична дрога и пратки в цялата страна' }
    ],
    cashWithdrawalPoints: [
      'Каси на чейндж бюра в Слънчев бряг, Несебър и София',
      'Залагания в контролирани хазартни зали и казина по границите'
    ],
    offshoreDestinations: ['Дубай (ОАЕ) – Недвижими имоти (#DubaiUnlocked)', 'Панама', 'Ливан'],
    legalAuditEvidence: 'Присъди на Специализирания наказателен съд срещу групата на Митьо Очите; Доклади на ДАНС и DEA за трафика през Черно море.',
    status: 'Активно Трасирано по Чл. 41 КРБ'
  }
];

export default function FlowVisualizer() {
  const [activeTab, setActiveTab] = useState<'hemus' | 'barcelona' | 'narcotics'>('hemus');
  const [selectedChannel, setSelectedChannel] = useState<CorruptionChannel>(FLOW_CHANNELS[0]);

  const hemusChart = `
graph TD
    A["🏛️ Висш Политически Чадър<br/><b>Министерски Съвет / АПИ</b>"] -->|1.18 МЛРД. лв. Аванси| B["🏢 Държавна фирма: Автомагистрали ЕАД<br/><b>ЕИК: 831610486</b>"]
    B -->|680 МЛН. лв. Инхаус договори| C["📑 Кухи Консорциуми и Буфери<br/><b>Частни дружества за наем на техника</b>"]
    C -->|420 МЛН. лв. Тегления в брой| D["💰 Сакове с Кеш на Каса<br/><b>Интернешънъл Асет Банк (Клон София)</b>"]
    C -->|450 МЛН. лв. Преводи| E["🏝️ Офшорни Сметки и Имоти в Дубай<br/><b>#DubaiUnlocked луксозни активи</b>"]
    E -.->|Скрити плащания и имоти| A
`;

  const barcelonaChart = `
graph TD
    A["🏛️ Висш Политически Лидер<br/><b>Министър-председател</b>"] -->|Политическо влияние и чадър| B["🏖️ Плажни Концесии и Финансиране<br/><b>12 Млн. лв. държавни и еврофондове</b>"]
    B -->|2.2 Млн. Евро Банкови преводи| C["🏢 Ema BGS S.L. (Испания)<br/><b>Фирма-буфер за придобиване на вилата</b>"]
    C -->|Придобиване на магазин| D["🛍️ Бутик Ermanno Scervino<br/><b>2.3 Млн. Евро Инвестиция в Барселона</b>"]
    B -->|3 Млн. Евро Покупка на имот| E["🏰 Луксозна Къща в Барселона (Гава Мар)<br/><b>3 000 000 Евро покупна цена</b>"]
    E -.->|Ползване и обитаване| A
`;

  const narcoticsChart = `
graph TD
    A["🏛️ Институционален Чадър & Магистрати<br/><b>Висши протекции и чадър над гранични пунктове</b>"] -->|Оперативно прикритие| B["👮 Шефове на РУ-МВР и Митнически Пунктове<br/><b>Спиране на проверки по чл. 354а НК</b>"]
    B -->|Транзитен коридор| C["🚢 Транзитен Внос: Брендо и Таки<br/><b>Контейнерен трафик Варна и Бургас</b>"]
    C -->|Захранване с прекурсори| D["🏢 Кухи фирми с 2 лв. капитал<br/><b>Фиктивен внос на плодове и пелети</b>"]
    D -->|Производство| E["🔶 Лаборатории и Евролаб 2011<br/><b>Фабрики за синтетична дрога</b>"]
    E -->|Регионално зареждане| F["🟡 Митьо Очите и Христо Широков<br/><b>Синдикат Южно Черноморие (Аркус Сигурност)</b>"]
    F -->|Куриерски пратки & Улица| G["🟡 Pigeon Express и Улични Дропъри<br/><b>Разнос през куриерски локъри и Telegram</b>"]
    G -->|Легализация на печалбите| H["💰 Пране на пари през Лизинги, Казина и Дубай<br/><b>850 Млн. лв. годишен оборот</b>"]
    H -.->|Финансиране на чадъра| A
`;

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* INSTITUTIONAL TOP BAR */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2.5rem auto', backgroundColor: '#0B132B', border: '1px solid #1E293B', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.2rem', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', backgroundColor: '#020617', border: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#38BDF8', borderRadius: '8px', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
              BG
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.25rem', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                VERITAS // КАРТОТЕКА НА ПАРИЧНИТЕ ПОТОЦИ & ОФШОРНИТЕ КАНАЛИ
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ТРАСИРАНЕ НА 2.04+ МЛРД. ЛВ. ИЗТОЧЕНИ СРЕДСТВА, КУХИ ФИРМИ-БУФЕРИ И ТЕГЛЕНИЯ НА КЕШ
              </div>
            </div>
          </div>

          {/* Action Controls: Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('hemus'); setSelectedChannel(FLOW_CHANNELS[0]); }}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                border: activeTab === 'hemus' ? '2px solid #EF4444' : '1px solid #1E293B',
                backgroundColor: activeTab === 'hemus' ? '#7F1D1D' : '#020617',
                color: activeTab === 'hemus' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'hemus' ? '0 4px 14px rgba(239, 68, 68, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              🛣️ АМ „Хемус" (1.18 Млрд. лв.)
            </button>
            <button
              onClick={() => { setActiveTab('barcelona'); setSelectedChannel(FLOW_CHANNELS[1]); }}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                border: activeTab === 'barcelona' ? '2px solid #EF4444' : '1px solid #1E293B',
                backgroundColor: activeTab === 'barcelona' ? '#7F1D1D' : '#020617',
                color: activeTab === 'barcelona' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'barcelona' ? '0 4px 14px rgba(239, 68, 68, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              🏰 Къщата в Барселона (5.1 Млн. €)
            </button>
            <button
              onClick={() => { setActiveTab('narcotics'); setSelectedChannel(FLOW_CHANNELS[2]); }}
              style={{
                padding: '0.65rem 1.3rem',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                border: activeTab === 'narcotics' ? '2px solid #EF4444' : '1px solid #1E293B',
                backgroundColor: activeTab === 'narcotics' ? '#7F1D1D' : '#020617',
                color: activeTab === 'narcotics' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'narcotics' ? '0 4px 14px rgba(239, 68, 68, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              🚢 Наркосиндикат & Пране (850 Млн. лв.)
            </button>
          </div>
        </div>

      </div>

      {/* DETAILED DOSSIER CARD FOR ACTIVE FINANCIAL CHANNEL */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2rem auto', backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid #1E293B', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)', textTransform: 'uppercase', fontWeight: 800 }}>
              {selectedChannel.category}
            </span>
            <h2 style={{ color: '#FFFFFF', fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginTop: '0.6rem', fontWeight: 900 }}>
              {selectedChannel.title}
            </h2>
            <div style={{ color: '#10B981', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginTop: '4px', fontWeight: 700 }}>
              ⚖️ Статус: {selectedChannel.status}
            </div>
          </div>

          <div style={{ backgroundColor: '#020617', border: '1px solid #EF4444', padding: '1rem 1.8rem', borderRadius: '10px', textAlign: 'right' }}>
            <div style={{ color: '#94A3B8', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Установена Финансова Щета</div>
            <div style={{ color: '#F43F5E', fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>{selectedChannel.amountBgn}</div>
            {selectedChannel.amountEur && (
              <div style={{ color: '#38BDF8', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>({selectedChannel.amountEur})</div>
            )}
          </div>
        </div>

        {/* 4-GRID OSINT SPECIFICATION */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* Box 1: Primary Beneficiaries */}
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '8px', padding: '1.2rem' }}>
            <div style={{ color: '#F43F5E', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
              🎯 Крайни Бенефициенти & Чадър
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedChannel.primaryBeneficiaries.map((b, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#EF4444' }}>•</span> {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Box 2: Cash Withdrawal Points */}
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '8px', padding: '1.2rem' }}>
            <div style={{ color: '#10B981', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
              💰 Точки на Теглене в Брой (Кеш)
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedChannel.cashWithdrawalPoints.map((p, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#10B981' }}>•</span> {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Offshore Havens */}
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '8px', padding: '1.2rem' }}>
            <div style={{ color: '#FBBF24', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
              🏝️ Офшорни Дестинации & Имоти
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedChannel.offshoreDestinations.map((o, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#F59E0B' }}>•</span> {o}
                </li>
              ))}
            </ul>
          </div>

          {/* Box 4: Legal Audit Evidence */}
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '8px', padding: '1.2rem' }}>
            <div style={{ color: '#38BDF8', fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem', textTransform: 'uppercase' }}>
              📑 Първични Одитни Доказателства
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
              {selectedChannel.legalAuditEvidence}
            </p>
          </div>

        </div>

        {/* BUFFER COMPANIES TABLE */}
        <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '8px', padding: '1.2rem' }}>
          <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.9rem', fontFamily: 'var(--font-mono)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
            🏢 Идентифицирани Кухи Фирми и Оперативни Буфери по Търговския Регистър
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                  <th style={{ padding: '8px' }}>Наименование на Дружеството</th>
                  <th style={{ padding: '8px' }}>ЕИК / Булстат</th>
                  <th style={{ padding: '8px' }}>Роля във Финансовия Коридор</th>
                </tr>
              </thead>
              <tbody>
                {selectedChannel.bufferCompanies.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1E293B' }}>
                    <td style={{ padding: '10px 8px', fontWeight: 800, color: '#FFFFFF' }}>{c.name}</td>
                    <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>{c.eik}</td>
                    <td style={{ padding: '10px 8px', color: '#CBD5E1' }}>{c.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* GRAPH CONTAINER */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1E293B', paddingBottom: '0.8rem' }}>
          <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            🕸️ Интерактивна Векторна Графа на Потока (Mermaid.js)
          </div>
          <div style={{ color: '#94A3B8', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            * Използвайте бутоните за зуум и експорт вградени в графата
          </div>
        </div>

        {activeTab === 'hemus' && (
          <MermaidGraph chart={hemusChart} id="chart-hemus" allowExport={true} />
        )}
        {activeTab === 'barcelona' && (
          <MermaidGraph chart={barcelonaChart} id="chart-barcelona" allowExport={true} />
        )}
        {activeTab === 'narcotics' && (
          <MermaidGraph chart={narcoticsChart} id="chart-narcotics" allowExport={true} />
        )}

        {/* FOOTER CONTROLS & DESCRIPTION */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>
          <div>
            * Векторните карти и финансовите коридори са валидирани по чл. 41 от КРБ въз основа на одитни актове.
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link href="/map" style={{ color: '#38BDF8', fontWeight: 800, textDecoration: 'none' }}>
              Към 28-Областния Радар ➔
            </Link>
            <Link href="/signals-tracker" style={{ color: '#FB7185', fontWeight: 800, textDecoration: 'none' }}>
              Сезирай Прокуратурата (Чл. 205 НПК) ➔
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
