
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { HardDrive, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatDateTime } from '@/utils/formatters';
import UptimeEntryModal from '@/components/monitor/UptimeEntryModal';
import CriticalAssetSummary from '@/components/monitor/CriticalAssetSummary';

// Sample data for the asset
const assetData = {
  '1': {
    id: '1',
    assetNo: 'RMS-A001',
    assetName: 'Compressor Station Alpha',
    package: 'Gas Compression Package 1',
    system: 'Gas Compression',
    facility: 'North Field',
    assetTag: 'COMP-001',
    model: 'Atlas Copco GA 75',
    status: 'Active',
    sceCode: 'SCE-0023',
    criticalityCode: 'C1',
    healthStatus: 'Good',
    lastSync: '2025-05-12 09:15:22',
    description: 'Main compressor station for gas compression operations in the North Field. Provides critical pressure boost for the pipeline system.',
    installationDate: '2023-06-15',
    manufacturer: 'Atlas Copco',
    serialNumber: 'AC75981234',
    operatingTemperature: '85°C',
    operatingPressure: '12.6 MPa',
    location: 'Building A, Zone 3, North Field Facility',
    maintenanceHistory: [
      { date: '2025-01-15', type: 'Preventive', description: 'Quarterly inspection and filter replacement' },
      { date: '2024-10-20', type: 'Corrective', description: 'Replaced pressure sensor due to drift' },
      { date: '2024-07-05', type: 'Preventive', description: 'Semi-annual maintenance and calibration' }
    ]
  },
  '2': {
    id: '2',
    assetNo: 'RMS-A002',
    assetName: 'Flow Control Valve FCV-201',
    package: 'Flow Control Package A',
    system: 'Flow Control',
    facility: 'Pipeline Junction B',
    assetTag: 'FCV-201',
    model: 'Fisher 8580',
    status: 'Active',
    sceCode: 'SCE-0045',
    criticalityCode: 'C2',
    healthStatus: 'Fair',
    lastSync: '2025-05-12 08:45:30',
    description: 'Critical flow control valve managing gas distribution at Pipeline Junction B. Controls throughput to secondary distribution network.',
    installationDate: '2023-08-22',
    manufacturer: 'Fisher',
    serialNumber: 'F8580742198',
    operatingTemperature: '65°C',
    operatingPressure: '8.5 MPa',
    location: 'Pipeline Junction B, Section 4',
    maintenanceHistory: [
      { date: '2025-02-10', type: 'Preventive', description: 'Quarterly calibration and inspection' },
      { date: '2024-11-08', type: 'Corrective', description: 'Replaced valve stem seal due to minor leak' },
      { date: '2024-08-15', type: 'Preventive', description: 'Semi-annual maintenance' }
    ]
  },
  '3': {
    id: '3',
    assetNo: 'RMS-A003',
    assetName: 'Pressure Transmitter PT-305',
    package: 'Monitoring Package 3',
    system: 'Pressure Monitoring',
    facility: 'Central Processing',
    assetTag: 'PT-305',
    model: 'Rosemount 3051',
    status: 'Active',
    sceCode: 'SCE-0067',
    criticalityCode: 'C3',
    healthStatus: 'Poor',
    lastSync: '2025-05-11 23:10:45',
    description: 'High-accuracy pressure transmitter monitoring main processing line. Feeds critical data to control systems for safety monitoring.',
    installationDate: '2023-09-01',
    manufacturer: 'Rosemount',
    serialNumber: 'RM3051567432',
    operatingTemperature: '70°C',
    operatingPressure: '15.2 MPa',
    location: 'Process Area 2, Line 3, Central Processing Facility',
    maintenanceHistory: [
      { date: '2025-03-25', type: 'Corrective', description: 'Recalibration due to drift issues' },
      { date: '2024-12-12', type: 'Preventive', description: 'Quarterly inspection' },
      { date: '2024-09-05', type: 'Corrective', description: 'Replaced transmitter due to erratic readings' }
    ]
  },
  '4': {
    id: '4',
    assetNo: 'RMS-A004',
    assetName: 'Storage Tank Level Sensor',
    package: 'Tank Farm Package 2',
    system: 'Level Monitoring',
    facility: 'Tank Farm',
    assetTag: 'TK-LVL-004',
    model: 'Endress+Hauser FMP51',
    status: 'Inactive',
    sceCode: 'SCE-0089',
    criticalityCode: 'C1',
    healthStatus: 'Good',
    lastSync: '2025-05-12 10:30:15',
    description: 'High-precision level measurement for primary storage tank. Provides continuous real-time data for inventory management.',
    installationDate: '2023-07-12',
    manufacturer: 'Endress+Hauser',
    serialNumber: 'EH51982345',
    operatingTemperature: '45°C',
    operatingPressure: '0.2 MPa',
    location: 'Tank Farm, Tank 4, North Side',
    maintenanceHistory: [
      { date: '2025-02-05', type: 'Preventive', description: 'Quarterly inspection and calibration' },
      { date: '2024-10-18', type: 'Corrective', description: 'Firmware update to address calculation error' },
      { date: '2024-07-22', type: 'Preventive', description: 'Semi-annual maintenance' }
    ]
  },
  '5': {
    id: '5',
    assetNo: 'RMS-A005',
    assetName: 'Pump Motor Temperature Sensor',
    package: 'Pump Control Package 1',
    system: 'Temperature Monitoring',
    facility: 'Pump Station 2',
    assetTag: 'TEMP-007',
    model: 'Fluke 724',
    status: 'Maintenance',
    sceCode: 'SCE-0112',
    criticalityCode: 'C1',
    healthStatus: 'Critical',
    lastSync: '2025-05-12 07:50:38',
    description: 'Temperature monitoring for main transfer pump motor. Critical for preventing overheating and ensuring operational reliability.',
    installationDate: '2023-05-30',
    manufacturer: 'Fluke',
    serialNumber: 'FL724901234',
    operatingTemperature: '120°C',
    operatingPressure: 'N/A',
    location: 'Pump Station 2, Pump Array B, Position 3',
    maintenanceHistory: [
      { date: '2025-04-02', type: 'Corrective', description: 'Emergency replacement due to sensor failure' },
      { date: '2024-11-15', type: 'Preventive', description: 'Quarterly inspection' },
      { date: '2024-08-20', type: 'Corrective', description: 'Rewiring due to insulation damage' }
    ]
  },
  '6': {
    id: '6',
    assetNo: 'RMS-A006',
    assetName: 'Cooling Tower Fan Motor',
    package: 'Cooling System Package A',
    system: 'Cooling System',
    facility: 'North Field',
    assetTag: 'CT-FAN-003',
    model: 'ABB ACS880',
    status: 'Active',
    sceCode: 'SCE-0134',
    criticalityCode: 'C2',
    healthStatus: 'Good',
    lastSync: '2025-05-12 11:22:05',
    description: 'Primary drive motor for cooling tower fan #3. Essential for maintaining optimal process temperatures across the facility.',
    installationDate: '2023-08-05',
    manufacturer: 'ABB',
    serialNumber: 'ABB880762341',
    operatingTemperature: '70°C',
    operatingPressure: 'N/A',
    location: 'Cooling Tower A, North Field Facility',
    maintenanceHistory: [
      { date: '2025-03-10', type: 'Preventive', description: 'Quarterly inspection and lubrication' },
      { date: '2024-12-05', type: 'Preventive', description: 'Semi-annual maintenance' },
      { date: '2024-09-18', type: 'Corrective', description: 'Bearing replacement' }
    ]
  }
};

