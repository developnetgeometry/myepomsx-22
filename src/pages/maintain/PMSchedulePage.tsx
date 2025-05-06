import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Filter, Download, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLoadingState } from '@/hooks/use-loading-state';
import { assets } from '@/data/sampleData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ManageDialog from '@/components/manage/ManageDialog';
import * as z from 'zod';

interface PMSchedule {
  id: string;
  pmNo: string;
  description: string;
  asset: string;
  frequency: string;
  nextDueDate: string;
  status: string;
}

const PMSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  // State management
  const [pmSchedules, setPmSchedules] = useState<PMSchedule[]>([]);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  });
  const [selectedAsset, setSelectedAsset] = useState<string>("all");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isCreatePMDialogOpen, setIsCreatePMDialogOpen] = useState(false);
  
  // Loading states
  const { isLoading: isSearching, withLoading: withSearchLoading } = useLoadingState();
  const { isLoading: isGenerating, withLoading: withGenerateLoading } = useLoadingState();
  const { isLoading: isDeleting, withLoading: withDeleteLoading } = useLoadingState();
  const { isLoading: isCreatingPM, withLoading: withCreatePMLoading } = useLoadingState();
  
  // Define columns
  const columns: Column[] = [
    { id: 'pmNo', header: 'PM No', accessorKey: 'pmNo' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'asset', header: 'Asset', accessorKey: 'asset' },
    { id: 'frequency', header: 'Frequency', accessorKey: 'frequency' },
    { id: 'nextDueDate', header: 'Next Due Date', accessorKey: 'nextDueDate' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
  ];
  
  // Asset options for the select dropdown
  const assetOptions = assets.map(asset => ({
    value: asset.id,
    label: asset.name
  }));
  
  // Generate sample PM schedules
  const generateSampleSchedules = () => {
    const frequencies = ['Weekly', 'Monthly', 'Quarterly', 'Semi-Annually', 'Annually'];
    const statuses = ['Scheduled', 'In Progress', 'Completed', 'Overdue'];
    
    // Generate random PM schedules
    const schedules: PMSchedule[] = Array.from({ length: 10 }, (_, i) => {
      const asset = assets[Math.floor(Math.random() * assets.length)];
      const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
      
      // Generate a random date between start and end date
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();
      const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
      const randomDate = new Date(randomTimestamp).toISOString().split('T')[0];
      
      return {
        id: `PM-${1000 + i}`,
        pmNo: `PM-${1000 + i}`,
        description: `Preventive Maintenance for ${asset.name}`,
        asset: asset.name,
        frequency,
        nextDueDate: randomDate,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    });
    
    // If asset filter is applied
    if (selectedAsset && selectedAsset !== "all") {
      const assetName = assetOptions.find(opt => opt.value === selectedAsset)?.label || "";
      return schedules.filter(schedule => schedule.asset === assetName);
    }
    
    return schedules;
  };

  // PM Form Schema
  const pmFormSchema = z.object({
    pmNo: z.string().min(1, "PM No is required"),
    dueDate: z.string().min(1, "Due Date is required"),
    maintenance: z.string().min(1, "Maintenance is required"),
    status: z.string().min(1, "Status is required"),
    priority: z.string().min(1, "Priority is required"),
    workCenter: z.string().min(1, "Work Center is required"),
    discipline: z.string().min(1, "Discipline is required"),
    task: z.string().min(1, "Task is required"),
    manPower: z.string().optional(),
    manHour: z.string().optional(),
    frequency: z.string().min(1, "Frequency is required"),
    facility: z.string().optional(),
    system: z.string().optional(),
    package: z.string().optional(),
    assets: z.string().optional(),
    pmGroup: z.string().optional(),
    pmSCECode: z.string().optional(),
    pmDescription: z.string().optional(),
  });

  // Form fields for PM creation
  const pmFormFields = [
    { name: 'pmNo', label: 'PM No', type: 'text' as const, required: true },
    { name: 'dueDate', label: 'Due Date', type: 'date' as const, required: true },
    { 
      name: 'maintenance', 
      label: 'Maintenance', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: '001-PM', label: '001-PM' },
        { value: '002-PM', label: '002-PM' },
      ]
    },
    { 
      name: 'status', 
      label: 'Status', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
      ]
    },
    { 
      name: 'priority', 
      label: 'Priority', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
      ]
    },
    { 
      name: 'workCenter', 
      label: 'Work Center', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'Electrical Work Center', label: 'Electrical Work Center' },
        { value: 'Mechanical Work Center', label: 'Mechanical Work Center' },
      ]
    },
    { 
      name: 'discipline', 
      label: 'Discipline', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'Electrical', label: 'Electrical' },
        { value: 'Mechanical', label: 'Mechanical' },
        { value: 'Instrumentation', label: 'Instrumentation' },
      ]
    },
    { 
      name: 'task', 
      label: 'Task', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'Inspection', label: 'Inspection' },
        { value: 'Maintenance', label: 'Maintenance' },
        { value: 'Calibration', label: 'Calibration' },
      ]
    },
    { name: 'manPower', label: 'Man Power', type: 'text' as const },
    { name: 'manHour', label: 'Man Hour', type: 'text' as const },
    { 
      name: 'frequency', 
      label: 'Frequency', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'P0001-Monthly', label: 'P0001-Monthly' },
        { value: 'P0002-Quarterly', label: 'P0002-Quarterly' },
        { value: 'P0003-Annually', label: 'P0003-Annually' },
      ]
    },
    { 
      name: 'facility', 
      label: 'Facility', 
      type: 'select' as const,
      options: [
        { value: 'Facility 1', label: 'Facility 1' },
        { value: 'Facility 2', label: 'Facility 2' },
      ]
    },
    { 
      name: 'system', 
      label: 'System', 
      type: 'select' as const,
      options: [
        { value: 'System 1', label: 'System 1' },
        { value: 'System 2', label: 'System 2' },
      ]
    },
    { 
      name: 'package', 
      label: 'Package', 
      type: 'select' as const,
      options: [
        { value: 'Package 1', label: 'Package 1' },
        { value: 'Package 2', label: 'Package 2' },
      ]
    },
    { 
      name: 'assets', 
      label: 'Assets', 
      type: 'select' as const,
      options: assetOptions
    },
    { 
      name: 'pmGroup', 
      label: 'PM Group', 
      type: 'select' as const,
      options: [
        { value: 'Group 1', label: 'Group 1' },
        { value: 'Group 2', label: 'Group 2' },
      ]
    },
    { 
      name: 'pmSCECode', 
      label: 'PM SCE Code', 
      type: 'select' as const,
      options: [
        { value: 'SCE-001', label: 'SCE-001' },
        { value: 'SCE-002', label: 'SCE-002' },
      ]
    },
    { 
      name: 'pmDescription', 
      label: 'PM Description', 
      type: 'textarea' as const,
      placeholder: 'Enter detailed description of the PM task'
    },
  ];

  // Default values for PM creation form
  const pmDefaultValues = {
    pmNo: '',
    dueDate: new Date().toISOString().split('T')[0],
    maintenance: '001-PM',
    status: 'Active',
    priority: 'High',
    workCenter: 'Electrical Work Center',
    discipline: '',
    task: '',
    manPower: '',
    manHour: '',
    frequency: 'P0001-Monthly',
    facility: '',
    system: '',
    package: '',
    assets: '',
    pmGroup: '',
    pmSCECode: '',
    pmDescription: '',
  };

  // Handlers
  const handleSearch = () => {
    withSearchLoading(async () => {
      // Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        toast.error("Start date cannot be after end date");
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newSchedules = generateSampleSchedules();
      setPmSchedules(newSchedules);
      
      if (newSchedules.length === 0) {
        toast.info("No PM schedules found for the selected criteria");
      } else {
        toast.success(`Found ${newSchedules.length} PM schedules`);
      }
    });
  };

  const handleGenerateSchedule = () => {
    withGenerateLoading(async () => {
      // Validate dates
      if (new Date(startDate) > new Date(endDate)) {
        toast.error("Start date cannot be after end date");
        return;
      }
      
      // Simulate API call with longer delay for "generation"
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newSchedules = generateSampleSchedules();
      setPmSchedules(newSchedules);
      setIsGenerateDialogOpen(false);
      
      toast.success(`Generated ${newSchedules.length} PM schedules successfully`);
    });
  };
  
  const handleDelete = (item: PMSchedule) => {
    withDeleteLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPmSchedules(pmSchedules.filter(schedule => schedule.id !== item.id));
      
      toast.success(`PM Schedule ${item.pmNo} deleted successfully`);
    });
  };
  
  const handleExport = () => {
    // Simulate export
    toast.success("PM schedules exported successfully");
    // In a real app, this would generate and download a CSV file
  };

  const handleRowClick = (row: PMSchedule) => {
    navigate(`/maintain/pm-schedule/${row.id}`);
  };

  const handleCreatePM = (values: any) => {
    withCreatePMLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new PM with generated ID
      const newPM: PMSchedule = {
        id: `PM-${1000 + pmSchedules.length + 1}`,
        pmNo: values.pmNo,
        description: values.pmDescription || `PM for ${values.assets}`,
        asset: values.assets ? assetOptions.find(a => a.value === values.assets)?.label || '' : '',
        frequency: values.frequency,
        nextDueDate: values.dueDate,
        status: values.status
      };
      
      setPmSchedules([...pmSchedules, newPM]);
      setIsCreatePMDialogOpen(false);
      
      toast.success(`PM Schedule ${values.pmNo} created successfully`);
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="PM Schedule" 
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <div className="bg-white p-4 rounded-md border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Schedule Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="startDate" className="text-sm font-medium text-gray-700">Start Date</label>
            <div className="relative">
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={isSearching || isGenerating}
                className="pl-3 pr-8"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="endDate" className="text-sm font-medium text-gray-700">End Date</label>
            <div className="relative">
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isSearching || isGenerating}
                className="pl-3 pr-8"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="asset" className="text-sm font-medium text-gray-700">Asset (Optional)</label>
            <Select 
              value={selectedAsset}
              onValueChange={setSelectedAsset}
              disabled={isSearching || isGenerating}
            >
              <SelectTrigger id="asset">
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                {assetOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSearch}
            disabled={isSearching || isGenerating}
            className="flex items-center gap-2"
          >
            {isSearching ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Searching...
              </>
            ) : (
              <>
                <Filter className="h-4 w-4" /> Search
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            disabled={isSearching || isGenerating || isCreatingPM}
            className="flex items-center gap-2"
            onClick={() => setIsCreatePMDialogOpen(true)}
          >
            <Plus className="h-4 w-4" /> Generate Schedule
          </Button>

          <AlertDialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                disabled={isSearching || isGenerating}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Auto Generate
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Generate PM Schedule</AlertDialogTitle>
                <AlertDialogDescription>
                  This will create new preventive maintenance schedules for all applicable assets in the system. Do you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isGenerating}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleGenerateSchedule}
                  disabled={isGenerating}
                  className="flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <DataTable 
        columns={columns}
        data={pmSchedules}
        onDelete={handleDelete}
        onExport={pmSchedules.length > 0 ? handleExport : undefined}
        onRowClick={handleRowClick}
      />
      
      {pmSchedules.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No PM schedules found. Use the search filters above or generate a new schedule.
          </p>
        </div>
      )}

      {/* PM Schedule Creation Dialog */}
      <ManageDialog
        open={isCreatePMDialogOpen}
        onOpenChange={setIsCreatePMDialogOpen}
        title="Create PM Schedule"
        formSchema={pmFormSchema}
        defaultValues={pmDefaultValues}
        formFields={pmFormFields}
        onSubmit={handleCreatePM}
        isProcessing={isCreatingPM}
        headerColor="bg-blue-500"
      />
    </div>
  );
};

export default PMSchedulePage;
