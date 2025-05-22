import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FileText, Plus, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { purchaseOrders, vendors } from '@/data/purchasingData';
import { formatCurrency } from '@/utils/formatters';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { Badge } from '@/components/ui/badge';

const PurchaseOrderFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [poNumber, setPoNumber] = useState('');
  const [poDate, setPoDate] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [terms, setTerms] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    if (isEditing) {
      // Load existing PO data
      const po = purchaseOrders.find(p => p.id === id);
      if (po) {
        setPoNumber(po.poNumber);
        setPoDate(format(new Date(po.poDate), 'yyyy-MM-dd'));
        setVendorId(po.vendorId);
        setDeliveryDate(format(new Date(po.deliveryDate), 'yyyy-MM-dd'));
        setTerms(po.terms || '');
        setNotes(po.notes || '');
        setItems(po.items);
      }
    } else {
      // Initialize with defaults for new PO
      setPoNumber(`PO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
      setPoDate(format(new Date(), 'yyyy-MM-dd'));
      setDeliveryDate(format(new Date(new Date().setDate(new Date().getDate() + 14)), 'yyyy-MM-dd'));
      setItems([{ 
        id: `temp-${Date.now()}`,
        itemName: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        receivedQuantity: 0,
        pendingQuantity: 0
      }]);
    }
    
    setLoading(false);
  }, [id, isEditing]);
  
  // Calculate total whenever items change
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    setTotalAmount(total);
  }, [items]);
  
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: `temp-${Date.now()}`,
        itemName: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        receivedQuantity: 0,
        pendingQuantity: 0
      }
    ]);
  };
  
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    // Recalculate total price if quantity or unit price changes
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].totalPrice = newItems[index].quantity * newItems[index].unitPrice;
      newItems[index].pendingQuantity = newItems[index].quantity - newItems[index].receivedQuantity;
    }
    
    setItems(newItems);
  };
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setSaving(false);
      navigate('/purchasing/purchase-order');
    }, 1000);
  };
  
  const handleCancel = () => {
    navigate('/purchasing/purchase-order');
  };
  
  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumbs
            showHome
            overrideItems={[
              { label: 'Home', href: '/' },
              { label: 'Purchasing', href: '/purchasing/purchase-order' },
              { label: 'Purchase Orders', href: '/purchasing/purchase-order' },
              { label: isEditing ? 'Edit Purchase Order' : 'New Purchase Order', href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold mt-2">
            {isEditing ? 'Edit Purchase Order' : 'Create Purchase Order'}
          </h1>
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
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" /> {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Purchase Order Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="poNumber">PO Number</Label>
                <Input 
                  id="poNumber" 
                  value={poNumber} 
                  onChange={(e) => setPoNumber(e.target.value)} 
                  disabled 
                />
                <p className="text-xs text-gray-500">Automatically generated</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="poDate">PO Date</Label>
                <Input 
                  id="poDate" 
                  type="date" 
                  value={poDate} 
                  onChange={(e) => setPoDate(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Select 
                  value={vendorId} 
                  onValueChange={setVendorId}
                >
                  <SelectTrigger id="vendor">
                    <SelectValue placeholder="Select a vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
                <Input 
                  id="deliveryDate" 
                  type="date" 
                  value={deliveryDate} 
                  onChange={(e) => setDeliveryDate(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Payment Terms</Label>
                <Select 
                  value={terms} 
                  onValueChange={setTerms}
                >
                  <SelectTrigger id="terms">
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Net 15">Net 15</SelectItem>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 45">Net 45</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  placeholder="Additional notes or instructions..."
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
                <p className="text-xs text-gray-500">Upload quotation, vendor documents, etc.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Line Items</span>
            <Button size="sm" onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg">
                <div className="md:col-span-4 space-y-2">
                  <Label htmlFor={`item-${index}-name`}>Item Name</Label>
                  <Input 
                    id={`item-${index}-name`} 
                    value={item.itemName} 
                    onChange={(e) => updateItem(index, 'itemName', e.target.value)} 
                    placeholder="Enter item name" 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`item-${index}-quantity`}>Quantity</Label>
                  <Input 
                    id={`item-${index}-quantity`} 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)} 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`item-${index}-unit-price`}>Unit Price</Label>
                  <Input 
                    id={`item-${index}-unit-price`} 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    value={item.unitPrice} 
                    onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)} 
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label>Total Price</Label>
                  <div className="h-10 px-3 py-2 rounded-md border border-gray-200 bg-gray-100 flex items-center">
                    {formatCurrency(item.totalPrice || 0)}
                  </div>
                </div>
                <div className="md:col-span-2 flex items-end justify-end">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="text-destructive hover:text-destructive" 
                    onClick={() => handleRemoveItem(index)}
                    disabled={items.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t p-4">
          <div className="space-y-2 text-right">
            <div className="text-sm text-gray-500">Total Amount</div>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PurchaseOrderFormPage;
