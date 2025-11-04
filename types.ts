
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  loyaltyPoints: number;
  isAdmin: boolean;
}

export interface SalonService {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  category: 'Dámske' | 'Pánske' | 'Farbenie' | 'Ostatné';
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  services: string[]; // array of service IDs
  skills: string[];
}

export interface Appointment {
  id: string;
  userId: string;
  stylistId: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  status: 'upcoming' | 'completed' | 'cancelled' | 'no-show';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ContentIdea {
  title: string;
  description: string;
  platform: 'Instagram' | 'TikTok' | 'Facebook';
  hashtags: string[];
}

export interface WpService {
  _ID: string;
  post_title: string;
  post_desc: string;
  post_category: string;
  post_subcategory: string;
  post_price: number; // Changed from string to number
  post_duration: number; // Changed from string to number
}