import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskService } from '@/services/taskService';
import { Task, TaskDetail, TaskDetailCreate, TaskDetailUpdate, TaskUpdate } from '@/types/maintain';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, Pencil, Save, XCircle } from 'lucide-react';
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

const TaskLibraryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Partial<Task> | null>(null);
  const [editingDetail, setEditingDetail] = useState<TaskDetailUpdate | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        toast({
          title: "Error",
          description: "Task ID is required",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      try {
        const taskData = await taskService.getTaskWithDetails(parseInt(id));
        setTask(taskData);
      } catch (error) {
        console.error("Error fetching task:", error);
        toast({
          title: "Error",
          description: "Failed to load task",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleTaskUpdate = async () => {
    if (!editingTask || !task) return;

    try {
      const updatedTask: TaskUpdate = {
        id: task.id,
        task_name: editingTask.task_name,
        task_code: editingTask.task_code,
        description: editingTask.description,
        discipline_id: editingTask.discipline_id,
        is_active: editingTask.is_active,
        updated_by: "current-user" // Replace with actual user ID
      };

      await taskService.updateTask(updatedTask);
      setIsEditing(false);
      setEditingTask(null);
      // Refresh data
      const updatedTaskData = await taskService.getTaskWithDetails(task.id);
      setTask(updatedTaskData);
      
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (task) {
      setEditingTask({ ...task });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingTask(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingTask) return;
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const [newDetail, setNewDetail] = useState<TaskDetailCreate>({
    task_id: parseInt(id!),
    sequence: 1,
    task_list: "",
    created_by: "current-user",
    updated_by: "current-user"
  });

  const handleNewDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDetail({ ...newDetail, [name]: value });
  };

  const handleDetailEdit = (detail: TaskDetail) => {
    const detailUpdate: TaskDetailUpdate = {
      id: detail.id,
      task_id: detail.task_id,
      sequence: detail.sequence,
      task_list: detail.task_list,
      updated_by: "current-user"
    };
    setEditingDetail(detailUpdate);
  };

  const handleDetailUpdate = async () => {
    if (!editingDetail) return;

    try {
      await taskService.updateTaskDetail(editingDetail);
      setEditingDetail(null);
      
      // Refresh data
      const updatedTask = await taskService.getTaskWithDetails(parseInt(id!));
      setTask(updatedTask);
      
      toast({
        title: "Success",
        description: "Task detail updated successfully",
      });
    } catch (error) {
      console.error("Error updating task detail:", error);
      toast({
        title: "Error",
        description: "Failed to update task detail",
        variant: "destructive",
      });
    }
  };

  const handleDetailInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingDetail) return;
    const { name, value } = e.target;
    setEditingDetail({ ...editingDetail, [name]: value });
  };

  const handleAddDetail = async () => {
    if (!newDetail.task_list.trim()) return;

    try {
      const detailToAdd: TaskDetailCreate = {
        task_id: parseInt(id!),
        sequence: newDetail.sequence,
        task_list: newDetail.task_list,
        created_by: "current-user",
        updated_by: "current-user"
      };

      await taskService.addDetailsToTask(detailToAdd);
      
      // Reset form
      setNewDetail({
        task_id: parseInt(id!),
        sequence: 1,
        task_list: "",
        created_by: "current-user",
        updated_by: "current-user"
      });
      
      // Refresh data
      const updatedTask = await taskService.getTaskWithDetails(parseInt(id!));
      setTask(updatedTask);
      
      toast({
        title: "Success",
        description: "Task detail added successfully",
      });
    } catch (error) {
      console.error("Error adding task detail:", error);
      toast({
        title: "Error",
        description: "Failed to add task detail",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDetail = async (detailId: number) => {
    try {
      await taskService.deleteTaskDetail(detailId);
      
      // Refresh data
      const updatedTask = await taskService.getTaskWithDetails(parseInt(id!));
      setTask(updatedTask);
      
      toast({
        title: "Success",
        description: "Task detail deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task detail:", error);
      toast({
        title: "Error",
        description: "Failed to delete task detail",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate('/maintain/task-library')}>Back to Task Library</Button>
      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>View and manage task details</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid gap-4">
              <div>
                <Label htmlFor="task_name">Task Name</Label>
                <Input
                  type="text"
                  id="task_name"
                  name="task_name"
                  value={editingTask.task_name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="task_code">Task Code</Label>
                <Input
                  type="text"
                  id="task_code"
                  name="task_code"
                  value={editingTask.task_code || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editingTask.description || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleTaskUpdate}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-semibold">Task Name</h3>
                <p>{task.task_name}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Task Code</h3>
                <p>{task.task_code}</p>
              </div>
              {task.description && (
                <div>
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p>{task.description}</p>
                </div>
              )}
              <Button onClick={handleEditClick}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Task
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>Manage task details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sequence</TableHead>
                <TableHead>Task List</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {task.task_details && task.task_details.map((detail) => (
                <TableRow key={detail.id}>
                  <TableCell>{detail.sequence}</TableCell>
                  <TableCell>
                    {editingDetail?.id === detail.id ? (
                      <Input
                        type="text"
                        name="task_list"
                        value={editingDetail.task_list}
                        onChange={handleDetailInputChange}
                      />
                    ) : (
                      detail.task_list
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingDetail?.id === detail.id ? (
                      <>
                        <Button onClick={handleDetailUpdate}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="secondary" onClick={() => setEditingDetail(null)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" onClick={() => handleDetailEdit(detail)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="ghost" onClick={() => handleDeleteDetail(detail.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Add New Detail</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="sequence">Sequence</Label>
                <Input
                  type="number"
                  id="sequence"
                  name="sequence"
                  value={newDetail.sequence}
                  onChange={handleNewDetailChange}
                />
              </div>
              <div>
                <Label htmlFor="task_list">Task List</Label>
                <Textarea
                  id="task_list"
                  name="task_list"
                  value={newDetail.task_list}
                  onChange={handleNewDetailChange}
                />
              </div>
              <Button onClick={handleAddDetail}>
                <Plus className="h-4 w-4 mr-2" />
                Add Detail
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskLibraryDetailPage;
