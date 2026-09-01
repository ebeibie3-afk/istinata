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
    id: 'FLOW-NATIONAL-ALL-MUNICIPALITIES',
    title: 'ПЪЛНА НАЦИОНАЛНА КАРТОТЕКА С ИМЕНА НА ДИЛЪРИ & ОТГОВОРНИЦИ ПО ОБЩИНИ',
    category: 'Транснационална & Общинска Престъпност',
    amountBgn: '16 400 000 000 лв.',
    amountEur: '8 385 000 000 €',
    primaryBeneficiaries: [
      'Върховна Власт & Олигархия: Делян Пеевски, Бойко Борисов, Ахмед Доган',
      'Прокурорски & Силов Чадър: Борислав Сарафов, Иван Гешев, Петьо Петров (Еврото), Мартин Божанов (Нотариуса)',
      'Международни Босове & Канали: Христофорос Аманатидис (Таки), Евелин Банев (Брендо), Размиг Чакърян (Ами), Евролаб 2011',
      'Община Бургас: Димитър Желязков (Митьо Очите), Иван Пъндев, Георги Дробеца, Тодор Желязков (Тартора), Иван Попа',
      'Община Поморие: Христо Широков (Широката), Добри Добрев, Иво Йовов',
      'Община Несебър & Слънчев Бряг: Венцислав Христов (Лавацата), Радослав Николов (Рачо), Данчо Пръча, Пейко Попов',
      'Кметство Свети Влас: Братя Диневи (Йордан и Динко Диневи), местни диспечери',
      'Общини Созопол, Царево, Приморско, Айтос, Карнобат: Локални отговорници и плажни депа',
      'Столична Община (София): Радо Ланеца, Весо Паяка, Радо Темерута, Росен Капитана, Митко Каратиста',
      'Общини Божурище, Самоков, Сливница: Валентин Бореца, местни складови координатори',
      'Общини Пловдив, Пазарджик, Велинград, Септември, Белово: Златомир Иванов (Баретата), Иван Цонков (Джиджито), ромски кланове',
      'Общини Варна, Добрич, Балчик, Каварна: Николай Тошев (Чирпанския), Янко Фашиста',
      'Общини Плевен, Русе, Враца, Монтана, Видин: Камен Балбузанов (Куката), Мирослав Маринов',
      'Общини Благоевград, Петрич, Сандански, Хасково, Кърджали: Локални каналджии, фамилни кланове',
      'Спедиторски Канал: Pigeon Express (Александър Апостолов, Елена Петлешкова)'
    ],
    bufferCompanies: [
      { name: '„Автомагистрали" ЕАД / ДКК', eik: '831610486', role: 'Държавен инхаус инструмент' },
      { name: '„Аркус - Сигурност Бургас" ЕООД', eik: '102859341', role: 'Охранителна шапка на курортния рекет' },
      { name: '„Евролаб 2011" / „Интерфорум"', eik: '201847192', role: 'Фитосанитарна лаборатория на Капитан Андреево' },
      { name: '„Пигеон експрес" ЕООД', eik: '207705342', role: 'Куриерски разнос и прекурсори (Апостолов / Петлешкова)' }
    ],
    cashWithdrawalPoints: [
      'Интернешънъл Асет Банк АД – 420 млн. лв. в чували и сакове',
      'Каси на чейндж бюра, казина и лизингови къщи в Бургас, Слънчев бряг, Поморие, София, Пловдив и Варна',
      'P2P портфейли (USDT/TRON), Revolut мулета, EasyPay и криптомати'
    ],
    offshoreDestinations: ['Дубай (ОАЕ) - #DubaiUnlocked', 'Кипър (Лимасол)', 'Панама', 'Белиз', 'Испания (Барселона)'],
    legalAuditEvidence: 'Присъди по НОХД № 2145/2018 г. (СНС), НОХД № 451/2021 г. (СГС), бюлетини на DEA, ДАНС, ГДБОП и оперативни реализации в 28-те области на България.',
    status: 'Кръстосана Верификация: Чл. 41 от Конституцията'
  },
  {
    id: 'FLOW-COASTAL-REPORTING',
    title: 'ОТЧИТАНЕ В БУРГАС, ПОМОРИЕ И СЛЪНЧЕВ БРЯГ С ИМЕНА',
    category: 'Регионално Черноморско Отчитане',
    amountBgn: '1 250 000 000 лв. годишно',
    amountEur: '639 000 000 €',
    primaryBeneficiaries: ['Димитър Желязков (Очите)', 'Христо Широков (Широката)', 'Венцислав Христов (Лавацата)', 'Радослав Николов (Рачо)', 'Добри Добрев', 'Иво Йовов', 'Братя Диневи'],
    bufferCompanies: [
      { name: '„Аркус Сигурност Бургас" ЕООД', eik: '102859341', role: 'Охрана на дискотеки и такса спокойствие' }
    ],
    cashWithdrawalPoints: ['Чейндж бюра и заложни къщи в Бургас, Слънчев бряг и Поморие'],
    offshoreDestinations: ['Дубай (ОАЕ)', 'Кипър'],
    legalAuditEvidence: 'Специализиран наказателен съд - ОПГ на Митьо Очите НОХД 2145/2018 г.',
    status: 'Потвърдена Оперативна Схема'
  }
];

