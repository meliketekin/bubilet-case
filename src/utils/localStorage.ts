'use client';

import { Seat } from '@/interfaces';

const SELECTED_SEATS_LOCAL_STORAGE_KEY = 'selectedSeats';

export const saveSelectedSeats = (seats: Seat[]): void => {
  if (typeof window !== 'undefined') {
    try {
      const seatsToSave = JSON.stringify(seats);
      localStorage.setItem(SELECTED_SEATS_LOCAL_STORAGE_KEY, seatsToSave);
    } catch (error) {
      console.error('Error saving selected seats to localStorage:', error);
    }
  }
};

export const getSelectedSeats = (): Seat[] => {
  if (typeof window !== 'undefined') {
    try {
      const savedSeats = localStorage.getItem(SELECTED_SEATS_LOCAL_STORAGE_KEY);
      return savedSeats ? JSON.parse(savedSeats) : [];
    } catch (error) {
      console.error('Error getting selected seats from localStorage:', error);
      return [];
    }
  }
  return [];
}; 

export const removeSelectedSeats = (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(SELECTED_SEATS_LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing selected seats from localStorage:', error);
    }
};