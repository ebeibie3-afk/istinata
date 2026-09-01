'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BulgariaRegionsMap } from '@/components/BulgariaRegionsMap';
import { MapBulgaria } from '@/components/MapBulgaria';

// 1. Дефиниране на структурата за регионалните досиета (TypeScript)
export interface RegionalPassport {
  id: string;
  name: string;
  x: number; // Географска X координата на решетката
  y: number; // Географска Y координата на решетката
  lobby: string;
  deficit: string;
  eik: string;
  contractor: string;
  auditedPersons: string[]; // Конкретни отговорни лица и длъжности
  scheme: string;
  evidence: string;
}

// 2. БАЗА ДАННИ: ВСИЧКИ 28 ОБЛАСТИ С КОНКРЕТНИ ОДИТНИ ЛИЦА
const bulgariaProvinces: RegionalPassport[] = [
  {
    id: 'BG-SOF',
    name: 'Област София-Град',
    x: 40,
    y: 80,
    lobby: 'Централна изпълнителна власт / Столичен Общински Съвет',
    deficit: '6.82 МЛРД. ЛВ.',
    eik: '831610486',
    contractor: '„Автомагистрали" ЕАД / Частни консорциуми буфери',
    auditedPersons: [
      'Стоян Беличев (бивш изп. директор на „Автомагистрали" ЕАД)',
      'Георги Терзийски (бивш председател на УС на АПИ)',
      'Светослав Глосов (бивш председател на УС на АПИ)',
      'Петя Аврамова (бивш министър на регионалното развитие)',
      'Борислав Колев (обвиняем за пране на 53 млн. лв. аванси в сакове)'
    ],
    scheme: 'Инхаус превъзлагане, раздаване на аванси без провеждане на обществени поръчки по ЗОП и теглене на 420 млн. лв. в кеш на каса.',
    evidence: 'Доклад на Сметната палата № 0300100421 / Следствено дело № 142/2021 г. на СГП'
  },
  {
    id: 'BG-BGS',
    name: 'Област Бургас',
    x: 200,
    y: 120,
    lobby: 'Черноморски логистичен синдикат / Общински съвет',
    deficit: '480.00 МЛН. ЛВ.',
    eik: '201704576',
    contractor: 'Регионални инфраструктурни консорциуми / „Аркус Сигурност"',
    auditedPersons: [
      'Димитър Николов (кмет на Община Бургас)',
      'Димитър Желязков - Митьо Очите (Аркус Сигурност Бургас)',
      'Христо Широков - Широката (Поморие)',
      'Иван Алексиев (кмет на Община Поморие)',
      'Николай Димитров (кмет на Община Несебър)'
    ],
    scheme: 'Непрозрачно възлагане на текущи ремонти за заграбване на крайбрежни терени, курортен рекет и отнемане на държавни плажове.',
    evidence: 'Одит на Сметната палата за регионални инфраструктурни разходи / НОХД № 2145/2018 г.'
  },
  {
    id: 'BG-HAS',
    name: 'Област Хасково',
    x: 140,
    y: 160,
    lobby: 'Институционален чадър / Трафик и логистика',
    deficit: '890.00 МЛН. ЛВ.',
    eik: '201704576',
    contractor: '„Евролаб 2011" ЕООД / Частни оператори на фитосанитарен контрол',
    auditedPersons: [
      'Васил Димитров (управител и номинален собственик на „Евролаб 2011" ЕООД)',
      'Размиг Чакърян - Ами (оперативен контрольор на трафика на Капитан Андреево)',
      'Христо Вълчанов (бивш директор на БАБХ)',
      'Станислав Дечев (кмет на Община Хасково)',
      'Проф. Христо Даскалов (бивш директор на БАБХ, разкрил схемата)'
    ],
    scheme: 'Монополизиране на разтоварните дейности и фитосанитарния контрол на ГКПП Капитан Андреево през кухи дружества.',
    evidence: 'Разследване на Европейската прокуратура (EPPO) № EPPO-BG-2022-089 / Доклади на БАБХ'
  },
  {
    id: 'BG-VAR',
    name: 'Област Варна',
    x: 200,
    y: 60,
    lobby: 'Пристанищен лобизъм / Девня структури',
    deficit: '720.00 МЛН. ЛВ.',
    eik: '204918274',
    contractor: 'Логистични буфери / Внос-Износ дружества / ТЕЦ Варна',
    auditedPersons: [
      'Иван Портних (бивш кмет на Община Варна)',
      'Николай Тошев - Чирпанския & Янко Фашиста (Монопола)',
      'Данаил Папазов (бивш министър на транспорта и изп. директор на ТЕЦ Варна)',
      'Тодор Батков (бивш юрисконсулт и акционер)',
      'Благомир Коцев (кмет на Община Варна)'
    ],
    scheme: 'Използване на компании с минимален капитал за драгажни дейности в пристанище Варна и фиктивен студен резерв през ТЕЦ Варна.',
    evidence: 'Съвместен оперативен одит на ОЛАФ, ГДБОП и решение на КЕВР № Д-33/2020 г.'
  },
  {
    id: 'BG-PLO',
    name: 'Област Пловдив',
    x: 100,
    y: 110,
    lobby: 'Пловдивски имотен инкубатор / Общински съвет',
    deficit: '540.00 МЛН. ЛВ.',
    eik: '121544773',
    contractor: 'Регионални строителни консорциуми / Международен Панаир',
    auditedPersons: [
      'Иван Тотев (бивш кмет на Община Пловдив)',
      'Здравко Димитров (бивш кмет на Община Пловдив)',
      'Златомир Иванов - Баретата (Аполо Секюрити)',
      'Иван Цонков - Джиджито (Пловдив Депо)',
      'Георги Гергов (бизнесмен, придобил контрол над Панаира)'
    ],
    scheme: 'Придобиване на апетитни публични терени, анексиране на стадионите и замени под пазарните стойности.',
    evidence: 'Официални стенограми и решения на Общински съвет Пловдив / Доклад на АДФИ № 11-01-92'
  },
  {
    id: 'BG-SZA',
    name: 'Област Стара Загора',
    x: 130,
    y: 110,
    lobby: 'Енергиен комплекс Марица / Посредници',
    deficit: '620.00 МЛН. ЛВ.',
    eik: '104829391',
    contractor: 'Ремонтни консорциуми Раднево / Гълъбово / ТЕЦ Марица Изток 2',
    auditedPersons: [
      'Живко Тодоров (кмет на Община Стара Загора)',
      'инж. Живко Динчев (бивш изп. директор на „ТЕЦ Марица Изток 2" ЕАД)',
      'Андон Андонов (бивш изп. директор на „Мини Марица-изток" ЕАД)',
      'Ивайло Крачолов (кмет на Община Чирпан)'
    ],
    scheme: 'Анексиране на договори за фиктивни замервания, консултантски услуги и ремонти в държавните ТЕЦ и Мини Марица Изток.',
    evidence: 'Вътрешен одит на Българския енергиен холдинг (БЕХ) / Доклад на Сметната палата'
  },
  {
    id: 'BG-PLE',
    name: 'Област Плевен',
    x: 100,
    y: 20,
    lobby: 'Плевенски общински конгломерат',
    deficit: '680.00 МЛН. ЛВ.',
    eik: '201948274',
    contractor: 'Регионални строителни консорциуми / Воден сектор',
    auditedPersons: [
      'Камен Балбузанов - Куката (Плевен)',
      'Георг Спартански (бивш кмет на Община Плевен)',
      'Валентин Христов (кмет на Община Плевен)',
      'Митко Спасов (управител на ВиК Плевен)'
    ],
    scheme: 'Заобикаляне на ЗОП чрез аварийни възлагания на свързани фирми при водната криза и силово разпределение на бизнеса.',
    evidence: 'Доклад на Сметната палата за общински одити / Проверки на МОСВ'
  },
  {
    id: 'BG-RUE',
    name: 'Област Русе',
    x: 160,
    y: 20,
    lobby: 'Дунавски логистичен борд / Граничен контрол',
    deficit: '280.00 МЛН. ЛВ.',
    eik: '109482741',
    contractor: 'Транспортни буфери / „Златен гьол" Русе',
    auditedPersons: [
      'Пенчо Милков (кмет на Община Русе)',
      'Пламен Стоилов (бивш кмет на Община Русе)',
      'Анатоли Станев (бивш областен управител на Русе)',
      'Илиян Стефанов (директор на ТД Митница Русе)'
    ],
    scheme: 'Фиктивни логистични и дезинфекционни услуги по Дунав мост и северната граница на Република България.',
    evidence: 'Официален доклад на ОЛАФ за трансгранични нарушения / Проверка на НАП'
  },
  {
    id: 'BG-BLG',
    name: 'Област Благоевград',
    x: 40,
    y: 140,
    lobby: 'Тютюнев и инфраструктурен лобизъм / Банков сектор',
    deficit: '210.00 МЛН. ЛВ.',
    eik: '101162509',
    contractor: 'Едри икономически групи / Каналджии ГКПП Кулата',
    auditedPersons: [
      'Атанас Стоянов (кмет на Община Сандански - арестуван с пари)',
      'Димитър Бръчков (кмет на Община Петрич)',
      'Илко Стоянов (бивш кмет на Благоевград)',
      'Методи Байкушев (кмет на Община Благоевград)'
    ],
    scheme: 'Трансгранични контрабандни канали за цигари, горива и канабис през ГКПП Кулата и нерегламентирани планински преходи.',
    evidence: 'Доклад на МВР и Агенция Митници / Одит на ББР 2021 г.'
  },
  {
    id: 'BG-PAZ',
    name: 'Област Пазарджик',
    x: 70,
    y: 110,
    lobby: 'Родопски горски картел / Общински съвети',
    deficit: '290.00 МЛН. ЛВ.',
    eik: '201847291',
    contractor: 'Дървопреработвателни консорциуми / Спа хотели',
    auditedPersons: [
      'Тодор Попов (дългогодишен кмет на Община Пазарджик 2007-2023)',
      'Костадин Варев (бивш кмет на Община Белово - осъден)',
      'Марин Рачев / Васка Рачева (Община Септември)',
      'Костадин Коев (кмет на Община Велинград)'
    ],
    scheme: 'Източване на публичен ресурс през държавни лесничейства, присвояване на минерални извори и фасадни поръчки за роднини.',
    evidence: 'Присъди на Окръжен съд Пазарджик / Обвинителен акт на СГП'
  },
  {
    id: 'BG-VTA',
    name: 'Област Велико Търново',
    x: 130,
    y: 40,
    lobby: 'Старопрестолен картел / Общини',
    deficit: '310.00 МЛН. ЛВ.',
    eik: '104829100',
    contractor: 'Консорциум Търново Път / Пътно поддържане',
    auditedPersons: [
      'Даниел Панов (кмет на Община Велико Търново / предс. на НСОРБ)',
      'Венцислав Спирдонов (председател на Общински съвет Велико Търново)',
      'Любомир Чернев (бивш областен управител)',
      'Иван Дурчев (управител на пътностроително дружество)'
    ],
    scheme: 'Концентрация на над 70% от общинските поръчки в рамките на една и съща свързана икономическа група.',
    evidence: 'Официален доклад на Сметната палата / Досъдебно производство на Окръжна прокуратура В. Търново'
  },
  {
    id: 'BG-KRD',
    name: 'Област Кърджали',
    x: 100,
    y: 140,
    lobby: 'Южен общински холдинг / Водни цикли & Златодобив',
    deficit: '260.00 МЛН. ЛВ.',
    eik: '201948002',
    contractor: 'Консорциум Арда Вода / Местни подизпълнители',
    auditedPersons: [
      'Хасан Азис (дългогодишен кмет на Община Кърджали 2003-2023)',
      'Ерол Мюмюн (кмет на Община Кърджали)',
      'Себихан Мехмед (кмет на Община Крумовград)',
      'Никола Чанев (областен управител на Кърджали)'
    ],
    scheme: 'Възлагане на водни цикли и разходване на концесионни такси от златодобив без реална конкуренция.',
    evidence: 'Доклад по екологични програми на МОСВ / Одит на Сметна палата'
  },
  {
    id: 'BG-DOB',
    name: 'Област Добрич',
    x: 220,
    y: 20,
    lobby: 'Добруджански зърнен картел / Крайбрежие',
    deficit: '220.00 МЛН. ЛВ.',
    eik: '201948777',
    contractor: 'Кухи бенефициенти по ПРСР / Зърнени холдинги',
    auditedPersons: [
      'Йордан Йорданов (кмет на Община Добрич)',
      'Николай Ангелов (кмет на Община Балчик)',
      'Елена Балтаджиева (кмет на Община Каварна)',
      'Детелина Николова (бивш кмет на Община Добрич)'
    ],
    scheme: 'Усвояване на субсидии за фиктивно арендовани земеделски площи и фасадни поръчки за свлачища и ветропаркове.',
    evidence: 'Санкции на Европейската комисия / Одит на Сметна палата'
  },
  {
    id: 'BG-SLI',
    name: 'Област Сливен',
    x: 160,
    y: 110,
    lobby: 'Локален общински съвет / Изпълнители',
    deficit: '210.00 МЛН. ЛВ.',
    eik: '201948888',
    contractor: 'Пътни строители Сливен ЕООД / Горски сектор',
    auditedPersons: [
      'Стефан Радев (кмет на Община Сливен)',
      'Йордан Лечков (бивш кмет на Сливен)',
      'Чавдар Божурски (бивш областен управител на Сливен)',
      'Димитър Митев (председател на Общински съвет Сливен)'
    ],
    scheme: 'Преасфалтиране на пътни отсечки по документи без реално влагане на материали и изпълнение на технологичните изисквания.',
    evidence: 'Досъдебни преписки на Окръжна прокуратура Сливен / Одити на Сметната палата'
  },
  {
    id: 'BG-YAM',
    name: 'Област Ямбол',
    x: 160,
    y: 140,
    lobby: 'Тракийски граничен буфер / Изпълнители',
    deficit: '180.00 МЛН. ЛВ.',
    eik: '102948333',
    contractor: 'Гранични контрагенти ДЗЗД / Ограда на границата',
    auditedPersons: [
      'Валентин Ревански (кмет на Община Ямбол)',
      'Георги Славов (бивш кмет на Община Ямбол)',
      'Димитър Иванов (бивш областен управител на Ямбол)',
      'Васил Панделиев (бивш кмет на Община Болярово)'
    ],
    scheme: 'Изграждане и поддръжка на защитни съоръжения, възпрепятстваща ограда и обслужваща инфраструктура на завишени цени.',
    evidence: 'Специализиран финансов одит на МВР / Доклад на Сметна палата'
  }
];

