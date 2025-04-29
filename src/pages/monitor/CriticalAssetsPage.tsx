
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { AlertTriangle, Check, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample critical assets data
const criticalAssetsData = [
  {
    id: '1',
    assetName: 'Main Production Compressor',
    metric1: 'Vibration',
    metric1Value: '12.5 mm/s',
    metric1Threshold: '10 mm/s',
    metric2: 'Temperature',
    metric2Value: '82°C',
    metric2Threshold: '90°C',
    thresholdExceeded: true,
    alertLevel: 'Warning'
  },
  {
    id: '2',
    assetName: 'High Pressure Separator',
    metric1: 'Pressure',
    metric1Value: '18.7 MPa',
    metric1Threshold: '20 MPa',
    metric2: 'Level',
    metric2Value: '65%',
    metric2Threshold: '80%',
    thresholdExceeded: false,
    alertLevel: 'Normal'
  },
  {
    id: '3',
    assetName: 'Cooling Tower Pump',
    metric1: 'Flow Rate',
    metric1Value: '350 GPM',
    metric1Threshold: '300 GPM',
    metric2: 'Motor Current',
    metric2Value: '42 A',
    metric2Threshold: '40 A',
    thresholdExceeded: true,
    alertLevel: 'Critical'
  },
  {
    id: '4',
    assetName: 'Main Power Generator',
    metric1: 'Load',
    metric1Value: '85%',
    metric1Threshold: '90%',
    metric2: 'Frequency',
    metric2Value: '59.8 Hz',
    metric2Threshold: '59.5 Hz',
    thresholdExceeded: false,
    alertLevel: 'Normal'
  },
  {
    id: '5',
    assetName: 'Process Heater',
    metric1: 'Temperature',
    metric1Value: '550°C',
    metric1Threshold: '530°C',
    metric2: 'Fuel Flow',
    metric2Value: '120 m³/h',
    metric2Threshold: '140 m³/h',
    thresholdExceeded: true,
    alertLevel: 'Warning'
  }
];

const getAlertBadge = (alertLevel: string) => {
  switch (alertLevel) {
    case 'Normal':
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Normal</Badge>;
    case 'Warning':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Warning</Badge>;
    case 'Critical':
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Critical</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const CriticalAssetsPage: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredAssets = filter 
    ? criticalAssetsData.filter(asset => asset.alertLevel === filter)
    : criticalAssetsData;

  const handleFilter = (alertLevel: string | null) => {
    setFilter(alertLevel);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Critical Assets Tracking" 
        subtitle="Monitor and manage critical asset metrics"
        icon={<AlertTriangle className="h-6 w-6" />}
        onSearch={(query) => console.log('Search:', query)}
      />

      <div className="flex flex-wrap gap-3 mb-4">
        <Button 
          variant={filter === null ? "default" : "outline"} 
          onClick={() => handleFilter(null)}
        >
          All Assets
        </Button>
        <Button 
          variant={filter === "Normal" ? "default" : "outline"} 
          onClick={() => handleFilter("Normal")}
          className="border-green-200 text-green-600"
        >
          Normal
        </Button>
        <Button 
          variant={filter === "Warning" ? "default" : "outline"} 
          onClick={() => handleFilter("Warning")}
          className="border-yellow-200 text-yellow-600"
        >
          Warning
        </Button>
        <Button 
          variant={filter === "Critical" ? "default" : "outline"} 
          onClick={() => handleFilter("Critical")}
          className="border-red-200 text-red-600"
        >
          Critical
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Metric 1</TableHead>
                  <TableHead>Metric 1 Value</TableHead>
                  <TableHead>Metric 1 Threshold</TableHead>
                  <TableHead>Metric 2</TableHead>
                  <TableHead>Metric 2 Value</TableHead>
                  <TableHead>Metric 2 Threshold</TableHead>
                  <TableHead>Threshold Exceeded</TableHead>
                  <TableHead>Alert Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.assetName}</TableCell>
                    <TableCell>{asset.metric1}</TableCell>
                    <TableCell className={Number(asset.metric1Value.split(' ')[0]) > Number(asset.metric1Threshold.split(' ')[0]) ? 'text-red-600 font-medium' : ''}>
                      {asset.metric1Value}
                    </TableCell>
                    <TableCell>{asset.metric1Threshold}</TableCell>
                    <TableCell>{asset.metric2}</TableCell>
                    <TableCell className={Number(asset.metric2Value.split(' ')[0]) > Number(asset.metric2Threshold.split(' ')[0]) ? 'text-red-600 font-medium' : ''}>
                      {asset.metric2Value}
                    </TableCell>
                    <TableCell>{asset.metric2Threshold}</TableCell>
                    <TableCell>
                      {asset.thresholdExceeded ? 
                        <span className="inline-flex items-center text-red-600"><X className="h-4 w-4 mr-1" /> Y</span> : 
                        <span className="inline-flex items-center text-green-600"><Check className="h-4 w-4 mr-1" /> N</span>}
                    </TableCell>
                    <TableCell>{getAlertBadge(asset.alertLevel)}</TableCell>
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

export default CriticalAssetsPage;
