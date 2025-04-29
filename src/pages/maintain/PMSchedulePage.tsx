
import React, { useState } from 'react';
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
  // State management
  const [pmSchedules, setPmSchedules] = useState<PMSchedule[]>([]);
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  });
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  
  // Loading states
  const { isLoading: isSearching, withLoading: withSearchLoading } = useLoadingState();
  const { isLoading: isGenerating, withLoading: withGenerateLoading } = useLoadingState();
  const { isLoading: isDeleting, withLoading: withDeleteLoading } = useLoadingState();
  
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
    if (selectedAsset) {
      const assetName = assetOptions.find(opt => opt.value === selectedAsset)?.label || "";
      return schedules.filter(schedule => schedule.asset === assetName);
    }
    
    return schedules;
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="PM Schedule" 
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <div className="bg-white p-4 rounded-md border shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Schedule Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
            <div className="relative">
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={isSearching || isGenerating}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
            <div className="relative">
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isSearching || isGenerating}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="asset" className="text-sm font-medium">Asset (Optional)</label>
            <Select 
              value={selectedAsset}
              onValueChange={setSelectedAsset}
              disabled={isSearching || isGenerating}
            >
              <SelectTrigger id="asset">
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Assets</SelectItem>
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
          
          <AlertDialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                disabled={isSearching || isGenerating}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Generate Schedule
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
          
          {pmSchedules.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleExport}
              disabled={isSearching || isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Export
            </Button>
          )}
        </div>
      </div>
      
      <DataTable 
        columns={columns}
        data={pmSchedules}
        onDelete={handleDelete}
        onExport={pmSchedules.length > 0 ? handleExport : undefined}
      />
      
      {pmSchedules.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No PM schedules found. Use the search filters above or generate a new schedule.
          </p>
        </div>
      )}
    </div>
  );
};

export default PMSchedulePage;
