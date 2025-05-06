
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { assets } from '@/data/sampleData';
import AssetDetailsDrawer from '@/components/assets/AssetDetailsDrawer';

const AssetsPage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleRowClick = (row: any) => {
    setSelectedAsset(row);
    setIsDrawerOpen(true);
  };

  const columns: Column[] = [
    { id: 'assetNo', header: 'Asset ID', accessorKey: 'assetNo' },
    { id: 'name', header: 'Name', accessorKey: 'name' },
    { id: 'package', header: 'Package', accessorKey: 'package' },
    { id: 'system', header: 'System', accessorKey: 'system' },
    { id: 'facility', header: 'Facility', accessorKey: 'facility' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
    { id: 'criticalityCode', header: 'Criticality Code', accessorKey: 'criticalityCode' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assets" 
        subtitle="Manage your assets and equipment"
        icon={<Activity className="h-6 w-6" />}
        addNewLabel="+ Add Asset"
        onAddNew={() => console.log('Add new asset')}
        onSearch={(query) => console.log('Search:', query)}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={assets}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>

      <AssetDetailsDrawer 
        asset={selectedAsset}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};

export default AssetsPage;
