
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import KpiCard from '@/components/shared/KpiCard';
import { BarChart, PieChart, LineChart, Bar, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ShieldCheck, AlertTriangle, Calendar, Activity, Gauge } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

// Fake data for charts and tables
const riskDistribution = [
  { name: 'High Risk', value: 12, color: '#ef4444' },
  { name: 'Medium Risk', value: 28, color: '#f97316' },
  { name: 'Low Risk', value: 60, color: '#22c55e' },
];

const inspectionTrends = [
  { month: 'Jan', completed: 45, planned: 50 },
  { month: 'Feb', completed: 42, planned: 45 },
  { month: 'Mar', completed: 48, planned: 50 },
  { month: 'Apr', completed: 39, planned: 45 },
  { month: 'May', completed: 35, planned: 40 },
  { month: 'Jun', completed: 29, planned: 40 },
];

const overdueInspections = [
  { id: 1, asset: 'Pressure Vessel PV-1001', dueDate: '2025-03-15', daysOverdue: 45, priority: 'High' },
  { id: 2, asset: 'Heat Exchanger HE-2034', dueDate: '2025-03-22', daysOverdue: 38, priority: 'Medium' },
  { id: 3, asset: 'Pipeline Section PS-3021', dueDate: '2025-03-05', daysOverdue: 55, priority: 'Critical' },
  { id: 4, asset: 'Storage Tank ST-4017', dueDate: '2025-03-28', daysOverdue: 32, priority: 'Medium' },
  { id: 5, asset: 'Compressor C-5011', dueDate: '2025-04-02', daysOverdue: 27, priority: 'Low' },
];

const maintenanceCompliance = [
  { name: 'Compliant', value: 76, color: '#22c55e' },
  { name: 'Non-Compliant', value: 24, color: '#ef4444' },
];

const alertTrends = [
  { month: 'Jan', critical: 5, major: 12, minor: 23 },
  { month: 'Feb', critical: 3, major: 9, minor: 18 },
  { month: 'Mar', critical: 4, major: 11, minor: 22 },
  { month: 'Apr', critical: 8, major: 15, minor: 28 },
  { month: 'May', critical: 6, major: 14, minor: 25 },
  { month: 'Jun', critical: 4, major: 10, minor: 20 },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'text-red-600 bg-red-50';
    case 'High':
      return 'text-orange-600 bg-orange-50';
    case 'Medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'Low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-blue-600 bg-blue-50';
  }
};

const IMSDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Integrity Management Dashboard" 
        subtitle="Key performance indicators and overview"
        icon={<ShieldCheck className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard 
          title="Inspection Completion Rate" 
          value="86%" 
          icon={<Activity className="h-6 w-6" />} 
          change={2.5}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last month"
        />
        <KpiCard 
          title="Asset Compliance" 
          value="92%" 
          icon={<Gauge className="h-6 w-6" />} 
          change={1.2}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last month"
        />
        <KpiCard 
          title="Overdue Inspections" 
          value="14" 
          icon={<Calendar className="h-6 w-6" />} 
          change={5}
          changeDirection="down" 
          positiveChange="down"
          changeLabel="vs last month"
        />
        <KpiCard 
          title="Critical Findings" 
          value="7" 
          icon={<AlertTriangle className="h-6 w-6" />} 
          change={2}
          changeDirection="up"
          positiveChange="down"
          changeLabel="vs last month"
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Risk Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Maintenance Compliance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={maintenanceCompliance}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {maintenanceCompliance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inspections" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Inspection Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inspectionTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="planned" name="Planned" fill="#3b82f6" />
                    <Bar dataKey="completed" name="Completed" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Overdue Inspections</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overdueInspections.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.asset}</TableCell>
                          <TableCell>{item.dueDate}</TableCell>
                          <TableCell>{item.daysOverdue}</TableCell>
                          <TableCell>
                            <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Alert Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={alertTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="critical" name="Critical" stroke="#ef4444" />
                  <Line type="monotone" dataKey="major" name="Major" stroke="#f97316" />
                  <Line type="monotone" dataKey="minor" name="Minor" stroke="#3b82f6" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IMSDashboardPage;
