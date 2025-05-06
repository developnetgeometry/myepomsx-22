
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Wrench } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { itemsMaster } from '@/data/sampleData';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

// Sample parts inventory data
const partsInventory = itemsMaster.map(item => ({
  id: item.id,
  partNo: `P-${item.itemsNo}`,
  partName: item.name,
  category: item.category,
  type: item.type,
  manufacturer: item.manufacturer,
  quantity: Math.floor(Math.random() * 100),
  location: ['Main Warehouse', 'Secondary Storage', 'Production Floor'][Math.floor(Math.random() * 3)]
}));

const PartsInventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [data] = useState(partsInventory);
  
  // Handle row click to navigate to details page
  const handleRowClick = (row: any) => {
    navigate(`/manage/parts-inventory/${row.id}`);
  };
  
  const columns: Column[] = [
    {
      id: 'partNo',
      header: 'Part No',
      accessorKey: 'partNo',
    },
    {
      id: 'partName',
      header: 'Part Name',
      accessorKey: 'partName',
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
    },
    {
      id: 'manufacturer',
      header: 'Manufacturer',
      accessorKey: 'manufacturer',
    },
    {
      id: 'quantity',
      header: 'Quantity',
      accessorKey: 'quantity',
    },
    {
      id: 'location',
      header: 'Location',
      accessorKey: 'location',
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Parts & Inventory" 
        icon={<Wrench className="h-6 w-6" />}
      />
      
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="pt-4">
              <DataTable 
                data={data} 
                columns={columns}
                onRowClick={handleRowClick}
              />
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="text-lg font-medium">Part Details</h3>
                <p className="text-muted-foreground mt-2">
                  Select a part from the list view to see detailed information.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartsInventoryPage;
