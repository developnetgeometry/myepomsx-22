
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Cpu, Pencil } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useSystem, useUpdateSystem } from '@/hooks/queries/useSystems';
import { z } from 'zod';
import ManageDialog from '@/components/manage/ManageDialog';

const SystemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: system, isLoading, error } = useSystem(Number(id));
  const updateSystemMutation = useUpdateSystem();

  const handleGoBack = () => {
    navigate('/manage/systems');
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleSubmit = async (values: any) => {
    if (!system) return;
    
    try {
      await updateSystemMutation.mutateAsync({
        id: system.id,
        system_code: values.code,
        system_name: values.name,
        system_no: values.systemNo,
        facility_id: values.facilityId,
        is_active: system.is_active,
        created_at: system.created_at,
        created_by: system.created_by,
        updated_at: new Date().toISOString(),
        updated_by: 'system'
      });
      
      toast.success("System updated successfully");
      setIsEditDialogOpen(false);
    } catch (error: any) {
      toast.error(`Error updating system: ${error.message}`);
    }
  };

  const formSchema = z.object({
    code: z.string().min(1, "System Code is required"),
    name: z.string().min(1, "System Name is required"),
    systemNo: z.string().min(1, "System Number is required"),
    facilityId: z.number().min(1, "Facility ID is required")
  });

  const formFields = [{
    name: 'code',
    label: 'System Code',
    type: 'text' as const
  }, {
    name: 'name',
    label: 'System Name',
    type: 'text' as const
  }, {
    name: 'systemNo',
    label: 'System Number',
    type: 'text' as const
  }, {
    name: 'facilityId',
    label: 'Facility ID',
    type: 'number' as const
  }];
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2">Loading system details...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-center text-red-500">
        <p>Error loading system: {(error as Error).message}</p>
        <Button onClick={handleGoBack} className="mt-4">
          Back to Systems
        </Button>
      </div>
    </div>;
  }

  if (!system) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p>System not found</p>
        <Button onClick={handleGoBack} className="mt-4">
          Back to Systems
        </Button>
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="System Detail" 
          icon={<Cpu className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={handleGoBack} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Systems
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Field</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[100px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">System Code</TableCell>
                <TableCell>{system.system_code}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">System Name</TableCell>
                <TableCell>{system.system_name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">System Number</TableCell>
                <TableCell>{system.system_no}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Facility ID</TableCell>
                <TableCell>{system.facility_id}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ManageDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        title="Edit System" 
        formSchema={formSchema} 
        defaultValues={{
          code: system.system_code,
          name: system.system_name || "",
          systemNo: system.system_no || "",
          facilityId: system.facility_id || 0
        }} 
        formFields={formFields} 
        onSubmit={handleSubmit} 
        isEdit={true} 
        isProcessing={updateSystemMutation.isPending} 
      />
    </div>
  );
};

export default SystemDetailPage;
