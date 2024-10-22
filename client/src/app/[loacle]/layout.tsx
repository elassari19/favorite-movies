import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import Providers from '@/components/app-providers';
import HeaderNav from '@/components/layout/header-nav';

const montserrat = Montserrat({ subsets: ['latin'] });

interface IProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'Movies list',
  description: 'Movies list App',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: IProps) {
  const messages = await getMessages();

  return (
    <html lang={locale} dir={`${locale == 'ar' ? 'rtl' : 'ltr'}`}>
      <body className={`${montserrat.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <main className="w-full h-screen flex flex-col items-center">
              <HeaderNav />
              {children}
            </main>{' '}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
