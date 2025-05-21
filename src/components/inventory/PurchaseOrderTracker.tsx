
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/formatters';
import { CheckCircle, Clock, AlertTriangle, Truck, Package } from 'lucide-react';
import { toast } from 'sonner';

// Mock purchase order data - in a real app, this would come from your database
const MOCK_PURCHASE_ORDERS = [
  { 
    id: 'PO-2025-0001', 
    itemName: 'Control Valve', 
    quantity: 30, 
    unitPrice: 350.00, 
    vendor: 'PetroSuppliers Sdn Bhd',
    status: 'approved',
    orderDate: '2025-05-10',
    expectedDelivery: '2025-05-25',
    notes: 'Priority shipment requested',
    trackingNumber: 'TRK123456789',
    lastUpdated: '2025-05-15',
  },
  { 
    id: 'PO-2025-0002', 
    itemName: 'Pressure Transmitter', 
    quantity: 25, 
    unitPrice: 275.50, 
    vendor: 'Industrial Parts Malaysia',
    status: 'processing',
    orderDate: '2025-05-12',
    expectedDelivery: '2025-05-30',
    notes: '',
    trackingNumber: '',
    lastUpdated: '2025-05-12',
  },
  { 
    id: 'PO-2025-0003', 
    itemName: 'Temperature Sensor', 
    quantity: 15, 
    unitPrice: 180.00, 
    vendor: 'Global Equipment Solutions',
    status: 'shipped',
    orderDate: '2025-05-05',
    expectedDelivery: '2025-05-20',
    notes: 'Partial shipment of 10 units',
    trackingNumber: 'TRK987654321',
    lastUpdated: '2025-05-16',
  },
  { 
    id: 'PO-2025-0004', 
    itemName: 'Flow Meter', 
    quantity: 5, 
    unitPrice: 720.00, 
    vendor: 'Industrial Parts Malaysia',
    status: 'delivered',
    orderDate: '2025-05-01',
    expectedDelivery: '2025-05-15',
    notes: 'Delivered to main warehouse',
    trackingNumber: 'TRK567891234',
    lastUpdated: '2025-05-14',
  }
];

interface PurchaseOrderTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: string | null;
}

const PurchaseOrderTracker: React.FC<PurchaseOrderTrackerProps> = ({
  isOpen,
  onClose,
  selectedItem
}) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate API call to fetch purchase orders
      setTimeout(() => {
        const filteredOrders = selectedItem 
          ? MOCK_PURCHASE_ORDERS.filter(order => order.itemName === selectedItem)
          : MOCK_PURCHASE_ORDERS;
        setOrders(filteredOrders);
        setIsLoading(false);
      }, 700);
    } else {
      setSelectedOrder(null);
    }
  }, [isOpen, selectedItem]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Approved</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Processing</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-indigo-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleTrackDelivery = (trackingNumber: string) => {
    // In a real app, this might open a tracking page or show more details
    toast.info(`Tracking package: ${trackingNumber}`);
  };
  
  const handleSelectOrder = (order: any) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const renderOrderList = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-gray-500">Loading purchase orders...</p>
          </div>
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No purchase orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedItem ? `No purchase orders for ${selectedItem}` : 'No purchase orders have been created yet'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4 my-4">
        {orders.map(order => (
          <div 
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleSelectOrder(order)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{order.id}</h3>
              {getStatusBadge(order.status)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Item:</div>
              <div className="font-medium">{order.itemName}</div>
              
              <div className="text-gray-500">Quantity:</div>
              <div className="font-medium">{order.quantity} units</div>
              
              <div className="text-gray-500">Vendor:</div>
              <div className="font-medium">{order.vendor}</div>
              
              <div className="text-gray-500">Expected Delivery:</div>
              <div className="font-medium">{new Date(order.expectedDelivery).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    const { 
      id, itemName, quantity, unitPrice, vendor, status, 
      orderDate, expectedDelivery, notes, trackingNumber, lastUpdated
    } = selectedOrder;

    return (
      <div className="space-y-6 my-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleBackToList} className="text-blue-600">
            ← Back to list
          </Button>
          {getStatusBadge(status)}
        </div>

        <div className="flex items-center gap-3 mb-4">
          {getStatusIcon(status)}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{id}</h2>
            <p className="text-sm text-gray-500">Last updated: {new Date(lastUpdated).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Order Information</h3>
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Item Name:</dt>
                  <dd className="font-medium text-gray-900">{itemName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Quantity:</dt>
                  <dd className="font-medium text-gray-900">{quantity} units</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Unit Price:</dt>
                  <dd className="font-medium text-gray-900">{formatCurrency(unitPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Total Value:</dt>
                  <dd className="font-medium text-gray-900">{formatCurrency(quantity * unitPrice)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Order Date:</dt>
                  <dd className="font-medium text-gray-900">{new Date(orderDate).toLocaleDateString()}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Delivery Information</h3>
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Vendor:</dt>
                  <dd className="font-medium text-gray-900">{vendor}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Expected Delivery:</dt>
                  <dd className="font-medium text-gray-900">{new Date(expectedDelivery).toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Status:</dt>
                  <dd className="font-medium text-gray-900 capitalize">{status}</dd>
                </div>
                {trackingNumber && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Tracking Number:</dt>
                    <dd className="font-medium text-gray-900">{trackingNumber}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
        
        {notes && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-900">{notes}</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-500">
            {status === 'delivered' ? 
              'This order has been delivered.' : 
              `Expected delivery in ${Math.round((new Date(expectedDelivery).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
            }
          </div>
          
          {trackingNumber && status !== 'delivered' && (
            <Button 
              variant="outline"
              onClick={() => handleTrackDelivery(trackingNumber)}
              className="flex gap-2 items-center"
            >
              <Truck className="h-4 w-4" /> Track Delivery
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Purchase Order Tracker</DialogTitle>
          <DialogDescription>
            {selectedItem ? `View and track purchase orders for ${selectedItem}` : 'View and track all purchase orders'}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          {selectedOrder ? renderOrderDetails() : renderOrderList()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseOrderTracker;
