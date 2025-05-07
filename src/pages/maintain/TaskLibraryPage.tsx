import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, List, Save, Plus, Pencil, X, Search, Filter, Copy } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Sample data
const initialTasks = [{
  id: '1',
  taskCode: 'T-001',
  taskName: 'Inspect Bearings',
  discipline: 'Mechanical',
  counter: 12,
  noManPower: 2,
  manHour: 4,
  totalHourRequire: 8,
  active: true,
  taskList: [],
  updatedAt: '2025-04-10',
  itemCount: 24
}, {
  id: '2',
  taskCode: 'T-002',
  taskName: 'Check Oil Levels',
  discipline: 'Mechanical',
  counter: 24,
  noManPower: 1,
  manHour: 2,
  totalHourRequire: 2,
  active: true,
  taskList: [],
  updatedAt: '2025-03-22',
  itemCount: 18
}, {
  id: '3',
  taskCode: 'T-003',
  taskName: 'Test Pressure Relief Valves',
  discipline: 'Instrumentation',
  counter: 8,
  noManPower: 2,
  manHour: 3,
  totalHourRequire: 6,
  active: true,
  taskList: [],
  updatedAt: '2025-04-05',
  itemCount: 12
}, {
  id: '4',
  taskCode: 'T-004',
  taskName: 'Calibrate Flow Meters',
  discipline: 'Instrumentation',
  counter: 16,
  noManPower: 1,
  manHour: 4,
  totalHourRequire: 4,
  active: true,
  taskList: [],
  updatedAt: '2025-02-18',
  itemCount: 20
}, {
  id: '5',
  taskCode: 'T-005',
  taskName: 'Inspect Electrical Connections',
  discipline: 'Electrical',
  counter: 6,
  noManPower: 1,
  manHour: 2,
  totalHourRequire: 2,
  active: true,
  taskList: [],
  updatedAt: '2025-04-15',
  itemCount: 16
}, {
  id: '6',
  taskCode: 'T-006',
  taskName: 'Replace Air Filters',
  discipline: 'HVAC',
  counter: 20,
  noManPower: 2,
  manHour: 1,
  totalHourRequire: 2,
  active: true,
  taskList: [],
  updatedAt: '2025-03-10',
  itemCount: 15
}, {
  id: '7',
  taskCode: 'T-007',
  taskName: 'Check Valve Operations',
  discipline: 'Piping',
  counter: 15,
  noManPower: 1,
  manHour: 3,
  totalHourRequire: 3,
  active: true,
  taskList: [],
  updatedAt: '2025-02-25',
  itemCount: 22
}];

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
  updatedAt?: string;
  itemCount?: number;
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
  const [activeTab, setActiveTab] = useState("templates");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const {
    toast
  } = useToast();
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
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'counter' || name === 'noManPower' || name === 'manHour' || name === 'totalHourRequire' ? parseInt(value) || 0 : value
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleActiveChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      active: checked
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      setTasks(prev => prev.map(item => item.id === formData.id ? formData : item));
    } else {
      setTasks(prev => [...prev, formData]);
    }
    setIsDialogOpen(false);
  };
  const handleRowClick = (row: any) => {
    navigate(`/maintain/task-library/${row.id}`);
  };
  const handleAddTaskListRow = () => {
    const nextSeq = formData.taskList.length > 0 ? Math.max(...formData.taskList.map(item => item.seq)) + 1 : 1;
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
    setSelectedTaskListRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  // Function to handle task duplication
  const handleDuplicate = (task: Task) => {
    const newTaskId = `${parseInt(tasks[tasks.length - 1].id) + 1}`;
    const newTaskCode = `T-${String(parseInt(newTaskId)).padStart(3, '0')}`;
    const duplicatedTask: Task = {
      ...task,
      id: newTaskId,
      taskCode: newTaskCode,
      taskName: `${task.taskName} (Copy)`,
      taskList: task.taskList.map(item => ({
        ...item,
        id: `${newTaskId}-task-${item.seq}`
      })),
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [...prev, duplicatedTask]);
    toast({
      title: "Task Duplicated",
      description: `${task.taskName} has been duplicated successfully.`,
      duration: 3000
    });
  };

  // Function to confirm task deletion
  const confirmDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  // Function to handle task deletion
  const handleDelete = () => {
    if (taskToDelete) {
      const taskName = tasks.find(t => t.id === taskToDelete)?.taskName;
      setTasks(prev => prev.filter(task => task.id !== taskToDelete));
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
      toast({
        title: "Task Deleted",
        description: `${taskName} has been deleted successfully.`,
        variant: "destructive",
        duration: 3000
      });
    }
  };
  const renderTaskCard = (task: Task) => <Card key={task.id} className="w-full hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-sm text-gray-500 mb-1">{task.discipline}</div>
            <CardTitle className="text-lg font-medium">{task.taskName}</CardTitle>
          </div>
          <div className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">
            {task.taskCode}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-600 mb-3">
          {task.itemCount} items
        </div>
        <div className="text-xs text-gray-400">
          Last updated: {task.updatedAt}
        </div>
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600 hover:text-gray-900" onClick={e => {
          e.stopPropagation();
          handleEdit(task);
        }}>
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-600 hover:text-gray-900" onClick={e => {
            e.stopPropagation();
            handleDuplicate(task);
          }}>
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-red-600 hover:text-red-800 hover:bg-red-50" onClick={e => {
            e.stopPropagation();
            confirmDelete(task.id);
          }}>
              <X className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Task Library</h1>
        <p className="text-muted-foreground">Standard procedures and inspection checklists</p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search checklists..." className="pl-9 w-full" />
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Asset Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Asset Types</SelectItem>
              <SelectItem value="mechanical">Mechanical</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="instrumentation">Instrumentation</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleAddNew} className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Create Tasklist
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="templates" className="flex items-center">
            <List className="mr-2 h-4 w-4" />
            Checklist Templates
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center">
            <Check className="mr-2 h-4 w-4" />
            Active Checklists
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center">
            <Check className="mr-2 h-4 w-4" />
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => <div key={task.id} onClick={() => handleRowClick(task)} className="cursor-pointer">
                {renderTaskCard(task)}
              </div>)}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="text-center py-10 text-gray-500">
            No active checklists found.
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="text-center py-10 text-gray-500">
            No completed checklists found.
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Task</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsDialogOpen(false)}>
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
                <Input id="taskCode" name="taskCode" value={formData.taskCode} onChange={handleInputChange} readOnly={isEditMode} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="counter">Counter</Label>
                <Input id="counter" name="counter" type="number" value={formData.counter} onChange={handleInputChange} />
              </div>
              
              <div className="space-y-2 col-span-2">
                <div className="relative">
                  <div className="absolute left-0 top-4 w-1 h-1 bg-red-500"></div>
                  <Label htmlFor="taskName" className="pl-3">Task Name</Label>
                </div>
                <Input id="taskName" name="taskName" value={formData.taskName} onChange={handleInputChange} required />
              </div>
              
              <div className="space-y-2 col-span-2">
                <div className="relative">
                  <div className="absolute left-0 top-4 w-1 h-1 bg-red-500"></div>
                  <Label htmlFor="discipline" className="pl-3">Discipline</Label>
                </div>
                <Select name="discipline" value={formData.discipline} onValueChange={value => handleSelectChange('discipline', value)}>
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
                <Input id="noManPower" name="noManPower" type="number" value={formData.noManPower} onChange={handleInputChange} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manHour">Man Hour</Label>
                <Input id="manHour" name="manHour" type="number" value={formData.manHour} onChange={handleInputChange} />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="totalHourRequire">Total Hour Require</Label>
                <Input id="totalHourRequire" name="totalHourRequire" type="number" value={formData.totalHourRequire} onChange={handleInputChange} />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="active" checked={formData.active} onCheckedChange={handleActiveChange} />
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
                        <Checkbox checked={formData.taskList.length > 0 && selectedTaskListRows.length === formData.taskList.length} onCheckedChange={checked => {
                        if (checked) {
                          setSelectedTaskListRows(formData.taskList.map(item => item.id));
                        } else {
                          setSelectedTaskListRows([]);
                        }
                      }} />
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                      <TableHead className="w-24">Seq</TableHead>
                      <TableHead>Task List</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.taskList.map(item => <TableRow key={item.id} className={selectedTaskListRows.includes(item.id) ? "bg-muted/30" : ""}>
                        <TableCell>
                          <Checkbox checked={selectedTaskListRows.includes(item.id)} onCheckedChange={() => toggleTaskListRowSelection(item.id)} />
                        </TableCell>
                        <TableCell>
                          <List className="h-4 w-4" />
                        </TableCell>
                        <TableCell>{item.seq}</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>)}
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
                {isEditMode ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};
export default TaskLibraryPage;
