'use client';

import {SeatStatusEnum} from '@/enums';
import {Seat} from '@/interfaces';
import {getSelectedSeats, saveSelectedSeats} from '@/utils/localStorage';
import {useCallback, useEffect, useState} from 'react';

export const useSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  useEffect(() => {
    setSelectedSeats(getSelectedSeats());
  }, []);

  const generateSeats = useCallback((): Seat[] => {
    const seats: Seat[] = [];
    const totalRows = 12;

    const occupiedSeatIds = ['1-1','1-2','1-4','1-5','2-2','2-5','3-3','3-5','3-7','4-2','4-6','5-3','5-7','6-4','6-8','7-2','7-9','8-3','8-8','9-1','9-10','10-1','10-5','11-2','11-8','12-4','12-10'];
    const reservedSeatIds = ['1-3', '2-4', '4-7', '6-2', '9-5', '11-6'];


    for (let row = 1; row <= totalRows; row++) {
      let seatsInRow = 12;

      if (row <= 8) {
        seatsInRow = row <= 5 ? 9 + row * 2 : 12;
      }

      for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
        const seatId = `${row}-${seatNum}`;
        let status: SeatStatusEnum = SeatStatusEnum.EMPTY;

        if (occupiedSeatIds.includes(seatId)) status = SeatStatusEnum.OCCUPIED;
        else if (reservedSeatIds.includes(seatId))
          status = SeatStatusEnum.RESERVED;

        seats.push({
          id: seatId,
          row,
          number: seatNum,
          status,
          price: 1000
        });
      }
    }

    return seats;
  }, []);

  useEffect(() => {
    const allSeats = generateSeats();
    const savedSelectedIds = new Set(selectedSeats.map((s) => s.id));

    const syncedSeats = allSeats.map((seat) =>
      savedSelectedIds.has(seat.id)
        ? { ...seat, status: SeatStatusEnum.SELECTED }
        : seat
    );
    setSeats(syncedSeats);
  }, [generateSeats, selectedSeats]);

  useEffect(() => {
    saveSelectedSeats(selectedSeats);
  }, [selectedSeats]);

  const handleSeatClick = useCallback((seatId: string) => {
    setSeats((prevSeats) => {
      const seat = prevSeats.find((s) => s.id === seatId);
      if (
        !seat ||
        seat.status === SeatStatusEnum.OCCUPIED ||
        seat.status === SeatStatusEnum.RESERVED
      )
        return prevSeats;

      let newSeats;
      if (seat.status === SeatStatusEnum.SELECTED) {
        newSeats = prevSeats.map((s) =>
          s.id === seatId
            ? {...s, status: SeatStatusEnum.EMPTY}
            : s
        );
        setSelectedSeats((prevSelected) =>
          prevSelected.filter((s) => s.id !== seatId)
        );
      } else {
        newSeats = prevSeats.map((s) =>
          s.id === seatId
            ? {...s, status: SeatStatusEnum.SELECTED}
            : s
        );
        setSelectedSeats((prevSelected) => {
          if (prevSelected.some((s) => s.id === seatId)) return prevSelected;
          return [
            ...prevSelected,
            {
              ...seat,
              status: SeatStatusEnum.SELECTED
            }
          ];
        });
      }
      return newSeats;
    });
  }, []);

  return {
    seats,
    selectedSeats,
    handleSeatClick
  };
};
