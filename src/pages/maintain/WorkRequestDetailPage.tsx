
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import DataTable from '@/components/shared/DataTable';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

// Dummy data for the task detail table
const taskDetailData = [
  { id: 1, seq: '1', taskList: 'Inspect Bearing Noise', activeStatus: true },
  { id: 2, seq: '2', taskList: 'Tighten Loose Fittings', activeStatus: true },
  { id: 3, seq: '3', taskList: 'Replace Bearing Unit', activeStatus: true }
];

// Dummy data for the reports tab
const reportsData = [
  { id: 1, reportType: 'Inspection', reportDescription: 'Bearing noise analysis report', attachment: 'report_bearing.pdf' },
  { id: 2, reportType: 'Service Log', reportDescription: 'Maintenance service log summary', attachment: 'service_log.pdf' }
];

// Dummy data for the attachment tab
const attachmentData = [
  { id: 1, type: 'Work Request', attachmentDate: '12/05/2025', notes: 'Initial Finding Photo Attached', attachment: 'bearing_photo.jpg' }
];

// Dummy data for dropdown options
const statusOptions = [
  { value: 'Draft', label: 'Draft' },
  { value: 'Submitted', label: 'Submitted' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Rejected', label: 'Rejected' }
];

const facilityOptions = [
  { value: 'Central Processing', label: 'Central Processing' },
  { value: 'North Field', label: 'North Field' },
  { value: 'South Field', label: 'South Field' },
  { value: 'Terminal', label: 'Terminal' }
];

const systemOptions = [
  { value: 'Production', label: 'Production' },
  { value: 'Compression', label: 'Compression' },
  { value: 'Separation', label: 'Separation' },
  { value: 'Treatment', label: 'Treatment' }
];

const packageOptions = [
  { value: 'V-110 Test Separator', label: 'V-110 Test Separator' },
  { value: 'P-120 Transfer Pump', label: 'P-120 Transfer Pump' },
  { value: 'C-130 Compressor', label: 'C-130 Compressor' },
  { value: 'E-140 Heat Exchanger', label: 'E-140 Heat Exchanger' }
];

const assetOptions = [
  { value: 'V-110', label: 'V-110' },
  { value: 'P-120', label: 'P-120' },
  { value: 'C-130', label: 'C-130' },
  { value: 'E-140', label: 'E-140' }
];

const workCenterOptions = [
  { value: 'Mechanical', label: 'Mechanical' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Instrumentation', label: 'Instrumentation' },
  { value: 'Piping', label: 'Piping' },
  { value: 'Civil', label: 'Civil' }
];

const areaOptions = [
  { value: 'Area A', label: 'Area A' },
  { value: 'Area B', label: 'Area B' },
  { value: 'Area C', label: 'Area C' },
  { value: 'Area D', label: 'Area D' }
];

const maintenanceTypeOptions = [
  { value: 'Corrective', label: 'Corrective (CM)' },
  { value: 'Preventive', label: 'Preventive (PM)' },
  { value: 'Predictive', label: 'Predictive (PdM)' },
  { value: 'Detective', label: 'Detective' },
  { value: 'Modification', label: 'Modification' }
];

const requestTypeOptions = [
  { value: 'Finding', label: 'Finding' },
  { value: 'Failure', label: 'Failure' },
  { value: 'Audit', label: 'Audit' },
  { value: 'Inspection', label: 'Inspection' }
];

const requestedByOptions = [
  { value: 'John Doe', label: 'John Doe' },
  { value: 'Jane Smith', label: 'Jane Smith' },
  { value: 'Mike Johnson', label: 'Mike Johnson' },
  { value: 'Sarah Williams', label: 'Sarah Williams' }
];

const criticalityOptions = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Critical', label: 'Critical' }
];

// Form schema for validation
const formSchema = z.object({
  noWorkRequest: z.string(),
  status: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requestDate: z.date(),
  targetDueDate: z.date().optional(),
  facilityLocation: z.string(),
  system: z.string(),
  package: z.string(),
  asset: z.string(),
  assetSCECode: z.string().optional(),
  workCenter: z.string(),
  area: z.string(),
  dateFinding: z.date(),
  maintenanceType: z.string(),
  requestType: z.string(),
  requestedBy: z.string(),
  criticality: z.string(),
  findingDetails: z.string().optional(),
  attachReport: z.boolean().default(false),
  childIncidentReport: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

// Task detail table columns
const taskColumns = [
  { id: 'seq', header: 'Seq', accessorKey: 'seq' },
  { id: 'taskList', header: 'Task List', accessorKey: 'taskList' },
  { 
    id: 'activeStatus', 
    header: 'Active Status',
    accessorKey: 'activeStatus',
    cell: (value: boolean) => value ? '✅' : '❌'
  }
];

// Reports table columns
const reportsColumns = [
  { id: 'reportType', header: 'Report Type', accessorKey: 'reportType' },
  { id: 'reportDescription', header: 'Report Description', accessorKey: 'reportDescription' },
  { id: 'attachment', header: 'Attachment', accessorKey: 'attachment' }
];

// Attachment table columns
const attachmentColumns = [
  { id: 'type', header: 'Type', accessorKey: 'type' },
  { id: 'attachmentDate', header: 'Attachment Date', accessorKey: 'attachmentDate' },
  { id: 'notes', header: 'Notes', accessorKey: 'notes' },
  { id: 'attachment', header: 'Attachment', accessorKey: 'attachment' }
];

const WorkRequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('taskDetail');
  const [loading, setLoading] = useState(false);
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      noWorkRequest: id || '',
      status: 'Draft',
      description: 'Compressor vibration issue that requires immediate attention',
      requestDate: new Date(),
      targetDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from today
      facilityLocation: 'Central Processing',
      system: 'Compression',
      package: 'C-130 Compressor',
      asset: 'C-130',
      assetSCECode: 'SCE-130',
      workCenter: 'Mechanical',
      area: 'Area A',
      dateFinding: new Date(),
      maintenanceType: 'Corrective',
      requestType: 'Finding',
      requestedBy: 'John Doe',
      criticality: 'High',
      findingDetails: 'Observed unusual vibration and noise during operation. Initial inspection suggests bearing failure.',
      attachReport: false,
      childIncidentReport: false,
    }
  });
  
  // Load data based on the ID
  useEffect(() => {
    if (id) {
      // In a real app, you'd fetch the work request data from an API
      console.log(`Fetching work request data for ID: ${id}`);
      // For now we're using the default values defined above
    }
  }, [id]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log('Submitted values:', values);
      setLoading(false);
      toast.success("Work request updated successfully");
    }, 1000);
  };

  const handleApprove = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      form.setValue('status', 'Approved');
      setLoading(false);
      toast.success("Work request approved successfully");
    }, 1000);
  };

  const handleAddNewTask = () => {
    // This would open a dialog to add a new task
    toast.info("Add new task functionality would open a dialog here");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      toast.success(`File "${event.target.files[0].name}" uploaded successfully`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Work Request Detail" 
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/maintain/work-request')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Work Requests
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              {/* Work Request Header Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="noWorkRequest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Work Request No<span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} readOnly className="bg-muted/30" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Description<span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} richText />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="requestDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium">
                            Work Request Date<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="targetDueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium">Target Due Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || undefined}
                                onSelect={field.onChange}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="facilityLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Facility<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Facility" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {facilityOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="system"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            System<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select System" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {systemOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="package"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Package<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Package" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {packageOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="asset"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Asset<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Asset" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {assetOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Status<span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statusOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="assetSCECode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Asset SCE Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="workCenter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Work Center<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Work Center" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {workCenterOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Area<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {areaOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dateFinding"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-sm font-medium">
                            Date Finding<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maintenanceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Maintenance Type<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {maintenanceTypeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="requestType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Request Type<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Request Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {requestTypeOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="requestedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Requested By<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Requester" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {requestedByOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="criticality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Criticality<span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Criticality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {criticalityOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="findingDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Finding Incident Details</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} richText />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="attachReport"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium cursor-pointer">Analysis Report</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="childIncidentReport"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium cursor-pointer">Quick Incident Report</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Tabbed Detail Section */}
          <Card>
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full border-b justify-start overflow-x-auto">
                  <TabsTrigger value="taskDetail">Task Detail</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="failure">Failure</TabsTrigger>
                  <TabsTrigger value="attachment">Attachment</TabsTrigger>
                  <TabsTrigger value="environmentDetail">Environment Detail</TabsTrigger>
                  <TabsTrigger value="operationDetail">Operation Detail</TabsTrigger>
                  <TabsTrigger value="additionalFields">Additional Fields</TabsTrigger>
                </TabsList>
                
                <TabsContent value="taskDetail" className="pt-4 space-y-4">
                  <div className="flex justify-end">
                    <Button variant="outline" onClick={handleAddNewTask} className="text-sm">
                      + Add Row
                    </Button>
                  </div>
                  
                  <DataTable 
                    columns={taskColumns}
                    data={taskDetailData}
                  />
                </TabsContent>
                
                <TabsContent value="reports" className="pt-4 space-y-4">
                  <DataTable 
                    columns={reportsColumns}
                    data={reportsData}
                  />
                </TabsContent>
                
                <TabsContent value="failure" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Failure Impact Section</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Failure Type</h4>
                          <p className="text-base">Mechanical Failure</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Shutdown</h4>
                          <p className="text-base">Yes</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Lost Time Incident</h4>
                          <p className="text-base">No</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Safety</h4>
                          <p className="text-base">Moderate Risk</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Like Hood</h4>
                          <p className="text-base">High</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Priority</h4>
                          <p className="text-base">P1</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Immediate Action Taken</h4>
                        <p className="text-base">Shutdown compressor to prevent further damage.</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Consequence Section</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Critical Rank</h4>
                          <p className="text-base">A1</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Probability Occurrence</h4>
                          <p className="text-base">High</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">Environment Consequence</h4>
                          <p className="text-base">Minor Leakage</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">HSE Consequence</h4>
                          <p className="text-base">Low Risk</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Corrective Action</h4>
                        <p className="text-base">Replace damaged bearing and retest.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="attachment" className="pt-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Attachments</h3>
                    <DataTable 
                      columns={attachmentColumns}
                      data={attachmentData}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Upload New Attachment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="attachmentType">Attachment Type</Label>
                        <Select defaultValue="workRequest">
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="workRequest">Work Request</SelectItem>
                            <SelectItem value="photo">Photo</SelectItem>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="report">Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Input id="notes" placeholder="Enter notes about this attachment" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="file">Upload File</Label>
                        <Input id="file" type="file" onChange={handleFileChange} />
                      </div>
                    </div>
                    
                    <Button type="button" className="mt-2">Upload Attachment</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="environmentDetail" className="pt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Environment Detail</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="weatherCondition">Weather Condition</Label>
                        <Input id="weatherCondition" value="Clear Sky" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="visibility">Visibility</Label>
                        <Input id="visibility" value="10 km" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="windSpeedDirection">Wind Speed Direction</Label>
                        <Input id="windSpeedDirection" value="NW 15 km/h" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="seaWell">Sea Well</Label>
                        <Input id="seaWell" value="Normal" readOnly />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="operationDetail" className="pt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Operation Detail</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="serviceAsset">Service Asset</Label>
                        <Input id="serviceAsset" value="C-130 Compressor" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pressure">Pressure</Label>
                        <Input id="pressure" value="10.5 Bar" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="temp">Temp</Label>
                        <Input id="temp" value="80°C" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="operatingHistory">Operating History</Label>
                        <Input id="operatingHistory" value="5000 Hours" readOnly />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="additionalFields" className="pt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Additional Fields</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="alarmTrigger">Alarm Trigger</Label>
                        <Input id="alarmTrigger" value="Vibration Sensor Alarm" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="shutdownType">Shutdown Type</Label>
                        <Input id="shutdownType" value="Unplanned Shutdown" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeFailed">Time Failed</Label>
                        <Input id="timeFailed" value="12/05/2025 09:00 AM" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeResume">Time Resume</Label>
                        <Input id="timeResume" value="12/05/2025 02:30 PM" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="shift">Shift</Label>
                        <Input id="shift" value="Shift A" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="redundant">Redundant</Label>
                        <Input id="redundant" value="No" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeInService">Time in Service (Hour)</Label>
                        <Input id="timeInService" value="4500" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="materialClass">Material Class</Label>
                        <Input id="materialClass" value="Stainless Steel 316" readOnly />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="designCode">Design Code</Label>
                        <Input id="designCode" value="ASME VIII Div 1" readOnly />
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <Label htmlFor="otherDetail">Other Detail</Label>
                      <Textarea id="otherDetail" value="Temporary support installed for stabilization" readOnly />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/maintain/work-request')}
            >
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
            
            <Button
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              disabled={loading}
            >
              Submit
            </Button>
            
            <Button
              type="button"
              onClick={handleApprove}
              disabled={loading || form.getValues().status !== 'Submitted'}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WorkRequestDetailPage;
