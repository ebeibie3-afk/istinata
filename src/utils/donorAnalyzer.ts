export interface RawDonor {
  donorName: string;
  egnOrIdHash: string;
  donatedAmount: number;
  employerName: string;
  employerEik: string;
}

export interface ProcurementContract {
  eik: string;
  companyName: string;
  totalContractsValue: number;
  contractCount: number;
  fundingInstitution: string;
}

export interface AnomalyReport {
  donorName: string;
  donatedAmount: number;
  connectedCompany: string;
  companyEik: string;
  procurementValue: number;
  riskRatio: number; // Колко пъти парите от поръчки надвишават дарението
  alertLevel: 'КРИТИЧЕН' | 'ВИСОК' | 'УМЕРЕН';
}

export function analyzeDonors(donors: RawDonor[], contracts: ProcurementContract[]): AnomalyReport[] {
  const reports: AnomalyReport[] = [];

  donors.forEach((donor) => {
    // Търсене на съвпадение по ЕИК на работодателя в базата на обществените поръчки
    const matchingContract = contracts.find(c => c.eik === donor.employerEik);

    if (matchingContract) {
      const riskRatio = matchingContract.totalContractsValue / donor.donatedAmount;
      let alertLevel: 'КРИТИЧЕН' | 'ВИСОК' | 'УМЕРЕН' = 'УМЕРЕН';

      if (riskRatio > 1000 && donor.donatedAmount >= 5000) {
        alertLevel = 'КРИТИЧЕН'; // Дарителят дава хиляди, а фирмата му печели милиони
      } else if (riskRatio > 500 || donor.donatedAmount >= 2000) {
        alertLevel = 'ВИСОК';
      }

      reports.push({
        donorName: donor.donorName,
        donatedAmount: donor.donatedAmount,
        connectedCompany: donor.employerName,
        companyEik: donor.employerEik,
        procurementValue: matchingContract.totalContractsValue,
        riskRatio: Math.round(riskRatio),
        alertLevel: alertLevel
      });
    }
  });

  // Сортиране по най-висока стойност на обществените поръчки
  return reports.sort((a, b) => b.procurementValue - a.procurementValue);
}
