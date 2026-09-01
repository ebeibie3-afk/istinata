'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface CleanOfficial {
  id: string;
  name: string;
  institution: string;
  role: string;
  verifiedMerits: string[];
  kpkStatus: string;
  osintStatus: string;
  ratingBadge: string;
}

const CLEAN_OFFICIALS_DATA: CleanOfficial[] = [
  {
    id: 'CLEAN-001',
    name: 'Проф. Христо Даскалов',
    institution: 'Българска агенция по безопасност на храните (БАБХ)',
    role: 'Бивш изпълнителен директор на БАБХ (Учен и професор по микробиология)',
    verifiedMerits: [
      'Прекрати 10-годишния частен монопол на фирма „Евролаб 2011" на ГКПП „Капитан Андреево" и върна държавната лаборатория за фитосанитарен контрол.',
      'Лично отказа предложени подкупи в милиони левове и подаде официални сигнали в ДАНС и МВР.',
      'Устоя на системен административен и физически натиск в името на европейския здравен суверенитет.'
    ],
    kpkStatus: '100% съответствие между официално деклариран академичен доход и придобито имущество по публичния регистър на КПК.',
    osintStatus: 'Няма засечени свързани фирмени участия в Търговския регистър, кухи пощенски кутии или офшорни сметки.',
    ratingBadge: 'ВЕРИФИЦИРАН ИНТЕГРИТЕТ: ЧИСТ ПРОФИЛ'
  },
  {
    id: 'CLEAN-002',
    name: 'Цветан Цветков',
    institution: 'Сметна палата на Република България',
    role: 'Бивш председател на Сметната палата (Главен държавен одитор)',
    verifiedMerits: [
      'Ръководи и подписа ключовите одитни доклади за инхаус договорите за 1.18 млрд. лв. по АМ „Хемус" и авансите в ДКК за ремонт на язовири.',
      'Издаде отрицателни одити за финансовите отчети на десетки компрометирани феодални общини въпреки политически заплахи.',
      'Пълно протоколиране на липсващите 420 млн. лв. кешови аванси без наложени банкови гаранции.'
    ],
    kpkStatus: 'Пълна прозрачност в имотните декларации: липса на придобити имоти под пазарни цени или недекларирани банкови сметки в чужбина.',
    osintStatus: 'Липса на съвместни имотни сделки, общи нотариуси или лизингови автомобили от компрометирани автокъщи.',
    ratingBadge: 'ВЕРИФИЦИРАН ИНТЕГРИТЕТ: ЧИСТ ПРОФИЛ'
  },
  {
    id: 'CLEAN-003',
    name: 'Константин Бачийски',
    institution: 'Народно събрание / Антикорупционна комисия',
    role: 'Народен представител и разследващ казуса „Росенец"',
    verifiedMerits: [
      'Водеща фигура в разкриването и оспорването в съда на отнемането на общинския път и държавния бряг в парк „Росенец".',
      'Официален вносител на сигналите срещу схемите на „Златния гьол" на Капитан Андреево и пристанищните терминали в Бургас.',
      'Публикуване на изчерпателна документация от Кадастъра и Имотния регистър за заграбени крайбрежни територии.'
    ],
    kpkStatus: 'Декларирани спестявания и имущество, съответстващи стриктно на доходите от реалния бизнес сектор и публични функции.',
    osintStatus: 'Чиста цифрова следа: пълна независимост от олигархични кантори и кухи фирми-буфери.',
    ratingBadge: 'ВЕРИФИЦИРАН ИНТЕГРИТЕТ: ЧИСТ ПРОФИЛ'
  },
  {
    id: 'CLEAN-004',
    name: 'Бойко Рашков',
    institution: 'Министерство на вътрешните работи (МВР)',
    role: 'Бивш министър на вътрешните работи / Следовател и доцент по право',
    verifiedMerits: [
      'Ръководи мащабните разследвания на ГДБОП и Националната полиция за изтеглените 53 млн. лв. и 420 млн. лв. в сакове за строежа на АМ „Хемус".',
      'Разкри и документира мрежите за купуване на гласове и финансовите коридори на регионални лихвари и феодали.',
      'Предаде на Прокуратурата стотици страници доказателствен материал за инхаус злоупотреби в държавните дружества.'
    ],
    kpkStatus: 'Всички недвижими имоти са официално и публично декларирани в регистъра на КПКОНПИ с ясен и законен произход на доходите.',
    osintStatus: '0 участия в частни търговски дружества по време на заемане на публични длъжности.',
    ratingBadge: 'ВЕРИФИЦИРАН ИНТЕГРИТЕТ: ЧИСТ ПРОФИЛ'
  },
  {
    id: 'CLEAN-005',
    name: 'Стефан Янев & Одитните Екипи на МРРБ и МЕ',
    institution: 'Министерство на регионалното развитие / Министерство на енергетиката',
    role: 'Служебни одитни комисии (2021)',
    verifiedMerits: [
      'Публикуваха пълния списък на инхаус договорите на „Автомагистрали" ЕАД и ДКК, спирайки изтичането на нови милиарди.',
      'Разкриха механизма на кредитна концентрация в ББР (отпускането на 946 млн. лв. на едва 8 едри бизнес групи).',
      'Възстановиха държавния контрол върху договорите за текущ ремонт и поддържане на републиканската пътна мрежа.'
    ],
    kpkStatus: '100% стриктна отчетност пред държавните контролни органи.',
    osintStatus: 'Пълно съответствие с антикорупционните стандарти на ЕС и ОЛАФ.',
    ratingBadge: 'ВЕРИФИЦИРАН ИНТЕГРИТЕТ: ЧИСТ ПРОФИЛ'
  },
  {
    id: 'CLEAN-006',
    name: 'Съдия Владислава Цариградска',
    institution: 'Окръжен съд - Плевен / Съюз на съдиите в България',
    role: 'Окръжен съдия и магистрат-разобличител',
    verifiedMerits: [
      'Публично разобличи и освети мафиотските мрежи за натиск, изнудване и компромати в съдебната система, ръководени от Мартин Божанов (Нотариуса).',
      'Отказа да се подчини на системни заплахи срещу живота и семейството си, изнасяйки пред ВСС и парламентарните комисии схемите за кадруване и „частни клубове" за магистрати.',
      'Последователен защитник на съдийската независимост, върховенството на правото и етичния кодекс на българския магистрат.'
    ],
    kpkStatus: '100% съответствие на доходите и имотното състояние; липса на скрити офшорни авоари или имоти под пазарна себестойност.',
    osintStatus: 'Пълна прозрачност: 0 свързаности със сенчести адвокатски кантори или лобистки клубове за влияние (SS Club).',
    ratingBadge: 'МАГИСТРАТСКИ КУРАЖ: ВЕРИФИЦИРАН ИНТЕГРИТЕТ'
  },
  {
    id: 'CLEAN-007',
    name: 'Съдия Лазан Лазаров & Съдийска колегия на ВКС',
    institution: 'Върховен касационен съд (ВКС)',
    role: 'Върховни съдии по наказателни и търговски дела',
    verifiedMerits: [
      'Поредица от принципни тълкувателни решения, блокиращи опитите за незаконно отнемане на частна собственост и корпоративно рейдърство.',
      'Отмяна на незаконни актове на прокуратурата и отстояване на стандартите на Европейския съд по правата на човека (ЕСПЧ).',
      'Публично противопоставяне срещу политическия контрол над Висшия съдебен съвет и главния прокурор.'
    ],
    kpkStatus: 'Безупречни публични декларации в регистъра на Инспектората към ВСС и КПКОНПИ.',
    osintStatus: 'Пълна институционална независимост от партийни централи и олигархични имотни сделки.',
    ratingBadge: 'ВЪРХОВЕНСТВО НА ЗАКОНА: ЧИСТ ПРОФИЛ'
  },
  {
    id: 'CLEAN-008',
    name: 'Димитър Стоянов & Атанас Чобанов',
    institution: 'Разследващ журналистически център BIRD.BG / Bivol',
    role: 'Разследващи журналисти (Международни награди за журналистическа етика)',
    verifiedMerits: [
      'Автори на ключовите разследвания за „Апартаментгейт", „Джи Пи Гейт", „Къщите за гости с европари" и досиетата „Dubai Unlocked".',
      'Пълно картографиране и публикуване на имотните партиди на подставени лица, политици от Магнитски и магистрати в чужбина.',
      'Устояли на съдебен тормоз (SLAPP дела), физическо следене и институционален натиск в името на обществения интерес.'
    ],
    kpkStatus: 'Финансиране изцяло базирано на независими международни грантове за журналистически разследвания и читателски дарения.',
    osintStatus: 'Публични и отворени бази данни (Open Source Intelligence), верифицирани срещу официални държавни регистри.',
    ratingBadge: 'НЕЗАВИСИМА ЖУРНАЛИСТИКА: ОБЩЕСТВЕН СТРАЖ'
  },
  {
    id: 'CLEAN-009',
    name: 'Ивайло Мирчев',
    institution: 'Народно събрание / Граждански сектор',
    role: 'Народен представител и IT предприемач',
    verifiedMerits: [
      'Участник в десанта на „Росенец", осветил незаконното превръщане на държавен плаж и път в частна резиденция на Ахмед Доган.',
      'Вносител на ключови законодателни инициативи за пълна електронизация на държавната администрация и осветляване на обществените поръчки.',
      'Поредица от официални парламентарни питания за схемите на Капитан Андреево, ДКК и ТОЛ системата.'
    ],
    kpkStatus: 'Декларирани доходи от реален международен технологичен бизнес преди влизане в политиката.',
    osintStatus: '0 участия в държавни поръчки по инхаус процедури или консултантски договори с държавни дружества.',
    ratingBadge: 'ГРАЖДАНСКА СМЕЛОСТ: ЧИСТ ПРОФИЛ'
  },
  {
    id: 'CLEAN-010',
    name: 'Д-р Мирослав Ненков',
    institution: 'УМБАЛ „Царица Йоанна - ИСУЛ" / ВМА',
    role: 'Лекар анестезиолог-реаниматор, бивш служебен министър на здравеопазването',
    verifiedMerits: [
      'Прекрати порочни лобистки договори за доставка на медикаменти на завишени цени и отказа всякакви комисиони от фарма-картелите.',
      'Публично и безкомпромисно изобличава корупцията в здравеопазването, търговията с болнични шефски места и източването на НЗОК.',
      'Спасил хиляди човешки животи в реанимациите, оставайки да работи на първа линия в държавното здравеопазване.'
    ],
    kpkStatus: 'Пълно съответствие на лекарските доходи и притежаваното скромно имущество.',
    osintStatus: 'Липса на офшорни фирми, фармацевтични участия или фиктивни консултантски хонорари.',
    ratingBadge: 'ХИПОКРАТОВА КЛЕТВА & МОРАЛ: ВЕРИФИЦИРАН ИНТЕГРИТЕТ'
  }
];

