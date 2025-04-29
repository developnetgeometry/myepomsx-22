
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { facilityLocations } from '@/data/sampleData';
import { FacilityLocation } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';

const FacilitiesPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<FacilityLocation | null>(null);
  const [data, setData] = useState<FacilityLocation[]>(facilityLocations);

  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: FacilityLocation) => {
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
      id: 'code',
      header: 'Facility Location Code',
      accessorKey: 'code',
    },
    {
      id: 'name',
      header: 'Facility Location',
      accessorKey: 'name',
    },
  ];

  const formSchema = z.object({
    code: z.string().min(1, "Facility Location Code is required"),
    name: z.string().min(1, "Facility Location is required"),
  });

  const formFields = [
    { name: 'code', label: 'Facility Location Code', type: 'text' as const },
    { name: 'name', label: 'Facility Location', type: 'text' as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Facilities" 
        icon={<Building className="h-6 w-6" />}
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
                <h3 className="text-lg font-medium">Facility Details</h3>
                <p className="text-muted-foreground mt-2">
                  Select a facility from the list view to see detailed information.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={isEditMode ? "Edit Facility" : "Add New Facility"}
        formSchema={formSchema}
        defaultValues={currentItem || { code: "", name: "" }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default FacilitiesPage;
