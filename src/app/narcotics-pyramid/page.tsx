'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MermaidGraph } from '@/components/MermaidGraph';

// MERMAID DIAGRAM CODE
const NARCOTICS_NETWORK_MERMAID = `
graph TD
    %% Върховно ниво: Чадър & Власт
    subgraph ВЛАСТ_И_ПРАВОСЪДИЕ ["🔴 НИВО 5: ВЛАСТОВ & СЪДЕБЕН ЧАДЪР"]
        A["👑 Политически Чадър / Магнитски Субекти<br/><b>Висши политически фигури & Контрабандни квоти</b>"]
        B["⚖️ Окръжни Прокурори & Началници на ОДМВР<br/><b>Опънат чадър / Прекратени преписки</b>"]
        A -->|Властови протекции| B
    end

    subgraph ТРАФИК_И_ВНОС ["🔵 НИВО 4: МЕЖДУНАРОДЕН ТРАФИК"]
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
  baseBg: string;
  borderAccent: string;
  badgeColor: string;
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
    colorGrad: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
    baseBg: '#1C1917',
    borderAccent: '#EF4444',
    badgeColor: '#EF4444',
    widthPct: '42%',
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
    colorGrad: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
    baseBg: '#1E1B18',
    borderAccent: '#F97316',
    badgeColor: '#F97316',
    widthPct: '56%',
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
    colorGrad: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
    baseBg: '#1F1D14',
    borderAccent: '#F59E0B',
    badgeColor: '#F59E0B',
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
    colorGrad: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    baseBg: '#0F1E2E',
    borderAccent: '#38BDF8',
    badgeColor: '#38BDF8',
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
    colorGrad: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    baseBg: '#0D231E',
    borderAccent: '#10B981',
    badgeColor: '#10B981',
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', width: '100%', padding: '1rem' }}>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', fontWeight: 800 }}>
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
                    minWidth: '260px',
                    background: isSelected ? level.colorGrad : level.baseBg,
                    color: '#FFFFFF',
                    border: isSelected ? `2px solid #FFFFFF` : `1.5px solid ${level.borderAccent}`,
                    borderRadius: '8px',
                    padding: '1.1rem 1.4rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    textAlign: 'center',
                    boxShadow: isSelected ? `0 0 25px ${level.borderAccent}88, 0 10px 25px rgba(0,0,0,0.6)` : '0 4px 12px rgba(0,0,0,0.4)',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: 1
                  }}
                >
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.01em', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {level.alias}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    marginTop: '4px',
                    fontWeight: 800,
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.6)',
                    color: isSelected ? '#FFFFFF' : level.borderAccent
                  }}>
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
              border: `2px solid ${selectedLevel.borderAccent}`,
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 20px 30px rgba(0,0,0,0.5)',
              position: 'relative'
            }}>
              {/* DOSSIER HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid #1E293B', paddingBottom: '1.2rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{
                    backgroundColor: selectedLevel.badgeColor,
                    color: '#FFFFFF',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    letterSpacing: '0.05em'
                  }}>
                    {selectedLevel.levelTitle.toUpperCase()}
                  </span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '0.5rem 0 0.2rem 0' }}>
                    {selectedLevel.name}
                  </h2>
                  <span style={{ color: '#F43F5E', fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    {selectedLevel.alias}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'var(--font-mono)', display: 'block' }}>ИДЕНТИФИКАТОР:</span>
                  <span style={{ fontSize: '0.85rem', color: '#CBD5E1', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {selectedLevel.id}
                  </span>
                </div>
              </div>

              {/* DOSSIER METRICS & DATA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    📍 Териториален Обхват & Юрисдикция:
                  </span>
                  <div style={{ color: '#F8FAFC', fontSize: '0.9rem', fontWeight: 600 }}>
                    {selectedLevel.jurisdiction}
                  </div>
                </div>

                <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '8px', border: '1px solid #1E293B' }}>
                  <span style={{ fontSize: '0.72rem', color: '#EF4444', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    🚨 Механизъм за Пране на Пари:
                  </span>
                  <div style={{ color: '#CBD5E1', fontSize: '0.88rem', lineHeight: '1.5' }}>
                    {selectedLevel.launderingChannel}
                  </div>
                  {selectedLevel.launderingEik && (
                    <div style={{ marginTop: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#38BDF8' }}>
                      Свързан ЕИК / Буфер: <strong>{selectedLevel.launderingEik}</strong>
                    </div>
                  )}
                </div>

                {/* ASSOCIATED CORPORATE INSTRUMENTS */}
                {selectedLevel.associatedCompanies && selectedLevel.associatedCompanies.length > 0 && (
                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '8px', border: '1px solid #1E293B' }}>
                    <span style={{ fontSize: '0.72rem', color: '#EAB308', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      🏢 Свързани Корпоративни & Охранителни Структури:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedLevel.associatedCompanies.map((comp, idx) => (
                        <div key={idx} style={{ fontSize: '0.82rem', color: '#CBD5E1', borderLeft: '2px solid #EAB308', paddingLeft: '8px' }}>
                          <strong style={{ color: '#FFFFFF' }}>{comp.name}</strong> {comp.eik ? `(ЕИК: ${comp.eik})` : ''} — <em>{comp.activity}</em>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STREET OPERATIONAL UNITS */}
                {selectedLevel.streetUnits && selectedLevel.streetUnits.length > 0 && (
                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '8px', border: '1px solid #1E293B' }}>
                    <span style={{ fontSize: '0.72rem', color: '#10B981', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      👥 Улични Звена & Изпълнители:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedLevel.streetUnits.map((unit, idx) => (
                        <div key={idx} style={{ fontSize: '0.82rem', color: '#CBD5E1', borderLeft: '2px solid #10B981', paddingLeft: '8px' }}>
                          <strong style={{ color: '#FFFFFF' }}>{unit.role}:</strong> {unit.names} ({unit.operationArea})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    ⚖️ Правни & Доказателствени Източници:
                  </span>
                  <div style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: '1.5', fontStyle: 'italic' }}>
                    {selectedLevel.legalEvidence}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    🚩 Констатиран Червен Флаг:
                  </span>
                  <div style={{ color: '#F43F5E', fontSize: '0.85rem', fontWeight: 600 }}>
                    {selectedLevel.osintRedFlag}
                  </div>
                </div>
              </div>

              {/* ACTION LINKS */}
              <div style={{ marginTop: '2rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a
                  href={selectedLevel.tradeRegisterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    padding: '0.65rem 1.2rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                  }}
                >
                  ПРОВЕРИ В ТЪРГОВСКИЯ РЕГИСТЪР ➔
                </a>

                <Link
                  href="/flow-visualizer"
                  style={{
                    backgroundColor: '#1E293B',
                    color: '#38BDF8',
                    padding: '0.65rem 1.2rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none',
                    border: '1px solid #334155'
                  }}
                >
                  ОТВОРИ В ИНТЕРАКТИВНАТА ВЕКТОРНА КАРТА ➔
                </Link>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: FULL VECTOR MERMAID NETWORK GRAPH */}
      {viewTab === 'NETWORK_GRAPH' && (
        <div style={{ maxWidth: '1350px', margin: '0 auto', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 20px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1E293B', paddingBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
              🕸️ ВЕКТОРНА СХЕМА НА ЗАВИСИМОСТИТЕ И ВНОСА (MERMAID.JS)
            </span>
            <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              * Кликнете върху произволен възел за интерактивен одит
            </span>
          </div>

          <MermaidGraph
            chart={NARCOTICS_NETWORK_MERMAID}
            id="narcotics-pyramid-graph"
            allowExport={true}
          />
        </div>
      )}

    </div>
  );
}
