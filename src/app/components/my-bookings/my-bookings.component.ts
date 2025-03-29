import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueService } from '../../services/venue.service';
import { Booking } from '../../models/booking.interface';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.venueService.getMyBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  cancelBooking(bookingId: number): void {
    this.venueService.cancelBooking(bookingId).subscribe(success => {
      if (success) {
        this.loadBookings();
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
} 