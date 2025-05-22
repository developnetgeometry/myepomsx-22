
import { PurchaseOrder, PurchaseRecord, GoodsReceive, Vendor } from '@/types/purchasing';

// Sample vendors
export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'PetroSuppliers Sdn Bhd',
    contactPerson: 'Ahmad Ismail',
    email: 'sales@petrosuppliers.com',
    phone: '+60123456789',
    address: 'No. 123, Jalan Industri, Kuala Lumpur'
  },
  {
    id: '2',
    name: 'Industrial Parts Malaysia',
    contactPerson: 'Tan Wei Lin',
    email: 'orders@indparts.my',
    phone: '+60123456790',
    address: 'Block B, Taman Industrial, Penang'
  },
  {
    id: '3',
    name: 'Global Equipment Solutions',
    contactPerson: 'Sarah Johnson',
    email: 'info@globalequip.com',
    phone: '+60123456791',
    address: '45 Industrial Avenue, Johor Bahru'
  },
  {
    id: '4',
    name: 'Eastern Technical Services',
    contactPerson: 'Rajesh Kumar',
    email: 'support@easterntech.com',
    phone: '+60123456792',
    address: 'Industrial Zone 3, Kota Kinabalu'
  }
];

// Sample purchase orders
export const purchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2025-0001',
    poDate: '2025-05-10',
    vendorId: '1',
    vendorName: 'PetroSuppliers Sdn Bhd',
    deliveryDate: '2025-05-25',
    itemCount: 2,
    status: 'Partially Received',
    totalCost: 12500,
    terms: 'Net 30',
    notes: 'Priority shipment requested',
    items: [
      {
        id: '1',
        itemId: '101',
        itemName: 'Control Valve',
        quantity: 30,
        unitPrice: 350,
        totalPrice: 10500,
        receivedQuantity: 20,
        pendingQuantity: 10
      },
      {
        id: '2',
        itemId: '102',
        itemName: 'Pressure Gauge',
        quantity: 10,
        unitPrice: 200,
        totalPrice: 2000,
        receivedQuantity: 0,
        pendingQuantity: 10
      }
    ]
  },
  {
    id: '2',
    poNumber: 'PO-2025-0002',
    poDate: '2025-05-12',
    vendorId: '2',
    vendorName: 'Industrial Parts Malaysia',
    deliveryDate: '2025-05-30',
    itemCount: 3,
    status: 'Submitted',
    totalCost: 8887.5,
    terms: 'Net 45',
    notes: '',
    items: [
      {
        id: '3',
        itemId: '201',
        itemName: 'Pressure Transmitter',
        quantity: 25,
        unitPrice: 275.50,
        totalPrice: 6887.5,
        receivedQuantity: 0,
        pendingQuantity: 25
      },
      {
        id: '4',
        itemId: '202',
        itemName: 'Temperature Indicator',
        quantity: 10,
        unitPrice: 200,
        totalPrice: 2000,
        receivedQuantity: 0,
        pendingQuantity: 10
      }
    ]
  },
  {
    id: '3',
    poNumber: 'PO-2025-0003',
    poDate: '2025-05-05',
    vendorId: '3',
    vendorName: 'Global Equipment Solutions',
    deliveryDate: '2025-05-20',
    itemCount: 1,
    status: 'Fully Received',
    totalCost: 2700,
    terms: 'Net 15',
    notes: '',
    items: [
      {
        id: '5',
        itemId: '301',
        itemName: 'Temperature Sensor',
        quantity: 15,
        unitPrice: 180,
        totalPrice: 2700,
        receivedQuantity: 15,
        pendingQuantity: 0
      }
    ]
  },
  {
    id: '4',
    poNumber: 'PO-2025-0004',
    poDate: '2025-05-01',
    vendorId: '2',
    vendorName: 'Industrial Parts Malaysia',
    deliveryDate: '2025-05-15',
    itemCount: 1,
    status: 'Fully Received',
    totalCost: 3600,
    terms: 'Net 30',
    notes: '',
    items: [
      {
        id: '6',
        itemId: '401',
        itemName: 'Flow Meter',
        quantity: 5,
        unitPrice: 720,
        totalPrice: 3600,
        receivedQuantity: 5,
        pendingQuantity: 0
      }
    ]
  },
  {
    id: '5',
    poNumber: 'PO-2025-0005',
    poDate: '2025-05-18',
    vendorId: '4',
    vendorName: 'Eastern Technical Services',
    deliveryDate: '2025-06-02',
    itemCount: 2,
    status: 'Draft',
    totalCost: 5500,
    terms: 'Net 30',
    notes: 'For plant maintenance project',
    items: [
      {
        id: '7',
        itemId: '501',
        itemName: 'Solenoid Valve',
        quantity: 10,
        unitPrice: 350,
        totalPrice: 3500,
        receivedQuantity: 0,
        pendingQuantity: 10
      },
      {
        id: '8',
        itemId: '502',
        itemName: 'Pneumatic Actuator',
        quantity: 4,
        unitPrice: 500,
        totalPrice: 2000,
        receivedQuantity: 0,
        pendingQuantity: 4
      }
    ]
  }
];

