
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, MoreHorizontal } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from '@/components/shared/StatusBadge';

// Sample data - In a real application, you would fetch this from an API
const systemDetail = {
  id: '1',
  systemId: 'SYS001',
  name: 'Feed Water System',
  description: 'Process feed water treatment and distribution',
  category: 'Process',
  area: 'Plant Area A',
  project: 'Main Plant',
  status: 'Active',
  type: 'Critical',
  createdDate: '2023-05-15',
  modifiedDate: '2023-06-20',
  createdBy: 'John Smith',
  modifiedBy: 'Jane Doe'
};

const SystemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  
  // In a real application, you would fetch the system details based on the ID
  const system = systemDetail;
  
  const handleEdit = () => {
    setIsEditMode(true);
    // In a real application, you would navigate to the edit form or enable editing mode
    // For now, we'll just show an alert
    alert("Edit mode would be enabled here");
    setIsEditMode(false);
  };
  
  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/manage/system">Systems</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>System Details</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <PageHeader 
          title="System Detail" 
        />
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/manage/system')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Systems
          </Button>
          <Button onClick={handleEdit} className="flex items-center gap-2">
            <Edit className="h-4 w-4" /> Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Main Content */}
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">System Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-medium text-lg mb-3">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">System ID</h4>
                  <p className="text-base">{system.systemId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Name</h4>
                  <p className="text-base">{system.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                  <p className="text-base">{system.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <StatusBadge status={system.status} />
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* System Details */}
            <div>
              <h3 className="font-medium text-lg mb-3">System Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                  <p className="text-base">{system.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Area</h4>
                  <p className="text-base">{system.area}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Project</h4>
                  <p className="text-base">{system.project}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                  <p className="text-base">{system.description}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* System Metadata */}
            <div>
              <h3 className="font-medium text-lg mb-3">Record Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Created By</h4>
                  <p className="text-base">{system.createdBy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Created Date</h4>
                  <p className="text-base">{system.createdDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Modified By</h4>
                  <p className="text-base">{system.modifiedBy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Modified Date</h4>
                  <p className="text-base">{system.modifiedDate}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Related Assets */}
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-blue-800">Associated Assets</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
              <span className="font-medium">Asset-001</span>
              <span className="text-sm text-muted-foreground">Pump Station 1</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
              <span className="font-medium">Asset-002</span>
              <span className="text-sm text-muted-foreground">Control Valve A12</span>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
              <span className="font-medium">Asset-003</span>
              <span className="text-sm text-muted-foreground">Flow Meter FT-103</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemDetailPage;
