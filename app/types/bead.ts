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
}

export interface respondeToBeadPurchaseRQ {
  requestId: string;
  accept: boolean;
  responseMessage: string;
}

export interface requestToJoinThread {
  threadId: string;
  userId: string;
  message: string;
}

export interface joinThreadResponseData {
  message: string;
  success: boolean;
  requestId: string;
  threadId: string;
  userId: string;
}

export interface joinThreadResponse {
  data: joinThreadResponseData;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

export interface respondToMembershipRequest {
  requestId: string;
  threadId: string;
  userId: string;
  accept: boolean;
  responseMessage: string;
}
