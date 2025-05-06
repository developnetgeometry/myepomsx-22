
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Layers, Plus } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { bomAssemblies, spareParts } from '@/data/sampleData';
import { BomAssembly, SparePart } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import TableFilters from '@/components/shared/TableFilters';
import { useLoadingState } from '@/hooks/use-loading-state';

const BomAssemblyPage: React.FC = () => {
  // Base states
  const [data, setData] = useState<BomAssembly[]>(bomAssemblies);
  const [sparePartsData, setSparePartsData] = useState<SparePart[]>(spareParts);
  const [selectedAssembly, setSelectedAssembly] = useState<string | null>(null);
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<BomAssembly | null>(null);
  
  // Spare parts dialog states
  const [isSparePartDialogOpen, setIsSparePartDialogOpen] = useState(false);
  const [isSparePartEditMode, setIsSparePartEditMode] = useState(false);
  const [currentSparePart, setCurrentSparePart] = useState<SparePart | null>(null);
  
  // Filter states
  const [filteredData, setFilteredData] = useState<BomAssembly[]>(bomAssemblies);
  const [filteredSpareParts, setFilteredSpareParts] = useState<SparePart[]>([]);
  
  // Loading states
  const { isLoading: isAssemblyProcessing, withLoading: withAssemblyLoading } = useLoadingState();
  const { isLoading: isSparePartProcessing, withLoading: withSparePartLoading } = useLoadingState();
  
  // Assembly handlers
  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: BomAssembly) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (item: BomAssembly) => {
    withAssemblyLoading(async () => {
      // In real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove assembly and its spare parts
      setData(data.filter(assembly => assembly.id !== item.id));
      setFilteredData(filteredData.filter(assembly => assembly.id !== item.id));
      setSparePartsData(sparePartsData.filter(part => part.bomAssemblyId !== item.id));
      
      // Deselect if the selected assembly was deleted
      if (selectedAssembly === item.id) {
        setSelectedAssembly(null);
        setFilteredSpareParts([]);
      }
      
      toast.success("BOM Assembly deleted successfully");
    });
  };

  const handleSubmit = (values: any) => {
    withAssemblyLoading(async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      if (isEditMode && currentItem) {
        // Update existing assembly
        const updatedData = data.map(item => 
          item.id === currentItem.id ? { ...item, ...values } : item
        );
        setData(updatedData);
        setFilteredData(updatedData);
        toast.success("BOM Assembly updated successfully");
      } else {
        // Create new assembly
        const newItem = { id: String(data.length + 1), ...values };
        const newData = [...data, newItem];
        setData(newData);
        setFilteredData(newData);
        toast.success("BOM Assembly created successfully");
      }
      
      setIsDialogOpen(false);
    });
  };

  // Spare part handlers
  const handleAddNewSparePart = () => {
    if (!selectedAssembly) return;
    
    setIsSparePartEditMode(false);
    setCurrentSparePart(null);
    setIsSparePartDialogOpen(true);
  };

  const handleEditSparePart = (item: SparePart) => {
    setIsSparePartEditMode(true);
    setCurrentSparePart(item);
    setIsSparePartDialogOpen(true);
  };

  const handleDeleteSparePart = (item: SparePart) => {
    withSparePartLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedSpareParts = sparePartsData.filter(part => part.id !== item.id);
      setSparePartsData(updatedSpareParts);
      setFilteredSpareParts(updatedSpareParts.filter(
        part => part.bomAssemblyId === selectedAssembly
      ));
      
      toast.success("Spare part deleted successfully");
    });
  };

  const handleSubmitSparePart = (values: any) => {
    withSparePartLoading(async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      if (isSparePartEditMode && currentSparePart) {
        // Update existing spare part
        const updatedSpareParts = sparePartsData.map(item => 
          item.id === currentSparePart.id ? { ...item, ...values } : item
        );
        setSparePartsData(updatedSpareParts);
        setFilteredSpareParts(updatedSpareParts.filter(
          part => part.bomAssemblyId === selectedAssembly
        ));
        toast.success("Spare part updated successfully");
      } else if (selectedAssembly) {
        // Create new spare part
        const newItem = { 
          id: String(sparePartsData.length + 1), 
          bomAssemblyId: selectedAssembly, 
          ...values 
        };
        const updatedSpareParts = [...sparePartsData, newItem];
        setSparePartsData(updatedSpareParts);
        setFilteredSpareParts(updatedSpareParts.filter(
          part => part.bomAssemblyId === selectedAssembly
        ));
        toast.success("Spare part added successfully");
      }
      
      setIsSparePartDialogOpen(false);
    });
  };

  // Search handlers
  const handleAssemblySearch = (query: string) => {
    if (!query) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.code.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSparePartSearch = (query: string) => {
    if (!selectedAssembly) return;
    
    const baseSpareParts = sparePartsData.filter(
      part => part.bomAssemblyId === selectedAssembly
    );
    
    if (!query) {
      setFilteredSpareParts(baseSpareParts);
      return;
    }
    
    const filtered = baseSpareParts.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSpareParts(filtered);
  };

  // Row selection handler
  const handleAssemblySelect = (item: BomAssembly) => {
    setSelectedAssembly(item.id);
    
    // Update the filtered spare parts
    const relatedSpareParts = sparePartsData.filter(
      part => part.bomAssemblyId === item.id
    );
    setFilteredSpareParts(relatedSpareParts);
    
    toast.info(`Selected: ${item.name}`);
  };

  // Define column configurations
  const columns: Column[] = [
    {
      id: 'code',
      header: 'BOM Assembly Code',
      accessorKey: 'code',
    },
    {
      id: 'name',
      header: 'BOM Assembly Name',
      accessorKey: 'name',
    },
  ];

  const sparePartColumns: Column[] = [
    {
      id: 'name',
      header: 'Spare Parts',
      accessorKey: 'name',
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
    },
  ];

  // Form schemas
  const formSchema = z.object({
    code: z.string().min(1, "BOM Assembly Code is required"),
    name: z.string().min(1, "BOM Assembly Name is required"),
  });

  const sparePartFormSchema = z.object({
    name: z.string().min(1, "Spare Part Name is required"),
    description: z.string().min(1, "Description is required"),
  });

  // Form field definitions
  const formFields = [
    { name: 'code', label: 'BOM Assembly Code', type: 'text' as const },
    { name: 'name', label: 'BOM Assembly Name', type: 'text' as const },
  ];

  const sparePartFormFields = [
    { name: 'name', label: 'Spare Part Name', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'text' as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="BOM Assembly" 
        icon={<Layers className="h-6 w-6" />}
        onAddNew={handleAddNew}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">BOM Assemblies</h3>
            </div>
            
            <TableFilters 
              onSearch={handleAssemblySearch}
              onAddNew={handleAddNew}
              addNewLabel="Add Assembly"
              placeholder="Search assemblies..."
            />
            
            <DataTable 
              data={filteredData} 
              columns={columns} 
              onEdit={handleEdit}
              onDelete={handleDelete}
              pageSize={5}
              onRowClick={handleAssemblySelect}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Spare Parts</h3>
              <Button
                onClick={handleAddNewSparePart}
                disabled={!selectedAssembly}
                className="flex gap-2 items-center"
              >
                <Plus className="h-4 w-4" /> Add Spare Part
              </Button>
            </div>
            
            {selectedAssembly && (
              <TableFilters 
                onSearch={handleSparePartSearch}
                placeholder="Search spare parts..."
              />
            )}
            
            {selectedAssembly ? (
              <DataTable 
                data={filteredSpareParts} 
                columns={sparePartColumns} 
                onEdit={handleEditSparePart}
                onDelete={handleDeleteSparePart}
                pageSize={5}
              />
            ) : (
              <div className="p-4 border rounded-md bg-muted/50 text-center">
                <p className="text-muted-foreground">
                  Select a BOM Assembly to view associated spare parts
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!isAssemblyProcessing) setIsDialogOpen(open);
        }}
        title={isEditMode ? "Edit BOM Assembly" : "Add New BOM Assembly"}
        formSchema={formSchema}
        defaultValues={currentItem || { code: "", name: "" }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
        isProcessing={isAssemblyProcessing}
      />

      <ManageDialog
        open={isSparePartDialogOpen}
        onOpenChange={(open) => {
          if (!isSparePartProcessing) setIsSparePartDialogOpen(open);
        }}
        title={isSparePartEditMode ? "Edit Spare Part" : "Add New Spare Part"}
        formSchema={sparePartFormSchema}
        defaultValues={currentSparePart || { name: "", description: "" }}
        formFields={sparePartFormFields}
        onSubmit={handleSubmitSparePart}
        isEdit={isSparePartEditMode}
        isProcessing={isSparePartProcessing}
      />
    </div>
  );
};

export default BomAssemblyPage;
