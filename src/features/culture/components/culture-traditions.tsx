import { getTranslations } from 'next-intl/server';
import { CultureTraditionsView } from './culture-traditions-view';
import type { Tradition } from '../types';
import { CULTURE_TRADITIONS } from '../data/culture-traditions';

export async function CultureTraditions() {
  const t = await getTranslations('CultureTraditions');

  const traditions: Tradition[] = CULTURE_TRADITIONS.map((item, idx) => ({
    tag: t(`tradition${idx + 1}.tag`),
    title: t(`tradition${idx + 1}.title`),
    description: t(`tradition${idx + 1}.description`),
    imageSrc: item.imageSrc,
    href: `/events/${item.slug}`,
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
