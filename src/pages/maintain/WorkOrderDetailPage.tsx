
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Wrench } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';

const WorkOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real application, we would fetch the work order details based on ID
  const workOrder = {
    id,
    workOrderNo: `WO-2023-000${id}`,
    planDueDate: '2023-08-15',
    task: 'Equipment Maintenance',
    pmNo: 'PM-2023-001',
    packageNo: 'PKG-001',
    assetNo: 'EQUIP-001',
    frequency: 'Monthly',
    workType: 'Preventive',
    workCenter: 'Mechanical',
    woStatus: 'In Progress',
    description: 'Routine inspection and maintenance of mechanical equipment',
    assignedTo: 'John Smith',
    startDate: '2023-08-10',
    estimatedHours: 4,
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Work Order Detail" 
          icon={<Wrench className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/maintain/work-order-list')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Work Orders
        </Button>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Order #{workOrder.workOrderNo}</CardTitle>
          <StatusBadge status={workOrder.woStatus} />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Order No</h3>
              <p className="text-base">{workOrder.workOrderNo}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Plan Due Date</h3>
              <p className="text-base">{workOrder.planDueDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Task</h3>
              <p className="text-base">{workOrder.task}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">PM No</h3>
              <p className="text-base">{workOrder.pmNo}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package No</h3>
              <p className="text-base">{workOrder.packageNo}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset No</h3>
              <p className="text-base">{workOrder.assetNo}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Frequency</h3>
              <p className="text-base">{workOrder.frequency}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Type</h3>
              <p className="text-base">{workOrder.workType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Work Center</h3>
              <p className="text-base">{workOrder.workCenter}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
            <p className="text-base bg-gray-50 p-3 rounded-md">{workOrder.description}</p>
          </div>
          
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="labor">Labor</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                  <p className="text-base">{workOrder.assignedTo}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                  <p className="text-base">{workOrder.startDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Estimated Hours</h3>
                  <p className="text-base">{workOrder.estimatedHours}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Tasks</h3>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="p-4 flex items-center">
                        <div className="mr-4">1</div>
                        <div>Inspect equipment for signs of wear or damage</div>
                      </div>
                      <div className="p-4 flex items-center">
                        <div className="mr-4">2</div>
                        <div>Check fluid levels and top up as necessary</div>
                      </div>
                      <div className="p-4 flex items-center">
                        <div className="mr-4">3</div>
                        <div>Clean air filters and replace if needed</div>
                      </div>
                      <div className="p-4 flex items-center">
                        <div className="mr-4">4</div>
                        <div>Lubricate moving parts according to specifications</div>
                      </div>
                      <div className="p-4 flex items-center">
                        <div className="mr-4">5</div>
                        <div>Test operation and document results</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="pt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Item No</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Unit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-3 text-sm">001</td>
                          <td className="px-4 py-3 text-sm">Oil Filter</td>
                          <td className="px-4 py-3 text-sm">2</td>
                          <td className="px-4 py-3 text-sm">EA</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">002</td>
                          <td className="px-4 py-3 text-sm">Lubricant</td>
                          <td className="px-4 py-3 text-sm">1</td>
                          <td className="px-4 py-3 text-sm">LTR</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">003</td>
                          <td className="px-4 py-3 text-sm">Gasket</td>
                          <td className="px-4 py-3 text-sm">4</td>
                          <td className="px-4 py-3 text-sm">EA</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="labor" className="pt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Employee</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Trade</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Hours</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="px-4 py-3 text-sm">John Smith</td>
                          <td className="px-4 py-3 text-sm">Mechanic</td>
                          <td className="px-4 py-3 text-sm">2.5</td>
                          <td className="px-4 py-3 text-sm">2023-08-10</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">Alice Johnson</td>
                          <td className="px-4 py-3 text-sm">Technician</td>
                          <td className="px-4 py-3 text-sm">1.5</td>
                          <td className="px-4 py-3 text-sm">2023-08-10</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Work Order Checklist</span>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Equipment Manual</span>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Safety Procedures</span>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkOrderDetailPage;
