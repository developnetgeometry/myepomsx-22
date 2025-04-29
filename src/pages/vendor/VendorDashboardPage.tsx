
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

// Sample chart data
const workOrderData = [
  { month: 'Jan', completed: 45, pending: 15 },
  { month: 'Feb', completed: 52, pending: 18 },
  { month: 'Mar', completed: 48, pending: 12 },
  { month: 'Apr', completed: 61, pending: 21 },
  { month: 'May', completed: 55, pending: 19 },
  { month: 'Jun', completed: 67, pending: 22 },
  { month: 'Jul', completed: 72, pending: 17 },
  { month: 'Aug', completed: 61, pending: 14 },
];

const regionData = [
  { name: 'North', value: 35, color: '#1976d2' },
  { name: 'South', value: 25, color: '#2196f3' },
  { name: 'East', value: 20, color: '#64b5f6' },
  { name: 'West', value: 20, color: '#bbdefb' },
];

const slaData = [
  { name: 'On Time', value: 85 },
  { name: 'Delayed', value: 12 },
  { name: 'Failed', value: 3 },
];

const issueReportData = [
  { month: 'Jan', critical: 3, major: 7, minor: 12 },
  { month: 'Feb', critical: 2, major: 5, minor: 15 },
  { month: 'Mar', critical: 4, major: 9, minor: 11 },
  { month: 'Apr', critical: 1, major: 6, minor: 14 },
  { month: 'May', critical: 5, major: 8, minor: 9 },
  { month: 'Jun', critical: 2, major: 6, minor: 10 },
  { month: 'Jul', critical: 3, major: 4, minor: 8 },
  { month: 'Aug', critical: 1, major: 5, minor: 12 },
];

// COLORS for bars and other elements
const COLORS = {
  completed: '#4caf50',
  pending: '#ff9800',
  critical: '#f44336',
  major: '#ff9800',
  minor: '#2196f3',
};

const VendorDashboardPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [vendorType, setVendorType] = useState('all');
  const [region, setRegion] = useState('all');

  const handleExport = (format: 'csv' | 'png') => {
    // In a real app, this would trigger an export
    console.log(`Exporting dashboard as ${format}`);
    // For demo purposes, show a download notification
    alert(`Dashboard exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Vendor Dashboard" />
      
      {/* Filters row */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="w-full md:w-1/3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="w-full md:w-1/3">
          <Select value={vendorType} onValueChange={setVendorType}>
            <SelectTrigger>
              <SelectValue placeholder="Vendor Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendor Types</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="calibration">Calibration</SelectItem>
              <SelectItem value="inspection">Inspection</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Charts - 2x2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Work Orders by Month */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Work Orders by Month</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleExport('csv')}>
                CSV
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('png')}>
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={workOrderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    name="Completed" 
                    stroke={COLORS.completed} 
                    fill={COLORS.completed} 
                    fillOpacity={0.3} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pending" 
                    name="Pending" 
                    stroke={COLORS.pending} 
                    fill={COLORS.pending} 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Chart 2: Vendor Distribution by Region */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Vendor Distribution by Region</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleExport('csv')}>
                CSV
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('png')}>
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {regionData.map((entry, index) => (
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
        
        {/* Chart 3: SLA Compliance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">SLA Compliance</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleExport('csv')}>
                CSV
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('png')}>
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slaData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="SLA Compliance" 
                    fill="#1976d2"
                    radius={[0, 4, 4, 0]}
                    label={{ position: 'right', formatter: (value) => `${value}%` }} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Chart 4: Issue Reports Over Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Issue Reports Over Time</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => handleExport('csv')}>
                CSV
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleExport('png')}>
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={issueReportData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="critical" 
                    stroke={COLORS.critical} 
                    name="Critical Issues" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="major" 
                    stroke={COLORS.major} 
                    name="Major Issues" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="minor" 
                    stroke={COLORS.minor} 
                    name="Minor Issues" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboardPage;
