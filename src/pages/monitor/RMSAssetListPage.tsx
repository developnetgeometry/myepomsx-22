import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import DataTable, { Column } from '@/components/shared/DataTable';
import { Card, CardContent } from '@/components/ui/card';
import { HardDrive, ArrowLeft, Printer, Edit } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Sample data for RMS assets
const initialAssets = [
  {
    id: '1',
    assetId: 'RMS-A001',
    assetName: 'Compressor Station Alpha',
    location: 'North Field',
    system: 'Gas Compression',
    healthStatus: 'Good',
    lastSync: '2025-04-28 09:15'
  },
  {
    id: '2',
    assetId: 'RMS-A002',
    assetName: 'Flow Control Valve FCV-201',
    location: 'Pipeline Junction B',
    system: 'Flow Control',
    healthStatus: 'Fair',
    lastSync: '2025-04-28 08:45'
  },
  {
    id: '3',
    assetId: 'RMS-A003',
    assetName: 'Pressure Transmitter PT-305',
    location: 'Central Processing',
    system: 'Pressure Monitoring',
    healthStatus: 'Poor',
    lastSync: '2025-04-27 23:10'
  },
  {
    id: '4',
    assetId: 'RMS-A004',
    assetName: 'Storage Tank Level Sensor',
    location: 'Tank Farm',
    system: 'Level Monitoring',
    healthStatus: 'Good',
    lastSync: '2025-04-28 10:30'
  },
  {
    id: '5',
    assetId: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    location: 'Pump Station 2',
    system: 'Temperature Monitoring',
    healthStatus: 'Critical',
    lastSync: '2025-04-28 07:50'
  }
];

const systems = [
  'Gas Compression',
  'Flow Control',
  'Pressure Monitoring',
  'Level Monitoring',
  'Temperature Monitoring',
  'Vibration Monitoring'
];

const locations = [
  'North Field',
  'Pipeline Junction B',
  'Central Processing',
  'Tank Farm',
  'Pump Station 2',
  'East Wing'
];