// Sample telemetry data
const generateTelemetryData = (hours = 24, baseTemp = 85, basePressure = 12, baseVibration = 2.5, id: string) => {
  const multipliers: {[key: string]: number} = {
    '1': 1.0,    // Normal readings
    '2': 1.1,    // Slightly elevated
    '3': 1.3,    // Poor health
    '5': 1.8,    // Critical readings
    '4': 0.9,    // Inactive - below normal
    '6': 1.05    // Good but slightly above normal
  };
  
  const multiplier = multipliers[id] || 1;
  
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    const minute = time.getMinutes();
    
    // Add some realistic variation
    const tempVariation = Math.sin(i / 3) * 5 * multiplier;
    const pressureVariation = Math.cos(i / 4) * 0.8 * multiplier;
    const vibrationVariation = Math.sin(i / 2) * 0.5 * multiplier;
    
    data.push({
      time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      temperature: parseFloat((baseTemp + tempVariation).toFixed(1)),
      pressure: parseFloat((basePressure + pressureVariation).toFixed(2)),
      vibration: parseFloat((baseVibration + vibrationVariation).toFixed(2))
    });
  }
  
  return data;
};

// Sample uptime data for the asset
const uptimeData = [
  { 
    id: "1-1", 
    date: new Date("2025-05-11"), 
    upTime: 23.5, 
    unplannedShutdown: 0.5, 
    plannedShutdown: 0.0, 
    description: "Brief power fluctuation" 
  },
  { 
    id: "1-2", 
    date: new Date("2025-05-10"), 
    upTime: 24.0, 
    unplannedShutdown: 0.0, 
    plannedShutdown: 0.0, 
    description: "Normal operation" 
  },
  { 
    id: "1-3", 
    date: new Date("2025-05-09"), 
    upTime: 18.5, 
    unplannedShutdown: 0.0, 
    plannedShutdown: 5.5, 
    description: "Scheduled maintenance" 
  }
];

