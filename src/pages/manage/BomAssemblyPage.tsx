
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Box } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import ManageDialog from '@/components/manage/ManageDialog';
import { Column } from '@/components/shared/DataTable';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

// Sample BOM Assembly data
const initialBomAssemblyData = [
  {
    id: '1',
    bomCode: 'BOM-001',
    bomName: 'Pump Assembly',
    description: 'Complete assembly for water pump system',
    itemMasterName: 'Industrial Pump XL300',
    partsCount: 12
  },
  {
    id: '2',
    bomCode: 'BOM-002',
    bomName: 'Motor Assembly',
    description: 'Electric motor with mounting components',
    itemMasterName: 'Electric Motor M500',
    partsCount: 8
  },
  {
    id: '3',
    bomCode: 'BOM-003',
    bomName: 'Control Panel Assembly',
    description: 'Control system with electrical components',
    itemMasterName: 'Control Panel CP200',
    partsCount: 15
  },
  {
    id: '4',
    bomCode: 'BOM-004',
    bomName: 'Valve System',
    description: 'Complete valve system with actuators',
    itemMasterName: 'Valve System VS100',
    partsCount: 10
  },
  {
    id: '5',
    bomCode: 'BOM-005',
    bomName: 'Bearing Assembly',
    description: 'Set of bearings with housing',
    itemMasterName: 'Bearing Kit BK400',
    partsCount: 6
  }
];

const BomAssemblyPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [data, setData] = useState(initialBomAssemblyData);
  const navigate = useNavigate();

  const handleAddNew = () => {
    setIsEditMode(false);
    setCurrentItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setIsEditMode(true);
    setCurrentItem(item);
    setIsDialogOpen(true);
  };

  const handleRowClick = (row: any) => {
    // In a real app, navigate to detail page
    console.log('Viewing BOM Assembly:', row);
    // navigate(`/manage/bom-assembly/${row.id}`);
  };

  const handleSubmit = (values: any) => {
    if (isEditMode && currentItem) {
      // Update existing item
      setData(data.map(item => 
        item.id === currentItem.id ? { ...item, ...values } : item
      ));
      toast({
        title: "Success",
        description: "BOM Assembly updated successfully",
      });
    } else {
      // Add new item
      const newItem = {
        id: `${data.length + 1}`,
        ...values,
        partsCount: 0
      };
      setData([...data, newItem]);
      toast({
        title: "Success",
        description: "New BOM Assembly added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    {
      id: 'bomCode',
      header: 'BOM Code',
      accessorKey: 'bomCode',
    },
    {
      id: 'bomName',
      header: 'BOM Name',
      accessorKey: 'bomName',
    },
    {
      id: 'description',
      header: 'Description',
      accessorKey: 'description',
    },
    {
      id: 'itemMasterName',
      header: 'Item Master',
      accessorKey: 'itemMasterName',
    },
    {
      id: 'partsCount',
      header: 'Parts Count',
      accessorKey: 'partsCount',
    },
  ];

  const formSchema = z.object({
    bomCode: z.string().min(1, "BOM Code is required"),
    bomName: z.string().min(1, "BOM Name is required"),
    description: z.string().min(1, "Description is required"),
    itemMasterName: z.string().min(1, "Item Master is required"),
  });

  const itemMasterOptions = [
    { value: 'Industrial Pump XL300', label: 'Industrial Pump XL300' },
    { value: 'Electric Motor M500', label: 'Electric Motor M500' },
    { value: 'Control Panel CP200', label: 'Control Panel CP200' },
    { value: 'Valve System VS100', label: 'Valve System VS100' },
    { value: 'Bearing Kit BK400', label: 'Bearing Kit BK400' },
  ];

  const formFields = [
    { name: 'bomCode', label: 'BOM Code', type: 'text' as const },
    { name: 'bomName', label: 'BOM Name', type: 'text' as const },
    { name: 'description', label: 'Description', type: 'textarea' as const },
    { 
      name: 'itemMasterName', 
      label: 'Item Master', 
      type: 'select' as const,
      options: itemMasterOptions
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="BOM Assembly" 
        icon={<Box className="h-6 w-6" />}
        onAddNew={handleAddNew}
      />
      
      <Card>
        <CardContent className="pt-6">
          <DataTable 
            data={data} 
            columns={columns} 
            onEdit={handleEdit}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={isEditMode ? "Edit BOM Assembly" : "Add New BOM Assembly"}
        formSchema={formSchema}
        defaultValues={currentItem || { 
          bomCode: "", 
          bomName: "", 
          description: "", 
          itemMasterName: ""
        }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default BomAssemblyPage;
