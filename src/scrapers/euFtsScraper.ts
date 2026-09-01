import { VeritasEvent } from '@/types';

export interface EuFtsRecord {
  ecYear: number;
  beneficiaryName: string;
  country: string;
  amountConsumedEur: number;
  budgetActionTitle: string;
  responsibleDepartment: string; // e.g. "DG CONNECT", "DG REGIO"
  ftsUrl: string;
}

export class EuFtsScraper {
  public parseFtsRecord(record: EuFtsRecord): VeritasEvent {
    const amountBgn = Math.round(record.amountConsumedEur * 1.95583);

    return {
      id: `eu-fts-${record.ecYear}-${record.beneficiaryName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`,
      title: `ЕК Финансова Прозрачност (${record.ecYear}): ${record.beneficiaryName}`,
      slug: `eu-fts-${record.ecYear}-${record.beneficiaryName.toLowerCase()}`,
      summary: `Директно финансиране от Европейската комисия (${record.responsibleDepartment}) за „${record.beneficiaryName}" на стойност €${record.amountConsumedEur.toLocaleString('en-US')} (${amountBgn.toLocaleString('bg-BG')} лв.).`,
      fullDescription: `Публичен запис от Европейската система за финансова прозрачност (EU FTS). Програма: ${record.budgetActionTitle}. Отговорен генерален директорат на ЕК: ${record.responsibleDepartment}. Година: ${record.ecYear}.`,
      date: `${record.ecYear}-12-31`,
      sector: 'EU_FUNDS',
      amountEur: record.amountConsumedEur,
      amountBgn: amountBgn,
      involvedInstitutions: ['Европейска комисия', record.responsibleDepartment],
      involvedCompanies: [record.beneficiaryName],
      involvedOfficials: [],
      evidence: [
        {
          id: `fts-doc-${record.ecYear}`,
          title: `EU Financial Transparency System (FTS) Entry for ${record.beneficiaryName}`,
          sourceUrl: record.ftsUrl,
          sourceName: 'European Commission (EU FTS)',
          documentType: 'CONTRACT',
          datePublished: `${record.ecYear}-12-31`
        }
      ],
      status: 'VERIFIED_OFFICIAL_DOC',
      tags: ['EU FTS', 'Директно финансиране', 'Брюксел', record.responsibleDepartment]
    };
  }
}
