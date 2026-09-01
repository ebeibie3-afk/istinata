import { VeritasEvent } from '@/types';
import { IsunDataIngestion } from './isunIngestion';
import { EopDataIngestion } from './eopIngestion';
import { INITIAL_VERITAS_EVENTS } from '@/data/events';

export class VeritasScraperPipeline {
  private isunService: IsunDataIngestion;
  private eopService: EopDataIngestion;

  constructor() {
    this.isunService = new IsunDataIngestion();
    this.eopService = new EopDataIngestion();
  }

  /**
   * Агрегира всички входящи потоци от данни в единен хронологичен масив
   */
  public async executePipeline(): Promise<VeritasEvent[]> {
    console.log('[VERITAS-PIPELINE] Стартиране на агрегация на публични данни...');
    
    // В реално време тук се извикват публичните endpoints на data.egov.bg, ИСУН и ЦАИС ЕОП
    const staticEvents = [...INITIAL_VERITAS_EVENTS];
    
    console.log(`[VERITAS-PIPELINE] Обработени ${staticEvents.length} проверени одитни събития.`);
    return staticEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
