import { Event } from '@/interfaces';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/tr';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import styles from './index.module.scss';

const event: Event = {
  image:
    'https://www.sfballet.org/app/uploads/2022/04/SWL2022ORC_ET27229_CE-819x1024.jpg',
  title: 'Swan Lake',
  venue: 'Kültürpark Açıkhava Tiyatrosu',
  date: '2024-06-23',
  time: '21:00',
  block: 'C3 Blok'
};

const EventInfo: React.FC = () => {
  const locale = useLocale();
  dayjs.locale(locale);
  const formattedDate = dayjs(event.date).format('DD MMMM dddd');

  return (
    <div className={styles.eventInfoCard}>
      <div className={styles.eventImageWrapper}>
        <Image
          src={event.image}
          alt={event.title}
          width={72}
          height={100}
          className={styles.eventImage}
          priority
        />
      </div>
      <div className={styles.eventDetailsWrapper}>
        <div className={styles.eventTitle}>{event.title}</div>
        <div className={styles.eventDetail}>
          <div>📍 {event.venue}</div>
          <div>📅 {formattedDate}</div>
          <div>🕘 {event.time}</div>
          <div>🎟️ {event.block}</div>
        </div>
      </div>
    </div>
  );
};

export default EventInfo;