// Sample goods receive records
export const goodsReceives: GoodsReceive[] = [
  {
    id: '1',
    grNumber: 'GR-2025-0001',
    poId: '1',
    poNumber: 'PO-2025-0001',
    vendorId: '1',
    vendorName: 'PetroSuppliers Sdn Bhd',
    deliveryDate: '2025-05-18',
    receiverName: 'Abdullah Aziz',
    itemCount: 1,
    totalQuantity: 30,
    receivedQuantity: 20,
    status: 'Partial',
    attachments: ['delivery-note-001.pdf'],
    items: [
      {
        id: '1',
        poItemId: '1',
        itemId: '101',
        itemName: 'Control Valve',
        orderedQuantity: 30,
        receivedQuantity: 20,
        pendingQuantity: 10,
        condition: 'Good',
        remarks: 'Partial delivery, remainder to follow next week'
      }
    ]
  },
  {
    id: '2',
    grNumber: 'GR-2025-0002',
    poId: '3',
    poNumber: 'PO-2025-0003',
    vendorId: '3',
    vendorName: 'Global Equipment Solutions',
    deliveryDate: '2025-05-19',
    receiverName: 'Li Wei',
    itemCount: 1,
    totalQuantity: 15,
    receivedQuantity: 15,
    status: 'Completed',
    attachments: ['delivery-note-002.pdf', 'inspection-report-001.pdf'],
    items: [
      {
        id: '2',
        poItemId: '5',
        itemId: '301',
        itemName: 'Temperature Sensor',
        orderedQuantity: 15,
        receivedQuantity: 15,
        pendingQuantity: 0,
        condition: 'Good',
        remarks: 'All items received in good condition'
      }
    ]
  },
  {
    id: '3',
    grNumber: 'GR-2025-0003',
    poId: '4',
    poNumber: 'PO-2025-0004',
    vendorId: '2',
    vendorName: 'Industrial Parts Malaysia',
    deliveryDate: '2025-05-14',
    receiverName: 'Rajesh Sharma',
    itemCount: 1,
    totalQuantity: 5,
    receivedQuantity: 5,
    status: 'Completed',
    attachments: ['delivery-note-003.pdf'],
    items: [
      {
        id: '3',
        poItemId: '6',
        itemId: '401',
        itemName: 'Flow Meter',
        orderedQuantity: 5,
        receivedQuantity: 5,
        pendingQuantity: 0,
        condition: 'Good',
        remarks: 'Delivered to main warehouse'
      }
    ]
  }
];

// Sample purchase records
export const purchaseRecords: PurchaseRecord[] = [
  {
    id: '1',
    recordId: 'PR-2025-0001',
    purchaseDate: '2025-05-18',
    itemId: '101',
    itemName: 'Control Valve',
    quantity: 20,
    vendorId: '1',
    vendorName: 'PetroSuppliers Sdn Bhd',
    status: 'Partial',
    unitPrice: 350,
    totalPrice: 7000,
    poId: '1',
    poNumber: 'PO-2025-0001',
    remarks: 'Partial delivery'
  },
  {
    id: '2',
    recordId: 'PR-2025-0002',
    purchaseDate: '2025-05-19',
    itemId: '301',
    itemName: 'Temperature Sensor',
    quantity: 15,
    vendorId: '3',
    vendorName: 'Global Equipment Solutions',
    status: 'Received',
    unitPrice: 180,
    totalPrice: 2700,
    poId: '3',
    poNumber: 'PO-2025-0003',
    remarks: 'Complete delivery'
  },
  {
    id: '3',
    recordId: 'PR-2025-0003',
    purchaseDate: '2025-05-14',
    itemId: '401',
    itemName: 'Flow Meter',
    quantity: 5,
    vendorId: '2',
    vendorName: 'Industrial Parts Malaysia',
    status: 'Received',
    unitPrice: 720,
    totalPrice: 3600,
    poId: '4',
    poNumber: 'PO-2025-0004',
    remarks: 'Delivered to main warehouse'
  }
];
