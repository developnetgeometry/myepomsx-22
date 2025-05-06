
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Building } from 'lucide-react';

const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Company Detail" 
          icon={<Building className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/admin/setup/company')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Companies
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Company #{id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company ID</h3>
              <p className="text-base">COMP{String(id).padStart(3, '0')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company Name</h3>
              <p className="text-base">Company name would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
              <p className="text-base">Contact person would appear here</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-base">email@example.com</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p className="text-base">(123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p className="text-base">Active</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
              <p className="text-base">Company address would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDetailPage;
