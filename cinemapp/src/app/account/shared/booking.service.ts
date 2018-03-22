import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators';

import { Reservation } from './reservation';
import { LocalStorage } from '../../core/local-storage';

@Injectable()
export class BookingService {

  readonly localStorageKey = 'booking';
  protected reservationsSubject = new BehaviorSubject<Reservation[]>([]);

  get reservations() {
    return this.reservationsSubject.asObservable();
  }

  constructor(protected http: HttpClient, protected localStorage: LocalStorage) {

    const reservations = this.localStorage.getItem<Reservation[]>(this.localStorageKey) || [];

    if (!this.validate(reservations)) {

      this.localStorage.removeItem(this.localStorageKey);

      throw new Error(`Falsified reservation data`);

    }

    this.reservationsSubject.next(reservations);

  }

  validate(reservations: any) {

    if (!Array.isArray(reservations)) {
      return false;
    }

    for (const reservation of reservations) {

      if (!reservation || (typeof reservation !== 'object') ||
      !(reservation.hasOwnProperty('movieTitle')) || (typeof reservation.movieTitle !== 'string') ||
      !(reservation.hasOwnProperty('theaterTitle')) || (typeof reservation.theaterTitle !== 'string') ||
      !(reservation.hasOwnProperty('scheduleId')) || (typeof reservation.scheduleId !== 'number') ||
      !(reservation.hasOwnProperty('scheduleHour')) || (typeof reservation.scheduleHour !== 'string')) {
        return false;
      }

    }

    return true;

  }

  book(schedule: number) {

    return this.http.post<Reservation>(`/api/book`, { schedule })
    .pipe(tap((reservation: Reservation) => {

      const newReservations = this.reservationsSubject.getValue();
      newReservations.push(reservation);

      this.reservationsSubject.next(newReservations);

      this.localStorage.setItem(this.localStorageKey, newReservations);

    }));

  }

  cancel(id: number) {

    const newReservations = this.reservationsSubject.getValue();
    newReservations.splice(id, 1);

    this.reservationsSubject.next(newReservations);

    this.localStorage.setItem(this.localStorageKey, newReservations);

  }

}
