import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { LiveCorruptionClock } from "@/components/LiveCorruptionClock";
import HoneypotGuard from "@/components/HoneypotGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "VERITAS | Център за Граждански Одит и Разследвания (veritras.online)",
  description: "Официален регистър за разследвания на злоупотреби с обществени поръчки, еврофондове и държавен ресурс. 100% официални документи и първични одитни актове.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <HoneypotGuard />
        <LiveCorruptionClock />
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 140px)' }}>
          {children}
        </main>
        
        {/* Deep Navy Corporate Footer with OSINT Open Archive Dump, Magistrates Radar, White List, and Mafia Intersection */}
        <footer style={{
          backgroundColor: '#0F172A',
          color: '#94A3B8',
          padding: '3.5rem 1.5rem',
          borderTop: '3px solid #1A2B4C',
          fontSize: '0.9rem'
        }}>
          <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', marginBottom: '0.8rem' }}>
                VERITAS (veritras.online)
              </div>
              <p style={{ lineHeight: '1.6', fontSize: '0.85rem' }}>
                Център за граждански одит и разследвания на публичните финанси в Република България съгласно Чл. 41 от Конституцията и ЗДОИ.
              </p>
            </div>

            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '0.8rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                Разследвания & Инструменти
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                <li><a href="/dashboard" style={{ color: '#F43F5E', fontWeight: 900 }}>🛰️ Единен Команден Център (Dashboard)</a></li>
                <li><a href="/magistrates-radar" style={{ color: '#38BDF8', fontWeight: 900 }}>⚖️ Радар на Магистратите (Интегритет)</a></li>
                <li><a href="/white-list" style={{ color: '#10B981', fontWeight: 900 }}>🛡️ Граждански Бял Списък (Чисти Служители)</a></li>
                <li><a href="/mafia-intersection" style={{ color: '#F43F5E', fontWeight: 900 }}>⛓️ Тракер: Мафия & Власт (Пресечни Точки)</a></li>
                <li><a href="/presidential-radar" style={{ color: '#FBBF24', fontWeight: 800 }}>🛰️ Президентски Радар 2026 (Скенер Сламки)</a></li>
                <li><a href="/dashboard" style={{ color: '#F43F5E', fontWeight: 800 }}>Карта на Чадъра по Общини</a></li>
                <li><a href="/narcotics-pyramid" style={{ color: '#F43F5E', fontWeight: 800 }}>🔺 Наркопирамида (5-те Нива на Йерархията)</a></li>
                <li><a href="/signals-tracker" style={{ color: '#38BDF8', fontWeight: 700 }}>⚖️ Проследяване на Сигналите (Вх. Номера)</a></li>
                <li><a href="/municipalities" style={{ color: '#F43F5E', fontWeight: 700 }}>🏛️ Общински Радар (10-те Отрицателни Одита)</a></li>
                <li><a href="/persons" style={{ color: '#38BDF8', fontWeight: 700 }}>👤 Картотека на Властта & Имотите</a></li>
                <li><a href="/dashboard" style={{ color: '#F59E0B', fontWeight: 700 }}>Регистър на Наркоканалите & Чадъра</a></li>
                <li><a href="/flow-visualizer" style={{ color: '#CBD5E1' }}>📊 Схема на Паричните Потоци (Sankey)</a></li>
                <li><a href="/evidence" style={{ color: '#CBD5E1' }}>📑 Първични Одитни Доклади</a></li>
                <li><a href="/privacy" style={{ color: '#CBD5E1' }}>🔒 Декларация за Поверителност (Tor & Zero-Log)</a></li>
              </ul>
            </div>

            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: '0.8rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                Отворен Граждански Архив (OSINT Data Dump)
              </div>
              <div style={{ backgroundColor: '#020617', border: '1px solid #1E293B', padding: '1rem', borderRadius: '6px', fontSize: '0.82rem', lineHeight: '1.5' }}>
                <div style={{ color: '#10B981', fontWeight: 800, marginBottom: '4px' }}>
                  📦 ДЕЦЕНТРАЛИЗИРАНО СЪХРАНЕНИЕ:
                </div>
                <p style={{ color: '#94A3B8', margin: '0 0 8px 0' }}>
                  Всички разследвания, договори и одитни доклади са огледално архивирани в децентрализирани хранилища. Дори сайтът да бъде цензуриран, данните остават достъпни.
                </p>
                <a 
                  href="https://veritras.online/" 
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#1E293B',
                    color: '#38BDF8',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    border: '1px solid #334155'
                  }}
                >
                  🌐 Децентрализиран Публичен Архив
                </a>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: '1350px', margin: '2.5rem auto 0 auto', paddingTop: '1.5rem', borderTop: '1px solid #1E293B', textAlign: 'center', fontSize: '0.78rem' }}>
            © 2026 VERITAS (veritras.online). Публичен регистър за граждански разследвания. Всички права запазени.
          </div>
        </footer>
      </body>
    </html>
  );
}
