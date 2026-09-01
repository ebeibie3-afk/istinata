export type SectorType = 
  | 'EU_FUNDS'
  | 'PUBLIC_PROCUREMENT'
  | 'HEALTHCARE'
  | 'TRANSPORT_INFRASTRUCTURE'
  | 'ENERGY'
  | 'BANKING_FINANCE'
  | 'POLITICAL_CORRUPTION'
  | 'JUDICIARY'
  | 'PARLIAMENT'
  | 'MUNICIPALITIES';

export type VerificationStatus = 'VERIFIED_OFFICIAL_DOC' | 'AUDIT_REPORT' | 'COURT_RULING' | 'INVESTIGATIVE_MEDIA';

export interface EvidenceDocument {
  id: string;
  title: string;
  sourceUrl: string;
  sourceName: string; // e.g., 'ИСУН 2020', 'Сметна палата', 'ЦАИС ЕОП', 'Държавен вестник'
  documentType: 'PDF' | 'CONTRACT' | 'AUDIT_REPORT' | 'COURT_DECISION' | 'PARLIAMENTARY_RECORD';
  datePublished: string;
  fileHashSha256?: string;
}

export interface ContractAnnexInfo {
  originalAmountBgn: number;
  finalAmountAfterAnnexesBgn: number;
  annexesCount: number;
  priceIncreasePercentage: number;
  annexDetailsNote: string;
}

export interface SignalStatusInfo {
  incomingNumber: string;
  submissionDate: string;
  targetBody: string;
  currentStatus: string;
  daysPassed: number;
}

export interface StateGazetteOwnershipFlag {
  companyName: string;
  eik: string;
  transferDate: string;
  newOwnerType: string; // e.g. "Малоимотно лице / Сламка"
  gazetteIssueNote: string;
}

export interface VeritasEvent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  fullDescription: string;
  date: string; // YYYY-MM-DD
  sector: SectorType;
  amountBgn?: number;
  amountEur?: number;
  involvedInstitutions: string[];
  involvedCompanies: string[];
  involvedOfficials: string[];
  evidence: EvidenceDocument[];
  status: VerificationStatus;
  tags: string[];
  contractAnnexes?: ContractAnnexInfo;
  signalStatus?: SignalStatusInfo;
  gazetteOwnershipFlags?: StateGazetteOwnershipFlag[];
  location?: {
    municipality: string;
    region: string;
  };
  reelsMetadata?: {
    hookText: string;
    keyFact: string;
    amountFormatted: string;
    citation: string;
  };
}

export interface PublicOfficialProfile {
  id: string;
  name: string;
  role: string;
  institutions: string[];
  declaredAssetsTimeline: {
    year: number;
    declaredProperties: string[];
    declaredBankAccountsBgn: number;
    sourceDocumentUrl: string;
  }[];
  associatedCompanies: string[];
  associatedEventsCount: number;
}

export interface FinancialFlowItem {
  id: string;
  sourceProgram: string;
  intermediaryAgency: string;
  contractorCompany: string;
  contractAmountBgn: number;
  contractDate: string;
  purpose: string;
  auditFlag: boolean;
  auditNotes?: string;
}
