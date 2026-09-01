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
      'Общини Созопол, Царево, Приморско: Местни дилъри и отговорници по плажове (Градина, Смокиня, Арапя, Нестинарка)',
      'Столична Община (София): Радо Ланеца, Весо Паяка, Радо Темерута, Росен Капитана, Митко Каратиста',
      'Общини Божурище, Самоков, Сливница: Валентин Бореца, местни складови координатори',
      'Общини Пловдив & Пазарджик: Златомир Иванов (Баретата), Иван Цонков (Джиджито), ромски тартори',
      'Общини Варна, Добрич, Балчик: Николай Тошев (Чирпанския), Янко Фашиста',
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
    primaryBeneficiaries: ['Димитър Желязков (Очите)', 'Христо Широков (Широката)', 'Венцислав Христов (Лавацата)', 'Радослав Николов (Рачо)', 'Добри Добрев', 'Иво Йовов'],
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
    %% ==========================================
    %% ВЪРХОВНО НИВО: ПОЛИТИЧЕСКИ & ПРОКУРОРСКИ ЧАДЪР
    %% ==========================================
    PEEVSKI["👑 Делян Славчев Пеевски (ДПС-Ново Начало)"]
    BORISOV["👑 Бойко Методиев Борисов (ГЕРБ)"]
    SARAFOV["⚖️ Борислав Сарафов & Иван Гешев (Прокуратура)"]
    EUROTO["🕵️‍♂️ Петьо Петров - Пепи Еврото & Мартин Нотариуса"]

    IMPORTERS["🚢 Христофорос Аманатидис (Таки) & Евелин Банев (Брендо)<br/><b>ГКПП Капитан Андреево: Размиг Чакърян (Ами) & Евролаб 2011</b>"]
    
    PEEVSKI & BORISOV --> SARAFOV
    SARAFOV --> EUROTO
    EUROTO --> IMPORTERS

    %% ==========================================
    %% ОБЛАСТ БУРГАС: ОБЩИНИ БУРГАС, ПОМОРИЕ, НЕСЕБЪР, СОЗОПОЛ, ЦАРЕВО, ПРИМОРСКО
    %% ==========================================
    subgraph ОБЛАСТ_БУРГАС ["⚓ ОБЛАСТ БУРГАС (ОБЩИНИ & КУРОРТИ)"]
        OCHITE["🟡 Димитър Желязков - Митьо Очите (Аркус Сигурност)"]
        
        %% Община Бургас
        PANDEV["👤 Иван Пъндев (Главен складов диспечер Бургас)"]
        DROBETSA["👤 Георги Дробеца (ж.к. Меден Рудник & Победа)"]
        TARTORA["👤 Тодор Тартора (ж.к. Славейков & Изгрев)"]
        POPA["👤 Иван Попа (ж.к. Лазур, Морска градина & Център)"]
        
        %% Община Поморие
        SHIROKOV["🟡 Христо Широков - Широката (Поморие)"]
        DOBRI["👤 Добри Добрев (Уличен надзорник Поморие)"]
        IVO["👤 Иво Йовов (Складово депо Поморие)"]

        %% Община Несебър & Слънчев Бряг
        LAVATSA["👤 Венцислав Христов - Лавацата (Сл. бряг - Bedroom, The 1, Plaza)"]
        RACHO["👤 Радослав Николов - Рачо (Несебър & Равда)"]
        PRACHA["👤 Данчо Пръча (Алеи & Плажни дилъри Сл. бряг)"]
        PEYKO["👤 Пейко Попов (Складово депо Несебър)"]

        %% Общини Созопол, Царево, Приморско
        SOZOPOL_BOSS["👤 Отговорници Созопол (Градина, Смокиня, Хармани)"]
        TSAREVO_BOSS["👤 Отговорници Царево, Лозенец, Приморско & Китен"]

        OCHITE --> PANDEV
        PANDEV --> DROBETSA & TARTORA & POPA

        OCHITE --> SHIROKOV
        SHIROKOV --> DOBRI & IVO

        OCHITE --> LAVATSA & RACHO & PRACHA
        RACHO --> PEYKO

        OCHITE --> SOZOPOL_BOSS & TSAREVO_BOSS
    end

    %% ==========================================
    %% ОБЛАСТ СОФИЯ: СТОЛИЧНА ОБЩИНА, БОЖУРИЩЕ, САМОКОВ, СЛИВНИЦА, КОСТИНБРОД
    %% ==========================================
    subgraph ОБЛАСТ_СОФИЯ ["🦁 ОБЛАСТ СОФИЯ (СТОЛИЦА & РЕГИОН)"]
        LANETSA["🟡 Радо Ланеца & Весо Паяка (Бандата на Чуковете)"]
        
        TEMERUTA["👤 Радослав Иванов - Темерута (Люлин, Надежда, Обеля)"]
        KAPITANA["👤 Росен Драгнев - Капитана (Студентски град & Лозенец)"]
        KARATISTA["👤 Митко Каратиста (Център & Охранителни бригади)"]
        BORETSA["👤 Валентин Бореца (Самоков, Боровец & Ихтиман)"]

        LANETSA --> TEMERUTA & KAPITANA & KARATISTA & BORETSA
    end

    %% ==========================================
    %% ОБЛАСТИ ПЛОВДИВ & ПАЗАРДЖИК: ПЛОВДИВ, ПАЗАРДЖИК, СЕПТЕМВРИ, БЕЛОВО, АСЕНОВГРАД
    %% ==========================================
    subgraph ОБЛАСТИ_ПЛОВДИВ_ПАЗАРДЖИК ["🏛️ ПЛОВДИВ, ПАЗАРДЖИК, СЕПТЕМВРИ, БЕЛОВО"]
        BARETATA["🟡 Златомир Иванов - Баретата (Аполо Секюрити)"]
        DJIDJITO["👤 Иван Цонков - Джиджито (Пловдив)"]
        STOLIPINOVO_LEADS["👤 Ромски диспечери (Столипиново, Шекер махала & Тракия)"]
        PAZARDZHIK_LEADS["👤 Локални босове Пазарджик, Септември & Белово"]

        BARETATA --> DJIDJITO & PAZARDZHIK_LEADS
        DJIDJITO --> STOLIPINOVO_LEADS
    end

    %% ==========================================
    %% ОБЛАСТИ ВАРНА & ДОБРИЧ: ВАРНА, ДОБРИЧ, БАЛЧИК, КАВАРНА
    %% ==========================================
    subgraph ОБЛАСТИ_ВАРНА_ДОБРИЧ ["⚓ ВАРНА, ДОБРИЧ, БАЛЧИК, КАВАРНА"]
        CHIRPANSKI["🟡 Николай Тошев - Чирпанския & Янко Фашиста (Монопола)"]
        VARNA_WEST_DEPOT["📦 Складови отговорници Варна-Запад, Владиславово & Аспарухово"]
        GOLDEN_SANDS["👤 Клубни дилъри Златни пясъци & Варна-Център"]
        DOBRICH_LEADS["👤 Отговорници Добрич, Балчик & Каварна"]

        CHIRPANSKI --> VARNA_WEST_DEPOT
        VARNA_WEST_DEPOT --> GOLDEN_SANDS & DOBRICH_LEADS
    end

    %% ==========================================
    %% СЕВЕРОЗАПАД & ДУНАВ: ПЛЕВЕН, РУСЕ, ВРАЦА, МОНТАНА, ВИДИН
    %% ==========================================
    subgraph ДУНАВ_СЕВЕРОЗАПАД ["🚢 ПЛЕВЕН, РУСЕ, ВРАЦА, МОНТАНА, ВИДИН"]
        KUKATA["🟡 Камен Балбузанов - Куката (Плевен & региона)"]
        RUSE_DEPOT["👤 Диспечери Русе & Дунав мост (Куриерски пратки)"]
        VRATSA_LEADS["👤 Разпределители Враца, Монтана & Видин"]

        KUKATA --> RUSE_DEPOT & VRATSA_LEADS
    end

    %% ==========================================
    %% ЮГОЗАПАД & РОДОПИ: БЛАГОЕВГРАД, ПЕТРИЧ, САНДАНСКИ, ХАСКОВО, КЪРДЖАЛИ
    %% ==========================================
    subgraph ЮГОЗАПАД_РОДОПИ ["⛰️ БЛАГОЕВГРАД, ПЕТРИЧ, САНДАНСКИ, ХАСКОВО, КЪРДЖАЛИ"]
        PETRICH_BOSSES["👤 Трафиканти Петрич, Сандански & Благоевград (ГКПП Кулата)"]
        HASKOVO_BOSSES["👤 Разпределители Хасково, Димитровград & Кърджали"]

        IMPORTERS --> PETRICH_BOSSES & HASKOVO_BOSSES
    end

    %% ==========================================
    %% СПЕДИТОРСКА МРЕЖА: PIGEON EXPRESS
    %% ==========================================
    PIGEON["🚚 Александър Апостолов & Елена Петлешкова (Пигеон експрес ЕООД)<br/><b>Куриерска логистика към локъри и тайници във всички общини</b>"]
    IMPORTERS --> PIGEON
    PIGEON -.-> PANDEV & TEMERUTA & DJIDJITO & VARNA_WEST_DEPOT & RUSE_DEPOT

    %% СВЪРЗВАНЕ НА ВНОСА КЪМ БОСОВЕТЕ
    IMPORTERS --> OCHITE
    IMPORTERS --> LANETSA
    IMPORTERS --> BARETATA
    IMPORTERS --> CHIRPANSKI
    IMPORTERS --> KUKATA

    %% ==========================================
    %% ПАРИЧЕН ПОТОК НАГОРЕ: КЕШ ➔ БАНКА ➔ ДУБАЙ ➔ ВЛАСТ
    %% ==========================================
    DROBETSA & TARTORA & POPA & DOBRI & IVO & LAVATSA & RACHO & PRACHA -->|Дневен кеш Бургас/Сл. бряг/Поморие| OCHITE
    TEMERUTA & KAPITANA & KARATISTA & BORETSA -->|Дневен кеш София/Самоков| LANETSA
    DJIDJITO & STOLIPINOVO_LEADS & PAZARDZHIK_LEADS -->|Дневен кеш Тракия| BARETATA
    GOLDEN_SANDS & DOBRICH_LEADS -->|Дневен кеш Варна/Добрич| CHIRPANSKI
    RUSE_DEPOT & VRATSA_LEADS -->|Дневен кеш Дунав/Северозапад| KUKATA
    PETRICH_BOSSES & HASKOVO_BOSSES -->|Дневен кеш Югозапад| IMPORTERS

    ASSET_BANK["💰 Интернешънъл Асет Банк АД & Каси<br/><b>420 Млн. лв. кеш в сакове и чували / Пране през казина</b>"]
    DUBAI["🏝️ Дубай Сметки (#DubaiUnlocked)<br/><b>Покупка на луксозни активи и имоти в ОАЕ</b>"]

    OCHITE & LANETSA & BARETATA & CHIRPANSKI & KUKATA -->|Милиарди оборот| ASSET_BANK
    ASSET_BANK -->|Офшорни транзакции| DUBAI
    DUBAI -.->|Черни каси за избори и властови чадър| PEEVSKI & BORISOV
