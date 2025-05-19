
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, AlertTriangle, CheckCircle, FileWarning } from 'lucide-react';
import KpiCard from '@/components/shared/KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Sample data for demonstration
const systemHealthData = [
  { id: 1, system: 'Pressure Vessel Monitoring', status: 'Online', lastCheck: '10 minutes ago', health: 'Good' },
  { id: 2, system: 'Pipeline Integrity', status: 'Online', lastCheck: '15 minutes ago', health: 'Good' },
  { id: 3, system: 'Corrosion Monitoring', status: 'Online', lastCheck: '5 minutes ago', health: 'Warning' },
  { id: 4, system: 'RBI Assessment', status: 'Online', lastCheck: '30 minutes ago', health: 'Good' },
  { id: 5, system: 'Critical Assets', status: 'Offline', lastCheck: '2 hours ago', health: 'Critical' },
];

const recentAlerts = [
  { id: 1, asset: 'PV-1023', severity: 'High', message: 'Pressure exceeding normal limits', time: '35 minutes ago' },
  { id: 2, asset: 'Pipeline B-24', severity: 'Medium', message: 'Potential corrosion detected', time: '2 hours ago' },
  { id: 3, asset: 'CR-789', severity: 'Low', message: 'Maintenance scheduled', time: '1 day ago' },
];

const IMSDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="IMS Dashboard" 
        subtitle="Integrity Management System dashboard with key metrics and alerts"
        icon={<Monitor className="h-6 w-6" />}
      />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard 
          title="Systems Online" 
          value="4/5" 
          icon={<Monitor className="h-6 w-6" />} 
          change={0}
          changeDirection="up"
          positiveChange="up"
          changeLabel="systems active"
        />
        <KpiCard 
          title="Active Alerts" 
          value="3" 
          icon={<AlertTriangle className="h-6 w-6" />} 
          change={2}
          changeDirection="down"
          positiveChange="down"
          changeLabel="vs yesterday"
        />
        <KpiCard 
          title="Healthy Assets" 
          value="87%" 
          icon={<CheckCircle className="h-6 w-6" />} 
          change={1.5}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last week"
        />
        <KpiCard 
          title="Pending Reports" 
          value="6" 
          icon={<FileWarning className="h-6 w-6" />} 
          change={0}
          changeDirection="none"
          positiveChange="down"
          changeLabel="unchanged"
        />
      </div>

      {/* Main Content */}
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="systems">Systems</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4 space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Integrity Management System Status</h3>
                <p className="text-muted-foreground">
                  Monitor the overall health and status of your integrity management systems.
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>System</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Check</TableHead>
                        <TableHead>Health</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemHealthData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.system}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`h-2 w-2 rounded-full mr-2 ${
                                item.status === 'Online' ? 'bg-green-500' : 'bg-red-500'
                              }`} />
                              {item.status}
                            </div>
                          </TableCell>
                          <TableCell>{item.lastCheck}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.health === 'Good' ? 'bg-green-100 text-green-800' :
                              item.health === 'Warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.health}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="systems" className="pt-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Connected Systems</h3>
                <p className="text-muted-foreground">
                  Manage and view all connected integrity management systems.
                </p>
              </div>
              <div className="p-4 border rounded-md bg-muted/50 mt-4">
                <p className="text-muted-foreground">
                  Detailed system information and management tools will be available in future updates.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="alerts" className="pt-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Recent Alerts</h3>
                <p className="text-muted-foreground">
                  View and manage integrity related alerts and notifications.
                </p>
              </div>
              
              <Card className="mt-4">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.asset}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity}
                            </span>
                          </TableCell>
                          <TableCell>{alert.message}</TableCell>
                          <TableCell>{alert.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IMSDashboardPage;
