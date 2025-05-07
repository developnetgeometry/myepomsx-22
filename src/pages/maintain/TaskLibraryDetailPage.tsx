
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, PlusCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DataTable from '@/components/shared/DataTable';
import { toast } from 'sonner';

// Dummy data for task sequences
const taskSequenceData = [
  { id: 1, seq: 1, taskList: 'Check oil level' },
  { id: 2, seq: 2, taskList: 'Inspect bearings' },
  { id: 3, seq: 3, taskList: 'Verify pressure settings' },
];

// Dummy data for discipline options
const disciplineOptions = [
  { value: 'mechanical', label: 'Mechanical' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'instrumentation', label: 'Instrumentation' },
  { value: 'civil', label: 'Civil' },
];

// Form validation schema
const taskFormSchema = z.object({
  taskCode: z.string().min(1, { message: "Task Code is required" }),
  counter: z.string().optional(),
  taskName: z.string().min(1, { message: "Task Name is required" }),
  discipline: z.string().min(1, { message: "Discipline is required" }),
  noManPower: z.string()
    .transform(val => val === '' ? '0' : val)
    .refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
  manHour: z.string()
    .transform(val => val === '' ? '0' : val)
    .refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
  totalHourRequired: z.string()
    .transform(val => val === '' ? '0' : val)
    .refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
  active: z.boolean().default(true),
});

// Sequence table columns
const sequenceColumns = [
  { id: 'seq', header: 'Seq', accessorKey: 'seq' },
  { id: 'taskList', header: 'Task List', accessorKey: 'taskList' }
];

const TaskLibraryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("task");
  const [loading, setLoading] = useState(false);
  const [sequences, setSequences] = useState(taskSequenceData);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  
  // Initialize form with default values
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      taskCode: id || '',
      counter: '001',
      taskName: 'Pump Inspection Task',
      discipline: 'mechanical',
      noManPower: '2',
      manHour: '3.5',
      totalHourRequired: '7',
      active: true,
    }
  });

  // Load data based on the ID
  useEffect(() => {
    if (id) {
      // In a real app, you'd fetch the task data from an API
      console.log(`Fetching task data for ID: ${id}`);
      // For now we're using the default values defined above
    }
  }, [id]);

  const onSubmit = (values: z.infer<typeof taskFormSchema>) => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log('Submitted values:', values);
      setLoading(false);
      toast.success("Task updated successfully");
    }, 1000);
  };

  const handleAddSequence = () => {
    // This would open a dialog to add a new sequence
    toast.info("Add new sequence functionality would open a dialog here");
  };

  const handleRowClick = (row: any) => {
    // Handle row click - could be used for selecting a row
    console.log("Row clicked:", row);
    const isSelected = selectedRows.some(item => item.id === row.id);
    
    if (isSelected) {
      setSelectedRows(selectedRows.filter(item => item.id !== row.id));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Task Detail" 
        />
        <Button variant="outline" onClick={() => navigate('/maintain/task-library')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Task Library
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Task #{id}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="task" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                  <TabsTrigger value="task">Task</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="task" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="taskCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Task Code<span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="counter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Counter</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="taskName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Task Name<span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="discipline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Discipline<span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Discipline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {disciplineOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="noManPower"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">No Man Power</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="manHour"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Man Hour</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.1" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="totalHourRequired"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Total Hour Required</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.1" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium">
                                Active
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        onClick={handleAddSequence}
                        className="flex items-center gap-2"
                      >
                        <PlusCircle className="h-4 w-4" /> Add Row
                      </Button>
                    </div>
                    
                    <DataTable
                      columns={sequenceColumns}
                      data={sequences}
                      onRowClick={handleRowClick}
                      onEdit={(row) => {
                        toast.info(`Edit row ${row.seq}`);
                      }}
                    />
                    
                    <div className="text-sm text-gray-600">
                      Total Rows Selected: {selectedRows.length}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/maintain/task-library')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Apply Changes'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskLibraryDetailPage;
