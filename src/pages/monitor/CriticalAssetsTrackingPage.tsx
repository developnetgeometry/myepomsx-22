
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, Filter, Save, Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import TableFilters from '@/components/shared/TableFilters';
import { formatCurrency } from '@/utils/formatters';
import { toast } from 'sonner';

// Sample data
const initialTrackingData = [
  { 
    id: '1', 
    asset: 'Compressor P-1001', 
    code: 'CC-001', 
    date: '2025-05-01', 
    upTime: 23.5, 
    sumRunningHour: 5642, 
    standBy: 0.5, 
    unplannedShutdown: 0, 
    plannedShutdown: 0, 
    description: 'Normal operation' 
  },
  { 
    id: '2', 
    asset: 'Pump System S-201', 
    code: 'CC-002', 
    date: '2025-05-01', 
    upTime: 24.0, 
    sumRunningHour: 8754, 
    standBy: 0, 
    unplannedShutdown: 0, 
    plannedShutdown: 0, 
    description: 'Normal operation' 
  },
  { 
    id: '3', 
    asset: 'Control Valve CV-305', 
    code: 'CC-003', 
    date: '2025-05-01', 
    upTime: 22.0, 
    sumRunningHour: 3421, 
    standBy: 0, 
    unplannedShutdown: 2, 
    plannedShutdown: 0, 
    description: 'Minor issue with control system, resolved' 
  },
  { 
    id: '4', 
    asset: 'Heat Exchanger E-401', 
    code: 'CC-004', 
    date: '2025-05-01', 
    upTime: 18.0, 
    sumRunningHour: 6231, 
    standBy: 0, 
    unplannedShutdown: 0, 
    plannedShutdown: 6, 
    description: 'Scheduled maintenance' 
  },
  { 
    id: '5', 
    asset: 'Storage Tank T-501', 
    code: 'CC-005', 
    date: '2025-05-01', 
    upTime: 24.0, 
    sumRunningHour: 7854, 
    standBy: 0, 
    unplannedShutdown: 0, 
    plannedShutdown: 0, 
    description: 'Normal operation' 
  }
];

// Sample assets for filter
const assets = [
  'All Assets',
  'Compressor P-1001',
  'Pump System S-201',
  'Control Valve CV-305',
  'Heat Exchanger E-401',
  'Storage Tank T-501'
];

