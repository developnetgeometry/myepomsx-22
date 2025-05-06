
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Archive } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { assets } from '@/data/sampleData';
import { Badge } from '@/components/ui/badge';

const AssetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the asset in sample data
  const asset = assets.find(asset => asset.id === id);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Asset Detail" 
          icon={<Archive className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/manage/assets')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Assets
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{asset?.name || `Asset #${id}`}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset No</h3>
              <p className="text-base">{asset?.assetNo || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Name</h3>
              <p className="text-base">{asset?.name || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package</h3>
              <p className="text-base">{asset?.package || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">System</h3>
              <p className="text-base">{asset?.system || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Facility</h3>
              <p className="text-base">{asset?.facility || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Tag</h3>
              <p className="text-base">{asset?.assetTag || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Model</h3>
              <p className="text-base">{asset?.model || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              {asset?.status ? <StatusBadge status={asset.status} /> : "N/A"}
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Technical Information</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">SCE Code</h3>
                    <p className="text-base">{asset?.sceCode || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Criticality Code</h3>
                    {asset?.criticalityCode && (
                      <Badge variant={
                        asset.criticalityCode === 'A' ? 'destructive' :
                        asset.criticalityCode === 'B' ? 'default' : 'outline'
                      }>
                        {asset.criticalityCode === 'A' ? 'A - Critical' :
                         asset.criticalityCode === 'B' ? 'B - Important' : 'C - Standard'}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="pt-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Maintenance History</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="divide-y">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Preventive Maintenance</p>
                      <p className="text-sm text-muted-foreground">Completed on Apr 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">PM-2025-042</Badge>
                    </div>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Corrective Maintenance</p>
                      <p className="text-sm text-muted-foreground">Completed on Mar 22, 2025</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">CM-2025-018</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetDetailPage;
