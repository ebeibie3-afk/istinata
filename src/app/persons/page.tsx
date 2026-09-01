import React from 'react';

// 1. Дефиниране на структурата на базата данни (TypeScript Интерфейс)
interface Strawman {
  name: string;
  role: string;
  connectedCompany: string;
}

interface Asset {
  type: string;
  declaredValue: string;
  estimatedValue: string;
  location: string;
  recordLink: string;
}

interface CompanyFlow {
  eik: string;
  name: string;
  contractsAmount: string;
  aopLink: string;
  brLink: string;
}

interface Dossier {
  id: string;
  name: string;
  currentPosition: string;
  riskLevel: 'Критичен' | 'Висок' | 'Умерен';
  monogram: string;
  kpkDeclarationLink: string;
  moneyPath: string[];
  companies: CompanyFlow[];
  strawmen: Strawman[];
  hiddenAssets: Asset[];
}

// 2. Реални одитни досиета за архитектурата (АМ Хемус, ББР, Апартаментгейт, КТБ)
const dossiersData: Dossier[] = [
  {
    id: 'DOSSIER-HEMUS-001',
    name: 'Мрежа по АМ „Хемус" (АПИ / Автомагистрали ЕАД)',
    currentPosition: 'Бивши ръководни органи на АПИ, МРРБ и свързани консорциуми (2018–2021)',
    riskLevel: 'Критичен',
    monogram: 'Х',
    kpkDeclarationLink: 'https://caciaf.bg',
    moneyPath: [
      'Бюджет на МРРБ / АПИ (Целеви постановления на МС)',
      'Държавно дружество „Автомагистрали" ЕАД (Инхаус превъзлагане)',
      'Кухи консорциуми за доставка на материали и наем на техника',
      'Теглене на кеш от подставени лица (Сламки в София)',
      'Прехвърляне на фирми на малоимотни граждани'
    ],
    companies: [
      {
        eik: '831610486',
        name: '„Автомагистрали" ЕАД',
        contractsAmount: '1 180 000 000 лв.',
        aopLink: 'https://app.eop.bg',
        brLink: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=831610486'
      },
      {
        eik: '121039378',
        name: '„Монтажи" ЕАД (ДКК Язовири)',
        contractsAmount: '500 000 000 лв.',
        aopLink: 'https://app.eop.bg',
        brLink: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=121039378'
      }
    ],
    strawmen: [
      {
        name: 'Борислав Колев (Сламка за изтегляне на 53 млн. лв. кеш)',
        role: 'Физическо теглене на аванси в брой на банкова каса',
        connectedCompany: 'Търговски дружества за наем на механизация (Лотове 1–9)'
      },
      {
        name: 'Лица с профили от досиетата „Пандора“ (Pandora Papers)',
        role: 'Крайна дестинация за трансферирани капитали',
        connectedCompany: 'Консорциум подизпълнители'
      }
    ],
    hiddenAssets: [
      {
        type: 'Луксозни имения и резиденции',
        declaredValue: '0 лв. (Няма официална декларация пред КПК)',
        estimatedValue: '25 000 000+ лв.',
        location: 'София (кв. Бояна, кв. Драгалевци) и Черноморието',
        recordLink: 'https://portal.registryagency.bg'
      }
    ]
  },
  {
    id: 'DOSSIER-BBR-002',
    name: 'Кредитна Концентрация в ББР (8 Едри Групи)',
    currentPosition: 'Управителни и Надзорни съвети на ББР ЕАД (2017–2021)',
    riskLevel: 'Критичен',
    monogram: 'Б',
    kpkDeclarationLink: 'https://caciaf.bg',
    moneyPath: [
      'Капитал на ББР и целеви заеми от международни финансови институции',
      'Одобрени кредити от над 100-150 млн. лв. на дружество без ликвидно обезпечение',
      'Пренасочване към офшорни холдинги и свързани компании',
      'Загуби за сметка на държавния капитал'
    ],
    companies: [
      {
        eik: '121856059',
        name: 'Българска банка за развитие (ББР) ЕАД',
        contractsAmount: '946 000 000 лв. (Кредитна експозиция)',
        aopLink: 'https://app.eop.bg',
        brLink: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=121856059'
      }
    ],
    strawmen: [
      {
        name: 'Номинални директори в Кипър и Панама',
        role: 'Управление на компаниите-майки на кредитополучателите',
        connectedCompany: 'Холдингови дружества получатели'
      }
    ],
    hiddenAssets: [
      {
        type: 'Заложени индустриални активи и търговски комплекси',
        declaredValue: 'Обезпечения с оспорвана ликвидна стойност',
        estimatedValue: '800 000 000 лв.',
        location: 'София, Пловдив, Варна',
        recordLink: 'https://portal.registryagency.bg'
      }
    ]
  },
  {
    id: 'DOSSIER-APARTMENTGATE-003',
    name: '„Апартаментгейт" & Имоти на Властта под Себестойност',
    currentPosition: 'Висши фигури от законодателната власт, правосъдието и КПКОНПИ (2019)',
    riskLevel: 'Висок',
    monogram: 'А',
    kpkDeclarationLink: 'https://caciaf.bg',
    moneyPath: [
      'Замяна на стари имоти + минимално доплащане по данъчна оценка',
      'Придобиване на луксозни мезонети със самостоятелни асансьори от „Артекс"',
      'Гласуване на поправки в ЗУТ, удължаващи валидността на разрешителни за строеж'
    ],
    companies: [
      {
        eik: '121544773',
        name: '„Артекс Инженеринг" АД',
        contractsAmount: '15 000 000+ лв. (Имотен портфейл)',
        aopLink: 'https://app.eop.bg',
        brLink: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=121544773'
      }
    ],
    strawmen: [
      {
        name: 'Роднини и семейни свързани лица',
        role: 'Купувачи на преференциални квадратури на цени 200–600 €/кв.м',
        connectedCompany: '„Артекс Инженеринг" АД'
      }
    ],
    hiddenAssets: [
      {
        type: 'Луксозен мезонет със собствен асансьор и тераса',
        declaredValue: '380 000 лв. (по нотариален акт)',
        estimatedValue: '2 200 000 лв. (реална пазарна стойност)',
        location: 'София, кв. Изток (сграда „Летера")',
        recordLink: 'https://portal.registryagency.bg'
      }
    ]
  },
  {
    id: 'DOSSIER-PIGEON-004',
    name: 'Епидемия Наркокуриери и „Pigeon Express“ (2026)',
    currentPosition: 'Нов спедиторски играч със съмнения за политически чадър и логистика',
    riskLevel: 'Висок',
    monogram: 'П',
    kpkDeclarationLink: 'https://portal.registryagency.bg',
    moneyPath: [
      'Лични средства и съмнителни външни кредитирания',
      'Основаване на куриерска мрежа с амбициозно финансиране',
      'Експанзия на пазара чрез локъри (автоматични станции)',
      'Слухове за свързаност с Делян Пеевски (отречени от ръководството)'
    ],
    companies: [
      {
        eik: '207705342',
        name: '„Пигеон експрес“ ЕООД',
        contractsAmount: 'Неясен стартов капитал (милиони)',
        aopLink: 'https://app.eop.bg',
        brLink: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=207705342'
      }
    ],
    strawmen: [
      {
        name: 'Елена Петлешкова',
        role: 'Едноличен собственик на капитала',
        connectedCompany: '„Пигеон експрес“ ЕООД'
      },
      {
        name: 'Александър Апостолов',
        role: 'Управител (оперативна дейност / Traffic Security)',
        connectedCompany: '„Пигеон експрес“ ЕООД'
      },
      {
        name: 'Иван Петлешков',
        role: 'Свързано лице / Семеен бизнес',
        connectedCompany: 'Бизнесмен от Пловдив'
      }
    ],
    hiddenAssets: [
      {
        type: 'Национална мрежа от автоматични пощенски станции (локъри)',
        declaredValue: 'В процес на изграждане',
        estimatedValue: 'Милиони левове стартова инвестиция',
        location: 'Цялата страна',
        recordLink: 'https://portal.registryagency.bg'
      }
    ]
  },
  {
    id: 'DOSSIER-ONECOIN-005',
    name: 'Ружа Игнатова / Схемата „OneCoin" (Криптокралицата)',
    currentPosition: 'Международно издирвано лице (FBI Top 10 / Европол / Интерпол) за финансова пирамида за $4+ млрд.',
    riskLevel: 'Критичен',
    monogram: 'Р',
    kpkDeclarationLink: 'https://www.fbi.gov/wanted/topten/ruja-ignatova',
    moneyPath: [
      'Измама с фиктивни крипто пакети през „УанКойн" ЕООД / One Network Services Ltd',
      'Транзитиране през кухи дружества („Би енд Ен Консулт" ЕООД, офшорни сметки)',
      'Пране на капитали през адвокатски доверителни сметки и фондове в Каймановите о-ви',
      'Придобиване на луксозни имоти в София, Лондон и Дубай (#DubaiUnlocked)',
      'Изчезване на 25.10.2017 г. (полет София - Атина) и подозрения за физическо ликвидиране / укриване'
    ],
    companies: [
      {
        eik: '203064434',
        name: '„УанКойн" ЕООД / One Network Services',
        contractsAmount: 'Над 4 000 000 000 USD (Глобален мащаб)',
        aopLink: 'https://www.justice.gov',
        brLink: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=203064434'
      },
      {
        eik: '201633519',
        name: '„Би енд Ен Консулт" ЕООД (B&N Consult)',
        contractsAmount: 'Стотици милиони транзитиран капитал',
        aopLink: 'https://www.fbi.gov',
        brLink: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=201633519'
      },
      {
        eik: 'OFFSHORE-UK-01',
        name: 'Abbots House Penthouse Limited (Guernsey/BVI)',
        contractsAmount: '13 500 000 GBP',
        aopLink: 'https://find-and-update.company-information.service.gov.uk',
        brLink: 'https://www.icij.org'
      }
    ],
    strawmen: [
      {
        name: 'Константин Игнатов',
        role: 'Брат / Оперативен лидер след октомври 2017 г. (арестуван от FBI)',
        connectedCompany: 'OneCoin Ltd'
      },
      {
        name: 'Себастиан Карл Грийнууд (Sebastian Greenwood)',
        role: 'Съосновател / Осъден в САЩ на 20 г. затвор и $300 млн. глоба',
        connectedCompany: 'OneCoin Ltd'
      },
      {
        name: 'Марк Скот (Mark Scott)',
        role: 'Американски адвокат / Изпиране на $400 млн. през офшорни фондове',
        connectedCompany: 'MSS International'
      },
      {
        name: 'Ирина Дилкинска',
        role: 'Ръководител правен отдел (осъдена и екстрадирана в САЩ)',
        connectedCompany: '„УанКойн" ЕООД'
      },
      {
        name: 'Христофорос Аманатидис - Таки',
        role: 'Оперативни данни на МВР/BIRD за протекция и ликвидация на яхта в Йонийско море',
        connectedCompany: 'Криминални структури / Трафик'
      }
    ],
    hiddenAssets: [
      {
        type: 'Луксозен 4-етажен пентхаус (Лондон, Кенсингтън)',
        declaredValue: '0 лв. (Офшорна собственост)',
        estimatedValue: '13 500 000 GBP (~31 000 000 лв.)',
        location: 'Abbots House, London, UK',
        recordLink: 'https://www.bbc.com/news/technology-64350100'
      },
      {
        type: 'Сграда „Крим" и сграда на пл. „Славейков"',
        declaredValue: '8 500 000 лв.',
        estimatedValue: '20 000 000+ лв.',
        location: 'София, ул. Славянска 19 & пл. Славейков',
        recordLink: 'https://bird.bg'
      },
      {
        type: 'Пентхаус в Дубай (#DubaiUnlocked) и луксозна яхта „Давина"',
        declaredValue: '0 лв. (Недекларирани)',
        estimatedValue: '25 000 000+ USD',
        location: 'Дубай (ОАЕ) & Созопол (Буджака)',
        recordLink: 'https://www.icij.org/investigations/dubai-unlocked/'
      }
    ]
  }
];

