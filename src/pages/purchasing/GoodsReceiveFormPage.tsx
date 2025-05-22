
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Save, X, Search } from 'lucide-react';
import { format } from 'date-fns';
import { purchaseOrders } from '@/data/purchasingData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';

const GoodsReceiveFormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // States for form
  const [grNumber, setGrNumber] = useState(`GR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
  const [deliveryDate, setDeliveryDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [receiverName, setReceiverName] = useState('');
  const [poSelection, setPoSelection] = useState('');
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [availablePOs, setAvailablePOs] = useState<any[]>([]);
  const [receivedItems, setReceivedItems] = useState<any[]>([]);
  
  // Set up available POs - those with "Submitted" or "Partially Received" status
  useEffect(() => {
    const eligiblePOs = purchaseOrders.filter(po => 
      po.status === 'Submitted' || po.status === 'Partially Received'
    );
    setAvailablePOs(eligiblePOs);
  }, []);
  
  // Handle PO selection
  const handlePoSelection = (poId: string) => {
    setPoSelection(poId);
    
    const selectedPO = purchaseOrders.find(po => po.id === poId);
    setSelectedPO(selectedPO);
    
    if (selectedPO) {
      // Set up received items with default values
      const items = selectedPO.items.map((item: any) => ({
        ...item,
        receivedQuantity: 0,
        pendingToReceive: item.pendingQuantity,
        condition: 'Good',
        remarks: ''
      }));
      setReceivedItems(items);
    } else {
      setReceivedItems([]);
    }
  };
  
  // Update received item
  const updateReceivedItem = (index: number, field: string, value: any) => {
    const updatedItems = [...receivedItems];
    updatedItems[index][field] = value;
    
    // Calculate pending quantity if received quantity changes
    if (field === 'receivedQuantity') {
      const maxReceivable = updatedItems[index].pendingQuantity;
      const validValue = Math.min(maxReceivable, Math.max(0, value));
      updatedItems[index].receivedQuantity = validValue;
      updatedItems[index].pendingToReceive = maxReceivable - validValue;
    }
    
    setReceivedItems(updatedItems);
  };
  
  // Handle save
  const handleSave = () => {
    setSaving(true);
    
    // Validation
    if (!poSelection) {
      alert('Please select a Purchase Order');
      setSaving(false);
      return;
    }
    
    if (!receiverName) {
      alert('Please enter receiver name');
      setSaving(false);
      return;
    }
    
    // Check if at least one item has quantity > 0
    const hasReceivedItems = receivedItems.some(item => item.receivedQuantity > 0);
    if (!hasReceivedItems) {
      alert('Please enter received quantity for at least one item');
      setSaving(false);
      return;
    }
    
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      navigate('/purchasing/goods-receive');
    }, 1000);
  };
  
  // Handle cancel
  const handleCancel = () => {
    navigate('/purchasing/goods-receive');
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Purchasing', href: '/purchasing/goods-receive' },
              { label: 'Goods Receive', href: '/purchasing/goods-receive' },
              { label: 'New Goods Receive', href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold mt-2">Create Goods Receive</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            disabled={saving}
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleSave} 
            disabled={saving || !poSelection}
          >
            <Save className="mr-2 h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Goods Receive Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="grNumber">GR Number</Label>
                <Input 
                  id="grNumber" 
                  value={grNumber} 
                  disabled 
                />
                <p className="text-xs text-gray-500">Automatically generated</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="poNumber">Purchase Order</Label>
                <Select 
                  value={poSelection} 
                  onValueChange={handlePoSelection}
                >
                  <SelectTrigger id="poNumber" className="flex items-center">
                    <SelectValue placeholder="Select Purchase Order" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePOs.map((po) => (
                      <SelectItem key={po.id} value={po.id}>
                        {po.poNumber} - {po.vendorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedPO && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-sm text-gray-700 mb-1">PO Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Vendor:</span> {selectedPO.vendorName}
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span> 
                      <Badge variant="outline" className="ml-1">{selectedPO.status}</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input 
                  id="deliveryDate" 
                  type="date" 
                  value={deliveryDate} 
                  onChange={(e) => setDeliveryDate(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiverName">Receiver Name</Label>
                <Input 
                  id="receiverName" 
                  value={receiverName} 
                  onChange={(e) => setReceiverName(e.target.value)} 
                  placeholder="Enter name of person receiving goods" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document">Upload Document</Label>
                <Input 
                  id="document" 
                  type="file" 
                  className="cursor-pointer" 
                />
                <p className="text-xs text-gray-500">Upload delivery order, photos, etc.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Receive Items</CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedPO ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Search className="h-12 w-12 text-gray-300 mb-2" />
              <h3 className="text-lg font-medium">No Purchase Order Selected</h3>
              <p className="text-sm text-gray-500 max-w-sm mt-1">
                Please select a Purchase Order to see the items available for receiving.
              </p>
            </div>
          ) : receivedItems.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-gray-500">No items to receive from this Purchase Order.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Ordered Qty</TableHead>
                  <TableHead>Pending Qty</TableHead>
                  <TableHead>Receiving Qty</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receivedItems.map((item, index) => (
                  <TableRow key={item.id} className={item.pendingQuantity === 0 ? 'bg-gray-50' : ''}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.pendingQuantity}</TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        min="0" 
                        max={item.pendingQuantity} 
                        value={item.receivedQuantity} 
                        onChange={(e) => updateReceivedItem(index, 'receivedQuantity', parseInt(e.target.value) || 0)} 
                        disabled={item.pendingQuantity === 0}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.condition} 
                        onValueChange={(value) => updateReceivedItem(index, 'condition', value)}
                        disabled={item.receivedQuantity === 0}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Damaged">Damaged</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input 
                        value={item.remarks} 
                        onChange={(e) => updateReceivedItem(index, 'remarks', e.target.value)} 
                        placeholder="Add remarks..."
                        disabled={item.receivedQuantity === 0}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="w-full text-right">
            <Button 
              variant="default" 
              onClick={handleSave} 
              disabled={saving || !poSelection}
              className="ml-auto"
            >
              <Save className="mr-2 h-4 w-4" /> {saving ? 'Saving...' : 'Complete Receipt'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GoodsReceiveFormPage;
