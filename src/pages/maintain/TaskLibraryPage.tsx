import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { taskService } from '@/services/taskService';
import { Task, DisciplineOption, TaskUpdate, TaskCreate } from '@/types/maintain';
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
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Column } from '@/pages/purchasing/DataTable';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface TaskData {
  id: number;
  task_code: string;
  task_name: string;
  discipline_id: number;
  is_active: boolean;
}

const TaskLibraryPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [disciplines, setDisciplines] = useState<DisciplineOption[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    task_code: '',
    task_name: '',
    discipline_id: 1,
    is_active: true,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchData = async () => {
    try {
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);

      const disciplinesData = await taskService.getDisciplineOptions();
      setDisciplines(disciplinesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load tasks and disciplines",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    await fetchData();
  };

  const handleUpdateTask = async (taskData: any) => {
    try {
      const updatedTask: TaskUpdate = {
        id: taskData.id,
        task_name: taskData.task_name,
        task_code: taskData.task_code,
        discipline_id: taskData.discipline_id,
        is_active: taskData.is_active,
        updated_by: "current-user"
      };

      await taskService.updateTask(updatedTask);
      
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
      
      // Refresh data
      await refetch();
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error", 
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleAddTask = async (taskData: any) => {
    try {
      const newTask: TaskCreate = {
        task_name: taskData.task_name,
        task_code: taskData.task_code,
        discipline_id: taskData.discipline_id,
        is_active: taskData.is_active,
        created_by: "current-user",
        updated_by: "current-user"
      };

      await taskService.createTask(newTask);
      
      toast({
        title: "Success",
        description: "Task created successfully",
      });
      
      // Refresh data
      await refetch();
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error",
        description: "Failed to create task", 
        variant: "destructive",
      });
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.task_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.task_code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDeleteDialog = (id: number) => {
    setIsDeleting(true);
    setTaskToDelete(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleting(false);
    setTaskToDelete(null);
  };

  const handleDeleteTask = async () => {
    if (taskToDelete === null) return;

    try {
      await taskService.deleteTask(taskToDelete);
      
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
      
      // Refresh data
      await refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    } finally {
      handleCloseDeleteDialog();
    }
  };

  const columns: Column[] = [
    {
      id: 'task_code',
      header: 'Task Code',
      accessorKey: 'task_code',
    },
    {
      id: 'task_name', 
      header: 'Task Name',
      accessorKey: 'task_name',
    },
    {
      id: 'discipline',
      header: 'Discipline',
      accessorKey: 'discipline_id',
      cell: (value) => {
        const discipline = disciplines.find(d => d.id === value);
        return discipline ? discipline.name : '-';
      }
    },
    {
      id: 'is_active',
      header: 'Active',
      accessorKey: 'is_active',
      cell: (value) => (value ? 'Yes' : 'No'),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      cell: (value) => (
        <div className="flex space-x-2">
          <Link to={`/maintain/task-library/${value}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsEditing(true);
              const taskToEdit = tasks.find(task => task.id === value);
              setEditingTask(taskToEdit || null);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleOpenDeleteDialog(value)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            Task Library
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task Library</h1>
        <Button onClick={() => setIsAdding(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Manage and view tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {columns.map((column) => (
                  <TableHead key={column.id}>{column.header}</TableHead>
                ))}
              </TableHeader>
              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.task_code}</TableCell>
                    <TableCell>{task.task_name}</TableCell>
                    <TableCell>
                      {disciplines.find(d => d.id === task.discipline_id)?.name || '-'}
                    </TableCell>
                    <TableCell>{task.is_active ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Link to={`/maintain/task-library/${task.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditing(true);
                            setEditingTask(task);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleOpenDeleteDialog(task.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Task</h3>
              <div className="mt-2 px-7 py-3">
                <Label htmlFor="task_code">Task Code</Label>
                <Input
                  type="text"
                  id="task_code"
                  value={newTask.task_code}
                  onChange={(e) => setNewTask({ ...newTask, task_code: e.target.value })}
                  className="mt-1"
                />
                <Label htmlFor="task_name" className="mt-4">Task Name</Label>
                <Input
                  type="text"
                  id="task_name"
                  value={newTask.task_name}
                  onChange={(e) => setNewTask({ ...newTask, task_name: e.target.value })}
                  className="mt-1"
                />
                <Label htmlFor="discipline_id" className="mt-4">Discipline</Label>
                <Select
                  value={newTask.discipline_id.toString()}
                  onValueChange={(value) => setNewTask({ ...newTask, discipline_id: parseInt(value) })}
                >
                  <SelectTrigger id="discipline_id">
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplines.map((discipline) => (
                      <SelectItem key={discipline.id} value={discipline.id.toString()}>
                        {discipline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4 flex items-center">
                  <Input
                    type="checkbox"
                    id="is_active"
                    checked={newTask.is_active}
                    onChange={(e) => setNewTask({ ...newTask, is_active: e.target.checked })}
                    className="mr-2"
                  />
                  <Label htmlFor="is_active">Is Active</Label>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <Button
                  onClick={() => {
                    handleAddTask(newTask);
                    setIsAdding(false);
                    setNewTask({
                      task_code: '',
                      task_name: '',
                      discipline_id: 1,
                      is_active: true,
                    });
                  }}
                  className="mr-2"
                >
                  Add
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditing && editingTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Task</h3>
              <div className="mt-2 px-7 py-3">
                <Label htmlFor="edit_task_code">Task Code</Label>
                <Input
                  type="text"
                  id="edit_task_code"
                  value={editingTask.task_code}
                  onChange={(e) => setEditingTask({ ...editingTask, task_code: e.target.value })}
                  className="mt-1"
                />
                <Label htmlFor="edit_task_name" className="mt-4">Task Name</Label>
                <Input
                  type="text"
                  id="edit_task_name"
                  value={editingTask.task_name}
                  onChange={(e) => setEditingTask({ ...editingTask, task_name: e.target.value })}
                  className="mt-1"
                />
                <Label htmlFor="edit_discipline_id" className="mt-4">Discipline</Label>
                <Select
                  value={editingTask.discipline_id.toString()}
                  onValueChange={(value) => setEditingTask({ ...editingTask, discipline_id: parseInt(value) })}
                >
                  <SelectTrigger id="edit_discipline_id">
                    <SelectValue placeholder="Select discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplines.map((discipline) => (
                      <SelectItem key={discipline.id} value={discipline.id.toString()}>
                        {discipline.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4 flex items-center">
                  <Input
                    type="checkbox"
                    id="edit_is_active"
                    checked={editingTask.is_active}
                    onChange={(e) => setEditingTask({ ...editingTask, is_active: e.target.checked })}
                    className="mr-2"
                  />
                  <Label htmlFor="edit_is_active">Is Active</Label>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <Button
                  onClick={() => {
                    handleUpdateTask(editingTask);
                    setIsEditing(false);
                    setEditingTask(null);
                  }}
                  className="mr-2"
                >
                  Update
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingTask(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Task Confirmation Dialog */}
      <AlertDialog open={isDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete this task?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDeleteDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TaskLibraryPage;
