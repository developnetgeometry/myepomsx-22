
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { packages, systems } from '@/data/sampleData';
import { Package as PackageType } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';

const PackagePage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<PackageType | null>(null);
  const [data, setData] = useState<PackageType[]>(packages);

  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: PackageType) => {
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
      id: 'packageNo',
      header: 'Package No',
      accessorKey: 'packageNo',
    },
    {
      id: 'name',
      header: 'Package Name',
      accessorKey: 'name',
    },
    {
      id: 'tag',
      header: 'Package Tag',
      accessorKey: 'tag',
    },
    {
      id: 'systemName',
      header: 'System Name',
      accessorKey: 'systemName',
    },
    {
      id: 'type',
      header: 'Package Type',
      accessorKey: 'type',
    },
  ];

  const formSchema = z.object({
    packageNo: z.string().min(1, "Package No is required"),
    name: z.string().min(1, "Package Name is required"),
    tag: z.string().min(1, "Package Tag is required"),
    systemId: z.string().min(1, "System is required"),
    type: z.string().min(1, "Package Type is required"),
  });

  const systemOptions = systems.map(system => ({
    value: system.id,
    label: system.name
  }));

  const packageTypeOptions = [
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Instrumentation', label: 'Instrumentation' },
    { value: 'Safety', label: 'Safety' },
    { value: 'Process', label: 'Process' },
  ];

  const formFields = [
    { name: 'packageNo', label: 'Package No', type: 'text' as const },
    { name: 'name', label: 'Package Name', type: 'text' as const },
    { name: 'tag', label: 'Package Tag', type: 'text' as const },
    { 
      name: 'systemId', 
      label: 'System', 
      type: 'select' as const,
      options: systemOptions
    },
    {
      name: 'type',
      label: 'Package Type',
      type: 'select' as const,
      options: packageTypeOptions
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Package" 
        icon={<Package className="h-6 w-6" />}
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
                <h3 className="text-lg font-medium">Package Details</h3>
                <p className="text-muted-foreground mt-2">
                  Select a package from the list view to see detailed information.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={isEditMode ? "Edit Package" : "Add New Package"}
        formSchema={formSchema}
        defaultValues={currentItem || { packageNo: "", name: "", tag: "", systemId: "", type: "" }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default PackagePage;
