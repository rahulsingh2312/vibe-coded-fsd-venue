import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VenueService } from '../../services/venue.service';
import { Venue } from '../../models/venue.interface';

@Component({
  selector: 'app-venue-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss']
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];

  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.venueService.getVenues().subscribe(venues => {
      this.venues = venues;
    });
  }
}
