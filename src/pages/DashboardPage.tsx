
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import KpiCard from '@/components/shared/KpiCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Database, AlertTriangle, Activity, Gauge } from 'lucide-react';

// Sample data for the dashboard
const performanceData = [
  { name: 'Jan', value: 85 },
  { name: 'Feb', value: 88 },
  { name: 'Mar', value: 92 },
  { name: 'Apr', value: 90 },
  { name: 'May', value: 93 },
  { name: 'Jun', value: 89 },
  { name: 'Jul', value: 94 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        subtitle="System overview and key metrics"
        icon={<Database className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard 
          title="Total Assets" 
          value="156" 
          icon={<Database className="h-6 w-6" />} 
          changeLabel="2 new this month"
        />
        <KpiCard 
          title="Open Work Orders" 
          value="28" 
          icon={<AlertTriangle className="h-6 w-6" />} 
          change={3}
          changeDirection="down"
          positiveChange="down"
          changeLabel="vs last week"
        />
        <KpiCard 
          title="System Uptime" 
          value="99.8%" 
          icon={<Activity className="h-6 w-6" />} 
          change={0.2}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last month"
        />
        <KpiCard 
          title="Asset Performance" 
          value="92%" 
          icon={<Gauge className="h-6 w-6" />} 
          change={1.5}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs target"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Performance Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <ChartContainer className="h-80" config={{}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[70, 100]} label={{ value: 'Performance %', angle: -90, position: 'insideLeft' }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Performance" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Online Assets</span>
                <span className="font-semibold">142</span>
              </div>
              <div className="flex justify-between">
                <span>Offline Assets</span>
                <span className="font-semibold">14</span>
              </div>
              <div className="flex justify-between">
                <span>Maintenance Mode</span>
                <span className="font-semibold">8</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                <p>Compressor C-101 maintenance completed</p>
              </div>
              <div className="border-l-4 border-red-500 pl-3">
                <p className="text-sm text-muted-foreground">Today, 09:15 AM</p>
                <p>Alert: Pump P-201 pressure high</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="text-sm text-muted-foreground">Yesterday, 16:45 PM</p>
                <p>New asset registered: Tank T-301</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a href="/monitor/rms-dashboard" className="block p-2 hover:bg-gray-100 rounded">
                RMS Dashboard
              </a>
              <a href="/monitor/ims-dashboard" className="block p-2 hover:bg-gray-100 rounded">
                IMS Dashboard
              </a>
              <a href="/monitor/critical-assets" className="block p-2 hover:bg-gray-100 rounded">
                Critical Assets
              </a>
              <a href="/maintain/wo-history" className="block p-2 hover:bg-gray-100 rounded">
                Work Order History
              </a>
              <a href="/manage/asset-register" className="block p-2 hover:bg-gray-100 rounded">
                Asset Register
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
