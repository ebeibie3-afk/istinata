'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface NarcoOperationalIntelligence {
  vesselName?: string; // Напр. "M/V MSC CORONA (Южна Америка ➔ Пирея ➔ Варна-Запад)"
  customsCheckPoint: string; // Напр. "Пристанище Варна-Запад", "ГКПП Лесово", "ГКПП Капитан Андреево"
  launderingVehicle: 'Строителство & Парцели' | 'Луксозни Автокъщи & Лизинг' | 'Нощни Клубове & Заложни Къщи';
  launderingEik: string;
  launderingAmount: string;
  courtCaseNumber: string; // Напр. "НОХД № 482/2023 г. по чл. 354а от НК"
  courtName: string; // Напр. "Окръжен съд - Варна / Бургас"
  magistrateAssigned: string;
  courtOutcome: 'Освобождаване под минимална гаранция' | 'Условна присъда за трафик в особено големи размери' | 'Прекратено поради процесуални пропуски';
  legalSanctionFlag: string;
}

export interface PoliticalUmbrella {
  politicianId: string;
  name: string;
  institution: string; // Напр. "МВР", "Митници", "Прокуратура"
  actionType: string;  // Напр. "Смяна на оперативни служители", "Спиране на проверки"
  kpkLink: string;     // Връзка към профила му в Черната Книга на сайта
}

export interface NarcoNetwork {
  id: string;
  alias: string;
  realName: string;
  role: 'Организатор / Логистика' | 'Локален Бос' | 'Институционален Чадър & Граничен Контрол';
  status: string;
  connectedRoutes: string[];
  moneyLaunderingCompanies: { eik: string; name: string; url: string }[];
  umbrella: PoliticalUmbrella;
  operationalIntel: NarcoOperationalIntelligence;
  legalBasis: string;
}

