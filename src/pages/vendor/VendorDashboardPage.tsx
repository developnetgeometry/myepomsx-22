
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, ClipboardCheck, Clock, DollarSign } from 'lucide-react';
import KpiCard from '@/components/shared/KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Sample data
const activeContracts = [
  { id: 'CNT-2023-001', vendor: 'TechMech Services', startDate: '2023-01-15', endDate: '2025-01-14', value: '$245,000', status: 'Active' },
  { id: 'CNT-2023-008', vendor: 'PressureWorks Inc.', startDate: '2023-03-20', endDate: '2024-09-19', value: '$175,500', status: 'Active' },
  { id: 'CNT-2023-012', vendor: 'Corrosion Solutions LLC', startDate: '2023-05-10', endDate: '2024-05-09', value: '$89,000', status: 'Active' },
  { id: 'CNT-2023-017', vendor: 'Pipeline Experts Group', startDate: '2023-07-22', endDate: '2024-07-21', value: '$156,000', status: 'Active' },
];

const pendingWorkOrders = [
  { id: 'WO-2023-254', description: 'Pressure vessel inspection', dueDate: '2023-11-30', assignedTo: 'TechMech Services', priority: 'High' },
  { id: 'WO-2023-267', description: 'Corrosion monitoring system installation', dueDate: '2023-12-05', assignedTo: 'Corrosion Solutions LLC', priority: 'Medium' },
  { id: 'WO-2023-270', description: 'Pipeline integrity assessment', dueDate: '2023-12-15', assignedTo: 'Pipeline Experts Group', priority: 'Medium' },
];

const VendorDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Vendor Dashboard" 
        subtitle="Overview of vendor performance, contracts, and work status"
        icon={<Users className="h-6 w-6" />}
      />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard 
          title="Active Vendors" 
          value="12" 
          icon={<Users className="h-6 w-6" />} 
          change={2}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last quarter"
        />
        <KpiCard 
          title="Pending Work Orders" 
          value="7" 
          icon={<ClipboardCheck className="h-6 w-6" />} 
          change={3}
          changeDirection="down"
          positiveChange="down"
          changeLabel="vs last month"
        />
        <KpiCard 
          title="Avg. Response Time" 
          value="4.2 days" 
          icon={<Clock className="h-6 w-6" />} 
          change={0.8}
          changeDirection="down"
          positiveChange="down"
          changeLabel="improving"
        />
        <KpiCard 
          title="Contract Value" 
          value="$675K" 
          icon={<DollarSign className="h-6 w-6" />} 
          change={125000}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last year"
        />
      </div>
      
      {/* Main Content */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="contracts">
            <TabsList>
              <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
              <TabsTrigger value="workOrders">Pending Work Orders</TabsTrigger>
              <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contracts" className="pt-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Active Vendor Contracts</h3>
                <p className="text-muted-foreground">
                  View and manage all active contracts with service vendors.
                </p>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeContracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.vendor}</TableCell>
                      <TableCell>{contract.startDate}</TableCell>
                      <TableCell>{contract.endDate}</TableCell>
                      <TableCell>{contract.value}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {contract.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="workOrders" className="pt-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Pending Vendor Work Orders</h3>
                <p className="text-muted-foreground">
                  Track work orders currently assigned to vendors.
                </p>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>WO ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingWorkOrders.map((wo) => (
                    <TableRow key={wo.id}>
                      <TableCell className="font-medium">{wo.id}</TableCell>
                      <TableCell>{wo.description}</TableCell>
                      <TableCell>{wo.dueDate}</TableCell>
                      <TableCell>{wo.assignedTo}</TableCell>
                      <TableCell>
                        <Badge 
                          className={`${
                            wo.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                            wo.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {wo.priority}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="performance" className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Vendor Performance Metrics</h3>
                <p className="text-muted-foreground">
                  View key performance indicators for vendor activities.
                </p>
              </div>
              
              <div className="p-6 border rounded-md bg-muted/50 mt-4">
                <p className="text-center text-muted-foreground">
                  Vendor performance metrics and analytics will be available in future updates.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboardPage;
