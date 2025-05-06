
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import ManageForm from "./ManageForm";
import * as z from "zod";
import { useEffect } from "react";

interface ManageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  formSchema: z.ZodSchema<any>;
  defaultValues: any;
  formFields: {
    name: string;
    label: string;
    type: "text" | "number" | "select" | "date" | "textarea";
    options?: {
      value: string;
      label: string;
    }[];
    required?: boolean;
    placeholder?: string;
  }[];
  onSubmit: (values: any) => void;
  isEdit?: boolean;
  isProcessing?: boolean;
  headerColor?: string;
}

const ManageDialog = ({
  open,
  onOpenChange,
  title,
  formSchema,
  defaultValues,
  formFields,
  onSubmit,
  isEdit = false,
  isProcessing = false,
  headerColor
}: ManageDialogProps) => {
  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      // Form will be reset when dialog reopens with new defaultValues
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className={`flex flex-row items-center justify-between ${headerColor ? headerColor : ''}`}>
          <DialogTitle className={headerColor ? "text-white" : ""}>{title}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className={headerColor ? "text-white hover:bg-white/20" : ""}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <ManageForm 
          schema={formSchema} 
          defaultValues={defaultValues} 
          fields={formFields} 
          onSubmit={values => {
            onSubmit(values);
          }} 
          onCancel={() => onOpenChange(false)} 
          isEdit={isEdit} 
          isSubmitting={isProcessing} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default ManageDialog;
