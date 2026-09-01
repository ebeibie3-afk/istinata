import { VeritasEvent } from '@/types';

export interface ParliamentRecord {
  sittingNumber: number;
  date: string;
  topic: string;
  stenogramUrl: string;
  votingResults?: {
    forCount: number;
    againstCount: number;
    abstainCount: number;
  };
  keySpeeches: {
    speaker: string;
    party: string;
    summary: string;
  }[];
}

export class ParliamentScraper {
  public parseStenogram(record: ParliamentRecord): VeritasEvent {
    return {
      id: `parliament-${record.sittingNumber}-${record.date}`,
      title: `Народно събрание (Заседание №${record.sittingNumber}): ${record.topic}`,
      slug: `parliament-session-${record.sittingNumber}`,
      summary: `Стенограма от пленарно заседание на ${record.date} по тема: ${record.topic}.`,
      fullDescription: `Официален публичен запис от стенограмата на Народното събрание. Изказвания: ${record.keySpeeches.map(s => `${s.speaker} (${s.party}): ${s.summary}`).join('; ')}`,
      date: record.date,
      sector: 'PARLIAMENT',
      involvedInstitutions: ['Народно събрание на Република България'],
      involvedCompanies: [],
      involvedOfficials: record.keySpeeches.map(s => s.speaker),
      evidence: [
        {
          id: `steno-${record.sittingNumber}`,
          title: `Пълна стенограма от заседание №${record.sittingNumber}`,
          sourceUrl: record.stenogramUrl,
          sourceName: 'Народно събрание (parliament.bg)',
          documentType: 'PARLIAMENTARY_RECORD',
          datePublished: record.date
        }
      ],
      status: 'VERIFIED_OFFICIAL_DOC',
      tags: ['Парламент', 'Стенограма', 'Законопроект', 'Гласуване']
    };
  }
}
