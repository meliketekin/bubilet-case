import {SeatStatusEnum} from '@/enums';

export interface Seat {
  id: string;
  row: number;
  number: number;
  status: SeatStatusEnum;
  price: number;
}

export interface SeatMapProps {
  seats: Seat[];
  onSeatClick: (seatId: string) => void;
}

export interface SeatProps {
  seat: Seat;
  onClick: (seatId: string) => void;
  disabled?: boolean;
}

export interface SelectedSeatsCardProps {
  selectedSeats: Seat[];
  onRemoveSeat: (seatId: string) => void;
  reservationTime?: string | null;
}
export interface Event {
  image: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  block: string;
}