// Sample alerts data
const generateAlertData = (id: string) => {
  const baseAlerts = [
    { 
      id: '1',
      metric: 'Temperature',
      value: '92.5°C',
      threshold: '90.0°C',
      status: 'Warning',
      timestamp: '2025-05-12 08:45:22'
    },
    {
      id: '2',
      metric: 'Pressure',
      value: '13.8 MPa',
      threshold: '13.5 MPa',
      status: 'Warning',
      timestamp: '2025-05-12 09:30:15'
    },
    {
      id: '3',
      metric: 'Vibration',
      value: '3.2 mm/s',
      threshold: '3.0 mm/s',
      status: 'Warning',
      timestamp: '2025-05-12 10:15:38'
    }
  ];
  
  // Customize based on asset health
  if (id === '3') { // Poor health
    return [
      ...baseAlerts,
      {
        id: '4',
        metric: 'Temperature',
        value: '98.2°C',
        threshold: '95.0°C',
        status: 'Critical',
        timestamp: '2025-05-12 07:12:54'
      },
      {
        id: '5',
        metric: 'Vibration',
        value: '4.5 mm/s',
        threshold: '4.0 mm/s',
        status: 'Critical',
        timestamp: '2025-05-12 11:03:27'
      }
    ];
  } else if (id === '5') { // Critical health
    return [
      ...baseAlerts,
      {
        id: '4',
        metric: 'Temperature',
        value: '110.5°C',
        threshold: '95.0°C',
        status: 'Critical',
        timestamp: '2025-05-12 07:12:54'
      },
      {
        id: '5',
        metric: 'Vibration',
        value: '5.8 mm/s',
        threshold: '4.0 mm/s',
        status: 'Critical',
        timestamp: '2025-05-12 11:03:27'
      },
      {
        id: '6',
        metric: 'Current',
        value: '42.3 A',
        threshold: '40.0 A',
        status: 'Critical',
        timestamp: '2025-05-12 06:58:12'
      }
    ];
  }
  
  return baseAlerts;
};

