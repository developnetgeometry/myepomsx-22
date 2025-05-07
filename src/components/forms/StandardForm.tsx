
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/shared/PageHeader';

interface StandardFormProps<T extends z.ZodType<any, any>> {
  title: string;
  icon: ReactNode;
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  backUrl: string;
  children: (form: UseFormReturn<z.infer<T>>, isSubmitting: boolean) => ReactNode;
  sections?: {
    title: string;
    content: (form: UseFormReturn<z.infer<T>>, isSubmitting: boolean) => ReactNode;
  }[];
}

const StandardForm = <T extends z.ZodType<any, any>>({
  title,
  icon,
  schema,
  defaultValues,
  onSubmit,
  backUrl,
  children,
  sections = []
}: StandardFormProps<T>) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  
  const handleSubmit = async (values: z.infer<T>) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title={title} icon={icon} />
        <Button variant="outline" onClick={() => navigate(backUrl)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <Card>
            <CardHeader className="bg-blue-500 text-white p-4">
              <CardTitle className="text-lg">General Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {children(form, isSubmitting)}
              
              {sections.map((section, index) => (
                <React.Fragment key={index}>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-medium mb-4">{section.title}</h3>
                    {section.content(form, isSubmitting)}
                  </div>
                </React.Fragment>
              ))}
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(backUrl)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default StandardForm;
