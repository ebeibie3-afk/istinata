/**
 * Ollama Local Entity Extractor (Zero-Leak Bulgarian NLP)
 * Извлича автоматично имена на политици, фирми, ЕИК номера и парични суми от суров текст
 */

export interface ExtractedEntities {
  institutions: string[];
  companies: string[];
  officials: string[];
  amountsBgn: number[];
  dates: string[];
  keyFacts: string[];
}

export class OllamaEntityExtractor {
  private ollamaEndpoint: string;

  constructor(endpoint = 'http://127.0.0.1:11434/api/generate') {
    this.ollamaEndpoint = endpoint;
  }

  /**
   * Извлича структурирани субекти от български правен или одитен текст
   */
  public async extractFromText(rawDocumentText: string): Promise<ExtractedEntities> {
    const prompt = `Ти си строг детерминистичен анализатор на публични документи в България.
Извади структурирани данни в чист JSON формат със следните ключове:
- institutions: масив от споменати държавни органи/министерства
- companies: масив от споменати търговски дружества и консорциуми
- officials: масив от длъжностни лица и политици
- amountsBgn: масив от финансови суми в лева (като числа)
- dates: дати във формат YYYY-MM-DD
- keyFacts: 3 ключови факта от документа

Текст на документа:
"""
${rawDocumentText.substring(0, 4000)}
"""

Върни САМО валиден JSON без никакъв друг текст:`;

    try {
      const response = await fetch(this.ollamaEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemma:2b',
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.0 // Zero entropy
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama HTTP ${response.status}`);
      }

      const data = await response.json();
      const cleanedJson = data.response.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedJson);
    } catch (err) {
      console.warn('[OLLAMA-EXTRACTOR] Local Ollama unavailable, using deterministic regex fallback.');
      return this.fallbackRegexExtractor(rawDocumentText);
    }
  }

  private fallbackRegexExtractor(text: string): ExtractedEntities {
    const amounts: number[] = [];
    const amountMatches = text.match(/\b\d+[\d\s,.]*\s*(?:лв|лева|BGN|EUR|евро)\b/gi) || [];
    for (const match of amountMatches) {
      const num = parseFloat(match.replace(/[^\d.]/g, ''));
      if (!isNaN(num)) amounts.push(num);
    }

    return {
      institutions: ['АПИ', 'МРРБ', 'Сметна палата', 'НЗОК'].filter(inst => text.includes(inst)),
      companies: ['Автомагистрали ЕАД'].filter(c => text.includes(c)),
      officials: [],
      amountsBgn: amounts,
      dates: [],
      keyFacts: ['Автоматично извлечен контур от публичен документ']
    };
  }
}
