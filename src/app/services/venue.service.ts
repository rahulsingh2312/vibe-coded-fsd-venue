import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Venue } from '../models/venue.interface';
import { Booking } from '../models/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private venues: Venue[] = [
    {
      id: 1,
      name: 'Grand Ballroom',
      description: 'Elegant ballroom perfect for weddings and corporate events',
      capacity: 200,
      pricePerHour: 500,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      amenities: ['Parking', 'Catering', 'Sound System', 'Projector'],
      availableTimeSlots: [
        { date: new Date(), startTime: '09:00', endTime: '10:00', isAvailable: true },
        { date: new Date(), startTime: '10:00', endTime: '11:00', isAvailable: true }
      ]
    },
    {
      id: 2,
      name: 'Conference Center',
      description: 'Modern conference center with state-of-the-art facilities',
      capacity: 100,
      pricePerHour: 300,
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      amenities: ['WiFi', 'Projector', 'Whiteboard', 'Coffee Station'],
      availableTimeSlots: [
        { date: new Date(), startTime: '09:00', endTime: '10:00', isAvailable: true },
        { date: new Date(), startTime: '10:00', endTime: '11:00', isAvailable: true }
      ]
    }
  ];

  private bookings: Booking[] = [
    {
      id: 1,
      venueId: 1,
      venueName: 'Grand Ballroom',
      date: '2024-03-20',
      startTime: '10:00',
      endTime: '12:00',
      status: 'confirmed',
      totalPrice: 1000,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      numberOfGuests: 50
    },
    {
      id: 2,
      venueId: 2,
      venueName: 'Conference Center',
      date: '2024-03-22',
      startTime: '14:00',
      endTime: '16:00',
      status: 'pending',
      totalPrice: 600,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
      numberOfGuests: 30
    }
  ];

  constructor(private http: HttpClient) {}

  getVenues(): Observable<Venue[]> {
    return of(this.venues);
  }

  getVenueById(id: number): Observable<Venue | undefined> {
    return of(this.venues.find(venue => venue.id === id));
  }

  createVenue(venue: Omit<Venue, 'id'>): Observable<Venue> {
    const newVenue = {
      ...venue,
      id: this.venues.length + 1
    };
    this.venues.push(newVenue);
    return of(newVenue);
  }

  deleteVenue(id: number): Observable<void> {
    this.venues = this.venues.filter(venue => venue.id !== id);
    return of(void 0);
  }

  createBooking(booking: Omit<Booking, 'id'>): Observable<boolean> {
    const newBooking = {
      ...booking,
      id: this.bookings.length + 1
    };
    this.bookings.push(newBooking);
    return of(true);
  }

  getMyBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  cancelBooking(bookingId: number): Observable<boolean> {
    this.bookings = this.bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    );
    return of(true);
  }
}
