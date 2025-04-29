
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface ManageFormProps {
  schema: z.ZodSchema<any>;
  defaultValues: any;
  fields: {
    name: string;
    label: string;
    type: "text" | "number" | "select";
    options?: { value: string; label: string }[];
  }[];
  onSubmit: (values: any) => void;
  isEdit?: boolean;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const ManageForm = ({
  schema,
  defaultValues,
  fields,
  onSubmit,
  isEdit = false,
  onCancel,
  isSubmitting = false,
}: ManageFormProps) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (values: any) => {
    onSubmit(values);
    // Toast is now handled at a higher level after the operation is successful
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === "select" ? (
                      <Select
                        value={formField.value}
                        onValueChange={formField.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "number" ? (
                      <Input
                        type="number"
                        {...formField}
                        onChange={(e) => formField.onChange(Number(e.target.value))}
                        disabled={isSubmitting}
                      />
                    ) : (
                      <Input {...formField} disabled={isSubmitting} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEdit ? "Update" : "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ManageForm;
