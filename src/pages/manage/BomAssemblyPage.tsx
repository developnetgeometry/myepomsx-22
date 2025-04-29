
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { bomAssemblies, spareParts } from '@/data/sampleData';
import { BomAssembly, SparePart } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';

const BomAssemblyPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<BomAssembly | null>(null);
  const [data, setData] = useState<BomAssembly[]>(bomAssemblies);
  const [selectedAssembly, setSelectedAssembly] = useState<string | null>(null);
  const [sparePartsData, setSparePartsData] = useState<SparePart[]>(spareParts);
  
  const [isSparePartDialogOpen, setIsSparePartDialogOpen] = useState(false);
  const [isSparePartEditMode, setIsSparePartEditMode] = useState(false);
  const [currentSparePart, setCurrentSparePart] = useState<SparePart | null>(null);

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

  const handleSubmit = (values: any) => {
    if (isEditMode && currentItem) {
      setData(data.map(item => item.id === currentItem.id ? { ...item, ...values } : item));
    } else {
      setData([...data, { id: String(data.length + 1), ...values }]);
    }
  };

  const handleAssemblySelect = (item: BomAssembly) => {
    setSelectedAssembly(item.id);
  };

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

  const handleSubmitSparePart = (values: any) => {
    if (isSparePartEditMode && currentSparePart) {
      setSparePartsData(sparePartsData.map(item => 
        item.id === currentSparePart.id ? { ...item, ...values } : item
      ));
    } else if (selectedAssembly) {
      setSparePartsData([
        ...sparePartsData, 
        { id: String(sparePartsData.length + 1), bomAssemblyId: selectedAssembly, ...values }
      ]);
    }
  };

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

  const formSchema = z.object({
    code: z.string().min(1, "BOM Assembly Code is required"),
    name: z.string().min(1, "BOM Assembly Name is required"),
  });

  const sparePartFormSchema = z.object({
    name: z.string().min(1, "Spare Part Name is required"),
    description: z.string().min(1, "Description is required"),
  });

  const formFields = [
    { name: 'code', label: 'BOM Assembly Code', type: 'text' as const },
    { name: 'name', label: 'BOM Assembly Name', type: 'text' as const },
  ];

  const sparePartFormFields = [
    { name: 'name', label: 'Spare Part Name', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'text' as const },
  ];

  const filteredSpareParts = sparePartsData.filter(
    part => selectedAssembly && part.bomAssemblyId === selectedAssembly
  );

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
            <DataTable 
              data={data} 
              columns={columns} 
              onEdit={handleEdit}
              pageSize={5}
              onRowClick={handleAssemblySelect}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Spare Parts</h3>
              <button
                onClick={handleAddNewSparePart}
                disabled={!selectedAssembly}
                className="text-sm text-blue-500 hover:underline disabled:text-gray-400"
              >
                + Add Spare Part
              </button>
            </div>
            {selectedAssembly ? (
              <DataTable 
                data={filteredSpareParts} 
                columns={sparePartColumns} 
                onEdit={handleEditSparePart}
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
        onOpenChange={setIsDialogOpen}
        title={isEditMode ? "Edit BOM Assembly" : "Add New BOM Assembly"}
        formSchema={formSchema}
        defaultValues={currentItem || { code: "", name: "" }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />

      <ManageDialog
        open={isSparePartDialogOpen}
        onOpenChange={setIsSparePartDialogOpen}
        title={isSparePartEditMode ? "Edit Spare Part" : "Add New Spare Part"}
        formSchema={sparePartFormSchema}
        defaultValues={currentSparePart || { name: "", description: "" }}
        formFields={sparePartFormFields}
        onSubmit={handleSubmitSparePart}
        isEdit={isSparePartEditMode}
      />
    </div>
  );
};

export default BomAssemblyPage;
