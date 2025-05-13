
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AssetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Asset Details" 
          icon={<Database className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/manage/assets')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Assets
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Asset #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset ID</h3>
              <p className="text-base">{id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Name</h3>
              <p className="text-base">Centrifugal Pump P-101</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Type</h3>
              <p className="text-base">Pump</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Status</h3>
              <p className="text-base">Active</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
              <p className="text-base">Production Area</p>
            </div>
          </div>
          
          <Tabs defaultValue="general" className="pt-4">
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
                  <p className="text-base">Grundfos</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Model</h3>
                  <p className="text-base">CR 32-2-2 A-F-A-E-HQQE</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Serial Number</h3>
                  <p className="text-base">A9834512-01B</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Commission Date</h3>
                  <p className="text-base">2022-05-15</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technical" className="pt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Power</h3>
                      <p className="text-base">11 kW</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Flow Rate</h3>
                      <p className="text-base">32 m³/h</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Head</h3>
                      <p className="text-base">50 m</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Pressure Rating</h3>
                      <p className="text-base">16 bar</p>
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
                      <p className="text-base">2023-08-15</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Maintenance Schedule</h3>
                      <p className="text-base">Quarterly</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Critical Spares</h3>
                      <ul className="list-disc pl-5">
                        <li>Mechanical Seal</li>
                        <li>Shaft Sleeve</li>
                        <li>Bearings</li>
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
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span>Maintenance Guide</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span>Technical Specifications</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Warranty Certificate</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetDetailsPage;
