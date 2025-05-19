
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Package, PipelineIcon, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const assetTypes = [
  {
    title: 'Pressure Vessels',
    description: 'Manage pressure vessel integrity assessments and monitoring',
    icon: <Package className="h-6 w-6" />,
    link: '/monitor/rbi-assessment'
  },
  {
    title: 'Piping Systems',
    description: 'Monitor and assess piping integrity and inspection data',
    icon: <PipelineIcon className="h-6 w-6" />,
    link: '/monitor/integrity/piping/new'
  },
  {
    title: 'Critical Equipment',
    description: 'View and manage critical equipment integrity status',
    icon: <AlertCircle className="h-6 w-6" />,
    link: '/monitor/critical-assets'
  }
];

const IntegrityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Asset Integrity Management"
        subtitle="Monitor and manage asset integrity data and risk assessments"
        icon={<Shield className="h-6 w-6" />}
      />
      
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assets">Asset Types</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Asset Integrity Overview</h2>
                  <p className="text-muted-foreground">
                    The Asset Integrity Management module helps you monitor, track, and manage the integrity
                    of your critical assets. Use this module to conduct risk-based inspections, track corrosion
                    studies, and maintain comprehensive integrity data.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {assetTypes.map((assetType, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          {assetType.icon}
                          <CardTitle>{assetType.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{assetType.description}</p>
                        <Button variant="outline" asChild className="w-full">
                          <Link to={assetType.link} className="flex items-center justify-between">
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assets" className="pt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Asset Categories</h3>
                <p className="text-muted-foreground">
                  Manage different types of assets and their integrity requirements.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Link to="/monitor/rbi-assessment">
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle>Risk Based Inspections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Conduct and manage risk-based inspection assessments for your assets.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link to="/monitor/corrosion-studies">
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle>Corrosion Studies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Track and analyze corrosion data across your asset portfolio.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="dashboard" className="pt-6">
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-medium">Available Dashboards</h3>
                <p className="text-muted-foreground">
                  Access specialized dashboards for asset integrity monitoring.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/monitor/ims-dashboard">
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle>IMS Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        View overall integrity management system metrics and alerts.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link to="/monitor/rms-dashboard">
                  <Card className="hover:bg-muted/50 transition-colors">
                    <CardHeader>
                      <CardTitle>RMS Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Monitor reliability management system data and performance metrics.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrityPage;
