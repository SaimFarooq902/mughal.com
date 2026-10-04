export type ProductCategory = 'CNC Lathes' | 'Turning Centers' | 'Milling & Boring' | 'Tooling & Inserts' | 'Spare Parts';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  sku: string;
  price: number;
  discountPrice?: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Made to Order' | 'Sold Out';
  stockCount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  videoUrl?: string;
  shortDescription: string;
  fullDescription: string;
  specifications: {
    maxTurningDiameter: string;
    spindleSpeed: string;
    chuckSize: string;
    bedLength: string;
    motorPower: string;
    weight: string;
    controlSystem: string;
  };
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  quantity: number;
  customRequirements?: string;
  status: 'Pending Quote' | 'Quote Sent' | 'Dispatched' | 'Installed';
  date: string;
  totalEstimatedPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'COD' | 'Bank Transfer' | 'Proforma Invoice';
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Dispatched' | 'Delivered';
  date: string;
  isProforma?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  comment: string;
  rating: number;
  machineUsed: string;
}

export interface LiveToastMessage {
  id: string;
  text: string;
  timeAgo: string;
}

export interface B2BLead {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviewsCount: number;
  status: 'New' | 'Contacted' | 'Interested' | 'Closed';
}

export interface CampaignLead {
  id: string;
  companyName: string;
  city: string;
  category: string;
  website: string;
  hasWebsite: boolean;
  machineryNeed: 'High' | 'Medium' | 'Low';
  phone: string;
  generatedPitch: string;
  status: 'Queued' | 'Pitch Sent' | 'Replied' | 'Converted';
  date: string;
}

export interface VideoReelItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  viewsCount: number;
  likesCount: number;
  machineModel: string;
  viewsLog: { deviceId: string; userName?: string; timestamp: string }[];
  likesLog: { deviceId: string; userName?: string; timestamp: string }[];
  comments: { id: string; user: string; text: string; time: string }[];
}
