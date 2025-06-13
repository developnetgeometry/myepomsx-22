import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { departments, purchaseRequests } from '@/data/purchasingSampleData';
import { ClipboardList, Plus, Trash2, Package, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface FormItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  uom: string;
}

type PurchaseRequestType = 'asset' | 'work_order';

const PurchaseRequestFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = id !== 'new';
  
  const [purchaseRequestType, setPurchaseRequestType] = useState<PurchaseRequestType>('asset');
  const [formData, setFormData] = useState({
    requestNumber: '',
    date: new Date().toISOString().split('T')[0],
    department: '',
    requestedBy: '',
    requesterEmail: '',
    priority: 'medium',
    notes: '',
    items: [] as FormItem[],
    status: 'draft',
    assetId: '',
    workOrderId: ''
  });

  // Fetch data if editing
  useEffect(() => {
    if (isEdit) {
      const request = purchaseRequests.find(req => req.id === id);
      if (request) {
        setFormData({
          requestNumber: request.requestNumber,
          date: request.date,
          department: request.department,
          requestedBy: request.requestedBy,
          requesterEmail: request.requesterEmail,
          priority: request.priority,
          notes: request.notes || '',
          items: request.items,
          status: request.status,
          assetId: '',
          workOrderId: ''
        });
      }
    } else {
      // Generate new request number for new requests
      const newRequestNumber = `PR-2025-${String(purchaseRequests.length + 1).padStart(3, '0')}`;
      setFormData({
        ...formData,
        requestNumber: newRequestNumber
      });
    }
  }, [id, isEdit]);

  const handleItemChange = (index: number, field: keyof FormItem, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // Recalculate total price if quantity or unitPrice changes
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].totalPrice = 
        Number(updatedItems[index].quantity) * Number(updatedItems[index].unitPrice);
    }
    
    setFormData({
      ...formData,
      items: updatedItems
    });
  };

  const addItem = () => {
    const newItem: FormItem = {
      id: `temp-${Date.now()}`,
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      uom: 'Unit'
    };
    
    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: updatedItems
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.requestedBy || !formData.department || formData.items.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and add at least one item.",
        variant: "destructive"
      });
      return;
    }

    // Additional validation based on purchase request type
    if (purchaseRequestType === 'asset' && !formData.assetId) {
      toast({
        title: "Validation Error", 
        description: "Please select an asset for asset-based purchase request.",
        variant: "destructive"
      });
      return;
    }

    if (purchaseRequestType === 'work_order' && !formData.workOrderId) {
      toast({
        title: "Validation Error",
        description: "Please select a work order for work order-based purchase request.",
        variant: "destructive"
      });
      return;
    }
    
    // Save and navigate back
    toast({
      title: `Purchase Request ${isEdit ? 'Updated' : 'Created'}`,
      description: `Purchase Request ${formData.requestNumber} has been ${isEdit ? 'updated' : 'created'}.`
    });
    
    // In a real app, you'd make an API call here
    navigate('/purchasing/request');
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/purchasing/request">Purchase Request</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isEdit ? 'Edit' : 'New'} Purchase Request
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'New'} Purchase Request</h1>
      </div>

      {!isEdit && (
        <Card>
          <CardHeader>
            <CardTitle>Purchase Request Type</CardTitle>
            <CardDescription>Choose the basis for your purchase request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer border-2 transition-colors ${
                  purchaseRequestType === 'asset' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setPurchaseRequestType('asset')}
              >
                <CardContent className="p-6 text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Asset-Based Request</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a purchase request for items needed for a specific asset
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer border-2 transition-colors ${
                  purchaseRequestType === 'work_order' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setPurchaseRequestType('work_order')}
              >
                <CardContent className="p-6 text-center">
                  <Wrench className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Work Order-Based Request</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a purchase request for items needed for a specific work order
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
            <CardDescription>Enter the details of your purchase request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requestNumber">Request Number</Label>
                <Input
                  id="requestNumber"
                  value={formData.requestNumber}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestedBy">Requested By</Label>
                <Input
                  id="requestedBy"
                  value={formData.requestedBy}
                  onChange={e => setFormData({...formData, requestedBy: e.target.value})}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={value => setFormData({...formData, department: value})}
                >
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={value => setFormData({...formData, priority: value as 'low' | 'medium' | 'high'})}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {!isEdit && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {purchaseRequestType === 'asset' && (
                  <div className="space-y-2">
                    <Label htmlFor="assetId">Asset</Label>
                    <Select
                      value={formData.assetId}
                      onValueChange={value => setFormData({...formData, assetId: value})}
                    >
                      <SelectTrigger id="assetId">
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asset-001">Pump - PMP-001</SelectItem>
                        <SelectItem value="asset-002">Motor - MTR-002</SelectItem>
                        <SelectItem value="asset-003">Valve - VLV-003</SelectItem>
                        <SelectItem value="asset-004">Compressor - CMP-004</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {purchaseRequestType === 'work_order' && (
                  <div className="space-y-2">
                    <Label htmlFor="workOrderId">Work Order</Label>
                    <Select
                      value={formData.workOrderId}
                      onValueChange={value => setFormData({...formData, workOrderId: value})}
                    >
                      <SelectTrigger id="workOrderId">
                        <SelectValue placeholder="Select work order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wo-001">WO-2025-001 - Pump Maintenance</SelectItem>
                        <SelectItem value="wo-002">WO-2025-002 - Motor Repair</SelectItem>
                        <SelectItem value="wo-003">WO-2025-003 - Valve Replacement</SelectItem>
                        <SelectItem value="wo-004">WO-2025-004 - Compressor Overhaul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
                placeholder="Add any additional notes or instructions"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Items</CardTitle>
              <CardDescription>Add items to your purchase request</CardDescription>
            </div>
            <Button type="button" onClick={addItem} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            {formData.items.length === 0 ? (
              <div className="text-center p-6 border rounded-md border-dashed">
                <p className="text-gray-500">No items added yet. Click "Add Item" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="p-4 border rounded-md flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">Item #{index + 1}</h3>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                        <Input
                          id={`item-name-${index}`}
                          value={item.name}
                          onChange={e => handleItemChange(index, 'name', e.target.value)}
                          placeholder="Item name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`item-description-${index}`}>Description</Label>
                        <Input
                          id={`item-description-${index}`}
                          value={item.description}
                          onChange={e => handleItemChange(index, 'description', e.target.value)}
                          placeholder="Item description"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`item-quantity-${index}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`item-uom-${index}`}>Unit of Measure</Label>
                        <Select
                          value={item.uom}
                          onValueChange={value => handleItemChange(index, 'uom', value)}
                        >
                          <SelectTrigger id={`item-uom-${index}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Unit">Unit</SelectItem>
                            <SelectItem value="Box">Box</SelectItem>
                            <SelectItem value="Meter">Meter</SelectItem>
                            <SelectItem value="Liter">Liter</SelectItem>
                            <SelectItem value="Kilogram">Kilogram</SelectItem>
                            <SelectItem value="Set">Set</SelectItem>
                            <SelectItem value="Pair">Pair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`item-unitPrice-${index}`}>Unit Price (RM)</Label>
                        <Input
                          id={`item-unitPrice-${index}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={e => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`item-totalPrice-${index}`}>Total Price (RM)</Label>
                        <Input
                          id={`item-totalPrice-${index}`}
                          value={item.totalPrice.toFixed(2)}
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <div className="text-right min-w-[150px]">
                    <p className="text-sm text-gray-500">Total:</p>
                    <p className="font-medium">
                      RM {formData.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button type="button" variant="outline" onClick={() => navigate('/purchasing/request')}>
              Cancel
            </Button>
            <div className="space-x-2">
              <Button type="submit">
                {isEdit ? 'Update Request' : 'Create Request'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default PurchaseRequestFormPage;
