import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import KpiCard from '@/components/shared/KpiCard';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShieldCheck, AlertTriangle, Calendar, Activity, Gauge, Filter } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Risk matrix data
const riskMatrixData = [
  // Probability 5 - Very High
  { probability: 5, consequence: 'A', riskLevel: 'Medium', count: 3, color: '#FEF7CD' },
  { probability: 5, consequence: 'B', riskLevel: 'High', count: 5, color: '#FFCCCB' },
  { probability: 5, consequence: 'C', riskLevel: 'High', count: 4, color: '#FFCCCB' },
  { probability: 5, consequence: 'D', riskLevel: 'Very High', count: 2, color: '#FF6B6B' },
  { probability: 5, consequence: 'E', riskLevel: 'Very High', count: 1, color: '#FF6B6B' },
  
  // Probability 4 - High
  { probability: 4, consequence: 'A', riskLevel: 'Medium', count: 6, color: '#FEF7CD' },
  { probability: 4, consequence: 'B', riskLevel: 'Medium', count: 8, color: '#FEF7CD' },
  { probability: 4, consequence: 'C', riskLevel: 'High', count: 7, color: '#FFCCCB' },
  { probability: 4, consequence: 'D', riskLevel: 'High', count: 3, color: '#FFCCCB' },
  { probability: 4, consequence: 'E', riskLevel: 'Very High', count: 2, color: '#FF6B6B' },
  
  // Probability 3 - Medium
  { probability: 3, consequence: 'A', riskLevel: 'Low', count: 12, color: '#90EE90' },
  { probability: 3, consequence: 'B', riskLevel: 'Medium', count: 15, color: '#FEF7CD' },
  { probability: 3, consequence: 'C', riskLevel: 'Medium', count: 9, color: '#FEF7CD' },
  { probability: 3, consequence: 'D', riskLevel: 'High', count: 5, color: '#FFCCCB' },
  { probability: 3, consequence: 'E', riskLevel: 'High', count: 3, color: '#FFCCCB' },
  
  // Probability 2 - Low
  { probability: 2, consequence: 'A', riskLevel: 'Very Low', count: 18, color: '#F2FCE2' },
  { probability: 2, consequence: 'B', riskLevel: 'Low', count: 14, color: '#90EE90' },
  { probability: 2, consequence: 'C', riskLevel: 'Medium', count: 7, color: '#FEF7CD' },
  { probability: 2, consequence: 'D', riskLevel: 'Medium', count: 4, color: '#FEF7CD' },
  { probability: 2, consequence: 'E', riskLevel: 'High', count: 2, color: '#FFCCCB' },
  
  // Probability 1 - Very Low
  { probability: 1, consequence: 'A', riskLevel: 'Very Low', count: 22, color: '#F2FCE2' },
  { probability: 1, consequence: 'B', riskLevel: 'Very Low', count: 16, color: '#F2FCE2' },
  { probability: 1, consequence: 'C', riskLevel: 'Low', count: 8, color: '#90EE90' },
  { probability: 1, consequence: 'D', riskLevel: 'Low', count: 5, color: '#90EE90' },
  { probability: 1, consequence: 'E', riskLevel: 'Medium', count: 3, color: '#FEF7CD' },
];

// Fake data for sample risk items
const riskItemsData = [
  { id: 1, asset: 'Pressure Vessel PV-1001', riskLevel: 'High', probability: 4, consequence: 'C', system: 'Processing Unit A' },
  { id: 2, asset: 'Heat Exchanger HE-2034', riskLevel: 'Medium', probability: 3, consequence: 'B', system: 'Cooling System' },
  { id: 3, asset: 'Pipeline Section PS-3021', riskLevel: 'Very High', probability: 5, consequence: 'E', system: 'Transfer Line' },
  { id: 4, asset: 'Storage Tank ST-4017', riskLevel: 'Medium', probability: 2, consequence: 'D', system: 'Storage Area' },
  { id: 5, asset: 'Compressor C-5011', riskLevel: 'Low', probability: 1, consequence: 'C', system: 'Compression Unit' },
  { id: 6, asset: 'Valve Block V-6023', riskLevel: 'Very Low', probability: 1, consequence: 'A', system: 'Control System' },
  { id: 7, asset: 'Pump P-7019', riskLevel: 'Medium', probability: 3, consequence: 'C', system: 'Fluid Transfer' },
  { id: 8, asset: 'Reactor R-8005', riskLevel: 'High', probability: 4, consequence: 'D', system: 'Processing Unit B' },
];

