'use client';

import { SeatStatusEnum } from '@/enums';
import { Seat, SeatMapProps } from '@/interfaces';
import { useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styles from './index.module.scss';

type SeatsByRow = Record<number, Seat[]>;

const SeatMap: React.FC<SeatMapProps> = ({seats, onSeatClick}) => {
  const t = useTranslations('SeatMap');

  const getSeatClass = (seat: Seat): string => {
    const baseClass = styles.seat;
    switch (seat.status) {
      case SeatStatusEnum.SELECTED:
        return `${baseClass} ${styles.selected}`;
      case SeatStatusEnum.OCCUPIED:
        return `${baseClass} ${styles.occupied}`;
      case SeatStatusEnum.RESERVED:
        return `${baseClass} ${styles.reserved}`;
      default:
        return `${baseClass} ${styles.available}`;
    }
  };

  const handleSeatClick = useCallback(
    (seatId: string) => {
      onSeatClick(seatId);
    },
    [onSeatClick]
  );

  const renderSeatMap = (): React.ReactElement[] => {
    const seatsByRow: SeatsByRow = seats.reduce<SeatsByRow>((acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }
      acc[seat.row].push(seat);
      return acc;
    }, {});

    return Object.entries(seatsByRow)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([rowNum, rowSeats]) => (
        <div key={`row-${rowNum}`} className={styles.seatRow}>
          <div className={styles.rowNumber}>{rowNum}</div>
          <div className={styles.seatsContainer}>
            {rowSeats
              .sort((a, b) => a.number - b.number)
              .map((seat) => {
                const isDisabled =
                  seat.status === SeatStatusEnum.OCCUPIED ||
                  seat.status === SeatStatusEnum.RESERVED;

                return (
                  <button
                    key={`seat-${seat.id}`}
                    className={getSeatClass(seat)}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={isDisabled}
                    aria-label={`Seat ${seat.number}, Row ${seat.row}, ${seat.status}`}
                    type="button"
                  >
                    {seat.number}
                  </button>
                );
              })}
          </div>
        </div>
      ));
  };

  return (
    <div className={styles.seatMapContainer}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        centerOnInit={true}
        wheel={{
          step: 0.5
        }}
        doubleClick={{
          step: 0.5
        }}
      >
        {({zoomIn, zoomOut, resetTransform}) => (
          <>
            <div className={styles.zoomControlsTopLeft}>
              <button
                className={styles.zoomButton}
                onClick={() => zoomIn()}
                type="button"
                aria-label={t('zoomIn')}
              >
                🔍+
              </button>
              <button
                className={styles.zoomButton}
                onClick={() => zoomOut()}
                type="button"
                aria-label={t('zoomOut')}
              >
                🔍-
              </button>
              <button
                className={styles.zoomButton}
                onClick={() => resetTransform()}
                type="button"
                aria-label={t('resetZoom')}
              >
                ↻
              </button>
            </div>
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
                minHeight: '450px',
                cursor: 'grab'
              }}
              contentStyle={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div className={styles.seatMap}>{renderSeatMap()}</div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendSeat} ${styles.available}`} />
          <span>{t('available')}</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendSeat} ${styles.selected}`} />
          <span>{t('selected')}</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendSeat} ${styles.occupied}`} />
          <span>{t('occupied')}</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendSeat} ${styles.reserved}`} />
          <span>{t('reserved')}</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
