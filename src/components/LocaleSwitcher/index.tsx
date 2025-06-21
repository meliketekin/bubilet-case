'use client';

import {useParams} from 'next/navigation';
import {Locale} from 'next-intl';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import styles from './index.module.scss';

type LocaleSwitcherSelectProps = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: LocaleSwitcherSelectProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale, scroll: false}
      );
    });
  }

  return (
    <label
      className={`${styles.localeSwitcher}${isPending ? ` ${styles.pending}` : ''}`}
    >
      <select
        className={styles.select}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className={styles.dropdownArrow}>⌄</span>
    </label>
  );
}

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
