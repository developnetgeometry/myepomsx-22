
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Package, AlertTriangle, Warehouse, Plus, ArrowRight } from 'lucide-react';
import { inventory } from '@/data/sampleData';
import { Button } from '@/components/ui/button';
import KpiCard from '@/components/shared/KpiCard';
import { formatCurrency } from '@/utils/formatters';
import LowStockAlertModal from '@/components/inventory/LowStockAlertModal';

interface InventoryPageProps {
  hideHeader?: boolean;
  onRowClick?: (row: any) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ hideHeader = false, onRowClick }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLowStockModalOpen, setIsLowStockModalOpen] = useState(false);
  
  // Sample low stock items data
  const lowStockItems = [
    {
      id: '1',
      itemName: 'Control Valve',
      store: 'Main Warehouse',
      balance: 8,
      minLevel: 20,
      unitPrice: 350.00,
      totalPrice: 2800.00,
      averageMonthlyUsage: 5
    },
    {
      id: '2',
      itemName: 'Pressure Transmitter',
      store: 'Secondary Store',
      balance: 12,
      minLevel: 25,
      unitPrice: 275.50,
      totalPrice: 3306.00,
      averageMonthlyUsage: 6
    }
  ];
  
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
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            Request
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            Adjust
          </Button>
        </div>
      )
    }
  ];

  // Calculate inventory metrics
  const totalItems = 5; // Fixed value as per requirements
  const totalInventoryValue = 12372.50; // Fixed value as per requirements
  const lowStockItemsCount = 2; // Fixed value as per requirements
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

  // Handle open low stock modal
  const handleOpenLowStockModal = (item: any) => {
    setSelectedItem(item);
    setIsLowStockModalOpen(true);
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
          value={`${lowStockItemsCount} items low`}
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          className="relative"
        >
          <div className="mt-2 text-xs text-gray-500 space-y-1">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>{item.itemName}: {item.balance} units</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 p-0 text-blue-600 hover:text-blue-800"
                  onClick={() => handleOpenLowStockModal(item)}
                >
                  <span className="text-xs mr-1">Learn more</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            ))}
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

      {/* Low Stock Alert Modal */}
      <LowStockAlertModal
        isOpen={isLowStockModalOpen}
        onClose={() => setIsLowStockModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
};

export default InventoryPage;
