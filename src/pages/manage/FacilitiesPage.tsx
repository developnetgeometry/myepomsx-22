
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useLoadingState } from '@/hooks/use-loading-state';

const FacilitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<FacilityLocation | null>(null);
  const [data, setData] = useState<FacilityLocation[]>(facilityLocations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<FacilityLocation[]>(facilityLocations);
  
  const { isLoading: isProcessing, withLoading } = useLoadingState();

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
    withLoading(async () => {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData(data.filter(facility => facility.id !== item.id));
      setFilteredData(filteredData.filter(facility => facility.id !== item.id));
      toast.success("Facility deleted successfully");
    });
  };

  const handleRowClick = (row: FacilityLocation) => {
    navigate(`/manage/facilities/${row.id}`);
  };

  const handleSubmit = (values: any) => {
    withLoading(async () => {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 700));

      if (isEditMode && currentItem) {
        // Update existing record
        const updatedData = data.map(item => item.id === currentItem.id ? {
          ...item,
          ...values
        } : item);
        setData(updatedData);
        setFilteredData(searchTerm ? updatedData.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.code.toLowerCase().includes(searchTerm.toLowerCase())
        ) : updatedData);
        toast.success("Facility updated successfully");
      } else {
        // Create new record
        const newItem = {
          id: String(data.length + 1),
          ...values
        };
        const newData = [...data, newItem];
        setData(newData);
        setFilteredData(searchTerm ? newData.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.code.toLowerCase().includes(searchTerm.toLowerCase())
        ) : newData);
        toast.success("Facility created successfully");
      }
      
      setIsDialogOpen(false);
    });
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
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
          <div className="flex items-center mb-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Search facilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </div>
          </div>
          
          <DataTable 
            data={filteredData} 
            columns={columns} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onExport={handleExport}
            onRowClick={handleRowClick} 
          />
        </CardContent>
      </Card>

      <ManageDialog 
        open={isDialogOpen} 
        onOpenChange={open => {
          if (!isProcessing) setIsDialogOpen(open);
        }} 
        title={isEditMode ? "Edit Facility" : "Add New Facility"} 
        formSchema={formSchema} 
        defaultValues={currentItem || {
          code: "",
          name: ""
        }} 
        formFields={formFields} 
        onSubmit={handleSubmit} 
        isEdit={isEditMode} 
        isProcessing={isProcessing} 
      />
    </div>;
};

export default FacilitiesPage;
