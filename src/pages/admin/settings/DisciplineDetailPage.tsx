
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from '@/components/shared/StatusBadge';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const DisciplineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real application, this would fetch data from an API
  const discipline = {
    id,
    code: `DISC${String(id).padStart(3, '0')}`,
    disciplineName: 'Mechanical Engineering',
    description: 'Discipline focused on mechanical systems, equipment and structures',
    color: '#1E88E5',
    status: 'Active'
  };
  
  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Discipline Details" 
          icon={<FileText className="h-6 w-6" />}
        />
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/settings/discipline')} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Disciplines
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Discipline #{id}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Field</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Code</TableCell>
                <TableCell>{discipline.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Discipline Name</TableCell>
                <TableCell>{discipline.disciplineName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Description</TableCell>
                <TableCell>{discipline.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Color</TableCell>
                <TableCell className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border" 
                    style={{ backgroundColor: discipline.color }}
                  ></div>
                  {discipline.color}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Status</TableCell>
                <TableCell>
                  <StatusBadge status={discipline.status} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisciplineDetailPage;
