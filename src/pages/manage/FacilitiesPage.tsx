import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Plus, Filter } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { facilityLocations } from '@/data/sampleData';
import { FacilityLocation } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const FacilitiesPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<FacilityLocation | null>(null);
  const [data, setData] = useState<FacilityLocation[]>(facilityLocations);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<FacilityLocation[]>(facilityLocations);
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
  const handleDelete = (item: FacilityLocation) => {
    // In a real app, this would send a DELETE request to the API
    // Simulate a delay to show loading state
    setIsProcessing(true);
    setTimeout(() => {
      setData(data.filter(facility => facility.id !== item.id));
      setFilteredData(filteredData.filter(facility => facility.id !== item.id));
      toast.success("Facility deleted successfully");
      setIsProcessing(false);
    }, 500);
  };
  const handleSubmit = (values: any) => {
    // Simulate API call with loading state
    setIsProcessing(true);

    // Simulate network delay
    setTimeout(() => {
      if (isEditMode && currentItem) {
        // Update existing record
        const updatedData = data.map(item => item.id === currentItem.id ? {
          ...item,
          ...values
        } : item);
        setData(updatedData);
        setFilteredData(searchTerm ? updatedData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.toLowerCase().includes(searchTerm.toLowerCase())) : updatedData);
        toast.success("Facility updated successfully");
      } else {
        // Create new record
        const newItem = {
          id: String(data.length + 1),
          ...values
        };
        const newData = [...data, newItem];
        setData(newData);
        setFilteredData(searchTerm ? newData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.toLowerCase().includes(searchTerm.toLowerCase())) : newData);
        toast.success("Facility created successfully");
      }
      setIsProcessing(false);
      setIsDialogOpen(false);
    }, 700);
  };
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.code.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
    if (filtered.length === 0) {
      toast.info("No matching facilities found");
    }
  };
  const handleExport = () => {
    toast.success("Facilities exported successfully");
    // In a real app, this would generate and download a CSV file
  };
  const columns: Column[] = [{
    id: 'code',
    header: 'Facility Location Code',
    accessorKey: 'code'
  }, {
    id: 'name',
    header: 'Facility Location',
    accessorKey: 'name'
  }];
  const formSchema = z.object({
    code: z.string().min(1, "Facility Location Code is required"),
    name: z.string().min(1, "Facility Location is required")
  });
  const formFields = [{
    name: 'code',
    label: 'Facility Location Code',
    type: 'text' as const
  }, {
    name: 'name',
    label: 'Facility Location',
    type: 'text' as const
  }];
  return <div className="space-y-6">
      <PageHeader title="Facilities" icon={<Building className="h-6 w-6" />} onAddNew={handleAddNew} />
      
      <Card>
        <CardContent className="pt-6">
          
          
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="pt-4">
              <DataTable data={filteredData} columns={columns} onEdit={handleEdit} onDelete={handleDelete} onExport={handleExport} />
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

      <ManageDialog open={isDialogOpen} onOpenChange={open => {
      if (!isProcessing) setIsDialogOpen(open);
    }} title={isEditMode ? "Edit Facility" : "Add New Facility"} formSchema={formSchema} defaultValues={currentItem || {
      code: "",
      name: ""
    }} formFields={formFields} onSubmit={handleSubmit} isEdit={isEditMode} isProcessing={isProcessing} />
    </div>;
};
export default FacilitiesPage;