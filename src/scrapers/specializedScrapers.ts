import { VeritasEvent } from '@/types';

// Скрапер за Търговски регистър & Действителни собственици
export class RegistryAgencyScraper {
  public parseCompanyRecord(eik: string, companyName: string, owners: string[], capital: number): Partial<VeritasEvent> {
    return {
      title: `Търговски регистър: Свързаност на „${companyName}" (ЕИК: ${eik})`,
      involvedCompanies: [companyName],
      involvedOfficials: owners,
      tags: ['Търговски регистър', 'Действителни собственици', eik]
    };
  }
}

// Скрапер за НЗОК разходи & болнични договори
export class NhifHospitalScraper {
  public parseHospitalBudget(hospitalName: string, year: number, reimbursedBgn: number, medicinesBgn: number): Partial<VeritasEvent> {
    return {
      title: `НЗОК Отчет (${year}): ${hospitalName}`,
      sector: 'HEALTHCARE',
      amountBgn: reimbursedBgn,
      involvedInstitutions: ['НЗОК', hospitalName],
      tags: ['НЗОК', 'Болничен бюджет', 'Онколекарства', hospitalName]
    };
  }
}

// Скрапер за АПИ пътни проекти
export class ApiRoadsScraper {
  public parseRoadProject(lotName: string, contractor: string, amountBgn: number, lengthKm: number): Partial<VeritasEvent> {
    return {
      title: `АПИ Проект: ${lotName} (${lengthKm} км)`,
      sector: 'TRANSPORT_INFRASTRUCTURE',
      amountBgn: amountBgn,
      involvedInstitutions: ['АПИ', 'МРРБ'],
      involvedCompanies: [contractor],
      tags: ['АПИ', 'Пътна мрежа', lotName]
    };
  }
}
