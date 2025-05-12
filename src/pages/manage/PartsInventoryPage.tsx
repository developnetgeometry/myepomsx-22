
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { itemsMaster } from '@/data/sampleData';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';

// Sample parts inventory data with unit prices
const partsInventory = itemsMaster.map(item => ({
  id: item.id,
  partNo: `P-${item.itemsNo}`,
  partName: item.name,
  category: item.category,
  type: item.type,
  manufacturer: item.manufacturer,
  quantity: Math.floor(Math.random() * 100),
  unitPrice: Math.floor(Math.random() * 1000) + 50,
  totalValue: 0, // Will be calculated below
  location: ['Main Warehouse', 'Secondary Storage', 'Production Floor'][Math.floor(Math.random() * 3)]
})).map(item => ({
  ...item,
  totalValue: item.quantity * item.unitPrice // Calculate total value
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
      id: 'unitPrice',
      header: 'Unit Price',
      accessorKey: 'unitPrice',
    },
    {
      id: 'totalValue',
      header: 'Total Value',
      accessorKey: 'totalValue',
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
          <DataTable 
            data={data} 
            columns={columns}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PartsInventoryPage;
