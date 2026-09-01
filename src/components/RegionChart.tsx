'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export interface RegionStats {
  deficitMillions?: number;
  unauthorizedContracts?: number;
  signalsCount?: number;
  auditsCount?: number;
  trendYears?: string[];
  trendDeficit?: number[];
  [k: string]: any;
}

interface RegionChartProps {
  regionName: string;
  stats: RegionStats;
}

export const RegionChart: React.FC<RegionChartProps> = ({ regionName, stats }) => {
  const labels = ['Дефицит (млн. лв.)', 'Неправомерни договори', 'Подадени сигнали', 'Одитни актове'];

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Одитни показатели',
        data: [
          stats.deficitMillions ?? 120,
          stats.unauthorizedContracts ?? 14,
          stats.signalsCount ?? 42,
          stats.auditsCount ?? 5,
        ],
        backgroundColor: ['#DC2626', '#EAB308', '#38BDF8', '#10B981'],
        borderRadius: 4,
      },
    ],
  };

  const lineLabels = stats.trendYears || ['2021', '2022', '2023', '2024', '2025'];
  const dataLine = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Натрупване на щети (млн. лв.)',
        data: stats.trendDeficit || [45, 90, 160, 240, 310],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.35,
        fill: true,
        pointBackgroundColor: '#DC2626',
      },
    ],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid #1E293B' }}>
        <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          📊 Основни одитни показатели: {regionName}
        </span>
        <div style={{ height: '180px' }}>
          <Bar
            data={dataBar}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#0F172A',
                  titleColor: '#FFFFFF',
                  bodyColor: '#38BDF8',
                  borderColor: '#334155',
                  borderWidth: 1,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: 'rgba(255, 255, 255, 0.05)' },
                  ticks: { color: '#64748B', font: { size: 10 } },
                },
                x: {
                  grid: { display: false },
                  ticks: { color: '#94A3B8', font: { size: 9 } },
                },
              },
            }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid #1E293B' }}>
        <span style={{ fontSize: '0.72rem', color: '#F87171', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          📈 Прогресия на фискалните дефицити
        </span>
        <div style={{ height: '160px' }}>
          <Line
            data={dataLine}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: '#0F172A',
                  titleColor: '#FFFFFF',
                  bodyColor: '#F87171',
                  borderColor: '#DC2626',
                  borderWidth: 1,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: 'rgba(255, 255, 255, 0.05)' },
                  ticks: { color: '#64748B', font: { size: 10 } },
                },
                x: {
                  grid: { display: false },
                  ticks: { color: '#94A3B8', font: { size: 10 } },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegionChart;
