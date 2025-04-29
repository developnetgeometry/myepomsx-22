
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StatusBadge from '@/components/shared/StatusBadge';

// Sample data
const initialSensors = [
  {
    id: '1',
    sensorId: 'SEN-001',
    sensorName: 'Temperature Sensor A',
    sensorType: 'Temperature',
    minValue: '-40',
    maxValue: '120',
    unit: '°C',
    location: 'Boiler Room',
    assetId: 'BLR-001',
    status: 'Active',
    description: 'Monitors boiler temperature',
  },
  {
    id: '2',
    sensorId: 'SEN-002',
    sensorName: 'Pressure Sensor B',
    sensorType: 'Pressure',
    minValue: '0',
    maxValue: '200',
    unit: 'PSI',
    location: 'Piping System',
    assetId: 'PIP-002',
    status: 'Active',
    description: 'Monitors pipe pressure',
  },
  {
    id: '3',
    sensorId: 'SEN-003',
    sensorName: 'Vibration Sensor C',
    sensorType: 'Vibration',
    minValue: '0',
    maxValue: '50',
    unit: 'mm/s',
    location: 'Compressor',
    assetId: 'CMP-003',
    status: 'Active',
    description: 'Monitors compressor vibration',
  },
  {
    id: '4',
    sensorId: 'SEN-004',
    sensorName: 'Flow Meter D',
    sensorType: 'Flow',
    minValue: '0',
    maxValue: '1000',
    unit: 'L/min',
    location: 'Water System',
    assetId: 'WTR-004',
    status: 'Inactive',
    description: 'Measures water flow',
  },
  {
    id: '5',
    sensorId: 'SEN-005',
    sensorName: 'Humidity Sensor E',
    sensorType: 'Humidity',
    minValue: '0',
    maxValue: '100',
    unit: '%RH',
    location: 'HVAC System',
    assetId: 'HVC-005',
    status: 'Active',
    description: 'Monitors air humidity',
  },
];

const SensorPage: React.FC = () => {
  const [sensors, setSensors] = useState(initialSensors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    sensorId: '',
    sensorName: '',
    sensorType: '',
    minValue: '',
    maxValue: '',
    unit: '',
    location: '',
    assetId: '',
    status: 'Active',
    description: '',
  });

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({
      id: `${sensors.length + 1}`,
      sensorId: `SEN-${String(sensors.length + 1).padStart(3, '0')}`,
      sensorName: '',
      sensorType: '',
      minValue: '',
      maxValue: '',
      unit: '',
      location: '',
      assetId: '',
      status: 'Active',
      description: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (row: any) => {
    setIsEditMode(true);
    setFormData({
      ...row
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setSensors(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setSensors(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const columns: Column[] = [
    { id: 'sensorId', header: 'Sensor ID', accessorKey: 'sensorId' },
    { id: 'sensorName', header: 'Sensor Name', accessorKey: 'sensorName' },
    { id: 'sensorType', header: 'Sensor Type', accessorKey: 'sensorType' },
    { id: 'minValue', header: 'Min Value', accessorKey: 'minValue' },
    { id: 'maxValue', header: 'Max Value', accessorKey: 'maxValue' },
    { id: 'unit', header: 'Unit', accessorKey: 'unit' },
    { id: 'location', header: 'Location', accessorKey: 'location' },
    { id: 'assetId', header: 'Asset ID', accessorKey: 'assetId' },
    { 
      id: 'status', 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value) => <StatusBadge status={value} />
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sensor Setup" 
        onAddNew={handleAddNew}
        addNewLabel="+ New Sensor"
        onSearch={(query) => console.log('Search:', query)}
      />
      
      <DataTable 
        columns={columns}
        data={sensors}
        onEdit={handleEdit}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit Sensor' : 'Add New Sensor'}
            </DialogTitle>
            <DialogDescription>
              Fill in the sensor details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sensorId">Sensor ID</Label>
                <Input
                  id="sensorId"
                  name="sensorId"
                  value={formData.sensorId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sensorName">Sensor Name</Label>
                <Input
                  id="sensorName"
                  name="sensorName"
                  value={formData.sensorName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sensorType">Sensor Type</Label>
                <Select
                  name="sensorType"
                  value={formData.sensorType}
                  onValueChange={(value) => handleSelectChange('sensorType', value)}
                >
                  <SelectTrigger id="sensorType">
                    <SelectValue placeholder="Select sensor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Temperature">Temperature</SelectItem>
                    <SelectItem value="Pressure">Pressure</SelectItem>
                    <SelectItem value="Flow">Flow</SelectItem>
                    <SelectItem value="Level">Level</SelectItem>
                    <SelectItem value="Vibration">Vibration</SelectItem>
                    <SelectItem value="Humidity">Humidity</SelectItem>
                    <SelectItem value="pH">pH</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset ID</Label>
                <Input
                  id="assetId"
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minValue">Min Value</Label>
                <Input
                  id="minValue"
                  name="minValue"
                  value={formData.minValue}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxValue">Max Value</Label>
                <Input
                  id="maxValue"
                  name="maxValue"
                  value={formData.maxValue}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SensorPage;
