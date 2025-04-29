
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import StatusBadge from '@/components/shared/StatusBadge';
import { Database } from 'lucide-react';

// Sample data
const initialFrequencies = [
  {
    id: '1',
    frequencyCode: 'D',
    label: 'Daily',
    intervalValue: '1',
    unit: 'Day',
    status: 'Active',
  },
  {
    id: '2',
    frequencyCode: 'W',
    label: 'Weekly',
    intervalValue: '7',
    unit: 'Day',
    status: 'Active',
  },
  {
    id: '3',
    frequencyCode: 'M',
    label: 'Monthly',
    intervalValue: '1',
    unit: 'Month',
    status: 'Active',
  },
  {
    id: '4',
    frequencyCode: 'Q',
    label: 'Quarterly',
    intervalValue: '3',
    unit: 'Month',
    status: 'Active',
  },
  {
    id: '5',
    frequencyCode: 'Y',
    label: 'Yearly',
    intervalValue: '1',
    unit: 'Year',
    status: 'Active',
  },
  {
    id: '6',
    frequencyCode: '2Y',
    label: 'Bi-Yearly',
    intervalValue: '2',
    unit: 'Year',
    status: 'Inactive',
  },
];

const FrequencySetupPage: React.FC = () => {
  const [frequencies, setFrequencies] = useState(initialFrequencies);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    frequencyCode: '',
    label: '',
    intervalValue: '',
    unit: '',
    status: 'Active',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${frequencies.length + 1}`,
      frequencyCode: '',
      label: '',
      intervalValue: '',
      unit: '',
      status: 'Active',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setIsEditMode(true);
    setFormData({
      ...row
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setFrequencies(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setFrequencies(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'frequencyCode', header: 'Code', accessorKey: 'frequencyCode' },
    { id: 'label', header: 'Label', accessorKey: 'label' },
    { id: 'intervalValue', header: 'Interval Value', accessorKey: 'intervalValue' },
    { id: 'unit', header: 'Unit', accessorKey: 'unit' },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Frequency Setup" 
        subtitle="Configure maintenance frequencies for scheduling"
        icon={<Database className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ New Frequency"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={frequencies}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Frequency' : 'Add New Frequency'}
            </DialogTitle>
            <DialogDescription>
              Fill in the frequency details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequencyCode">Frequency Code</Label>
                <Input
                  id="frequencyCode"
                  name="frequencyCode"
                  value={formData.frequencyCode}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., D, W, M, Q, Y"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Daily, Weekly, Monthly"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="intervalValue">Interval Value</Label>
                <Input
                  id="intervalValue"
                  name="intervalValue"
                  value={formData.intervalValue}
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="">Select a unit</option>
                  <option value="Hour">Hour</option>
                  <option value="Day">Day</option>
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FrequencySetupPage;
