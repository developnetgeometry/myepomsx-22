
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Plus } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { Column } from '@/components/shared/DataTable';
import { System } from '@/types/manage';
import ManageDialog from '@/components/manage/ManageDialog';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoadingState } from '@/hooks/use-loading-state';
import { 
  useSystems, 
  useCreateSystem, 
  useUpdateSystem 
} from '@/hooks/queries/useSystems';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/hooks/use-toast';

const SystemPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState<System | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<System[]>([]);
  
  // Custom hooks
  const { isLoading: isProcessing, withLoading } = useLoadingState();
  
  // TanStack Query hooks
  const { data: systems, isLoading, error } = useSystems();
  const createSystemMutation = useCreateSystem();
  const updateSystemMutation = useUpdateSystem();

  // Update filtered data when systems data changes or search term is applied
  useEffect(() => {
    if (!systems) return;
    
    if (!searchTerm.trim()) {
      setFilteredData(systems);
      return;
    }
    
    const filtered = systems.filter(item => 
      (item.system_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
      item.system_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredData(filtered);
    
    if (filtered.length === 0 && searchTerm.trim() !== '') {
      toast({
        title: "No matching systems found",
        description: "Please try a different search term.",
        variant: "destructive",
      })
    }
  }, [systems, searchTerm]);

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

  const handleDelete = async (item: System) => {
    withLoading(async () => {
      try {
        const { data, error } = await supabase
          .from('e_system')
          .delete()
          .eq('id', item.id);
          
        if (error) throw error;
        
        // Refresh data after deletion
        queryClient.invalidateQueries({ queryKey: ['systems'] });
        toast({
          title: "System deleted successfully",
          variant: "default",
        });
      } catch (error: any) {
        toast({
          title: "Error deleting system",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleRowClick = (row: System) => {
    navigate(`/manage/systems/${row.id}`);
  };

  const handleSubmit = (values: any) => {
    withLoading(async () => {
      try {
        if (isEditMode && currentItem) {
          // Update existing record
          await updateSystemMutation.mutateAsync({
            id: Number(currentItem.id),
            system_code: values.code,
            system_name: values.name,
            system_no: values.systemNo,
            facility_id: values.facilityId,
            is_active: currentItem.is_active,
            created_at: currentItem.created_at,
            created_by: currentItem.created_by,
            updated_at: new Date().toISOString(),
            updated_by: 'system'
          });
          toast({
            title: "System updated successfully",
            variant: "default",
          });
        } else {
          // Create new record
          await createSystemMutation.mutateAsync({
            system_code: values.code,
            system_name: values.name,
            system_no: values.systemNo,
            facility_id: values.facilityId,
            is_active: true,
            created_at: new Date().toISOString(),
            created_by: 'system',
            updated_at: new Date().toISOString(),
            updated_by: 'system'
          });
          toast({
            title: "System added successfully",
            variant: "default",
          });
        }
        
        setIsDialogOpen(false);
      } catch (error: any) {
        toast({
          title: "Error saving system",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  const handleSearch = () => {
    // The filtering happens in the useEffect
    // This is just to trigger immediate search on button click
    if (!systems) return;
    
    if (!searchTerm.trim()) {
      setFilteredData(systems);
      return;
    }
    
    const filtered = systems.filter(item => 
      (item.system_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
      item.system_code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredData(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No matching systems found",
        description: "Please try a different search term.",
        variant: "destructive",
      });
    }
  };

  const columns: Column[] = [{
    id: 'system_code',
    header: 'System Code',
    accessorKey: 'system_code'
  }, {
    id: 'system_name',
    header: 'System Name',
    accessorKey: 'system_name'
  }, {
    id: 'system_no',
    header: 'System Number',
    accessorKey: 'system_no'
  }];

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
        <p className="mt-2">Loading systems...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64">
      <div className="text-center text-red-500">
        <p>Error loading systems: {(error as Error).message}</p>
        <Button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ['systems'] })}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    </div>;
  }

  return <div className="space-y-6">
      <PageHeader title="Systems" icon={<Cpu className="h-6 w-6" />} onAddNew={handleAddNew} />
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Search systems..."
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
            onRowClick={handleRowClick} 
          />
        </CardContent>
      </Card>

      <ManageDialog 
        open={isDialogOpen} 
        onOpenChange={open => {
          if (!isProcessing) setIsDialogOpen(open);
        }} 
        title={isEditMode ? "Edit System" : "Add New System"} 
        formSchema={formSchema} 
        defaultValues={currentItem ? {
          code: currentItem.system_code,
          name: currentItem.system_name || "",
          systemNo: currentItem.system_no || "",
          facilityId: currentItem.facility_id || 0
        } : {
          code: "",
          name: "",
          systemNo: "",
          facilityId: 0
        }} 
        formFields={formFields} 
        onSubmit={handleSubmit} 
        isEdit={isEditMode} 
        isProcessing={isProcessing || createSystemMutation.isPending || updateSystemMutation.isPending} 
      />
    </div>;
};

export default SystemPage;
