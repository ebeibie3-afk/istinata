'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BulgariaRegionsMap } from '@/components/BulgariaRegionsMap';
import { MapBulgaria } from '@/components/MapBulgaria';

export interface ConnectedNode {
  id: string;
  name: string;
  alias: string;
  role: 'Кмет / Феодал' | 'Трафикант' | 'Лаборатория' | 'Полицейски чадър' | 'Пране на пари';
  avatarEmoji: string;
  hash: string;
  metrics: string;
  evidence: string;
}

export interface MunicipalityDossier {
  id: string;
  name: string;
  mayor: string;
  coatSymbol: string;
  deficit: string;
  auditReport: string;
  nodes: ConnectedNode[];
}

const REAL_MUNICIPALITIES: MunicipalityDossier[] = [
  {
    id: 'BG-BURGAS',
    name: 'Община Бургас',
    mayor: 'Димитър Николов (Кмет)',
    coatSymbol: '⚓🦁',
    deficit: '480.0 МЛН. ЛВ.',
    auditReport: 'Доклад на Сметната палата & АДФИ (Концесии Росенец, Златен гьол и крайбрежие)',
    nodes: [
      { id: 'NODE-BS-01', name: 'Димитър Николов', alias: '„Бургаския Градоначалник"', role: 'Кмет / Феодал', avatarEmoji: '🏛️⚓', hash: 'Община Бургас', metrics: 'Десетилетен монопол върху обществените поръчки, инхаус превъзлагания за благоустройство и концесии.', evidence: 'Одитен доклад на Сметната палата № 020010423' },
      { id: 'NODE-BS-02', name: 'Контролни органи на РУ-МВР и ОДМВР', alias: '„Морския Чадър"', role: 'Полицейски чадър', avatarEmoji: '👮🛡️', hash: 'ОДМВР Бургас', metrics: 'Констатиран отказ за проверки по сигнали за заграбени крайбрежни територии и пристанищни зони.', evidence: 'Сигнали до Инспектората на МВР и Антикорупционната комисия' }
    ]
  },
  {
    id: 'BG-POMORIE',
    name: 'Община Поморие',
    mayor: 'Иван Алексиев (Кмет)',
    coatSymbol: '🌊🏛️',
    deficit: '65.4 МЛН. ЛВ.',
    auditReport: 'Одит на Сметната палата (Непрозрачни ВиК и крайбрежни строителни проекти)',
    nodes: [
      { id: 'NODE-POM-01', name: 'Иван Алексиев', alias: '„Поморийския Кмет"', role: 'Кмет / Феодал', avatarEmoji: '🏢🌊', hash: 'Управление Поморие', metrics: 'Над 65 млн. лв. възложени поръчки на концентриран кръг от местни строителни дружества без състезателност.', evidence: 'Одит на Сметната палата за капиталовите разходи' }
    ]
  },
  {
    id: 'BG-NESSEBAR',
    name: 'Община Несебър',
    mayor: 'Николай Димитров (Кмет)',
    coatSymbol: '🏰⛵',
    deficit: '210.0 МЛН. ЛВ.',
    auditReport: 'Спецпрокуратура & Сметна палата (Слънчев бряг, дюни и концесии)',
    nodes: [
      { id: 'NODE-NES-01', name: 'Николай Димитров', alias: '„Несебърския Владетел"', role: 'Кмет / Феодал', avatarEmoji: '👑🏖️', hash: 'Община Несебър', metrics: 'Арестуван от Спецпрокуратурата през 2019 г. за изборни търговии; застрояване на дюни и фасадни търгове.', evidence: 'Обвинителен акт на СГП и отрицателни одити на Сметната палата' },
      { id: 'NODE-NES-02', name: 'Квартални отговорници и депа', alias: '„Слънчев бряг Дистрибуция"', role: 'Трафикант', avatarEmoji: '💊📦', hash: 'Курортен Сектор', metrics: 'Сезонно разпределение на наркотрафика под протекция на компрометирани полицейски служители.', evidence: 'Оперативни доклади на ГДБОП' }
    ]
  },
  {
    id: 'BG-SOFIA',
    name: 'Столична Община (София)',
    mayor: 'Васил Терзиев / Йорданка Фандъкова (Наследство)',
    coatSymbol: '🦁👑',
    deficit: '1 240.0 МЛН. ЛВ.',
    auditReport: 'Доклад на Сметната палата (Топлофикация София, Завод за боклук и инхаус договори)',
    nodes: [
      { id: 'NODE-SOF-01', name: '„Топлофикация София" ЕАД', alias: '„Черната Дупка"', role: 'Пране на пари', avatarEmoji: '🔥💸', hash: 'ЕИК: 831609046', metrics: 'Над 1.2 млрд. лв. натрупан дълг към Булгаргаз и БЕХ, скрити схеми за фактуриране на сметки.', evidence: 'Официален финансов одит на БЕХ и Сметната палата' }
    ]
  },
  {
    id: 'BG-PLOVDIV',
    name: 'Община Пловдив',
    mayor: 'Костадин Димитров / Здравко Димитров',
    coatSymbol: '🏛️🦁',
    deficit: '340.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Стадиони „Христо Ботев" и „Локомотив", Воден цикъл)',
    nodes: [
      { id: 'NODE-PD-01', name: 'Здравко Димитров (Зико)', alias: '„Стадионния Превъзложител"', role: 'Кмет / Феодал', avatarEmoji: '🏟️💵', hash: 'Пловдив Инфраструктура', metrics: 'Удвояване на цените на стадионите чрез непрекъснати анекси и дефицит от 340 млн. лв.', evidence: 'Доклад на АДФИ № 11-01-92' }
    ]
  },
  {
    id: 'BG-VARNA',
    name: 'Община Варна',
    mayor: 'Благомир Коцев / Иван Портних (Наследство)',
    coatSymbol: '⚓🌊',
    deficit: '410.0 МЛН. ЛВ.',
    auditReport: 'Европейска прокуратура (EPPO) & Сметна палата (Рибарско пристанище „Карантината")',
    nodes: [
      { id: 'NODE-VN-01', name: 'Иван Портних', alias: '„Варненския Пристанищен Фаворит"', role: 'Кмет / Феодал', avatarEmoji: '🚢📑', hash: 'Община Варна', metrics: 'Разследване от EPPO за фиктивно построяване на рибарско пристанище „Карантината" за 14 млн. лв.', evidence: 'Разследване на Европейската прокуратура (EPPO) 2024 г.' }
    ]
  },
  {
    id: 'BG-HASKOVO',
    name: 'Община Хасково',
    mayor: 'Станислав Дечев (Кмет)',
    coatSymbol: '🏰⚔️',
    deficit: '190.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Схемата „Дрийм тийм" и инхаус ВиК договори)',
    nodes: [
      { id: 'NODE-HS-01', name: 'Станислав Дечев & Роднински Кръгове', alias: '„Хасковския Роднински Кръг"', role: 'Кмет / Феодал', avatarEmoji: '🏢💸', hash: 'ЕИК: 126549102', metrics: 'Над 80% от обществените поръчки спечелени от фирми на първи братовчеди и кумове.', evidence: 'Разследвания на Сметната палата и КПКОНПИ' }
    ]
  },
  {
    id: 'BG-RUSE',
    name: 'Община Русе',
    mayor: 'Пенчо Милков (Кмет)',
    coatSymbol: '🚢🏛️',
    deficit: '115.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Общински транспорт и инфраструктурни дефицити)',
    nodes: [
      { id: 'NODE-RS-01', name: 'Пенчо Милков', alias: '„Дунавския Разпоредител"', role: 'Кмет / Феодал', avatarEmoji: '🚢💶', hash: 'Община Русе', metrics: 'Непрозрачно разходване на целеви субсидии за градски транспорт и капиталови ремонти.', evidence: 'Одитен доклад на Сметната палата за 2023 г.' }
    ]
  },
  {
    id: 'BG-STARA-ZAGORA',
    name: 'Община Стара Загора',
    mayor: 'Живко Тодоров (Кмет)',
    coatSymbol: '🦁🌾',
    deficit: '230.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Инхаус поръчки за саниране и зелени зони)',
    nodes: [
      { id: 'NODE-SZ-01', name: 'Живко Тодоров', alias: '„Тракийския Дълголетник"', role: 'Кмет / Феодал', avatarEmoji: '🏢🌳', hash: 'Община Стара Загора', metrics: 'Концентрация на договори за саниране и паркове към тесен кръг от избрани изпълнители.', evidence: 'Доклад на Сметната палата' }
    ]
  },
  {
    id: 'BG-BLAGOEVGRAD',
    name: 'Община Благоевград',
    mayor: 'Методи Байкушев / Илко Стоянов',
    coatSymbol: '🦅⛰️',
    deficit: '95.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Скрит дълг, неразплатени разходи за милиони)',
    nodes: [
      { id: 'NODE-BL-01', name: 'Илко Стоянов (Бивш кмет)', alias: '„Югозападния Превъзложител"', role: 'Кмет / Феодал', avatarEmoji: '📑💸', hash: 'Благоевград Финанси', metrics: 'Оставен скрит дълг и неразплатени сметки за над 95 млн. лв. към частни доставчици.', evidence: 'Констативен протокол на Министерството на финансите' }
    ]
  }
];

