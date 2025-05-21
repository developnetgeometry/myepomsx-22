
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Package, AlertTriangle, Warehouse, Plus } from 'lucide-react';
import { inventory } from '@/data/sampleData';
import { Button } from '@/components/ui/button';
import KpiCard from '@/components/shared/KpiCard';

interface InventoryPageProps {
  hideHeader?: boolean;
  onRowClick?: (row: any) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ hideHeader = false, onRowClick }) => {
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
        <span>RM {value.toFixed(2)}</span>
      ) 
    },
    { 
      id: 'totalPrice', 
      header: 'Total Price', 
      accessorKey: 'totalPrice',
      cell: (value) => (
        <span>RM {value.toFixed(2)}</span>
      ) 
    },
    { 
      id: 'actions', 
      header: 'Actions', 
      accessorKey: 'id',
      cell: (value) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 border-blue-500 text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              // Handle request action
              console.log('Request for item', value);
            }}
          >
            Request
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 border-purple-500 text-purple-500"
            onClick={(e) => {
              e.stopPropagation();
              // Handle adjust action
              console.log('Adjust item', value);
            }}
          >
            Adjust
          </Button>
        </div>
      ) 
    },
  ];

  // Calculate inventory metrics
  const totalItems = 5; // Fixed value as per requirements
  const totalInventoryValue = 12372.50; // Fixed value as per requirements
  const lowStockItems = 2; // Fixed value as per requirements
  const totalStores = 3; // Fixed value as per requirements

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle row click
  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    } else {
      navigate(`/manage/inventory/${row.id}`);
    }
  };

  // Handle create PO click
  const handleCreatePO = () => {
    navigate('/manage/inventory/create-po');
  };

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <PageHeader
          title="Inventory Management"
          subtitle="Manage spare parts inventory"
          icon={<Package className="h-6 w-6" />}
          onSearch={handleSearch}
          addNewLabel="+ Add New Item"
          onAddNew={() => navigate('/manage/inventory/new')}
          actions={
            <Button onClick={handleCreatePO} className="gap-2">
              <Plus className="h-4 w-4" /> PO
            </Button>
          }
        />
      )}
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Items"
          value={totalItems}
          icon={<Package className="h-5 w-5" />}
          changeLabel="Listed spare parts"
        />

        <KpiCard
          title="Total Inventory Value"
          value={`RM ${totalInventoryValue.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<Package className="h-5 w-5" />}
          changeLabel="Sum of all items"
        />

        <KpiCard
          title="Low Stock Alerts"
          value={`${lowStockItems} items low`}
          icon={<AlertTriangle className="h-5 w-5" />}
          className="relative"
        >
          <div className="mt-2 text-xs text-gray-500">
            <div>Control Valve: 8 units</div>
            <div>Pressure Transmitter: 12 units</div>
          </div>
        </KpiCard>

        <KpiCard
          title="Stores"
          value={`${totalStores} Stores`}
          icon={<Warehouse className="h-5 w-5" />}
          className="relative"
        >
          <div className="mt-2 text-xs text-gray-500">
            <div>Main Warehouse</div>
            <div>Secondary Store</div>
            <div>Instrumentation Store</div>
          </div>
        </KpiCard>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={inventory}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
