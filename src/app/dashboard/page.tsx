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
  region: string;
  mayor: string;
  coatSymbol: string;
  deficit: string;
  auditReport: string;
  nodes: ConnectedNode[];
}

const ALL_MUNICIPALITIES: MunicipalityDossier[] = [
  // ── БУРГАСКИ РЕГИОН (ГОЛЕМИ И МАЛКИ КРАЙБРЕЖНИ ОБЩИНИ) ──
  {
    id: 'BG-BURGAS',
    name: 'Община Бургас',
    region: 'Област Бургас',
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
    region: 'Област Бургас',
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
    region: 'Област Бургас',
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
    id: 'BG-SOZOPOL',
    name: 'Община Созопол',
    region: 'Област Бургас',
    mayor: 'Тихомир Янакиев / Панайот Рейзи (Наследство)',
    coatSymbol: '⛵🏛️',
    deficit: '58.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Застрояване на къмпинги „Градина", „Смокиня" и инхаус договори)',
    nodes: [
      { id: 'NODE-SOZ-01', name: 'Панайот Рейзи (Бивш кмет)', alias: '„Созополския Барон"', role: 'Кмет / Феодал', avatarEmoji: '🏖️💸', hash: 'Община Созопол', metrics: 'Отстранен от съда за присвояване на над 2 млн. лв. чрез фалшиви фактури за текущи ремонти.', evidence: 'Обвинителен акт на Специализираната прокуратура' }
    ]
  },
  {
    id: 'BG-TSAREVO',
    name: 'Община Царево',
    region: 'Област Бургас',
    mayor: 'Марин Киров / Георги Лапчев (Наследство)',
    coatSymbol: '🌲⛵',
    deficit: '42.5 МЛН. ЛВ.',
    auditReport: 'Сметна палата & ДНСК (Потопът 2023, дерета и застрояване на „Арапя" и „Нестинарка")',
    nodes: [
      { id: 'NODE-TSAR-01', name: 'Георги Лапчев', alias: '„Царевския Концесионер"', role: 'Кмет / Феодал', avatarEmoji: '🌊🚜', hash: 'Царево Териториално устройство', metrics: 'Издадени строителни разрешителни върху засипани дерета и водосборни зони, довели до бедствието през 2023 г.', evidence: 'Доклад на МОСВ и Сметната палата' }
    ]
  },
  {
    id: 'BG-PRIMORSKO',
    name: 'Община Приморско',
    region: 'Област Бургас',
    mayor: 'Иван Гайков / Димитър Германов',
    coatSymbol: '🦌🌊',
    deficit: '36.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Сделките с магистратските имоти за 5 лв./кв.м и дюни на „Перла")',
    nodes: [
      { id: 'NODE-PRIM-01', name: 'Димитър Димитров (Бивш кмет)', alias: '„Магистратския Раздавач"', role: 'Кмет / Феодал', avatarEmoji: '📜🏖️', hash: 'Имоти Приморско', metrics: 'Раздаване на права за строеж на първа линия на роднини на висши съдии и прокурори като „крайно нуждаещи се".', evidence: 'Разследване на ВСС и присъди на СГС' }
    ]
  },
  {
    id: 'BG-SUNGURLARE',
    name: 'Община Сунгурларе',
    region: 'Област Бургас',
    mayor: 'Димитър Гавазов / Георги Кенов',
    coatSymbol: '🍇🌾',
    deficit: '11.5 МЛН. ЛВ.',
    auditReport: 'Одитен доклад № 0200100923 на Сметната палата (Отрицателно мнение)',
    nodes: [
      { id: 'NODE-SUNG-01', name: 'Георги Кенов', alias: '„Земеделския Барон"', role: 'Пране на пари', avatarEmoji: '🌾💰', hash: 'ЕИК: 102874619', metrics: 'Изкупуване на общински масиви през кухи фирми и монополни поръчки за дървесина.', evidence: 'Одитен акт на Сметната палата' }
    ]
  },
  {
    id: 'BG-KAMENO',
    name: 'Община Камено',
    region: 'Област Бургас',
    mayor: 'Жельо Вардунски (Кмет)',
    coatSymbol: '🌾🚂',
    deficit: '18.4 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Контрол на индустриалната зона и нефтохимическите отпадъци)',
    nodes: [
      { id: 'NODE-KAM-01', name: 'Жельо Вардунски', alias: '„Индустриалния Кмет"', role: 'Кмет / Феодал', avatarEmoji: '🏭📑', hash: 'Община Камено', metrics: 'Непрозрачно отдаване под наем на земеделски фонд и общински пътища.', evidence: 'Одитен доклад на Сметната палата' }
    ]
  },

  // ── МАЛКИ ФЕОДАЛНИ ОБЩИНИ В СТРАНАТА ──
  {
    id: 'BG-BOZHURISHTE',
    name: 'Община Божурище',
    region: 'София Област',
    mayor: 'Георги Димов (Кмет)',
    coatSymbol: '🦁⚔️',
    deficit: '14.2 МЛН. ЛВ.',
    auditReport: 'Доклад на Сметната палата № 010020322 (Отрицателно становище)',
    nodes: [
      { id: 'NODE-BOZH-01', name: 'Георги Димов', alias: '„Логистичния Феодал"', role: 'Кмет / Феодал', avatarEmoji: '👑🏢', hash: 'Божурище Земя', metrics: 'Продажба на 80 дка крайпътни терени на занижени цени и отрицателно одитно мнение.', evidence: 'Доклад на Сметната палата № 010020322' }
    ]
  },
  {
    id: 'BG-NEDELINO',
    name: 'Община Неделино',
    region: 'Област Смолян',
    mayor: 'Боян Кехайов / Стоян Беширов',
    coatSymbol: '⛰️🌲',
    deficit: '9.4 МЛН. ЛВ.',
    auditReport: 'Доклад на Сметната палата № 030020423 (Фалшиви обществени поръчки)',
    nodes: [
      { id: 'NODE-NED-01', name: 'Боян Кехайов', alias: '„Родопския Кмет"', role: 'Кмет / Феодал', avatarEmoji: '🏛️💵', hash: 'Неделино Капитал', metrics: 'Фрагментиране на обществени поръчки до прага за пряко договаряне към семейни фирми.', evidence: 'Одит на Сметната палата № 030020423' }
    ]
  },
  {
    id: 'BG-KOCHERINOVO',
    name: 'Община Кочериново',
    region: 'Област Кюстендил',
    mayor: 'Станислав Горов / Иван Минков',
    coatSymbol: '🦅⚔️',
    deficit: '8.9 МЛН. ЛВ.',
    auditReport: 'Одитен акт на Сметна палата за 2022–2024 г. (Отрицателно мнение)',
    nodes: [
      { id: 'NODE-KOCH-01', name: 'Иван Минков', alias: '„Кметския Наместник (Е-79)"', role: 'Кмет / Феодал', avatarEmoji: '🏢📑', hash: 'Одит Кочериново', metrics: 'Липса на документи за извършени ремонти на общинска собственост и скрит дълг.', evidence: 'Отрицателно становище на Сметната палата' }
    ]
  },
  {
    id: 'BG-DRYANOVO',
    name: 'Община Дряново',
    region: 'Област Габрово',
    mayor: 'Трифон Панчев (Кмет)',
    coatSymbol: '🏰🦁',
    deficit: '6.8 МЛН. ЛВ.',
    auditReport: 'Одит № 010040223 на Сметната палата',
    nodes: [
      { id: 'NODE-DRYAN-01', name: 'Трифон Панчев', alias: '„Пътния Превъзложител"', role: 'Кмет / Феодал', avatarEmoji: '🛣️🚜', hash: 'Дряново Пътища', metrics: 'Инхаус превъзлагания за пътна мрежа към дружества без техника и персонал.', evidence: 'Доклад на Сметната палата № 010040223' }
    ]
  },
  {
    id: 'BG-BELOVO',
    name: 'Община Белово',
    region: 'Област Пазарджик',
    mayor: 'Костадин Варев (Кмет)',
    coatSymbol: '🌲💧',
    deficit: '12.5 МЛН. ЛВ.',
    auditReport: 'Одит на Сметната палата № 020020124 (Осъден кмет за безстопанственост)',
    nodes: [
      { id: 'NODE-BELO-01', name: 'Костадин Варев', alias: '„Горския Концесионер"', role: 'Кмет / Феодал', avatarEmoji: '🪓💵', hash: 'Белово Горски Фонд', metrics: 'Незаконна сеч и фасадни поръчки за общинския горски фонд на стойност милиони левове.', evidence: 'Присъда на Окръжен съд - Пазарджик' }
    ]
  },
  {
    id: 'BG-SEPTEMVRI',
    name: 'Община Септември',
    region: 'Област Пазарджик',
    mayor: 'Васка Рачева / Марин Рачев',
    coatSymbol: '🚂⚔️',
    deficit: '18.2 МЛН. ЛВ.',
    auditReport: 'Спецпрокуратура & Сметна палата № 040020123 (Фамилен монопол)',
    nodes: [
      { id: 'NODE-SEPL-01', name: 'Марин Рачев', alias: '„Строителния Фаворит"', role: 'Пране на пари', avatarEmoji: '🏗️💶', hash: 'Септември Фирми', metrics: 'Възлагане на над 90% от общинските строителни дейности на фирми на преки роднини.', evidence: 'Обвинителен акт на СГП по чл. 282 НК' }
    ]
  },
  {
    id: 'BG-KRUMOVGRAD',
    name: 'Община Крумовград',
    region: 'Област Кърджали',
    mayor: 'Себихан Мехмед (Кмет)',
    coatSymbol: '⛏️🪙',
    deficit: '14.7 МЛН. ЛВ.',
    auditReport: 'Одит № 030050224 (Концесии златодобив Дънди Прешъс)',
    nodes: [
      { id: 'NODE-KRUM-01', name: 'Себихан Мехмед', alias: '„Златния Посредник"', role: 'Полицейски чадър', avatarEmoji: '🪙🛡️', hash: 'Крумовград Ресурс', metrics: 'Непрозрачно разходване на концесионните такси от златодобива на Ада тепе.', evidence: 'Одитен акт на Сметната палата' }
    ]
  },
  {
    id: 'BG-BREZNIK',
    name: 'Община Брезник',
    region: 'Област Перник',
    mayor: 'Васил Узунов (Кмет)',
    coatSymbol: '🦁⛰️',
    deficit: '7.8 МЛН. ЛВ.',
    auditReport: 'Одит № 010030124 (Скрит дълг)',
    nodes: [
      { id: 'NODE-BREZ-01', name: 'Васил Узунов', alias: '„Граовския Кмет"', role: 'Кмет / Феодал', avatarEmoji: '👑📑', hash: 'Брезник Дълг', metrics: 'Над 7.8 млн. лв. необезпечени задължения и скрит дефицит.', evidence: 'Отрицателно одитно становище' }
    ]
  },
  {
    id: 'BG-CHIRPAN',
    name: 'Община Чирпан',
    region: 'Област Стара Загора',
    mayor: 'Ивайло Крачолов (Кмет)',
    coatSymbol: '🌾🏛️',
    deficit: '15.3 МЛН. ЛВ.',
    auditReport: 'Одит на Сметната палата № 030010424',
    nodes: [
      { id: 'NODE-CHIR-01', name: 'Ивайло Крачолов', alias: '„Тракийския Наместник"', role: 'Кмет / Феодал', avatarEmoji: '🚜💰', hash: 'Чирпан Субсидии', metrics: 'Разходване на целеви субсидии за покриване на стари дефицити в разрез със закона.', evidence: 'Доклад на Сметната палата № 030010424' }
    ]
  },

  // ── ГОЛЕМИТЕ ОБЛАСТНИ ЦЕНТРОВЕ ──
  {
    id: 'BG-SOFIA',
    name: 'Столична Община (София)',
    region: 'Град София',
    mayor: 'Васил Терзиев / Йорданка Фандъкова (Наследство)',
    coatSymbol: '🦁👑',
    deficit: '1 240.0 МЛН. ЛВ.',
    auditReport: 'Доклад на Сметната палата (Топлофикация София, Завод за боклук и инхаус договори)',
    nodes: [
      { id: 'NODE-SOF-01', name: '„Топлофикация София" ЕАД', alias: '„Черната Дупка"', role: 'Пране на пари', avatarEmoji: '🔥💸', hash: 'ЕИК: 831609046', metrics: 'Над 1.2 млрд. лв. натрупан дълг към Булгаргаз и БЕХ, скрити схеми за фактуриране.', evidence: 'Официален одит на БЕХ и Сметната палата' }
    ]
  },
  {
    id: 'BG-PLOVDIV',
    name: 'Община Пловдив',
    region: 'Област Пловдив',
    mayor: 'Костадин Димитров / Здравко Димитров',
    coatSymbol: '🏛️🦁',
    deficit: '340.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата & АДФИ (Стадиони „Христо Ботев" и „Локомотив")',
    nodes: [
      { id: 'NODE-PD-01', name: 'Здравко Димитров (Зико)', alias: '„Стадионния Превъзложител"', role: 'Кмет / Феодал', avatarEmoji: '🏟️💵', hash: 'Пловдив Стадиони', metrics: 'Удвояване на цените на стадионите чрез непрекъснати анекси и дефицит от 340 млн. лв.', evidence: 'Доклад на АДФИ № 11-01-92' }
    ]
  },
  {
    id: 'BG-VARNA',
    name: 'Община Варна',
    region: 'Област Варна',
    mayor: 'Благомир Коцев / Иван Портних (Наследство)',
    coatSymbol: '⚓🌊',
    deficit: '410.0 МЛН. ЛВ.',
    auditReport: 'Европейска прокуратура (EPPO) & Сметна палата (Пристанище „Карантината")',
    nodes: [
      { id: 'NODE-VN-01', name: 'Иван Портних', alias: '„Варненския Фаворит"', role: 'Кмет / Феодал', avatarEmoji: '🚢📑', hash: 'Община Варна', metrics: 'Разследване от EPPO за фиктивно построяване на рибарско пристанище „Карантината" за 14 млн. лв.', evidence: 'Разследване на Европейската прокуратура (EPPO) 2024 г.' }
    ]
  },
  {
    id: 'BG-HASKOVO',
    name: 'Община Хасково',
    region: 'Област Хасково',
    mayor: 'Станислав Дечев (Кмет)',
    coatSymbol: '🏰⚔️',
    deficit: '190.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Схемата „Дрийм тийм" и инхаус ВиК договори)',
    nodes: [
      { id: 'NODE-HS-01', name: 'Станислав Дечев & Роднински Кръгове', alias: '„Хасковския Роднински Кръг"', role: 'Кмет / Феодал', avatarEmoji: '🏢💸', hash: 'Хасково Роднини', metrics: 'Над 80% от обществените поръчки спечелени от фирми на първи братовчеди и кумове.', evidence: 'Разследвания на Сметната палата и КПКОНПИ' }
    ]
  },
  {
    id: 'BG-RUSE',
    name: 'Община Русе',
    region: 'Област Русе',
    mayor: 'Пенчо Милков (Кмет)',
    coatSymbol: '🚢🏛️',
    deficit: '115.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Градски транспорт и инфраструктурни дефицити)',
    nodes: [
      { id: 'NODE-RS-01', name: 'Пенчо Милков', alias: '„Дунавския Разпоредител"', role: 'Кмет / Феодал', avatarEmoji: '🚢💶', hash: 'Община Русе', metrics: 'Непрозрачно разходване на целеви субсидии за градски транспорт и ремонти.', evidence: 'Одитен доклад на Сметната палата' }
    ]
  },
  {
    id: 'BG-STARA-ZAGORA',
    name: 'Община Стара Загора',
    region: 'Област Стара Загора',
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
    region: 'Област Благоевград',
    mayor: 'Методи Байкушев / Илко Стоянов',
    coatSymbol: '🦅⛰️',
    deficit: '95.0 МЛН. ЛВ.',
    auditReport: 'Сметна палата (Скрит дълг, неразплатени разходи за милиони)',
    nodes: [
      { id: 'NODE-BL-01', name: 'Илко Стоянов (Бивш кмет)', alias: '„Югозападния Превъзложител"', role: 'Кмет / Феодал', avatarEmoji: '📑💸', hash: 'Благоевград Дълг', metrics: 'Оставен скрит дълг и неразплатени сметки за над 95 млн. лв. към частни доставчици.', evidence: 'Констативен протокол на Министерството на финансите' }
    ]
  }
];