const CriticalAssetsTrackingPage: React.FC = () => {
  const [trackingData, setTrackingData] = useState(initialTrackingData);
  const [selectedAsset, setSelectedAsset] = useState<string>("All Assets");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editableRowId, setEditableRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  
  // Summary calculations
  const filteredData = trackingData.filter(row => 
    (selectedAsset === "All Assets" || row.asset === selectedAsset) &&
    (startDate === "" || row.date >= startDate) &&
    (endDate === "" || row.date <= endDate)
  );
  
  const summary = {
    totalUpTime: filteredData.reduce((sum, row) => sum + row.upTime, 0),
    totalRunningHour: filteredData.reduce((sum, row) => sum + row.sumRunningHour, 0),
    totalStandBy: filteredData.reduce((sum, row) => sum + row.standBy, 0),
    totalUnplannedShutdown: filteredData.reduce((sum, row) => sum + row.unplannedShutdown, 0),
    totalPlannedShutdown: filteredData.reduce((sum, row) => sum + row.plannedShutdown, 0),
  };

  // Handle filter changes
  const handleFilterApply = () => {
    console.log("Applying filters:", { selectedAsset, startDate, endDate });
    // In a real application, this could fetch data from an API based on filters
    toast.success("Filters applied successfully");
  };
  
  // Handle filter reset
  const handleFilterReset = () => {
    setSelectedAsset("All Assets");
    setStartDate("");
    setEndDate("");
    toast.info("Filters have been reset");
  };
  
  // Start editing a row
  const handleEditRow = (rowId: string) => {
    const rowToEdit = trackingData.find(row => row.id === rowId);
    if (rowToEdit) {
      setEditFormData(rowToEdit);
      setEditableRowId(rowId);
    }
  };
  
  // Handle form data changes
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: name === 'upTime' || name === 'standBy' || 
              name === 'unplannedShutdown' || name === 'plannedShutdown' || 
              name === 'sumRunningHour' 
                ? parseFloat(value) 
                : value
    });
  };
  
  // Save edited row
  const handleSaveRow = () => {
    setTrackingData(trackingData.map(row => 
      row.id === editableRowId ? editFormData : row
    ));
    setEditableRowId(null);
    toast.success("Row updated successfully");
  };
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditableRowId(null);
  };
  
  // Add new row
  const handleAddRow = () => {
    const newRow = {
      id: `${trackingData.length + 1}`,
      asset: assets[1],
      code: `CC-${String(trackingData.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      upTime: 24.0,
      sumRunningHour: 0,
      standBy: 0,
      unplannedShutdown: 0,
      plannedShutdown: 0,
      description: 'New entry'
    };
    
    setTrackingData([...trackingData, newRow]);
    setEditFormData(newRow);
    setEditableRowId(newRow.id);
    toast.success("New row added");
  };
  
  // Delete row
  const handleDeleteRow = (rowId: string) => {
    setTrackingData(trackingData.filter(row => row.id !== rowId));
    toast.success("Row deleted successfully");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Critical Assets Tracking" 
        subtitle="Monitor and track critical asset performance"
        icon={<Database className="h-6 w-6" />}
      />
      
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="asset-select">Asset</Label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger id="asset-select">
                    <SelectValue placeholder="Select Asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset} value={asset}>
                        {asset}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 md:self-end">
              <Button variant="outline" onClick={handleFilterReset}>
                <Filter className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleFilterApply}>Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Summary Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Summary</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Total Up Time (hrs)</TableHead>
                  <TableHead>Total Running Hours</TableHead>
                  <TableHead>Total Stand By (hrs)</TableHead>
                  <TableHead>Total Unplanned Shutdown (hrs)</TableHead>
                  <TableHead>Total Planned Shutdown (hrs)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{summary.totalUpTime.toFixed(1)}</TableCell>
                  <TableCell>{summary.totalRunningHour}</TableCell>
                  <TableCell>{summary.totalStandBy.toFixed(1)}</TableCell>
                  <TableCell>{summary.totalUnplannedShutdown.toFixed(1)}</TableCell>
                  <TableCell>{summary.totalPlannedShutdown.toFixed(1)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Main Data Table */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Asset Tracking Data</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleAddRow}>
                <Plus className="mr-2 h-4 w-4" />
                Add Row
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save All Changes
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Up Time (hrs)</TableHead>
                  <TableHead>Sum Running Hour</TableHead>
                  <TableHead>Stand By (hrs)</TableHead>
                  <TableHead>Unplanned Shutdown (hrs)</TableHead>
                  <TableHead>Planned Shutdown (hrs)</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Select 
                          value={editFormData.asset}
                          onValueChange={(value) => setEditFormData({...editFormData, asset: value})}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                          <SelectContent>
                            {assets.filter(a => a !== "All Assets").map((asset) => (
                              <SelectItem key={asset} value={asset}>
                                {asset}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        row.asset
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          name="code"
                          value={editFormData.code}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.code
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          type="date"
                          name="date"
                          value={editFormData.date}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.date
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          type="number"
                          name="upTime"
                          value={editFormData.upTime}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.upTime.toFixed(1)
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          type="number"
                          name="sumRunningHour"
                          value={editFormData.sumRunningHour}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.sumRunningHour
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          type="number"
                          name="standBy"
                          value={editFormData.standBy}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.standBy.toFixed(1)
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          type="number"
                          name="unplannedShutdown"
                          value={editFormData.unplannedShutdown}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.unplannedShutdown.toFixed(1)
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          type="number"
                          name="plannedShutdown"
                          value={editFormData.plannedShutdown}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.plannedShutdown.toFixed(1)
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRowId === row.id ? (
                        <Input
                          name="description"
                          value={editFormData.description}
                          onChange={handleEditFormChange}
                        />
                      ) : (
                        row.description
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {editableRowId === row.id ? (
                          <>
                            <Button size="sm" onClick={handleSaveRow}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleEditRow(row.id)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteRow(row.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CriticalAssetsTrackingPage;
