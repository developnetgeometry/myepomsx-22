
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, Save, X, Trash2 } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useLoadingState } from '@/hooks/use-loading-state';
import { formatCurrency } from '@/utils/formatters';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TaskDetail {
  id: number;
  description: string;
  isEditing?: boolean;
}

const PMScheduleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading: isSaving, withLoading: withSavingLoading } = useLoadingState();
  const { isLoading: isDeleting, withLoading: withDeletingLoading } = useLoadingState();
  
  // Form modification tracking
  const [isFormModified, setIsFormModified] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('task-detail');
  
  const [pmDetail, setPmDetail] = useState({
    pmNo: 'PM-2024-001',
    pmDescription: 'Monthly Check on Compressor',
    packageNo: 'PKG-COMP-002',
    assets: 'EXCHANGER, POUR POINT DEPRESSANT HEAT',
    tasks: 'TASK-COMP-01 | Lubrication Check',
    frequency: 'Monthly',
    workCenter: 'Mechanical Work Center',
    status: 'Active',
    manHour: 4,
    manPower: 2,
    dueDate: '10/06/2025',
    duration: 4
  });

  const [taskDetails, setTaskDetails] = useState<TaskDetail[]>([
    { id: 0, description: 'Visual inspection' },
    { id: 1, description: 'Lubricate moving parts' },
    { id: 2, description: 'Tighten loose fittings' }
  ]);
  
  // Make a copy of the original data for cancellation purposes
  const [originalTaskDetails, setOriginalTaskDetails] = useState<TaskDetail[]>([]);
  
  useEffect(() => {
    // Store a deep copy of the original data when the component mounts
    setOriginalTaskDetails(JSON.parse(JSON.stringify(taskDetails)));
    
    // Simulate loading data from API when ID changes
    const loadData = async () => {
      // In a real implementation, this would fetch data from the API
      console.log(`Loading PM Schedule with ID: ${id}`);
    };
    
    loadData();
  }, [id]);

  // Handle editing task detail row
  const startEditing = (id: number) => {
    setTaskDetails(taskDetails.map(task => 
      task.id === id ? { ...task, isEditing: true } : task
    ));
    setIsFormModified(true);
  };

  const updateTaskDescription = (id: number, description: string) => {
    setTaskDetails(taskDetails.map(task => 
      task.id === id ? { ...task, description } : task
    ));
    setIsFormModified(true);
  };

  const stopEditing = (id: number) => {
    const updatedTasks = taskDetails.map(task => {
      if (task.id === id) {
        // Validate the description before saving
        if (!task.description || task.description.trim() === '') {
          toast.error("Task description cannot be empty");
          return task; // Keep in editing mode
        }
        return { ...task, isEditing: false };
      }
      return task;
    });
    
    setTaskDetails(updatedTasks);
  };

  // Handle adding new task
  const addTask = () => {
    const newId = taskDetails.length > 0 
      ? Math.max(...taskDetails.map(t => t.id)) + 1 
      : 0;
    
    setTaskDetails([
      ...taskDetails, 
      { 
        id: newId, 
        description: '', 
        isEditing: true 
      }
    ]);
    setIsFormModified(true);
  };
  
  // Handle deleting a task
  const promptDeleteTask = (id: number) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteTask = () => {
    if (taskToDelete !== null) {
      withDeletingLoading(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setTaskDetails(taskDetails.filter(task => task.id !== taskToDelete));
        setDeleteDialogOpen(false);
        setTaskToDelete(null);
        setIsFormModified(true);
        
        toast.success("Task deleted successfully");
      });
    }
  };

  // Handle saving changes
  const handleSave = () => {
    // Validate all tasks have descriptions before saving
    const hasEmptyTasks = taskDetails.some(task => !task.description || task.description.trim() === '');
    
    if (hasEmptyTasks) {
      toast.error("All tasks must have a description");
      return;
    }
    
    withSavingLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update all records to not be in editing mode
      setTaskDetails(taskDetails.map(task => ({ ...task, isEditing: false })));
      
      // Update the original data with the new version
      setOriginalTaskDetails(JSON.parse(JSON.stringify(taskDetails)));
      
      // Reset form modified flag
      setIsFormModified(false);
      
      // Show success message
      toast.success("PM Schedule saved successfully");
    });
  };
  
  // Handle applying changes (save without navigating away)
  const handleApplyChanges = () => {
    handleSave();
  };
  
  // Handle canceling changes
  const handleCancel = () => {
    if (isFormModified) {
      // Restore the original data
      setTaskDetails(JSON.parse(JSON.stringify(originalTaskDetails)));
      setIsFormModified(false);
      toast.info("Changes discarded");
    }
    
    // Navigate back to PM Schedule list
    navigate('/maintain/pm-schedule');
  };
  
  // Handle tab changes
  const handleTabChange = (value: string) => {
    // Check for unsaved changes in current tab if needed
    setActiveTab(value);
  };

  // Check if any row is currently being edited
  const hasEditingRows = taskDetails.some(task => task.isEditing);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="PM Schedule Detail" 
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/maintain/pm-schedule')} 
          className="flex items-center gap-2"
          disabled={isSaving}
        >
          <ArrowLeft className="h-4 w-4" /> Back to PM Schedule
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6 space-y-6">
          <h3 className="text-lg font-semibold text-blue-600 border-b pb-2">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">PM No</h4>
              <p className="text-base font-medium">{pmDetail.pmNo}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">PM Description</h4>
              <p className="text-base">{pmDetail.pmDescription}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Package No</h4>
              <p className="text-base">{pmDetail.packageNo}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Assets</h4>
              <p className="text-base">{pmDetail.assets}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Tasks</h4>
              <p className="text-base">{pmDetail.tasks}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Frequency</h4>
              <p className="text-base">{pmDetail.frequency}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Work Center</h4>
              <p className="text-base">{pmDetail.workCenter}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <StatusBadge status={pmDetail.status} />
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Man Hour</h4>
              <p className="text-base">{pmDetail.manHour}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Man Power</h4>
              <p className="text-base">{pmDetail.manPower}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
              <p className="text-base">{pmDetail.dueDate}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Duration</h4>
              <p className="text-base">{pmDetail.duration} Days</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="border-b w-full justify-start rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="task-detail"
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Task Detail
          </TabsTrigger>
          <TabsTrigger 
            value="service" 
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Service
          </TabsTrigger>
          <TabsTrigger 
            value="min-acceptance" 
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Min Acceptance Criteria
          </TabsTrigger>
          <TabsTrigger 
            value="checksheet" 
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Checksheet
          </TabsTrigger>
          <TabsTrigger 
            value="work-order" 
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Work Order
          </TabsTrigger>
          <TabsTrigger 
            value="additional-info" 
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Additional Info
          </TabsTrigger>
          <TabsTrigger 
            value="maintainable-group" 
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Maintainable Group
          </TabsTrigger>
          <TabsTrigger 
            value="plan" 
            className="py-2.5 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:font-medium data-[state=active]:text-blue-600"
          >
            Plan
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="task-detail" className="pt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-600">Task Detail</h3>
                <Button 
                  onClick={addTask} 
                  className="flex items-center gap-2"
                  disabled={isSaving || hasEditingRows}
                >
                  <Plus className="h-4 w-4" /> Add Row
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-[80px]">No</TableHead>
                      <TableHead>Action Description</TableHead>
                      <TableHead className="w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taskDetails.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.id}</TableCell>
                        <TableCell>
                          {task.isEditing ? (
                            <Input 
                              value={task.description} 
                              onChange={(e) => updateTaskDescription(task.id, e.target.value)} 
                              className="w-full"
                              autoFocus
                              placeholder="Enter task description"
                            />
                          ) : (
                            task.description || <span className="text-gray-400">No description</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            {task.isEditing ? (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => stopEditing(task.id)}
                              >
                                <Save className="h-4 w-4 text-green-600" />
                              </Button>
                            ) : (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => startEditing(task.id)}
                                  disabled={isSaving || hasEditingRows}
                                >
                                  <Plus className="h-4 w-4 text-blue-600" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => promptDeleteTask(task.id)}
                                  disabled={isSaving || hasEditingRows}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {taskDetails.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          No task details found. Add a new task to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="service">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">Service information will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="min-acceptance">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">Minimum acceptance criteria will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="checksheet">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">Checksheet information will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="work-order">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">Work order information will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="additional-info">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">Additional information will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintainable-group">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">Maintainable group information will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plan">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">Plan information will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-end space-x-2 border-t pt-4">
        <Button 
          variant="outline" 
          onClick={handleCancel}
          disabled={isSaving}
        >
          <X className="h-4 w-4 mr-1" /> Cancel
        </Button>
        <Button 
          variant="outline" 
          onClick={handleApplyChanges}
          disabled={isSaving || !isFormModified}
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2" />
              Applying...
            </>
          ) : "Apply Changes"}
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving || !isFormModified}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save
            </>
          )}
        </Button>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteTask} 
              className="bg-destructive text-destructive-foreground"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Deleting...
                </>
              ) : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PMScheduleDetailPage;
