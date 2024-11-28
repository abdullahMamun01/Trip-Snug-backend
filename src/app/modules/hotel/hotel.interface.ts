export interface IHotel {
  title: string;
  description: string;
  images: string[];
  location: {
    country: string;
    city: string;
    zipCode: string; 
    address: string;
    latitude?: number;
    longitude?: number;
  };
  contactInfo: string;
  pricePerNight: number;
  availableRooms: number;
  amenities: string[];
  tags: string[];
  currency: string;
  discount?: {
    percentage: number;
    description?: string;
    validUntil?: string;
  };
  
  policies: {
    checkIn: string;
    checkOut: string;
    cancellationPolicy: string;
  };
  classification: 
    | '1-star' 
    | '2-star' 
    | '3-star' 
    | '4-star' 
    | '5-star'
    | 'Luxury' 
    | 'Budget' 
    | 'Resort' 
    | 'Boutique' 
    | 'Business' 
    | 'Family-friendly';

    isDeleted?: boolean
  
}
/* https://api.opencagedata.com/geocode/v1/json?q=Singapore&key=f7f08b69df1a4c46b59c9ce45c7fc96b */