export interface AssociatedCompanyRecord {
  eik: string;
  name: string;
  roleInScheme: string; // e.g. "Главен инхаус изпълнител", "Фирма за наем на техника", "Кредитополучател в ББР"
  totalContractsWonBgn: number;
  tradeRegisterUrl: string;
  eopRegisterUrl?: string;
  strawmanOwner?: string; // Подставено лице / Сламка
  statusNotes?: string; // e.g. "Прехвърлена на малоимотно лице след източване на авансите"
}

export interface RealEstateAssetRecord {
  type: string; // e.g. "Луксозен мезонет", "Резиденция с басейн", "Парцел"
  location: string; // e.g. "София, кв. Изток", "Халкидики, Гърция", "Барселона, Испания"
  declaredValueKpkonpi: string; // e.g. "380 000 лв. (под пазарна цена)"
  realMarketEstimate: string; // e.g. "2 400 000 лв."
  legalOwnerRecord: string; // e.g. "Подставено лице / Офшорно дружество от Кипър"
  cadastreOrNotaryDoc: string; // e.g. "Нотариален акт № 142/2019, Имотен регистър"
}

export interface MoneyPathStage {
  step: number;
  stageName: string;
  sourceEntity: string;
  targetEntity: string;
  amount: string;
  mechanism: string;
  evidenceRef: string;
}

export interface DetailedInvestigationDossier {
  id: string;
  targetName: string;
  role: string;
  institution: string;
  riskRating: 'CRITICAL_CONCENTRATION' | 'INHOUSE_ADVANCE_FRAUD' | 'MONOPOLY_CAPTURE';
  summary: string;
  strawmen: {
    name: string;
    role: string;
    companiesAssigned: string[];
    details: string;
  }[];
  associatedCompanies: AssociatedCompanyRecord[];
  assetsTracked: RealEstateAssetRecord[];
  moneyPath: MoneyPathStage[];
  publicRegisters: {
    caisEopUrl?: string;
    tradeRegisterUrl?: string;
    isun2020Url?: string;
    kpkonpiDeclarationUrl?: string;
    auditCourtReportUrl?: string;
  };
}