`;

  const coastalReportChart = `
graph TD
    EYES["🟡 ДИМИТЪР ЖЕЛЯЗКОВ - МИТЬО ОЧИТЕ<br/><b>Главен Получател на Кеша за Южното Черноморие</b>"]

    subgraph БУРГАС_ОТЧИТАНЕ ["🏢 ОТЧИТАНЕ В ГРАД БУРГАС"]
        PANDEV["👤 Иван Пъндев (Бургас Главен Диспечер)"]
        DROBETSA["👤 Георги Дробеца (ж.к. Меден Рудник)"]
        TARTORA["👤 Тодор Желязков - Тартора (ж.к. Славейков)"]
        POPA["👤 Иван Попа (ж.к. Лазур & Морска градина)"]
        
        DROBETSA -->|Оборот Меден Рудник| PANDEV
        TARTORA -->|Оборот Славейков & Изгрев| PANDEV
        POPA -->|Оборот Лазур & Център| PANDEV
        PANDEV -->|ГРАДСКИ ОБОРОТ БУРГАС| EYES
    end

    subgraph СЛЪНЧЕВ_БРЯГ_ОТЧИТАНЕ ["🏖️ ОТЧИТАНЕ В К.К. СЛЪНЧЕВ БРЯГ & НЕСЕБЪР"]
        LAVATSATA["👤 Венцислав Христов - Лавацата (Сл. бряг Клубове)"]
        RACHO["👤 Радослав Николов - Рачо (Несебър & Равда)"]
        PRACHA["👤 Данчо Пръча (Алеи & Плажни барове)"]
        PEYKO["👤 Пейко Попов (Складово депо Несебър)"]
        
        PRACHA -->|Оборот алеи и плаж| LAVATSATA
        PEYKO -->|Оборот депо Несебър| RACHO
        LAVATSATA -->|КУРОРТЕН ОБОРОТ СЛ. БРЯГ (МИЛИОНИ ЛВ.)| EYES
        RACHO -->|ОБОРОТ НЕСЕБЪР & РАВДА| EYES
    end

    subgraph ПОМОРИЕ_ОТЧИТАНЕ ["🌊 ОТЧИТАНЕ В ПОМОРИЕ"]
        SHIROKOV["🟡 Христо Широков - Широката"]
        DOBRI["👤 Добри Добрев (Поморие уличен надзор)"]
        IVO["👤 Иво Йовов (Поморие складово депо)"]

        DOBRI -->|Уличен дял Поморие| SHIROKOV
        IVO -->|Складов дял Поморие| SHIROKOV
        SHIROKOV -->|ПОМОРИЙСКИ ОБОРОТ| EYES
    end

    EYES -->|Пране през Аркус Сигурност и казина| BANK["🏦 Интернешънъл Асет Банк & Каси"]
    BANK -->|Офшорни имоти & трансфери| DUBAI["🏝️ Дубай Сметки (#DubaiUnlocked)"]
    DUBAI -.->|Черни каси за избори и чадър| TOP["👑 Пеевски & Борисов"]
