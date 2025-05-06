
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, List, Save, Plus, Pencil, X } from "lucide-react";

// Sample data
const initialTasks = [
  {
    id: '1',
    taskCode: 'T-001',
    taskName: 'Inspect Bearings',
    discipline: 'Mechanical',
    counter: 12,
    noManPower: 2,
    manHour: 4,
    totalHourRequire: 8,
    active: true,
    taskList: []
  },
  {
    id: '2',
    taskCode: 'T-002',
    taskName: 'Check Oil Levels',
    discipline: 'Mechanical',
    counter: 24,
    noManPower: 1,
    manHour: 2,
    totalHourRequire: 2,
    active: true,
    taskList: []
  },
  {
    id: '3',
    taskCode: 'T-003',
    taskName: 'Test Pressure Relief Valves',
    discipline: 'Instrumentation',
    counter: 8,
    noManPower: 2,
    manHour: 3,
    totalHourRequire: 6,
    active: true,
    taskList: []
  },
  {
    id: '4',
    taskCode: 'T-004',
    taskName: 'Calibrate Flow Meters',
    discipline: 'Instrumentation',
    counter: 16,
    noManPower: 1,
    manHour: 4,
    totalHourRequire: 4,
    active: true,
    taskList: []
  },
  {
    id: '5',
    taskCode: 'T-005',
    taskName: 'Inspect Electrical Connections',
    discipline: 'Electrical',
    counter: 6,
    noManPower: 1,
    manHour: 2,
    totalHourRequire: 2,
    active: true,
    taskList: []
  },
  {
    id: '6',
    taskCode: 'T-006',
    taskName: 'Replace Air Filters',
    discipline: 'HVAC',
    counter: 20,
    noManPower: 2,
    manHour: 1,
    totalHourRequire: 2,
    active: true,
    taskList: []
  },
  {
    id: '7',
    taskCode: 'T-007',
    taskName: 'Check Valve Operations',
    discipline: 'Piping',
    counter: 15,
    noManPower: 1,
    manHour: 3,
    totalHourRequire: 3,
    active: true,
    taskList: []
  },
];

// Interface for Task List items
interface TaskListItem {
  id: string;
  seq: number;
  description: string;
}

// Interface for Task
interface Task {
  id: string;
  taskCode: string;
  taskName: string;
  discipline: string;
  counter: number;
  noManPower: number;
  manHour: number;
  totalHourRequire: number;
  active: boolean;
  taskList: TaskListItem[];
}

const TaskLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Task>({
    id: '',
    taskCode: '',
    taskName: '',
    discipline: 'SOP',
    counter: 0,
    noManPower: 0,
    manHour: 0,
    totalHourRequire: 0,
    active: true,
    taskList: []
  });
  
  const [selectedTaskListRows, setSelectedTaskListRows] = useState<string[]>([]);
  const [newTaskListItem, setNewTaskListItem] = useState<TaskListItem>({
    id: "1",
    seq: 1,
    description: ""
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${tasks.length + 1}`,
      taskCode: `T-${String(tasks.length + 1).padStart(3, '0')}`,
      taskName: '',
      discipline: 'SOP',
      counter: 0,
      noManPower: 0,
      manHour: 0,
      totalHourRequire: 0,
      active: true,
      taskList: []
    });
    setSelectedTaskListRows([]);
    setIsDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setIsEditMode(true);
    setFormData({
      ...row
    });
    setSelectedTaskListRows([]);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'counter' || name === 'noManPower' || name === 'manHour' || name === 'totalHourRequire' 
        ? parseInt(value) || 0 
        : value 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleActiveChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, active: checked }));
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

  const handleRowClick = (row: any) => {
    navigate(`/maintain/task-library/${row.id}`);
  };

  const handleAddTaskListRow = () => {
    const nextSeq = formData.taskList.length > 0 
      ? Math.max(...formData.taskList.map(item => item.seq)) + 1
      : 1;
      
    const newItem = {
      id: `${formData.id}-task-${nextSeq}`,
      seq: nextSeq,
      description: ""
    };
    
    setFormData(prev => ({
      ...prev,
      taskList: [...prev.taskList, newItem]
    }));
    
    setNewTaskListItem({
      id: `${formData.id}-task-${nextSeq + 1}`,
      seq: nextSeq + 1,
      description: ""
    });
  };

  const toggleTaskListRowSelection = (id: string) => {
    setSelectedTaskListRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
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
        onRowClick={handleRowClick}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Task</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-0 top-4 w-1 h-1 bg-red-500"></div>
                  <Label htmlFor="taskCode" className="pl-3">Task Code</Label>
                </div>
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
                <div className="relative">
                  <div className="absolute left-0 top-4 w-1 h-1 bg-red-500"></div>
                  <Label htmlFor="taskName" className="pl-3">Task Name</Label>
                </div>
                <Input
                  id="taskName"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <div className="relative">
                  <div className="absolute left-0 top-4 w-1 h-1 bg-red-500"></div>
                  <Label htmlFor="discipline" className="pl-3">Discipline</Label>
                </div>
                <Select
                  name="discipline"
                  value={formData.discipline}
                  onValueChange={(value) => handleSelectChange('discipline', value)}
                >
                  <SelectTrigger id="discipline">
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SOP">SOP</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                    <SelectItem value="Electrical">Electrical</SelectItem>
                    <SelectItem value="Instrumentation">Instrumentation</SelectItem>
                    <SelectItem value="HVAC">HVAC</SelectItem>
                    <SelectItem value="Piping">Piping</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="noManPower">No Man Power</Label>
                <Input
                  id="noManPower"
                  name="noManPower"
                  type="number"
                  value={formData.noManPower}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manHour">Man Hour</Label>
                <Input
                  id="manHour"
                  name="manHour"
                  type="number"
                  value={formData.manHour}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="totalHourRequire">Total Hour Require</Label>
                <Input
                  id="totalHourRequire"
                  name="totalHourRequire"
                  type="number"
                  value={formData.totalHourRequire}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="active" 
                  checked={formData.active}
                  onCheckedChange={handleActiveChange}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex gap-2 mb-4">
                <Button type="button" variant="outline" size="sm" onClick={() => console.log("Edit clicked")}>
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button type="button" variant="default" size="sm" className="bg-blue-600">
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={handleAddTaskListRow}>
                  <Plus className="h-4 w-4 mr-2" /> Add Row
                </Button>
              </div>
              
              <div className="border rounded">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={
                            formData.taskList.length > 0 && 
                            selectedTaskListRows.length === formData.taskList.length
                          }
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTaskListRows(formData.taskList.map(item => item.id));
                            } else {
                              setSelectedTaskListRows([]);
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                      <TableHead className="w-24">Seq</TableHead>
                      <TableHead>Task List</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.taskList.map((item) => (
                      <TableRow key={item.id} className={selectedTaskListRows.includes(item.id) ? "bg-muted/30" : ""}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedTaskListRows.includes(item.id)}
                            onCheckedChange={() => toggleTaskListRowSelection(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <List className="h-4 w-4" />
                        </TableCell>
                        <TableCell>{item.seq}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <div>{selectedTaskListRows.length} rows selected</div>
                <div>Total {formData.taskList.length}</div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskLibraryPage;