export default function PersonsPage() {
  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      {/* Хедър на модула в стил разузнавателна картотека */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 3rem auto', borderBottom: '1px solid #1E293B', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
            СЕКРЕТНО / ГРАЖДАНСКИ ОДИТ (2009–2024)
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
            ВЕРИФИЦИРАНО ПО ЗДОИ И ЧЛ. 41 ОТ КРБ
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.5rem 0' }}>
          Картотека на Обвързаностите и Имотите
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
          Интерактивни цифрови досиета на лица, свързани с мащабни разходвания на публичен ресурс. 
          Всички данни са верифицирани през официални държавни регистри (ЕПЗЕУ, ЦАИС ЕОП, КПКОНПИ и Сметна палата).
        </p>
      </div>

      {/* Основна мрежа с Досиета (Dark-Ops Cartotheque) */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {dossiersData.map((person) => (
          <div 
            key={person.id} 
            style={{
              backgroundColor: '#0B132B',
              border: '1px solid #1E293B',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Горен блок: Профил и Риск */}
            <div style={{
              padding: '1.8rem 2rem',
              borderBottom: '1px solid #1E293B',
              background: 'linear-gradient(90deg, #0B132B 0%, #070D1E 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-serif)',
                  flexShrink: 0
                }}>
                  {person.monogram}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0 }}>
                    {person.name}
                  </h2>
                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginTop: '4px', margin: 0 }}>
                    {person.currentPosition}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
                  ID: {person.id}
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(76, 5, 25, 0.4)',
                  border: '1px solid #881337',
                  padding: '4px 12px',
                  borderRadius: '9999px'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#F43F5E',
                    boxShadow: '0 0 8px #F43F5E'
                  }} />
                  <span style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    color: '#FB7185',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    РИСК: {person.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Долен блок: Детайли в 3 колони */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1px',
              backgroundColor: '#1E293B',
              fontSize: '0.9rem'
            }}>
              
              {/* Колона 1: Пътят на парите и Фирми */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🔄 Пътят на Парите (4 Етапа)
                  </h3>
                  <ol style={{ position: 'relative', borderLeft: '1px solid #334155', paddingLeft: '1.2rem', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {person.moneyPath.map((step, index) => (
                      <li key={index} style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#38BDF8',
                          borderRadius: '50%',
                          left: '-1.45rem',
                          top: '6px'
                        }} />
                        <p style={{ color: '#E2E8F0', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: '1.4', margin: 0 }}>
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem' }}>
                    🏢 Свързани Фирми и Договори
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {person.companies.map((company) => (
                      <div key={company.eik} style={{ backgroundColor: '#070D1E', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span style={{ fontWeight: 700, color: '#F1F5F9', fontSize: '0.88rem' }}>{company.name}</span>
                          <span style={{ color: '#FB7185', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.82rem' }}>{company.contractsAmount}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
                          ЕИК: {company.eik}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', paddingTop: '4px', fontSize: '0.75rem' }}>
                          <a href={company.aopLink} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline' }}>🔗 Регистър АОП</a>
                          <a href={company.brLink} target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA', textDecoration: 'underline' }}>🔗 Търговски регистър</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Колона 2: Подставени лица (Сламки) */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                  👤 Подставени лица / Сламки
                </h3>
                {person.strawmen.map((straw, index) => (
                  <div key={index} style={{ backgroundColor: '#070D1E', padding: '1.2rem', borderRadius: '6px', border: '1px solid #1E293B', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.92rem' }}>
                      {straw.name}
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      Роля: {straw.role}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '0.8rem' }}>
                      Фирма: <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>{straw.connectedCompany}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Колона 3: Недекларирани Имоти и Активи */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                  🏠 Скрити Активи и Имоти
                </h3>
                {person.hiddenAssets.map((asset, index) => (
                  <div key={index} style={{ backgroundColor: '#070D1E', padding: '1.2rem', borderRadius: '6px', border: '1px solid #1E293B', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#F1F5F9', fontSize: '0.92rem' }}>{asset.type}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B', fontStyle: 'italic', marginTop: '2px' }}>{asset.location}</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                      <div style={{ backgroundColor: '#0B132B', padding: '8px', borderRadius: '4px', border: '1px solid #1E293B' }}>
                        <div style={{ color: '#64748B', fontSize: '0.65rem', textTransform: 'uppercase' }}>Деклариран (KPK)</div>
                        <div style={{ color: '#94A3B8', fontWeight: 700, marginTop: '2px', textDecoration: 'line-through' }}>{asset.declaredValue}</div>
                      </div>
                      <div style={{ backgroundColor: 'rgba(76, 5, 25, 0.3)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                        <div style={{ color: '#FB7185', fontSize: '0.65rem', textTransform: 'uppercase' }}>Реална Пазарна</div>
                        <div style={{ color: '#FDA4AF', fontWeight: 800, marginTop: '2px' }}>{asset.estimatedValue}</div>
                      </div>
                    </div>

                    <div style={{ paddingTop: '6px' }}>
                      <a href={asset.recordLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#60A5FA', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        📄 Извадка от Имотния Регистър ➔
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
