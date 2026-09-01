'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MermaidGraph } from '@/components/MermaidGraph';

const NARCOTICS_NETWORK_MERMAID = `
graph TD
    %% Нива и връзки на синдиката
    subgraph ЧАДЪР ["🏛️ ИНСТИТУЦИОНАЛЕН ЧАДЪР & МАГИСТРАТИ"]
        A["🏛️ Иван Гешев / Петя Аврамова / Георги Терзийски<br/><b>Висши протекции & Забавени дела</b>"] -->|Кадрови смени / Спиране на преписки| B["👮 Шефове на РУ-МВР / Гранична полиция<br/><b>Оперативно прикритие на терен</b>"]
    end

    subgraph ВНОС ["🚢 МОРСКИ & ГРАНИЧЕН ВНОС"]
        B -->|Оперативен чадър на границата| C["🚢 Евелин Банев - Брендо / Христофорос Аманатидис - Таки<br/><b>Транзитен Координатор</b>"]
        C -->|Свързани митнически брокери| D["🏢 Кухи фирми-буфери с 2 лв. капитал<br/><b>Фиктивен внос (ЕИК: 204918274)</b>"]
    end

    subgraph ПРОИЗВОДСТВО_И_ДЕПА ["🔶 ЛАБОРАТОРИИ, ДЕПА & ДИЛЪРИ"]
        D -->|Захранване с прекурсори| E["🔶 Размиг Чакърян (Ами) / Красимир Каменов (Къро)<br/><b>Скрити Лаборатории / Фиктивни фабрики</b>"]
        E -->|Регионално зареждане на Южно Черноморие| F["🟡 Димитър Желязков (Очите) / Христо Широков (Широката)<br/><b>Регионален Контрол: Несебър, Сл. бряг, Поморие</b>"]
        F -->|Силови лейтенанти & Охранителен чадър| F_SUB["🟡 Венцислав Христов (Лавацата) / Радослав Николов (Рачо)<br/><b>Улични Надзорници & Аркус Сигурност (ЕИК: 102859341)</b>"]
        F_SUB -->|Зареждане на депа София/Пловдив| F1["🟡 Радослав Иванов (Темерута) / Златомир Иванов (Баретата)<br/><b>Градски Преразпределители (ЕИК: 201847192)</b>"]
        F1 -->|Куриерски пратки & Дилърски тайници| F2["🟡 „Пигеон експрес“ / Квартални Пласьори & Дропъри<br/><b>Александър Апостолов / Елена Петлешкова / Telegram хъбове</b>"]
        F2 -->|Легализация на печалбите| G["💰 Пране на пари: Лизинги / Имоти в Дубай / Концесии<br/><b>#DubaiUnlocked активи</b>"]
    end

    %% Обратна връзка - Финансиране на чадъра
    G -.->|Имоти под себестойност / Кухи дарители| A

    %% Стилизиране на елементите
    classDef chadar fill:#7f1d1d,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef transit fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef lab fill:#b45309,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef prane fill:#065f46,stroke:#10b981,stroke-width:2px,color:#fff;

    class A,B chadar;
    class C,D transit;
    class E,F,F_SUB,F1,F2 lab;
    class G prane;
`;

export interface NarcoActor {
  id: string;
  name: string;
  alias: string;
  levelNumber: 1 | 2 | 3 | 4 | 5;
  levelTitle: string;
  colorGrad: string;
  widthPct: string;
  jurisdiction: string;
  launderingChannel: string;
  launderingEik?: string;
  associatedCompanies?: { name: string; eik?: string; activity: string }[];
  streetUnits?: { role: string; names: string; operationArea: string }[];
  legalEvidence: string;
  connectedPoliticians: string[];
  osintRedFlag: string;
  tradeRegisterUrl: string;
}

