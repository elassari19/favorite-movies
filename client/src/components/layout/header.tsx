import { LogOutIcon, PlusCircle } from 'lucide-react';
import React from 'react';
import Typography from './typography';
import { getTranslations } from 'next-intl/server';
import SignOut from '../auth/sign-out';
import { getCookie } from '@/lib/cookies-handler';
import Link from 'next/link';

const Header = async () => {
  const auth = await getCookie('movies-session');
  const t = await getTranslations('');
  return (
    <header className=" flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Typography headers="h2" variant="h3">
          {t('My movies')}
        </Typography>
        <Link href={`${t('locale')}/add-movie`}>
          <PlusCircle size={24} />
        </Link>
      </div>
      {auth ? (
        <div className="flex items-center">
          <SignOut className="hidden md:block" />
          <LogOutIcon size={24} />
        </div>
      ) : (
        <Link href={`${t('locale')}/sign-in`}>{t('Sign In')}</Link>
      )}
    </header>
  );
};

export default Header;