const RMSAssetListPage: React.FC = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    id: '',
    assetId: '',
    assetName: '',
    location: '',
    system: '',
    healthStatus: 'Good',
    lastSync: ''
  });

  useEffect(() => {
    if (id) {
      const asset = assets.find(a => a.id === id);
      if (asset) {
        setSelectedAsset(asset);
        setShowDetails(true);
      } else {
        navigate('/monitor/rms-asset-list');
      }
    } else {
      setShowDetails(false);
      setSelectedAsset(null);
    }
  }, [id, assets, navigate]);

  const handleAddNew = () => {
    setIsEditMode(false);
    const now = new Date();
    setFormData({
      id: `${assets.length + 1}`,
      assetId: `RMS-A${String(assets.length + 1).padStart(3, '0')}`,
      assetName: '',
      location: locations[0],
      system: systems[0],
      healthStatus: 'Good',
      lastSync: now.toISOString().slice(0, 16).replace('T', ' ')
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      setAssets(prev => 
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      setAssets(prev => [...prev, formData]);
    }
    
    setIsDialogOpen(false);
  };

  const handleRowClick = (row: any) => {
    navigate(`/monitor/rms-asset-list/${row.id}`);
  };

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'good':
        return <Badge variant="solid-success">Good</Badge>;
      case 'fair':
        return <Badge variant="solid-warning">Fair</Badge>;
      case 'poor':
        return <Badge variant="solid-danger">Poor</Badge>;
      case 'critical':
        return <Badge variant="solid-danger">Critical</Badge>;
      default:
        return <StatusBadge status={status} />;
    }
  };

  const columns: Column[] = [
    { id: 'assetId', header: 'Asset ID', accessorKey: 'assetId' },
    { id: 'assetName', header: 'Asset Name', accessorKey: 'assetName' },
    { id: 'location', header: 'Location', accessorKey: 'location' },
    { id: 'system', header: 'System', accessorKey: 'system' },
    { 
      id: 'healthStatus', 
      header: 'Health Status', 
      accessorKey: 'healthStatus',
      cell: (value) => <StatusBadge status={value} />
    },
    { id: 'lastSync', header: 'Last Sync', accessorKey: 'lastSync' },
  ];

  if (showDetails && selectedAsset) {
    return (
      <div className="space-y-6">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-gray-600"
              onClick={() => navigate('/monitor/rms-asset-list')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to RMS Asset List
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="indigo" size="sm" onClick={() => handleEdit(selectedAsset)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>
        
        {/* Asset Title and Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedAsset.assetName}
            </h1>
            <div className="flex items-center mt-2 text-gray-500">
              <span>Asset ID: {selectedAsset.assetId}</span>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Health Status:</span>
              {getStatusBadge(selectedAsset.healthStatus)}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Last Sync:</span>
              <span className="font-medium">{selectedAsset.lastSync}</span>
            </div>
          </div>
        </div>
        
        {/* Asset Details */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="border-b border-gray-200 w-full rounded-none bg-transparent justify-start px-6 h-14">
                <TabsTrigger 
                  value="details" 
                  className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                >
                  History
                </TabsTrigger>
                <TabsTrigger 
                  value="telemetry" 
                  className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                >
                  Telemetry Data
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-4">Asset Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Asset ID:</span>
                            <span className="font-medium">{selectedAsset.assetId}</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Asset Name:</span>
                            <span className="font-medium">{selectedAsset.assetName}</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Health Status:</span>
                            <div>{getStatusBadge(selectedAsset.healthStatus)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-gray-800 mb-4">Monitoring Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Last Sync:</span>
                            <span className="font-medium">{selectedAsset.lastSync}</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Sync Frequency:</span>
                            <span className="font-medium">15 minutes</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Connection Status:</span>
                            <Badge variant="solid-success">Connected</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-4">Location Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Location:</span>
                            <span className="font-medium">{selectedAsset.location}</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">System:</span>
                            <span className="font-medium">{selectedAsset.system}</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">GPS Coordinates:</span>
                            <span className="font-medium">N 53° 28' 47.8", E 1° 53' 12.6"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-gray-800 mb-4">Technical Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Sensor Type:</span>
                            <span className="font-medium">IoT Edge Device</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Firmware Version:</span>
                            <span className="font-medium">v2.4.1</span>
                          </div>
                          
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Battery Level:</span>
                            <span className="font-medium">87%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="p-6">
                <div className="space-y-6">
                  <h3 className="font-medium text-gray-800">Reading History</h3>
                  <div className="border-l-2 border-gray-200 pl-4 ml-4 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[1.25rem] mt-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">Normal Operation</h4>
                          <Badge variant="outline-success" className="ml-2">Normal</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{selectedAsset.lastSync}</p>
                        <p className="text-sm mt-2">All parameters within normal operating range.</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[1.25rem] mt-1.5 h-3 w-3 rounded-full bg-amber-500"></div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">Calibration</h4>
                          <Badge variant="outline-amber" className="ml-2">Maintenance</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">2025-04-20 14:30</p>
                        <p className="text-sm mt-2">Sensor calibration performed by technician.</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[1.25rem] mt-1.5 h-3 w-3 rounded-full bg-red-500"></div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium">Alert Detected</h4>
                          <Badge variant="outline-danger" className="ml-2">Alert</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">2025-04-15 03:12</p>
                        <p className="text-sm mt-2">Abnormal reading detected - pressure spike above threshold.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="telemetry" className="p-6">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">Telemetry Data Visualization</h3>
                  <p className="mt-1 text-gray-500">Interactive charts and real-time monitoring visualization would appear here.</p>
                  <Button className="mt-4" variant="outline">
                    Load Historical Data
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="RMS Asset List" 
        subtitle="Remote monitoring system assets"
        icon={<HardDrive className="h-6 w-6" />}
        onAddNew={handleAddNew}
        addNewLabel="+ Add Asset"
        onSearch={(query) => console.log('Search:', query)}
      />

      <Card>
        <CardContent className="p-6">
          <DataTable
            columns={columns}
            data={assets}
            onEdit={handleEdit}
            onRowClick={handleRowClick}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Edit RMS Asset' : 'Add New RMS Asset'}
            </DialogTitle>
            <DialogDescription>
              Enter asset details and connection information.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assetId">Asset ID</Label>
                <Input
                  id="assetId"
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleInputChange}
                  readOnly={isEditMode}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assetName">Asset Name</Label>
                <Input
                  id="assetName"
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="system">System</Label>
                <select
                  id="system"
                  name="system"
                  value={formData.system}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  {systems.map(system => (
                    <option key={system} value={system}>{system}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="healthStatus">Health Status</Label>
                <select
                  id="healthStatus"
                  name="healthStatus"
                  value={formData.healthStatus}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastSync">Last Sync</Label>
                <Input
                  id="lastSync"
                  name="lastSync"
                  value={formData.lastSync}
                  onChange={handleInputChange}
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

export default RMSAssetListPage;
