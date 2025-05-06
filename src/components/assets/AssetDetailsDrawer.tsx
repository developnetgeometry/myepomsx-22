
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Printer, Edit } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface AssetDetailsDrawerProps {
  asset: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AssetDetailsDrawer: React.FC<AssetDetailsDrawerProps> = ({ 
  asset, 
  open, 
  onOpenChange 
}) => {
  if (!asset) return null;

  // Status badges styling
  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <Badge variant="solid-success">Active</Badge>;
      case 'inactive':
        return <Badge variant="solid-warning">Inactive</Badge>;
      case 'maintenance':
        return <Badge variant="solid-info">In Maintenance</Badge>;
      case 'decommissioned':
        return <Badge variant="solid-danger">Decommissioned</Badge>;
      default:
        return <StatusBadge status={status} />;
    }
  };
  
  const getCriticalityBadge = (code: string) => {
    switch(code) {
      case 'A':
        return <Badge variant="solid-danger">A - Critical</Badge>;
      case 'B':
        return <Badge variant="solid-warning">B - Important</Badge>;
      case 'C':
        return <Badge variant="solid-success">C - Standard</Badge>;
      default:
        return <Badge>{code}</Badge>;
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90%] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">{asset.name || asset.assetName}</DrawerTitle>
          <DrawerDescription className="flex items-center">
            Asset ID: {asset.assetNo || asset.assetId}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-6 py-2 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2">
            {asset.status && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Status:</span>
                {getStatusBadge(asset.status)}
              </div>
            )}
            {asset.criticalityCode && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Criticality:</span>
                {getCriticalityBadge(asset.criticalityCode)}
              </div>
            )}
            {asset.healthStatus && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Health Status:</span>
                <StatusBadge status={asset.healthStatus} />
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="indigo" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="p-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full border-b rounded-none bg-transparent justify-start mb-6">
              <TabsTrigger 
                value="details" 
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="files" 
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
              >
                Files
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
              >
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Asset Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {asset.assetNo && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Asset ID:</span>
                            <span className="font-medium">{asset.assetNo || asset.assetId}</span>
                          </div>
                        )}
                        
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Asset Name:</span>
                          <span className="font-medium">{asset.name || asset.assetName}</span>
                        </div>
                        
                        {asset.assetTag && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Asset Tag:</span>
                            <span className="font-medium">{asset.assetTag}</span>
                          </div>
                        )}
                        
                        {asset.model && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Model:</span>
                            <span className="font-medium">{asset.model}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Technical Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {asset.status && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Status:</span>
                            <div>{getStatusBadge(asset.status)}</div>
                          </div>
                        )}
                        
                        {asset.healthStatus && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Health Status:</span>
                            <div><StatusBadge status={asset.healthStatus} /></div>
                          </div>
                        )}
                        
                        {asset.sceCode && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">SCE Code:</span>
                            <span className="font-medium">{asset.sceCode}</span>
                          </div>
                        )}
                        
                        {asset.criticalityCode && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Criticality Code:</span>
                            <div>{getCriticalityBadge(asset.criticalityCode)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Location Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {asset.facility && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Facility:</span>
                            <span className="font-medium">{asset.facility}</span>
                          </div>
                        )}
                        
                        {asset.location && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Location:</span>
                            <span className="font-medium">{asset.location}</span>
                          </div>
                        )}
                        
                        {asset.system && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">System:</span>
                            <span className="font-medium">{asset.system}</span>
                          </div>
                        )}
                        
                        {asset.package && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Package:</span>
                            <span className="font-medium">{asset.package}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {asset.lastSync && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-4">Monitoring Information</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500">Last Sync:</span>
                              <span className="font-medium">{asset.lastSync}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="p-6">
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No attachments</h3>
                <p className="mt-1 text-gray-500">No files or attachments have been added to this asset.</p>
                <Button className="mt-4" variant="outline">
                  Upload Files
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="p-6">
              <div className="space-y-6">
                <h3 className="font-medium text-gray-800">Asset History</h3>
                <div className="border-l-2 border-gray-200 pl-4 ml-4 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[1.25rem] mt-1.5 h-3 w-3 rounded-full bg-indigo-500"></div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">Last Update</h4>
                        <Badge variant="outline-indigo" className="ml-2">Completed</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">April 15, 2025</p>
                      <p className="text-sm mt-2">Routine maintenance performed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AssetDetailsDrawer;
