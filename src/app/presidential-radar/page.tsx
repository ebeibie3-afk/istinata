'use client';

import React from 'react';
import Link from 'next/link';

interface MafiaConnection {
  entityName: string;
  relationType: string;
  evidenceDocument: string;
}

interface CandidateDossier {
  id: string;
  candidateName: string;
  currentPublicStatus: string;
  shadowBackers: string[];
  campaignFinancingSource: string;
  mafiaVulnerabilities: MafiaConnection[];
  crossReferenceId: string;
}

const presidentialCandidatesData: CandidateDossier[] = [
  {
    id: 'PRES-2026-01',
    candidateName: 'Андрей Гюров & Георги Кандев (Тандем за Президент & Вицепрезидент)',
    currentPublicStatus: 'Бивш служебен премиер / Подуправител на БНБ (Гюров) & Бивш и.д. главен секретар на МВР и директор на ОДМВР-Благоевград (Кандев)',
    shadowBackers: ['Инициативен комитет от Гоце Делчев и Благоевград', 'Партийни кръгове от „Продължаваме Промяната"', 'Академични и банкови експертни среди'],
    campaignFinancingSource: 'Официална дарителска кампания през Инициативен комитет, банкови преводи от физически лица и доброволен труд',
    mafiaVulnerabilities: [
      {
        entityName: 'Скандалът „Картофа", МВР Силови Лобита & Имотът в „Делта Хил"',
        relationType: 'Обвинения от бизнесмена Юлиян Янков („Картофа") за искан дял и подкуп; сигнали от Кандев/Гюров за координиран заговор на бивш началник („Светльо") и заповед „Колеги, прибирайте се" при контрабандни акции. Декларирана къща в елитното затворено селище „Делта Хил" (с. Кладница) и ипотечни кредити за над 148 000 лв., използвани като мотив за напускане на МВР.',
        evidenceDocument: 'Преписка в СГП, декларации пред КПКОНПИ/Сметна палата и разследвания на BIRD.bg за имотите на висши полицаи в „Делта Хил".'
      },
      {
        entityName: 'БНБ Несъвместимост, Фирмени Участия („Йонтех") & Дело в СЕС',
        relationType: 'Установена несъвместимост от КПКОНПИ за Андрей Гюров поради недекларирано и запазено съдружие в „Йонтех Инженеринг" ООД и участие в управителни съвети на сдружения („Голф клуб Благоевград", институт „Паница"); отстраняване от БНБ и дело пред Съда на Европейския съюз (СЕС дело C-611/24).',
        evidenceDocument: 'Решение на КПКОНПИ № РС-120/2024, преюдициално запитване от ВАС до СЕС (Люксембург) и Търговски регистър.'
      }
    ],
    crossReferenceId: 'dossier-gyurov-kandev-001'
  },
  {
    id: 'PRES-2026-02',
    candidateName: 'Бойко Борисов (или посочен от ГЕРБ кандидат)',
    currentPublicStatus: 'Лидер на ПП ГЕРБ, бивш трикратен министър-председател',
    shadowBackers: ['Едри пътностроителни консорциуми (АМ „Хемус", инхаус поръчки)', 'Общински кметски феодали', 'Хазартни и строителни конгломерати'],
    campaignFinancingSource: 'Корпоративни дарения през служители на минимална заплата в строителни фирми, общински подизпълнители',
    mafiaVulnerabilities: [
      {
        entityName: 'Инхаус аванси за 1.18 млрд. лв. & КТБ/ББР кредитни експозиции',
        relationType: 'Политическо управление и пренасочване на държавен капиталов ресурс към буферни дружества и сламки за теглене на кеш.',
        evidenceDocument: 'Одитен доклад № 0300100421 на Сметната палата на РБ и доклади на МРРБ.'
      }
    ],
    crossReferenceId: 'dossier-borisov-002'
  },
  {
    id: 'PRES-2026-03',
    candidateName: 'Делян Пеевски (ДПС - Ново Начало / Фаворизиран кандидат)',
    currentPublicStatus: 'Председател на ПГ на ДПС - Ново Начало / Санкциониран по глобалния закон „Магнитски"',
    shadowBackers: ['Банкови експозиции от фалиралата КТБ и ББР', 'Охранителни и спедиторски дружества (Pigeon Express)', 'Медийни конгломерати и контрол върху регулаторите'],
    campaignFinancingSource: 'Офшорни капитали, кредитни линии от контролирани държавни институции, корпоративни мрежи в Северозапада и Родопите',
    mafiaVulnerabilities: [
      {
        entityName: 'Санкции на САЩ (OFAC / Магнитски) & Досиетата „Пандора"',
        relationType: 'Доказана водеща роля в корупционни схеми, изнудване на бизнеса и контрол върху прокурорски и съдебни квоти.',
        evidenceDocument: 'Официален санкционен акт на Департамента на финансите на САЩ (US Treasury OFAC) и санкции на Обединеното кралство.'
      }
    ],
    crossReferenceId: 'dossier-peevski-003'
  },
  {
    id: 'PRES-2026-04',
    candidateName: 'Костадин Костадинов (Възраждане)',
    currentPublicStatus: 'Председател на ПП „Възраждане", народен представител',
    shadowBackers: ['Прокремълски мрежи и фондации', 'Финансови дарители от субсидийния партиен фонд', 'Свързани лица с имотни придобивания'],
    campaignFinancingSource: 'Държавна партийна субсидия, дарения от партийни членове и структури в чужбина',
    mafiaVulnerabilities: [
      {
        entityName: 'Сметна палата: Партийна субсидия & Имоти край Варна',
        relationType: 'Разследвания за използване на държавна партийна субсидия за закупуване на лични луксозни недвижими имоти (къща във варненското село Константиново).',
        evidenceDocument: 'Одити на Сметната палата за финансовата отчетност на политическите партии и досъдебни проверки на прокуратурата.'
      }
    ],
    crossReferenceId: 'dossier-kostadinov-004'
  },
  {
    id: 'PRES-2026-05',
    candidateName: 'Ивелин Михайлов (Величие / Исторически Парк)',
    currentPublicStatus: 'Идеолог на ПП „Величие", предприемач и инвеститор в с. Неофит Рилски',
    shadowBackers: ['Инвеститори във финансовата схема „Исторически парк"', 'Охранителни и паравоенни формирования („Български юнак")'],
    campaignFinancingSource: 'Привличане на средства от физически лица под формата на нерегламентирани акции, заеми и ипотечни задължения',
    mafiaVulnerabilities: [
      {
        entityName: 'Финансова пирамида „Исторически парк" & КФН предупреждения',
        relationType: 'Доклади на Комисията за финансов надзор (КФН) и ДАНС за финансова пирамидална структура, фиктивно оценяване на активи и липса на проспект.',
        evidenceDocument: 'Официални предупреждения на КФН (2019–2024), доклади на Парламентарната комисия за „Исторически парк" и проверки на НАП.'
      }
    ],
    crossReferenceId: 'dossier-mihaylov-005'
  },
  {
    id: 'PRES-2026-06',
    candidateName: 'Делян Добрев / Технократско лоби на ГЕРБ',
    currentPublicStatus: 'Председател на Комисията по енергетика в Народното събрание',
    shadowBackers: ['Енергийни ВЕИ инвеститори', 'Хасковски роднински консорциуми („Кумгейт")', 'Търговци на електроенергия и газ'],
    campaignFinancingSource: 'Дарения от компании в сектор възобновяема енергия и общински изпълнители по саниране',
    mafiaVulnerabilities: [
      {
        entityName: 'Схемата „Кумгейт" & Общински обществени поръчки в Хасково',
        relationType: 'Назначаване на първи братовчеди, кумове и съученици на ключови позиции в Община Хасково и печелене на обществени поръчки за милиони.',
        evidenceDocument: 'Официални разкрития и сигнали в КПКОНПИ за конфликт на интереси и договори за саниране на жилищни сгради.'
      }
    ],
    crossReferenceId: 'dossier-dobrev-006'
  }
];

