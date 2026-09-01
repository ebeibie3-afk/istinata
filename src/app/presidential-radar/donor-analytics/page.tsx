'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { analyzeDonors, RawDonor, ProcurementContract } from '@/utils/donorAnalyzer';

const mockDonors: RawDonor[] = [
  { donorName: 'Николай Петров', egnOrIdHash: '***', donatedAmount: 10000, employerName: '„Пътстрой Инженеринг" ЕООД', employerEik: '123456789' },
  { donorName: 'Мария Тодорова', egnOrIdHash: '***', donatedAmount: 4500, employerName: '„Глобъл Системи" АД', employerEik: '987654321' },
  { donorName: 'Георги Иванов', egnOrIdHash: '***', donatedAmount: 8000, employerName: '„Еко Строй Мениджмънт" ЕООД', employerEik: '201948572' }
];

const mockContracts: ProcurementContract[] = [
  { eik: '123456789', companyName: '„Пътстрой Инженеринг" ЕООД', totalContractsValue: 14200000, contractCount: 4, fundingInstitution: 'Община / АПИ' },
  { eik: '987654321', companyName: '„Глобъл Системи" АД', totalContractsValue: 1850000, contractCount: 1, fundingInstitution: 'Министерство на електронното управление' },
  { eik: '201948572', companyName: '„Еко Строй Мениджмънт" ЕООД', totalContractsValue: 8400000, contractCount: 3, fundingInstitution: 'Община Божурище / Сунгурларе' }
];

export default function DonorAnalyticsPage() {
  const anomalyReports = useMemo(() => analyzeDonors(mockDonors, mockContracts), []);

  return (
    <div style={{ backgroundColor: '#020617', color: '#F8FAFC', minHeight: '100vh', padding: '2.5rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
      
      {/* HEADER */}
      <div style={{ maxWidth: '1350px', margin: '0 auto 2.5rem auto', borderBottom: '1px solid #1E293B', paddingBottom: '1.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#F43F5E',
            backgroundColor: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 800
          }}>
            🛡️ АЛГОРИТЪМ „СКЕНЕР СЛАМКИ"
          </span>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            color: '#38BDF8',
            backgroundColor: 'rgba(56, 189, 248, 0.1)',
            padding: '3px 10px',
            borderRadius: '4px'
          }}>
            КРЪСТОСАН АНАЛИЗ: ДАРЕНИЯ ЗА КАМПАНИИ ➔ ЦАИС ЕОП ДОГОВОРИ
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', margin: '0.4rem 0' }}>
              Кръстосан Анализ: Дарения срещу Обществени Поръчки
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '850px', lineHeight: '1.6' }}>
              Системата засича автоматично служители или подставени лица, които финансират 
              предизборни кампании на кандидат-президенти, паралелно с усвояването на държавни милиони през ЦАИС EOP.
            </p>
          </div>

          <Link
            href="/presidential-radar"
            style={{
              color: '#38BDF8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              textDecoration: 'underline'
            }}
          >
            ⬅️ Обратно към Президентския Радар
          </Link>
        </div>
      </div>

      {/* ANALYSIS GRID */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        {anomalyReports.map((report, idx) => (
          <div key={idx} style={{ backgroundColor: '#0B132B', border: '1px solid #1E293B', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 15px 25px rgba(0,0,0,0.4)' }}>
            
            {/* Top Bar */}
            <div style={{ padding: '1.2rem 1.6rem', background: 'linear-gradient(90deg, #0B132B 0%, #070D1E 100%)', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  backgroundColor: report.alertLevel === 'КРИТИЧЕН' ? 'rgba(225, 29, 72, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                  color: report.alertLevel === 'КРИТИЧЕН' ? '#FB7185' : '#FBBF24',
                  border: report.alertLevel === 'КРИТИЧЕН' ? '1px solid rgba(225, 29, 72, 0.4)' : '1px solid rgba(234, 179, 8, 0.4)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  ФЛАГ: {report.alertLevel}
                </span>
                <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                  Дарител: {report.donorName}
                </h2>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <span style={{ color: '#94A3B8' }}>Лично дарение за кампанията: </span>
                <strong style={{ color: '#F43F5E', fontSize: '1rem' }}>{report.donatedAmount.toLocaleString('bg-BG')} лв.</strong>
              </div>
            </div>

            {/* 3-Column Comparison Box */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1px',
              backgroundColor: '#1E293B',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)'
            }}>
              
              {/* Box 1: Employer */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Работодател / Свързана фирма:</span>
                <strong style={{ color: '#FFFFFF', fontSize: '1rem' }}>{report.connectedCompany}</strong>
                <span style={{ color: '#38BDF8', fontSize: '0.78rem' }}>ЕИК: {report.companyEik}</span>
              </div>

              {/* Box 2: Public Procurement Value */}
              <div style={{ backgroundColor: '#0B132B', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase' }}>Усвоени средства през ЦАИС ЕОП:</span>
                <strong style={{ color: '#FBBF24', fontSize: '1.2rem' }}>+ {(report.procurementValue / 1000000).toFixed(1)} МЛН. лв.</strong>
                <span style={{ color: '#64748B', fontSize: '0.72rem' }}>*Въз основа на официални публични договори</span>
              </div>

              {/* Box 3: Risk Ratio */}
              <div style={{ backgroundColor: '#070D1E', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#FB7185', textTransform: 'uppercase', fontWeight: 800 }}>Коефициент на Възвращаемост:</span>
                  <p style={{ color: '#CBD5E1', margin: '6px 0 0 0', lineHeight: '1.5' }}>
                    Държавните поръчки на фирмата надвишават личното дарение на служителя точно <span style={{ color: '#F43F5E', fontWeight: 900, fontSize: '1.05rem', textDecoration: 'underline' }}>{report.riskRatio} пъти</span>.
                  </p>
                </div>

                <div style={{ textAlign: 'right', paddingTop: '6px' }}>
                  <a href="https://app.eop.bg" target="_blank" rel="noopener noreferrer" style={{ color: '#38BDF8', textDecoration: 'underline', fontSize: '0.75rem' }}>
                    Виж договорите в ЦАИС ЕОП ➔
                  </a>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
