
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Archive } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { assets, packages, systems, facilityLocations } from '@/data/sampleData';
import { Asset } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';
import StatusBadge from '@/components/shared/StatusBadge';

const AssetsPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<Asset | null>(null);
  const [data, setData] = useState<Asset[]>(assets);

  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Asset) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleSubmit = (values: any) => {
    if (isEditMode && currentItem) {
      setData(data.map(item => item.id === currentItem.id ? { ...item, ...values } : item));
    } else {
      setData([...data, { id: String(data.length + 1), ...values }]);
    }
  };

  const columns: Column[] = [
    {
      id: 'assetNo',
      header: 'Asset No',
      accessorKey: 'assetNo',
    },
    {
      id: 'name',
      header: 'Asset Name',
      accessorKey: 'name',
    },
    {
      id: 'package',
      header: 'Package',
      accessorKey: 'package',
    },
    {
      id: 'system',
      header: 'System',
      accessorKey: 'system',
    },
    {
      id: 'facility',
      header: 'Facility',
      accessorKey: 'facility',
    },
    {
      id: 'assetTag',
      header: 'Asset Tag',
      accessorKey: 'assetTag',
    },
    {
      id: 'model',
      header: 'Model',
      accessorKey: 'model',
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
    {
      id: 'sceCode',
      header: 'SCE Code',
      accessorKey: 'sceCode',
    },
    {
      id: 'criticalityCode',
      header: 'Criticality Code',
      accessorKey: 'criticalityCode',
    },
  ];

  const formSchema = z.object({
    assetNo: z.string().min(1, "Asset No is required"),
    name: z.string().min(1, "Asset Name is required"),
    packageId: z.string().min(1, "Package is required"),
    systemId: z.string().min(1, "System is required"),
    facilityId: z.string().min(1, "Facility is required"),
    assetTag: z.string().min(1, "Asset Tag is required"),
    model: z.string().min(1, "Model is required"),
    status: z.string().min(1, "Status is required"),
    sceCode: z.string().min(1, "SCE Code is required"),
    criticalityCode: z.string().min(1, "Criticality Code is required"),
  });

  const packageOptions = packages.map(pkg => ({
    value: pkg.id,
    label: pkg.name
  }));

  const systemOptions = systems.map(system => ({
    value: system.id,
    label: system.name
  }));

  const facilityOptions = facilityLocations.map(facility => ({
    value: facility.id,
    label: facility.name
  }));

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Decommissioned', label: 'Decommissioned' },
  ];

  const criticalityOptions = [
    { value: 'A', label: 'A - Critical' },
    { value: 'B', label: 'B - Important' },
    { value: 'C', label: 'C - Standard' },
  ];

  const formFields = [
    { name: 'assetNo', label: 'Asset No', type: 'text' as const },
    { name: 'name', label: 'Asset Name', type: 'text' as const },
    { 
      name: 'packageId', 
      label: 'Package', 
      type: 'select' as const,
      options: packageOptions
    },
    { 
      name: 'systemId', 
      label: 'System', 
      type: 'select' as const,
      options: systemOptions
    },
    { 
      name: 'facilityId', 
      label: 'Facility', 
      type: 'select' as const,
      options: facilityOptions
    },
    { name: 'assetTag', label: 'Asset Tag', type: 'text' as const },
    { name: 'model', label: 'Model', type: 'text' as const },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      options: statusOptions
    },
    { name: 'sceCode', label: 'SCE Code', type: 'text' as const },
    {
      name: 'criticalityCode',
      label: 'Criticality Code',
      type: 'select' as const,
      options: criticalityOptions
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assets" 
        icon={<Archive className="h-6 w-6" />}
        onAddNew={handleAddNew}
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
                onEdit={handleEdit} 
              />
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <h3 className="text-lg font-medium">Asset Details</h3>
                <p className="text-muted-foreground mt-2">
                  Select an asset from the list view to see detailed information.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={isEditMode ? "Edit Asset" : "Add New Asset"}
        formSchema={formSchema}
        defaultValues={currentItem || { 
          assetNo: "", 
          name: "", 
          packageId: "", 
          systemId: "", 
          facilityId: "", 
          assetTag: "", 
          model: "", 
          status: "Active", 
          sceCode: "", 
          criticalityCode: "" 
        }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default AssetsPage;