`;

  const getActiveChart = () => {
    switch (activeTab) {
      case 'national_municipalities': return nationalMunicipalitiesChart;
      case 'coastal': return coastalReportChart;
      default: return nationalMunicipalitiesChart;
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
                VERITAS // НАЦИОНАЛНА КАРТОТЕКА С ИМЕНА НА ДИЛЪРИ & ОТГОВОРНИЦИ ПО ОБЩИНИ
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ПЪЛНА СИСТЕМА ЗА ЦЯЛА БЪЛГАРИЯ: БУРГАС, ПОМОРИЕ, НЕСЕБЪР, СОФИЯ, ПЛОВДИВ, ВАРНА, ПАЗАРДЖИК, РУСЕ, ПЛЕВЕН, БЛАГОЕВГРАД
              </div>
            </div>
          </div>

          {/* Action Controls: Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('national_municipalities'); setSelectedChannel(FLOW_CHANNELS[0]); }}
              style={{
                backgroundColor: activeTab === 'national_municipalities' ? '#DC2626' : '#070D1E',
                color: activeTab === 'national_municipalities' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'national_municipalities' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                boxShadow: activeTab === 'national_municipalities' ? '0 0 15px rgba(220, 38, 38, 0.4)' : 'none'
              }}
            >
              🗺️ НАЦИОНАЛНА МРЕЖА ПО ОБЩИНИ (С ИМЕНА)
            </button>
            <button
              onClick={() => { setActiveTab('coastal'); setSelectedChannel(FLOW_CHANNELS[1]); }}
              style={{
                backgroundColor: activeTab === 'coastal' ? '#DC2626' : '#070D1E',
                color: activeTab === 'coastal' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'coastal' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              🌊 БУРГАС, СЛ. БРЯГ & ПОМОРИЕ
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
              🕸️ ИНТЕРАКТИВНА ВЕКТОРНА ГРАФА НА НАЦИОНАЛНАТА ДИЛЪРСКА СИСТЕМА (MERMAID.JS)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              * Използвайте бутоните за зуум (+, -) за пълно разглеждане на всички общински клъстери в България
            </span>
          </div>

          <MermaidGraph chart={getActiveChart()} id={`flow-graph-${activeTab}`} allowExport={true} />
        </div>

        {/* EVIDENCE ACCORDION & BENEFICIARIES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Col 1: Primary Beneficiaries */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              👑 Върховна Власт & Регионални Босове
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
