
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Building } from 'lucide-react';
import { facilityLocations } from '@/data/sampleData';
import { toast } from "sonner";
import { Separator } from '@/components/ui/separator';

// Find facility details from the sample data
const getFacilityDetails = (id: string) => {
  const facility = facilityLocations.find(facility => facility.id === id);
  
  if (!facility) return null;
  
  return {
    ...facility,
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
  const { id } = useParams<{ id: string }>();
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
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Facility Details" 
          icon={<Building className="h-6 w-6" />}
          breadcrumbOverride={[
            { href: "/", label: "Home" },
            { href: "/manage", label: "Manage" },
            { href: "/manage/facilities", label: "Facilities" },
            { label: "Loading..." }
          ]}
        />
        <Card>
          <CardContent className="pt-6 flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-64 bg-slate-200 rounded mb-4"></div>
              <div className="h-4 w-32 bg-slate-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!facility) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Facility Not Found" 
          icon={<Building className="h-6 w-6" />}
          breadcrumbOverride={[
            { href: "/", label: "Home" },
            { href: "/manage", label: "Manage" },
            { href: "/manage/facilities", label: "Facilities" },
            { label: "Not Found" }
          ]}
        />
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">The requested facility could not be found.</p>
            <Button className="mt-4 mx-auto block" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Facilities
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title={facility.name || "Facility Details"} 
        icon={<Building className="h-6 w-6" />}
        breadcrumbOverride={[
          { href: "/", label: "Home" },
          { href: "/manage", label: "Manage" },
          { href: "/manage/facilities", label: "Facilities" },
          { label: facility.name }
        ]}
      />
      
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{facility.name}</CardTitle>
                <CardDescription>Code: {facility.code}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Basic Information</h3>
                  <Separator className="my-2" />
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Facility Code:</dt>
                      <dd className="col-span-2 font-medium">{facility.code}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Name:</dt>
                      <dd className="col-span-2 font-medium">{facility.name}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Status:</dt>
                      <dd className="col-span-2 font-medium">{facility.status}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Manager:</dt>
                      <dd className="col-span-2 font-medium">{facility.manager}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Contact Information</h3>
                  <Separator className="my-2" />
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Phone:</dt>
                      <dd className="col-span-2 font-medium">{facility.phone}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Email:</dt>
                      <dd className="col-span-2 font-medium">{facility.email}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Address</h3>
                  <Separator className="my-2" />
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Street:</dt>
                      <dd className="col-span-2 font-medium">{facility.address}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">City:</dt>
                      <dd className="col-span-2 font-medium">{facility.city}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">State/Province:</dt>
                      <dd className="col-span-2 font-medium">{facility.state}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Postal Code:</dt>
                      <dd className="col-span-2 font-medium">{facility.zip}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Country:</dt>
                      <dd className="col-span-2 font-medium">{facility.country}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Inspections</h3>
                  <Separator className="my-2" />
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Last Inspection:</dt>
                      <dd className="col-span-2 font-medium">{facility.lastInspection}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Next Inspection:</dt>
                      <dd className="col-span-2 font-medium">{facility.nextInspection}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Notes</h3>
                  <Separator className="my-2" />
                  <p className="text-sm">{facility.notes}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacilityDetailPage;