// Sample data for inspection trends (unchanged)
const inspectionTrends = [
  { month: 'Jan', completed: 45, planned: 50 },
  { month: 'Feb', completed: 42, planned: 45 },
  { month: 'Mar', completed: 48, planned: 50 },
  { month: 'Apr', completed: 39, planned: 45 },
  { month: 'May', completed: 35, planned: 40 },
  { month: 'Jun', completed: 29, planned: 40 },
];

// Sample data for overdue inspections (unchanged)
const overdueInspections = [
  { id: 1, asset: 'Pressure Vessel PV-1001', dueDate: '2025-03-15', daysOverdue: 45, priority: 'High' },
  { id: 2, asset: 'Heat Exchanger HE-2034', dueDate: '2025-03-22', daysOverdue: 38, priority: 'Medium' },
  { id: 3, asset: 'Pipeline Section PS-3021', dueDate: '2025-03-05', daysOverdue: 55, priority: 'Critical' },
  { id: 4, asset: 'Storage Tank ST-4017', dueDate: '2025-03-28', daysOverdue: 32, priority: 'Medium' },
  { id: 5, asset: 'Compressor C-5011', dueDate: '2025-04-02', daysOverdue: 27, priority: 'Low' },
];

// Sample data for alert trends (unchanged)
const alertTrends = [
  { month: 'Jan', critical: 5, major: 12, minor: 23 },
  { month: 'Feb', critical: 3, major: 9, minor: 18 },
  { month: 'Mar', critical: 4, major: 11, minor: 22 },
  { month: 'Apr', critical: 8, major: 15, minor: 28 },
  { month: 'May', critical: 6, major: 14, minor: 25 },
  { month: 'Jun', critical: 4, major: 10, minor: 20 },
];

// Function to get priority color (unchanged)
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

// Function to get risk level badge color
const getRiskLevelBadge = (riskLevel: string) => {
  switch (riskLevel) {
    case 'Very High':
      return 'solid-danger';
    case 'High':
      return 'danger';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success';
    case 'Very Low':
      return 'solid-success';
    default:
      return 'info';
  }
};

