
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Mock vendor data - in a real app, this would come from your database
const VENDORS = [
  { id: 'v1', name: 'PetroSuppliers Sdn Bhd', rating: 4.8, leadTime: '5-7 days', priceRating: 'Competitive' },
  { id: 'v2', name: 'Industrial Parts Malaysia', rating: 4.5, leadTime: '3-5 days', priceRating: 'Premium' },
  { id: 'v3', name: 'Global Equipment Solutions', rating: 4.2, leadTime: '7-10 days', priceRating: 'Economy' },
];

interface RequestPOModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any | null;
}

const RequestPOModal: React.FC<RequestPOModalProps> = ({
  isOpen,
  onClose,
  item
}) => {
  const [quantity, setQuantity] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  // Calculate recommended order quantity
  const shortage = Math.max(0, item.minLevel - item.balance);
  const recommendedQuantity = Math.round(shortage * 1.5); // Add 50% buffer
  
  // Get vendor recommendation (simplified logic)
  const getRecommendedVendor = () => {
    // In a real app, this would use more sophisticated logic like past order history,
    // current pricing, availability, lead times, etc.
    return VENDORS.sort((a, b) => b.rating - a.rating)[0];
  }
  
  const recommendedVendor = getRecommendedVendor();

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(`Purchase Order created for ${quantity} units of ${item.itemName}`);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Purchase Order</DialogTitle>
          <DialogDescription>
            Create a purchase order for {item.itemName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-500">Part Name:</div>
            <div className="font-medium text-right">{item.itemName}</div>
            
            <div className="text-gray-500">Current Stock:</div>
            <div className="font-medium text-right">{item.balance}</div>
            
            <div className="text-gray-500">Minimum Level:</div>
            <div className="font-medium text-right">{item.minLevel}</div>
            
            <div className="text-gray-500">Unit Price:</div>
            <div className="font-medium text-right">{formatCurrency(item.unitPrice)}</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity to Order</Label>
            <Input 
              id="quantity" 
              type="number" 
              placeholder={recommendedQuantity.toString()}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Recommended order: {recommendedQuantity} units 
              (Total: {formatCurrency(item.unitPrice * recommendedQuantity)})
            </p>
          </div>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4 text-sm">
              <h4 className="font-medium text-blue-800 mb-2">Vendor Recommendations</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor">Select Vendor</Label>
                  <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                    <SelectTrigger id="vendor">
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {VENDORS.map(vendor => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <p className="text-blue-700 mb-1">
                    <span className="font-medium">Recommended vendor:</span> {recommendedVendor.name}
                  </p>
                  <ul className="text-xs space-y-1 text-blue-600">
                    <li>• Rating: {recommendedVendor.rating}/5</li>
                    <li>• Lead Time: {recommendedVendor.leadTime}</li>
                    <li>• Price: {recommendedVendor.priceRating}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !quantity || !selectedVendor}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Creating PO...
              </>
            ) : 'Create Purchase Order'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestPOModal;
