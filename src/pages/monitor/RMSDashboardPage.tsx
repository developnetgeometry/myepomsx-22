
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, PieChart, BarChart, Line, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KpiCard from '@/components/shared/KpiCard';
import { Database, Activity, AlertTriangle, Gauge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatDateTime } from '@/utils/formatters';

// Sample data for telemetry charts
const temperatureData = [
  { time: '00:00', value: 82 },
  { time: '01:00', value: 83 },
  { time: '02:00', value: 85 },
  { time: '03:00', value: 84 },
  { time: '04:00', value: 83 },
  { time: '05:00', value: 82 },
  { time: '06:00', value: 81 },
  { time: '07:00', value: 83 },
  { time: '08:00', value: 85 },
  { time: '09:00', value: 87 },
  { time: '10:00', value: 89 },
  { time: '11:00', value: 90 },
  { time: '12:00', value: 92 },
];

const pressureData = [
  { time: '00:00', value: 12.5 },
  { time: '01:00', value: 12.6 },
  { time: '02:00', value: 12.7 },
  { time: '03:00', value: 12.6 },
  { time: '04:00', value: 12.5 },
  { time: '05:00', value: 12.4 },
  { time: '06:00', value: 12.3 },
  { time: '07:00', value: 12.4 },
  { time: '08:00', value: 12.6 },
  { time: '09:00', value: 12.8 },
  { time: '10:00', value: 13.0 },
  { time: '11:00', value: 13.1 },
  { time: '12:00', value: 13.2 },
];

const vibrationData = [
  { time: '00:00', value: 2.5 },
  { time: '01:00', value: 2.3 },
  { time: '02:00', value: 2.6 },
  { time: '03:00', value: 2.4 },
  { time: '04:00', value: 2.2 },
  { time: '05:00', value: 2.3 },
  { time: '06:00', value: 2.5 },
  { time: '07:00', value: 2.8 },
  { time: '08:00', value: 3.0 },
  { time: '09:00', value: 3.5 },
  { time: '10:00', value: 4.0 },
  { time: '11:00', value: 4.5 },
  { time: '12:00', value: 5.0 },
];

// Health status distribution
const healthStatusData = [
  { name: 'Good', value: 75, color: '#22c55e' },
  { name: 'Fair', value: 15, color: '#f59e0b' },
  { name: 'Poor', value: 7, color: '#f97316' },
  { name: 'Critical', value: 3, color: '#ef4444' },
];

// Alert trends over time
const alertTrendsData = [
  { day: 'Mon', critical: 2, warning: 5, info: 12 },
  { day: 'Tue', critical: 1, warning: 4, info: 10 },
  { day: 'Wed', critical: 3, warning: 7, info: 15 },
  { day: 'Thu', critical: 2, warning: 6, info: 13 },
  { day: 'Fri', critical: 4, warning: 8, info: 16 },
  { day: 'Sat', critical: 2, warning: 5, info: 11 },
  { day: 'Sun', critical: 1, warning: 3, info: 9 },
];

// Systems with active alerts
const systemAlertsData = [
  { name: 'Compressor System', alerts: 8 },
  { name: 'Cooling System', alerts: 5 },
  { name: 'Separator System', alerts: 3 },
  { name: 'Pump System', alerts: 7 },
  { name: 'Control System', alerts: 4 },
];

// Asset health status for table display
const assetHealthData = [
  { 
    id: '1',
    assetNo: 'RMS-A001',
    assetName: 'Compressor Station Alpha',
    system: 'Compressor System',
    healthStatus: 'Good',
    lastUpdated: '2025-05-12 09:15:22'
  },
  { 
    id: '2',
    assetNo: 'RMS-A002',
    assetName: 'Flow Control Valve FCV-201',
    system: 'Flow Control',
    healthStatus: 'Fair',
    lastUpdated: '2025-05-12 08:45:30'
  },
  { 
    id: '3',
    assetNo: 'RMS-A003',
    assetName: 'Pressure Transmitter PT-305',
    system: 'Pressure Monitoring',
    healthStatus: 'Poor',
    lastUpdated: '2025-05-11 23:10:45'
  },
  { 
    id: '4',
    assetNo: 'RMS-A004',
    assetName: 'Storage Tank Level Sensor',
    system: 'Level Monitoring',
    healthStatus: 'Good',
    lastUpdated: '2025-05-12 10:30:15'
  },
  { 
    id: '5',
    assetNo: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    system: 'Pump System',
    healthStatus: 'Critical',
    lastUpdated: '2025-05-12 07:50:38'
  },
  { 
    id: '6',
    assetNo: 'RMS-A006',
    assetName: 'Cooling Tower Fan Motor',
    system: 'Cooling System',
    healthStatus: 'Good',
    lastUpdated: '2025-05-12 11:22:05'
  }
];

