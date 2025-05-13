
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Building, Pencil } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FacilityLocation } from '@/types/manage';
import { facilityLocations } from '@/data/sampleData';
import { toast } from 'sonner';

const FacilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<FacilityLocation | null>(null);
  
  useEffect(() => {
    // Fetch facility data based on id
    const foundFacility = facilityLocations.find(f => f.id === id);
    
    if (foundFacility) {
      setFacility(foundFacility);
    } else {
      toast.error("Facility not found");
      navigate('/manage/facilities');
    }
  }, [id, navigate]);

  const handleEdit = () => {
    // In a real application, this would open an edit form
    toast.info("Edit functionality would be implemented here");
  };
  
  if (!facility) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Facility Detail" 
          icon={<Building className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/manage/facilities')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Facilities
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Field</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[100px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Facility Location Code</TableCell>
                <TableCell>{facility.code}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Facility Location</TableCell>
                <TableCell>{facility.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilityDetailPage;