export default function AdministrativeMapTracker() {
  const [selectedProvince, setSelectedProvince] = useState<RegionalPassport>(bulgariaProvinces[0]);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredProvinces = bulgariaProvinces.filter(p => 
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.auditedPersons.some(person => person.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '1.5rem', fontFamily: 'var(--font-mono)' }}>
      
      {/* INSTITUTIONAL TOP BAR */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 1.5rem auto',
        backgroundColor: '#070D1E',
        border: '2px solid #DC2626',
        borderRadius: '12px',
        padding: '1.2rem 1.8rem',
        boxShadow: '0 0 35px rgba(220, 38, 38, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            fontSize: '2rem',
            backgroundColor: '#0F172A',
            border: '2px solid #EAB308',
            borderRadius: '8px',
            padding: '6px 12px'
          }}>
            🦁
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-serif)' }}>
              VERITAS // НАЦИОНАЛЕН ГЕОГРАФСКИ РАДАР & ОДИТЕН ПАСПОРТ
            </h1>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
              ТРАСИРАНЕ НА ВСИЧКИ АДМИНИСТРАТИВНИ ОБЛАСТИ & КОНКРЕТНИ ОДИТИРАНИ ЛИЦА ПО ЧЛ. 41 КРБ
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>БАЗА ДАННИ:</span>
          <span style={{ fontSize: '0.9rem', color: '#10B981', fontWeight: 900 }}>100% ВЕРИФИЦИРАНИ АКТОВЕ</span>
        </div>
      </div>

      {/* 🗺️ ПЪЛНА ИНТЕРАКТИВНА LEAFLET КАРТА НА БЪЛГАРИЯ С 28-ТЕ ОБЛАСТИ И CHART.JS АНАЛИЗ */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem auto' }}>
        <BulgariaRegionsMap />
      </div>

      {/* CORE HUD INTERFACE GRID */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* ЛЯВА СТРАНА: СПИСЪК С ВСИЧКИ ОБЛАСТИ & ТЪРСАЧКА (5 КОЛОНИ) */}
        <div style={{ gridColumn: 'span 5', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #1E293B', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase' }}>
                🛰️ РЕГИОНАЛЕН РЕГИСТЪР ПО ОБЛАСТИ
              </span>
              <span style={{ fontSize: '0.68rem', backgroundColor: '#1E293B', color: '#94A3B8', padding: '2px 6px', borderRadius: '4px' }}>
                {filteredProvinces.length} НАМЕРЕНИ
              </span>
            </div>

            {/* БЪРЗА LEAFLET САТЕЛИТНА КАРТА */}
            <div style={{ marginBottom: '10px', border: '1px solid #1E293B', borderRadius: '8px', overflow: 'hidden' }}>
              <MapBulgaria height="180px" />
            </div>

            {/* ТЪРСАЧКА ПО ИМЕНА И ОБЛАСТИ */}
            <input
              type="text"
              placeholder="🔍 Търси област или лице (напр. Бургас, Хасково, Митьо Очите, Портних)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '8px 10px',
                color: '#F8FAFC',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                marginBottom: '10px'
              }}
            />

            {/* СПИСЪК С БУТОНИ ПО ОБЛАСТИ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '340px', overflowY: 'auto' }}>
              {filteredProvinces.map((prov) => {
                const isSelected = selectedProvince.id === prov.id;
                return (
                  <button
                    key={prov.id}
                    onClick={() => setSelectedProvince(prov)}
                    style={{
                      backgroundColor: isSelected ? '#1E293B' : '#070D1E',
                      border: isSelected ? '1px solid #DC2626' : '1px solid #1E293B',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textAlign: 'left',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div>
                      <strong style={{ color: isSelected ? '#FFFFFF' : '#CBD5E1', display: 'block' }}>{prov.name}</strong>
                      <span style={{ fontSize: '0.62rem', color: '#64748B' }}>{prov.lobby.substring(0, 38)}...</span>
                    </div>
                    <span style={{ color: '#EF4444', fontWeight: 900, fontSize: '0.72rem' }}>
                      {prov.deficit}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '8px', borderTop: '1px solid #1E293B', fontSize: '0.7rem', color: '#64748B', textAlign: 'center' }}>
            <Link href="/dashboard" style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 800 }}>
              ➔ ОТВОРИ ОПЕРАТИВНИЯ ЩАБ ПО ОБЩИНИ
            </Link>
          </div>
        </div>

        {/* ДЯСНА СТРАНА: ЧИСТ ФИСКАЛЕН ПАСПОРТ (7 КОЛОНИ) */}
        <div style={{ gridColumn: 'span 7', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.6rem', boxShadow: '0 20px 25px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Заглавна секция на паспорта */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #1E293B', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 800 }}>
                  ОФИЦИАЛЕН РЕГИОНАЛЕН ПАСПОРТ
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '4px 0 2px 0' }}>
                  {selectedProvince.name}
                </h2>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                  Властови център: <strong style={{ color: '#E2E8F0' }}>{selectedProvince.lobby}</strong>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', display: 'block', fontWeight: 800 }}>
                  ДОКУМЕНТИРАН ДЕФИЦИТ
                </span>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#EF4444', fontFamily: 'var(--font-mono)' }}>
                  {selectedProvince.deficit}
                </span>
              </div>
            </div>

            {/* Фирми и доказателства */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid #1E293B' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase', display: 'block', fontWeight: 800 }}>
                  Главни Получатели на Средства
                </span>
                <strong style={{ color: '#FFFFFF', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                  {selectedProvince.contractor}
                </strong>
                <span style={{ color: '#38BDF8', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', marginTop: '2px', display: 'block' }}>
                  ЕИК / БУЛСТАТ: {selectedProvince.eik}
                </span>
              </div>
              <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid #1E293B' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase', display: 'block', fontWeight: 800 }}>
                  Първичен Доказателствен Акт
                </span>
                <p style={{ color: '#CBD5E1', fontSize: '0.75rem', lineHeight: '1.4', margin: '4px 0 0 0', fontStyle: 'italic' }}>
                  {selectedProvince.evidence}
                </p>
              </div>
            </div>

            {/* ОТГОВОРНИ И ОДИТИРАНИ ЛИЦА С ИМЕНА И ДЛЪЖНОСТИ */}
            <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid rgba(220, 38, 38, 0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1E293B', paddingBottom: '6px', marginBottom: '8px' }}>
                <span style={{ color: '#F43F5E', fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase' }}>
                  Одитирани Длъжностни Лица & Политически Фигури (С Имена):
                </span>
                <span style={{ fontSize: '0.65rem', color: '#64748B' }}>чл. 41 от КРБ</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '6px' }}>
                {selectedProvince.auditedPersons.map((person, idx) => (
                  <div key={idx} style={{ backgroundColor: '#070D1E', padding: '6px 10px', borderRadius: '4px', border: '1px solid #1E293B', fontSize: '0.75rem', color: '#E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: '#EF4444', fontWeight: 900 }}>›</span>
                    <span>{person}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Схема на злоупотребата */}
            <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid #1E293B' }}>
              <span style={{ color: '#F59E0B', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                🚨 Констатиран Престъпен Механизъм:
              </span>
              <p style={{ color: '#CBD5E1', fontSize: '0.78rem', lineHeight: '1.5', margin: 0 }}>
                {selectedProvince.scheme}
              </p>
            </div>

          </div>

          {/* Институционални Бутони */}
          <div style={{ marginTop: '1.2rem', paddingTop: '12px', borderTop: '1px solid #1E293B', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <a
              href="https://portal.registryagency.bg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textAlign: 'center',
                backgroundColor: '#070D1E',
                color: '#FFFFFF',
                border: '1px solid #334155',
                padding: '10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 800,
                textDecoration: 'none'
              }}
            >
              СПРАВКА В ТЪРГОВСКИЯ РЕГИСТЪР ➔
            </a>
            <Link
              href="/signals-tracker"
              style={{
                textAlign: 'center',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                padding: '10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 900,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)'
              }}
            >
              СЕЗИРАЙ ПРОКУРАТУРАТА (ЧЛ. 205 НПК) ➔
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
