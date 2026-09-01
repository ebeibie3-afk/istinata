import { VeritasEvent } from '@/types';
import { generateReelScript } from '@/lib/reelsGenerator';

/**
 * Facebook Graph API Automation Service
 * Управлява автоматичното публикуване на постове, снимки и видеа във Facebook страницата.
 */
export class FacebookPageManager {
  private pageId: string;
  private pageAccessToken: string;
  private apiVersion: string;

  constructor() {
    this.pageId = process.env.FB_PAGE_ID || '61593934623851';
    this.pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN || '';
    this.apiVersion = 'v19.0';
  }

  /**
   * Проверка на връзката с Facebook Graph API
   */
  public async verifyConnection(): Promise<{ success: boolean; message: string; pageName?: string }> {
    if (!this.pageAccessToken) {
      return {
        success: false,
        message: 'Липсва FB_PAGE_ACCESS_TOKEN в .env файла. Следвайте инструкциите за генериране на токен.'
      };
    }

    try {
      const res = await fetch(`https://graph.facebook.com/${this.apiVersion}/${this.pageId}?fields=id,name,fan_count&access_token=${this.pageAccessToken}`);
      const data = await res.json();

      if (data.error) {
        return { success: false, message: `Грешка от Meta API: ${data.error.message}` };
      }

      return {
        success: true,
        message: `Успешна връзка със страница „${data.name}" (ID: ${data.id})`,
        pageName: data.name
      };
    } catch (err: any) {
      return { success: false, message: `Мрежова грешка: ${err.message}` };
    }
  }

  /**
   * Публикува текстова емисия / одит на стената на страницата
   */
  public async publishPost(message: string, linkUrl?: string): Promise<{ success: boolean; postId?: string; error?: string }> {
    if (!this.pageAccessToken) {
      return { success: false, error: 'NO_ACCESS_TOKEN' };
    }

    try {
      const url = `https://graph.facebook.com/${this.apiVersion}/${this.pageId}/feed`;
      const bodyPayload: any = {
        message: message,
        access_token: this.pageAccessToken
      };
      if (linkUrl) {
        bodyPayload.link = linkUrl;
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json();
      if (data.error) {
        return { success: false, error: data.error.message };
      }

      return { success: true, postId: data.id };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Публикува готово одит събитие от базата на AETERNA-VERITAS
   */
  public async publishVeritasEvent(event: VeritasEvent): Promise<{ success: boolean; postId?: string; error?: string }> {
    const script = generateReelScript(event);
    const link = `http://localhost:3000/timeline`;
    return this.publishPost(script.facebookCaption, link);
  }
}
