'use client';

import React, {useState, useCallback} from 'react';
import SeatMap from '../SeatMap';
import SelectedSeatsCard from '../SelectedSeatsCard';
import {useSeatSelection} from '@/hooks/useSeatSelection';
import {useReservationTimer} from '@/hooks/useReservationTimer';
import styles from './index.module.scss';
import Toast from '../Toast';

import {useTranslations} from 'next-intl';
import {ToastTypeEnum} from '@/enums';

interface ToastState {
  show: boolean;
  type: ToastTypeEnum;
  title: string;
  message: string;
}

type SeatSelectionProps = Record<string, never>;

const SeatSelection: React.FC<SeatSelectionProps> = () => {
  const t = useTranslations('SeatSelection');
  const {seats, selectedSeats, handleSeatClick} = useSeatSelection();

  const [showToast, setShowToast] = useState<boolean>(false);

  const handleTimerExpiration = useCallback((): void => {
    selectedSeats.forEach((seat) => handleSeatClick(seat.id));
    setShowToast(true);

    setTimeout(() => setShowToast(false), 4000);
  }, [selectedSeats, handleSeatClick]);

  const isTimerActive: boolean = selectedSeats.length > 0;
  const {formatted} = useReservationTimer(isTimerActive, handleTimerExpiration);

  const handleToastClose = useCallback((): void => {
    setShowToast(false);
  }, []);

  const toastConfig: ToastState = {
    show: showToast,
    type: ToastTypeEnum.WARNING,
    title: t('reservationTimeEndedToastTitle'),
    message: t('reservationTimeEndedToastMessage')
  };

  return (
    <>
      <Toast
        show={toastConfig.show}
        type={toastConfig.type}
        title={toastConfig.title}
        message={toastConfig.message}
        onClose={handleToastClose}
      />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.leftPanel}>
            <SeatMap seats={seats} onSeatClick={handleSeatClick} />
          </div>

          <div className={styles.rightPanel}>
            <SelectedSeatsCard
              selectedSeats={selectedSeats}
              onRemoveSeat={handleSeatClick}
              reservationTime={isTimerActive ? formatted : null}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SeatSelection;
