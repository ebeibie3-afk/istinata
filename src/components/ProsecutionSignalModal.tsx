'use client';

import React, { useState } from 'react';
import { VeritasEvent } from '@/types';

interface ProsecutionSignalProps {
  event: VeritasEvent;
}

export const ProsecutionSignalModal: React.FC<ProsecutionSignalProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const signalLegalTemplate = `ДО:
ВЪРХОВНА ПРОКУРАТУРА НА РЕПУБЛИКА БЪЛГАРИЯ
ГЛАВНА ДИРЕКЦИЯ „БОРБА С ОРГАНИЗИРАНАТА ПРЕСТЪПНОСТ" (ГДБОП)
КОМИСИЯ ЗА ПРОТИВОДЕЙСТВИЕ НА КОРУПЦИЯТА (КПК)

С И Г Н А Л
ОТНОСНО: Данни за закононарушения и неправомерно разходване на публични средства
ПО СЛУЧАЙ: ${event.title}

УВАЖАЕМИ МАГИСТРАТИ И СЛЕДОВАТЕЛИ,

На основание Чл. 205 от Наказателно-процесуалния кодекс (НПК) и Чл. 41 от Конституцията на Република България, с настоящото сезирам компетентните органи относно следните публично верифицирани данни за престъпления по служба и безстопанственост в особено големи размери:

1. ФАКТИЧЕСКА ОБСТАНОВКА:
${event.fullDescription}

2. ДОКУМЕНТИРАНИ ФИНАНСОВИ ПАРАМЕТРИ:
- Приблизителен размер на щетата / авансово раздадени суми: ${(event.amountBgn ? (event.amountBgn / 1000000).toLocaleString('bg-BG') + ' млн. лв.' : 'В особено големи размери')}
- Замесени държавни органи: ${event.involvedInstitutions.join(', ')}
- Замесени търговски субекти и консорциуми: ${event.involvedCompanies.join(', ')}

3. ПРИЛОЖЕНИ ПЪРВИЧНИ ДОКУМЕНТИ И ОДИТНИ АКТОВЕ:
${event.evidence.map(e => `- ${e.title} (${e.sourceName}, публикуван на ${e.datePublished})`).join('\n')}

С оглед на гореизложеното,
МОЛЯ ДА ОБРАЗУВАТЕ ПРОВЕРКА ЗА УСТАНОВЯВАНЕ НА:
1. Извършени престъпления по Чл. 219 (Безстопанственост), Чл. 282 (Престъпление по служба) и Чл. 254а от Наказателния кодекс.
2. Лицата, разпоредили и разрешили плащанията без предвидените в ЗОП открити процедури.

Дата: ${new Date().toLocaleDateString('bg-BG')}
Подател: Граждански наблюдател / Платформа VERITAS (veritras.online)
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(signalLegalTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: '#991B1B',
          color: '#FFFFFF',
          border: 'none',
          padding: '0.45rem 0.9rem',
          borderRadius: '4px',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <span>⚖️ Генерирай Сигнал до Прокуратурата</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #334155',
            maxWidth: '750px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            {/* Header */}
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#F43F5E', fontWeight: 800, textTransform: 'uppercase' }}>ПРАВЕН БОТ • ЧЛ. 205 ОТ НПК</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '2px 0 0 0' }}>Официална Бланка за Сигнал</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ backgroundColor: 'transparent', border: 'none', color: '#94A3B8', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Signal Text Area */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1rem' }}>
                Текстът по-долу е форматиран по стандартите на българското наказателно право с точните членове от НК и цитати на одитните доклади. Копирайте го и го подайте в <a href="https://prb.bg" target="_blank" rel="noopener noreferrer" style={{ color: '#38BDF8', textDecoration: 'underline' }}>деловодството на Прокуратурата</a> или ГДБОП.
              </p>
              <textarea
                readOnly
                value={signalLegalTemplate}
                style={{
                  width: '100%',
                  height: '280px',
                  backgroundColor: '#020617',
                  border: '1px solid #334155',
                  borderRadius: '4px',
                  color: '#CBD5E1',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  padding: '1rem',
                  lineHeight: '1.5',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            {/* Footer Actions */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                100% Верифицирани правни реквизити
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleCopy}
                  style={{
                    backgroundColor: copied ? '#10B981' : '#2563EB',
                    color: '#FFF',
                    border: 'none',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {copied ? '✓ Копирано в клипборда' : '📋 Копирай готовия сигнал'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    backgroundColor: '#1E293B',
                    color: '#FFF',
                    border: '1px solid #334155',
                    padding: '0.6rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Затвори
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
