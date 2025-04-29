
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, PieChart, BarChart, Line, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import KpiCard from '@/components/shared/KpiCard';
import { Database, Activity, AlertTriangle, Gauge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

const RMSDashboardPage: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState("All Systems");

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
        <Badge variant="outline" className={activeSystem === "All Systems" ? "bg-primary text-primary-foreground" : ""} onClick={() => setActiveSystem("All Systems")}>
          All Systems
        </Badge>
        <Badge variant="outline" className={activeSystem === "Compressor System" ? "bg-primary text-primary-foreground" : ""} onClick={() => setActiveSystem("Compressor System")}>
          Compressor System
        </Badge>
        <Badge variant="outline" className={activeSystem === "Cooling System" ? "bg-primary text-primary-foreground" : ""} onClick={() => setActiveSystem("Cooling System")}>
          Cooling System
        </Badge>
        <Badge variant="outline" className={activeSystem === "Separator System" ? "bg-primary text-primary-foreground" : ""} onClick={() => setActiveSystem("Separator System")}>
          Separator System
        </Badge>
        <Badge variant="outline" className={activeSystem === "Pump System" ? "bg-primary text-primary-foreground" : ""} onClick={() => setActiveSystem("Pump System")}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Health Distribution</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={healthStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {healthStatusData.map((entry, index) => (
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
              <CardHeader>
                <CardTitle>Systems with Active Alerts</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={systemAlertsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="alerts" name="Number of Alerts" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-6">
          <Card>
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
