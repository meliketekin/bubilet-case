'use client';

import { SelectedSeatsCardProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';
import EventInfo from '../EventInfo';
import styles from './index.module.scss';

const SelectedSeatsCard: React.FC<
  Omit<SelectedSeatsCardProps, 'totalAmount'>
> = ({selectedSeats, onRemoveSeat, reservationTime}) => {
  const t = useTranslations('SelectedSeatsCard');

  const serviceFee = 5.8;
  const ticketTotal = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0
  );
  const total = selectedSeats.length > 0 ? ticketTotal + serviceFee : 0;

  return (
    <div className={styles.selectedSeatsCard}>
      <EventInfo />
      <div className={styles.divider} />
      {reservationTime && (
        <div className={styles.reservationTimer}>
          {t('reservationTime')} {reservationTime}
        </div>
      )}
      <h3 className={styles.cardTitle}>
        {t('selectedSeats')} ({selectedSeats.length})
        <span className={styles.subtitle}>{t('seatNumber')}</span>
      </h3>

      {selectedSeats.length === 0 ? (
        <div className={styles.emptySeatsBox}>
          <div className={styles.emptySeatsIcon}>
            <Image
              src="/icons/seat.svg"
              alt="Koltuk"
              width={40}
              height={40}
              draggable={false}
            />
          </div>
          <div className={styles.emptySeatsText}>{t('emptySeatsText')}</div>
        </div>
      ) : (
        <div className={styles.selectedSeatsList}>
          {selectedSeats.map((seat) => (
            <div key={seat.id} className={styles.selectedSeatItem}>
              <span className={styles.seatLabel}>
                S{seat.row}-{seat.number}
              </span>
              <button
                className={styles.removeButton}
                onClick={() => onRemoveSeat(seat.id)}
                aria-label={t('removeSeat')}
              >
                <Image
                  src="/icons/trash.svg"
                  alt={t('removeSeat')}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={styles.divider} />

      <div className={styles.orderSummary}>
        <h4 className={styles.priceTitle}>{t('orderSummary')}</h4>
        <div className={styles.priceItem}>
          <span>{t('ticketPrice')}</span>
          <span>{ticketTotal.toLocaleString('tr-TR')}₺</span>
        </div>
        <div className={styles.priceItem}>
          <span>{t('serviceFee')}</span>
          <span>
            {serviceFee.toLocaleString('tr-TR', {minimumFractionDigits: 2})}₺
          </span>
        </div>
        <div className={styles.totalPrice}>
          <span>{t('totalAmount')}</span>
          <span className={styles.totalAmount}>
            {total.toLocaleString('tr-TR', {minimumFractionDigits: 2})}₺
          </span>
        </div>
      </div>

      <button
        className={styles.paymentButton}
        disabled={selectedSeats.length === 0}
        aria-label={t('payNow')}
      >
        {t('payNow')} →
      </button>
    </div>
  );
};

export default SelectedSeatsCard;
