
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Download, FilterIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AreaChart, Area } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { LineChart, Line } from 'recharts';
import { toast } from '@/hooks/use-toast';

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
  { vendor: 'ABC Maintenance', value: 85 },
  { vendor: 'XYZ Services', value: 92 },
  { vendor: 'Tech Solutions', value: 78 },
  { vendor: 'Quality Repairs', value: 65 },
  { vendor: 'Industrial Pro', value: 89 },
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

// Define chart colors config
const chartConfig = {
  completed: { color: '#4caf50', label: 'Completed' },
  pending: { color: '#ff9800', label: 'Pending' },
  critical: { color: '#f44336', label: 'Critical' },
  major: { color: '#ff9800', label: 'Major' },
  minor: { color: '#2196f3', label: 'Minor' },
  sla: { color: '#1976d2', label: 'SLA Compliance' },
};

const VendorDashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(2025, 0, 1), // January 1, 2025
    to: new Date(), // Current date
  });
  const [vendorType, setVendorType] = useState('all');
  const [region, setRegion] = useState('all');

  const handleExport = (format: 'csv' | 'png', chartName: string) => {
    // In a real app, this would trigger an export
    console.log(`Exporting ${chartName} as ${format}`);
    // Show notification
    toast({
      title: "Export started",
      description: `${chartName} is being exported as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Vendor Dashboard" 
        subtitle="Monitor vendor performance and activity"
      />
      
      {/* Filters row */}
      <Card className="overflow-visible">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3 space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="w-full md:w-1/3 space-y-2">
              <label className="text-sm font-medium">Vendor Type</label>
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
            
            <div className="w-full md:w-1/3 space-y-2">
              <label className="text-sm font-medium">Region</label>
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
        </CardContent>
      </Card>
      
      {/* Charts - 2x2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Vendor Work Orders by Month */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Vendor Work Orders by Month</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleExport('csv', 'Work Orders by Month')}
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleExport('png', 'Work Orders by Month')}
              >
                <Download className="h-4 w-4 mr-1" />
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={chartConfig}
              >
                <AreaChart data={workOrderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="completed" 
                    name="completed" 
                    stroke={chartConfig.completed.color} 
                    fill={chartConfig.completed.color} 
                    fillOpacity={0.3} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pending" 
                    name="pending" 
                    stroke={chartConfig.pending.color} 
                    fill={chartConfig.pending.color} 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Chart 2: Vendor Distribution by Region */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Vendor Distribution by Region</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleExport('csv', 'Vendor Distribution by Region')}
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleExport('png', 'Vendor Distribution by Region')}
              >
                <Download className="h-4 w-4 mr-1" />
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ChartContainer 
                config={chartConfig}
              >
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Chart 3: Average SLA Compliance per Vendor */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Average SLA Compliance per Vendor</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleExport('csv', 'SLA Compliance')}
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleExport('png', 'SLA Compliance')}
              >
                <Download className="h-4 w-4 mr-1" />
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={{...chartConfig, sla: chartConfig.sla}}
              >
                <BarChart data={slaData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="vendor" type="category" width={120} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="sla" 
                    fill={chartConfig.sla.color}
                    radius={[0, 4, 4, 0]}
                    label={{ position: 'right', formatter: (value) => `${value}%` }} 
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Chart 4: Vendor Issue Reports Over Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Vendor Issue Reports Over Time</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleExport('csv', 'Issue Reports')}
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleExport('png', 'Issue Reports')}
              >
                <Download className="h-4 w-4 mr-1" />
                PNG
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer 
                config={chartConfig}
              >
                <LineChart data={issueReportData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="critical" 
                    name="critical" 
                    stroke={chartConfig.critical.color} 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="major" 
                    name="major" 
                    stroke={chartConfig.major.color} 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="minor" 
                    name="minor" 
                    stroke={chartConfig.minor.color} 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboardPage;