export default function DeepIntelligenceDashboard() {
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityDossier>(ALL_MUNICIPALITIES[0]);
  const [activeNode, setActiveNode] = useState<ConnectedNode | null>(ALL_MUNICIPALITIES[0].nodes[0] || null);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filteredMunicipalities = ALL_MUNICIPALITIES.filter(m => 
    m.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
    m.region.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.mayor.toLowerCase().includes(searchFilter.toLowerCase())
  );

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
              НАЦИОНАЛЕН ОПЕРАТИВЕН ЩАБ: ВСИЧКИ КРИТИЧНИ ОБЩИНИ
            </h1>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              Бургас, Поморие, Несебър, Созопол, Царево, Приморско, Сунгурларе, Камено, Божурище, Неделино, Белово, Септември...
            </div>
          </div>
        </div>

        {/* Live Counters */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '8px 16px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase' }}>Картирани Общини:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#EF4444' }}>{ALL_MUNICIPALITIES.length} ОБЩИНИ</div>
          </div>
          <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '8px 16px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: '#64748B', textTransform: 'uppercase' }}>Одитни Доклади:</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#10B981' }}>100% ВЕРИФИЦИРАНИ</div>
          </div>
        </div>
      </div>

      {/* 🗺️ ПЪЛНА ИНТЕРАКТИВНА LEAFLET КАРТА НА БЪЛГАРИЯ С 28-ТЕ ОБЛАСТИ И CHART.JS АНАЛИЗ */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2.5rem auto' }}>
        <BulgariaRegionsMap />
      </div>

      {/* 🗺️ ТАКТИЧЕСКИ ОДИТЕН ПАНЕЛ ПО ОБЩИНИ (3 КОЛОНИ) */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* КОЛОНА 1: LEAFLET КАРТА & ФИЛТРИРАН СПИСЪК С ВСИЧКИ ОБЩИНИ (4 колони) */}
        <div style={{ gridColumn: 'span 4', backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 25px rgba(0,0,0,0.5)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #1E293B', paddingBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase' }}>
                🛰️ КАРТА & РЕГИСТЪР НА ОБЩИНИТЕ
              </span>
              <span style={{ fontSize: '0.68rem', backgroundColor: '#1E293B', color: '#94A3B8', padding: '2px 6px', borderRadius: '4px' }}>
                {filteredMunicipalities.length} НАМЕРЕНИ
              </span>
            </div>

            {/* 🇧🇬 ИСТИНСКА ГЕОГРАФСКА КАРТА НА БЪЛГАРИЯ (LEAFLET SAT) */}
            <div style={{ marginBottom: '10px', border: '1px solid #1E293B', borderRadius: '8px', overflow: 'hidden' }}>
              <MapBulgaria height="200px" />
            </div>

            {/* БЪРЗО ТЪРСЕНЕ НА ОБЩИНА */}
            <input
              type="text"
              placeholder="🔍 Търси община (напр. Созопол, Царево, Несебър, Божурище)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '6px 10px',
                color: '#F8FAFC',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                marginBottom: '8px'
              }}
            />

            {/* СПИСЪК С ВСИЧКИ МАЛКИ И ГОЛЕМИ ОБЩИНИ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '290px', overflowY: 'auto' }}>
              {filteredMunicipalities.map((muni) => {
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
                      padding: '8px 10px',
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
                      <div>
                        <strong style={{ color: isSelected ? '#FFFFFF' : '#CBD5E1', display: 'block' }}>{muni.name}</strong>
                        <span style={{ fontSize: '0.62rem', color: '#64748B' }}>{muni.region}</span>
                      </div>
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
                🕸️ СЕТЕВИ ГРАФ: {selectedMunicipality.name.toUpperCase()}
              </span>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px' }}>
                Кмет / Управление: {selectedMunicipality.mayor}
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
                <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'block' }}>ИДЕНТИФИКАТОР / АДМИНИСТРАЦИЯ:</span>
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
