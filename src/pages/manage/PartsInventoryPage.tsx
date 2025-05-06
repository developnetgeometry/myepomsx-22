
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Archive } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { Column } from '@/components/shared/DataTable';

// Sample data for parts inventory
const partsInventoryData = [
  { id: '1', partNumber: 'P001', description: 'Bearing Assembly', quantity: 52, location: 'Warehouse A', condition: 'New' },
  { id: '2', partNumber: 'P002', description: 'Gasket Kit', quantity: 35, location: 'Warehouse B', condition: 'Used' },
  { id: '3', partNumber: 'P003', description: 'Motor Control Unit', quantity: 18, location: 'Warehouse A', condition: 'New' },
  { id: '4', partNumber: 'P004', description: 'Pump Shaft', quantity: 12, location: 'Warehouse C', condition: 'New' },
  { id: '5', partNumber: 'P005', description: 'Filter Element', quantity: 87, location: 'Warehouse B', condition: 'New' },
];

const PartsInventoryPage: React.FC = () => {
  const [data] = useState(partsInventoryData);
  const navigate = useNavigate();
  
  const handleRowClick = (row: any) => {
    navigate(`/manage/parts-inventory/${row.id}`);
  };
  
  const columns: Column[] = [
    {
      id: 'partNumber',
      header: 'Part Number',
      accessorKey: 'partNumber',
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
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
    },
    {
      id: 'condition',
      header: 'Condition',
      accessorKey: 'condition',
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Parts & Inventory" 
        icon={<Archive className="h-6 w-6" />}
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
