import React from 'react';
import { redirect } from 'next/navigation';
import { getCookie } from '@/lib/cookies-handler';

interface IProps {
  children: React.ReactNode;
  params: { locale: string };
}

const Layout = async ({ params: { locale }, children }: IProps) => {
  const auth = await getCookie('movies-session');
  console.log('auth', auth);

  if (auth) return redirect(`/`);

  return <div>{children}</div>;
};

export default Layout;