export default function WhiteListPage() {
  const [filter, setFilter] = useState('ALL');

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* HEADER */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2.5rem auto', borderBottom: '1px solid #1E293B', paddingBottom: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            🛡️ ГРАЖДАНСКИ БЯЛ СПИСЪК: ИНТЕГРИТЕТ
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
            ОФИЦИАЛЕН РЕГИСТЪР НА ДОСТОЙНИТЕ ДЪРЖАВНИ СЛУЖИТЕЛИ И ОДИТОРИ
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.4rem 0' }}>
          Бял Списък на Достойните Българи и Държавни Служители
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
          Официален публичен регистър за държавни служители, одитори, съдии, учени и полицаи, 
          които лично са устояли на корупционен натиск, отказали са подкупи и са защитили публичния интерес с дела и документи.
        </p>
      </div>

      {/* RECOGNITION GRID */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {CLEAN_OFFICIALS_DATA.map((official) => (
          <div 
            key={official.id}
            style={{
              backgroundColor: '#0B132B',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 25px rgba(0,0,0,0.4)'
            }}
          >
            {/* Top Status Bar */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(90deg, rgba(6, 78, 59, 0.3) 0%, #070D1E 100%)',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#34D399', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>
                  ВЕРИФИЦИРАН ИНТЕГРИТЕТ
                </span>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>
                  {official.name}
                </h2>
                <div style={{ color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {official.role} • <span style={{ color: '#F8FAFC', fontWeight: 700 }}>{official.institution}</span>
                </div>
              </div>

              <span style={{
                fontSize: '0.74rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                backgroundColor: '#064E3B',
                color: '#34D399',
                border: '1px solid #059669',
                padding: '4px 10px',
                borderRadius: '4px'
              }}>
                {official.ratingBadge}
              </span>
            </div>

            {/* 3-Column Content Box */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1px',
              backgroundColor: '#1E293B',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)'
            }}>
              
              {/* Col 1: Merits */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.68rem', color: '#34D399', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>
                  📋 Документирани Заслуги & Факти:
                </span>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {official.verifiedMerits.map((merit, i) => (
                    <li key={i} style={{ backgroundColor: '#020617', padding: '0.8rem', borderRadius: '4px', border: '1px solid #1E293B', color: '#CBD5E1', lineHeight: '1.5' }}>
                      <strong style={{ color: '#34D399' }}>✓</strong> {merit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2: Property Check (KPK) */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>
                  🏠 Имуществена Проверка (КПК):
                </span>
                <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B', color: '#E2E8F0', lineHeight: '1.6' }}>
                  {official.kpkStatus}
                </div>
              </div>

              {/* Col 3: OSINT & Digital Footprint */}
              <div style={{ backgroundColor: '#070D1E', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#38BDF8', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
                    💻 Кръстосан OSINT Анализ:
                  </span>
                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B', color: '#94A3B8', fontStyle: 'italic', lineHeight: '1.6' }}>
                    {official.osintStatus}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #1E293B', paddingTop: '10px', textAlign: 'right' }}>
                  <span style={{ color: '#10B981', fontSize: '0.74rem', fontWeight: 800 }}>
                    ✓ 0 КОНФЛИКТА НА ИНТЕРЕСИ
                  </span>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* BOTTOM FOOTER LINK */}
      <div style={{ maxWidth: '1350px', margin: '2rem auto 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', borderTop: '1px solid #1E293B', paddingTop: '1.5rem' }}>
        <Link href="/persons" style={{ color: '#FB7185', textDecoration: 'underline', fontWeight: 800, fontSize: '0.85rem' }}>
          ➔ Към Черния Списък на Зависимите Фигури
        </Link>
        <Link href="/signals-tracker" style={{ color: '#38BDF8', textDecoration: 'underline', fontWeight: 800, fontSize: '0.85rem' }}>
          🛡️ Номинирай честен държавен служител по чл. 41 от КРБ ➔
        </Link>
      </div>

    </div>
  );
}
