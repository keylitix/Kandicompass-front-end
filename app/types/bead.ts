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
