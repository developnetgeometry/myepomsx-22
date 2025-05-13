
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Gauge } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import { toast } from 'sonner';

interface Sensor {
  id: string;
  sensorId: string;
  name: string;
  sensorType: string;
  minValue: number;
  maxValue: number;
  unit: string;
  location: string;
  assetId: string;
  assetName: string;
  status: string;
}

// Sample sensor data
const initialSensors = [
  {
    id: '1',
    sensorId: 'SENS001',
    name: 'Temperature Sensor 1',
    sensorType: 'Temperature',
    minValue: 0,
    maxValue: 200,
    unit: '°C',
    location: 'Reactor Main Chamber',
    assetId: '1',
    assetName: 'Reactor R-1001',
    status: 'Active',
  },
  {
    id: '2',
    sensorId: 'SENS002',
    name: 'Pressure Transmitter 1',
    sensorType: 'Pressure',
    minValue: 0,
    maxValue: 100,
    unit: 'PSI',
    location: 'Pipeline Segment A',
    assetId: '2',
    assetName: 'Pump P-2001',
    status: 'Active',
  },
  {
    id: '3',
    sensorId: 'SENS003',
    name: 'Flow Meter 1',
    sensorType: 'Flow',
    minValue: 0,
    maxValue: 500,
    unit: 'L/min',
    location: 'Inlet Manifold',
    assetId: '3',
    assetName: 'Heat Exchanger E-3001',
    status: 'Active',
  },
  {
    id: '4',
    sensorId: 'SENS004',
    name: 'Vibration Monitor 1',
    sensorType: 'Vibration',
    minValue: 0,
    maxValue: 25,
    unit: 'mm/s',
    location: 'Motor Housing',
    assetId: '4',
    assetName: 'Compressor C-4001',
    status: 'Inactive',
  },
  {
    id: '5',
    sensorId: 'SENS005',
    name: 'Level Transmitter 1',
    sensorType: 'Level',
    minValue: 0,
    maxValue: 100,
    unit: '%',
    location: 'Storage Tank',
    assetId: '5',
    assetName: 'Tank T-5001',
    status: 'Active',
  },
];

const SensorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sensor, setSensor] = useState<Sensor | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundSensor = initialSensors.find(s => s.id === id);
    
    if (foundSensor) {
      setSensor(foundSensor);
    } else {
      toast.error("Sensor not found");
      navigate('/admin/setup/sensor');
    }
  }, [id, navigate]);
  
  if (!sensor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Sensor Details" 
          icon={<Gauge className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/setup/sensor')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Sensors
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sensor ID</TableCell>
                <TableCell>{sensor.sensorId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sensor Name</TableCell>
                <TableCell>{sensor.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sensor Type</TableCell>
                <TableCell>{sensor.sensorType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Min Value</TableCell>
                <TableCell>{sensor.minValue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Max Value</TableCell>
                <TableCell>{sensor.maxValue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Unit</TableCell>
                <TableCell>{sensor.unit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Location</TableCell>
                <TableCell>{sensor.location}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Asset ID</TableCell>
                <TableCell>
                  <Link to={`/manage/asset-register/${sensor.assetId}`} className="text-blue-600 hover:underline">
                    {sensor.assetName}
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={sensor.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorDetailPage;
