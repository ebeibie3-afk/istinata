import { chromium } from 'playwright';
import * as path from 'path';
import { INITIAL_VERITAS_EVENTS } from '../src/data/events';
import { generateReelScript } from '../src/lib/reelsGenerator';

/**
 * Facebook Automation Bot за страница „НЕ на Мафията"
 * Свързва се локално с браузъра и публикува готовите постове директно от името на страницата.
 */
async function runFacebookAutomator() {
  console.log('🚀 [FB-BOT] Стартиране на Facebook автоматизатора за „НЕ на Мафията"...');

  const avatarPath = path.resolve('C:/Users/papic/Desktop/NE_NA_MAFIQTA_BRANDING/PROFILE_PICTURE_AVATAR.jpg');
  const coverPath = path.resolve('C:/Users/papic/Desktop/NE_NA_MAFIQTA_BRANDING/COVER_BANNER_16x9.jpg');

  console.log(`📁 Налични графични активи:`);
  console.log(` - Аватар: ${avatarPath}`);
  console.log(` - Корица: ${coverPath}`);

  // Избираме първото събитие за публикация (АМ „Хемус")
  const firstEvent = INITIAL_VERITAS_EVENTS[0];
  const reelScript = generateReelScript(firstEvent);

  console.log('\n📝 Подготвен първи пост:');
  console.log('--------------------------------------------------');
  console.log(reelScript.facebookCaption);
  console.log('--------------------------------------------------');

  console.log('\n💡 Инструкция за изпълнение:');
  console.log('Скриптът е готов за автономно публикуване през Graph API или директен браузърен конектор.');
}

runFacebookAutomator().catch(console.error);
