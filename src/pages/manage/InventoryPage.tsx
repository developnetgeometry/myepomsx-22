
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { inventory } from '@/data/sampleData';
import { Inventory } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';

interface InventoryPageProps {
  hideHeader?: boolean;
  onRowClick?: (row: Inventory) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ hideHeader = false, onRowClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<Inventory | null>(null);
  const [data, setData] = useState<Inventory[]>(inventory);
  const navigate = useNavigate();

  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Inventory) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setIsDialogOpen(true);
  };
  
  const handleRowClick = (row: Inventory) => {
    if (onRowClick) {
      onRowClick(row);
    } else {
      // Navigate to the inventory item detail page
      navigate(`/manage/inventory/${row.id}`);
    }
  };

  const handleSubmit = (values: any) => {
    if (isEditMode && currentItem) {
      setData(data.map(item => item.id === currentItem.id ? { ...item, ...values } : item));
    } else {
      // Calculate total price
      const totalPrice = values.unitPrice * values.balance;
      setData([...data, { id: String(data.length + 1), ...values, totalPrice }]);
    }
  };

  const columns: Column[] = [
    {
      id: 'store',
      header: 'Store',
      accessorKey: 'store',
    },
    {
      id: 'rackNo',
      header: 'Rack No',
      accessorKey: 'rackNo',
    },
    {
      id: 'itemsNo',
      header: 'Items No',
      accessorKey: 'itemsNo',
    },
    {
      id: 'itemName',
      header: 'Item Name',
      accessorKey: 'itemName',
    },
    {
      id: 'manufacturerPartsNo',
      header: 'Manufacturer Parts No',
      accessorKey: 'manufacturerPartsNo',
    },
    {
      id: 'balance',
      header: 'Balance',
      accessorKey: 'balance',
    },
    {
      id: 'unitPrice',
      header: 'Unit Price',
      accessorKey: 'unitPrice',
      cell: (value) => `$${value.toFixed(2)}`,
    },
    {
      id: 'totalPrice',
      header: 'Total Price',
      accessorKey: 'totalPrice',
      cell: (value) => `$${value.toFixed(2)}`,
    },
  ];

  const formSchema = z.object({
    store: z.string().min(1, "Store is required"),
    rackNo: z.string().min(1, "Rack No is required"),
    itemsNo: z.string().min(1, "Items No is required"),
    itemName: z.string().min(1, "Item Name is required"),
    manufacturerPartsNo: z.string().min(1, "Manufacturer Parts No is required"),
    manufacturer: z.string().min(1, "Manufacturer is required"),
    type: z.string().min(1, "Type is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
    minLevel: z.number().min(0, "Min Level must be at least 0"),
    maxLevel: z.number().min(1, "Max Level must be at least 1"),
    reorderLevel: z.number().min(0, "Reorder Level must be at least 0"),
    balance: z.number().min(0, "Balance must be at least 0"),
    unitPrice: z.number().min(0, "Unit Price must be at least 0"),
  });

  const typeOptions = [
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Instrumentation', label: 'Instrumentation' },
    { value: 'Safety', label: 'Safety' },
    { value: 'Process', label: 'Process' },
  ];

  const categoryOptions = [
    { value: 'Rotating Equipment', label: 'Rotating Equipment' },
    { value: 'Sealing', label: 'Sealing' },
    { value: 'Protection', label: 'Protection' },
    { value: 'Measurement', label: 'Measurement' },
    { value: 'Flow Control', label: 'Flow Control' },
  ];

  const storeOptions = [
    { value: 'Main Warehouse', label: 'Main Warehouse' },
    { value: 'Electrical Store', label: 'Electrical Store' },
    { value: 'Instrument Store', label: 'Instrument Store' },
  ];

  const formFields = [
    { 
      name: 'store', 
      label: 'Store', 
      type: 'select' as const,
      options: storeOptions
    },
    { name: 'rackNo', label: 'Rack No', type: 'text' as const },
    { name: 'itemsNo', label: 'Items No', type: 'text' as const },
    { name: 'itemName', label: 'Item Name', type: 'text' as const },
    { name: 'manufacturerPartsNo', label: 'Manufacturer Parts No', type: 'text' as const },
    { name: 'manufacturer', label: 'Manufacturer', type: 'text' as const },
    { 
      name: 'type', 
      label: 'Type', 
      type: 'select' as const,
      options: typeOptions
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      options: categoryOptions
    },
    { name: 'description', label: 'Item Description', type: 'text' as const },
    { name: 'minLevel', label: 'Min Level', type: 'number' as const },
    { name: 'maxLevel', label: 'Max Level', type: 'number' as const },
    { name: 'reorderLevel', label: 'Reorder Level', type: 'number' as const },
    { name: 'balance', label: 'Balance', type: 'number' as const },
    { name: 'unitPrice', label: 'Unit Price', type: 'number' as const },
  ];

  const content = (
    <>
      {hideHeader ? (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddNew}
            className="text-sm text-blue-500 hover:underline"
          >
            + Add New Inventory Item
          </button>
        </div>
      ) : null}
      
      {!hideHeader ? (
        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="pt-4">
            <DataTable 
              data={data} 
              columns={columns} 
              onEdit={handleEdit}
              onRowClick={handleRowClick}
            />
          </TabsContent>
          <TabsContent value="details" className="pt-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="text-lg font-medium">Inventory Details</h3>
              <p className="text-muted-foreground mt-2">
                Select an inventory item from the list view to see detailed information.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <DataTable 
          data={data} 
          columns={columns} 
          onEdit={handleEdit}
          onRowClick={handleRowClick}
        />
      )}

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={isEditMode ? "Edit Inventory Item" : "Add New Inventory Item"}
        formSchema={formSchema}
        defaultValues={currentItem || { 
          store: "", 
          rackNo: "", 
          itemsNo: "", 
          itemName: "", 
          manufacturerPartsNo: "", 
          manufacturer: "", 
          type: "", 
          category: "",
          description: "",
          minLevel: 0,
          maxLevel: 0,
          reorderLevel: 0,
          balance: 0,
          unitPrice: 0
        }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />
    </>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory" 
        icon={<Package className="h-6 w-6" />}
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="pt-6">
          {content}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
