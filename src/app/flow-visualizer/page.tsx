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
    id: 'FLOW-MASTER-FULL-PYRAMID',
    title: 'ПЪЛНА ВЕРТИКАЛНА ПИРАМИДА: От Върховната Власт до Уличния Дилър',
    category: 'Национална Държавно-Престъпна Йерархия',
    amountBgn: '16 400 000 000 лв.',
    amountEur: '8 385 000 000 €',
    primaryBeneficiaries: [
      'Върховна Власт: Пеевски, Борисов, Доган',
      'Съдебен & Силов Чадър: Сарафов, Гешев, Пепи Еврото, Нотариуса, Началници на ОДМВР/РУ',
      'Международни Босове & Логистика: Таки, Брендо, Къро (покойник), Евролаб 2011',
      'Регионални Лейтенанти & Силови Монополи: Митьо Очите, Христо Широков, Радо Ланеца, Митко Каратиста',
      'Квартални Отговорници, Складови Депа & Куриери: Pigeon Express, Telegram Ботове, Заложни къщи',
      'Улични Дилъри, Училищни Дропъри & Изпълнители: Тестови пласьори по нощни клубове, фитнеси и градинки'
    ],
    bufferCompanies: [
      { name: '„Автомагистрали" ЕАД / ДКК', eik: '831610486', role: 'Държавен инхаус инструмент' },
      { name: '„Аркус - Сигурност Бургас" ЕООД', eik: '102859341', role: 'Охранителна шапка на курортния рекет' },
      { name: '„Евролаб 2011" / „Интерфорум"', eik: '201847192', role: 'Фитосанитарна лаборатория на Капитан Андреево' },
      { name: '„Пигеон експрес" ЕООД', eik: '207559114', role: 'Куриерски разнос и прекурсори' }
    ],
    cashWithdrawalPoints: [
      'Интернешънъл Асет Банк АД – 420 млн. лв. в чували и сакове',
      'Каси на чейндж бюра, казина и лизингови къщи в Слънчев бряг, София, Пловдив и Варна',
      'Криптомати, USDT транзакции и Telegram ботове за кеш'
    ],
    offshoreDestinations: ['Дубай (ОАЕ) - #DubaiUnlocked', 'Кипър', 'Панама', 'Белиз', 'Испания (Барселона)'],
    legalAuditEvidence: 'Доклади на Сметната палата, ДАНС, ГДБОП, Специализирания наказателен съд, DEA и разследвания на АКФ и Bird.bg.',
    status: 'Кръстосано Трасиране: Чл. 41 от Конституцията'
  },
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
      { name: '„Пътища Пловдив" АД', eik: '115015842', role: 'Инхаус контрагент с авансово преведени стотици милиони' }
    ],
    cashWithdrawalPoints: [
      'Интернешънъл Асет Банк АД (Клон София) – 420 млн. лв. изтеглени в сакове и чували от малоимотни лица'
    ],
    offshoreDestinations: ['Обединени арабски емирства (Дубай)', 'Кипър (Никозия)'],
    legalAuditEvidence: 'Одитен доклад № 0300100421 на Сметната палата на РБ.',
    status: 'Потвърдено с Одитен Акт & Досъдебно Производство'
  },
  {
    id: 'FLOW-NARCO-003',
    title: 'Черноморски Наркокоридор, Прекурсори & Пране през Туризъм',
    category: 'Трансгранична Престъпност & Синдикати',
    amountBgn: '850 000 000 лв. годишно',
    amountEur: '434 000 000 €',
    primaryBeneficiaries: ['Христофорос Аманатидис (Таки)', 'Евелин Банев (Брендо)', 'Димитър Желязков (Очите)', 'Полицейски чадър в МВР'],
    bufferCompanies: [
      { name: '„Аркус - Сигурност Бургас" ЕООД', eik: '102859341', role: 'Охранителен монопол и уличен рекет' },
      { name: '„Евролаб 2011" ЕООД', eik: '201847192', role: 'Контрол на фитосанитарния и товарен поток' }
    ],
    cashWithdrawalPoints: ['Каси на чейндж бюра в Слънчев бряг, Несебър и София'],
    offshoreDestinations: ['Дубай (ОАЕ) – Недвижими имоти (#DubaiUnlocked)'],
    legalAuditEvidence: 'Присъди на Специализирания наказателен съд срещу групата на Митьо Очите.',
    status: 'Активно Трасирано по Чл. 41 КРБ'
  }
];

