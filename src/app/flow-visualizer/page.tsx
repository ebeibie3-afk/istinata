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
    id: 'FLOW-MASTER-OMNI',
    title: 'МАСТЪР КАРТОТЕКА: Пълната Мрежа на Власт, Олигархия, Съд & Трафик',
    category: 'Национална Държавна Завладяност',
    amountBgn: '14 850 000 000 лв.',
    amountEur: '7 590 000 000 €',
    primaryBeneficiaries: [
      'Делян Пеевски (Ново Начало / КТБ / Булгартабак)',
      'Бойко Борисов (ГЕРБ / АМ Хемус / Барселонагейт)',
      'Ахмед Доган (ТЕЦ Варна / Росенец / ДПС)',
      'Иван Гешев & Борислав Сарафов (Прокуратура)',
      'Петьо Петров - Еврото (Осемте Джуджета)',
      'Мартин Божанов - Нотариуса (SS Club)',
      'Христофорос Аманатидис - Таки & Евелин Банев - Брендо (Наркокоридори)',
      'Димитър Николов, Николай Димитров, Иван Алексиев (Черноморски Феодали)'
    ],
    bufferCompanies: [
      { name: '„Автомагистрали" ЕАД / ДКК ЕАД', eik: '831610486', role: 'Държавни шапки за източване на инхаус милиарди' },
      { name: '„Водно строителство Благоевград" / „Пътища Пловдив"', eik: '101016622', role: 'Строителни буфери за кешови аванси' },
      { name: '„Евролаб 2011" / „Интерфорум"', eik: '201847192', role: 'Частен монопол на ГКПП Капитан Андреево' },
      { name: '„Аркус - Сигурност Бургас" ЕООД', eik: '102859341', role: 'Силови структури и наркоразпределение' }
    ],
    cashWithdrawalPoints: [
      'Интернешънъл Асет Банк АД – 420 млн. лв. изтеглени в сакове и чували',
      'Българска банка за развитие (ББР) – 946 млн. лв. раздадени на 8 фирми',
      'Каси в Слънчев бряг, Несебър, Златни пясъци и Дубай'
    ],
    offshoreDestinations: ['Дубай (ОАЕ) - #DubaiUnlocked', 'Кипър (Лимасол)', 'Панама', 'Белиз', 'Бахами'],
    legalAuditEvidence: 'Доклади на Сметната палата № 0300100421, № 010020322; Доклади на АДФИ; Разследвания на Mossos d\'Esquadra, EPPO, АКФ и Bird.bg.',
    status: 'Кръстосана Верификация: Чл. 41 от Конституцията'
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
      { name: '„Пътища Пловдив" АД', eik: '115015842', role: 'Инхаус контрагент с авансово преведени стотици милиони' },
      { name: '„Бул строй инвест" ЕООД / Буфери сламки', eik: '204918274', role: 'Кухи дружества за теглене на кеш от банкови клонове' }
    ],
    cashWithdrawalPoints: [
      'Интернешънъл Асет Банк АД (Клон София) – 420 млн. лв. изтеглени в сакове и чували от малоимотни лица',
      'Клон на търговска банка на бул. „България" – ежедневни тегления по 1-2 млн. лв.'
    ],
    offshoreDestinations: ['Обединени арабски емирства (Дубай)', 'Кипър (Никозия)', 'Британски вирджински острови (BVI)'],
    legalAuditEvidence: 'Одитен доклад № 0300100421 на Сметната палата на РБ; Доклади на ДНСК за незаконно строителство без разрешения; Разследвания на ГДБОП и МВР.',
    status: 'Потвърдено с Одитен Акт & Досъдебно Производство'
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
  const [activeTab, setActiveTab] = useState<'master' | 'hemus' | 'barcelona' | 'narcotics'>('master');
  const [selectedChannel, setSelectedChannel] = useState<CorruptionChannel>(FLOW_CHANNELS[0]);

  // 🌟 ОГРОМНА МАСТЪР ДИАГРАМА С ВСИЧКИ РЕАЛНИ ИМЕНА И ВРЪЗКИ В ДЪРЖАВАТА
  const masterNetworkChart = `
graph TD
    %% ВЪРХОВНА ПОЛИТИЧЕСКА & ОЛИГАРХИЧНА ВЛАСТ
    PEEVSKI["👑 Делян Славчев Пеевски<br/><b>ДПС-Ново Начало / Магнитски / Булгартабак</b>"]
    BORISOV["👑 Бойко Методиев Борисов<br/><b>Лидер на ГЕРБ / Банкя / АМ Хемус</b>"]
    DOGAN["👑 Ахмед Демир Доган<br/><b>Почетен председател / Сараи Росенец / ТЕЦ Варна</b>"]

    %% МАГИСТРАТСКИ & СЪДЕБЕН ЧАДЪР
    GESHEV["⚖️ Иван Стоименов Гешев<br/><b>Бивш Главен прокурор / Чадър КТБ</b>"]
    SARAFOV["⚖️ Борислав Боби Сарафов<br/><b>И.ф. Главен прокурор / Осемте Джуджета</b>"]
    EUROTO["🕵️‍♂️ Петьо Петров - Пепи Еврото<br/><b>Ресторант Осемте Джуджета / Изземване на бизнеси</b>"]
    NOTARIUSA["🕵️‍♂️ Мартин Божанов - Нотариуса<br/><b>Клуб SS Club / Търговия с дела и влияние</b>"]
    USHEV["⚖️ Георги Ушев & Спецсъд<br/><b>Репресивен съдебен апарат</b>"]
    RUSINOVA["⚖️ Емилия Русинова<br/><b>СГП / Кадрови чадър</b>"]

    %% ДЪРЖАВНИ ИНХАУС КАСИ & ФИНАНСОВИ ИНСТРУМЕНТИ
    BBR["🏦 Българска Банка за Развитие (ББР)<br/><b>946 Млн. лв. кредитна концентрация</b>"]
    AUTO_EAD["🏗️ Автомагистрали ЕАД & ДКК<br/><b>1.18 Млрд. лв. инхаус аванси за Хемус и язовири</b>"]
    ASSET_BANK["💰 Интернешънъл Асет Банк<br/><b>420 Млн. лв. изтеглени в сакове и чували</b>"]

    %% СТРОИТЕЛНИ БУФЕРИ & КОРПОРАТИВНИ ОЛИГАРСИ
    VODNO["🏢 Водно строителство Благоевград & Пътища Пловдив<br/><b>Инхаус строителни фаворити</b>"]
    GPOV["🏢 Вълка (Румен Гайтански)<br/><b>150 Млн. лв. необезпечен кредит от ББР</b>"]

    %% КМЕТОВЕ & ЧЕРНОМОРСКИ ФЕОДАЛИ
    NIKOLOV["⚓ Димитър Николов<br/><b>Кмет на Бургас / Росенец / 480 Млн. лв. дефицит</b>"]
    ALEKSIEV["🌊 Иван Алексиев<br/><b>Кмет на Поморие / ВиК монополи</b>"]
    NESSEBAR_KMET["🏖️ Николай Димитров<br/><b>Кмет на Несебър / Слънчев бряг / Арестуван</b>"]
    REIZI["⛵ Панайот Рейзи & Созопол<br/><b>Къмпинги Градина и Смокиня</b>"]
    LAPCHEV["🌲 Георги Лапчев & Царево<br/><b>Застрояване на дерета / Потоп 2023</b>"]
    DIMOV["🦁 Георги Димов & Божурище<br/><b>80 дка продадени терени</b>"]

    %% НАРКОСИНДИКАТИ, ПРЕКУРСОРИ & ГКПП
    TAKI["📦 Христофорос Аманатидис - Таки<br/><b>Контейнерен внос / Синдикат София-Дубай</b>"]
    BRENDO["🚢 Евелин Банев - Брендо<br/><b>Кокаинов крал / Черноморски транзит</b>"]
    EUROLAB["⚗️ Евролаб 2011 & Капитан Андреево<br/><b>Частна граница / Контрол на прекурсори</b>"]
    EYES["🟡 Димитър Желязков - Митьо Очите<br/><b>Аркус Сигурност / Южно Черноморие</b>"]
    PIGEON["🚚 Pigeon Express & Логистика<br/><b>Уличен разнос и куриерски локъри</b>"]

    %% ОФШОРНИ ДЕСТИНАЦИИ & КРАЙНИ СМЕТКИ
    DUBAI["🏝️ Дубай & ОАЕ Сметки<br/><b>#DubaiUnlocked луксозни имоти и авоари</b>"]
    BARCELONA["🏰 Вила Барселонагейт (Ema BGS)<br/><b>Гава Мар & Бутик Ermanno Scervino</b>"]

    %% ──────────────── ВРЪЗКИ И ФИНАНСОВИ ПОТОЦИ ────────────────
    PEEVSKI -->|Контрол и влияния в Прокуратурата| SARAFOV
    PEEVSKI -->|Влияние в ресторанта| EUROTO
    PEEVSKI -->|Кредити от ББР към фаворити| BBR
    BBR -->|150 Млн. лв. непокрит кредит| GPOV

    BORISOV -->|Разпореждане на МС за инхаус пари| AUTO_EAD
    BORISOV -->|Офшорни преводи за лукс вила| BARCELONA
    AUTO_EAD -->|680 Млн. лв. превъзлагане| VODNO
    VODNO -->|420 Млн. лв. тегления на каса| ASSET_BANK
    ASSET_BANK -->|Кеш в чували и сакове| DUBAI

    DOGAN -->|Парк Росенец и пристанище| NIKOLOV
    NIKOLOV -->|Общински чадър и поръчки| PEEVSKI

    GESHEV -->|Опънат чадър над Осемте Джуджета| EUROTO
    SARAFOV -->|Срещи и съгласуване на преписки| EUROTO
    NOTARIUSA -->|Търговия с дела и съдии| USHEV
    NOTARIUSA -->|Влияние и клуб SS Club| RUSINOVA

    TAKI -->|Контрол на лаборатории и трафик| EUROLAB
    BRENDO -->|Морски контейнерен внос| TAKI
    EUROLAB -->|Фитосанитарен чадър на границата| PEEVSKI
    TAKI -->|Зареждане на Южното Черноморие| EYES
    EYES -->|Курортен рекет и охранителен монопол| NESSEBAR_KMET
    EYES -->|Разнос на синтетика и пратки| PIGEON
    PIGEON -->|Пране на пари от оборот| DUBAI

    NIKOLOV -->|Крайбрежен монопол| ALEKSIEV
    ALEKSIEV -->|Застрояване на залива| NESSEBAR_KMET
    NESSEBAR_KMET -->|Фасадни търгове| REIZI
    REIZI -->|Горски и плажни зони| LAPCHEV
    LAPCHEV -->|Офшорни капитали| DUBAI
    DIMOV -->|София-Запад логистичен пояс| TAKI

    %% ОБРАТНА ВРЪЗКА: ФИНАНСИРАНЕ НА ПОЛИТИЧЕСКИЯ ЧАДЪР
    DUBAI -.->|Черни каси за избори и чадър| BORISOV
    DUBAI -.->|Финансиране на медии и зависимости| PEEVSKI
`;

  const hemusChart = `
graph TD
    A["🏛️ Бойко Борисов / АПИ<br/><b>Министерски Съвет</b>"] -->|1.18 МЛРД. лв. Аванси| B["🏢 Държавна фирма: Автомагистрали ЕАД<br/><b>ЕИК: 831610486</b>"]
    B -->|680 МЛН. лв. Инхаус договори| C["📑 Водно строителство Благоевград & Пътища Пловдив<br/><b>Частни консорциуми-буфери</b>"]
    C -->|420 МЛН. лв. Тегления в брой| D["💰 Сакове с Кеш на Каса<br/><b>Интернешънъл Асет Банк (Клон София)</b>"]
    C -->|450 МЛН. лв. Преводи| E["🏝️ Офшорни Сметки и Имоти в Дубай<br/><b>#DubaiUnlocked луксозни активи</b>"]
    E -.->|Черни каси и подкупи| A
`;

  const barcelonaChart = `
graph TD
    A["🏛️ Бойко Борисов<br/><b>Министър-председател</b>"] -->|Политическо влияние и чадър| B["🏖️ Спортни имоти Приморско & Свързани лица<br/><b>12 Млн. лв. държавни и офшорни пари</b>"]
    B -->|2.2 Млн. Евро Банкови преводи| C["🏢 Ema BGS S.L. & Борислава Йовчева<br/><b>Фирма-буфер за вилата в Гава Мар</b>"]
    C -->|Придобиване на магазин| D["🛍️ Бутик Ermanno Scervino (Барселона)<br/><b>2.3 Млн. Евро Инвестиция</b>"]
    B -->|3 Млн. Евро Покупка на имот| E["🏰 Луксозна Къща в Барселона (Гава Мар)<br/><b>3 000 000 Евро покупна цена</b>"]
    E -.->|Ползване и прикриване| A
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
      case 'master': return masterNetworkChart;
      case 'hemus': return hemusChart;
      case 'barcelona': return barcelonaChart;
      case 'narcotics': return narcoticsChart;
      default: return masterNetworkChart;
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
                VERITAS // МАСТЪР КАРТОТЕКА НА ПАРИЧНИТЕ ПОТОЦИ & ЗАВЛАДЯНАТА ДЪРЖАВА
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ПЪЛНА СЕТЕВА ГРАФА С ВСИЧКИ ИМЕНА: ВЛАСТ, ОЛИГАРХИЯ, СЪДИИ, ПРОКУРОРИ, КМЕТОВЕ И СИНДИКАТИ
              </div>
            </div>
          </div>

          {/* Action Controls: Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('master'); setSelectedChannel(FLOW_CHANNELS[0]); }}
              style={{
                backgroundColor: activeTab === 'master' ? '#DC2626' : '#070D1E',
                color: activeTab === 'master' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'master' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                boxShadow: activeTab === 'master' ? '0 0 15px rgba(220, 38, 38, 0.4)' : 'none'
              }}
            >
              🕸️ ОБЩА МАСТЪР МРЕЖА (ВСИЧКИ ИМЕНА)
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
              onClick={() => { setActiveTab('barcelona'); setSelectedChannel(FLOW_CHANNELS[2]); }}
              style={{
                backgroundColor: activeTab === 'barcelona' ? '#DC2626' : '#070D1E',
                color: activeTab === 'barcelona' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'barcelona' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              🏰 БАРСЕЛОНАГЕЙТ
            </button>
            <button
              onClick={() => { setActiveTab('narcotics'); setSelectedChannel(FLOW_CHANNELS[3]); }}
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
              🕸️ ИНТЕРАКТИВНА ВЕКТОРНА ГРАФА НА ПОТОКА (MERMAID.JS)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              * Използвайте бутоните за зуум и кликнете върху произволен възел за пълен Chart.js анализ
            </span>
          </div>

          <MermaidGraph chart={getActiveChart()} id={`flow-graph-${activeTab}`} allowExport={true} />
        </div>

        {/* EVIDENCE ACCORDION & BENEFICIARIES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Col 1: Primary Beneficiaries */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              👑 Основни Бенефициенти & Политически Чадър
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
              🏢 Фирми-Буфери & Изпълнители
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
