import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Building, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { facilityLocations } from '@/data/sampleData';
import { toast } from "sonner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Find facility details from the sample data
const getFacilityDetails = (id: string) => {
  const facility = facilityLocations.find(facility => facility.id === id);
  if (!facility) return null;
  return {
    ...facility,
    code: 'FAC001',
    address: "123 Main Street, Building 4",
    city: "Houston",
    state: "TX",
    zip: "77001",
    country: "USA",
    phone: "(713) 555-1234",
    email: "facility@example.com",
    manager: "Jane Smith",
    status: "Active",
    lastInspection: "2025-04-15",
    nextInspection: "2025-10-15",
    notes: "Main operational facility with full maintenance capabilities."
  };
};
const FacilityDetailPage: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      // Simulate API call to fetch facility details
      setTimeout(() => {
        const facilityDetails = getFacilityDetails(id);
        if (facilityDetails) {
          setFacility(facilityDetails);
        } else {
          toast.error("Facility not found");
          navigate("/manage/facilities");
        }
        setLoading(false);
      }, 500);
    }
  }, [id, navigate]);
  const handleBack = () => {
    navigate("/manage/facilities");
  };
  const handleEdit = () => {
    toast.info("Edit functionality would open a form to edit this facility");
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
              <BreadcrumbLink href="/manage/facilities">Facilities</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Details</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-50 p-2 rounded">
            <Building className="h-6 w-6 text-blue-600" />
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
  if (!facility) {
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
              <BreadcrumbLink href="/manage/facilities">Facilities</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Not Found</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-xl font-medium mb-2">Facility Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested facility could not be found.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Facilities
          </Button>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-4">
        
      </Breadcrumb>
      
      {/* Facility Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-50 p-2 rounded">
          <Building className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">{facility.name}</h1>
      </div>
      
      {/* Main Content Card */}
      <div className="bg-white border rounded-lg shadow-sm">
        {/* Header with title and buttons */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">{facility.name}</h2>
            <div className="text-sm text-muted-foreground">Code: {facility.code}</div>
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
                <div className="text-muted-foreground">Facility Code:</div>
                <div className="font-medium">{facility.code}</div>
                <div className="text-muted-foreground">Name:</div>
                <div className="font-medium">{facility.name}</div>
                <div className="text-muted-foreground">Status:</div>
                <div className="font-medium">{facility.status}</div>
                <div className="text-muted-foreground">Manager:</div>
                <div className="font-medium">{facility.manager}</div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3">
                <div className="text-muted-foreground">Phone:</div>
                <div className="font-medium">{facility.phone}</div>
                <div className="text-muted-foreground">Email:</div>
                <div className="font-medium">{facility.email}</div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <h3 className="text-lg font-medium mb-4">Address</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">Street:</div>
                <div className="font-medium">{facility.address}</div>
                <div className="text-muted-foreground">City:</div>
                <div className="font-medium">{facility.city}</div>
                <div className="text-muted-foreground">State/Province:</div>
                <div className="font-medium">{facility.state}</div>
                <div className="text-muted-foreground">Postal Code:</div>
                <div className="font-medium">{facility.zip}</div>
                <div className="text-muted-foreground">Country:</div>
                <div className="font-medium">{facility.country}</div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Inspections</h3>
              <div className="grid grid-cols-[120px_1fr] gap-y-3 mb-6">
                <div className="text-muted-foreground">Last Inspection:</div>
                <div className="font-medium">{facility.lastInspection}</div>
                <div className="text-muted-foreground">Next Inspection:</div>
                <div className="font-medium">{facility.nextInspection}</div>
              </div>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <p>{facility.notes}</p>
          </div>
        </div>
      </div>
    </div>;
};
export default FacilityDetailPage;