import { getTranslations } from 'next-intl/server';
import { CultureCulinaryView } from './culture-culinary-view';
import type { CulinaryItem } from '../types';
import { CULTURE_CULINARY_ITEMS } from '../data/culture-culinary';

export async function CultureCulinary() {
  const t = await getTranslations('CultureCulinary');

  const header = {
    subtitle: t('subtitle'),
    titleHighlight: t('titleHighlight'),
    titleRest: t('titleRest'),
  };

  const footer = {
    moreHighlight: t('moreHighlight'),
    moreRest: t('moreRest'),
  };

  const items: CulinaryItem[] = CULTURE_CULINARY_ITEMS.map((item, idx) => ({
    ...item,
    title: t(`item${idx + 1}`),
  }));

  return (
    <CultureCulinaryView
      header={header}
      footer={footer}
      items={items}
    />
  );
}
