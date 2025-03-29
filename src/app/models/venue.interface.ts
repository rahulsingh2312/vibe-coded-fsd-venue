export interface Venue {
  id: number;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  imageUrl: string;
  amenities: string[];
  availableTimeSlots: TimeSlot[];
}

export interface TimeSlot {
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  venueId: number;
  date: Date;
  startTime: string;
  endTime: string;
  customerName: string;
  customerEmail: string;
  numberOfGuests: number;
} 