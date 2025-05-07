
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package, Save } from 'lucide-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { itemsMaster } from '@/data/sampleData';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  itemNo: z.string().min(1, "Item No is required"),
  location: z.string().min(1, "Location is required"),
  availableQuantity: z.coerce.number().min(0, "Quantity must be a positive number"),
  reservedQuantity: z.coerce.number().min(0, "Quantity must be a positive number"),
  unitOfMeasure: z.string().min(1, "Unit of measure is required"),
  unitPrice: z.coerce.number().min(0, "Unit price must be a positive number"),
});

const InventoryNewPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Prepare form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemNo: "",
      location: "",
      availableQuantity: 0,
      reservedQuantity: 0,
      unitOfMeasure: "",
      unitPrice: 0,
    },
  });
  
  // Get the item description based on selected item number
  const selectedItemNo = form.watch("itemNo");
  const selectedItem = itemsMaster.find(item => item.itemsNo === selectedItemNo);
  const itemDescription = selectedItem?.name || "";
  const totalPrice = (form.watch("availableQuantity") || 0) * (form.watch("unitPrice") || 0);
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate total price
      const calculatedTotalPrice = values.availableQuantity * values.unitPrice;
      
      // Create a new inventory item
      const newItem = {
        id: `INV-${Math.floor(Math.random() * 10000)}`,
        ...values,
        itemDescription,
        totalPrice: calculatedTotalPrice,
        lastUpdated: new Date().toISOString(),
      };
      
      console.log("New inventory item:", newItem);
      
      toast.success("Inventory item created successfully");
      navigate(`/manage/inventory/${newItem.id}`);
    } catch (error) {
      toast.error("Failed to create inventory item");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Add New Inventory Item" icon={<Package className="h-6 w-6" />} />
        <Button variant="outline" onClick={() => navigate('/manage/inventory')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader className="bg-blue-500 text-white p-4">
              <CardTitle className="text-lg">Inventory Item Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Item Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="itemNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item No <span className="text-destructive">*</span></FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {itemsMaster.map(item => (
                            <SelectItem key={item.id} value={item.itemsNo}>
                              {item.itemsNo} - {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {itemDescription && (
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Item Description</label>
                    <Input value={itemDescription} readOnly className="bg-gray-50" />
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* Inventory Details Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Inventory Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location <span className="text-destructive">*</span></FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Main Warehouse">Main Warehouse</SelectItem>
                            <SelectItem value="Secondary Storage">Secondary Storage</SelectItem>
                            <SelectItem value="Production Floor">Production Floor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="unitOfMeasure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit of Measure <span className="text-destructive">*</span></FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EA">Each (EA)</SelectItem>
                            <SelectItem value="PCS">Pieces (PCS)</SelectItem>
                            <SelectItem value="KG">Kilograms (KG)</SelectItem>
                            <SelectItem value="L">Liters (L)</SelectItem>
                            <SelectItem value="M">Meters (M)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="availableQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Quantity <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reservedQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reserved Quantity <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Pricing Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Pricing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="unitPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit Price (RM) <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Total Price (RM)</label>
                    <Input 
                      value={`RM ${totalPrice.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
                      readOnly 
                      className="bg-gray-50" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/manage/inventory')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Save Inventory Item
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default InventoryNewPage;
