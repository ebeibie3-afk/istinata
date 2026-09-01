-- ==============================================================================
-- AETERNA-VERITAS: PostgreSQL + TimescaleDB Database Schema
-- Архитектура за съхранение на хронологични одитни събития, финансови потоци и свързаности
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Сектори и класификатори
CREATE TYPE sector_type AS ENUM (
    'EU_FUNDS',
    'PUBLIC_PROCUREMENT',
    'HEALTHCARE',
    'TRANSPORT_INFRASTRUCTURE',
    'ENERGY',
    'JUDICIARY',
    'PARLIAMENT',
    'MUNICIPALITIES'
);

CREATE TYPE verification_status AS ENUM (
    'VERIFIED_OFFICIAL_DOC',
    'AUDIT_REPORT',
    'COURT_RULING',
    'INVESTIGATIVE_MEDIA'
);

-- 2. Таблица за публични фигури (политици, магистрати, висши държавни служители)
CREATE TABLE public_officials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    current_role VARCHAR(255),
    institutions TEXT[],
    eik_associated TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Таблица за фирми и консорциуми
CREATE TABLE corporate_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    eik VARCHAR(20) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    beneficial_owners TEXT[],
    registered_capital_bgn NUMERIC(15, 2),
    total_public_contracts_bgn NUMERIC(18, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Основна таблица за Хронологични Събития (TimescaleDB Hypertable ready)
CREATE TABLE veritas_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    summary TEXT NOT NULL,
    full_description TEXT NOT NULL,
    event_date DATE NOT NULL,
    sector sector_type NOT NULL,
    amount_bgn NUMERIC(18, 2),
    amount_eur NUMERIC(18, 2),
    status verification_status NOT NULL DEFAULT 'VERIFIED_OFFICIAL_DOC',
    tags TEXT[],
    municipality VARCHAR(100),
    region VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекси за светкавично хронологично търсене
CREATE INDEX idx_events_date ON veritas_events(event_date DESC);
CREATE INDEX idx_events_sector ON veritas_events(sector);
CREATE INDEX idx_events_amount ON veritas_events(amount_bgn DESC);

-- 5. Доказателства и първични документи (Сметна палата, ИСУН, ЕОП)
CREATE TABLE evidence_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES veritas_events(id) ON DELETE CASCADE,
    document_title VARCHAR(500) NOT NULL,
    source_name VARCHAR(255) NOT NULL,
    source_url TEXT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    date_published DATE,
    file_hash_sha256 VARCHAR(64),
    raw_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Финансови потоци и транзакции (Sankey Mapping)
CREATE TABLE financial_flows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES veritas_events(id) ON DELETE SET NULL,
    source_program VARCHAR(255) NOT NULL,
    intermediary_agency VARCHAR(255) NOT NULL,
    contractor_eik VARCHAR(20) REFERENCES corporate_entities(eik),
    contract_amount_bgn NUMERIC(18, 2) NOT NULL,
    contract_date DATE NOT NULL,
    purpose TEXT NOT NULL,
    audit_flag BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
