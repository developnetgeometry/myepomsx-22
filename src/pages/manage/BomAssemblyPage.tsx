
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bomAssemblyService } from "@/services/bomAssemblyService";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import ManageDialog from "@/components/manage/ManageDialog";

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
    mutationFn: bomAssemblyService.updateBomAssembly,
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
    { header: "BOM Code", accessorKey: "bom_code" },
    { header: "BOM Name", accessorKey: "bom_name" },
    { header: "Description", accessorKey: "description" },
  ];

  const handleSubmit = (formData: any) => {
    const processedData = {
      ...formData,
      created_at: formData.created_at ? new Date(formData.created_at).toISOString() : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      updateMutation.mutate({ ...processedData, id: editingItem.id });
    } else {
      createMutation.mutate(processedData);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this BOM Assembly?")) {
      deleteMutation.mutate(id);
    }
  };

  const formFields = [
    {
      name: "bom_code",
      label: "BOM Code",
      type: "text" as const,
      placeholder: "Enter BOM code",
      required: true,
    },
    {
      name: "bom_name",
      label: "BOM Name",
      type: "text" as const,
      placeholder: "Enter BOM name",
    },
    {
      name: "description",
      label: "Description",
      type: "text" as const,
      placeholder: "Enter description",
    },
    {
      name: "item_master_id",
      label: "Item Master ID",
      type: "number" as const,
      placeholder: "Enter item master ID",
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
        fields={formFields}
        onSubmit={handleSubmit}
        defaultValues={editingItem}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default BomAssemblyPage;