const IMSDashboardPage: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<{ probability: number; consequence: string } | null>(null);
  const [filteredRiskItems, setFilteredRiskItems] = useState(riskItemsData);
  const [selectedSystem, setSelectedSystem] = useState<string>('All Systems');

  // Function to handle cell click
  const handleCellClick = (cell: { probability: number; consequence: string }) => {
    if (selectedCell && selectedCell.probability === cell.probability && 
        selectedCell.consequence === cell.consequence) {
      // If clicking the same cell, clear selection
      setSelectedCell(null);
      setFilteredRiskItems(riskItemsData);
    } else {
      // Select new cell and filter data
      setSelectedCell(cell);
      const filtered = riskItemsData.filter(item => 
        item.probability === cell.probability && 
        item.consequence === cell.consequence
      );
      setFilteredRiskItems(filtered);
    }
  };

  // Handle system filter change
  const handleSystemChange = (value: string) => {
    setSelectedSystem(value);
    if (value === 'All Systems') {
      // If "All Systems" is selected, just filter by selected cell (if any)
      if (selectedCell) {
        const filtered = riskItemsData.filter(item => 
          item.probability === selectedCell.probability && 
          item.consequence === selectedCell.consequence
        );
        setFilteredRiskItems(filtered);
      } else {
        setFilteredRiskItems(riskItemsData);
      }
    } else {
      // Filter by both system and selected cell (if any)
      let filtered = riskItemsData.filter(item => item.system === value);
      
      if (selectedCell) {
        filtered = filtered.filter(item => 
          item.probability === selectedCell.probability && 
          item.consequence === selectedCell.consequence
        );
      }
      
      setFilteredRiskItems(filtered);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCell(null);
    setSelectedSystem('All Systems');
    setFilteredRiskItems(riskItemsData);
  };

  // Get unique system values for dropdown
  const systemOptions = ['All Systems', ...Array.from(new Set(riskItemsData.map(item => item.system)))];

  // Probability labels for Y-axis
  const probabilityLabels = [
    { value: 5, label: '5 - Very High' },
    { value: 4, label: '4 - High' },
    { value: 3, label: '3 - Medium' },
    { value: 2, label: '2 - Low' },
    { value: 1, label: '1 - Very Low' },
  ];

  // Consequence labels for X-axis
  const consequenceLabels = [
    { value: 'A', label: 'A - Minor' },
    { value: 'B', label: 'B - Moderate' },
    { value: 'C', label: 'C - Major' },
    { value: 'D', label: 'D - Severe' },
    { value: 'E', label: 'E - Critical' },
  ];

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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">Risk Assessment Matrix</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">System:</span>
            <Select value={selectedSystem} onValueChange={handleSystemChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select system" />
              </SelectTrigger>
              <SelectContent>
                {systemOptions.map((system) => (
                  <SelectItem key={system} value={system}>
                    {system}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" onClick={resetFilters} className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </div>

      {/* Risk Matrix */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-auto">
            <div className="min-w-[600px]">
              {/* Consequence header row */}
              <div className="flex">
                <div className="w-32 flex flex-col justify-center items-center border-b border-r border-gray-200 bg-gray-50 p-3">
                  <span className="font-medium text-sm">Probability</span>
                  <span className="font-medium text-sm">↓</span>
                </div>
                <div className="flex-1 flex justify-between">
                  <div className="flex-1 text-center font-medium text-sm border-b border-r border-gray-200 bg-gray-50 p-3">Consequence →</div>
                </div>
              </div>
              
              {/* Consequence labels */}
              <div className="flex">
                <div className="w-32 border-r border-gray-200"></div>
                {consequenceLabels.map((col) => (
                  <div key={col.value} className="flex-1 text-center font-medium text-sm border-b border-r border-gray-200 bg-gray-50 p-3">
                    {col.label}
                  </div>
                ))}
              </div>

              {/* Matrix grid */}
              {probabilityLabels.map((row) => (
                <div key={row.value} className="flex">
                  {/* Probability label */}
                  <div className="w-32 text-sm border-b border-r border-gray-200 bg-gray-50 p-3 flex items-center justify-center font-medium">
                    {row.label}
                  </div>
                  
                  {/* Matrix cells */}
                  {consequenceLabels.map((col) => {
                    const cell = riskMatrixData.find(
                      item => item.probability === row.value && item.consequence === col.value
                    );
                    
                    const isSelected = selectedCell && 
                      selectedCell.probability === row.value && 
                      selectedCell.consequence === col.value;
                    
                    return (
                      <div 
                        key={`${row.value}-${col.value}`}
                        className={`flex-1 border-b border-r border-gray-200 p-3 text-center cursor-pointer transition-all ${
                          isSelected ? 'ring-2 ring-primary ring-inset' : ''
                        }`}
                        style={{ backgroundColor: cell?.color || '#ffffff' }}
                        onClick={() => handleCellClick({ probability: row.value, consequence: col.value })}
                      >
                        <div className="font-semibold text-sm">{cell?.riskLevel}</div>
                        <div className="text-lg font-bold mt-1">{cell?.count || 0}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Items */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">
            Risk Items
            {selectedCell && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                Filtered: Probability {selectedCell.probability} / Consequence {selectedCell.consequence}
              </span>
            )}
          </h3>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>System</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Consequence</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRiskItems.length > 0 ? (
                  filteredRiskItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.asset}</TableCell>
                      <TableCell>{item.system}</TableCell>
                      <TableCell>{item.probability}</TableCell>
                      <TableCell>{item.consequence}</TableCell>
                      <TableCell>
                        <Badge variant={getRiskLevelBadge(item.riskLevel)}>
                          {item.riskLevel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No risk items match the selected filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="inspections" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-2">
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
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
