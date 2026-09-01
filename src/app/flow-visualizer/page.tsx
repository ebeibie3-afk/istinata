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
    id: 'FLOW-MASTER-FULL-PYRAMID',
    title: 'ПЪЛНА ВЕРТИКАЛНА ПИРАМИДА: От Върха до Бургас, Слънчев Бряг, Поморие & Улицата',
    category: 'Национална Държавно-Престъпна Йерархия',
    amountBgn: '16 400 000 000 лв.',
    amountEur: '8 385 000 000 €',
    primaryBeneficiaries: [
      'Върховна Власт & Олигархия: Пеевски, Борисов, Доган',
      'Прокурорски & Съдебен Чадър: Сарафов, Гешев, Пепи Еврото, Нотариуса, Георги Ушев',
      'Международни Босове & Канали: Таки, Брендо, Къро (покойник), Размиг Чакърян (Ами), Евролаб 2011',
      'Регионални Лейтенанти: Митьо Очите, Христо Широков (Широката), Радо Ланеца, Весо Паяка, Златомир Иванов (Баретата)',
      'Бургаски Отговорници (Меден Рудник, Славейков, Лазур): Иван Пъндев, Георги Дробеца, Тодор Желязков (Тартора), Иван Попа',
      'Слънчев Бряг & Несебър (Клубове, Алеи, Дюни): Венцислав Христов (Лавацата), Радослав Николов (Рачо), Йордан Въчев (Данчо Пръча), Пейко Попов',
      'Поморийски Отговорници: Добри Добрев, Иво Йовов, Христо Широков (Широката)',
      'Специфична Логистика & Куриери: Pigeon Express (Александър Апостолов, Елена Петлешкова), Telegram администратори'
    ],
    bufferCompanies: [
      { name: '„Автомагистрали" ЕАД / ДКК', eik: '831610486', role: 'Държавен инхаус инструмент' },
      { name: '„Аркус - Сигурност Бургас" ЕООД', eik: '102859341', role: 'Охранителна шапка на курортния рекет' },
      { name: '„Евролаб 2011" / „Интерфорум"', eik: '201847192', role: 'Фитосанитарна лаборатория на Капитан Андреево' },
      { name: '„Пигеон експрес" ЕООД', eik: '207705342', role: 'Куриерски разнос и прекурсори (Апостолов / Петлешкова)' }
    ],
    cashWithdrawalPoints: [
      'Интернешънъл Асет Банк АД – 420 млн. лв. в чували и сакове',
      'Каси на чейндж бюра, казина и лизингови къщи в Бургас, Слънчев бряг, Поморие, София и Варна',
      'P2P портфейли (USDT/TRON), Revolut мулета, EasyPay и криптомати'
    ],
    offshoreDestinations: ['Дубай (ОАЕ) - #DubaiUnlocked', 'Кипър (Лимасол)', 'Панама', 'Белиз', 'Испания (Барселона)'],
    legalAuditEvidence: 'Присъди по НОХД № 2145/2018 г. (СНС), НОХД № 451/2021 г. (СГС), бюлетини на DEA, ДАНС, ГДБОП и оперативни реализации в Бургас, Слънчев бряг и Поморие.',
    status: 'Кръстосана Верификация: Чл. 41 от Конституцията'
  },
  {
    id: 'FLOW-COASTAL-REPORTING',
    title: 'ОТЧИТАНЕ В БУРГАС И СЛЪНЧЕВ БРЯГ: Кой на кого отчита парите',
    category: 'Регионално Черноморско Отчитане',
    amountBgn: '1 250 000 000 лв. годишно',
    amountEur: '639 000 000 €',
    primaryBeneficiaries: ['Димитър Желязков (Очите)', 'Христо Широков (Широката)', 'Венцислав Христов (Лавацата)', 'Радослав Николов (Рачо)', 'Иван Пъндев'],
    bufferCompanies: [
      { name: '„Аркус Сигурност Бургас" ЕООД', eik: '102859341', role: 'Охрана на дискотеки и такса спокойствие' },
      { name: '„Широков Груп" ЕООД', eik: '202948175', role: 'Инвестиции и заведения Поморие/Несебър' }
    ],
    cashWithdrawalPoints: [
      'Чейндж бюра по главната алея на Слънчев бряг',
      'Офиси за бързи кредити и заложни къщи в ж.к. Меден Рудник и ж.к. Славейков'
    ],
    offshoreDestinations: ['Дубай (ОАЕ)', 'Кипър'],
    legalAuditEvidence: 'Специализиран наказателен съд - ОПГ на Митьо Очите НОХД 2145/2018 г.',
    status: 'Потвърдена Оперативна Схема'
  },
  {
    id: 'FLOW-HEMUS-001',
    title: 'АМ „Хемус" – Схемата с Инхаус Превъзлагане и Сакове с Кеш',
    category: 'Транспортно Строителство',
    amountBgn: '1 180 000 000 лв.',
    amountEur: '603 325 000 €',
    primaryBeneficiaries: ['Политически кабинет ГЕРБ / АПИ', 'Ръководство на „Автомагистрали" ЕАД'],
    bufferCompanies: [
      { name: '„Автомагистрали" ЕАД', eik: '831610486', role: 'Държавен шапка-получател' }
    ],
    cashWithdrawalPoints: ['Интернешънъл Асет Банк АД (Клон София) – 420 млн. лв.'],
    offshoreDestinations: ['Обединени арабски емирства (Дубай)'],
    legalAuditEvidence: 'Одитен доклад № 0300100421 на Сметната палата на РБ.',
    status: 'Потвърдено с Одитен Акт'
  }
];

