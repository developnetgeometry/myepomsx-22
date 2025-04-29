
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

const PMSchedulePage: React.FC = () => {
  // Define columns for the empty table
  const columns: Column[] = [
    { id: 'pmNo', header: 'PM No', accessorKey: 'pmNo' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'asset', header: 'Asset', accessorKey: 'asset' },
    { id: 'frequency', header: 'Frequency', accessorKey: 'frequency' },
    { id: 'nextDueDate', header: 'Next Due Date', accessorKey: 'nextDueDate' },
    { id: 'status', header: 'Status', accessorKey: 'status' },
  ];
  
  // Empty data array for initial state
  const [pmSchedules, setPmSchedules] = useState<any[]>([]);
  
  // State for selected date range
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  });

  const handleSearch = () => {
    console.log(`Searching PM schedules from ${startDate} to ${endDate}`);
    // In a real application, this would fetch data based on the date range
  };

  const handleGenerateSchedule = () => {
    console.log('Generating PM schedule');
    // In a real application, this would trigger PM schedule generation
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
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSearch}>
            Search
          </Button>
          <Button variant="outline" onClick={handleGenerateSchedule}>
            Generate Schedule
          </Button>
        </div>
      </div>
      
      <DataTable 
        columns={columns}
        data={pmSchedules}
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
