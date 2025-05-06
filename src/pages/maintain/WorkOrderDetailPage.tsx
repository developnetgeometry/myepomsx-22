
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, FileText, List, Calendar, Activity, Link, BarChart3, Clock, File, CheckSquare, ClipboardCheck, Info, Users } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { ScrollArea } from '@/components/ui/scroll-area';

const WorkOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  
  // This would typically come from an API call based on the ID
  const workOrderData = {
    workOrderNo: `WO-CPP-PM-24/000${id}`,
    status: "Defer",
    task: "T001 - Task Name 1",
    description: "PM Test 14/40/2024 Latest",
    assetNo: `ASSET-${id}`,
    workType: "Preventive Maintenance",
    workCenter: "Mechanical"
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Work Order Detail" 
        />
        <Button variant="outline" onClick={() => navigate('/maintain/work-order-list')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Work Orders
        </Button>
      </div>
      
      {/* Work Order Header Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl font-bold">{workOrderData.workOrderNo}</CardTitle>
            <StatusBadge status={workOrderData.status} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Task</h3>
                <p className="text-base">{workOrderData.task}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Asset No</h3>
                <p className="text-base">{workOrderData.assetNo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Work Type</h3>
                <p className="text-base">{workOrderData.workType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Work Center</h3>
                <p className="text-base">{workOrderData.workCenter}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
              <Card className="bg-gray-50">
                <CardContent className="pt-4">
                  <p className="text-gray-700">{workOrderData.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs Section */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <ScrollArea className="w-full border-b">
              <div className="flex p-1">
                <TabsList className="inline-flex h-10 items-center justify-start bg-transparent p-0 w-max">
                  <TabsTrigger value="general" className="flex gap-2 items-center">
                    <FileText className="h-4 w-4" /> General
                  </TabsTrigger>
                  <TabsTrigger value="task-detail" className="flex gap-2 items-center">
                    <List className="h-4 w-4" /> Task Detail
                  </TabsTrigger>
                  <TabsTrigger value="plan" className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4" /> Plan
                  </TabsTrigger>
                  <TabsTrigger value="actual" className="flex gap-2 items-center">
                    <Activity className="h-4 w-4" /> Actual
                  </TabsTrigger>
                  <TabsTrigger value="related-wo" className="flex gap-2 items-center">
                    <Link className="h-4 w-4" /> Related WO
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex gap-2 items-center">
                    <BarChart3 className="h-4 w-4" /> Reports
                  </TabsTrigger>
                  <TabsTrigger value="defer" className="flex gap-2 items-center">
                    <Clock className="h-4 w-4" /> Defer
                  </TabsTrigger>
                  <TabsTrigger value="attachment" className="flex gap-2 items-center">
                    <File className="h-4 w-4" /> Attachment
                  </TabsTrigger>
                  <TabsTrigger value="min-acceptance-criteria" className="flex gap-2 items-center">
                    <CheckSquare className="h-4 w-4" /> Min Acceptance Criteria
                  </TabsTrigger>
                  <TabsTrigger value="checksheet" className="flex gap-2 items-center">
                    <ClipboardCheck className="h-4 w-4" /> Checksheet
                  </TabsTrigger>
                  <TabsTrigger value="additional-info" className="flex gap-2 items-center">
                    <Info className="h-4 w-4" /> Additional Info
                  </TabsTrigger>
                  <TabsTrigger value="maintainable-group" className="flex gap-2 items-center">
                    <Users className="h-4 w-4" /> Maintainable Group
                  </TabsTrigger>
                </TabsList>
              </div>
            </ScrollArea>
            
            {/* Tab Contents */}
            <TabsContent value="general" className="p-6">
              <h3 className="text-lg font-medium mb-4">General Information</h3>
              <div className="space-y-4">
                <p>General information about the work order would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="task-detail" className="p-6">
              <h3 className="text-lg font-medium mb-4">Task Details</h3>
              <div className="space-y-4">
                <p>Specific task details would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="plan" className="p-6">
              <h3 className="text-lg font-medium mb-4">Planning Information</h3>
              <div className="space-y-4">
                <p>Planning details and schedule information would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="actual" className="p-6">
              <h3 className="text-lg font-medium mb-4">Actual Execution</h3>
              <div className="space-y-4">
                <p>Actual work execution details would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="related-wo" className="p-6">
              <h3 className="text-lg font-medium mb-4">Related Work Orders</h3>
              <div className="space-y-4">
                <p>List of related work orders would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reports" className="p-6">
              <h3 className="text-lg font-medium mb-4">Reports</h3>
              <div className="space-y-4">
                <p>Associated reports would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="defer" className="p-6">
              <h3 className="text-lg font-medium mb-4">Defer Information</h3>
              <div className="space-y-4">
                <p>Deferral details would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="attachment" className="p-6">
              <h3 className="text-lg font-medium mb-4">Attachments</h3>
              <div className="space-y-4">
                <p>Attached documents would be listed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="min-acceptance-criteria" className="p-6">
              <h3 className="text-lg font-medium mb-4">Minimum Acceptance Criteria</h3>
              <div className="space-y-4">
                <p>Minimum acceptance criteria would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="checksheet" className="p-6">
              <h3 className="text-lg font-medium mb-4">Checksheets</h3>
              <div className="space-y-4">
                <p>Checksheet information would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="additional-info" className="p-6">
              <h3 className="text-lg font-medium mb-4">Additional Information</h3>
              <div className="space-y-4">
                <p>Additional work order information would be displayed here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="maintainable-group" className="p-6">
              <h3 className="text-lg font-medium mb-4">Maintainable Group</h3>
              <div className="space-y-4">
                <p>Maintainable group information would be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderDetailPage;
