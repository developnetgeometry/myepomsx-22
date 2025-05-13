
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Layers, Pencil } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { System } from '@/types/manage';
import { systems, facilityLocations } from '@/data/sampleData';
import { toast } from 'sonner';

const SystemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [system, setSystem] = useState<System | null>(null);
  
  useEffect(() => {
    // Fetch system data based on id
    const foundSystem = systems.find(s => s.id === id);
    
    if (foundSystem) {
      // Find the facility name for the system
      const facility = facilityLocations.find(f => f.id === foundSystem.facilityId);
      
      // Create a system object that matches the System interface
      const systemData: System = {
        ...foundSystem,
        code: foundSystem.tag || '', // Use tag as code if available
        facilityLocationId: foundSystem.facilityId || '', // Use facilityId as facilityLocationId
        facilityLocation: facility?.name || 'Unknown'
      };
      
      setSystem(systemData);
    } else {
      toast.error("System not found");
      navigate('/manage/system');
    }
  }, [id, navigate]);

  const handleEdit = () => {
    // In a real application, this would open an edit form
    toast.info("Edit functionality would be implemented here");
  };
  
  if (!system) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="System Detail" 
          icon={<Layers className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/manage/system')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Systems
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
                <TableCell className="font-medium">System No</TableCell>
                <TableCell>{system.systemNo}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">System Name</TableCell>
                <TableCell>{system.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">System Code</TableCell>
                <TableCell>{system.code || system.tag}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Facility Location</TableCell>
                <TableCell>{system.facilityLocation}</TableCell>
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

export default SystemDetailPage;
