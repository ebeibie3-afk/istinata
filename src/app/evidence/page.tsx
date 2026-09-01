import { INITIAL_VERITAS_EVENTS } from "@/data/events";

export default function EvidencePage() {
  const allDocuments = INITIAL_VERITAS_EVENTS.flatMap(e => 
    e.evidence.map(doc => ({
      ...doc,
      eventTitle: e.title,
      eventDate: e.date,
      sector: e.sector
    }))
  );

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1rem' }}>
          📑 ОФИЦИАЛНИ ДОКУМЕНТИ & ОДИТНИ ИЗТОЧНИЦИ
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
          Регистър на Доказателствата
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto' }}>
          Всички данни в платформата са подкрепени с директен първичен източник. Няма твърдение без официален номер на одит, договор или стенограма.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.8rem 1rem' }}>Дата</th>
              <th style={{ padding: '0.8rem 1rem' }}>Документ / Номер</th>
              <th style={{ padding: '0.8rem 1rem' }}>Институция / Източник</th>
              <th style={{ padding: '0.8rem 1rem' }}>Тип</th>
              <th style={{ padding: '0.8rem 1rem' }}>Свързан Казус</th>
              <th style={{ padding: '0.8rem 1rem', textAlign: 'right' }}>Действие</th>
            </tr>
          </thead>
          <tbody>
            {allDocuments.map((doc, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  {doc.datePublished}
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {doc.title}
                </td>
                <td style={{ padding: '1rem', color: 'var(--accent-cyan)' }}>
                  {doc.sourceName}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-secondary)' }}>
                    {doc.documentType}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {doc.eventTitle}
                </td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <a
                    href={doc.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(0, 240, 255, 0.1)',
                      border: '1px solid var(--border-accent)',
                      color: 'var(--accent-cyan)',
                      fontWeight: 600,
                      fontSize: '0.8rem'
                    }}
                  >
                    Отвори ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
