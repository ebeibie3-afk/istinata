'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface IntegrityMetrics {
  propertyMatch: boolean; // Съответствие на имоти със заплата
  zeroCorporateTies: boolean; // Липса на скрити фирмени участия
  cleanFamilyTrace: boolean; // Чисто семейно досие
  refusedPressureCases: number; // Брой дела, при които е отстояван законът под натиск
}

export interface ShadowConnection {
  mafiaAssetAlias: string; // Свързано лице / Структура за влияние
  typeOfTie: string; // Механизъм на влияние
  documentEvidence: string; // Доказателствен източник
  statuteExpiryMonthsLeft?: number; // Месеци до изтичане на абсолютната давност
  caseNumber?: string;
}

export interface PersonProfile {
  id: string;
  name: string;
  role: 'Съдия' | 'Прокурор' | 'Следовател' | 'Одитор/Инспектор';
  status: 'ДОСТОЕН (ЧИСТ ПРОФИЛ)' | 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)';
  institution: string;
  integrityCheck: IntegrityMetrics;
  shadowTies?: ShadowConnection[];
  summary: string;
}

const MAGISTRATES_DATA: PersonProfile[] = [
  // =========================================================================
  // ДОСТОЙНИ МАГИСТРАТИ И ДЪРЖАВНИЦИ
  // =========================================================================
  {
    id: 'MAG-001',
    name: 'Съдия Владислава Цариградска',
    institution: 'Окръжен съд - Плевен',
    role: 'Съдия',
    status: 'ДОСТОЕН (ЧИСТ ПРОФИЛ)',
    integrityCheck: {
      propertyMatch: true,
      zeroCorporateTies: true,
      cleanFamilyTrace: true,
      refusedPressureCases: 4
    },
    summary: 'Публично освети мафиотската мрежа за изнудване и компромати на Мартин Божанов (Нотариуса) и частния клуб за магистрати „SS Club". Преминала 100% имуществен одит без недекларирани активи. Устояла на директни смъртни заплахи.'
  },
  {
    id: 'MAG-002',
    name: 'Съдия Цветко Лазаров',
    institution: 'Софийски апелативен съд',
    role: 'Съдия',
    status: 'ДОСТОЕН (ЧИСТ ПРОФИЛ)',
    integrityCheck: {
      propertyMatch: true,
      zeroCorporateTies: true,
      cleanFamilyTrace: true,
      refusedPressureCases: 3
    },
    summary: 'Отказа да се подчини на директен натиск и изнудване от групата около Мартин Божанов (Нотариуса) и адвокат Велимир Атанасов по делото за имотите на Гръцката епископия. Заяви пред ВСС опитите за корупция в съдебната система.'
  },
  {
    id: 'MAG-003',
    name: 'Цветан Цветков',
    institution: 'Сметна палата на Република България',
    role: 'Одитор/Инспектор',
    status: 'ДОСТОЕН (ЧИСТ ПРОФИЛ)',
    integrityCheck: {
      propertyMatch: true,
      zeroCorporateTies: true,
      cleanFamilyTrace: true,
      refusedPressureCases: 6
    },
    summary: 'Главен държавен одитор, подписал одитните актове за инхаус превъзлаганията за 1.18 млрд. лв. по АМ „Хемус", източените 500 млн. лв. от ДКК за язовири и фискалните дефицити на 10 феодални общини. Отстранен противоконституционно.'
  },
  {
    id: 'MAG-004',
    name: 'Проф. Христо Даскалов',
    institution: 'Българска агенция по безопасност на храните (БАБХ)',
    role: 'Одитор/Инспектор',
    status: 'ДОСТОЕН (ЧИСТ ПРОФИЛ)',
    integrityCheck: {
      propertyMatch: true,
      zeroCorporateTies: true,
      cleanFamilyTrace: true,
      refusedPressureCases: 5
    },
    summary: 'Прекрати 10-годишния частен монопол на фирма „Евролаб 2011" на ГКПП „Капитан Андреево" и възстанови държавната лаборатория за контрол на пестициди. Лично отказа подкуп в милиони левове и сезира ДАНС и Европейската прокуратура (EPPO).'
  },
  {
    id: 'MAG-005',
    name: 'Бойко Рашков',
    institution: 'Министерство на вътрешните работи / Национална следствена служба',
    role: 'Следовател',
    status: 'ДОСТОЕН (ЧИСТ ПРОФИЛ)',
    integrityCheck: {
      propertyMatch: true,
      zeroCorporateTies: true,
      cleanFamilyTrace: true,
      refusedPressureCases: 5
    },
    summary: 'Ръководи разследванията на МВР и ГДБОП за изтеглените 53 млн. лв. и 420 млн. лв. в брой от АМ „Хемус" през Инвестбанк, разби купуването на гласове и пресече институционалния чадър над регионални лихвари.'
  },

  // =========================================================================
  // КОМПРОМЕТИРАНИ ФИГУРИ И ЗАВИСИМИ МАГИСТРАТИ С ИМЕНА
  // =========================================================================
  {
    id: 'MAG-006',
    name: 'Иван Стоименов Гешев',
    institution: 'Прокуратура на Република България (Бивш Главен прокурор)',
    role: 'Прокурор',
    status: 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)',
    integrityCheck: {
      propertyMatch: false,
      zeroCorporateTies: false,
      cleanFamilyTrace: false,
      refusedPressureCases: 0
    },
    shadowTies: [
      {
        mafiaAssetAlias: 'Петьо Петров (Еврото) & Мартин Божанов (Нотариуса)',
        typeOfTie: 'Организиране на институционален чадър над ресторант „Осемте джуджета" и частния клуб „SS Club", разпъване на чадър над фалита на КТБ (дело № 83/2014 г.).',
        documentEvidence: 'Показания на Илия Златанов (Изамет), разследвания на АКФ, официални изслушвания във ВСС и временните парламентарни комисии.',
        statuteExpiryMonthsLeft: 14,
        caseNumber: 'Преписка № 14208/2021-СГП'
      },
      {
        mafiaAssetAlias: 'Детелина Ханчева (Свързано лице / Партньор)',
        typeOfTie: 'Съвместни имотни придобивания и бизнес обвързаности с Марио Кръстев (свързан с приватизационни сделки и строителни регулации).',
        documentEvidence: 'Справка от Имотния регистър (Агенция по вписванията) и разследване на сайта Bird.bg.'
      }
    ],
    summary: 'Използване на Специализираната прокуратура за отнемане на бизнеси, блокиране на разследванията за „Барселонагейт", „Чекмеджегейт" и неправомерно изтеглените милиарди от АМ „Хемус".'
  },
  {
    id: 'MAG-007',
    name: 'Борислав Боби Сарафов',
    institution: 'Прокуратура на Република България (И.ф. Главен прокурор)',
    role: 'Прокурор',
    status: 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)',
    integrityCheck: {
      propertyMatch: false,
      zeroCorporateTies: false,
      cleanFamilyTrace: false,
      refusedPressureCases: 0
    },
    shadowTies: [
      {
        mafiaAssetAlias: 'Петьо Петров (Пепи Еврото)',
        typeOfTie: 'Документирани срещи и разговори в ресторант „Осемте джуджета", използване на следствието за прикриване на данни за изнудване на бизнесмени.',
        documentEvidence: 'Автентични снимкови материали от ресторант „Осемте джуджета", свидетелски показания на Любена Павлова и протоколи от СГП.',
        statuteExpiryMonthsLeft: 18,
        caseNumber: 'ДП № 242/2023 г. по описа на Софийска градска прокуратура'
      },
      {
        mafiaAssetAlias: 'Боян Сарафов (Син)',
        typeOfTie: 'Придобиване на луксозни апартаменти, гаражи и търговски площи в София на стойност над 1.5 млн. лв. на възраст под 25 г. без доказан личен доход.',
        documentEvidence: 'Нотариални актове, вписани в Служба по вписванията - София, и имотни декларации в КПКОНПИ.'
      }
    ],
    summary: 'Ръководител на Националната следствена служба и и.ф. главен прокурор; директно свързан с кръговете за влияние в съдебната власт и отказ от пълно разследване на „Осемте джуджета".'
  },
  {
    id: 'MAG-008',
    name: 'Петьо Велков Петров (Пепи Еврото)',
    institution: 'Бивш директор на Столичното следствие (Следовател)',
    role: 'Следовател',
    status: 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)',
    integrityCheck: {
      propertyMatch: false,
      zeroCorporateTies: false,
      cleanFamilyTrace: false,
      refusedPressureCases: 0
    },
    shadowTies: [
      {
        mafiaAssetAlias: 'Любена Павлова & Кръгът „Осемте Джуджета"',
        typeOfTie: 'Организиране на фабрика за изнудване, изземване на злато (35 кг от казуса „Изамет") и фабрикуване на обвинения срещу непокорни предприемачи.',
        documentEvidence: 'Постановление на Софийска районна прокуратура, видеозаписи и разследване „Осемте джуджета" (АКФ).',
        statuteExpiryMonthsLeft: 8,
        caseNumber: 'Дело № 11029/2023-СГП (Обявен за международно издирване)'
      }
    ],
    summary: 'Архитектът на паралелното правосъдие в България; ръководител на схемите за търговия с прокурорски актове, прекратяване на разследвания и превземане на активи под принуда.'
  },
  {
    id: 'MAG-009',
    name: 'Георги Ушев',
    institution: 'Бивш председател на Апелативния специализиран наказателен съд (АСНС)',
    role: 'Съдия',
    status: 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)',
    integrityCheck: {
      propertyMatch: false,
      zeroCorporateTies: false,
      cleanFamilyTrace: false,
      refusedPressureCases: 0
    },
    shadowTies: [
      {
        mafiaAssetAlias: 'Специализирано лоби / Политика & Олигархия',
        typeOfTie: 'Системно налагане на максимални мерки „Задържане под стража" за натиск и изземване на активи без събрани преки веществени доказателства.',
        documentEvidence: 'Доклад на Съюза на съдиите в България и констатации на Венецианската комисия за Специализирания съд.',
        statuteExpiryMonthsLeft: 22,
        caseNumber: 'Дела за мерки за неотклонение 2017–2022 г.'
      }
    ],
    summary: 'Дългогодишен ръководител на Специализирания съд; поддържал институционалния комфорт на политическия елит и осигурявал репресивен апарат срещу бизнеса.'
  },
  {
    id: 'MAG-010',
    name: 'Емилия Русинова',
    institution: 'Бивш градски прокурор на София (СГП) / Апелативна прокуратура',
    role: 'Прокурор',
    status: 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)',
    integrityCheck: {
      propertyMatch: false,
      zeroCorporateTies: false,
      cleanFamilyTrace: false,
      refusedPressureCases: 0
    },
    shadowTies: [
      {
        mafiaAssetAlias: 'Кръгът „Осемте Джуджета"',
        typeOfTie: 'Посещения в ресторант „Осемте джуджета" и съгласуване на кадрови назначения и образуване на проверки срещу магистрати.',
        documentEvidence: 'Свидетелски показания на Любена Павлова пред разследващите органи и публични медийни разкрития.',
        statuteExpiryMonthsLeft: 16,
        caseNumber: 'Дисциплинарно производство във ВСС 2024 г.'
      }
    ],
    summary: 'Ръководител на най-голямата прокуратура в страната (СГП) в периода на спиране на емблематичните корупционни разследвания по високите етажи на властта.'
  }
];