export default function FlowVisualizer() {
  const [activeTab, setActiveTab] = useState<'national_municipalities' | 'coastal'>('national_municipalities');
  const [selectedChannel, setSelectedChannel] = useState<CorruptionChannel>(FLOW_CHANNELS[0]);

  // 🌟 НАЦИОНАЛНА ДИАГРАМА С ИЗРИЧНИ ИМЕНА ЗА ВСИЧКИ ОБЩИНСКИ КЛЪСТЕРИ В БЪЛГАРИЯ
  const nationalMunicipalitiesChart = `
graph TD
    PEEVSKI["Делян Пеевски (ДПС-Ново Начало)"]
    BORISOV["Бойко Борисов (ГЕРБ)"]
    SARAFOV["Борислав Сарафов и Иван Гешев (Прокуратура)"]
    EUROTO["Петьо Петров-Еврото и Мартин Нотариуса"]
    IMPORTERS["Таки и Брендо / Размиг Чакърян-Ами (Евролаб 2011)"]
    
    PEEVSKI & BORISOV --> SARAFOV
    SARAFOV --> EUROTO
    EUROTO --> IMPORTERS

    subgraph ОБЛАСТ_БУРГАС ["ОБЛАСТ БУРГАС И КУРОРТИ"]
        OCHITE["Димитър Желязков - Митьо Очите (Аркус)"]
        PANDEV["Иван Пъндев (Главен диспечер Бургас)"]
        DROBETSA["Георги Дробеца (Меден Рудник и Победа)"]
        TARTORA["Тодор Тартора (Славейков и Изгрев)"]
        POPA["Иван Попа (Лазур и Морска градина)"]
        
        SHIROKOV["Христо Широков - Широката (Поморие)"]
        DOBRI["Добри Добрев (Уличен надзор Поморие)"]
        IVO["Иво Йовов (Складово депо Поморие)"]

        LAVATSA["Венцислав Христов - Лавацата (Сл. бряг Клубове)"]
        RACHO["Радослав Николов - Рачо (Несебър и Равда)"]
        PRACHA["Данчо Пръча (Алеи и Плажни барове)"]
        PEYKO["Пейко Попов (Складово депо Несебър)"]
        DINEVI["Братя Диневи (Свети Влас и Марина)"]

        SOZOPOL_BOSS["Дилъри Созопол (Градина и Смокиня)"]
        TSAREVO_BOSS["Дилъри Царево, Лозенец, Приморско и Китен"]
        AITOS_KARNOBAT["Отговорници Айтос, Карнобат и Руен"]

        OCHITE --> PANDEV
        PANDEV --> DROBETSA & TARTORA & POPA

        OCHITE --> SHIROKOV
        SHIROKOV --> DOBRI & IVO

        OCHITE --> LAVATSA & RACHO & PRACHA
        RACHO --> PEYKO
        OCHITE --> DINEVI

        OCHITE --> SOZOPOL_BOSS & TSAREVO_BOSS & AITOS_KARNOBAT
    end

    subgraph ОБЛАСТ_СОФИЯ ["ОБЛАСТ СОФИЯ И РЕГИОН"]
        LANETSA["Радо Ланеца и Весо Паяка (Банда Чукове)"]
        TEMERUTA["Радослав Иванов - Темерута (Люлин и Надежда)"]
        KAPITANA["Росен Капитана (Студентски град и Лозенец)"]
        KARATISTA["Митко Каратиста (Център и Охрана)"]
        BORETSA["Валентин Бореца (Самоков и Боровец)"]

        LANETSA --> TEMERUTA & KAPITANA & KARATISTA & BORETSA
    end

    subgraph ПЛОВДИВ_И_ПАЗАРДЖИК ["ПЛОВДИВ, ПАЗАРДЖИК, ВЕЛИНГРАД, СЕПТЕМВРИ"]
        BARETATA["Златомир Иванов - Баретата (Аполо)"]
        DJIDJITO["Иван Цонков - Джиджито (Пловдив)"]
        STOLIPINOVO_LEADS["Ромски диспечери (Столипиново и Тракия)"]
        PAZARDZHIK_LEADS["Босове Пазарджик, Велинград, Септември, Белово"]

        BARETATA --> DJIDJITO & PAZARDZHIK_LEADS
        DJIDJITO --> STOLIPINOVO_LEADS
    end

    subgraph ВАРНА_И_ДОБРИЧ ["ВАРНА, ДОБРИЧ, БАЛЧИК, КАВАРНА"]
        CHIRPANSKI["Николай Тошев-Чирпанския и Янко Фашиста"]
        VARNA_WEST_DEPOT["Депа Варна-Запад, Владиславово, Аспарухово"]
        GOLDEN_SANDS["Клубни дилъри Златни пясъци и Център"]
        DOBRICH_LEADS["Отговорници Добрич, Балчик, Каварна"]

        CHIRPANSKI --> VARNA_WEST_DEPOT
        VARNA_WEST_DEPOT --> GOLDEN_SANDS & DOBRICH_LEADS
    end

    subgraph ДУНАВ_И_СЕВЕРОЗАПАД ["ПЛЕВЕН, РУСЕ, ВРАЦА, МОНТАНА, ВИДИН"]
        KUKATA["Камен Балбузанов - Куката (Плевен)"]
        RUSE_DEPOT["Диспечери Русе и Дунав мост (Куриери)"]
        VRATSA_LEADS["Разпределители Враца, Монтана, Видин"]

        KUKATA --> RUSE_DEPOT & VRATSA_LEADS
    end

    subgraph ЮГОЗАПАД_И_РОДОПИ ["БЛАГОЕВГРАД, ПЕТРИЧ, САНДАНСКИ, ХАСКОВО, КЪРДЖАЛИ"]
        PETRICH_BOSSES["Трафиканти Петрич, Сандански, Кулата, Благоевград"]
        HASKOVO_BOSSES["Разпределители Хасково, Димитровград, Кърджали"]

        IMPORTERS --> PETRICH_BOSSES & HASKOVO_BOSSES
    end

    PIGEON["Пигеон експрес (Апостолов и Петлешкова)"]
    IMPORTERS --> PIGEON
    PIGEON -.-> PANDEV & TEMERUTA & DJIDJITO & VARNA_WEST_DEPOT & RUSE_DEPOT

    IMPORTERS --> OCHITE
    IMPORTERS --> LANETSA
    IMPORTERS --> BARETATA
    IMPORTERS --> CHIRPANSKI
    IMPORTERS --> KUKATA

    DROBETSA & TARTORA & POPA & DOBRI & IVO & LAVATSA & RACHO & PRACHA -->|Дневен кеш Южно Черноморие| OCHITE
    TEMERUTA & KAPITANA & KARATISTA & BORETSA -->|Дневен кеш София| LANETSA
    DJIDJITO & STOLIPINOVO_LEADS & PAZARDZHIK_LEADS -->|Дневен кеш Тракия| BARETATA
    GOLDEN_SANDS & DOBRICH_LEADS -->|Дневен кеш Варна| CHIRPANSKI
    RUSE_DEPOT & VRATSA_LEADS -->|Дневен кеш Дунав| KUKATA
    PETRICH_BOSSES & HASKOVO_BOSSES -->|Дневен кеш Югозапад| IMPORTERS

    ASSET_BANK["Интернешънъл Асет Банк (420 Млн. лв. кеш в сакове)"]
    DUBAI["Дубай Сметки (#DubaiUnlocked)"]

    OCHITE & LANETSA & BARETATA & CHIRPANSKI & KUKATA -->|Милиарди оборот| ASSET_BANK
    ASSET_BANK -->|Офшорни преводи| DUBAI
    DUBAI -.->|Черни каси за избори и чадър| PEEVSKI & BORISOV
`;

  const coastalReportChart = `
graph TD
    EYES["ДИМИТЪР ЖЕЛЯЗКОВ - МИТЬО ОЧИТЕ (Главен бос)"]

    subgraph БУРГАС_ОТЧИТАНЕ ["ОТЧИТАНЕ В ГРАД БУРГАС"]
        PANDEV["Иван Пъндев (Бургас Главен Диспечер)"]
        DROBETSA["Георги Дробеца (ж.к. Меден Рудник)"]
        TARTORA["Тодор Желязков - Тартора (ж.к. Славейков)"]
        POPA["Иван Попа (ж.к. Лазур и Морска градина)"]
        
        DROBETSA -->|Оборот Меден Рудник| PANDEV
        TARTORA -->|Оборот Славейков| PANDEV
        POPA -->|Оборот Лазур| PANDEV
        PANDEV -->|ГРАДСКИ ОБОРОТ БУРГАС| EYES
    end

    subgraph СЛЪНЧЕВ_БРЯГ_ОТЧИТАНЕ ["ОТЧИТАНЕ В СЛЪНЧЕВ БРЯГ И НЕСЕБЪР"]
        LAVATSATA["Венцислав Христов - Лавацата (Сл. бряг Клубове)"]
        RACHO["Радослав Николов - Рачо (Несебър и Равда)"]
        PRACHA["Данчо Пръча (Алеи и Плажни барове)"]
        PEYKO["Пейко Попов (Складово депо Несебър)"]
        DINEVI_BEACH["Братя Диневи (Свети Влас)"]
        
        PRACHA -->|Оборот алеи и плаж| LAVATSATA
        PEYKO -->|Оборот депо Несебър| RACHO
        LAVATSATA -->|КУРОРТЕН ОБОРОТ СЛ. БРЯГ| EYES
        RACHO -->|ОБОРОТ НЕСЕБЪР| EYES
        DINEVI_BEACH -->|ОБОРОТ СВ. ВЛАС| EYES
    end

    subgraph ПОМОРИЕ_ОТЧИТАНЕ ["ОТЧИТАНЕ В ПОМОРИЕ"]
        SHIROKOV["Христо Широков - Широката"]
        DOBRI["Добри Добрев (Поморие уличен надзор)"]
        IVO["Иво Йовов (Поморие складово депо)"]

        DOBRI -->|Дневен кеш Поморие| SHIROKOV
        IVO -->|Оборот складово депо| SHIROKOV
        SHIROKOV -->|ОБОРОТ ПОМОРИЕ| EYES
    end

    subgraph СОЗОПОЛ_ЦАРЕВО ["ОТЧИТАНЕ В СОЗОПОЛ, ЦАРЕВО, ПРИМОРСКО"]
        SOZOPOL_D["Дилъри Созопол (Градина и Смокиня)"]
        TSAREVO_D["Дилъри Царево, Лозенец, Арапя"]
        PRIMORSKO_D["Дилъри Приморско и Китен"]

        SOZOPOL_D & TSAREVO_D & PRIMORSKO_D -->|СЕЗОНЕН ОБОРОТ ЮЖНИ КУРОРТИ| EYES
    end

    BANK["Интернешънъл Асет Банк АД (Кеш)"]
    EYES -->|Стотици милиони кеш в сакове| BANK
    BANK -->|Пране през офшорки| DUBAI_TRANS["Дубай (#DubaiUnlocked)"]
    DUBAI_TRANS -.->|Такса спокойствие и партийна каса| CHADUR["Политически Чадър (Пеевски & Борисов)"]
`;

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '1.5rem', fontFamily: 'var(--font-mono)' }}>
      
      {/* ХЕДЪР НА СИСТЕМАТА */}
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
          <div style={{ fontSize: '2.2rem', backgroundColor: '#0F172A', border: '2px solid #EAB308', borderRadius: '8px', padding: '6px 12px' }}>
            🦁
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-serif)' }}>
              VERITAS // НАЦИОНАЛНА КАРТОТЕКА С ИМЕНА НА ДИЛЪРИ & ОТГОВОРНИЦИ ПО ОБЩИНИ
            </h1>
            <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
              ПЪЛНА СИСТЕМА ЗА ЦЯЛА БЪЛГАРИЯ: БУРГАС, ПОМОРИЕ, НЕСЕБЪР, СОФИЯ, ПЛОВДИВ, ВАРНА, ПАЗАРДЖИК, РУСЕ, ПЛЕВЕН, БЛАГОЕВГРАД
            </span>
          </div>
        </div>

        {/* Бутони за превключване на диаграмите */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setActiveTab('national_municipalities');
              setSelectedChannel(FLOW_CHANNELS[0]);
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: activeTab === 'national_municipalities' ? '2px solid #DC2626' : '1px solid #1E293B',
              backgroundColor: activeTab === 'national_municipalities' ? '#DC2626' : '#0F172A',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📊 НАЦИОНАЛНА МРЕЖА ПО ОБЩИНИ (С ИМЕНА)
          </button>
          <button
            onClick={() => {
              setActiveTab('coastal');
              setSelectedChannel(FLOW_CHANNELS[1]);
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: activeTab === 'coastal' ? '2px solid #38BDF8' : '1px solid #1E293B',
              backgroundColor: activeTab === 'coastal' ? '#0284C7' : '#0F172A',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🌊 БУРГАС, СЛ. БРЯГ & ПОМОРИЕ
          </button>
        </div>
      </div>

      {/* ФИНАНСОВИ И ДОКАЗАТЕЛСТВЕНИ ДАННИ */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 1.5rem auto',
        backgroundColor: '#0B132B',
        border: '1px solid #1E293B',
        borderRadius: '10px',
        padding: '1.2rem 1.6rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '15px'
      }}>
        <div>
          <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>АКТИВЕН КАНАЛ:</span>
          <strong style={{ fontSize: '0.85rem', color: '#F8FAFC' }}>{selectedChannel.title}</strong>
        </div>
        <div>
          <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>ОБЩ ОБЕМ НА ПОТОКА:</span>
          <strong style={{ fontSize: '1.1rem', color: '#EF4444' }}>{selectedChannel.amountBgn}</strong>
        </div>
        <div>
          <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>ДОКАЗАТЕЛСТВЕН СТАТУТ:</span>
          <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 800 }}>{selectedChannel.status}</span>
        </div>
      </div>

      {/* 🌟 MERMAID ВЕКТОРЕН ГРАФ С ИМЕНА И ОБЩИНИ */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        backgroundColor: '#0B132B',
        border: '1px solid #1E293B',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 20px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1E293B', paddingBottom: '10px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '0.05em' }}>
            ⚛️ ИНТЕРАКТИВНА ВЕКТОРНА ГРАФА НА НАЦИОНАЛНАТА ДИЛЪРСКА СИСТЕМА (MERMAID.JS)
          </span>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
            * използвайте бутоните за зуум (+, -) за пълно разглеждане на всички общински клъстери в България
          </span>
        </div>

        <MermaidGraph
          key={activeTab}
          chart={activeTab === 'national_municipalities' ? nationalMunicipalitiesChart : coastalReportChart}
          id={`flow-${activeTab}`}
          allowExport={true}
        />
      </div>

    </div>
  );
}
