
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample data
const initialTasks = [
  {
    id: '1',
    taskCode: 'T-001',
    taskName: 'Inspect Bearings',
    discipline: 'Mechanical',
    counter: 12,
  },
  {
    id: '2',
    taskCode: 'T-002',
    taskName: 'Check Oil Levels',
    discipline: 'Mechanical',
    counter: 24,
  },
  {
    id: '3',
    taskCode: 'T-003',
    taskName: 'Test Pressure Relief Valves',
    discipline: 'Instrumentation',
    counter: 8,
  },
  {
    id: '4',
    taskCode: 'T-004',
    taskName: 'Calibrate Flow Meters',
    discipline: 'Instrumentation',
    counter: 16,
  },
  {
    id: '5',
    taskCode: 'T-005',
    taskName: 'Inspect Electrical Connections',
    discipline: 'Electrical',
    counter: 6,
  },
  {
    id: '6',
    taskCode: 'T-006',
    taskName: 'Replace Air Filters',
    discipline: 'HVAC',
    counter: 20,
  },
  {
    id: '7',
    taskCode: 'T-007',
    taskName: 'Check Valve Operations',
    discipline: 'Piping',
    counter: 15,
  },
];

const TaskLibraryPage: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    taskCode: '',
    taskName: '',
    discipline: '',
    counter: 0,
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${tasks.length + 1}`,
      taskCode: `T-${String(tasks.length + 1).padStart(3, '0')}`,
      taskName: '',
      discipline: '',
      counter: 0,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'counter' ? parseInt(value) || 0 : value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setTasks(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setTasks(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'taskCode', header: 'Task Code', accessorKey: 'taskCode' },
    { id: 'taskName', header: 'Task Name', accessorKey: 'taskName' },
    { id: 'discipline', header: 'Discipline', accessorKey: 'discipline' },
    { id: 'counter', header: 'Counter', accessorKey: 'counter' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Task Library" 
        onAddNew={handleAddNew}
        addNewLabel="+ New Task"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={tasks}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>
            <DialogDescription>
              Fill in the task details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taskCode">Task Code</Label>
                <Input
                  id="taskCode"
                  name="taskCode"
                  value={formData.taskCode}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="counter">Counter</Label>
                <Input
                  id="counter"
                  name="counter"
                  type="number"
                  value={formData.counter}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="taskName">Task Name</Label>
                <Input
                  id="taskName"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="discipline">Discipline</Label>
                <Select
                  name="discipline"
                  value={formData.discipline}
                  onValueChange={(value) => handleSelectChange('discipline', value)}
                >
                  <SelectTrigger id="discipline">
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Instrumentation">Instrumentation</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Piping">Piping</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                  </SelectContent>
                </Select>
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

export default TaskLibraryPage;