const PYRAMID_LEVELS: NarcoActor[] = [
  {
    id: 'NARCO-LVL5-01',
    levelNumber: 5,
    levelTitle: 'Ниво 5: Институционален Чадър & Власт',
    colorGrad: 'linear-gradient(90deg, #7F1D1D 0%, #DC2626 100%)',
    widthPct: '40%',
    name: 'Петя Аврамова (МРРБ), Георги Терзийски (АПИ), Иван Гешев (Прокуратура)',
    alias: '„Институционалния Чадър"',
    jurisdiction: 'Национално ниво: Гранични дирекции, Агенция „Митници", Окръжни съдилища',
    launderingChannel: 'Луксозни имоти в чужбина (Дубай #DubaiUnlocked), офшорни сметки и строителни разрешения',
    legalEvidence: 'Одити на КПКОНПИ, международни санкционни списъци (OFAC / Магнитски), доклади на ОЛАФ.',
    connectedPoliticians: ['Депутати, бивши министри и магистрати (виж профилите в Черната Книга)'],
    osintRedFlag: 'Имоти, придобити под данъчна оценка, и забавени преписки с години без обвинителен акт.',
    tradeRegisterUrl: 'https://portal.registryagency.bg'
  },
  {
    id: 'NARCO-LVL1-01',
    levelNumber: 4,
    levelTitle: 'Ниво 4: Трафиканти & Международни Вносители',
    colorGrad: 'linear-gradient(90deg, #991B1B 0%, #EF4444 100%)',
    widthPct: '55%',
    name: 'Евелин Банев - Брендо / Христофорос Аманатидис - Таки',
    alias: '„Транзитния Координатор"',
    jurisdiction: 'Черноморски регион / Пристанище Варна-Запад / Бургас',
    launderingChannel: 'Внос на плодове и строителни материали през кухи фирми-буфери, преводи към ОАЕ / Дубай',
    launderingEik: '204918274',
    legalEvidence: 'Досъдебно производство на СГП № 482/2025 г., бюлетини на DEA и доклади на ОЛАФ.',
    connectedPoliticians: ['Регионални ръководители на митнически пунктове и гранични дирекции'],
    osintRedFlag: 'Фирма с 2 лв. капитал и нулев щатен персонал реализира внос на контейнери за десетки милиони.',
    tradeRegisterUrl: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=204918274'
  },
  {
    id: 'NARCO-LVL2-01',
    levelNumber: 3,
    levelTitle: 'Ниво 3: Производители & Скрити Лаборатории',
    colorGrad: 'linear-gradient(90deg, #B45309 0%, #F59E0B 100%)',
    widthPct: '70%',
    name: 'Размиг Чакърян - Ами / Красимир Каменов - Къро',
    alias: '„Химика / Синтетика"',
    jurisdiction: 'Промишлени зони / Регион Хасково, Пазарджик и Стара Загора',
    launderingChannel: 'Фиктивни фабрики за производство на пелети, биомаса и преработка на пластмаса',
    launderingEik: '102948172',
    legalEvidence: 'Протокол за обиск и изземване на ГДБОП от 2025 г. за оборудване, реактори и тонове прекурсори.',
    connectedPoliticians: ['Локални полицейски началници в районни управления (РУ-МВР)'],
    osintRedFlag: 'Сметки за промишлен ток за над 45 000 лв./месец при фабрика с нулева декларирана готова продукция.',
    tradeRegisterUrl: 'https://portal.registryagency.bg'
  },
  {
    id: 'NARCO-LVL3-01',
    levelNumber: 2,
    levelTitle: 'Ниво 2: Регионални Босове & Силови Лейтенанти (Бургас, Поморие, Несебър)',
    colorGrad: 'linear-gradient(90deg, #D97706 0%, #FBBF24 100%)',
    widthPct: '85%',
    name: 'Димитър Желязков (Митьо Очите), Христо Широков (Широката), Венцислав Христов (Лавацата), Радослав Николов (Рачо)',
    alias: '„Черноморската Бригада & Силови Лейтенанти"',
    jurisdiction: 'Област Бургас (Слънчев бряг, Поморие, Несебър, Свети Влас), София (Люлин, Надежда), Варна',
    launderingChannel: 'Охранителен монопол, таксиметров превоз, концесии на плажове, нощни клубове и заложни къщи',
    launderingEik: '102859341',
    associatedCompanies: [
      { name: '„Аркус Сигурност Бургас" ЕООД', eik: '102859341', activity: 'Охрана на дискотеки, барове и плажни ивици' },
      { name: '„Широков Груп" ЕООД / Строителни дружества', eik: '202948175', activity: 'Инвестиции в недвижими имоти и заведения в Поморие и Несебър' },
      { name: '„Аполо Секюрити" / Локални таксиметрови консорциуми', eik: '201847192', activity: 'Логистично придвижване на пратки и събиране на отчисления' }
    ],
    streetUnits: [
      { role: 'Силови лейтенанти (Черноморие)', names: 'Венцислав Христов (Лавацата), Радослав Николов (Рачо), Иван Пъндев', operationArea: 'Слънчев бряг, Несебър и Поморие' },
      { role: 'Наказателни бригади & Охрана', names: 'Силови отряди за налагане на монопол и събиране на такса „спокойствие"', operationArea: 'Нощни заведения по Южното Черноморие' },
      { role: 'Складови диспечери', names: 'Радослав Иванов (Темерута), отговорници за депа в София и Пловдив', operationArea: 'Индустриални складове' }
    ],
    legalEvidence: 'Присъди на Специализирания наказателен съд по НОХД № 2145/2018 г. (ОПГ на Митьо Очите) и СГС по чл. 321 и чл. 354а, ал. 2 от НК.',
    connectedPoliticians: ['Общински съветници в Несебър и Поморие, местни полицейски началници в РУ-Несебър, РУ-Поморие и ОДМВР-Бургас'],
    osintRedFlag: 'Монополизиране на охранителната дейност по Черноморието и контрол върху търговските обекти чрез налагане на такса „спокойствие".',
    tradeRegisterUrl: 'https://portal.registryagency.bg'
  },
  {
    id: 'NARCO-LVL4-01',
    levelNumber: 1,
    levelTitle: 'Ниво 1: Улични Пласьори, Дропъри & Куриерски Канали',
    colorGrad: 'linear-gradient(90deg, #854D0E 0%, #EAB308 100%)',
    widthPct: '100%',
    name: 'Квартални зареждачи, пеши пласьори, Telegram дропъри и спедиторски куриери (Pigeon Express)',
    alias: '„Уличната Мрежа & Разпределителите на Дребно"',
    jurisdiction: 'Училищни райони, паркове, дискотеки в Сл. бряг и София, фитнес зали, автоматични локъри',
    launderingChannel: 'P2P микро-портфейли (USDT/TRON), Revolut преводи на финансови мулета, наложен платеж през куриерски пратки, кеш в брой',
    launderingEik: '207705342',
    associatedCompanies: [
      { name: '„Пигеон експрес“ ЕООД (Pigeon Express)', eik: '207705342', activity: 'Куриерски канал за спедиция на пратки с вейпове и синтетика (Александър Апостолов / Елена Петлешкова)' },
      { name: 'Мрежа от нерегистрирани Telegram ботове & дроп хъбове', activity: 'Автоматизирани тайници в градска среда (Dead drops)' }
    ],
    streetUnits: [
      { role: 'Улични зареждачи (Несебър / Слънчев бряг)', names: 'Местни пласьори и отговорници по алеите на курорта', operationArea: 'Алеи, плажни барове и паркинги в Сл. бряг' },
      { role: 'Улични пласьори (Поморие / Бургас)', names: 'Криминално проявени лица от кварталите Меден Рудник, Лазур и Поморие', operationArea: 'Квартални сборища и нощни клубове' },
      { role: 'Дропъри и куриери', names: 'Младежки контингент за зареждане на тайници и получаване на пратки', operationArea: 'Паркове, училища и куриерски локъри' },
      { role: 'Финансови мулета', names: 'Подставени лица с банкови карти за теглене на каса', operationArea: 'Банкомати и EasyPay офиси' }
    ],
    legalEvidence: 'Над 1200+ образувани бързи и досъдебни производства годишно по чл. 354а, ал. 3 от НК в Районен съд - Бургас, Районен съд - Несебър и СРС.',
    connectedPoliticians: ['Районни инспектори и патрулно-постова полиция (ежемесечни „отчисления" на ниво районно управление)'],
    osintRedFlag: 'Масово използване на телеграм ботове, куриерски пратки с фалшиви податели и неидентифицирани банкови карти тип „муле".',
    tradeRegisterUrl: 'https://portal.registryagency.bg'
  }
];

