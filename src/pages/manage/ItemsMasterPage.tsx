
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Database } from 'lucide-react';
import { itemsMaster } from '@/data/sampleData';

interface ItemsMasterPageProps {
  hideHeader?: boolean;
  onRowClick?: (row: any) => void;
}

const ItemsMasterPage: React.FC<ItemsMasterPageProps> = ({ hideHeader = false, onRowClick }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Define columns for items master table
  const columns: Column[] = [
    { id: 'itemsNo', header: 'Item No', accessorKey: 'itemsNo' },
    { id: 'name', header: 'Item Name', accessorKey: 'name' },
    { id: 'category', header: 'Category', accessorKey: 'category' },
    { id: 'type', header: 'Type', accessorKey: 'type' },
    { id: 'manufacturer', header: 'Manufacturer', accessorKey: 'manufacturer' },
    { id: 'supplier', header: 'Supplier', accessorKey: 'supplier' },
    { id: 'uom', header: 'UOM', accessorKey: 'uom' },
    { 
      id: 'price', 
      header: 'Price', 
      accessorKey: 'price',
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
  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    } else {
      navigate(`/manage/items-master/${row.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <PageHeader
          title="Items Master"
          subtitle="Manage inventory items master data"
          icon={<Database className="h-6 w-6" />}
          onSearch={handleSearch}
          onAddNew={() => navigate('/manage/items-master/new')}
          addNewLabel="+ Add New Item"
        />
      )}
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={itemsMaster}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemsMasterPage;
