import { getTranslations } from 'next-intl/server';
import { CultureTraditionsView } from './culture-traditions-view';
import type { Tradition } from '../types';
import { CULTURE_TRADITIONS_IMAGES } from '../data/culture-traditions';

export async function CultureTraditions() {
  const t = await getTranslations('CultureTraditions');

  const traditions: Tradition[] = CULTURE_TRADITIONS_IMAGES.map((imageSrc, idx) => ({
    tag: t(`tradition${idx + 1}.tag`),
    title: t(`tradition${idx + 1}.title`),
    description: t(`tradition${idx + 1}.description`),
    imageSrc,
  }));

  return (
    <CultureTraditionsView
      subtitle={t('subtitle')}
      titleHighlight={t('titleHighlight')}
      titleRest={t('titleRest')}
      viewMore={t('viewMore')}
      traditions={traditions}
    />
  );
}
