import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Wrench } from 'lucide-react';
import { itemsMaster } from '@/data/sampleData';
import { toast } from "sonner";
import { Separator } from '@/components/ui/separator';

// Find part details from the sample data
const getPartDetails = (id: string) => {
  const item = itemsMaster.find(item => item.id === id);
  
  if (!item) return null;
  
  // Augment with additional fields for the part inventory
  return {
    ...item,
    partNo: `P-${item.itemsNo}`,
    quantity: Math.floor(Math.random() * 100),
    location: ['Main Warehouse', 'Secondary Storage', 'Production Floor'][Math.floor(Math.random() * 3)],
    lastUpdated: new Date().toLocaleDateString(),
    minimumStock: Math.floor(Math.random() * 10),
    reorderPoint: Math.floor(Math.random() * 20) + 10,
    unitCost: `$${(Math.random() * 1000).toFixed(2)}`,
    totalValue: `$${(Math.random() * 10000).toFixed(2)}`,
    condition: ['New', 'Used', 'Refurbished'][Math.floor(Math.random() * 3)],
    notes: "Standard inventory item with regular maintenance schedule."
  };
};

const PartsInventoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [part, setPart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // Simulate API call to fetch part details
      setTimeout(() => {
        const partDetails = getPartDetails(id);
        if (partDetails) {
          setPart(partDetails);
        } else {
          toast.error("Part not found");
          navigate("/manage/parts-inventory");
        }
        setLoading(false);
      }, 500);
    }
  }, [id, navigate]);
  
  const handleBack = () => {
    navigate("/manage/parts-inventory");
  };
  
  const handleEdit = () => {
    toast.info("Edit functionality would open a form to edit this part");
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Part Details" 
          icon={<Wrench className="h-6 w-6" />}
          breadcrumbOverride={[
            { href: "/", label: "Home" },
            { href: "/manage", label: "Manage" },
            { href: "/manage/parts-inventory", label: "Parts Inventory" },
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
  
  if (!part) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="Part Not Found" 
          icon={<Wrench className="h-6 w-6" />}
          breadcrumbOverride={[
            { href: "/", label: "Home" },
            { href: "/manage", label: "Manage" },
            { href: "/manage/parts-inventory", label: "Parts Inventory" },
            { label: "Not Found" }
          ]}
        />
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">The requested part could not be found.</p>
            <Button className="mt-4 mx-auto block" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Parts Inventory
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title={part.partName || "Part Details"} 
        icon={<Wrench className="h-6 w-6" />}
        breadcrumbOverride={[
          { href: "/", label: "Home" },
          { href: "/manage", label: "Manage" },
          { href: "/manage/parts-inventory", label: "Parts Inventory" },
          { label: part.partName }
        ]}
      />
      
      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{part.partName}</CardTitle>
                <CardDescription>Part No: {part.partNo}</CardDescription>
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
                      <dt className="text-muted-foreground">Category:</dt>
                      <dd className="col-span-2 font-medium">{part.category}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Type:</dt>
                      <dd className="col-span-2 font-medium">{part.type}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Manufacturer:</dt>
                      <dd className="col-span-2 font-medium">{part.manufacturer}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Manufacturer P/N:</dt>
                      <dd className="col-span-2 font-medium">{part.manufacturerPartsNo}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Condition:</dt>
                      <dd className="col-span-2 font-medium">{part.condition}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Inventory Details</h3>
                  <Separator className="my-2" />
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Quantity:</dt>
                      <dd className="col-span-2 font-medium">{part.quantity}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Location:</dt>
                      <dd className="col-span-2 font-medium">{part.location}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Minimum Stock:</dt>
                      <dd className="col-span-2 font-medium">{part.minimumStock}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Reorder Point:</dt>
                      <dd className="col-span-2 font-medium">{part.reorderPoint}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Last Updated:</dt>
                      <dd className="col-span-2 font-medium">{part.lastUpdated}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Financial Information</h3>
                  <Separator className="my-2" />
                  <dl className="grid grid-cols-1 gap-2 text-sm">
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Unit Cost:</dt>
                      <dd className="col-span-2 font-medium">{part.unitCost}</dd>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-muted-foreground">Total Value:</dt>
                      <dd className="col-span-2 font-medium">{part.totalValue}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Notes</h3>
                  <Separator className="my-2" />
                  <p className="text-sm">{part.notes}</p>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-semibold text-sm text-muted-foreground">Related Documents</h3>
                  <Separator className="my-2" />
                  <div className="text-sm text-muted-foreground italic">No documents attached</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartsInventoryDetailPage;
