import { VeritasEvent } from '@/types';

/**
 * ЦАИС ЕОП (Обществени поръчки) Ingestion Service
 * Парсва публични структурирани данни за договори и изпълнители.
 */
export interface EopContractRecord {
  eopNumber: string;
  contractSubject: string;
  contractorName: string;
  contractorEik: string;
  contractingAuthority: string; // Възложител (Министерство, Община, Болница)
  contractValueBgn: number;
  signDate: string;
  cpvCode: string; // Класификатор на поръчката
  procedureType: string; // 'Открита процедура', 'Договаряне без обявление' и т.н.
}

export class EopDataIngestion {
  public transformToVeritasEvent(record: EopContractRecord): VeritasEvent {
    const isDirectNegotiation = record.procedureType.toLowerCase().includes('без обявление') || 
                                record.procedureType.toLowerCase().includes('пряко договаряне');

    return {
      id: `eop-${record.eopNumber.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: `${record.contractingAuthority}: ${record.contractSubject}`,
      slug: `eop-${record.eopNumber.toLowerCase()}`,
      summary: `Договор за ${record.contractValueBgn.toLocaleString('bg-BG')} лв. с възложител ${record.contractingAuthority} и изпълнител „${record.contractorName}". Процедура: ${record.procedureType}.`,
      fullDescription: `Публични данни от ЦАИС ЕОП по поръчка № ${record.eopNumber}. Възложител: ${record.contractingAuthority}. Изпълнител: „${record.contractorName}" (ЕИК: ${record.contractorEik}). Подписан на ${record.signDate}. Стойност: ${record.contractValueBgn.toLocaleString('bg-BG')} лв.${isDirectNegotiation ? ' ⚠️ Внимание: Процедурата е проведена без открит предварителен конкурс.' : ''}`,
      date: record.signDate,
      sector: 'PUBLIC_PROCUREMENT',
      amountBgn: record.contractValueBgn,
      amountEur: Math.round(record.contractValueBgn / 1.95583),
      involvedInstitutions: [record.contractingAuthority, 'Агенция по обществени поръчки (АОП)'],
      involvedCompanies: [record.contractorName],
      involvedOfficials: [],
      evidence: [
        {
          id: `eop-doc-${record.eopNumber}`,
          title: `Обявление за възложена поръчка № ${record.eopNumber} в ЦАИС ЕОП`,
          sourceUrl: `https://app.eop.bg/today/contract/${record.eopNumber}`,
          sourceName: 'ЦАИС ЕОП Публичен Регистър',
          documentType: 'CONTRACT',
          datePublished: record.signDate
        }
      ],
      status: 'VERIFIED_OFFICIAL_DOC',
      tags: ['Обществени поръчки', 'ЦАИС ЕОП', record.contractingAuthority, record.procedureType],
      reelsMetadata: {
        hookText: `НОВА ОБЩЕСТВЕНА ПОРЪЧКА: ${(record.contractValueBgn / 1000000).toFixed(2)} МЛН. ЛВ. ЗА „${record.contractorName.toUpperCase()}"`,
        keyFact: `Възложител: ${record.contractingAuthority}. Процедура: ${record.procedureType}.`,
        amountFormatted: `${record.contractValueBgn.toLocaleString('bg-BG')} лв.`,
        citation: `ЦАИС ЕОП Поръчка № ${record.eopNumber}`
      }
    };
  }
}
