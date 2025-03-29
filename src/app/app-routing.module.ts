import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VenueDetailComponent } from './components/venue-detail/venue-detail.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'venue/:id', component: VenueDetailComponent },
  { path: 'venue/:id/book', component: BookingFormComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 