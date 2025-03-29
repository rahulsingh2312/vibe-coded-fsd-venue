import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue.interface';

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit {
  venue: Venue | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loading venue with ID:', id);
    this.venueService.getVenueById(id).subscribe(venue => {
      console.log('Venue loaded:', venue);
      this.venue = venue;
    });
  }

  proceedToBooking(): void {
    console.log('Proceeding to booking for venue:', this.venue);
    if (this.venue) {
      const url = ['/venue', this.venue.id, 'book'];
      console.log('Navigating to:', url);
      this.router.navigate(url).then(
        success => console.log('Navigation successful:', success),
        error => console.error('Navigation failed:', error)
      );
    }
  }
}
