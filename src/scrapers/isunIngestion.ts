import { VeritasEvent } from '@/types';

/**
 * ИСУН 2020 / 2027 Open Data Ingestion Service
 * Обработва публичните JSON/CSV масиви за европейски проекти и плащания в България.
 */
export interface IsunProjectRecord {
  projectCode: string;
  projectName: string;
  beneficiaryName: string;
  beneficiaryEik: string;
  totalAmountBgn: number;
  euAmountBgn: number;
  nationalAmountBgn: number;
  programName: string;
  contractDate: string;
  status: string;
  location: string;
}

export class IsunDataIngestion {
  private baseOpenDataUrl = 'https://eumis2020.government.bg/api/opendata';

  /**
   * Трансформира суров публичен запис от ИСУН в структурирано събитие за AETERNA-VERITAS
   */
  public transformToVeritasEvent(record: IsunProjectRecord, flagReason?: string): VeritasEvent {
    return {
      id: `isun-${record.projectCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: `${record.programName}: ${record.projectName}`,
      slug: `isun-${record.projectCode.toLowerCase()}`,
      summary: `Проект по ${record.programName} с бенефициент „${record.beneficiaryName}" (ЕИК: ${record.beneficiaryEik}) за обща стойност ${record.totalAmountBgn.toLocaleString('bg-BG')} лв.`,
      fullDescription: `Публични данни от регистъра ИСУН 2020 показват сключен договор на ${record.contractDate}. Финансиране от ЕС: ${record.euAmountBgn.toLocaleString('bg-BG')} лв., национално съфинансиране: ${record.nationalAmountBgn.toLocaleString('bg-BG')} лв. Статус на изпълнение: ${record.status}.${flagReason ? ` Забележка от одит: ${flagReason}` : ''}`,
      date: record.contractDate,
      sector: 'EU_FUNDS',
      amountBgn: record.totalAmountBgn,
      amountEur: Math.round(record.totalAmountBgn / 1.95583),
      involvedInstitutions: [record.programName, 'Управляващ орган по програмата'],
      involvedCompanies: [record.beneficiaryName],
      involvedOfficials: [],
      evidence: [
        {
          id: `doc-${record.projectCode}`,
          title: `Публичен картон на проект ${record.projectCode} в ИСУН 2020`,
          sourceUrl: `https://eumis2020.government.bg/bg/home/Project/Details/${record.projectCode}`,
          sourceName: 'ИСУН 2020 Публичен Регистър',
          documentType: 'CONTRACT',
          datePublished: record.contractDate
        }
      ],
      status: 'VERIFIED_OFFICIAL_DOC',
      tags: ['ЕС Фондове', 'ИСУН 2020', record.programName, record.location],
      location: {
        municipality: record.location,
        region: 'България'
      },
      reelsMetadata: {
        hookText: `КОЙ ВЗЕ ${(record.totalAmountBgn / 1000000).toFixed(2)} МЛН. ЛВ. ПО ${record.programName}?`,
        keyFact: `Бенефициент „${record.beneficiaryName}" по договор от ${record.contractDate}.`,
        amountFormatted: `${record.totalAmountBgn.toLocaleString('bg-BG')} лв.`,
        citation: `ИСУН 2020 / Проект ${record.projectCode}`
      }
    };
  }

  /**
   * Симулация на парсване на публичен масив от данни
   */
  public parseBatch(records: IsunProjectRecord[]): VeritasEvent[] {
    return records.map(r => this.transformToVeritasEvent(r));
  }
}