const RMSAssetDetailPage: React.FC = () => {
  const { id = "1" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(assetData[id as keyof typeof assetData]);
  const [telemetryData, setTelemetryData] = useState<any[]>([]);
  const [alertsData, setAlertsData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('basic');
  const [isUptimeModalOpen, setIsUptimeModalOpen] = useState(false);
  const [assetUptimeData, setAssetUptimeData] = useState(uptimeData);
  
  useEffect(() => {
    // Load the asset data based on ID
    const currentAsset = assetData[id as keyof typeof assetData];
    if (currentAsset) {
      setAsset(currentAsset);
      setTelemetryData(generateTelemetryData(24, 85, 12, 2.5, id));
      setAlertsData(generateAlertData(id));
    }
  }, [id]);

  if (!asset) {
    return <div className="p-8">Asset not found</div>;
  }

  const handleSaveUptimeData = (assetId: string, entries: any[]) => {
    console.log('Saving uptime data for asset:', assetId, entries);
    setAssetUptimeData(entries);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Asset: ${asset.assetName}`}
        subtitle={asset.assetNo}
        icon={<HardDrive className="h-6 w-6" />}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[500px] grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="telemetry">Live Telemetry</TabsTrigger>
          <TabsTrigger value="health">Health Status</TabsTrigger>
          <TabsTrigger value="alerts">Alert Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Basic Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto h-8 gap-1"
                  onClick={() => setIsUptimeModalOpen(true)}
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Uptime Entry</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Asset No</h3>
                    <p>{asset.assetNo}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Asset Name</h3>
                    <p>{asset.assetName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Package</h3>
                    <p>{asset.package}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">System</h3>
                    <p>{asset.system}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Facility</h3>
                    <p>{asset.facility}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Asset Tag</h3>
                    <p>{asset.assetTag}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Model</h3>
                    <p>{asset.model}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <p>{asset.status}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">SCE Code</h3>
                    <p>{asset.sceCode}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Criticality Code</h3>
                    <p>{asset.criticalityCode}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Sync</h3>
                    <p>{formatDateTime(asset.lastSync)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Health Status</h3>
                    <StatusBadge status={asset.healthStatus} />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{asset.description}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Installation Date</h3>
                    <p>{asset.installationDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Manufacturer</h3>
                    <p>{asset.manufacturer}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Serial Number</h3>
                    <p>{asset.serialNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Operating Temperature</h3>
                    <p>{asset.operatingTemperature}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Operating Pressure</h3>
                    <p>{asset.operatingPressure}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p>{asset.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <CriticalAssetSummary className="col-span-1 md:col-span-3" />
          </div>
        </TabsContent>
        
        <TabsContent value="telemetry" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Trend</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={telemetryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={['auto', 'auto']} label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" name="Temperature" stroke="#ef4444" strokeWidth={2} />
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
                    <LineChart data={telemetryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['auto', 'auto']} label={{ value: 'MPa', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="pressure" name="Pressure" stroke="#3b82f6" strokeWidth={2} />
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
                    <LineChart data={telemetryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={['auto', 'auto']} label={{ value: 'mm/s', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="vibration" name="Vibration" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold">
                    <StatusBadge status={asset.healthStatus} size="lg" />
                  </div>
                </div>
                
                <div className="w-full max-w-3xl">
                  <h3 className="font-semibold text-lg mb-4">Health Status Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Temperature Status</span>
                      <StatusBadge status={
                        asset.id === "5" ? "Critical" : 
                        asset.id === "3" ? "Poor" : 
                        asset.id === "2" ? "Fair" : "Good"
                      } />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pressure Status</span>
                      <StatusBadge status={
                        asset.id === "3" ? "Poor" : 
                        asset.id === "2" ? "Fair" : "Good"
                      } />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vibration Status</span>
                      <StatusBadge status={
                        asset.id === "5" ? "Critical" : 
                        asset.id === "3" ? "Poor" : "Good"
                      } />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Overall Performance</span>
                      <StatusBadge status={
                        asset.id === "5" ? "Critical" : 
                        asset.id === "3" ? "Poor" : 
                        asset.id === "2" ? "Fair" : "Good"
                      } />
                    </div>
                  </div>
                </div>
                
                <div className="w-full max-w-3xl">
                  <h3 className="font-semibold text-lg mb-4">Recent Maintenance History</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asset.maintenanceHistory?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertsData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6">
                        No alerts found for this asset
                      </TableCell>
                    </TableRow>
                  ) : (
                    alertsData.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>{alert.metric}</TableCell>
                        <TableCell>
                          <span className={
                            alert.status === 'Critical' ? 'text-red-500 font-semibold' : 
                            alert.status === 'Warning' ? 'text-orange-500 font-semibold' : ''
                          }>
                            {alert.value}
                          </span>
                        </TableCell>
                        <TableCell>{alert.threshold}</TableCell>
                        <TableCell>
                          <Badge className={
                            alert.status === 'Critical' ? 'bg-red-500' :
                            alert.status === 'Warning' ? 'bg-orange-500' :
                            'bg-green-500'
                          }>
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDateTime(alert.timestamp)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <UptimeEntryModal
        open={isUptimeModalOpen}
        onOpenChange={setIsUptimeModalOpen}
        assetId={asset.id}
        assetName={asset.assetName}
        initialData={assetUptimeData}
        onSave={handleSaveUptimeData}
      />
    </div>
  );
};

export default RMSAssetDetailPage;
