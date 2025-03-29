import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  venues: Venue[] = [];
  venueForm: FormGroup;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private venueService: VenueService
  ) {
    this.venueForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      pricePerHour: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      amenities: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVenues();
  }

  loadVenues(): void {
    this.venueService.getVenues().subscribe(venues => {
      this.venues = venues;
    });
  }

  onSubmit(): void {
    if (this.venueForm.valid) {
      const formValue = this.venueForm.value;
      const newVenue: Venue = {
        id: this.venues.length + 1,
        ...formValue,
        amenities: formValue.amenities.split(',').map((a: string) => a.trim()),
        availableTimeSlots: []
      };

      // In a real app, this would be an API call
      this.venues.push(newVenue);
      this.showForm = false;
      this.venueForm.reset();
    }
  }

  deleteVenue(id: number): void {
    if (confirm('Are you sure you want to delete this venue?')) {
      this.venues = this.venues.filter(venue => venue.id !== id);
    }
  }
} 