// Alert list for analysis tab
const alertListData = [
  { 
    id: '1',
    assetNo: 'RMS-A001',
    assetName: 'Compressor Station Alpha',
    metric: 'Temperature',
    value: '92.5°C',
    threshold: '90.0°C',
    alertLevel: 'Warning',
    timestamp: '2025-05-12 09:15:22'
  },
  { 
    id: '2',
    assetNo: 'RMS-A002',
    assetName: 'Flow Control Valve FCV-201',
    metric: 'Pressure',
    value: '13.8 MPa',
    threshold: '13.5 MPa',
    alertLevel: 'Warning',
    timestamp: '2025-05-12 08:45:30'
  },
  { 
    id: '3',
    assetNo: 'RMS-A003',
    assetName: 'Pressure Transmitter PT-305',
    metric: 'Accuracy',
    value: '1.8%',
    threshold: '1.5%',
    alertLevel: 'Warning',
    timestamp: '2025-05-11 23:10:45'
  },
  { 
    id: '5',
    assetNo: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    metric: 'Temperature',
    value: '110.5°C',
    threshold: '95.0°C',
    alertLevel: 'Critical',
    timestamp: '2025-05-12 07:50:38'
  },
  { 
    id: '5',
    assetNo: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    metric: 'Current',
    value: '42.3 A',
    threshold: '40.0 A',
    alertLevel: 'Critical',
    timestamp: '2025-05-12 06:58:12'
  }
];

// Filter assets by system
const filterAssetsBySystem = (system: string) => {
  if (system === 'All Systems') return assetHealthData;
  return assetHealthData.filter(asset => asset.system === system);
};

// Filter alerts by system
const filterAlertsBySystem = (system: string) => {
  if (system === 'All Systems') return alertListData;
  
  // Find assets in the specified system
  const systemAssets = assetHealthData.filter(asset => asset.system === system);
  const systemAssetIds = systemAssets.map(asset => asset.id);
  
  // Filter alerts for those assets
  return alertListData.filter(alert => systemAssetIds.includes(alert.id));
};

const RMSDashboardPage: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState("All Systems");
  const filteredAssets = filterAssetsBySystem(activeSystem);
  const filteredAlerts = filterAlertsBySystem(activeSystem);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="RMS Dashboard" 
        subtitle="Real-time monitoring system overview"
        icon={<Database className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard 
          title="Connected Assets" 
          value="24/26" 
          icon={<Database className="h-6 w-6" />} 
          changeLabel="2 offline"
        />
        <KpiCard 
          title="Active Alerts" 
          value="7" 
          icon={<AlertTriangle className="h-6 w-6" />} 
          change={2}
          changeDirection="down"
          positiveChange="down"
          changeLabel="vs yesterday"
        />
        <KpiCard 
          title="Data Transmission" 
          value="98.5%" 
          icon={<Activity className="h-6 w-6" />} 
          change={0.3}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs yesterday"
        />
        <KpiCard 
          title="System Health" 
          value="92%" 
          icon={<Gauge className="h-6 w-6" />} 
          change={1.5}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last week"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <Badge 
          variant="outline" 
          className={activeSystem === "All Systems" ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer"} 
          onClick={() => setActiveSystem("All Systems")}
        >
          All Systems
        </Badge>
        <Badge 
          variant="outline" 
          className={activeSystem === "Compressor System" ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer"} 
          onClick={() => setActiveSystem("Compressor System")}
        >
          Compressor System
        </Badge>
        <Badge 
          variant="outline" 
          className={activeSystem === "Cooling System" ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer"} 
          onClick={() => setActiveSystem("Cooling System")}
        >
          Cooling System
        </Badge>
        <Badge 
          variant="outline" 
          className={activeSystem === "Separator System" ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer"} 
          onClick={() => setActiveSystem("Separator System")}
        >
          Separator System
        </Badge>
        <Badge 
          variant="outline" 
          className={activeSystem === "Pump System" ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer"} 
          onClick={() => setActiveSystem("Pump System")}
        >
          Pump System
        </Badge>
      </div>

      <Tabs defaultValue="telemetry" className="w-full">
        <TabsList className="grid w-full md:w-[500px] grid-cols-3">
          <TabsTrigger value="telemetry">Live Telemetry</TabsTrigger>
          <TabsTrigger value="health">Health Status</TabsTrigger>
          <TabsTrigger value="alerts">Alert Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="telemetry" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trends</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temperatureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['auto', 'auto']} label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Temperature" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pressure Readings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={pressureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['auto', 'auto']} label={{ value: 'MPa', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" name="Pressure" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vibration Readings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={vibrationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['auto', 'auto']} label={{ value: 'mm/s', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" name="Vibration" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Health Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset No</TableHead>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>System</TableHead>
                      <TableHead>Health Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No assets found for this system
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.assetNo}</TableCell>
                          <TableCell>{asset.assetName}</TableCell>
                          <TableCell>{asset.system}</TableCell>
                          <TableCell>
                            <StatusBadge status={asset.healthStatus} />
                          </TableCell>
                          <TableCell>{formatDateTime(asset.lastUpdated)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Metric</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Alert Level</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          No alerts found for this system
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAlerts.map((alert, index) => (
                        <TableRow key={`${alert.id}-${index}`}>
                          <TableCell className="font-medium">{alert.assetName}</TableCell>
                          <TableCell>{alert.metric}</TableCell>
                          <TableCell className={
                            alert.alertLevel === 'Critical' ? 'text-red-500 font-semibold' : 
                            alert.alertLevel === 'Warning' ? 'text-orange-500 font-semibold' : ''
                          }>
                            {alert.value}
                          </TableCell>
                          <TableCell>{alert.threshold}</TableCell>
                          <TableCell>
                            <Badge className={
                              alert.alertLevel === 'Critical' ? 'bg-red-500' :
                              alert.alertLevel === 'Warning' ? 'bg-orange-500' :
                              'bg-green-500'
                            }>
                              {alert.alertLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDateTime(alert.timestamp)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alert Trends (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={alertTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="critical" name="Critical" stackId="a" fill="#ef4444" />
                  <Bar dataKey="warning" name="Warning" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="info" name="Info" stackId="a" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RMSDashboardPage;
