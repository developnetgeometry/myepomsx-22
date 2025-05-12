
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, HardDrive } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';

const RMSAssetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // This would be replaced with an API call in a real application
  const asset = {
    id: id,
    assetNo: `RMS-A${id?.padStart(3, '0')}`,
    assetName: 'Sample Asset Name',
    package: 'Package A',
    system: 'Gas Compression',
    facility: 'North Field',
    assetType: 'Compressor',
    model: 'CP-5000',
    status: 'Operational',
    sce: 'Yes',
    criticalityCode: 'A1'
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="RMS Asset Detail" 
          icon={<HardDrive className="h-6 w-6" />}
          subtitle={`Asset #${asset.assetNo}`}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/monitor/rms-asset-list')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Asset List
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Asset Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Number</h3>
              <p className="text-base">{asset.assetNo}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Name</h3>
              <p className="text-base">{asset.assetName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Package</h3>
              <p className="text-base">{asset.package}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">System</h3>
              <p className="text-base">{asset.system}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Facility</h3>
              <p className="text-base">{asset.facility}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Asset Type</h3>
              <p className="text-base">{asset.assetType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Model</h3>
              <p className="text-base">{asset.model}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <StatusBadge status={asset.status} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">SCE</h3>
              <p className="text-base">{asset.sce}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Criticality Code</h3>
              <p className="text-base">{asset.criticalityCode}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Uptime Data</h3>
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <p className="text-gray-600">No uptime data available for this asset.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RMSAssetDetailPage;