export default function FlowVisualizer() {
  const [activeTab, setActiveTab] = useState<'pyramid' | 'hemus' | 'narcotics'>('pyramid');
  const [selectedChannel, setSelectedChannel] = useState<CorruptionChannel>(FLOW_CHANNELS[0]);

  // 🌟 ПЪЛНА ЙЕРАРХИЯ: ОТ ВЪРХОВНИЯ ЧАДЪР ДО УЛИЧНИЯ ДИЛЪР
  const fullPyramidChart = `
graph TD
    %% ==========================================
    %% НИВО 1: ВЪРХОВНА ПОЛИТИЧЕСКА ВЛАСТ & ОЛИГАРХИЯ
    %% ==========================================
    PEEVSKI["👑 Делян Славчев Пеевски<br/><b>ДПС-Ново Начало / Магнитски / Контрол на институции</b>"]
    BORISOV["👑 Бойко Методиев Борисов<br/><b>Лидер на ГЕРБ / Банкя / Инхаус разпореждания</b>"]
    DOGAN["👑 Ахмед Демир Доган<br/><b>Почетен председател / Сараи Росенец / ТЕЦ Варна</b>"]

    %% ==========================================
    %% НИВО 2: СЪДЕБЕН, ПРОКУРОРСКИ & СИЛОВ ЧАДЪР
    %% ==========================================
    SARAFOV["⚖️ Борислав Сарафов (И.ф. Главен прокурор)<br/><b>Контрол на преписките / Осемте Джуджета</b>"]
    GESHEV["⚖️ Иван Гешев (Бивш Главен прокурор)<br/><b>Чадър КТБ / Спецпрокуратура</b>"]
    EUROTO["🕵️‍♂️ Петьо Петров - Пепи Еврото<br/><b>Ресторант Осемте Джуджета / Търговия с дела</b>"]
    NOTARIUSA["🕵️‍♂️ Мартин Божанов - Нотариуса<br/><b>Клуб SS Club / Изнудване на магистрати</b>"]
    POLICE_TOP["👮 Висши Началници в МВР, ГДБОП & ОДМВР<br/><b>Опъване на чадър и спиране на акции</b>"]

    %% ==========================================
    %% НИВО 3: МЕСТНИ ФЕОДАЛИ & КМЕТОВЕ
    %% ==========================================
    NIKOLOV["⚓ Димитър Николов (Кмет Бургас)<br/><b>Концесии Росенец / 480 Млн. лв. дефицит</b>"]
    ALEKSIEV["🌊 Иван Алексиев (Кмет Поморие)<br/><b>ВиК и строителни монополи</b>"]
    NESSEBAR_KMET["🏖️ Николай Димитров (Кмет Несебър)<br/><b>Слънчев бряг / Арестуван за търговия с вот</b>"]
    REIZI["⛵ Панайот Рейзи & Георги Лапчев<br/><b>Созопол & Царево / Застрояване на дюни и къмпинги</b>"]

    %% ==========================================
    %% НИВО 4: МЕЖДУНАРОДНИ НАРКОБОСОВЕ & ХЪБОВЕ
    %% ==========================================
    TAKI["📦 Христофорос Аманатидис - Таки<br/><b>Синдикат София-Дубай / Контейнерен трафик</b>"]
    BRENDO["🚢 Евелин Банев - Брендо<br/><b>Кокаинов крал / Черноморски транзит</b>"]
    EUROLAB["⚗️ Евролаб 2011 & Размиг Чакърян - Ами<br/><b>ГКПП Капитан Андреево / Прекурсори</b>"]

    %% ==========================================
    %% НИВО 5: РЕГИОНАЛНИ ЛЕЙТЕНАНТИ & СИЛОВИ ШЕФОВЕ
    %% ==========================================
    EYES["🟡 Димитър Желязков - Митьо Очите<br/><b>Аркус Сигурност / Южно Черноморие</b>"]
    SHIROKOV["🟡 Христо Широков - Широката (Поморие)<br/><b>Поморийски силов отговорник</b>"]
    LANETSA["🟡 Радо Ланеца & Весо Паяка (София)<br/><b>Разпределител на наркопазара в София</b>"]
    KARATISTA["🟡 Митко Каратиста & Охранителни дружества<br/><b>Силови превземания на обекти</b>"]
    LOCAL_RU["👮 Районни Началници на РУ-МВР (Поморие, Несебър, Сливница)<br/><b>Предупреждаване преди проверки</b>"]

    %% ==========================================
    %% НИВО 6: КВАРТАЛНИ ОТГОВОРНИЦИ & СКЛАДОВИ ДЕПА
    %% ==========================================
    DEPOT_BURGAS["📦 Складови Бази Меден Рудник & Славейков<br/><b>Обезпечаване на зарежданията по морето</b>"]
    DEPOT_SUNNY["📦 Депа Слънчев бряг & Равда<br/><b>Сезонни складове за кокаин и амфетамини</b>"]
    DEPOT_SOFIA["📦 Депа Люлин, Надежда & Студентски Град<br/><b>Складове за синтетика, пико и марихуана</b>"]
    PIGEON_CORP["🚚 Pigeon Express & Куриерски Локъри<br/><b>Логистична мрежа за анонимни пратки</b>"]
    TELEGRAM_ADMIN["📱 Telegram Канали & Администратори на ботове<br/><b>Координация на мъртви тайници (Drop shipping)</b>"]

    %% ==========================================
    %% НИВО 7: УЛИЧНИ ДИЛЪРИ, ПЛАСЬОРИ & ДРОПЪРИ
    %% ==========================================
    CLUB_DEALERS["💊 Дилъри в Нощни Клубове & Дискотеки<br/><b>Слънчев бряг, Созопол, София-Център</b>"]
    STREET_DROPPERS["🏃 Дропъри на Мъртви Тайници (Градинки & Входове)<br/><b>Оставяне на дози по GPS координати</b>"]
    GYM_DEALERS["🏋️ Зареждачи във Фитнес Зали & Заложни Къщи<br/><b>Пласмент на анаболи, кокаин и бързи кредити</b>"]
    SCHOOL_RUNNERS["🎒 Училищни Пласьори & Непълнолетни Куриери<br/><b>Продажба на вейпове с HHC, трева и синтетичен чай</b>"]

    %% ==========================================
    %% НИВО 8: ОФШОРНИ ХЪБОВЕ & ФИНАНСОВО ПРАНЕ
    %% ==========================================
    DUBAI["🏝️ Дубай Сметки & #DubaiUnlocked<br/><b>Покупка на лукс имоти с наркокеш</b>"]
    ASSET_BANK["💰 Интернешънъл Асет Банк & Каси<br/><b>420 Млн. лв. изтеглени в чували</b>"]

    %% ──────────────── НАВЪРЗВАНЕ НА ПОТОЦИТЕ И ЙЕРАРХИЯТА ────────────────
    
    %% Върховна власт -> Прокуратура & МВР
    PEEVSKI -->|Политическо кадруване и чадър| SARAFOV
    PEEVSKI -->|Влияние в ресторанта| EUROTO
    BORISOV -->|Чадър над структурите| GESHEV
    SARAFOV -->|Спиране на проверки срещу| EUROTO
    EUROTO -->|Търговия с обвинения и рекет| NOTARIUSA
    NOTARIUSA -->|Корумпиране на следователи и съдии| POLICE_TOP

    %% МВР -> Регионални кметове и гранични пунктове
    POLICE_TOP -->|Чадър на ГКПП Капитан Андреево| EUROLAB
    EUROLAB -->|Внос на прекурсори и контрол| TAKI
    TAKI -->|Трансконтинентален внос| BRENDO
    BRENDO -->|Морски контейнери Бургас/Варна| TAKI

    %% Политика -> Кметове
    BORISOV -->|Партиен комфорт и поръчки| NIKOLOV
    PEEVSKI -->|Общински концесии и зависимости| NESSEBAR_KMET
    NIKOLOV -->|Крайбрежен строителен монопол| ALEKSIEV
    ALEKSIEV -->|Разпределяне на терени| NESSEBAR_KMET
    NESSEBAR_KMET -->|Плажни барове и паркинги| REIZI

    %% Босове -> Регионални Лейтенанти
    TAKI -->|Захранване на Софийския пазар| LANETSA
    TAKI -->|Захранване на Черноморието| EYES
    EYES -->|Охранителен контрол Поморие| SHIROKOV
    PEEVSKI -->|Силови бригади за натиск| KARATISTA

    %% Лейтенанти -> Чадър в местните РУ-МВР
    EYES -->|Месечни такси „спокойствие"| LOCAL_RU
    SHIROKOV -->|Отказ от образуване на преписки| LOCAL_RU
    LOCAL_RU -.->|Изтичане на оперативна информация| EYES

    %% Лейтенанти -> Складови Депа & Логистика
    EYES -->|Зареждане на депата на юг| DEPOT_BURGAS
    EYES -->|Зареждане на курортния сезон| DEPOT_SUNNY
    LANETSA -->|Зареждане на столичните квартали| DEPOT_SOFIA
    TAKI -->|Куриерски пратки на едро| PIGEON_CORP
    PIGEON_CORP -->|Логистика към Telegram администратори| TELEGRAM_ADMIN

    %% Депа -> Улична дистрибуция
    DEPOT_SUNNY -->|Зареждане на ВИП зони и клубове| CLUB_DEALERS
    DEPOT_SOFIA -->|Зареждане на нощните заведения| CLUB_DEALERS
    TELEGRAM_ADMIN -->|Разпределяне на задачи с координати| STREET_DROPPERS
    DEPOT_BURGAS -->|Пласмент през лихвари и тренировъчни зали| GYM_DEALERS
    DEPOT_SOFIA -->|Мрежа около учебни заведения| SCHOOL_RUNNERS

    %% Обратен финансов поток (КЕШ -> ПРАНЕ -> ВЪРХОВЕН ЧАДЪР)
    CLUB_DEALERS -->|Кеш от оборот| DEPOT_SUNNY
    STREET_DROPPERS -->|Крипто и пари на ръка| TELEGRAM_ADMIN
    GYM_DEALERS -->|Черни лихварски вноски| EYES
    SCHOOL_RUNNERS -->|Джобни пари от ученици| DEPOT_SOFIA

    DEPOT_SUNNY -->|Милиони на седмица| EYES
    DEPOT_SOFIA -->|Отчитане на столичния дял| LANETSA
    EYES -->|Легализация през казина и охрана| ASSET_BANK
    LANETSA -->|Кеш в сакове| ASSET_BANK

    ASSET_BANK -->|Пране през офшорни фирми| DUBAI
    DUBAI -.->|Черни каси за изборни гласове| BORISOV
    DUBAI -.->|Финансиране на медии и политически чадър| PEEVSKI
`;

  const hemusChart = `
graph TD
    A["🏛️ Бойко Борисов / АПИ<br/><b>Министерски Съвет</b>"] -->|1.18 МЛРД. лв. Аванси| B["🏢 Държавна фирма: Автомагистрали ЕАД<br/><b>ЕИК: 831610486</b>"]
    B -->|680 МЛН. лв. Инхаус договори| C["📑 Водно строителство Благоевград & Пътища Пловдив<br/><b>Частни консорциуми-буфери</b>"]
    C -->|420 МЛН. лв. Тегления в брой| D["💰 Сакове с Кеш на Каса<br/><b>Интернешънъл Асет Банк (Клон София)</b>"]
    C -->|450 МЛН. лв. Преводи| E["🏝️ Офшорни Сметки и Имоти в Дубай<br/><b>#DubaiUnlocked луксозни активи</b>"]
    E -.->|Черни каси и подкупи| A
`;

  const narcoticsChart = `
graph TD
    A["🏛️ Делян Пеевски & Политически Чадър<br/><b>Висши протекции в МВР и Митници</b>"] -->|Оперативно прикритие| B["👮 Шефове на РУ-МВР и Гранични Пунктове<br/><b>Спиране на проверки по чл. 354а НК</b>"]
    B -->|Транзитен коридор| C["🚢 Евелин Банев - Брендо & Христофорос Аманатидис - Таки<br/><b>Контейнерен трафик Варна и Бургас</b>"]
    C -->|Захранване с прекурсори| D["🏢 Евролаб 2011 & Капитан Андреево<br/><b>Частен лабораторен контрол</b>"]
    D -->|Регионално зареждане| E["🟡 Димитър Желязков - Митьо Очите<br/><b>Аркус Сигурност / Слънчев бряг</b>"]
    E -->|Куриерски пратки & Улица| F["🚚 Pigeon Express & Улични Дропъри<br/><b>Разнос през куриерски локъри и Telegram</b>"]
    F -->|850 Млн. лв. годишен оборот| G["💰 Пране на пари през Лизинги, Казина и Дубай<br/><b>Офшорни сметки ОАЕ</b>"]
    G -.->|Финансиране на чадъра и избори| A
`;

  const getActiveChart = () => {
    switch (activeTab) {
      case 'pyramid': return fullPyramidChart;
      case 'hemus': return hemusChart;
      case 'narcotics': return narcoticsChart;
      default: return fullPyramidChart;
    }
  };

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* INSTITUTIONAL TOP BAR */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2.5rem auto', backgroundColor: '#0B132B', border: '1px solid #1E293B', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.2rem', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '46px', height: '46px', backgroundColor: '#020617', border: '2px solid #DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#EF4444', borderRadius: '8px', fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>
              🦁
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.3rem', fontFamily: 'var(--font-serif)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                VERITAS // ВЕРТИКАЛНА КАРТОТЕКА: ОТ ПОЛИТИЧЕСКИЯ ВРЪХ ДО УЛИЧНИЯ ДИЛЪР
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ПЪЛНА СТРУКТУРА: ВЛАСТ ➔ ПРОКУРАТУРА ➔ КМЕТОВЕ ➔ БОСОВЕ ➔ ЛЕЙТЕНАНТИ ➔ ДЕПА ➔ УЛИЧНИ ПЛАСЬОРИ ➔ ДУБАЙ
              </div>
            </div>
          </div>

          {/* Action Controls: Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('pyramid'); setSelectedChannel(FLOW_CHANNELS[0]); }}
              style={{
                backgroundColor: activeTab === 'pyramid' ? '#DC2626' : '#070D1E',
                color: activeTab === 'pyramid' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'pyramid' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                boxShadow: activeTab === 'pyramid' ? '0 0 15px rgba(220, 38, 38, 0.4)' : 'none'
              }}
            >
              🔺 ПЪЛНА ВЕРТИКАЛНА ПИРАМИДА (8 НИВА)
            </button>
            <button
              onClick={() => { setActiveTab('hemus'); setSelectedChannel(FLOW_CHANNELS[1]); }}
              style={{
                backgroundColor: activeTab === 'hemus' ? '#DC2626' : '#070D1E',
                color: activeTab === 'hemus' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'hemus' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              🛣️ АМ „ХЕМУС" (1.18 МЛРД.)
            </button>
            <button
              onClick={() => { setActiveTab('narcotics'); setSelectedChannel(FLOW_CHANNELS[2]); }}
              style={{
                backgroundColor: activeTab === 'narcotics' ? '#DC2626' : '#070D1E',
                color: activeTab === 'narcotics' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'narcotics' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              🚢 НАРКОКОРИДОРИ (850 МЛН.)
            </button>
          </div>
        </div>

        {/* Financial Header Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', paddingTop: '10px', borderTop: '1px solid #1E293B', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem' }}>АКТИВЕН КАНАЛ:</span>
            <strong style={{ color: '#F8FAFC' }}>{selectedChannel.title}</strong>
          </div>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem' }}>ОБЩ ОБЕМ НА ПОТОКА:</span>
            <strong style={{ color: '#EF4444', fontSize: '1.05rem', fontWeight: 900 }}>{selectedChannel.amountBgn}</strong>
          </div>
          <div>
            <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem' }}>ДОКАЗАТЕЛСТВЕН СТАТУТ:</span>
            <strong style={{ color: '#10B981' }}>{selectedChannel.status}</strong>
          </div>
        </div>

      </div>

      {/* MAIN VISUALIZATION STAGE */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* MERMAID VECTOR FLOW GRAPH */}
        <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1E293B', paddingBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#38BDF8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              🕸️ ИНТЕРАКТИВНА ВЕКТОРНА ГРАФА НА ПЪЛНАТА ЙЕРАРХИЯ (MERMAID.JS)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              * Ползвайте бутоните за приближаване (+, -) и кликнете на произволен възел за Chart.js анализ
            </span>
          </div>

          <MermaidGraph chart={getActiveChart()} id={`flow-graph-${activeTab}`} allowExport={true} />
        </div>

        {/* EVIDENCE ACCORDION & BENEFICIARIES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Col 1: Primary Beneficiaries */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              👑 Върховна Власт & Регионални Синдикати
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedChannel.primaryBeneficiaries.map((b, idx) => (
                <div key={idx} style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', color: '#F1F5F9', fontFamily: 'var(--font-mono)' }}>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Buffer Companies */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#EAB308', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              🏢 Фирми-Буфери & Охранителни Шапки
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedChannel.bufferCompanies.map((c, idx) => (
                <div key={idx} style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '10px', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ color: '#FFFFFF', fontWeight: 800 }}>{c.name}</div>
                  <div style={{ color: '#64748B', fontSize: '0.68rem', marginTop: '2px' }}>ЕИК: {c.eik} • {c.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Cash & Offshores */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#38BDF8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              💸 Каси за Кеш & Офшорни Дестинации
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedChannel.cashWithdrawalPoints.map((p, idx) => (
                <div key={idx} style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '10px', borderRadius: '6px', fontSize: '0.78rem', color: '#FCA5A5', fontFamily: 'var(--font-mono)' }}>
                  💵 {p}
                </div>
              ))}
              {selectedChannel.offshoreDestinations.map((d, idx) => (
                <div key={idx} style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '8px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#93C5FD', fontFamily: 'var(--font-mono)' }}>
                  🏝️ Офшор: {d}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
