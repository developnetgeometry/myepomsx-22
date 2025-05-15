
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from '@/components/shared/PageHeader';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

// Mock data for demonstration purposes
const mockPipingData = {
  id: "1",
  asset: "PV-1001",
  yearInService: "2020-01-01",
  materialConstruction: "Carbon Steel",
  area: "Area-1",
  system: "System-1",
  circuitId: "Circuit-1",
  lineNo: "L-101",
  tmin: "5.2",
  pipeClass: "Class A",
  pipeSchedule: "Schedule 40",
  nominalWallThickness: "6.35",
  nominalBoreDiameter: "4",
  pressureRating: "150",
  description: "Main process line connecting reactor to separator",
  insulation: true,
  lineH2S: false,
  internalLining: true,
  pwht: false,
  cladding: false,

  // Design data
  internalDiameter: "102.3",
  outerDiameter: "114.3",
  length: "24.5",
  weldJoinEfficiency: "0.85",
  designTemperature: "250",
  operatingTemperature: "180",
  designPressure: "2.5",
  operatingPressure: "1.8",
  allowableStress: "137.9",
  corrosionAllowance: "3.0",
  externalEnvironment: "Marine",
  geometry: "Straight",
  pipeSupport: true,
  soilWaterInterface: false,
  deadLegs: false,
  mixPoint: true,

  // Protection data
  coatingQuality: "Good",
  isolationSystem: "Manual",
  onlineMonitor: "Partial",
  trd: "5.5",
  minimumThickness: "4.8",
  postWeldHeatTreatment: "Yes",
  lineDescription: "Process Fluid Line",
  replacementLine: "N/A",
  detectionSystem: "Auto",
  mitigationSystem: "Advanced",
  active: true,
  crExp: "0.127",
  sretCorr: "0.85",
  fsectCorr: "0.95",

  // Service data
  toxicity: "Medium",
  toxicMassFraction: "0.05"
};

const PipingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real application, fetch data based on the ID
  const pipingData = mockPipingData;

  const renderDetailItem = (label: string, value: string | boolean) => {
    if (typeof value === 'boolean') {
      return (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className={`text-base ${value ? 'text-green-600' : 'text-red-600'}`}>
            {value ? 'Yes' : 'No'}
          </p>
        </div>
      );
    }
    
    return (
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base">{value || 'N/A'}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <PageHeader
        title={`Piping Detail - ${pipingData.lineNo}`}
        subtitle={`${pipingData.description}`}
        icon={<ShieldAlert className="h-6 w-6" />}
      />

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="protection">Protection</TabsTrigger>
              <TabsTrigger value="service">Service</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
              <TabsTrigger value="attachment">Attachment</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {renderDetailItem('Asset', pipingData.asset)}
                {renderDetailItem('Year In Service', pipingData.yearInService)}
                {renderDetailItem('Material Construction', pipingData.materialConstruction)}
                {renderDetailItem('Area', pipingData.area)}
                {renderDetailItem('System', pipingData.system)}
                {renderDetailItem('Circuit ID', pipingData.circuitId)}
                {renderDetailItem('Line No', pipingData.lineNo)}
                {renderDetailItem('Tmin', pipingData.tmin)}
                {renderDetailItem('Pipe Class', pipingData.pipeClass)}
                {renderDetailItem('Pipe Schedule', pipingData.pipeSchedule)}
                {renderDetailItem('Nominal Wall Thickness', pipingData.nominalWallThickness)}
                {renderDetailItem('Nominal Bore Diameter', pipingData.nominalBoreDiameter)}
                {renderDetailItem('Pressure Rating', pipingData.pressureRating)}
                {renderDetailItem('Description', pipingData.description)}
                {renderDetailItem('Insulation', pipingData.insulation)}
                {renderDetailItem('Line H2S', pipingData.lineH2S)}
                {renderDetailItem('Internal Lining', pipingData.internalLining)}
                {renderDetailItem('PWHT', pipingData.pwht)}
                {renderDetailItem('Cladding', pipingData.cladding)}
              </div>
            </TabsContent>

            {/* Design Tab */}
            <TabsContent value="design">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {renderDetailItem('Internal Diameter', pipingData.internalDiameter)}
                {renderDetailItem('Outer Diameter', pipingData.outerDiameter)}
                {renderDetailItem('Length', pipingData.length)}
                {renderDetailItem('Weld Join Efficiency', pipingData.weldJoinEfficiency)}
                {renderDetailItem('Design Temperature', pipingData.designTemperature)}
                {renderDetailItem('Operating Temperature', pipingData.operatingTemperature)}
                {renderDetailItem('Design Pressure (MPa)', pipingData.designPressure)}
                {renderDetailItem('Operating Pressure (MPa)', pipingData.operatingPressure)}
                {renderDetailItem('Allowable Stress (MPa)', pipingData.allowableStress)}
                {renderDetailItem('Corrosion Allowance', pipingData.corrosionAllowance)}
                {renderDetailItem('External Environment', pipingData.externalEnvironment)}
                {renderDetailItem('Geometry', pipingData.geometry)}
                {renderDetailItem('Pipe Support', pipingData.pipeSupport)}
                {renderDetailItem('Soil Water Interface', pipingData.soilWaterInterface)}
                {renderDetailItem('Dead Legs', pipingData.deadLegs)}
                {renderDetailItem('Mix Point', pipingData.mixPoint)}
              </div>
            </TabsContent>

            {/* Protection Tab */}
            <TabsContent value="protection">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {renderDetailItem('Coating Quality', pipingData.coatingQuality)}
                {renderDetailItem('Isolation System', pipingData.isolationSystem)}
                {renderDetailItem('Online Monitor', pipingData.onlineMonitor)}
                {renderDetailItem('Trd (mm)', pipingData.trd)}
                {renderDetailItem('Minimum Thickness (mm)', pipingData.minimumThickness)}
                {renderDetailItem('Post Weld Heat Treatment', pipingData.postWeldHeatTreatment)}
                {renderDetailItem('Line Description', pipingData.lineDescription)}
                {renderDetailItem('Replacement Line', pipingData.replacementLine)}
                {renderDetailItem('Detection System', pipingData.detectionSystem)}
                {renderDetailItem('Mitigation System', pipingData.mitigationSystem)}
                {renderDetailItem('Active', pipingData.active)}
                {renderDetailItem('CR Exp', pipingData.crExp)}
                {renderDetailItem('Sret Corr', pipingData.sretCorr)}
                {renderDetailItem('Fsect Corr', pipingData.fsectCorr)}
              </div>
            </TabsContent>

            {/* Service Tab */}
            <TabsContent value="service">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {renderDetailItem('Toxicity', pipingData.toxicity)}
                {renderDetailItem('Toxic Mass Fraction', pipingData.toxicMassFraction)}
              </div>
            </TabsContent>

            {/* Risk Tab */}
            <TabsContent value="risk">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No risk assessment data available</p>
              </div>
            </TabsContent>

            {/* Inspection Tab */}
            <TabsContent value="inspection">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No inspection data available</p>
              </div>
            </TabsContent>

            {/* Attachment Tab */}
            <TabsContent value="attachment">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">No attachments available</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PipingDetail;
