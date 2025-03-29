export interface Booking {
  id: number;
  venueId: number;
  venueName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
  name: string;
  email: string;
  phone: string;
  numberOfGuests: number;
  specialRequests?: string;
} 