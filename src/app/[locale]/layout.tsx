import Header from '@/components/Header';
import { routing } from '@/i18n/routing';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import './styles.css';

type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

// Dynamically generates localized metadata (title, description) for the page.
export async function generateMetadata(props: Omit<Props, 'children'>) {
  const {locale} = await props.params;

  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title'),
    desc: t('desc')
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Header />
          <main className="main-content">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
