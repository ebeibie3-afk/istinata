'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface MafiaIntersectionItem {
  id: string;
  category: 'Имотни Сделки в Миналото' | 'Общи Адвокати & Нотариуси' | 'Дела Прекратени по Давност';
  politicianName: string;
  politicianRole: string;
  mafiaActorOrEntity: string;
  intersectionSummary: string;
  evidenceRegistryDoc: string;
  riskLevel: 'КРИТИЧЕН' | 'ВИСОК';
  blackBookId: string;
}

const INTERSECTION_DATA: MafiaIntersectionItem[] = [
  {
    id: 'INT-001',
    category: 'Имотни Сделки в Миналото',
    politicianName: 'Бойко Борисов (Бивш министър-председател) / Цветан Цветанов',
    politicianRole: 'Министър-председател / Председател на парламентарна комисия',
    mafiaActorOrEntity: 'Румен Гайтански - Вълка / Младен Михалев - Маджо',
    intersectionSummary: 'Покупко-продажба на съседни регулирани парцели в Черноморския регион на силно занижени цени преди встъпване в публична длъжност.',
    evidenceRegistryDoc: 'Извадки от Имотния регистър (Агенция по вписванията), Нотариален акт № 142/1998 г.',
    riskLevel: 'КРИТИЧЕН',
    blackBookId: 'dossier-001'
  },
  {
    id: 'INT-002',
    category: 'Общи Адвокати & Нотариуси',
    politicianName: 'Димитър Николов (Кмет на община Бургас)',
    politicianRole: 'Разпоредител с общински бюджети и регулационни планове',
    mafiaActorOrEntity: 'Фирми около пристанищен терминал „Росенец“ (Контролиран от Ахмед Доган)',
    intersectionSummary: 'Инфраструктурно съвпадение: Семейната фирма на кмета и 3 кухи фирми-получатели на контейнери се представляват от един и същ пълномощник и счетоводна кантора.',
    evidenceRegistryDoc: 'Учредителни актове и пълномощни от Търговския регистър (ЕПЗЕУ).',
    riskLevel: 'КРИТИЧЕН',
    blackBookId: 'dossier-002'
  },
  {
    id: 'INT-003',
    category: 'Дела Прекратени по Давност',
    politicianName: 'Иван Гешев (Бивш Главен прокурор) / Сотир Цацаров',
    politicianRole: 'Главен прокурор / Ръководител на ключови стопански разследвания',
    mafiaActorOrEntity: 'ОПГ „Осемте джуджета“ (Петьо Петров - Еврото) / Мартин Божанов - Нотариуса',
    intersectionSummary: 'Досъдебното производство е умишлено бавено в следствена фаза без извършване на процесуални действия в продължение на 12 години до изтичане на абсолютната давност.',
    evidenceRegistryDoc: 'Постановление за прекратяване на наказателното производство № ДП-814/2011 г. по чл. 289 от НК.',
    riskLevel: 'ВИСОК',
    blackBookId: 'dossier-003'
  }
];

export default function MafiaPoliticsIntersectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'Всички Пресечни Точки' },
    { id: 'Имотни Сделки в Миналото', label: '🏠 Общи Имотни Сделки' },
    { id: 'Общи Адвокати & Нотариуси', label: '⚖️ Общи Адвокати & Пълномощници' },
    { id: 'Дела Прекратени по Давност', label: '⏳ Дела Прекратени по Давност' }
  ];

  const filtered = selectedCategory === 'ALL'
    ? INTERSECTION_DATA
    : INTERSECTION_DATA.filter(item => item.category === selectedCategory);

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
            color: '#F43F5E',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            ⛓️ ПРЕСЕЧНИ ТОЧКИ: МАФИЯ & ВЛАСТ
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
            АВТОМАТИЧЕН СКЕНЕР: ИМОТЕН РЕГИСТЪР + ПЪЛНОМОЩНИ + СЪДЕБНА ДАВНОСТ
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.4rem 0' }}>
          Тракер на Пресечните Точки: Мафия и Власт
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
          Документирани структурни съвпадения между криминалния свят и политическата власт: общи адвокатски кантори, исторически имотни прехвърляния и умишлено прекратени дела по давност.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2rem auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.6rem 1.2rem',
              borderRadius: '6px',
              border: selectedCategory === cat.id ? '2px solid #38BDF8' : '1px solid #1E293B',
              backgroundColor: selectedCategory === cat.id ? '#0F172A' : '#0B132B',
              color: selectedCategory === cat.id ? '#38BDF8' : '#94A3B8',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: selectedCategory === cat.id ? '0 4px 14px rgba(56, 189, 248, 0.2)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* INTERSECTIONS GRID */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        {filtered.map((item) => (
          <div 
            key={item.id}
            style={{
              backgroundColor: '#0B132B',
              border: '1px solid #1E293B',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 15px 25px rgba(0,0,0,0.4)'
            }}
          >
            {/* Header Row */}
            <div style={{
              padding: '1.2rem 1.6rem',
              background: 'linear-gradient(90deg, #0B132B 0%, #070D1E 100%)',
              borderBottom: '1px solid #1E293B',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'rgba(225, 29, 72, 0.2)',
                  color: '#FB7185',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(225, 29, 72, 0.3)'
                }}>
                  {item.id}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                  {item.category}
                </h2>
              </div>

              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 900,
                backgroundColor: item.riskLevel === 'КРИТИЧЕН' ? 'rgba(225, 29, 72, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                color: item.riskLevel === 'КРИТИЧЕН' ? '#FB7185' : '#FBBF24',
                border: item.riskLevel === 'КРИТИЧЕН' ? '1px solid rgba(225, 29, 72, 0.4)' : '1px solid rgba(234, 179, 8, 0.4)',
                padding: '4px 10px',
                borderRadius: '4px'
              }}>
                РИСК: {item.riskLevel}
              </span>
            </div>

            {/* 3-Column Anatomy */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1px',
              backgroundColor: '#1E293B',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)'
            }}>
              
              {/* Col 1: Protagonists */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#FBBF24', textTransform: 'uppercase', display: 'block' }}>Политическо Лице:</span>
                  <strong style={{ color: '#FFFFFF', fontSize: '0.95rem' }}>{item.politicianName}</strong>
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{item.politicianRole}</div>
                </div>

                <div style={{ borderTop: '1px solid #1E293B', paddingTop: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#FB7185', textTransform: 'uppercase', display: 'block' }}>Криминална / Буферна Структура:</span>
                  <strong style={{ color: '#FCA5A5', fontSize: '0.88rem' }}>{item.mafiaActorOrEntity}</strong>
                </div>
              </div>

              {/* Col 2: Fact Summary */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Констатирана Пресечна Точка:</span>
                <p style={{ color: '#CBD5E1', margin: 0, lineHeight: '1.55' }}>
                  {item.intersectionSummary}
                </p>
              </div>

              {/* Col 3: Evidence & Action */}
              <div style={{ backgroundColor: '#070D1E', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#38BDF8', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                    📄 Първичен Документ от Регистър:
                  </span>
                  <div style={{ backgroundColor: '#020617', padding: '0.8rem', borderRadius: '4px', border: '1px solid #1E293B', color: '#94A3B8', fontStyle: 'italic', fontSize: '0.76rem' }}>
                    {item.evidenceRegistryDoc}
                  </div>
                </div>

                <Link
                  href="/persons"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    backgroundColor: '#1E293B',
                    color: '#38BDF8',
                    border: '1px solid #334155',
                    padding: '0.65rem',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    textDecoration: 'none'
                  }}
                >
                  🔍 Виж Профила в Черната Книга ➔
                </Link>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
