import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
        <span className="badge-audit" style={{ marginBottom: '0.8rem', display: 'inline-block' }}>
          ПРАВЕН СТАНДАРТ & ЗАЩИТА НА ИЗТОЧНИЦИТЕ
        </span>
        <h1 style={{ fontSize: '2.4rem', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>
          Декларация за Поверителност и Zero-Log Защита
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Съгласно Директива (ЕС) 2019/1937 на Европейския парламент и Закона за защита на лицата, подаващи сигнали.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '0.95rem', color: '#334155', lineHeight: '1.7' }}>
        <section className="editorial-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--brand-navy)', marginBottom: '0.8rem' }}>
            1. Zero-Log Политика (Пълно отсъствие на журнали)
          </h2>
          <p style={{ color: '#E2E8F0', lineHeight: '1.7', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
            Платформата <strong>VERITAS (veritras.online)</strong> оперира под стриктен Zero-Log протокол. Ние не записваме, не съхраняваме и не обработваме IP адреси, видове браузъри, бисквитки за проследяване (tracking cookies) или системни метаданни на посетителите и информаторите.
          </p>
        </section>

        <section className="editorial-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--brand-navy)', marginBottom: '0.8rem' }}>
            2. Защита на Сигналите и Документите
          </h2>
          <p>
            Всички подадени сигнали през формуляра за анонимно докладване или чрез криптираните канали (ProtonMail PGP) се предават директно в криптиран вид. Прикачените файлове се преглеждат единствено за фактологична проверка спрямо официалните регистри (Търговски регистър, ЦАИС ЕОП, Сметна палата) преди публикация.
          </p>
        </section>

        <section className="editorial-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: 'var(--brand-navy)', marginBottom: '0.8rem' }}>
            3. Препоръки за Лична Сигурност на Информаторите
          </h2>
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>Не изпращайте сигнали от служебни компютри, служебни имейли или мрежи, контролирани от вашия работодател.</li>
            <li>Премахвайте метаданните (EXIF данни за геолокация и устройство) от снимките и PDF документите преди изпращане.</li>
            <li>За максимална анонимност използвайте браузъра <strong>Tor</strong> или защитени криптирани приложения като <strong>Signal</strong>.</li>
          </ul>
        </section>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/whistleblower" className="btn-whistleblower">
            🔒 Към Формуляра за Подаване на Сигнал
          </Link>
        </div>
      </div>
    </div>
  );
}
