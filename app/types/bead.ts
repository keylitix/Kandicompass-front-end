export interface CreateBeadRequest {
  beadName: string;
  threadId: string;
  ownerId: string;
  visibility: 'Public' | 'Private';
  beadType: string;
  material: string;
  color: string;
  size: number;
  shape: string;
  weight: number;
  finish: string;
  productCode: string;
  description: string;
  quantity: number;
  supplier: string;
  pricePerUnit: number;
}

export interface Bead {
  _id: string;
  beadName: string;
  beadType: string;
  color: string;
  created_at: string;
  updated_at: string;
  description: string;
  finish: string;
  images: string[];
  length: number;
  is_activated: boolean;
  is_deleted: boolean;
  link: string;
  material: string;
  ownerId: Array<{ [key: string]: any }>;
  ownershipHistory: any[];
  pricePerUnit: number;
  productCode: string;
  qrCode: string;
  quantity: number;
  reviews: any[];
  shape: string;
  size: number;
  stories: any[];
  supplier: string;
  threadId: Array<{ [key: string]: any }>;
  thumbnail: string;
  weight: number;
  __v: number;
}

export interface BeadPurchaseRequest {
  threadId: string;
  beadId: string;
  buyerId: string;
  offerPrice: number;
  message: string;
};