export default function FlowVisualizer() {
  const [activeTab, setActiveTab] = useState<'pyramid' | 'coastal' | 'hemus'>('pyramid');
  const [selectedChannel, setSelectedChannel] = useState<CorruptionChannel>(FLOW_CHANNELS[0]);

  // 🌟 ПЪЛНА МРЕЖА С ДЕТАЙЛНО ОТЧИТАНЕ В БУРГАС, СЛЪНЧЕВ БРЯГ И ПОМОРИЕ
  const fullPyramidChart = `
graph TD
    %% ==========================================
    %% НИВО 1: ВЪРХОВЕН ПОЛИТИЧЕСКИ & ОЛИГАРХИЧЕН ЧАДЪР
    %% ==========================================
    PEEVSKI["👑 Делян Славчев Пеевски<br/><b>ДПС-Ново Начало / Магнитски / Институционален контрол</b>"]
    BORISOV["👑 Бойко Методиев Борисов<br/><b>Лидер на ГЕРБ / Банкя / Инхаус държавни договори</b>"]
    DOGAN["👑 Ахмед Демир Доган<br/><b>Почетен председател / Сараи Росенец / ТЕЦ Варна</b>"]

    %% ==========================================
    %% НИВО 2: СЪДЕБЕН, ПРОКУРОРСКИ & СИЛОВ ЧАДЪР
    %% ==========================================
    SARAFOV["⚖️ Борислав Боби Сарафов<br/><b>И.ф. Главен прокурор / Осемте Джуджета</b>"]
    GESHEV["⚖️ Иван Стоименов Гешев<br/><b>Бивш Главен прокурор / Чадър КТБ</b>"]
    EUROTO["🕵️‍♂️ Петьо Петров - Пепи Еврото<br/><b>Ресторант Осемте Джуджета / Търговия с дела</b>"]
    NOTARIUSA["🕵️‍♂️ Мартин Божанов - Нотариуса<br/><b>Клуб SS Club / Изнудване на магистрати</b>"]
    POLICE_TOP["👮 Шефове на ОДМВР-Бургас & РУ-Несебър/Поморие/Созопол<br/><b>Оперативен чадър и предупреждаване за акции</b>"]

    %% ==========================================
    %% НИВО 3: МЕСТНИ ФЕОДАЛИ & КМЕТОВЕ
    %% ==========================================
    NIKOLOV["⚓ Димитър Николов (Кмет Бургас)<br/><b>Концесии Росенец / 480 Млн. лв. дефицит</b>"]
    ALEKSIEV["🌊 Иван Алексиев (Кмет Поморие)<br/><b>ВиК и строителни монополи / Чадър над обекти</b>"]
    NESSEBAR_KMET["🏖️ Николай Димитров (Кмет Несебър)<br/><b>Слънчев бряг / Търговия с вот</b>"]
    REIZI["⛵ Панайот Рейзи & Георги Лапчев<br/><b>Созопол & Царево / Застрояване на къмпинги</b>"]

    %% ==========================================
    %% НИВО 4: МЕЖДУНАРОДНИ БОСОВЕ, ВНОС & ГРАНИЧНИ ХЪБОВЕ
    %% ==========================================
    TAKI["📦 Христофорос Аманатидис - Таки<br/><b>Синдикат София-Дубай / Морски контейнери</b>"]
    BRENDO["🚢 Евелин Банев - Брендо<br/><b>Кокаинов транзит през Черно море</b>"]
    EUROLAB["⚗️ Размиг Чакърян - Ами & Евролаб 2011<br/><b>ГКПП Капитан Андреево / Прекурсори</b>"]

    %% ==========================================
    %% НИВО 5: РЕГИОНАЛНИ ЛЕЙТЕНАНТИ & СИЛОВИ ОХРАНИТЕЛИ
    %% ==========================================
    EYES["🟡 Димитър Желязков - Митьо Очите<br/><b>Аркус Сигурност (ЕИК: 102859341) / Бос на Южното Черноморие</b>"]
    SHIROKOV["🟡 Христо Широков - Широката<br/><b>Поморийски силов отговорник / Бригада Поморие</b>"]
    LANETSA["🟡 Радо Ланеца & Весо Паяка<br/><b>Софийски разпределител на наркопазара</b>"]

    %% ==========================================
    %% НИВО 6: ОТГОВОРНИЦИ ПО РЕГИОНИ & СКЛАДОВИ ДИСПЕЧЕРИ
    %% ==========================================
    
    %% БУРГАС ХЪБ (КВАРТАЛИ):
    PANDEV["👤 Иван Пъндев (Бургас)<br/><b>Главен складов отговорник за Бургас</b>"]
    DROBETSA["👤 Георги Дробеца (Бургас)<br/><b>Отговорник ж.к. Меден Рудник & ж.к. Победа</b>"]
    TARTORA["👤 Тодор Желязков - Тартора (Бургас)<br/><b>Отговорник ж.к. Славейков & ж.к. Изгрев</b>"]
    POPA["👤 Иван Попа (Бургас)<br/><b>Отговорник ж.к. Лазур, Морска градина & Център</b>"]

    %% СЛЪНЧЕВ БРЯГ & НЕСЕБЪР ХЪБ:
    LAVATSATA["👤 Венцислав Христов - Лавацата<br/><b>Главен надзорник Слънчев бряг (Алеи & Големи клубове)</b>"]
    RACHO["👤 Радослав Николов - Рачо<br/><b>Отговорник Несебър, Равда & Свети Влас</b>"]
    PRACHA["👤 Йордан Въчев - Данчо Пръча<br/><b>Отговорник плажни барове, казина & таксита Сл. бряг</b>"]
    PEYKO["👤 Пейко Попов (Несебър)<br/><b>Логистично депо Несебър & заложни къщи</b>"]

    %% ПОМОРИЕ ХЪБ:
    DOBRI_DOBREV["👤 Добри Добрев (Поморие)<br/><b>Поморийски надзорник & Разпределител на улицата</b>"]
    IVO_YOVOV["👤 Иво Йовов (Поморие)<br/><b>Складово депо Поморие & Логистика</b>"]

    %% СОФИЯ ХЪБ:
    TEMERUTA["👤 Радослав Иванов - Темерута (Люлин/Надежда)"]
    KAPITANA["👤 Росен Драгнев - Капитана (Студентски град)"]
    PIGEON_MGR["🚚 Александър Апостолов & Елена Петлешкова (Pigeon Express)"]

    %% ==========================================
    %% НИВО 7: УЛИЧНИ ДИЛЪРИ & ПЛАСЬОРИ
    %% ==========================================
    DEALERS_BURGAS_MR["💊 Дилъри: Меден Рудник (Пико, трева, чай)<br/><b>Отчитат се на Дробеца</b>"]
    DEALERS_BURGAS_SLAV["💊 Дилъри: Славейков & Изгрев (Фитнеси & блокове)<br/><b>Отчитат се на Тартора</b>"]
    DEALERS_BURGAS_LAZUR["💊 Дилъри: Лазур & Морска градина (Заведения & паркове)<br/><b>Отчитат се на Иван Попа</b>"]

    DEALERS_SB_CLUBS["💊 Клубни Дилъри: Bedroom, Cacao, The 1, Plaza (Кокаин, екстази)<br/><b>Отчитат се на Лавацата</b>"]
    DEALERS_SB_PROMENADE["💊 Алеини Пласьори: Слънчев бряг (Алеи & плаж)<br/><b>Отчитат се на Данчо Пръча</b>"]
    DEALERS_NESSEBAR_STREET["💊 Улични Дилъри: Несебър & Равда (Тайници & квартири)<br/><b>Отчитат се на Рачо и Пейко</b>"]
    DEALERS_POMORIE["💊 Улични Дилъри: Поморие (Кафенета & тайници)<br/><b>Отчитат се на Добри Добрев и Иво Йовов</b>"]

    %% ==========================================
    %% НИВО 8: ОФШОРНО ПРАНЕ & ДУБАЙ
    %% ==========================================
    ASSET_BANK["💰 Интернешънъл Асет Банк & Каси<br/><b>420 Млн. лв. изтеглени в чували и сакове</b>"]
    DUBAI["🏝️ Дубай Сметки & #DubaiUnlocked<br/><b>Покупка на луксозни имоти и авоари</b>"]

    %% ──────────────── НАВЪРЗВАНЕ НА ПОТОЦИТЕ И ОТЧИТАНЕТО ────────────────
    
    %% Върховна власт -> Прокуратура & МВР
    PEEVSKI -->|Политически чадър| SARAFOV
    BORISOV -->|Чадър над структурите| GESHEV
    SARAFOV -->|Спиране на проверки| EUROTO
    EUROTO -->|Рекет и натиск| NOTARIUSA
    NOTARIUSA -->|Корумпиране на полицаи| POLICE_TOP

    %% Граница & Босове
    POLICE_TOP -->|Чадър на Капитан Андреево| EUROLAB
    EUROLAB -->|Внос на прекурсори| TAKI
    TAKI -->|Транзитен кокаин| BRENDO
    BRENDO -->|Морски контейнери Бургас/Варна| TAKI

    %% Политика -> Кметове
    BORISOV -->|Партиен чадър| NIKOLOV
    PEEVSKI -->|Концесии| NESSEBAR_KMET
    NIKOLOV -->|Крайбрежен монопол| ALEKSIEV
    ALEKSIEV -->|Застрояване| NESSEBAR_KMET

    %% Босове -> Лейтенанти
    TAKI -->|Зареждане на Черноморието| EYES
    TAKI -->|Зареждане на София| LANETSA

    %% Очите -> Бургаски отговорници
    EYES -->|Складов надзор Бургас| PANDEV
    PANDEV -->|Квартал Меден Рудник| DROBETSA
    PANDEV -->|Квартал Славейков & Изгрев| TARTORA
    PANDEV -->|Квартал Лазур & Морска градина| POPA

    %% Очите -> Слънчев бряг & Несебър
    EYES -->|Командване Слънчев бряг Клубове| LAVATSATA
    EYES -->|Командване Несебър & Равда| RACHO
    EYES -->|Алеи, казина и плажове| PRACHA
    RACHO -->|Складово депо Несебър| PEYKO

    %% Очите -> Поморие
    EYES -->|Командване Поморие| SHIROKOV
    SHIROKOV -->|Уличен надзор Поморие| DOBRI_DOBREV
    SHIROKOV -->|Складово депо Поморие| IVO_YOVOV

    %% Отговорници -> Улични пласьори
    DROBETSA -->|Зареждане на дилърите в Меден Рудник| DEALERS_BURGAS_MR
    TARTORA -->|Зареждане на дилърите в Славейков| DEALERS_BURGAS_SLAV
    POPA -->|Зареждане на дилърите в Лазур| DEALERS_BURGAS_LAZUR

    LAVATSATA -->|Зареждане на нощните дискотеки в Сл. бряг| DEALERS_SB_CLUBS
    PRACHA -->|Зареждане на плажни дилъри в Сл. бряг| DEALERS_SB_PROMENADE
    RACHO -->|Зареждане на улични дилъри Несебър| DEALERS_NESSEBAR_STREET
    PEYKO -->|Тайници Несебър & Равда| DEALERS_NESSEBAR_STREET

    DOBRI_DOBREV -->|Зареждане на дилърите в Поморие| DEALERS_POMORIE
    IVO_YOVOV -->|Тайници и складове Поморие| DEALERS_POMORIE

    %% ──────────────── ПЪЛЕН КРЪГ НА ОТЧИТАНЕ (ПАРИЧЕН ПОТОК НАГОРЕ) ────────────────
    
    %% Отчитане в Бургас:
    DEALERS_BURGAS_MR -->|Предават дневния кеш от Меден Рудник| DROBETSA
    DEALERS_BURGAS_SLAV -->|Предават дневния кеш от Славейков| TARTORA
    DEALERS_BURGAS_LAZUR -->|Предават дневния кеш от Лазур| POPA
    DROBETSA -->|Отчита събрания кеш от М. Рудник| PANDEV
    TARTORA -->|Отчита събрания кеш от Славейков| PANDEV
    POPA -->|Отчита събрания кеш от Лазур| PANDEV
    PANDEV -->|Предава пълния оборот за гр. Бургас| EYES

    %% Отчитане в Слънчев бряг & Несебър:
    DEALERS_SB_CLUBS -->|Клубен кеш всяка нощ (милиони лв.)| LAVATSATA
    DEALERS_SB_PROMENADE -->|Алеен кеш от туристи и плаж| PRACHA
    DEALERS_NESSEBAR_STREET -->|Уличен кеш от Несебър| RACHO
    DEALERS_NESSEBAR_STREET -->|Оборот от тайниците| PEYKO
    PRACHA -->|Отчита алеите към| LAVATSATA
    PEYKO -->|Отчита депото към| RACHO
    LAVATSATA -->|Отчита целия курортен дял от Сл. бряг| EYES
    RACHO -->|Отчита целия несебърски дял| EYES

    %% Отчитане в Поморие:
    DEALERS_POMORIE -->|Кеш от заведения и тайници| DOBRI_DOBREV
    DEALERS_POMORIE -->|Складови плащания| IVO_YOVOV
    DOBRI_DOBREV -->|Отчитане на уличния дял| SHIROKOV
    IVO_YOVOV -->|Отчитане на депото| SHIROKOV
    SHIROKOV -->|Предава пълния поморийски оборот| EYES

    %% Очите -> Банки -> Дубай -> Власт
    EYES -->|Легализация през казина и охранителен договор с Аркус| ASSET_BANK
    ASSET_BANK -->|Офшорни преводи и трансфери| DUBAI
    DUBAI -.->|Черни каси за избори и комфорт| BORISOV
    DUBAI -.->|Финансиране на медии и зависимости| PEEVSKI
`;

  const coastalReportChart = `
graph TD
    %% ДЕТАЙЛНА СХЕМА НА ОТЧИТАНЕТО В БУРГАС И СЛЪНЧЕВ БРЯГ
    EYES["🟡 ДИМИТЪР ЖЕЛЯЗКОВ - МИТЬО ОЧИТЕ<br/><b>Главен Получател на Кеша за Южното Черноморие</b>"]

    subgraph БУРГАС_ОТЧИТАНЕ ["🏢 ОТЧИТАНЕ В ГРАД БУРГАС"]
        PANDEV["👤 Иван Пъндев (Бургас Главен Диспечер)"]
        DROBETSA["👤 Георги Дробеца (ж.к. Меден Рудник)"]
        TARTORA["👤 Тодор Желязков - Тартора (ж.к. Славейков)"]
        POPA["👤 Иван Попа (ж.к. Лазур & Морска градина)"]
        
        D_MR["💊 Улични дилъри Меден Рудник"] -->|Дневен кеш| DROBETSA
        D_SL["💊 Улични дилъри Славейков"] -->|Дневен кеш| TARTORA
        D_LZ["💊 Улични дилъри Лазур/Център"] -->|Дневен кеш| POPA

        DROBETSA -->|Оборот М. Рудник| PANDEV
        TARTORA -->|Оборот Славейков| PANDEV
        POPA -->|Оборот Лазур| PANDEV
        PANDEV -->|ГРАДСКИ ОБОРОТ БУРГАС| EYES
    end

    subgraph СЛЪНЧЕВ_БРЯГ_ОТЧИТАНЕ ["🏖️ ОТЧИТАНЕ В К.К. СЛЪНЧЕВ БРЯГ & НЕСЕБЪР"]
        LAVATSATA["👤 Венцислав Христов - Лавацата (Сл. бряг Клубове)"]
        RACHO["👤 Радослав Николов - Рачо (Несебър & Равда)"]
        PRACHA["👤 Йордан Въчев - Данчо Пръча (Алеи & Плаж)"]
        
        D_CLUBS["💊 Дилъри в големите дискотеки (Bedroom, Plaza, Cacao)"] -->|Нощен кеш| LAVATSATA
        D_PROMENADE["💊 Дилъри по крайбрежните алеи"] -->|Дневен/нощен кеш| PRACHA
        D_NESS["💊 Улични дилъри в Несебър и Равда"] -->|Сезонен кеш| RACHO

        PRACHA -->|Оборот от алеите| LAVATSATA
        LAVATSATA -->|КУРОРТЕН ОБОРОТ СЛ. БРЯГ (МИЛИОНИ ЛВ.)| EYES
        RACHO -->|ОБОРОТ НЕСЕБЪР & РАВДА| EYES
    end

    subgraph ПОМОРИЕ_ОТЧИТАНЕ ["🌊 ОТЧИТАНЕ В ПОМОРИЕ"]
        SHIROKOV["🟡 Христо Широков - Широката"]
        DOBRI["👤 Добри Добрев"]
        IVO["👤 Иво Йовов"]

        D_POM["💊 Улични пласьори Поморие"] -->|Кеш| DOBRI
        D_POM -->|Складови пари| IVO
        DOBRI -->|Уличен дял| SHIROKOV
        IVO -->|Складов дял| SHIROKOV
        SHIROKOV -->|ПОМОРИЙСКИ ОБОРОТ| EYES
    end

    EYES -->|420 Млн. лв. пране през Аркус Сигурност и казина| BANK["🏦 Интернешънъл Асет Банк & Каси"]
    BANK -->|Офшорни имоти & трансфери| DUBAI["🏝️ Дубай Сметки (#DubaiUnlocked)"]
    DUBAI -.->|Черни каси за избори и чадър| TOP["👑 Пеевски & Борисов"]
`;

  const hemusChart = `
graph TD
    A["🏛️ Бойко Борисов / АПИ<br/><b>Министерски Съвет</b>"] -->|1.18 МЛРД. лв. Аванси| B["🏢 Държавна фирма: Автомагистрали ЕАД<br/><b>ЕИК: 831610486</b>"]
    B -->|680 МЛН. лв. Инхаус договори| C["📑 Водно строителство Благоевград & Пътища Пловдив<br/><b>Частни консорциуми-буфери</b>"]
    C -->|420 МЛН. лв. Тегления в брой| D["💰 Сакове с Кеш на Каса<br/><b>Интернешънъл Асет Банк (Клон София)</b>"]
    C -->|450 МЛН. лв. Преводи| E["🏝️ Офшорни Сметки и Имоти в Дубай<br/><b>#DubaiUnlocked луксозни активи</b>"]
    E -.->|Черни каси и подкупи| A
`;

  const getActiveChart = () => {
    switch (activeTab) {
      case 'pyramid': return fullPyramidChart;
      case 'coastal': return coastalReportChart;
      case 'hemus': return hemusChart;
      default: return fullPyramidChart;
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
                VERITAS // ВЕРТИКАЛНА КАРТОТЕКА: ОТЧИТАНЕ В БУРГАС, СЛЪНЧЕВ БРЯГ И ПОМОРИЕ
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                ПЪЛНО ПРОСЛЕДЯВАНЕ: КОЙ НА КОГО ОТЧИТА ДНЕВНИЯ КЕШ ПО КВАРТАЛИ И НОЩНИ КЛУБОВЕ ДО МИТЬО ОЧИТЕ И ДУБАЙ
              </div>
            </div>
          </div>

          {/* Action Controls: Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setActiveTab('coastal'); setSelectedChannel(FLOW_CHANNELS[1]); }}
              style={{
                backgroundColor: activeTab === 'coastal' ? '#DC2626' : '#070D1E',
                color: activeTab === 'coastal' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'coastal' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 900,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                boxShadow: activeTab === 'coastal' ? '0 0 15px rgba(220, 38, 38, 0.4)' : 'none'
              }}
            >
              🌊 ОТЧИТАНЕ: БУРГАС & СЛЪНЧЕВ БРЯГ
            </button>
            <button
              onClick={() => { setActiveTab('pyramid'); setSelectedChannel(FLOW_CHANNELS[0]); }}
              style={{
                backgroundColor: activeTab === 'pyramid' ? '#DC2626' : '#070D1E',
                color: activeTab === 'pyramid' ? '#FFFFFF' : '#94A3B8',
                border: activeTab === 'pyramid' ? '1px solid #EF4444' : '1px solid #1E293B',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              🔺 ПЪЛНА НАЦИОНАЛНА ПИРАМИДА
            </button>
            <button
              onClick={() => { setActiveTab('hemus'); setSelectedChannel(FLOW_CHANNELS[2]); }}
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
              🛣️ АМ „ХЕМУС"
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
              🕸️ ИНТЕРАКТИВНА ВЕКТОРНА ГРАФА НА ОТЧИТАНЕТО (MERMAID.JS)
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              * Ползвайте бутоните за приближаване (+, -) и кликнете на произволен възел за Chart.js анализ
            </span>
          </div>

          <MermaidGraph chart={getActiveChart()} id={`flow-graph-${activeTab}`} allowExport={true} />
        </div>

        {/* EVIDENCE ACCORDION & BENEFICIARIES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Col 1: Primary Beneficiaries */}
          <div style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              👑 Върховни Получатели на Кеша
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
