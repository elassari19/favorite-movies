import Link from 'next/link';
import React from 'react';
import SelectLanguage from '../translations';
import { getTranslations } from 'next-intl/server';

const HeaderNav = async () => {
  const t = await getTranslations('');
  return (
    <div className="flex justify-between items-center gap-16 px-8 md-16">
      <Link href={`/`}>{t('Home')}</Link>
      <SelectLanguage />
    </div>
  );
};

export default HeaderNav;
