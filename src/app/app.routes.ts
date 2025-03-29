import { Routes } from '@angular/router';
import { VenueListComponent } from './components/venue-list/venue-list.component';
import { VenueDetailComponent } from './components/venue-detail/venue-detail.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/venues', pathMatch: 'full' },
  { path: 'venues', component: VenueListComponent },
  { path: 'venue/:id', component: VenueDetailComponent },
  { path: 'venue/:id/book', component: BookingFormComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '/venues' }
];
