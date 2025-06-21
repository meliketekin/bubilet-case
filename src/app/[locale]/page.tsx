import {Locale} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import SeatSelection from '@/components/SeatSelection';

type Props = {
  params: Promise<{locale: Locale}>;
};

export default function IndexPage({params}: Props) {
  const {locale} = use(params);

  // Enable static rendering
  setRequestLocale(locale);

  return <SeatSelection />;
}
