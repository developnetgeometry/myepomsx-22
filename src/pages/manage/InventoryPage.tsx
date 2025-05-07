
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { Column } from '@/components/shared/DataTable';
import TableFilters from '@/components/shared/TableFilters';
import { formatRM, formatDate, formatLinkedEntity } from '@/utils/tableFormatters';
import { itemsMaster } from '@/data/sampleData';

interface InventoryItem {
  id: string;
  itemNo: string;
  itemDescription?: string;
  location: string;
  availableQuantity: number;
  reservedQuantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  totalPrice: number;
  lastUpdated: string;
}

// Sample inventory data
const inventoryData: InventoryItem[] = Array(20).fill(0).map((_, i) => ({
  id: `INV-${1000 + i}`,
  itemNo: `ITEM-${100 + i}`,
  itemDescription: itemsMaster[i % itemsMaster.length]?.name || `Item ${i}`,
  location: ['Main Warehouse', 'Secondary Storage', 'Production Floor'][i % 3],
  availableQuantity: Math.floor(Math.random() * 100),
  reservedQuantity: Math.floor(Math.random() * 20),
  unitOfMeasure: ['EA', 'PCS', 'KG', 'L', 'M'][i % 5],
  unitPrice: Math.floor(Math.random() * 1000) + 10,
  totalPrice: Math.floor(Math.random() * 10000) + 100,
  lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
}));

interface InventoryPageProps {
  hideHeader?: boolean;
  onRowClick?: (row: InventoryItem) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ 
  hideHeader = false, 
  onRowClick: externalRowClick 
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Handle row click to navigate to details page
  const handleRowClick = (row: InventoryItem) => {
    if (externalRowClick) {
      externalRowClick(row);
    } else {
      navigate(`/manage/inventory/${row.id}`);
    }
  };
  
  // Handle add new inventory item
  const handleAddNew = () => {
    navigate('/manage/inventory/new');
  };
  
  const columns: Column[] = [
    {
      id: 'inventoryId',
      header: 'Inventory ID',
      accessorKey: 'id',
    },
    {
      id: 'itemNo',
      header: 'Item No',
      accessorKey: 'itemNo',
      cell: (value, row) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium">{value}</span>
            <span className="text-xs text-gray-500">{row.itemDescription}</span>
          </div>
        );
      },
    },
    {
      id: 'location',
      header: 'Location',
      accessorKey: 'location',
    },
    {
      id: 'availableQuantity',
      header: 'Available Quantity',
      accessorKey: 'availableQuantity',
    },
    {
      id: 'reservedQuantity',
      header: 'Reserved Quantity',
      accessorKey: 'reservedQuantity',
    },
    {
      id: 'unitOfMeasure',
      header: 'Unit of Measure',
      accessorKey: 'unitOfMeasure',
    },
    {
      id: 'unitPrice',
      header: 'Unit Price (RM)',
      accessorKey: 'unitPrice',
      cell: (value) => formatRM(value),
      isCurrency: true,
    },
    {
      id: 'totalPrice',
      header: 'Total Price (RM)',
      accessorKey: 'totalPrice',
      cell: (value) => formatRM(value),
      isCurrency: true,
    },
    {
      id: 'lastUpdated',
      header: 'Last Updated',
      accessorKey: 'lastUpdated',
      cell: (value) => formatDate(value),
    },
  ];

  const content = (
    <>
      {hideHeader ? null : (
        <Tabs defaultValue="list">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="pt-4">
            <DataTable 
              data={inventoryData} 
              columns={columns}
              onRowClick={handleRowClick}
              onAddNew={handleAddNew}
              searchPlaceholder="Search inventory..."
              title="Inventory Items"
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
      )}
      
      {hideHeader && (
        <DataTable 
          data={inventoryData} 
          columns={columns}
          onRowClick={handleRowClick}
          onAddNew={handleAddNew}
          searchPlaceholder="Search inventory..."
          title={hideHeader ? undefined : "Inventory Items"}
        />
      )}
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
