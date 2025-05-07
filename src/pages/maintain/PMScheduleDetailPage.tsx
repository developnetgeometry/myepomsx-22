
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useLoadingState } from '@/hooks/use-loading-state';
import { formatCurrency } from '@/utils/formatters';

interface TaskDetail {
  id: number;
  description: string;
  isEditing?: boolean;
}

const PMScheduleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading: isSaving, withLoading: withSavingLoading } = useLoadingState();
  
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

  // Handle editing task detail row
  const startEditing = (id: number) => {
    setTaskDetails(taskDetails.map(task => 
      task.id === id ? { ...task, isEditing: true } : task
    ));
  };

  const updateTaskDescription = (id: number, description: string) => {
    setTaskDetails(taskDetails.map(task => 
      task.id === id ? { ...task, description } : task
    ));
  };

  const stopEditing = (id: number) => {
    setTaskDetails(taskDetails.map(task => 
      task.id === id ? { ...task, isEditing: false } : task
    ));
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
  };

  // Handle saving changes
  const handleSave = () => {
    withSavingLoading(async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("PM Schedule saved successfully");
    });
  };

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
      
      <Tabs defaultValue="task-detail" className="w-full">
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
                <Button onClick={addTask} className="flex items-center gap-2">
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
                            />
                          ) : (
                            task.description
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {task.isEditing ? (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => stopEditing(task.id)}
                            >
                              <Save className="h-4 w-4 text-green-600" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => startEditing(task.id)}
                            >
                              <Plus className="h-4 w-4 text-blue-600" />
                            </Button>
                          )}
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
          onClick={() => navigate('/maintain/pm-schedule')}
          disabled={isSaving}
        >
          <X className="h-4 w-4 mr-1" /> Cancel
        </Button>
        <Button 
          variant="outline" 
          onClick={handleSave}
          disabled={isSaving}
        >
          Apply Changes
        </Button>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
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
    </div>
  );
};

export default PMScheduleDetailPage;
