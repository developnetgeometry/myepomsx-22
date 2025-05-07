import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Archive, FileText, Printer, Search, Plus, Settings, FileUp } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { assets } from '@/data/sampleData';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
const AssetDetailPage: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();

  // Find the asset in sample data
  const asset = assets.find(asset => asset.id === id);
  const [activeTab, setActiveTab] = useState('installation');

  // Mock data for demonstration
  const assetDetails = {
    facilityLocation: "Central Processing Process",
    system: "Production",
    package: "V-110 Test Separator",
    parentAssetNo: "P-100",
    assetNo: asset?.assetNo || "V-110",
    assetName: asset?.name || "Test Separator",
    assetTag: "TAG-001",
    assetStatus: "Active",
    commissioningDate: "01/01/2001",
    assetGroup: "Processing Vessels",
    // Asset Details
    category: "Equipment",
    type: "DRUM",
    manufacturer: "ABC Manufacturing",
    makerNo: "MK-12345",
    model: "Model X-900",
    serialNumber: "SN-78601",
    assetClass: "Vessel",
    drawingNo: "DWG-110-001",
    // Classification & Tags
    hCode: "HC-001",
    axis: "Vertical",
    specification: "ASME VIII",
    sensor: "PRE-110",
    ecClass: "Class 2",
    ecCertificate: "EC-2023-001",
    sceCode: true,
    criticality: true,
    active: true,
    integrity: false,
    reliability: true,
    // Mock subtable data
    childAssets: [{
      id: "1",
      assetNo: "V-110-1",
      name: "Pressure Gauge",
      type: "Instrument"
    }, {
      id: "2",
      assetNo: "V-110-2",
      name: "Level Transmitter",
      type: "Instrument"
    }],
    workOrders: [{
      id: "WO-001",
      date: "15/03/2025",
      type: "Corrective",
      status: "Completed"
    }, {
      id: "WO-002",
      date: "22/04/2025",
      type: "Preventive",
      status: "Planned"
    }]
  };
  const handleWorkRequest = () => {
    toast.info("Opening work request for this asset");
    navigate(`/maintain/work-request?assetId=${id}`);
  };
  const handleApplyChanges = () => {
    toast.success("Asset details updated successfully");
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title={`Asset: ${assetDetails.assetName || `#${id}`}`} icon={<Archive className="h-6 w-6" />} />
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/manage/assets')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Assets
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" /> Print
          </Button>
        </div>
      </div>
      
      <div>
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Facility Location</label>
                <Input value={assetDetails.facilityLocation} readOnly />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">System</label>
                <Input value={assetDetails.system} readOnly />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Package</label>
                <Input value={assetDetails.package} readOnly />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Asset No</label>
                <Input value={assetDetails.assetNo} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Asset Name</label>
                <Input value={assetDetails.assetName} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Asset Tag</label>
                <Select defaultValue={assetDetails.assetTag}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TAG-001">TAG-001</SelectItem>
                    <SelectItem value="TAG-002">TAG-002</SelectItem>
                    <SelectItem value="TAG-003">TAG-003</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Asset Status</label>
                <Select defaultValue={assetDetails.assetStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Commissioning Date</label>
                <Input type="date" value="2001-01-01" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Details Section with Blue Header */}
        <Card className="mb-4">
          <CardHeader className="bg-blue-500 text-white p-2">
            <CardTitle className="text-base">Asset Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category</label>
                <Input value={assetDetails.category} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Type</label>
                <Input value={assetDetails.type} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Manufacturer</label>
                <Input value={assetDetails.manufacturer} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Maker No</label>
                <Input value={assetDetails.makerNo} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Model</label>
                <Input value={assetDetails.model} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Serial Number</label>
                <Input value={assetDetails.serialNumber} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Asset Class</label>
                <Input value={assetDetails.assetClass} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Drawing No</label>
                <Input value={assetDetails.drawingNo} />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">HCode</label>
                <Input value={assetDetails.hCode} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Axis</label>
                <Input value={assetDetails.axis} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Specification</label>
                <Input value={assetDetails.specification} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Sensor</label>
                <Select defaultValue={assetDetails.sensor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sensor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRE-110">PRE-110</SelectItem>
                    <SelectItem value="TEMP-110">TEMP-110</SelectItem>
                    <SelectItem value="LVL-110">LVL-110</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">EC Class</label>
                <Input value={assetDetails.ecClass} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium">EC Certificate</label>
                <Input value={assetDetails.ecCertificate} />
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sce" checked={assetDetails.sceCode} />
                  <label htmlFor="sce" className="text-sm font-medium">SCE Code</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="criticality" checked={assetDetails.criticality} />
                  <label htmlFor="criticality" className="text-sm font-medium">Criticality</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="active" checked={assetDetails.active} />
                  <label htmlFor="active" className="text-sm font-medium">Active</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="integrity" checked={assetDetails.integrity} />
                  <label htmlFor="integrity" className="text-sm font-medium">Integrity</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="reliability" checked={assetDetails.reliability} />
                  <label htmlFor="reliability" className="text-sm font-medium">Reliability</label>
                </div>
              </div>

              <div className="col-span-2 space-y-1.5">
                <label className="text-sm font-medium">Asset Image</label>
                <div className="flex items-center gap-2 mt-1">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileUp className="h-4 w-4" /> Choose file
                  </Button>
                  <span className="text-sm text-muted-foreground">No file chosen</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <Button variant="outline" onClick={() => navigate('/manage/assets')}>Cancel</Button>
              <Button variant="warning" onClick={handleWorkRequest}>Work Request</Button>
              <Button onClick={handleApplyChanges}>Apply Changes</Button>
            </div>
          </CardContent>
        </Card>
      
        {/* Tabs for V-110 Test Separator Details */}
        <Card>
          <CardHeader className="bg-blue-500 text-white p-2">
            <CardTitle className="text-base">{assetDetails.assetName} Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="childAsset">Child Asset</TabsTrigger>
                <TabsTrigger value="bom">BOM</TabsTrigger>
                <TabsTrigger value="workOrder">Work Order</TabsTrigger>
                <TabsTrigger value="attachment">Attachment</TabsTrigger>
                <TabsTrigger value="integrity">IoT
              </TabsTrigger>
              </TabsList>
              
              <TabsContent value="installation" className="pt-4">
                <div className="bg-muted/40 p-4 rounded-md text-center">
                  <p className="text-muted-foreground">Installation details will be displayed here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="childAsset" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Input placeholder="Search..." className="w-64 mr-2" />
                    <Button size="sm">Go</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="actions">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Actions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="actions">Actions</SelectItem>
                        <SelectItem value="export">Export</SelectItem>
                        <SelectItem value="delete">Delete Selected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="icon" className="ml-2">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Asset No</th>
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Type</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {assetDetails.childAssets.map(item => <tr key={item.id} className="hover:bg-muted/30">
                          <td className="p-3">{item.assetNo}</td>
                          <td className="p-3">{item.name}</td>
                          <td className="p-3">{item.type}</td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="bom" className="pt-4">
                <div className="bg-muted/40 p-4 rounded-md text-center">
                  <p className="text-muted-foreground">Bill of Materials will be displayed here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="workOrder" className="pt-4">
                <div className="bg-muted/40 p-4 rounded-md text-center">
                  <p className="text-muted-foreground">Work Orders will be displayed here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="attachment" className="pt-4">
                <div className="bg-muted/40 p-4 rounded-md text-center">
                  <p className="text-muted-foreground">Attachments will be displayed here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="integrity" className="pt-4">
                <div className="bg-muted/40 p-4 rounded-md text-center">
                  <p className="text-muted-foreground">Integrity data will be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default AssetDetailPage;