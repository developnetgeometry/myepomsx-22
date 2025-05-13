
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Package, Pencil } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package as PackageType } from '@/types/manage';
import { packages, systems } from '@/data/sampleData';
import { toast } from 'sonner';

const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState<PackageType | null>(null);
  
  useEffect(() => {
    // Fetch package data based on id
    const foundPackage = packages.find(p => p.id === id);
    
    if (foundPackage) {
      // Find the system name for the package
      const system = systems.find(s => s.id === foundPackage.systemId);
      setPackageData({
        ...foundPackage,
        systemName: system?.name || 'Unknown'
      });
    } else {
      toast.error("Package not found");
      navigate('/manage/package');
    }
  }, [id, navigate]);

  const handleEdit = () => {
    // In a real application, this would open an edit form
    toast.info("Edit functionality would be implemented here");
  };
  
  if (!packageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Package Detail" 
          icon={<Package className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/manage/package')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Packages
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
                <TableCell className="font-medium">Package No</TableCell>
                <TableCell>{packageData.packageNo}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Package Name</TableCell>
                <TableCell>{packageData.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Package Tag</TableCell>
                <TableCell>{packageData.tag}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">System Name</TableCell>
                <TableCell>{packageData.systemName}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Package Type</TableCell>
                <TableCell>{packageData.type}</TableCell>
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

export default PackageDetailPage;
