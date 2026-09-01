// src/types/dossiers-db.ts
// Complexity: O(1) — Static type definitions for centralized dossiers.json

export type EvidenceType = 'audit_report' | 'court_document' | 'press_release' | 'other';

export interface EvidenceRecord {
  id: string;
  title: string;
  type: EvidenceType;
  institution: string;
  url: string;
  official: boolean;
}

export interface ProvinceRecord {
  id: string;
  name: string;
  x: number;
  y: number;
  lobby: string;
  deficit: string;
  eik: string;
  contractor: string;
  auditedPersons: string[];
  scheme: string;
  evidence: EvidenceRecord[];
}

export type NarcoticsStatus = 'АКТИВЕН' | 'ПОД НАБЛЮДЕНИЕ' | 'НЕУТРАЛИЗИРАН';

export interface NarcoticsTier {
  id: string;
  alias: string;
  level: number;
  levelName: string;
  jurisdiction: string;
  launderingChannel: string;
  legalEvidence: string;
  status: NarcoticsStatus;
}

export type MagistrateFlag = 'ЗАВИСИМ (ЧЕРВЕН ФЛАГ)' | 'ПОД НАБЛЮДЕНИЕ (ЖЪЛТ ФЛАГ)' | 'ЧИСТ (ЗЕЛЕН ФЛАГ)';

export interface MagistrateRecord {
  id: string;
  role: string;
  status: MagistrateFlag;
  propertyMatch: boolean;
  zeroCorporateTies: boolean;
  integrityScore: number;
  flagReason: string;
  legalBasis: string;
  statuteExpiryMonths: number;
}

export type WhiteListVerification = 'ВЕРИФИЦИРАН' | 'ЧАКАЩ';

export interface WhiteListEntry {
  id: string;
  name: string;
  role: string;
  merit: string;
  verifiedBy: string;
  status: WhiteListVerification;
}

export interface AuditMetadata {
  lastUpdated: string;
  totalVerifiedDeficitBGN: number;
  totalProvinces: number;
  systemAuthority: string;
  dataVersion: string;
}

export interface DossiersDatabase {
  legalNotice: string;
  auditMetadata: AuditMetadata;
  provinces: ProvinceRecord[];
  narcoticsPyramid: NarcoticsTier[];
  magistrates: MagistrateRecord[];
  whiteList: WhiteListEntry[];
}