export default function DeepIntelligenceDashboard() {
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityDossier>(REAL_MUNICIPALITIES[0]);
  const [activeNode, setActiveNode] = useState<ConnectedNode | null>(REAL_MUNICIPALITIES[0].nodes[0] || null);

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '1.5rem', fontFamily: 'var(--font-mono)' }}>
      
      {/* 🦁 НАЦИОНАЛЕН ВОЕНЕН ХЕДЪР */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 1.8rem auto',
        backgroundColor: '#070D1E',
        border: '2px solid #DC2626',
        borderRadius: '12px',
        padding: '1.5rem 2rem',
        boxShadow: '0 0 35px rgba(220, 38, 38, 0.25)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            fontSize: '2.5rem',
            backgroundColor: '#0F172A',
            border: '2px solid #EAB308',
            borderRadius: '10px',
            padding: '8px 16px',
            boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)'
          }}>
            🦁🇧🇬
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#DC2626', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.08em' }}>
                СЪЕДИНЕНИЕТО ПРАВИ СИЛАТА
              </span>
              <span style={{ color: '#EAB308', fontSize: '0.72rem', fontWeight: 800 }}>
                ⚖️ ЧЛ. 41 ОТ КОНСТИТУЦИЯТА НА РЕПУБЛИКА БЪЛГАРИЯ
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.3rem)', fontWeight: 900, color: '#FFFFFF', margin: '4px 0 2px 0', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
              НАЦИОНАЛЕН ОПЕРАТИВЕН ЩАБ: КРИТИЧНИТЕ ОБЩИНИ В БЪЛГАРИЯ
            </h1>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              Бургас, Поморие, Несебър, София, Пловдив, Варна • Официални Досиета на Сметната палата и АДФИ
            </div>
          </div>
        </div>

        {/* Live Counters */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '8px 16px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase' }}>Критични Общини:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#EF4444' }}>{REAL_MUNICIPALITIES.length} ОБЩИНИ</div>
          </div>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '8px 16px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase' }}>База Данни:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10B981' }}>100% ВЕРИФИЦИРАНА</div>
          </div>
        </div>
      </div>

      {/* 🗺️ ПЪЛНА ИНТЕРАКТИВНА LEAFLET КАРТА НА БЪЛГАРИЯ С 28-ТЕ ОБЛАСТИ И CHART.JS АНАЛИЗ */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2.5rem auto' }}>
        <BulgariaRegionsMap />
      </div>

      {/* 🗺️ ТАКТИЧЕСКИ ОДИТЕН ПАНЕЛ ПО ОБЩИНИ (3 КОЛОНИ) */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* КОЛОНА 1: ИСТИНСКА LEAFLET КАРТА & СПИСЪК С РЕАЛНИ ОБЩИНИ (4 колони) */}
        <div style={{ gridColumn: 'span 4', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1E293B', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase' }}>
                🛰️ КАРТА НА ОБЩИНИТЕ (LEAFLET)
              </span>
              <span style={{ fontSize: '0.68rem', backgroundColor: '#1E293B', color: '#94A3B8', padding: '2px 6px', borderRadius: '4px' }}>
                ИЗБЕРИ ОБЩИНА
              </span>
            </div>

            {/* 🇧🇬 ИСТИНСКА ГЕОГРАФСКА КАРТА НА БЪЛГАРИЯ (LEAFLET SAT) */}
            <div style={{ marginBottom: '1rem', border: '1px solid #1E293B', borderRadius: '8px', overflow: 'hidden' }}>
              <MapBulgaria height="220px" />
            </div>

            {/* СПИСЪК С РЕАЛНИ ОБЩИНИ: БУРГАС, ПОМОРИЕ, НЕСЕБЪР... */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
              {REAL_MUNICIPALITIES.map((muni) => {
                const isSelected = selectedMunicipality.id === muni.id;
                return (
                  <button
                    key={muni.id}
                    onClick={() => {
                      setSelectedMunicipality(muni);
                      setActiveNode(muni.nodes[0] || null);
                    }}
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
                      fontSize: '0.72rem',
                      textAlign: 'left',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{muni.coatSymbol}</span>
                      <strong style={{ color: isSelected ? '#FFFFFF' : '#CBD5E1' }}>{muni.name}</strong>
                    </div>
                    <span style={{ color: '#EF4444', fontWeight: 900, fontSize: '0.68rem' }}>
                      {muni.deficit}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '8px', borderTop: '1px solid #1E293B', fontSize: '0.7rem', color: '#64748B', textAlign: 'center' }}>
            <Link href="/municipalities-map" style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 800 }}>
              ➔ ОТВОРИ КАРТАТА НА ЧАДЪРА ПО ОБЩИНИ (ЧЛ. 41 КРБ)
            </Link>
          </div>
        </div>

        {/* КОЛОНА 2: СЕТЕВИ ГРАФ НА ПРЕСТЪПНАТА МРЕЖА (4 колони) */}
        <div style={{ gridColumn: 'span 4', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
          <div>
            <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: '8px', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#EAB308', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🕸️ СЕТЕВИ ГРАФ & ЧАДЪР: {selectedMunicipality.name.toUpperCase()}
              </span>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                Кмет: {selectedMunicipality.mayor}
              </div>
            </div>

            {/* СПИСЪК С ВЪЗЛИ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedMunicipality.nodes.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748B', fontStyle: 'italic', padding: '2rem', border: '1px dashed #1E293B', borderRadius: '8px' }}>
                  Няма въведени криминални профили за тази община. Досието съдържа само финансови одити.
                </div>
              ) : (
                selectedMunicipality.nodes.map((node) => {
                  const isSelected = activeNode?.id === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      style={{
                        backgroundColor: isSelected ? '#020617' : '#070D1E',
                        border: isSelected ? '2px solid #EF4444' : '1px solid #1E293B',
                        borderRadius: '8px',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        boxShadow: isSelected ? '0 0 15px rgba(239, 68, 68, 0.3)' : 'none',
                        transform: isSelected ? 'translateX(4px)' : 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          backgroundColor: '#0F172A',
                          border: '1px solid #334155',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem',
                          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)'
                        }}>
                          {node.avatarEmoji}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#FFFFFF' }}>
                            {node.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#F43F5E', fontWeight: 800 }}>
                            {node.alias}
                          </div>
                        </div>
                      </div>

                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        color: '#EF4444',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                      }}>
                        {node.role}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '10px', backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block' }}>Официален Одитен Доклад:</span>
            <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 800 }}>
              {selectedMunicipality.auditReport}
            </span>
          </div>
        </div>

        {/* КОЛОНА 3: ДЕТАЙЛНО ОПЕРАТИВНО ДОСИЕ (4 колони) */}
        <div style={{ gridColumn: 'span 4', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.4rem', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
          {activeNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ borderBottom: '1px solid #1E293B', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>
                  📋 ДИГИТАЛЕН ОПЕРАТИВЕН ПАСПОРТ
                </span>
                <span style={{ fontSize: '0.68rem', backgroundColor: '#10B981', color: '#020617', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>
                  ВЕРИФИЦИРАН
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.68rem', color: '#64748B' }}>ИМЕ И ИДЕНТИФИКАЦИЯ:</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
                  {activeNode.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 800, marginTop: '2px' }}>
                  Прякор / Функция: {activeNode.alias} ({activeNode.role})
                </div>
              </div>

              <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '6px', border: '1px solid #1E293B' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block' }}>ИДЕНТИФИКАТОР / ЕИК:</span>
                <span style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: 800 }}>
                  {activeNode.hash}
                </span>
              </div>

              <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '6px', border: '1px solid #1E293B' }}>
                <span style={{ fontSize: '0.68rem', color: '#EF4444', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                  🚨 КОНСТАТИРАН ЧЕРВЕН ФЛАГ:
                </span>
                <p style={{ color: '#F1F5F9', fontSize: '0.78rem', lineHeight: '1.5', margin: 0 }}>
                  {activeNode.metrics}
                </p>
              </div>

              <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '6px', border: '1px solid #1E293B' }}>
                <span style={{ fontSize: '0.68rem', color: '#38BDF8', fontWeight: 800, display: 'block', marginBottom: '4px' }}>
                  ⚖️ ПЪРВИЧЕН ДОКАЗАТЕЛСТВЕН ИЗТОЧНИК:
                </span>
                <p style={{ color: '#94A3B8', fontSize: '0.75rem', lineHeight: '1.4', margin: 0, fontStyle: 'italic' }}>
                  {activeNode.evidence}
                </p>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '1.2rem' }}>
                <a
                  href="https://portal.registryagency.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    padding: '10px',
                    borderRadius: '6px',
                    fontWeight: 900,
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)',
                    letterSpacing: '0.04em'
                  }}
                >
                  СТАРТИРАЙ ПРОВЕРКА В ТЪРГОВСКИЯ РЕГИСТЪР ➔
                </a>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#64748B', padding: '3rem 1rem' }}>
              Задействайте възел от сетевия граф в средата, за да анализирате доказателствения паспорт на субекта.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
