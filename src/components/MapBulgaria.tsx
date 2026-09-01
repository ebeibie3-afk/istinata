'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic import of Leaflet components to prevent Next.js SSR window is not defined errors
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export interface MapBulgariaProps {
  onSelectProvince?: (name: string) => void;
  height?: string;
}

export const MapBulgaria: React.FC<MapBulgariaProps> = ({ 
  onSelectProvince,
  height = '580px' 
}) => {
  const [bgFeature, setBgFeature] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load GeoJSON for Bulgaria
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        const features = data.features || [];
        let bg = features.find((f: any) => {
          const p = f.properties || {};
          const name = p.ADMIN || p.admin || p.NAME || p.name;
          return name === 'Bulgaria' || name === 'Republic of Bulgaria';
        });
        if (!bg) {
          bg = features.find((f: any) => {
            const p = f.properties || {};
            return p.ISO_A3 === 'BGR' || p.iso_a3 === 'BGR' || p.ISO3 === 'BGR';
          });
        }
        setBgFeature(bg || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Грешка при зареждане на GeoJSON за България:', err);
        setLoading(false);
      });
  }, []);

  const style = {
    color: '#38BDF8',
    weight: 2.5,
    opacity: 0.9,
    fillColor: '#0F172A',
    fillOpacity: 0.45,
  };

  const onEachFeature = (feature: any, layer: any) => {
    const name = 'Република България (28 Административни Области)';
    layer.bindPopup(`<div style="font-family:sans-serif; padding:4px;"><b>🇧🇬 ${name}</b><br/><span style="color:#DC2626; font-size:11px;">Мониторинг по чл. 41 от Конституцията</span></div>`);
    layer.on({
      mouseover: () => layer.setStyle({ weight: 3.5, fillOpacity: 0.65, fillColor: '#DC2626', color: '#F87171' }),
      mouseout: () => layer.setStyle(style),
      click: () => {
        layer.openPopup();
        if (onSelectProvince) onSelectProvince('Bulgaria');
      },
    });
  };

  const center: [number, number] = [42.733883, 25.48583];

  if (loading) {
    return (
      <div style={{
        height,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020617',
        color: '#38BDF8',
        fontFamily: 'var(--font-mono)',
        borderRadius: '12px',
        border: '1px solid #1E293B'
      }}>
        🛰️ Зареждане на сателитната географска карта на България...
      </div>
    );
  }

  return (
    <div style={{ height, width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1E293B', position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', backgroundColor: '#020617' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {bgFeature && (
          <GeoJSON
            data={bgFeature}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapBulgaria;
