
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import ManageForm from "./ManageForm";
import * as z from "zod";

interface ManageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  formSchema: z.ZodSchema<any>;
  defaultValues: any;
  formFields: {
    name: string;
    label: string;
    type: "text" | "number" | "select";
    options?: { value: string; label: string }[];
  }[];
  onSubmit: (values: any) => void;
  isEdit?: boolean;
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
}: ManageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <ManageForm
          schema={formSchema}
          defaultValues={defaultValues}
          fields={formFields}
          onSubmit={(values) => {
            onSubmit(values);
            onOpenChange(false);
          }}
          isEdit={isEdit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ManageDialog;
