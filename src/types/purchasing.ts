
export interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface PurchaseOrderItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity: number;
  pendingQuantity: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  poDate: string;
  vendorId: string;
  vendorName: string;
  deliveryDate: string;
  itemCount: number;
  status: 'Draft' | 'Submitted' | 'Partially Received' | 'Fully Received' | 'Cancelled';
  totalCost: number;
  terms?: string;
  notes?: string;
  attachments?: string[];
  items: PurchaseOrderItem[];
}

export interface GoodsReceive {
  id: string;
  grNumber: string;
  poId: string;
  poNumber: string;
  vendorId: string;
  vendorName: string;
  deliveryDate: string;
  receiverName: string;
  itemCount: number;
  totalQuantity: number;
  receivedQuantity: number;
  status: 'Pending' | 'Partial' | 'Completed';
  attachments?: string[];
  items: GoodsReceiveItem[];
}

export interface GoodsReceiveItem {
  id: string;
  poItemId: string;
  itemId: string;
  itemName: string;
  orderedQuantity: number;
  receivedQuantity: number;
  pendingQuantity: number;
  condition: 'Good' | 'Damaged';
  remarks?: string;
}

export interface PurchaseRecord {
  id: string;
  recordId: string;
  purchaseDate: string;
  itemId: string;
  itemName: string;
  quantity: number;
  vendorId: string;
  vendorName: string;
  status: 'Received' | 'Partial' | 'Cancelled';
  unitPrice: number;
  totalPrice: number;
  poId: string;
  poNumber: string;
  remarks?: string;
}
