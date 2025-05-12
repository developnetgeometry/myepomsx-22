
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import KpiCard from '@/components/shared/KpiCard';
import { Database, Activity, AlertTriangle, Gauge, Calendar, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/formatters';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Sample data for asset performance metrics
const assetUtilizationData = [
  { asset: 'Compressor P-1001', package: 'Package A', utilization: 92, availability: 95, reliability: 89 },
  { asset: 'Pump System S-201', package: 'Package B', utilization: 87, availability: 89, reliability: 91 },
  { asset: 'Control Valve CV-305', package: 'Package A', utilization: 94, availability: 97, reliability: 93 },
  { asset: 'Heat Exchanger E-401', package: 'Package C', utilization: 81, availability: 84, reliability: 79 },
  { asset: 'Storage Tank T-501', package: 'Package D', utilization: 95, availability: 92, reliability: 88 }
];

// Sample data for system reliability metrics
const systemReliabilityData = [
  { system: 'Compression System', availability: 94, reliability: 91 },
  { system: 'Pumping System', availability: 89, reliability: 87 },
  { system: 'Control System', availability: 96, reliability: 93 },
  { system: 'Storage System', availability: 92, reliability: 90 }
];

// Sample data for average metrics
const averageMetricsData = {
  utilization: 90,
  availability: 92,
  reliability: 88
};

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

// Prepare Chart Data for Utilization by Asset
const utilizationByAssetChartData = assetUtilizationData.map(item => ({
  name: item.asset,
  utilization: item.utilization,
  availability: item.availability,
  reliability: item.reliability
}));

// Prepare Chart Data for System Reliability
const systemReliabilityChartData = systemReliabilityData.map(item => ({
  name: item.system,
  availability: item.availability,
  reliability: item.reliability
}));

// Prepare data for average utilization chart
const averageUtilizationChartData = [
  { name: 'Average', utilization: averageMetricsData.utilization, availability: averageMetricsData.availability, reliability: averageMetricsData.reliability }
];

const RMSDashboardPage: React.FC = () => {
  const [activeSystem, setActiveSystem] = useState("All Systems");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle filter changes
  const handleFilterChange = () => {
    console.log("Applying filters:", { startDate, endDate, activeSystem });
    // Here you would typically fetch or filter data based on the new criteria
  };

  // Function to reset filters
  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setActiveSystem("All Systems");
  };

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
          title="Average Reliability" 
          value="92%" 
          icon={<Gauge className="h-6 w-6" />} 
          change={1.5}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last week"
        />
      </div>

      {/* Date Range Filters */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-[180px]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-[180px]"
                />
              </div>
              <div className="flex flex-col space-y-1.5 mt-6">
                <Button variant="outline" size="sm" onClick={resetFilters} className="flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Reset
                </Button>
              </div>
            </div>
            <div className="flex items-end">
              <Button onClick={handleFilterChange}>Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
        <Badge variant="outline" className={activeSystem === "Control System" ? "bg-primary text-primary-foreground" : ""} onClick={() => setActiveSystem("Control System")}>
          Control System
        </Badge>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-2">
          <TabsTrigger value="performance">Asset Performance</TabsTrigger>
          <TabsTrigger value="telemetry">Live Telemetry</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Utilization, Availability & Reliability (Asset Wise) */}
            <Card>
              <CardHeader>
                <CardTitle>Utilization, Availability & Reliability (Asset Wise)</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ChartContainer className="h-80" config={{}}>
                  <BarChart data={utilizationByAssetChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="utilization" name="Utilization %" fill="#3b82f6" />
                    <Bar dataKey="availability" name="Availability %" fill="#22c55e" />
                    <Bar dataKey="reliability" name="Reliability %" fill="#8b5cf6" />
                  </BarChart>
                </ChartContainer>
                
                <div className="mt-6 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset Name</TableHead>
                        <TableHead>Package Name</TableHead>
                        <TableHead>Utilization %</TableHead>
                        <TableHead>Availability %</TableHead>
                        <TableHead>Reliability %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assetUtilizationData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.asset}</TableCell>
                          <TableCell>{item.package}</TableCell>
                          <TableCell>{item.utilization}%</TableCell>
                          <TableCell>{item.availability}%</TableCell>
                          <TableCell>{item.reliability}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Average Critical Asset Utilization, Availability & Reliability */}
            <Card>
              <CardHeader>
                <CardTitle>Average Critical Asset Utilization, Availability & Reliability</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ChartContainer className="h-80" config={{}}>
                  <BarChart data={averageUtilizationChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="utilization" name="Utilization %" fill="#3b82f6" />
                    <Bar dataKey="availability" name="Availability %" fill="#22c55e" />
                    <Bar dataKey="reliability" name="Reliability %" fill="#8b5cf6" />
                  </BarChart>
                </ChartContainer>
                
                <div className="mt-6 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Average Utilization</TableCell>
                        <TableCell>{averageMetricsData.utilization}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Availability</TableCell>
                        <TableCell>{averageMetricsData.availability}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Reliability</TableCell>
                        <TableCell>{averageMetricsData.reliability}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* System Reliability & Availability */}
            <Card>
              <CardHeader>
                <CardTitle>System Reliability & Availability</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ChartContainer className="h-80" config={{}}>
                  <BarChart data={systemReliabilityChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="availability" name="Availability %" fill="#22c55e" />
                    <Bar dataKey="reliability" name="Reliability %" fill="#8b5cf6" />
                  </BarChart>
                </ChartContainer>
                
                <div className="mt-6 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>System</TableHead>
                        <TableHead>Availability %</TableHead>
                        <TableHead>Reliability %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemReliabilityData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.system}</TableCell>
                          <TableCell>{item.availability}%</TableCell>
                          <TableCell>{item.reliability}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
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
      </Tabs>
    </div>
  );
};

export default RMSDashboardPage;
