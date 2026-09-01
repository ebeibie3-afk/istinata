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
  Filler,
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
  Legend,
  Filler
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
  const years = stats.trendYears && stats.trendYears.length === 5 
    ? stats.trendYears 
    : ['2020', '2021', '2022', '2023', '2024'];
    
  const trendData = stats.trendDeficit && stats.trendDeficit.length === 5
    ? stats.trendDeficit
    : [20, 50, 100, 180, stats.deficitMillions || 250];

  const barData = {
    labels: ['Дефицит (млн. лв.)', 'Неправомерни договори', 'Подадени сигнали', 'Одитни актове'],
    datasets: [
      {
        label: `Основни одитни показатели: ${regionName}`,
        data: [
          stats.deficitMillions ?? 0,
          stats.unauthorizedContracts ?? 0,
          stats.signalsCount ?? 0,
          stats.auditsCount ?? 0
        ],
        backgroundColor: [
          'rgba(220, 38, 38, 0.85)',
          'rgba(234, 179, 8, 0.85)',
          'rgba(56, 189, 248, 0.85)',
          'rgba(16, 185, 129, 0.85)'
        ],
        borderColor: [
          '#DC2626',
          '#EAB308',
          '#38BDF8',
          '#10B981'
        ],
        borderWidth: 1.5,
        borderRadius: 4
      }
    ]
  };

  const lineData = {
    labels: years,
    datasets: [
      {
        label: `Прогресия на дефицита (млн. лв.) - ${regionName}`,
        data: trendData,
        fill: true,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        tension: 0.35,
        pointBackgroundColor: '#DC2626',
        pointBorderColor: '#FFFFFF',
        pointRadius: 4
      }
    ]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#CBD5E1',
          font: { family: 'var(--font-mono)', size: 11, weight: 700 as const }
        }
      },
      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#FFFFFF',
        bodyColor: '#38BDF8',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10
      }
    },
    scales: {
      x: {
        ticks: { color: '#94A3B8', font: { family: 'var(--font-mono)', size: 10 } },
        grid: { color: '#1E293B' }
      },
      y: {
        ticks: { color: '#94A3B8', font: { family: 'var(--font-mono)', size: 10 } },
        grid: { color: '#1E293B' }
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* Bar Chart */}
      <div style={{ backgroundColor: '#020617', padding: '14px', borderRadius: '8px', border: '1px solid #1E293B', height: '220px' }}>
        <Bar data={barData} options={commonOptions} />
      </div>

      {/* Progression Line Chart */}
      <div style={{ backgroundColor: '#020617', padding: '14px', borderRadius: '8px', border: '1px solid #1E293B', height: '200px' }}>
        <div style={{ fontSize: '0.72rem', color: '#EF4444', fontWeight: 800, marginBottom: '6px', textTransform: 'uppercase' }}>
          📈 Прогресия на фискалните дефицити (2020–2024 г.)
        </div>
        <div style={{ height: '160px' }}>
          <Line data={lineData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
};

export default RegionChart;
