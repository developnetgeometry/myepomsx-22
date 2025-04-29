
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import KpiCard from '@/components/shared/KpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { AlertCircle, Clock, Tool, CheckCircle2, BarChart4, Calendar, Gauge } from 'lucide-react';

// Sample data for charts
const barChartData = [
  { name: 'Jan', preventive: 65, corrective: 40 },
  { name: 'Feb', preventive: 59, corrective: 45 },
  { name: 'Mar', preventive: 80, corrective: 37 },
  { name: 'Apr', preventive: 81, corrective: 26 },
  { name: 'May', preventive: 56, corrective: 38 },
  { name: 'Jun', preventive: 55, corrective: 43 },
  { name: 'Jul', preventive: 67, corrective: 30 },
];

const pieChartData = [
  { name: 'Completed', value: 540, color: '#4caf50' },
  { name: 'In Progress', value: 210, color: '#2196f3' },
  { name: 'Pending', value: 150, color: '#ff9800' },
  { name: 'Overdue', value: 90, color: '#f44336' },
];

const areaChartData = [
  { date: '2023-01-01', value: 34 },
  { date: '2023-02-01', value: 45 },
  { date: '2023-03-01', value: 31 },
  { date: '2023-04-01', value: 65 },
  { date: '2023-05-01', value: 49 },
  { date: '2023-06-01', value: 62 },
  { date: '2023-07-01', value: 91 },
  { date: '2023-08-01', value: 84 },
];

const upcomingMaintenance = [
  { id: 1, asset: 'Compressor A-101', date: '2023-08-15', type: 'Preventive' },
  { id: 2, asset: 'Pump Station P-203', date: '2023-08-16', type: 'Inspection' },
  { id: 3, asset: 'Boiler B-507', date: '2023-08-18', type: 'Corrective' },
  { id: 4, asset: 'Cooling Tower CT-105', date: '2023-08-21', type: 'Preventive' },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard Overview" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Assets"
          value="1,284"
          icon={<BarChart4 size={24} />}
          change={8.4}
          changeLabel="vs last month"
          changeDirection="up"
        />
        <KpiCard 
          title="Open Work Orders"
          value="87"
          icon={<Tool size={24} />}
          change={3.2}
          changeLabel="vs last month"
          changeDirection="down"
          positiveChange="down"
        />
        <KpiCard 
          title="Scheduled Maintenance"
          value="45"
          icon={<Calendar size={24} />}
          change={12}
          changeLabel="upcoming this week"
          changeDirection="up"
        />
        <KpiCard 
          title="Equipment Health Score"
          value="89%"
          icon={<Gauge size={24} />}
          change={2.1}
          changeLabel="improvement"
          changeDirection="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Maintenance Activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <Tabs defaultValue="workOrders">
              <TabsList>
                <TabsTrigger value="workOrders">Work Orders</TabsTrigger>
                <TabsTrigger value="assetHealth">Asset Health</TabsTrigger>
              </TabsList>
              <TabsContent value="workOrders" className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="preventive" name="Preventive" fill="#1976d2" />
                      <Bar dataKey="corrective" name="Corrective" fill="#ff9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="assetHealth" className="pt-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#1976d2" fill="#1976d2" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Order Status</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span>Critical Alerts</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 bg-red-50 p-3 rounded-md">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="text-sm font-medium">Pressure Exceeding Threshold</p>
                  <p className="text-xs text-gray-500">Boiler B-507</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 bg-yellow-50 p-3 rounded-md">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm font-medium">Maintenance Overdue</p>
                  <p className="text-xs text-gray-500">Pump Station P-203</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 bg-yellow-50 p-3 rounded-md">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm font-medium">Temperature Warning</p>
                  <p className="text-xs text-gray-500">Compressor A-101</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span>Upcoming Maintenance</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th className="px-4 py-3">Asset</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMaintenance.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{item.asset}</td>
                      <td className="px-4 py-3">{item.date}</td>
                      <td className="px-4 py-3">{item.type}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-500 mr-1.5" />
                          <span className="text-sm">Scheduled</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
