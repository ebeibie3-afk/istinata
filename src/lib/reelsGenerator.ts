import { VeritasEvent } from '@/types';

export interface ReelScript {
  eventId: string;
  hook: string;
  facts: string[];
  visualPrompt: string;
  sourceCitation: string;
  callToAction: string;
  facebookCaption: string;
}

export function generateReelScript(event: VeritasEvent): ReelScript {
  const meta = event.reelsMetadata;
  const hook = meta?.hookText || `РАЗКРИТИЕ: ${event.title}`;
  const amount = meta?.amountFormatted || (event.amountBgn ? `${(event.amountBgn / 1000000).toFixed(1)} млн. лв.` : '');
  const citation = meta?.citation || event.evidence[0]?.sourceName || 'Официален публичен регистър';

  return {
    eventId: event.id,
    hook: hook,
    facts: [
      `1. Публичните регистри потвърждават: ${event.summary}`,
      `2. Засегната сума от бюджета: ${amount}`,
      `3. Участващи институции: ${event.involvedInstitutions.join(', ')}`,
      `4. Изпълнители по договори: ${event.involvedCompanies.join(', ')}`
    ],
    visualPrompt: `Вертикално видео (9:16). Тъмен фон с визуални графики на парични потоци от държавния бюджет към фирмите изпълнители. Червен акцентен текст: "${amount}". Документ на екрана от: ${citation}.`,
    sourceCitation: `Източник: ${citation} (Чл. 41 от Конституцията на РБ, ЗДОИ).`,
    callToAction: `Следете пълната хронология на AETERNA-VERITAS и споделете видеото за прозрачност!`,
    facebookCaption: `🚨 ${hook}\n\n📊 СУМА: ${amount}\n🏛️ ИНСТИТУЦИИ: ${event.involvedInstitutions.join(', ')}\n📄 ДОКУМЕНТИ: ${citation}\n\nСледете пълния граждански одит на държавните разходи в нашата независима платформа.\n\n#България #Прозрачност #Одит #ОбществениСредства #СметнаПалата #ЕвропейскиФондове`
  };
}
