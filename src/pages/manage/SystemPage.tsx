
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { systems, facilityLocations } from '@/data/sampleData';
import { System } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';

const SystemPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<System | null>(null);
  const [data, setData] = useState<System[]>(systems);

  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: System) => {
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
      id: 'systemNo',
      header: 'System No',
      accessorKey: 'systemNo',
    },
    {
      id: 'name',
      header: 'System Name',
      accessorKey: 'name',
    },
    {
      id: 'code',
      header: 'System Code',
      accessorKey: 'code',
    },
    {
      id: 'facilityLocation',
      header: 'Facility Location',
      accessorKey: 'facilityLocation',
    },
  ];

  const formSchema = z.object({
    systemNo: z.string().min(1, "System No is required"),
    name: z.string().min(1, "System Name is required"),
    code: z.string().min(1, "System Code is required"),
    facilityLocationId: z.string().min(1, "Facility Location is required"),
  });

  const facilityOptions = facilityLocations.map(facility => ({
    value: facility.id,
    label: facility.name
  }));

  const formFields = [
    { name: 'systemNo', label: 'System No', type: 'text' as const },
    { name: 'name', label: 'System Name', type: 'text' as const },
    { name: 'code', label: 'System Code', type: 'text' as const },
    { 
      name: 'facilityLocationId', 
      label: 'Facility Location', 
      type: 'select' as const,
      options: facilityOptions
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="System" 
        icon={<Database className="h-6 w-6" />}
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
                <h3 className="text-lg font-medium">System Details</h3>
                <p className="text-muted-foreground mt-2">
                  Select a system from the list view to see detailed information.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={isEditMode ? "Edit System" : "Add New System"}
        formSchema={formSchema}
        defaultValues={currentItem || { systemNo: "", name: "", code: "", facilityLocationId: "" }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default SystemPage;