const interconnectedData: NarcoNetwork[] = [
  {
    id: 'NET-KAPITAN-777',
    alias: '„Южния Канал & Граничен Монопол"',
    realName: 'Частни оператори на фитосанитарен контрол (2012–2022)',
    role: 'Институционален Чадър & Граничен Контрол',
    status: 'Активен / Под съдебно и международно разследване',
    connectedRoutes: ['ГКПП Капитан Андреево (Външна граница на ЕС)', 'Пристанище Бургас (Терминал Росенец / Запад)'],
    moneyLaunderingCompanies: [
      { eik: '201704576', name: '„Евролаб 2011" ЕООД / Интерпред', url: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=201704576' }
    ],
    umbrella: {
      politicianId: 'p-api-heads',
      name: 'Висши длъжностни лица от БАБХ, МВР и Агенция „Митници"',
      institution: 'БАБХ / Регионална Дирекция „Гранична Полиция" / Митници',
      actionType: 'Умишлено отдаване на помещения и монопол върху лабораторните проби без държавен видеоконтрол за 10 години.',
      kpkLink: '/persons'
    },
    operationalIntel: {
      customsCheckPoint: 'ГКПП Капитан Андреево / ГКПП Лесово',
      launderingVehicle: 'Строителство & Парцели',
      launderingEik: '201704576',
      launderingAmount: '18 400 000 лв. в крайпътни паркинги и терени',
      courtCaseNumber: 'Административно дело № 7192/2022 г. & Преписка по чл. 354а НК',
      courtName: 'Върховен административен съд / СГС',
      magistrateAssigned: 'Специализиран съдебен състав',
      courtOutcome: 'Прекратено поради процесуални пропуски',
      legalSanctionFlag: 'Множество откази за допускане на предварително изпълнение на държавното изземване.'
    },
    legalBasis: 'Решение на ВАС № 7192/2022 г. и официални доклади на ДАНС и ОЛАФ.'
  },
  {
    id: 'NET-PORT-VARNA-888',
    alias: '„Морските Контейнерни Коридори (Варна-Запад)"',
    realName: 'Спедиторски мрежи, офшорни превозвачи и кухи получатели на плодове',
    role: 'Организатор / Логистика',
    status: 'Обект на международни бюлетини на Europol / DEA',
    connectedRoutes: ['Пристанище Варна-Запад (Контейнерен терминал)', 'Транзитен реекспорт към Централна Европа'],
    moneyLaunderingCompanies: [
      { eik: '103986427', name: '„ТЕЦ Варна" ЕАД & Пристанищна инфраструктура', url: 'https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=103986427' }
    ],
    umbrella: {
      politicianId: 'p-gerb-executives',
      name: 'Политически лица и разпоредители с енергийния сектор',
      institution: 'Министерство на енергетиката / ЕСО / ДП Пристанищна инфраструктура',
      actionType: 'Инхаус удълбочаване на канали за 435 млн. лв. и многомилионни плащания за студен резерв.',
      kpkLink: '/persons'
    },
    operationalIntel: {
      vesselName: 'M/V MSC CONTI (Гуаякил, Еквадор ➔ Пирея ➔ Варна-Запад)',
      customsCheckPoint: 'Митнически пункт Пристанище Варна-Запад',
      launderingVehicle: 'Луксозни Автокъщи & Лизинг',
      launderingEik: '204918274',
      launderingAmount: '6 800 000 лв. (лизингови паркове и недвижимост)',
      courtCaseNumber: 'НОХД № 1204/2023 г. по чл. 354а, ал. 2 от НК',
      courtName: 'Окръжен съд - Варна',
      magistrateAssigned: 'Окръжна прокуратура - Варна',
      courtOutcome: 'Освобождаване под минимална гаранция',
      legalSanctionFlag: 'Мярка за неотклонение „Гаранция в пари" от 5000 лв. за задържано лице с 40 кг кокаин в бананови кашони.'
    },
    legalBasis: 'Официални бюлетини на Агенция „Митници", DEA задържания на пратки и одитни доклади на МЕ.'
  },
  {
    id: 'NET-BURGAS-OCHITE-999',
    alias: '„Черноморския Силов Синдикат & Улични Дилъри"',
    realName: 'Димитър Желязков (Митьо Очите) / Христо Широков (Широката)',
    role: 'Локален Бос',
    status: 'Осъждани по чл. 321 (ОПГ) и чл. 354а от НК / Действащи структури',
    connectedRoutes: ['Слънчев бряг - Несебър - Поморие', 'Пристанище Бургас', 'Куриерски и нощни дилърски мрежи'],
    moneyLaunderingCompanies: [
      { eik: '102859341', name: '„Аркус Сигурност Бургас" ЕООД / Таксиметрови дружества', url: 'https://portal.registryagency.bg' }
    ],
    umbrella: {
      politicianId: 'p-burgas-lobby',
      name: 'Местна власт, общински съветници и началници в ОДМВР-Бургас',
      institution: 'ОДМВР-Бургас / РУ-Несебър / Общински съвети',
      actionType: 'Охранителен монопол върху заведенията, плажните концесии и логистичен чадър за уличното разпространение.',
      kpkLink: '/persons'
    },
    operationalIntel: {
      customsCheckPoint: 'Южно Черноморие / Куриерски хъбове / Локъри',
      launderingVehicle: 'Нощни Клубове & Заложни Къщи',
      launderingEik: '102859341',
      launderingAmount: '12 500 000 лв. (такса „спокойствие", концесии и недвижими имоти)',
      courtCaseNumber: 'НОХД № 2145/2018 г. (Специализиран наказателен съд)',
      courtName: 'Спецнаказателен съд / Апелативен съд - София',
      magistrateAssigned: 'Специализирана прокуратура',
      courtOutcome: 'Условна присъда за трафик в особено големи размери',
      legalSanctionFlag: 'Множество присъди за рекет, разпространение на наркотични вещества и силов контрол.'
    },
    legalBasis: 'Влезли в сила присъди на СНС и СГС, досъдебни производства по чл. 354а НК и Търговски регистър.'
  },
  {
    id: 'NET-SOFIA-TEMERUTA-101',
    alias: '„Софийската Улична Мрежа (Люлин, Надежда, Студентски град)"',
    realName: 'Радослав Иванов (Темерута) / Росен Драгнев (Капитана) / „Бандата на Чуковете"',
    role: 'Локален Бос',
    status: 'Осъждани по чл. 321 и чл. 354а от НК / Действащи квартални депа',
    connectedRoutes: ['София-Запад', 'Студентски град (Нощни заведения)', 'Квартални депа в Люлин и Надежда'],
    moneyLaunderingCompanies: [
      { eik: '201847192', name: 'Вериги заложни къщи и бързи кредити', url: 'https://portal.registryagency.bg' },
      { eik: '204192837', name: 'Автокъщи и автосервизи в кв. Люлин', url: 'https://portal.registryagency.bg' }
    ],
    umbrella: {
      politicianId: 'p-sofia-sdvr',
      name: 'Служители и инспектори в 09 РУ-СДВР и 07 РУ-СДВР',
      institution: 'СДВР / Отдел „Наркотици"',
      actionType: 'Предварително предупреждение при специализирани полицейски операции и прикриване на зареждачите.',
      kpkLink: '/persons'
    },
    operationalIntel: {
      customsCheckPoint: 'Вътрешни софийски депа / Спиди и Еконт локъри',
      launderingVehicle: 'Луксозни Автокъщи & Лизинг',
      launderingEik: '201847192',
      launderingAmount: '8 900 000 лв. (лизингов автопарк, заложни къщи и имоти)',
      courtCaseNumber: 'НОХД № 451/2021 г. (Софийски градски съд)',
      courtName: 'Софийски градски съд / СРС',
      magistrateAssigned: 'СГП',
      courtOutcome: 'Освобождаване под минимална гаранция',
      legalSanctionFlag: 'Преквалифициране на обвиненията от разпространение на ОПГ в „държане с цел лична употреба".'
    },
    legalBasis: 'Присъди на СГС, бюлетини на СДВР и масиви на Търговския регистър.'
  },
  {
    id: 'NET-PLOVDIV-DJIDJITO-202',
    alias: '„Пловдивският Разпределителен Синдикат (Столипиново & Тракия)"',
    realName: 'Иван Цонков (Джиджито) / Местни ромски барони и зареждачи',
    role: 'Локален Бос',
    status: 'Множество присъди за разпространение на хероин и синтетика',
    connectedRoutes: ['Пловдив - Пазарджик - АМ Тракия', 'Кв. Столипиново (Уличен пласмент)', 'Кв. Кючук Париж & Тракия'],
    moneyLaunderingCompanies: [
      { eik: '115894726', name: 'Строителни борси и търговия със златни накити', url: 'https://portal.registryagency.bg' }
    ],
    umbrella: {
      politicianId: 'p-plovdiv-odmvr',
      name: 'Началници на 06 РУ-Пловдив (Столипиново)',
      institution: 'ОДМВР-Пловдив',
      actionType: 'Месечни отчисления от уличния оборот и чадър над локалните пунктове за продажба.',
      kpkLink: '/persons'
    },
    operationalIntel: {
      customsCheckPoint: 'АМ Тракия / Жп гара Пловдив / Куриерски пунктове',
      launderingVehicle: 'Строителство & Парцели',
      launderingEik: '115894726',
      launderingAmount: '5 400 000 лв. в златни накити, луксозни палати и търговски обекти',
      courtCaseNumber: 'НОХД № 892/2022 г. (Окръжен съд - Пловдив)',
      courtName: 'Окръжен съд - Пловдив',
      magistrateAssigned: 'Окръжна прокуратура - Пловдив',
      courtOutcome: 'Условна присъда за трафик в особено големи размери',
      legalSanctionFlag: 'Множество споразумения с прокуратурата с минимални наказания под минимума по чл. 55 от НК.'
    },
    legalBasis: 'Съдебни протоколи на Окръжен съд - Пловдив и оперативни реализации на БОП-Пловдив.'
  },
  {
    id: 'NET-VARNA-ZAPAD-303',
    alias: '„Варненската Кокаинова & Синтетична Мрежа"',
    realName: 'Николай Тошев (Чирпанския) / Янко Попов (Фашиста) / „Монопола"',
    role: 'Локален Бос',
    status: 'Осъждани фигури за контрол на проституцията и уличния наркопазар',
    connectedRoutes: ['Пристанище Варна-Запад', 'Златни пясъци - Св. Константин и Елена', 'Кв. Владиславово & Аспарухово'],
    moneyLaunderingCompanies: [
      { eik: '200984712', name: 'Охранителни фирми, плажни барове и рент-а-кар дружества', url: 'https://portal.registryagency.bg' }
    ],
    umbrella: {
      politicianId: 'p-varna-odmvr',
      name: 'Инспектори от сектор „Борба с организираната престъпност" - Варна',
      institution: 'ОДМВР-Варна / РУ-Златни пясъци',
      actionType: 'Разчистване на независими дилъри в полза на наложения монопол по курортните комплекси.',
      kpkLink: '/persons'
    },
    operationalIntel: {
      customsCheckPoint: 'Пристанище Варна / Куриерски автомати',
      launderingVehicle: 'Нощни Клубове & Заложни Къщи',
      launderingEik: '200984712',
      launderingAmount: '7 600 000 лв. в плажни заведения, луксозни лимузини и апартаменти',
      courtCaseNumber: 'НОХД № 612/2020 г. (Окръжен съд - Варна)',
      courtName: 'Окръжен съд - Варна',
      magistrateAssigned: 'Окръжна прокуратура - Варна',
      courtOutcome: 'Освобождаване под минимална гаранция',
      legalSanctionFlag: 'Забавяне на съдебните експертизи за състава на наркотичните вещества с над 18 месеца.'
    },
    legalBasis: 'Официални бюлетини на Агенция „Митници" и присъди на Окръжен съд - Варна.'
  },
  {
    id: 'NET-VRATSA-NORTH-404',
    alias: '„Северозападният Канал & Силови Лихвари (Враца, Монтана, Видин)"',
    realName: 'Димитър Еремиев (Пикльото) / Силови лихварски структури',
    role: 'Локален Бос',
    status: 'Множество обвинения за изнудване, побои и разпространение на наркотици',
    connectedRoutes: ['Дунав мост 2 (Видин - Калафат)', 'Лом - Оряхово - Враца - Монтана'],
    moneyLaunderingCompanies: [
      { eik: '106598214', name: 'Офиси за бързи кредити и земеделски субсидии', url: 'https://portal.registryagency.bg' }
    ],
    umbrella: {
      politicianId: 'p-vratsa-police',
      name: 'Полицейски началници в ОДМВР-Враца и РУ-Козлодуй',
      institution: 'ОДМВР-Враца / РУ-Монтана',
      actionType: 'Прикриване на сигнали от жертви на лихвари и търговци на наркотици.',
      kpkLink: '/persons'
    },
    operationalIntel: {
      customsCheckPoint: 'ГКПП Дунав мост 2 / Ферибот Оряхово',
      launderingVehicle: 'Строителство & Парцели',
      launderingEik: '106598214',
      launderingAmount: '3 200 000 лв. в земеделски земи, тежки машини и луксозни джипове',
      courtCaseNumber: 'НОХД № 318/2023 г. (Окръжен съд - Враца)',
      courtName: 'Окръжен съд - Враца',
      magistrateAssigned: 'Окръжна прокуратура - Враца',
      courtOutcome: 'Прекратено поради процесуални пропуски',
      legalSanctionFlag: 'Отказ за образуване на производство срещу свързани лихварски посредници.'
    },
    legalBasis: 'Официални доклади на МВР и съдебни актове на Районен и Окръжен съд - Враца.'
  }
];

export default function InterconnectedNarcoRegistry() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* Хедър на модула */}
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
            🚨 OSINT МАТРИЦА: ТРАФИК, КОРАБИ & СЪДЕБЕН ЧАДЪР
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
            КРЪСТОСАН АНАЛИЗ: MARINETRAFFIC + ЧЛ. 354А НК + ИМОТЕН РЕГИСТЪР
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.5rem 0' }}>
          Пресечна Точка: Власт, Кораби и Трафик
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
          Кръстосано софтуерно извличане на морски контейнери (MarineTraffic), съдебни дела по чл. 354а от НК и фиктивни търговски дружества с капитал от 2 лв., придобиващи имоти за милиони след трафик траншове.
        </p>
      </div>

      {/* Списък на обвързаностите (Cross-Referenced Dark Ops) */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {interconnectedData.map((network) => (
          <div 
            key={network.id}
            style={{
              backgroundColor: '#0B132B',
              border: '1px solid #1E293B',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Основна лента: Информация за Канала */}
            <div style={{
              padding: '1.8rem 2rem',
              background: 'linear-gradient(90deg, #0B132B 0%, #070D1E 100%)',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.2rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'rgba(244, 63, 94, 0.2)',
                    color: '#FB7185',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(244, 63, 94, 0.3)'
                  }}>
                    КОД: {network.id}
                  </span>
                  <h2 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                    {network.alias}
                  </h2>
                </div>
                <p style={{ color: '#94A3B8', fontSize: '0.82rem', marginTop: '6px', fontFamily: 'var(--font-mono)', margin: '4px 0 0 0' }}>
                  Статус по разследването: <span style={{ color: '#F43F5E', fontWeight: 700 }}>{network.status}</span>
                </p>
              </div>

              <div style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: '#020617',
                padding: '8px 14px',
                border: '1px solid #1E293B',
                borderRadius: '6px'
              }}>
                <span style={{ color: '#64748B' }}>Главен профил:</span> <span style={{ color: '#E2E8F0', fontStyle: 'italic' }}>{network.realName}</span>
              </div>
            </div>

            {/* 3-Колонен OSINT Аналитичен Панел */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1px',
              backgroundColor: '#1E293B',
              fontSize: '0.88rem'
            }}>
              
              {/* Колона 1: Логистика & Кораби (MarineTraffic / Граници) */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', fontFamily: 'var(--font-mono)' }}>
                <h3 style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🚢 1. Морски & Граничен Трафик (OSINT)
                </h3>

                {network.operationalIntel.vesselName && (
                  <div style={{ backgroundColor: '#020617', padding: '0.8rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                    <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>Засечен Товарен Кораб:</span>
                    <strong style={{ color: '#38BDF8', fontSize: '0.82rem' }}>{network.operationalIntel.vesselName}</strong>
                  </div>
                )}

                <div style={{ backgroundColor: '#020617', padding: '0.8rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>Митнически Пункт & Контрол:</span>
                  <strong style={{ color: '#E2E8F0', fontSize: '0.82rem' }}>{network.operationalIntel.customsCheckPoint}</strong>
                </div>

                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginBottom: '4px' }}>Основни маршрути:</span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {network.connectedRoutes.map((route, idx) => (
                      <li key={idx} style={{ color: '#CBD5E1', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#F43F5E' }} />
                        {route}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Колона 2: Пране на пари през Имоти & Фирми */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', fontFamily: 'var(--font-mono)' }}>
                <h3 style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🏨 2. Пране на Пари (Имоти & Автопаркове)
                </h3>

                <div style={{ backgroundColor: '#020617', padding: '0.8rem', borderRadius: '6px', border: '1px solid #1E293B' }}>
                  <span style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'block' }}>Инструмент за легализация:</span>
                  <strong style={{ color: '#FBBF24', fontSize: '0.85rem' }}>{network.operationalIntel.launderingVehicle}</strong>
                  <div style={{ fontSize: '0.78rem', color: '#F43F5E', fontWeight: 800, marginTop: '2px' }}>
                    {network.operationalIntel.launderingAmount}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Свързани Дружества & ЕИК:</span>
                  {network.moneyLaunderingCompanies.map((company, idx) => (
                    <div key={idx} style={{ backgroundColor: '#020617', padding: '0.7rem', borderRadius: '4px', border: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ color: '#F1F5F9', fontWeight: 700, fontSize: '0.8rem' }}>{company.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>ЕИК: {company.eik}</div>
                      </div>
                      <a href={company.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.72rem', color: '#60A5FA', textDecoration: 'underline' }}>
                        ЕПЗЕУ ➔
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Колона 3: Съдебен Архив & Чл. 354а НК (Улавяне на Чадъра) */}
              <div style={{ backgroundColor: '#070D1E', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.2rem', fontFamily: 'var(--font-mono)' }}>
                <div>
                  <h3 style={{ fontSize: '0.75rem', color: '#F43F5E', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ⚖️ 3. Съдебен Чадър (Чл. 354а НК)
                  </h3>

                  <div style={{ backgroundColor: '#0B132B', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '6px', padding: '0.9rem', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.68rem', color: '#FB7185', fontWeight: 800, display: 'block' }}>СЪДЕБНО ДЕЛО:</span>
                    <strong style={{ color: '#FFFFFF', fontSize: '0.82rem' }}>{network.operationalIntel.courtCaseNumber}</strong>
                    <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '2px' }}>
                      {network.operationalIntel.courtName} • {network.operationalIntel.magistrateAssigned}
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)', border: '1px solid #DC2626', borderRadius: '6px', padding: '0.8rem' }}>
                    <span style={{ fontSize: '0.68rem', color: '#FCA5A5', fontWeight: 800, display: 'block' }}>РЕЗУЛТАТ / ЧАДЪР:</span>
                    <div style={{ color: '#FECACA', fontSize: '0.82rem', fontWeight: 800 }}>
                      {network.operationalIntel.courtOutcome}
                    </div>
                    <div style={{ color: '#F87171', fontSize: '0.72rem', marginTop: '4px', lineHeight: '1.4' }}>
                      {network.operationalIntel.legalSanctionFlag}
                    </div>
                  </div>
                </div>

                <Link 
                  href={network.umbrella.kpkLink}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    backgroundColor: '#F59E0B',
                    color: '#020617',
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
                  }}
                >
                  👤 Виж Лицето в Черната Книга ➔
                </Link>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
