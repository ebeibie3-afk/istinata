import Link from "next/link";
import { INITIAL_VERITAS_EVENTS } from "@/data/events";

const SECTORS_CONFIG = [
  {
    id: 'TRANSPORT_INFRASTRUCTURE',
    title: '🛣️ Транспорт и Пътна Инфраструктура',
    leadAgency: 'АПИ / МРРБ / Автомагистрали ЕАД',
    description: 'Инхаус договори, аванси за автомагистрали, ремонти на републиканската пътна мрежа, цена на километър и надзор.',
    highlightAmount: '1.18+ Млрд. лв.',
    badgeClass: 'badge-infra',
    eventsCount: INITIAL_VERITAS_EVENTS.filter(e => e.sector === 'TRANSPORT_INFRASTRUCTURE').length
  },
  {
    id: 'HEALTHCARE',
    title: '🏥 Здравеопазване и Лекарствена Политика',
    leadAgency: 'НЗОК / Министерство на здравеопазването / ИАЛ',
    description: 'Анализ на реимбурсирането на онколекарства, обществени поръчки за медицинска апаратура, болнични бюджети и търговски дистрибутори.',
    highlightAmount: '84+ Млн. лв.',
    badgeClass: 'badge-health',
    eventsCount: INITIAL_VERITAS_EVENTS.filter(e => e.sector === 'HEALTHCARE').length
  },
  {
    id: 'EU_FUNDS',
    title: '🇪🇺 Европейски Фондове и Земеделски Субсидии',
    leadAgency: 'ДФ „Земеделие" / ИСУН 2020 / ОЛАФ',
    description: 'Програми за развитие на селските райони (ПРСР), къщи за гости, регионално развитие, финансиране за иновации и наложени финансови корекции.',
    highlightAmount: '45+ Млн. лв.',
    badgeClass: 'badge-eu',
    eventsCount: INITIAL_VERITAS_EVENTS.filter(e => e.sector === 'EU_FUNDS').length
  },
  {
    id: 'JUDICIARY',
    title: '⚖️ Правосъдие, Митници и Сигурност',
    leadAgency: 'Агенция „Митници" / МВР / СГС / КПКОНПИ',
    description: 'Контрабандни канали, граничен контрол, разследвания на ОПГ, съдебни актове и кадрови назначения в силовите ведомства.',
    highlightAmount: '150+ Млн. лв.',
    badgeClass: 'badge-judiciary',
    eventsCount: INITIAL_VERITAS_EVENTS.filter(e => e.sector === 'JUDICIARY').length
  },
  {
    id: 'ENERGY',
    title: '⚡ Енергетика и Концесии',
    leadAgency: 'БЕХ / НЕК / КЕВР / Министерство на енергетиката',
    description: 'Обществени поръчки за ремонт на енергийни блокове, търговия с въглеродни емисии, транзитни такси и концесионни договори.',
    highlightAmount: 'В процес на одит',
    badgeClass: 'badge-eu',
    eventsCount: 0
  },
  {
    id: 'MUNICIPALITIES',
    title: '🏛️ Общински Бюджети (265 Общини)',
    leadAgency: 'Сметна палата / Общински съвети',
    description: 'Местни данъци и такси, чистота, инженеринг, дългове на общините и разходване на целеви държавни субсидии.',
    highlightAmount: 'В процес на агрегация',
    badgeClass: 'badge-infra',
    eventsCount: 0
  }
];

export default function SectorsPage() {
  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge" style={{ backgroundColor: 'rgba(0, 240, 255, 0.12)', color: 'var(--accent-cyan)', border: '1px solid var(--border-accent)', marginBottom: '1rem' }}>
          🗂️ СЕКТОРЕН РАЗРЕЗ НА ПУБЛИЧНИТЕ РАЗХОДИ
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
          Секторни Одити и Направления
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto' }}>
          Прегледайте разходването на средствата, одитните констатации и ключовите договори по отделни държавни сектори.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.8rem' }}>
        {SECTORS_CONFIG.map((sector) => (
          <div key={sector.id} className="glass-panel" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className={`badge ${sector.badgeClass}`}>
                  {sector.eventsCount} Документирани случая
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                  {sector.highlightAmount}
                </span>
              </div>

              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {sector.title}
              </h2>

              <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.8rem' }}>
                🏛️ Институции: {sector.leadAgency}
              </p>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {sector.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link 
                href={`/timeline?sector=${sector.id}`}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Виж събитията в сектора →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
