
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialRbiData } from './RBIAssessmentPage';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import RBIAssessmentTabs from '@/components/monitor/RBIAssessmentTabs';

const RBIAssessmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Find the RBI assessment in sample data
  const rbiAssessment = initialRbiData.find(item => item.id === id);
  
  if (!rbiAssessment) {
    return (
      <div className="space-y-6">
        <PageHeader 
          title="RBI Assessment Not Found" 
          icon={<ShieldAlert className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate('/monitor/rbi-assessment')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Assessments
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title={`RBI Assessment: ${rbiAssessment.rbiId}`} 
          icon={<ShieldAlert className="h-6 w-6" />}
          subtitle={`Asset: ${rbiAssessment.asset} | Risk Rank: ${rbiAssessment.riskRank}`}
        />
        <Button variant="outline" onClick={() => navigate('/monitor/rbi-assessment')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Assessments
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <RBIAssessmentTabs activeTab={activeTab} onTabChange={setActiveTab}>
            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">RBI ID</h3>
                  <p className="text-base">{rbiAssessment.rbiId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Asset</h3>
                  <p className="text-base">{rbiAssessment.asset}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Likelihood</h3>
                  <p className="text-base">{rbiAssessment.likelihood}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Consequence</h3>
                  <p className="text-base">{rbiAssessment.consequence}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Risk Rank</h3>
                  <p className="text-base">{rbiAssessment.riskRank}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Next Assessment Date</h3>
                  <p className="text-base">{rbiAssessment.nextAssessmentDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p className="text-base">{rbiAssessment.status}</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Additional tabs with their content */}
            <TabsContent value="receive">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Receive Records</h3>
                <p className="text-muted-foreground">No receive records available for this assessment.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="issue">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Issue Records</h3>
                <p className="text-muted-foreground">No issue records available for this assessment.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="return">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Return Records</h3>
                <p className="text-muted-foreground">No return records available for this assessment.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="adjustment">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Adjustment Records</h3>
                <p className="text-muted-foreground">No adjustment records available for this assessment.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="transfer">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Transfer Records</h3>
                <p className="text-muted-foreground">No transfer records available for this assessment.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="transaction">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Transaction Records</h3>
                <p className="text-muted-foreground">No transaction records available for this assessment.</p>
              </div>
            </TabsContent>
          </RBIAssessmentTabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RBIAssessmentDetailPage;
