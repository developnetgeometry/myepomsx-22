
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Package } from 'lucide-react';
import { inventory } from '@/data/sampleData';

const InventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample columns for inventory items
  const columns: Column[] = [
    { id: 'id', header: 'ID', accessorKey: 'id' },
    { id: 'itemName', header: 'Item Name', accessorKey: 'itemName' },
    { id: 'store', header: 'Store', accessorKey: 'store' },
    { 
      id: 'balance', 
      header: 'Balance', 
      accessorKey: 'balance',
      cell: (value) => (
        <span className="font-medium">{value}</span>
      ) 
    },
    { 
      id: 'unitPrice', 
      header: 'Unit Price', 
      accessorKey: 'unitPrice',
      cell: (value) => (
        <span>${value.toFixed(2)}</span>
      ) 
    },
    { 
      id: 'totalPrice', 
      header: 'Total Price', 
      accessorKey: 'totalPrice',
      cell: (value) => (
        <span>${value.toFixed(2)}</span>
      ) 
    },
  ];

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle view details
  const handleView = (row: any) => {
    navigate(`/manage/inventory/${row.id}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory Management"
        subtitle="Manage spare parts inventory"
        icon={<Package className="h-6 w-6" />}
        onSearch={handleSearch}
        onAddNew={() => navigate('/manage/inventory/new')}
        addNewLabel="+ Add New Item"
      />
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={inventory}
            onView={handleView}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