export default function PresidentialRadarPage() {
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
            color: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            🛰️ ПРЕДИЗБОРЕН МОНИТОРИНГ: ОПЕРАЦИЯ „СВЕТЛИНА"
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
            КРЪСТОСАН ОСИНТ СКЕНЕР: ДАРЕНИЯ + ЦАИС ЕОП + ОФШОРКИ
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.4rem 0' }}>
              Президентски Радар 2026
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
              Ранно засичане и картографиране на зависимости на потенциални кандидати за висшия държавен пост. 
              Проследяване на финансирането на кампаниите, кухите дарители и скритите им бизнес партньори.
            </p>
          </div>

          <Link
            href="/presidential-radar/donor-analytics"
            style={{
              backgroundColor: '#E11D48',
              color: '#FFFFFF',
              padding: '0.75rem 1.4rem',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)'
            }}
          >
            🛡️ Отвори Алгоритъм „Скенер Сламки" ➔
          </Link>
        </div>
      </div>

      {/* CARD GRID */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {presidentialCandidatesData.map((candidate) => (
          <div key={candidate.id} style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px rgba(0,0,0,0.4)' }}>
            
            {/* Top Bar */}
            <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, #0B132B 0%, #070D1E 100%)', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: '#F59E0B', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>🎯 КАНДИДАТ-ПРОФИЛ:</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', margin: '2px 0 0 0' }}>
                  {candidate.candidateName}
                </h2>
                <div style={{ color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {candidate.currentPublicStatus}
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', backgroundColor: '#020617', border: '1px solid #1E293B', color: '#FBBF24', padding: '4px 10px', borderRadius: '4px', fontWeight: 800 }}>
                РЕФЕРЕНЦИЯ: {candidate.id}
              </span>
            </div>

            {/* 3-Column Intel Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1px',
              backgroundColor: '#1E293B',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)'
            }}>
              
              {/* Col 1: Backers & Financing */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    👥 Скрити Кукловоди & Олигарси:
                  </span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {candidate.shadowBackers.map((backer, idx) => (
                      <li key={idx} style={{ color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                        {backer}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    💰 Източници на Финансиране:
                  </span>
                  <div style={{ color: '#CBD5E1', lineHeight: '1.5' }}>{candidate.campaignFinancingSource}</div>
                </div>
              </div>

              {/* Col 2: Mafia & Underworld Links */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.68rem', color: '#FB7185', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>
                  🏴‍☠️ Засечени Връзки с Подземния Свят:
                </span>
                {candidate.mafiaVulnerabilities.map((vuln, idx) => (
                  <div key={idx} style={{ backgroundColor: '#020617', padding: '0.9rem', borderRadius: '6px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                    <div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem' }}>{vuln.entityName}</div>
                    <p style={{ color: '#94A3B8', fontSize: '0.78rem', margin: '4px 0 0 0', lineHeight: '1.4' }}>{vuln.relationType}</p>
                  </div>
                ))}
              </div>

              {/* Col 3: Evidence & Black Book Link */}
              <div style={{ backgroundColor: '#070D1E', padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#FBBF24', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '6px' }}>
                    📄 Първични Следи и Документи:
                  </span>
                  <div style={{ backgroundColor: '#020617', padding: '1rem', borderRadius: '6px', border: '1px solid #1E293B', color: '#CBD5E1', fontStyle: 'italic', lineHeight: '1.5' }}>
                    {candidate.mafiaVulnerabilities[0].evidenceDocument}
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
                    padding: '0.75rem',
                    borderRadius: '6px',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    textDecoration: 'none'
                  }}
                >
                  🔍 Виж Пълните Бизнес Обвързаности ➔
                </Link>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
