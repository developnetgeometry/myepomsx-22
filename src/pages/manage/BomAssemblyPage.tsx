
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bomAssemblyService } from "@/services/bomAssemblyService";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import ManageDialog from "@/components/manage/ManageDialog";
import { z } from "zod";

const BomAssemblyPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const queryClient = useQueryClient();

  const { data: bomAssemblies = [], isLoading, error } = useQuery({
    queryKey: ["bomAssemblies"],
    queryFn: bomAssemblyService.getBomAssemblies,
  });

  const createMutation = useMutation({
    mutationFn: bomAssemblyService.createBomAssembly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bomAssemblies"] });
      setIsDialogOpen(false);
      toast.success("BOM Assembly created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Error creating BOM Assembly: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }: { id: number } & any) => 
      bomAssemblyService.updateBomAssembly(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bomAssemblies"] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast.success("BOM Assembly updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Error updating BOM Assembly: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: bomAssemblyService.deleteBomAssembly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bomAssemblies"] });
      toast.success("BOM Assembly deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Error deleting BOM Assembly: ${error.message}`);
    },
  });

  const columns = [
    { 
      id: "bom_code",
      header: "BOM Code", 
      accessorKey: "bom_code" 
    },
    { 
      id: "bom_name",
      header: "BOM Name", 
      accessorKey: "bom_name" 
    },
    { 
      id: "description",
      header: "Description", 
      accessorKey: "description" 
    },
  ];

  const handleSubmit = (formData: any) => {
    const processedData = {
      ...formData,
      created_at: formData.created_at ? new Date(formData.created_at).toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, ...processedData });
    } else {
      createMutation.mutate(processedData);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (item: any) => {
    if (window.confirm("Are you sure you want to delete this BOM Assembly?")) {
      deleteMutation.mutate(item.id);
    }
  };

  const formSchema = z.object({
    bom_code: z.string().min(1, "BOM Code is required"),
    bom_name: z.string().optional(),
    description: z.string().optional(),
    item_master_id: z.number().optional(),
  });

  const formFields = [
    {
      name: "bom_code",
      label: "BOM Code",
      type: "text" as const,
    },
    {
      name: "bom_name",
      label: "BOM Name",
      type: "text" as const,
    },
    {
      name: "description",
      label: "Description",
      type: "text" as const,
    },
    {
      name: "item_master_id",
      label: "Item Master ID",
      type: "number" as const,
    },
  ];

  if (error) {
    return <div>Error loading BOM assemblies: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="BOM Assembly" 
        subtitle="Manage bill of materials assemblies"
      />
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">BOM Assembly List</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add BOM Assembly
        </Button>
      </div>

      <DataTable
        data={bomAssemblies}
        columns={columns}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ManageDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingItem ? "Edit BOM Assembly" : "Add BOM Assembly"}
        formSchema={formSchema}
        defaultValues={editingItem || {
          bom_code: "",
          bom_name: "",
          description: "",
          item_master_id: 0,
        }}
        formFields={formFields}
        onSubmit={handleSubmit}
        isEdit={!!editingItem}
        isProcessing={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default BomAssemblyPage;
