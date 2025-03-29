import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue.interface';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  venue: Venue | undefined;
  selectedTimeSlots: string[] = [];
  totalPrice: number = 0;
  submitted: boolean = false;
  availableTimeSlots: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService
  ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      date: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      numberOfGuests: ['', [Validators.required, Validators.min(1)]],
      specialRequests: ['']
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.venueService.getVenueById(id).subscribe(venue => {
      this.venue = venue;
      if (venue) {
        this.bookingForm.get('numberOfGuests')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(venue.capacity)
        ]);
        this.generateTimeSlots();
      }
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as any;
      if (state.selectedTimeSlots) {
        this.selectedTimeSlots = state.selectedTimeSlots;
        if (this.selectedTimeSlots.length > 0) {
          const [startTime, endTime] = this.selectedTimeSlots;
          this.bookingForm.patchValue({
            startTime,
            endTime
          });
          this.calculateTotalPrice();
        }
      }
    }
  }

  generateTimeSlots(): void {
    // Generate time slots from 9 AM to 9 PM
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    this.availableTimeSlots = slots;
  }

  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  calculateTotalPrice(): void {
    const startTime = this.bookingForm.get('startTime')?.value;
    const endTime = this.bookingForm.get('endTime')?.value;
    
    if (startTime && endTime && this.venue) {
      const start = new Date(`2000-01-01T${startTime}`);
      const end = new Date(`2000-01-01T${endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      this.totalPrice = hours * this.venue.pricePerHour;
    }
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData = {
        ...this.bookingForm.value,
        venueId: this.venue?.id,
        totalPrice: this.totalPrice
      };

      this.venueService.createBooking(bookingData).subscribe(success => {
        if (success) {
          this.submitted = true;
          setTimeout(() => {
            this.router.navigate(['/venues']);
          }, 2000);
        }
      });
    }
  }

  onTimeChange(): void {
    this.calculateTotalPrice();
  }

  get f() {
    return this.bookingForm.controls;
  }

  get formControls() {
    return this.bookingForm.controls;
  }
}
