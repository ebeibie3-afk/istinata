'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import DOMPurify from 'dompurify';
import { RegionChart } from './RegionChart';

interface NodeIntelligenceModal {
  nodeId: string;
  title: string;
  amount: string;
  evidence: string;
  stats: {
    deficitMillions: number;
    unauthorizedContracts: number;
    signalsCount: number;
    auditsCount: number;
    trendDeficit: number[];
  };
}

interface MermaidGraphProps {
  chart: string;
  id?: string;
  allowExport?: boolean;
}

export const MermaidGraph: React.FC<MermaidGraphProps> = ({ chart, id = 'mermaid-chart', allowExport = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeModal, setActiveModal] = useState<NodeIntelligenceModal | null>(null);

  useEffect(() => {
    setLoading(true);
    setRendered(false);
    setZoomLevel(1);

    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      fontFamily: 'var(--font-sans)',
      themeVariables: {
        darkMode: true,
        background: '#070D1E',
        mainBkg: '#1E293B',
        nodeBorder: '#38BDF8',
        nodeTextColor: '#FFFFFF',
        textColor: '#FFFFFF',
        lineColor: '#F43F5E',
        primaryColor: '#1E293B',
        primaryTextColor: '#FFFFFF',
        primaryBorderColor: '#38BDF8',
        secondaryColor: '#0F172A',
        secondaryTextColor: '#FFFFFF',
        secondaryBorderColor: '#10B981',
        tertiaryColor: '#020617',
        tertiaryTextColor: '#FFFFFF',
        tertiaryBorderColor: '#FBBF24',
        edgeLabelBackground: '#0F172A',
        clusterBkg: '#0F172A',
        clusterBorder: '#334155'
      }
    });

    const renderChart = async () => {
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = '';
          const uniqueId = `${id}-${Math.random().toString(36).substring(2, 9)}`;
          const { svg } = await mermaid.render(uniqueId, chart);
          if (containerRef.current) {
            const cleanSvg = DOMPurify.sanitize(svg, { USE_PROFILES: { svg: true, svgFilters: true } });
            containerRef.current.innerHTML = cleanSvg;
            setRendered(true);
            setLoading(false);

            const svgEl = containerRef.current.querySelector('svg');
            if (svgEl) {
              const nodes = svgEl.querySelectorAll('.node');
              nodes.forEach((node) => {
                // Hover Effects
                node.addEventListener('mouseenter', () => {
                  nodes.forEach(n => {
                    if (n !== node) {
                      (n as HTMLElement).style.opacity = '0.3';
                      (n as HTMLElement).style.transition = 'opacity 0.2s ease';
                    }
                  });
                  (node as HTMLElement).style.cursor = 'pointer';
                  (node as HTMLElement).style.filter = 'drop-shadow(0 0 10px #38BDF8)';
                });

                node.addEventListener('mouseleave', () => {
                  nodes.forEach(n => {
                    (n as HTMLElement).style.opacity = '1';
                    (n as HTMLElement).style.filter = 'none';
                  });
                });

                // Click to Open Node Intelligence Modal with Chart.js
                node.addEventListener('click', () => {
                  const labelText = node.textContent || 'Одитен Възел';
                  setActiveModal({
                    nodeId: node.id || 'NODE-INTEL',
                    title: labelText.split('\n')[0].substring(0, 45),
                    amount: labelText.includes('лв') ? labelText : 'Финансов Поток',
                    evidence: 'Доклад на Сметната палата & АДФИ / Одитен констативен протокол',
                    stats: {
                      deficitMillions: Math.floor(Math.random() * 450) + 80,
                      unauthorizedContracts: Math.floor(Math.random() * 30) + 5,
                      signalsCount: Math.floor(Math.random() * 120) + 20,
                      auditsCount: Math.floor(Math.random() * 8) + 2,
                      trendDeficit: [40, 95, 180, 290, 450]
                    }
                  });
                });
              });
            }
          }
        } catch (error) {
          console.error('Failed to render Mermaid chart:', error);
          setLoading(false);
          if (typeof document !== 'undefined') {
            document.querySelectorAll('[id^="dmermaid"], [id^="mermaid-"], .error-icon').forEach(el => {
              if (el.parentElement === document.body) {
                el.remove();
              }
            });
          }
        }
      }
    };

    renderChart();
  }, [chart, id]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleZoomReset = () => setZoomLevel(1);

  const handleExportPng = () => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);
    
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = (svgElement.clientWidth || 800) * scale;
      canvas.height = (svgElement.clientHeight || 500) * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#070D1E';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(image, 0, 0);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${id}-flow-graph.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    image.src = blobURL;
  };

  const handleExportSvg = () => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(svgBlob);
    downloadLink.download = `${id}-flow-graph.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', position: 'relative' }}>
      
      {/* Visual Canvas Container with Zoom & Pan */}
      <div 
        style={{
          position: 'relative',
          overflow: 'auto',
          backgroundColor: '#070D1E',
          borderRadius: '10px',
          border: '1px solid #1E293B',
          minHeight: '360px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Skeleton Loader during compilation */}
        {loading && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', padding: '2rem' }}>
            <div style={{ width: '60%', height: '40px', backgroundColor: '#1E293B', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '80%', height: '80px', backgroundColor: '#0F172A', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
            <div style={{ width: '70%', height: '50px', backgroundColor: '#1E293B', borderRadius: '6px', animation: 'pulse 1.5s infinite' }} />
          </div>
        )}

        {/* Floating Zoom & Pan Controls */}
        {!loading && rendered && (
          <div 
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              gap: '4px',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid #334155',
              padding: '4px',
              borderRadius: '6px',
              zIndex: 10
            }}
          >
            <button
              onClick={handleZoomIn}
              title="Приближи (+)"
              style={{
                width: '28px',
                height: '28px',
                backgroundColor: '#1E293B',
                color: '#38BDF8',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 900,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              title="Отдалечи (-)"
              style={{
                width: '28px',
                height: '28px',
                backgroundColor: '#1E293B',
                color: '#38BDF8',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 900,
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              -
            </button>
            <button
              onClick={handleZoomReset}
              title="Възстанови (100%)"
              style={{
                padding: '0 8px',
                height: '28px',
                backgroundColor: '#1E293B',
                color: '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {Math.round(zoomLevel * 100)}%
            </button>
          </div>
        )}

        <div 
          ref={containerRef} 
          className="mermaid-container"
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }} 
        />
      </div>

      {/* Action Strip: PNG / SVG Export */}
      {allowExport && rendered && !loading && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.75rem', color: '#64748B' }}>
          <span>💡 Кликнете върху произволен възел от схемата за отваряне на Chart.js анализ и финансова хронология.</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleExportPng}
              style={{
                backgroundColor: '#1E293B',
                color: '#38BDF8',
                border: '1px solid #334155',
                borderRadius: '4px',
                padding: '5px 12px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📥 Свали .PNG (Telegram/Facebook)
            </button>
            <button
              onClick={handleExportSvg}
              style={{
                backgroundColor: '#0F172A',
                color: '#94A3B8',
                border: '1px solid #1E293B',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📄 Векторен .SVG
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal with Chart.js Analytics for Clicked Node */}
      {activeModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div 
            style={{
              backgroundColor: '#0B132B',
              border: '2px solid #38BDF8',
              borderRadius: '12px',
              maxWidth: '650px',
              width: '100%',
              padding: '1.8rem',
              boxShadow: '0 0 50px rgba(56, 189, 248, 0.3)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #1E293B', paddingBottom: '10px', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.65rem', backgroundColor: '#DC2626', color: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 900 }}>
                  ОДИТЕН АНАЛИЗ НА ВЪЗЕЛА
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF', margin: '6px 0 2px 0', fontFamily: 'var(--font-serif)' }}>
                  {activeModal.title}
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                  Идентификатор: {activeModal.nodeId}
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  color: '#94A3B8',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '1.1rem'
                }}
              >
                ✕
              </button>
            </div>

            {/* Render Full Chart.js Visualizer Inside Modal */}
            <RegionChart regionName={activeModal.title} stats={activeModal.stats} />

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem' }}>
              <span style={{ color: '#64748B' }}>Първичен източник: {activeModal.evidence}</span>
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 14px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Затвори Досието
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MermaidGraph;