export default function MagistratesRadarPage() {
  const [filterStatus, setFilterStatus] = useState<'Всички' | 'ДОСТОЕН (ЧИСТ ПРОФИЛ)' | 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)'>('Всички');

  const filteredData = filterStatus === 'Всички' 
    ? MAGISTRATES_DATA 
    : MAGISTRATES_DATA.filter(item => item.status === filterStatus);

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
            color: '#38BDF8',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            ⚖️ МОНИТОРИНГ НА СЪДЕБНАТА СИСТЕМА
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            padding: '3px 10px',
            borderRadius: '4px'
          }}>
            ФИНАНСОВ ЛУСТРАЦИОНЕН МОДЕЛ + ТРАКЕР ЗА ДАВНОСТ (С КОНКРЕТНИ ИМЕНА)
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.4rem 0' }}>
          Радар на Магистратите и Достойните Лица
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
          Пълен публичен регистър с конкретни имена на съдии, прокурори и държавници. 
          Отделяме чистите магистрати, устояли на натиск, от зависимите фигури със сенчести обвързаности и преписки пред давност.
        </p>
      </div>

      {/* FILTER CONTROLS */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2rem auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {(['Всички', 'ДОСТОЕН (ЧИСТ ПРОФИЛ)', 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              border: filterStatus === status ? '2px solid #38BDF8' : '1px solid #1E293B',
              backgroundColor: filterStatus === status ? '#0F172A' : '#0B132B',
              color: filterStatus === status ? '#38BDF8' : '#94A3B8',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: filterStatus === status ? '0 4px 14px rgba(56, 189, 248, 0.2)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {status} ({status === 'Всички' ? MAGISTRATES_DATA.length : MAGISTRATES_DATA.filter(m => m.status === status).length})
          </button>
        ))}
      </div>

      {/* CARD LIST */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        {filteredData.map((person) => {
          const isClean = person.status.includes('ДОСТОЕН');
          return (
            <div 
              key={person.id}
              style={{
                backgroundColor: '#0B132B',
                border: isClean ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(225, 29, 72, 0.4)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 15px 25px rgba(0,0,0,0.4)'
              }}
            >
              {/* Top Bar */}
              <div style={{
                padding: '1.2rem 1.6rem',
                background: isClean 
                  ? 'linear-gradient(90deg, rgba(6, 78, 59, 0.3) 0%, #070D1E 100%)' 
                  : 'linear-gradient(90deg, rgba(153, 27, 27, 0.3) 0%, #070D1E 100%)',
                borderBottom: '1px solid #1E293B',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>
                    {person.role} • {person.institution} • ИД: {person.id}
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>
                    {person.name}
                  </h2>
                </div>

                <span style={{
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  backgroundColor: isClean ? 'rgba(16, 185, 129, 0.2)' : 'rgba(225, 29, 72, 0.2)',
                  color: isClean ? '#34D399' : '#FB7185',
                  border: isClean ? '1px solid #059669' : '1px solid #DC2626',
                  padding: '4px 10px',
                  borderRadius: '4px'
                }}>
                  {person.status}
                </span>
              </div>

              {/* 3-Column Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1px',
                backgroundColor: '#1E293B',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)'
              }}>
                
                {/* Col 1: Integrity Matrix */}
                <div style={{ backgroundColor: '#0B132B', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#38BDF8', textTransform: 'uppercase', fontWeight: 800 }}>
                    📊 Матрица за Интегритет:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>Имотно съответствие:</span>
                      <span style={{ fontWeight: 800, color: person.integrityCheck.propertyMatch ? '#34D399' : '#FB7185' }}>
                        {person.integrityCheck.propertyMatch ? '✓ ПЪЛНО (100%)' : '✗ РАЗМИНАВАНЕ'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>Липса на фирмени връзки:</span>
                      <span style={{ fontWeight: 800, color: person.integrityCheck.zeroCorporateTies ? '#34D399' : '#FB7185' }}>
                        {person.integrityCheck.zeroCorporateTies ? '✓ ЧИСТ' : '✗ ИМА ВРЪЗКИ'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>Чисто семейно досие:</span>
                      <span style={{ fontWeight: 800, color: person.integrityCheck.cleanFamilyTrace ? '#34D399' : '#FB7185' }}>
                        {person.integrityCheck.cleanFamilyTrace ? '✓ ЧИСТ' : '✗ РИСК (Роднини)'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #1E293B', paddingTop: '6px' }}>
                      <span style={{ color: '#38BDF8' }}>Устоял на натиск (Дела):</span>
                      <span style={{ fontWeight: 900, color: '#38BDF8' }}>
                        {person.integrityCheck.refusedPressureCases} БРОЯ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Col 2: Summary / Verified Facts */}
                <div style={{ backgroundColor: '#0B132B', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#FBBF24', textTransform: 'uppercase', fontWeight: 800 }}>
                    📑 Фактическа Констатация & Одит:
                  </span>
                  <p style={{ color: '#CBD5E1', lineHeight: '1.5', margin: 0, fontSize: '0.8rem', fontFamily: 'var(--font-sans)' }}>
                    {person.summary}
                  </p>
                </div>

                {/* Col 3: Shadow Ties / Statue Expiry (if red flag) or Merit Seal */}
                <div style={{ backgroundColor: '#0B132B', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                  {isClean ? (
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#34D399', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '6px' }}>
                        🛡️ СТАТУТ НА ИНТЕГРИТЕТА
                      </span>
                      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '10px', borderRadius: '6px', fontSize: '0.78rem', color: '#A7F3D0' }}>
                        Лицето отговаря на най-високите критерии за публична длъжност и съдийска независимост. Липсват данни за чадър или компрометиращи СРС.
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#FB7185', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '6px' }}>
                        🚨 ЗАСЕЧЕНИ СЕНЧЕСТИ СВЪРЗАНОСТИ
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {person.shadowTies?.map((tie, idx) => (
                          <div key={idx} style={{ backgroundColor: '#020617', border: '1px solid rgba(225, 29, 72, 0.3)', padding: '8px', borderRadius: '6px', fontSize: '0.72rem' }}>
                            <div style={{ color: '#F43F5E', fontWeight: 800 }}>{tie.mafiaAssetAlias}</div>
                            <div style={{ color: '#94A3B8', marginTop: '2px' }}>{tie.typeOfTie}</div>
                            {tie.caseNumber && (
                              <div style={{ color: '#E2E8F0', marginTop: '4px', fontStyle: 'italic' }}>
                                Документ: {tie.documentEvidence} ({tie.caseNumber})
                              </div>
                            )}
                            {tie.statuteExpiryMonthsLeft && (
                              <div style={{ color: '#FBBF24', fontWeight: 800, marginTop: '4px' }}>
                                ⏳ До абсолютна давност: {tie.statuteExpiryMonthsLeft} месеца!
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ borderTop: '1px solid #1E293B', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Проверка: Чл. 41 КРБ</span>
                    <Link
                      href="/signals-tracker"
                      style={{
                        color: '#38BDF8',
                        textDecoration: 'none',
                        fontWeight: 800,
                        fontSize: '0.72rem'
                      }}
                    >
                      Справка по Делото ➔
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
