
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import KpiCard from '@/components/shared/KpiCard';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GaugeIcon, 
  ShieldAlertIcon, 
  FileTextIcon, 
  CircleCheckIcon, 
  CircleXIcon, 
  CircleDotIcon 
} from 'lucide-react';

// Sample data
const kpiData = [
  {
    title: 'Total Assets',
    value: '1,254',
    icon: <GaugeIcon />,
    change: 3.2,
    changeLabel: 'from last month',
    changeDirection: 'up',
  },
  {
    title: 'High Risk Assets',
    value: '87',
    icon: <ShieldAlertIcon />,
    change: 2.1,
    changeLabel: 'from last month',
    changeDirection: 'up',
    positiveChange: 'down'
  },
  {
    title: 'Overdue Inspections',
    value: '42',
    icon: <FileTextIcon />,
    change: 5.4,
    changeLabel: 'from last month',
    changeDirection: 'down',
    positiveChange: 'down'
  },
  {
    title: 'Compliance Rate',
    value: '94%',
    icon: <CircleCheckIcon />,
    change: 1.5,
    changeLabel: 'from last month',
    changeDirection: 'up',
  }
];

const riskData = [
  { name: 'Critical', value: 15, color: '#EF4444' },
  { name: 'High', value: 25, color: '#F59E0B' },
  { name: 'Medium', value: 40, color: '#3B82F6' },
  { name: 'Low', value: 20, color: '#10B981' }
];

const inspectionData = [
  { name: 'Complete', value: 68, color: '#10B981' },
  { name: 'Overdue', value: 21, color: '#EF4444' },
  { name: 'Upcoming', value: 11, color: '#F59E0B' }
];

const monthlyInspectionsData = [
  { month: 'Jan', planned: 45, completed: 42 },
  { month: 'Feb', planned: 52, completed: 48 },
  { month: 'Mar', planned: 48, completed: 46 },
  { month: 'Apr', planned: 55, completed: 45 },
  { month: 'May', planned: 60, completed: 58 },
  { month: 'Jun', planned: 58, completed: 54 }
];

const overdueInspections = [
  { id: 1, asset: 'PV-1001', dueDate: '2025-03-15', daysPast: 45, priority: 'High', inspector: 'John Smith' },
  { id: 2, asset: 'PP-2043', dueDate: '2025-03-22', daysPast: 38, priority: 'Medium', inspector: 'Sarah Jones' },
  { id: 3, asset: 'HX-3005', dueDate: '2025-03-25', daysPast: 35, priority: 'Critical', inspector: 'Mike Brown' },
  { id: 4, asset: 'TK-4002', dueDate: '2025-04-02', daysPast: 27, priority: 'High', inspector: 'Emily Wilson' },
  { id: 5, asset: 'PV-1015', dueDate: '2025-04-10', daysPast: 19, priority: 'Medium', inspector: 'David Clark' }
];

// Risk matrix data
const riskMatrix = [
  { row: 5, col: 1, count: 2, color: '#FFCC00' },
  { row: 5, col: 2, count: 3, color: '#FF9900' },
  { row: 5, col: 3, count: 5, color: '#FF6600' },
  { row: 5, col: 4, count: 4, color: '#FF0000' },
  { row: 5, col: 5, count: 3, color: '#CC0000' },
  { row: 4, col: 1, count: 4, color: '#FFFF00' },
  { row: 4, col: 2, count: 6, color: '#FFCC00' },
  { row: 4, col: 3, count: 7, color: '#FF9900' },
  { row: 4, col: 4, count: 5, color: '#FF6600' },
  { row: 4, col: 5, count: 2, color: '#FF0000' },
  { row: 3, col: 1, count: 8, color: '#99FF00' },
  { row: 3, col: 2, count: 9, color: '#FFFF00' },
  { row: 3, col: 3, count: 12, color: '#FFCC00' },
  { row: 3, col: 4, count: 6, color: '#FF9900' },
  { row: 3, col: 5, count: 3, color: '#FF6600' },
  { row: 2, col: 1, count: 15, color: '#00FF00' },
  { row: 2, col: 2, count: 11, color: '#99FF00' },
  { row: 2, col: 3, count: 8, color: '#FFFF00' },
  { row: 2, col: 4, count: 5, color: '#FFCC00' },
  { row: 2, col: 5, count: 2, color: '#FF9900' },
  { row: 1, col: 1, count: 18, color: '#00CC00' },
  { row: 1, col: 2, count: 14, color: '#00FF00' },
  { row: 1, col: 3, count: 7, color: '#99FF00' },
  { row: 1, col: 4, count: 4, color: '#FFFF00' },
  { row: 1, col: 5, count: 1, color: '#FFCC00' }
];

const IMSDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="IMS Dashboard" 
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            change={kpi.change}
            changeLabel={kpi.changeLabel}
            changeDirection={kpi.changeDirection}
            positiveChange={kpi.positiveChange}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Asset risk distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer config={{}}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={(entry) => entry.name}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend
                  content={<ChartLegendContent />}
                  verticalAlign="bottom"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Risk Matrix</CardTitle>
            <CardDescription>Consequence vs. Likelihood</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-6 gap-1">
                <div className="flex items-center justify-center h-10 font-medium">L/C</div>
                {[1, 2, 3, 4, 5].map(col => (
                  <div key={col} className="flex items-center justify-center h-10 font-medium">{col}</div>
                ))}
                
                {[5, 4, 3, 2, 1].map(row => (
                  <React.Fragment key={row}>
                    <div className="flex items-center justify-center h-10 font-medium">{row}</div>
                    {[1, 2, 3, 4, 5].map(col => {
                      const cellData = riskMatrix.find(item => item.row === row && item.col === col);
                      return (
                        <div key={`${row}-${col}`}
                          className="flex items-center justify-center w-12 h-10 text-white text-xs rounded-md shadow-sm"
                          style={{ backgroundColor: cellData?.color || '#EEEEEE' }}
                        >
                          {cellData?.count || 0}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between w-full mt-4 text-xs text-gray-500">
                <div>Low</div>
                <div>Consequence</div>
                <div>High</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inspection Status</CardTitle>
            <CardDescription>Distribution by completion status</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer config={{}}>
              <PieChart>
                <Pie
                  data={inspectionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {inspectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend
                  content={<ChartLegendContent />}
                  verticalAlign="bottom"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Inspections</CardTitle>
            <CardDescription>Planned vs. Completed</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ChartContainer config={{}}>
              <BarChart data={monthlyInspectionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend
                  content={<ChartLegendContent />}
                  verticalAlign="bottom"
                />
                <Bar dataKey="planned" name="Planned" fill="#3B82F6" />
                <Bar dataKey="completed" name="Completed" fill="#10B981" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Overdue Inspections</CardTitle>
            <CardDescription>Inspections past their due date</CardDescription>
          </div>
          <Button variant="outline">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Past Due</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overdueInspections.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.asset}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                  <TableCell>{item.daysPast}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium 
                      ${item.priority === 'Critical' ? 'bg-red-100 text-red-800' : 
                        item.priority === 'High' ? 'bg-orange-100 text-orange-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {item.priority}
                    </span>
                  </TableCell>
                  <TableCell>{item.inspector}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center">
                      <CircleXIcon className="mr-1 h-4 w-4 text-red-500" /> Overdue
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IMSDashboardPage;
