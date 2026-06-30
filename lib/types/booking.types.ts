export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface SelectedService {
  id: string;
  name: string;
  price: number;
  category: string;
  includes: string[];
  homeService: boolean;
}

export type LocationType = "studio" | "home" | "outOfCity";

export interface ServiceLocation {
  type: LocationType;
  address: string;
  reference: string;
  lat?: number;
  lng?: number;
}

export interface DateTimeSelection {
  date: Date;
  timeSlot: string;
}

export type PaymentMethod = "transfer" | "applePay" | "card";

export interface PaymentInfo {
  method: PaymentMethod;
  amount: number;
  percentage: 50 | 100;
  trackingCode: string;
  receiptBase64: string;
  receiptFileName: string;
  acceptedPolicies: boolean;
}

export interface BookingData {
  personalInfo: PersonalInfo;
  service: SelectedService;
  location: ServiceLocation;
  dateTime: DateTimeSelection;
  payment: PaymentInfo;
}

export interface CalendarSlot {
  time: string;
  available: boolean;
}

export interface AvailabilityResponse {
  date: string;
  slots: CalendarSlot[];
}

export interface ConfirmResponse {
  success: boolean;
  eventId?: string;
  message: string;
}
