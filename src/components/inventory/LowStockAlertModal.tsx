
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface LowStockAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any | null;
}

const LowStockAlertModal: React.FC<LowStockAlertModalProps> = ({
  isOpen,
  onClose,
  item
}) => {
  if (!item) return null;

  // Calculate values
  const shortage = Math.max(0, item.minLevel - item.balance);
  const monthsRemaining = item.averageMonthlyUsage > 0 ? (item.balance / item.averageMonthlyUsage).toFixed(1) : 'N/A';
  const recommendedQuantity = Math.round(shortage * 1.5); // Example calculation - can be adjusted
  const approximateCost = recommendedQuantity * item.unitPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center">Low Stock Alert</DialogTitle>
          <DialogDescription className="text-center">
            Detailed information about low stock item
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-500">Part Name:</div>
            <div className="font-medium text-right">{item.itemName}</div>
            
            <div className="text-gray-500">Store:</div>
            <div className="font-medium text-right">{item.store}</div>
            
            <div className="text-gray-500">Current Stock:</div>
            <div className="font-medium text-right">{item.balance}</div>
            
            <div className="text-gray-500">Unit Price:</div>
            <div className="font-medium text-right">{formatCurrency(item.unitPrice)}</div>
            
            <div className="text-gray-500">Total Price:</div>
            <div className="font-medium text-right">{formatCurrency(item.totalPrice)}</div>
            
            <div className="text-gray-500">Minimum Level:</div>
            <div className="font-medium text-right">{item.minLevel}</div>
            
            <div className="text-gray-500">Shortage:</div>
            <div className="font-medium text-right text-red-500">{shortage}</div>
          </div>
          
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 text-sm">
              <h4 className="font-medium text-amber-800 mb-1">Usage Information</h4>
              <p className="text-amber-700">
                Average usage is {item.averageMonthlyUsage} units/month. 
                At current levels, stock may be depleted in ~{monthsRemaining} months.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-sm">
              <h4 className="font-medium text-blue-800 mb-1">Recommended Action</h4>
              <p className="text-blue-700">
                Recommended reorder quantity: {recommendedQuantity} units 
                (Approximate cost: {formatCurrency(approximateCost)})
              </p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>
            Request Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LowStockAlertModal;
