import { VeritasEvent } from '@/types';

export interface AuditReportData {
  reportNumber: string;
  title: string;
  auditedEntity: string;
  auditPeriod: string;
  releaseDate: string;
  keyFindings: string[];
  recommendedActions: string[];
  pdfUrl: string;
  flaggedSumBgn?: number;
}

export class AuditScraper {
  public parseAuditReport(audit: AuditReportData): VeritasEvent {
    return {
      id: `audit-${audit.reportNumber.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`,
      title: `Сметна палата (Доклад №${audit.reportNumber}): ${audit.auditedEntity}`,
      slug: `audit-report-${audit.reportNumber.toLowerCase()}`,
      summary: `Одитен доклад за дейността на ${audit.auditedEntity} за периода ${audit.auditPeriod}. Констатации за нередности и финансови разминавания.`,
      fullDescription: `Публикуван одит на Сметната палата на Република България. Ключови констатации: ${audit.keyFindings.join('; ')}. Препоръки: ${audit.recommendedActions.join('; ')}`,
      date: audit.releaseDate,
      sector: 'PUBLIC_PROCUREMENT',
      amountBgn: audit.flaggedSumBgn,
      amountEur: audit.flaggedSumBgn ? Math.round(audit.flaggedSumBgn / 1.95583) : undefined,
      involvedInstitutions: [audit.auditedEntity, 'Сметна палата на Република България'],
      involvedCompanies: [],
      involvedOfficials: [],
      evidence: [
        {
          id: `audit-doc-${audit.reportNumber}`,
          title: `Официален одитен доклад № ${audit.reportNumber}`,
          sourceUrl: audit.pdfUrl,
          sourceName: 'Сметна палата на Република България',
          documentType: 'AUDIT_REPORT',
          datePublished: audit.releaseDate
        }
      ],
      status: 'AUDIT_REPORT',
      tags: ['Сметна палата', 'Одит', audit.auditedEntity, 'Констатации']
    };
  }
}
