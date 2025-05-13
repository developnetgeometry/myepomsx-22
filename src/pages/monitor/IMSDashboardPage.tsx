
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import KpiCard from '@/components/shared/KpiCard';
import { Database, Activity, AlertTriangle, Gauge, ShieldAlert } from 'lucide-react';
import RiskMatrix from '@/components/monitor/RiskMatrix';

const IMSDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="IMS Dashboard" 
        subtitle="Integrity Management System Overview"
        icon={<ShieldAlert className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard 
          title="Total Assets" 
          value="124" 
          icon={<Database className="h-6 w-6" />} 
          changeLabel="12 critical"
        />
        <KpiCard 
          title="High Risk Items" 
          value="15" 
          icon={<AlertTriangle className="h-6 w-6" />} 
          change={3}
          changeDirection="down"
          positiveChange="down"
          changeLabel="vs last month"
        />
        <KpiCard 
          title="Inspection Compliance" 
          value="92.5%" 
          icon={<Activity className="h-6 w-6" />} 
          change={1.5}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last month"
        />
        <KpiCard 
          title="Overall Integrity" 
          value="87%" 
          icon={<Gauge className="h-6 w-6" />} 
          change={2.3}
          changeDirection="up"
          positiveChange="up"
          changeLabel="vs last quarter"
        />
      </div>

      <Tabs defaultValue="risk" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="risk">Risk Matrix</TabsTrigger>
          <TabsTrigger value="integrity">Integrity Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="risk" className="mt-6">
          <RiskMatrix />
        </TabsContent>
        
        <TabsContent value="integrity" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inspection Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <p className="text-muted-foreground">
                    Inspection completion metrics will be displayed here. The chart will show completion rates across different asset categories.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Integrity Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <p className="text-muted-foreground">
                    Integrity metrics will be displayed here. The chart will show key integrity indicators and their trends over time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IMSDashboardPage;
