
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database, FileText, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const assetDetails = {
  id: '1',
  assetId: 'AST001',
  name: 'Centrifugal Pump P-101',
  type: 'Pump',
  status: 'Active',
  location: 'Production Area',
  manufacturer: 'Grundfos',
  model: 'CR 32-2-2 A-F-A-E-HQQE',
  serialNumber: 'A9834512-01B',
  commissionDate: '2022-05-15',
  power: '11 kW',
  flowRate: '32 m³/h',
  head: '50 m',
  pressureRating: '16 bar',
  lastMaintenance: '2023-08-15',
  maintenanceSchedule: 'Quarterly',
  criticalSpares: ['Mechanical Seal', 'Shaft Sleeve', 'Bearings']
};

const AssetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call to fetch asset details
    setTimeout(() => {
      setAsset({
        ...assetDetails,
        id: id || '1'
      });
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleBack = () => {
    navigate("/manage/assets");
  };
  
  const handleEdit = () => {
    toast.info("Edit functionality would open a form to edit this asset");
  };
  
  if (loading) {
    return <div className="space-y-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/manage">Manage</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/manage/assets">Assets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Details</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded">
          <Database className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/manage">Manage</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/manage/assets">Assets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{asset.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Asset Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded">
          <Database className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">{asset.name}</h1>
      </div>
      
      {/* Main Content Card */}
      <div className="bg-white border rounded-lg shadow-sm">
        {/* Header with title and buttons */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{asset.name}</h2>
            <div className="text-sm text-muted-foreground">Asset ID: {asset.id}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">Asset ID:</div>
                <div className="font-medium">{asset.id}</div>
                <div className="text-muted-foreground">Name:</div>
                <div className="font-medium">{asset.name}</div>
                <div className="text-muted-foreground">Type:</div>
                <div className="font-medium">{asset.type}</div>
                <div className="text-muted-foreground">Status:</div>
                <div className="font-medium">{asset.status}</div>
                <div className="text-muted-foreground">Location:</div>
                <div className="font-medium">{asset.location}</div>
              </div>
            </div>
            
            {/* Manufacturer Info */}
            <div>
              <h3 className="text-lg font-medium mb-4">Manufacturer Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">Manufacturer:</div>
                <div className="font-medium">{asset.manufacturer}</div>
                <div className="text-muted-foreground">Model:</div>
                <div className="font-medium">{asset.model}</div>
                <div className="text-muted-foreground">Serial Number:</div>
                <div className="font-medium">{asset.serialNumber}</div>
                <div className="text-muted-foreground">Commission:</div>
                <div className="font-medium">{asset.commissionDate}</div>
              </div>
            </div>
          </div>
          
          {/* Tabs for detailed information */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="technical">Technical Data</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Manufacturer</h3>
                  <p className="text-base">{asset.manufacturer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Model</h3>
                  <p className="text-base">{asset.model}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Serial Number</h3>
                  <p className="text-base">{asset.serialNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Commission Date</h3>
                  <p className="text-base">{asset.commissionDate}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="pt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Power</h3>
                      <p className="text-base">{asset.power}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Flow Rate</h3>
                      <p className="text-base">{asset.flowRate}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Head</h3>
                      <p className="text-base">{asset.head}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Pressure Rating</h3>
                      <p className="text-base">{asset.pressureRating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="maintenance" className="pt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Last Maintenance</h3>
                      <p className="text-base">{asset.lastMaintenance}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Maintenance Schedule</h3>
                      <p className="text-base">{asset.maintenanceSchedule}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Critical Spares</h3>
                      <ul className="list-disc pl-5">
                        {asset.criticalSpares.map((spare: string, index: number) => (
                          <li key={index}>{spare}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span>Operation Manual</span>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span>Maintenance Guide</span>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span>Technical Specifications</span>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Warranty Certificate</span>
                      <Button size="sm" variant="outline" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
