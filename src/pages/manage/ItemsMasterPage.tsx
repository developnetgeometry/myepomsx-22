
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { itemsMaster } from '@/data/sampleData';
import { ItemsMaster } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';
import { toast } from 'sonner';

interface ItemsMasterPageProps {
  hideHeader?: boolean;
  onRowClick?: (row: ItemsMaster) => void;
}

const ItemsMasterPage: React.FC<ItemsMasterPageProps> = ({ hideHeader = false, onRowClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<ItemsMaster | null>(null);
  const [data, setData] = useState<ItemsMaster[]>(itemsMaster);
  const navigate = useNavigate();

  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: ItemsMaster) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleRowClick = (row: ItemsMaster) => {
    if (onRowClick) {
      onRowClick(row);
    } else {
      navigate(`/manage/items-master/${row.id}`);
    }
  };
  
  // Define the handleSubmit function that was missing
  const handleSubmit = (values: any) => {
    if (isEditMode && currentItem) {
      // Update existing item
      const updatedData = data.map(item => 
        item.id === currentItem.id ? { ...item, ...values } : item
      );
      setData(updatedData);
      toast.success("Item updated successfully");
    } else {
      // Add new item
      const newItem = {
        id: `item-${Date.now()}`,
        ...values
      };
      setData([...data, newItem]);
      toast.success("New item added successfully");
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    {
      id: 'itemsNo',
      header: 'Items No',
      accessorKey: 'itemsNo',
    },
    {
      id: 'name',
      header: 'Item Name',
      accessorKey: 'name',
    },
    {
      id: 'manufacturerPartsNo',
      header: 'Manufacturer Parts No',
      accessorKey: 'manufacturerPartsNo',
    },
    {
      id: 'manufacturer',
      header: 'Manufacturer',
      accessorKey: 'manufacturer',
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
    },
  ];

  const formSchema = z.object({
    itemsNo: z.string().min(1, "Items No is required"),
    name: z.string().min(1, "Item Name is required"),
    manufacturerPartsNo: z.string().min(1, "Manufacturer Parts No is required"),
    manufacturer: z.string().min(1, "Manufacturer is required"),
    type: z.string().min(1, "Type is required"),
    category: z.string().min(1, "Category is required"),
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

  const formFields = [
    { name: 'itemsNo', label: 'Items No', type: 'text' as const },
    { name: 'name', label: 'Item Name', type: 'text' as const },
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
    }
  ];

  const content = (
    <>
      {hideHeader ? (
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddNew}
            className="text-sm text-blue-500 hover:underline"
          >
            + Add New Item
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
              <h3 className="text-lg font-medium">Item Details</h3>
              <p className="text-muted-foreground mt-2">
                Select an item from the list view to see detailed information.
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
        title={isEditMode ? "Edit Item" : "Add New Item"}
        formSchema={formSchema}
        defaultValues={currentItem || { 
          itemsNo: "", 
          name: "", 
          manufacturerPartsNo: "", 
          manufacturer: "", 
          type: "", 
          category: "" 
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
        title="Items Master" 
        icon={<List className="h-6 w-6" />}
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

export default ItemsMasterPage;
