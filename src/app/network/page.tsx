'use client';

import React, { useState } from 'react';
import { MermaidGraph } from '@/components/MermaidGraph';

const NETWORK_MODELS = [
  {
    id: 'political-infrastructure-matrix',
    title: '🌐 Мрежа на Свързаност: Власт ↔ Агенции ↔ Обществени Поръчки ↔ Крайни Фирми',
    description: 'Интерактивен многопластов графичен модел на взаимовръзките между политически фигури, одитни констатации, държавни ведомства и консорциуми.',
    chart: `
graph TD
    subgraph ПОЛИТИЧЕСКО_НИВО ["🏛️ ПОЛИТИЧЕСКО & МИНИСТЕРСКО НИВО"]
        POL1["Министерски съвет<br/><b>Целеви постановления</b>"]
        POL2["МРРБ & МЗ<br/><b>Разпоредители с бюджета</b>"]
    end

    subgraph АГЕНЦИИ_И_КАСИ ["⚙️ ИЗПЪЛНИТЕЛНИ АГЕНЦИИ"]
        AG1["АПИ<br/>(Пътна инфраструктура)"]
        AG2["НЗОК<br/>(Здравна каса)"]
        AG3["ДФЗ<br/>(Земеделски фонд)"]
        AG4["Агенция Митници<br/>(Граничен контрол)"]
    end

    subgraph СХЕМИ_И_ПОСРЕДНИЦИ ["💼 ИНХАУС & ФАСАДНИ ДРУЖЕСТВА"]
        MED1["„Автомагистрали" ЕАД<br/>(Инхаус превъзлагане)"]
        MED2["Частни клиники & Фарма дистрибутори<br/>(Ценови разлики)"]
        MED3["Къщи за гости без дейност<br/>(Свързани лица)"]
    end

    subgraph КОНСОРЦИУМИ ["💰 КРАЙНИ ПОЛУЧАТЕЛИ НА КАПИТАЛА"]
        END1["Строителни Консорциуми Лот 1-9<br/><b>1.18 Млрд. лв.</b>"]
        END2["Търговци на онколекарства<br/><b>84 Млн. лв. годишно</b>"]
        END3["Лични резиденции & Вили<br/><b>45 Млн. лв. санкции</b>"]
    end

    subgraph КОНТРОЛ_И_САНКЦИИ ["⚖️ ОДИТИ, ОЛАФ & СЪД"]
        AUD1["Сметна палата<br/><b>Одитен доклад № 0300100421</b>"]
        AUD2["OLAF (Брюксел)<br/><b>Финансови корекции</b>"]
        AUD3["СГС & Парламентарна комисия<br/><b>Разследвания</b>"]
    end

    POL1 --> POL2
    POL2 --> AG1
    POL2 --> AG2
    POL1 --> AG3
    POL1 --> AG4

    AG1 --> MED1
    AG2 --> MED2
    AG3 --> MED3
    AG4 --> AUD3

    MED1 --> END1
    MED2 --> END2
    MED3 --> END3

    END1 -.->|Констатации за липса на ЗОП| AUD1
    END3 -.->|Измама с европейски субсидии| AUD2
    AG2 -.->|Анализ на пределни цени| AUD1

    classDef pol fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef agency fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef med fill:#451a03,stroke:#d97706,stroke-width:2px,color:#fff;
    classDef endcorp fill:#4c0519,stroke:#f43f5e,stroke-width:2px,color:#fff;
    classDef audit fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff;

    class POL1,POL2 pol;
    class AG1,AG2,AG3,AG4 agency;
    class MED1,MED2,MED3 med;
    class END1,END2,END3 endcorp;
    class AUD1,AUD2,AUD3 audit;
`
  }
];

export default function NetworkGraphPage() {
  const [activeModel] = useState(NETWORK_MODELS[0]);

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge" style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-violet)', border: '1px solid rgba(139, 92, 246, 0.3)', marginBottom: '1rem' }}>
          🕸️ МНОГОСЛОЙНА МРЕЖА НА СВЪРЗАНОСТИТЕ
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
          Мрежа на Властта и Паричните Потоци
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto' }}>
          Картографиране на пълната екосистема: От политически решения и министерски разпореждания през междинни агенции до крайни получатели и одитни санкции.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '1.8rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
          {activeModel.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {activeModel.description}
        </p>

        <MermaidGraph chart={activeModel.chart} id="network-main-graph" />
      </div>
    </div>
  );
}