export default function InteractiveNarcoticsPyramidPage() {
  const [selectedLevel, setSelectedLevel] = useState<NarcoActor>(PYRAMID_LEVELS[0]);
  const [viewTab, setViewTab] = useState<'PYRAMID' | 'NETWORK_GRAPH'>('PYRAMID');

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* HEADER */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2rem auto', borderBottom: '1px solid #1E293B', paddingBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#F43F5E',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '4px 12px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            🔺 ИНТЕРАКТИВЕН КРИМИНАЛИСТИЧЕН СОФТУЕР (2026)
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.4rem 0' }}>
          Интерактивна Наркопирамида & Мрежова Графа
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Кликнете върху съответното ниво от пирамидата или отворете векторната мрежова графа (Mermaid.js), 
          за да проследите пълната паяжина от зависимости между улицата, фабриките и държавния чадър.
        </p>

        {/* VIEW MODE TOGGLE BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '1.5rem' }}>
          <button
            onClick={() => setViewTab('PYRAMID')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '6px',
              border: viewTab === 'PYRAMID' ? '2px solid #F43F5E' : '1px solid #1E293B',
              backgroundColor: viewTab === 'PYRAMID' ? '#E11D48' : '#0B132B',
              color: viewTab === 'PYRAMID' ? '#FFFFFF' : '#94A3B8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: viewTab === 'PYRAMID' ? '0 4px 14px rgba(225, 29, 72, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            🔺 3D Пирамидален Стек & Досиета
          </button>
          <button
            onClick={() => setViewTab('NETWORK_GRAPH')}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '6px',
              border: viewTab === 'NETWORK_GRAPH' ? '2px solid #38BDF8' : '1px solid #1E293B',
              backgroundColor: viewTab === 'NETWORK_GRAPH' ? '#0F172A' : '#0B132B',
              color: viewTab === 'NETWORK_GRAPH' ? '#38BDF8' : '#94A3B8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: viewTab === 'NETWORK_GRAPH' ? '0 4px 14px rgba(56, 189, 248, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            🕸️ Векторна Мрежова Паяжина (Mermaid.js)
          </button>
        </div>
      </div>

      {/* VIEW 1: 3D PYRAMID STACK & DOSSIER */}
      {viewTab === 'PYRAMID' && (
        <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
          {/* LEFT COLUMN: THE VISUAL PYRAMID STACK */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              🔺 Кликнете върху ниво за досие:
            </span>

            {PYRAMID_LEVELS.map((level) => {
              const isSelected = selectedLevel.id === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level)}
                  style={{
                    width: level.widthPct,
                    minWidth: '240px',
                    background: isSelected ? level.colorGrad : '#0F172A',
                    color: isSelected ? '#FFFFFF' : '#94A3B8',
                    border: isSelected ? '2px solid #FFFFFF' : '1px solid #1E293B',
                    borderRadius: '8px',
                    padding: '1rem 1.2rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    fontWeight: 900,
                    textAlign: 'center',
                    boxShadow: isSelected ? '0 10px 25px rgba(225, 29, 72, 0.4)' : '0 2px 5px rgba(0,0,0,0.2)',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isSelected ? 1 : 0.2
                  }}
                >
                  <div style={{ fontSize: '0.95rem' }}>{level.alias}</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.9, marginTop: '2px', fontWeight: 600 }}>
                    {level.levelTitle.split(':')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: INSTANT DOSSIER VIEWER */}
          <div>
            <div style={{
              backgroundColor: '#0B132B',
              border: '2px solid #F43F5E',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 30px rgba(0,0,0,0.5)',
              animation: 'fadeIn 0.2s ease-in-out'
            }}>
              
              {/* Dossier Header */}
              <div style={{
                padding: '1.5rem',
                background: selectedLevel.colorGrad,
                color: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', backgroundColor: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    {selectedLevel.id}
                  </span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-serif)', margin: '4px 0 0 0' }}>
                    {selectedLevel.alias}
                  </h2>
                  <div style={{ fontSize: '0.78rem', opacity: 0.9, fontStyle: 'italic', fontFamily: 'var(--font-mono)' }}>
                    ({selectedLevel.name})
                  </div>
                </div>

                <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 900, backgroundColor: '#020617', color: '#FBBF24', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {selectedLevel.levelTitle}
                </span>
              </div>

              {/* Dossier Body */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                
                {/* Box 1: Zone & AML */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                    <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', display: 'block' }}>🗺️ Зона на Влияние:</span>
                    <strong style={{ color: '#FFFFFF', fontSize: '0.88rem', display: 'block', marginTop: '2px' }}>{selectedLevel.jurisdiction}</strong>
                  </div>

                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                    <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', display: 'block' }}>🧼 Канал за Пране:</span>
                    <strong style={{ color: '#FBBF24', fontSize: '0.82rem', display: 'block', marginTop: '2px' }}>{selectedLevel.launderingChannel}</strong>
                  </div>
                </div>

                {/* Box 2: OSINT Red Flag */}
                <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '1rem', borderRadius: '6px' }}>
                  <span style={{ color: '#FBBF24', fontWeight: 900, display: 'block', fontSize: '0.74rem' }}>🔍 OSINT ЧЕРВЕН ФЛАГ (ДИГИТАЛНА СЛЕДА):</span>
                  <p style={{ color: '#FDE68A', margin: '4px 0 0 0', lineHeight: '1.5' }}>
                    {selectedLevel.osintRedFlag}
                  </p>
                </div>

                {/* Box 3: Legal Evidence & Umbrellas */}
                <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                  <span style={{ color: '#FB7185', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>⚖️ Доказателствен Акт & Преписки:</span>
                  <p style={{ color: '#CBD5E1', fontStyle: 'italic', margin: '4px 0 8px 0', lineHeight: '1.4' }}>
                    {selectedLevel.legalEvidence}
                  </p>

                  {selectedLevel.associatedCompanies && selectedLevel.associatedCompanies.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#38BDF8', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>🏢 Свързани Фирми & Паравани (ЕИК):</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                        {selectedLevel.associatedCompanies.map((c, i) => (
                          <div key={i} style={{ backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                            <strong style={{ color: '#F8FAFC' }}>{c.name}</strong> {c.eik && <span style={{ color: '#94A3B8' }}>(ЕИК: {c.eik})</span>} — <span style={{ color: '#38BDF8' }}>{c.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedLevel.streetUnits && selectedLevel.streetUnits.length > 0 && (
                    <div style={{ marginBottom: '10px' }}>
                      <span style={{ color: '#F43F5E', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>👥 Улични Звена & Дилърски Структури:</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                        {selectedLevel.streetUnits.map((u, i) => (
                          <div key={i} style={{ backgroundColor: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                            <span style={{ color: '#F43F5E', fontWeight: 700 }}>{u.role}:</span> <span style={{ color: '#F8FAFC' }}>{u.names}</span> <span style={{ color: '#64748B' }}>({u.operationArea})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <span style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', display: 'block' }}>🛡️ Институционален Чадър:</span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {selectedLevel.connectedPoliticians.map((pol, idx) => (
                      <li key={idx} style={{ color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                        {pol}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Link to Commercial Register, Black Book & Secure Whistleblower */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', paddingTop: '10px', borderTop: '1px solid #1E293B' }}>
                  <a
                    href={selectedLevel.tradeRegisterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#38BDF8', textDecoration: 'underline', fontSize: '0.78rem' }}
                  >
                    🔍 Провери фирмите в Търговския регистър ➔
                  </a>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link
                      href="/signals-tracker"
                      style={{
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: 900,
                        fontSize: '0.78rem',
                        textDecoration: 'none',
                        boxShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                      }}
                    >
                      🛡️ Докладвай локален дилър или чадър (Чл. 205 НПК) ➔
                    </Link>

                    <Link
                      href="/persons"
                      style={{
                        backgroundColor: '#0F172A',
                        border: '1px solid #334155',
                        color: '#FFFFFF',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        textDecoration: 'none'
                      }}
                    >
                      👤 Черната Книга ➔
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: VECTOR NETWORK GRAPH (MERMAID.JS) */}
      {viewTab === 'NETWORK_GRAPH' && (
        <div style={{ maxWidth: '1350px', margin: '0 auto', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '2rem', boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1E293B', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-mono)' }}>
                🕸️ Векторна Мрежа на Зависимостите: Наркотрафик, Лаборатории & Чадър
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: '4px 0 0 0' }}>
                Динамична паяжина, показваща реалния път на капиталите, прекурсорите и обратното захранване на властта.
              </p>
            </div>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '3px 8px', borderRadius: '4px' }}>
              MERMAID.JS RENDERED
            </span>
          </div>

          <MermaidGraph chart={NARCOTICS_NETWORK_MERMAID} id="narco-network-graph" />
        </div>
      )}

    </div>
  );
}
