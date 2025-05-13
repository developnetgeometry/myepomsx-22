
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, MoreHorizontal, Settings } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from '@/components/shared/StatusBadge';
import { toast } from 'sonner';

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
  const [loading, setLoading] = useState(true);
  const [system, setSystem] = useState(systemDetail);
  
  useEffect(() => {
    // Simulate API call to fetch system details
    setTimeout(() => {
      setSystem(systemDetail);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleEdit = () => {
    setIsEditMode(true);
    // In a real application, you would navigate to the edit form or enable editing mode
    toast.info("Edit functionality would open a form to edit this system");
    setIsEditMode(false);
  };
  
  const handleBack = () => {
    navigate("/manage/system");
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
            <BreadcrumbLink href="/manage/system">Systems</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Details</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded">
          <Settings className="h-6 w-6 text-blue-600" />
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
            <BreadcrumbLink href="/manage/system">Systems</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{system.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* System Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded">
          <Settings className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">{system.name}</h1>
      </div>
      
      {/* Main Content Card */}
      <div className="bg-white border rounded-lg shadow-sm">
        {/* Header with title and buttons */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{system.name}</h2>
            <div className="text-sm text-muted-foreground">ID: {system.systemId}</div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">System ID:</div>
                <div className="font-medium">{system.systemId}</div>
                <div className="text-muted-foreground">Name:</div>
                <div className="font-medium">{system.name}</div>
                <div className="text-muted-foreground">Type:</div>
                <div className="font-medium">{system.type}</div>
                <div className="text-muted-foreground">Status:</div>
                <div className="font-medium">
                  <StatusBadge status={system.status} />
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">System Details</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3">
                <div className="text-muted-foreground">Category:</div>
                <div className="font-medium">{system.category}</div>
                <div className="text-muted-foreground">Area:</div>
                <div className="font-medium">{system.area}</div>
                <div className="text-muted-foreground">Project:</div>
                <div className="font-medium">{system.project}</div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Description</h3>
              <div className="mb-6">
                <p>{system.description}</p>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Record Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">Created By:</div>
                <div className="font-medium">{system.createdBy}</div>
                <div className="text-muted-foreground">Created Date:</div>
                <div className="font-medium">{system.createdDate}</div>
                <div className="text-muted-foreground">Modified By:</div>
                <div className="font-medium">{system.modifiedBy}</div>
                <div className="text-muted-foreground">Modified Date:</div>
                <div className="font-medium">{system.modifiedDate}</div>
              </div>
            </div>
          </div>
          
          {/* Associated Assets Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Associated Assets</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemDetailPage;
