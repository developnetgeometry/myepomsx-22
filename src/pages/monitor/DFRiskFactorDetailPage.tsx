
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Info, ShieldAlert } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FieldGroupProps {
  label: string;
  children: React.ReactNode;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ label, children }) => {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
      <div className="font-medium">{children}</div>
    </div>
  );
};

const ReadOnlyField: React.FC<{ label: string; value: string | number | React.ReactNode }> = ({ label, value }) => {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
      <div className="h-10 px-3 py-2 rounded-md border bg-muted/20 flex items-center text-muted-foreground">
        {value}
      </div>
    </div>
  );
};

const DateField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <ReadOnlyField 
      label={label} 
      value={
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          {value}
        </div>
      } 
    />
  );
};

const NumericField: React.FC<{ label: string; value: number | string }> = ({ label, value }) => {
  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
      <div className="h-10 px-3 py-2 rounded-md border bg-muted/20 flex items-center justify-end">
        {value}
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'good':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80';
      case 'poor':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80';
      case 'high':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80';
      case 'low':
        return 'bg-red-100 text-red-800 hover:bg-red-100/80';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
    }
  };

  return (
    <Badge variant="outline" className={`font-medium ${getStatusVariant(status)}`}>
      {status}
    </Badge>
  );
};

const DFRiskFactorDetailPage: React.FC = () => {
  const { id, assetId } = useParams<{ id: string; assetId: string }>();
  const navigate = useNavigate();

  // This would be fetched from an API in a real implementation
  const assetName = "Separator Vessel V-1001";
  
  // Sample data - would come from API
  const dfData = {
    // DF THIN data
    thin: {
      lastInspectionDate: '2023-05-15',
      lastCoatingDate: '2020-08-23',
      nthinA: 0.254,
      nthinB: 0.127,
      fsThin: 1.25,
      srThin: 0.85,
      dfThin1: 2.37,
      dfThin2: 1.92,
      creep: 0.05,
      dataConfidence: 'High'
    },
    
    // DF EXT data
    ext: {
      eqId: 'V-1001',
      coatingQuality: 'Good',
      newCoatDate: '2020-08-23',
      lastInspectionDate: '2023-05-15',
      trd: 12.5,
      agetk: 8.5,
      agecoat: 3.2,
      coatadj: 1.5,
      age: 8.5,
      extEnv: 'Marine',
      pipeSupport: 'Yes',
      soilWaterInterface: 'No',
      crexp: 0.127,
      cract: 0.102,
      art: 1.25,
      fsextcorr: 1.37,
      srextcorr: 0.95,
      nextcorrA: 0.254,
      nextcorrB: 0.381,
      nextcorrC: 0.508,
      nextcorrD: 0.635,
      dataConfidence: 'Medium',
      iextcorr1: 0.85,
      iextcorr2: 0.92,
      iextcorr3: 0.78,
      poextcorrP1: 0.02,
      poextcorrP2: 0.05,
      poextcorrP3: 0.03,
      bextcorr1: 0.72,
      bextcorr2: 0.68,
      bextcorr3: 0.74,
      dfextcorrF: 1.28,
      remainingLife: 15.6,
      rl: 'Good',
      remarks: 'No significant external corrosion observed'
    },
    
    // DF EXT.CLSCC data
    extClScc: {
      eqId: 'V-1001',
      coatingQuality: 'Good',
      newCoatDate: '2020-08-23',
      lastInspectionDate: '2023-05-15',
      agecrack: 0,
      agecoat: 3.2,
      coatadj: 1.5,
      age: 8.5,
      extEnvironment: 'Marine',
      extClSccSusc: 'Low',
      svi: 50,
      inspEff: 'Good',
      dfExtClSccFb: 0.8,
      dfExtClScc: 0.8
    },
    
    // DF MFAT data
    mfat: {
      cycleCount: 1250,
      stressCycles: 'Low',
      fatigueCategory: 'Medium',
      designCycles: 10000,
      dfMfat: 1.2
    },
    
    // DF CUI data
    cui: {
      eqId: 'V-1001',
      coatingQuality: 'Good',
      newCoatDate: '2020-08-23',
      lastInspectionDate: '2023-05-15',
      trd: 12.5,
      agetk: 8.5,
      agecoat: 3.2,
      coatadj: 1.5,
      age: 8.5,
      extEnvironment: 'Marine',
      insulationType: 'Mineral Wool',
      complexity: 'Medium',
      condition: 'Good',
      eqDesignFab: 'Standard',
      interface: 'Minimal',
      crexp: 0.127,
      cract: 0.102,
      art: 1.25,
      fscuif: 1.15,
      srcuif: 0.9,
      ncuifa: 0.254,
      ncuifb: 0.381,
      ncuifc: 0.508,
      ncuifd: 0.635,
      dataConfidence: 'High',
      icuif1: 0.85,
      icuif2: 0.92,
      icuif3: 0.78,
      pocuifp1: 0.02,
      pocuifp2: 0.05,
      pocuifp3: 0.03,
      bcuif1: 0.72,
      bcuif2: 0.68,
      bcuif3: 0.74,
      dfcuiff: 1.28,
      remainingLife: 18.2
    },
    
    // DF SCC SSC data
    sccSsc: {
      eqId: 'V-1001',
      susceptibility: 'No',
      h2sInWater: 'Low',
      ph: 7.5,
      envSeverity: 'Low',
      pwht: 'Yes',
      hardnessBrinnell: 150,
      sscSuscFToHt: 'Low',
      svi: 50,
      inspEff: 'Good',
      dfSccFb: 0.7,
      lastInsp: '2023-05-15',
      dfScc: 0.7
    },
    
    // DF SCC SOHIC data
    sccSohic: {
      eqId: 'V-1001',
      susceptibility: 'No',
      h2sInWater: 'Low',
      ph: 7.5,
      envSeverity: 'Low',
      pwht: 'Yes',
      steelSContent: 'Low',
      suscToCrack: 'Low',
      svi: 50,
      inspEff: 'Good',
      dfSohicFb: 0.6,
      lastInsp: '2023-05-15',
      onlineMonitoring: 'Yes',
      dfScc: 0.6
    },
    
    // DF LIN data
    lin: {
      eqId: 'V-1001',
      lastInspDate: '2023-05-15',
      liningType: 'Epoxy',
      liningCondition: 'Good',
      liningMonitoring: 'Visual',
      dfElin: 0.9
    },
    
    // DF CUI CLSCC data
    cuiClscc: {
      eqId: 'V-1001',
      coatingQuality: 'Good',
      newCoatDate: '2020-08-23',
      lastInspectionDate: '2023-05-15',
      agecrack: 0,
      agecoat: 3.2,
      coatadj: 1.5,
      age: 8.5,
      extEnvironment: 'Marine',
      cuiClSccSusc: 'Low',
      pipingComplexity: 'Medium',
      insulationCondition: 'Good',
      chlorideFreeInsulation: 'Yes',
      cuiClSccSuscFinal: 'Low',
      svi: 50,
      inspEff: 'Good',
      dfCuiClSccFb: 0.8,
      dfExtClScc: 0.8
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/monitor/integrity">Integrity</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/monitor/rbi-assessment/${id}`}>{assetName}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Risk Assessment Detail</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center justify-between">
        <PageHeader 
          title="Damage Factor Risk Assessment" 
          subtitle={assetName}
          icon={<ShieldAlert className="h-6 w-6" />}
        />
        <Button variant="outline" onClick={() => navigate(`/monitor/rbi-assessment/${id}`)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Assessment
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 flex flex-wrap gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Export Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Info className="h-4 w-4" /> View Detailed Analysis
            </Button>
          </div>

          <Accordion type="multiple" className="w-full">
            {/* DF THIN Section */}
            <AccordionItem value="df-thin">
              <AccordionTrigger className="text-lg font-semibold">
                DF THIN
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DateField label="Last Inspection Date" value={dfData.thin.lastInspectionDate} />
                    <DateField label="Last Coating Date" value={dfData.thin.lastCoatingDate} />
                    
                    <NumericField label="NThin A" value={dfData.thin.nthinA.toFixed(3)} />
                    <NumericField label="NThin B" value={dfData.thin.nthinB.toFixed(3)} />
                    
                    <NumericField label="FS Thin" value={dfData.thin.fsThin.toFixed(2)} />
                    <NumericField label="SR Thin" value={dfData.thin.srThin.toFixed(2)} />
                    
                    <NumericField label="DFThin1" value={dfData.thin.dfThin1.toFixed(2)} />
                    <NumericField label="DFThin2" value={dfData.thin.dfThin2.toFixed(2)} />
                    
                    <NumericField label="Creep" value={dfData.thin.creep.toFixed(2)} />
                    <FieldGroup label="Data Confidence">
                      <StatusBadge status={dfData.thin.dataConfidence} />
                    </FieldGroup>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF EXT Section */}
            <AccordionItem value="df-ext">
              <AccordionTrigger className="text-lg font-semibold">
                DF EXT
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReadOnlyField label="Equipment ID" value={dfData.ext.eqId} />
                    <FieldGroup label="Coating Quality">
                      <StatusBadge status={dfData.ext.coatingQuality} />
                    </FieldGroup>
                    
                    <DateField label="New Coat Date" value={dfData.ext.newCoatDate} />
                    <DateField label="Last Inspection Date" value={dfData.ext.lastInspectionDate} />
                    
                    <NumericField label="Trd (mm)" value={dfData.ext.trd.toFixed(1)} />
                    <NumericField label="Agetk (year)" value={dfData.ext.agetk.toFixed(1)} />
                    
                    <NumericField label="Agecoat (year)" value={dfData.ext.agecoat.toFixed(1)} />
                    <NumericField label="Coatadj" value={dfData.ext.coatadj.toFixed(1)} />
                    
                    <NumericField label="Age" value={dfData.ext.age.toFixed(1)} />
                    <ReadOnlyField label="Ext. Env." value={dfData.ext.extEnv} />
                    
                    <ReadOnlyField label="Pipe Support" value={dfData.ext.pipeSupport} />
                    <ReadOnlyField label="Soil/Water Interface" value={dfData.ext.soilWaterInterface} />
                    
                    <NumericField label="CRexp (mm/year)" value={dfData.ext.crexp.toFixed(3)} />
                    <NumericField label="CRact (mm/year)" value={dfData.ext.cract.toFixed(3)} />
                    
                    <NumericField label="Art" value={dfData.ext.art.toFixed(2)} />
                    <NumericField label="FSextcorr" value={dfData.ext.fsextcorr.toFixed(2)} />
                    
                    <NumericField label="SRextcorr" value={dfData.ext.srextcorr.toFixed(2)} />
                    <NumericField label="NextcorrA" value={dfData.ext.nextcorrA.toFixed(3)} />
                    
                    <NumericField label="NextcorrB" value={dfData.ext.nextcorrB.toFixed(3)} />
                    <NumericField label="NextcorrC" value={dfData.ext.nextcorrC.toFixed(3)} />
                    
                    <NumericField label="NextcorrD" value={dfData.ext.nextcorrD.toFixed(3)} />
                    <FieldGroup label="DATA CONFIDENCE">
                      <StatusBadge status={dfData.ext.dataConfidence} />
                    </FieldGroup>
                    
                    <NumericField label="Iextcorr1" value={dfData.ext.iextcorr1.toFixed(2)} />
                    <NumericField label="Iextcorr2" value={dfData.ext.iextcorr2.toFixed(2)} />
                    
                    <NumericField label="Iextcorr3" value={dfData.ext.iextcorr3.toFixed(2)} />
                    <NumericField label="PoextcorrP1" value={dfData.ext.poextcorrP1.toFixed(3)} />
                    
                    <NumericField label="PoextcorrP2" value={dfData.ext.poextcorrP2.toFixed(3)} />
                    <NumericField label="PoextcorrP3" value={dfData.ext.poextcorrP3.toFixed(3)} />
                    
                    <NumericField label="βextcorr1" value={dfData.ext.bextcorr1.toFixed(2)} />
                    <NumericField label="βextcorr2" value={dfData.ext.bextcorr2.toFixed(2)} />
                    
                    <NumericField label="βextcorr3" value={dfData.ext.bextcorr3.toFixed(2)} />
                    <NumericField label="DFextcorrF" value={dfData.ext.dfextcorrF.toFixed(2)} />
                    
                    <NumericField label="Remaining Life" value={dfData.ext.remainingLife.toFixed(1)} />
                    <FieldGroup label="RL">
                      <StatusBadge status={dfData.ext.rl} />
                    </FieldGroup>
                    
                    <div className="col-span-2">
                      <ReadOnlyField label="Remarks" value={dfData.ext.remarks} />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF EXT.CLSCC Section */}
            <AccordionItem value="df-ext-clscc">
              <AccordionTrigger className="text-lg font-semibold">
                DF EXT.CLSCC
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReadOnlyField label="Equipment ID" value={dfData.extClScc.eqId} />
                    <FieldGroup label="Coating Quality">
                      <StatusBadge status={dfData.extClScc.coatingQuality} />
                    </FieldGroup>
                    
                    <DateField label="New Coat Date" value={dfData.extClScc.newCoatDate} />
                    <DateField label="Last Inspection Date" value={dfData.extClScc.lastInspectionDate} />
                    
                    <NumericField label="Agecrack" value={dfData.extClScc.agecrack.toFixed(1)} />
                    <NumericField label="Agecoat" value={dfData.extClScc.agecoat.toFixed(1)} />
                    
                    <NumericField label="Coatadj" value={dfData.extClScc.coatadj.toFixed(1)} />
                    <NumericField label="Age" value={dfData.extClScc.age.toFixed(1)} />
                    
                    <ReadOnlyField label="Ext. Environment" value={dfData.extClScc.extEnvironment} />
                    <FieldGroup label="Ext CL SCC Susc.">
                      <StatusBadge status={dfData.extClScc.extClSccSusc} />
                    </FieldGroup>
                    
                    <NumericField label="SVI" value={dfData.extClScc.svi} />
                    <FieldGroup label="Insp. Eff.">
                      <StatusBadge status={dfData.extClScc.inspEff} />
                    </FieldGroup>
                    
                    <NumericField label="DF Ext CL SCC FB" value={dfData.extClScc.dfExtClSccFb.toFixed(1)} />
                    <NumericField label="DF Ext CL SCC" value={dfData.extClScc.dfExtClScc.toFixed(1)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF MFAT Section */}
            <AccordionItem value="df-mfat">
              <AccordionTrigger className="text-lg font-semibold">
                DF MFAT
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NumericField label="Cycle Count" value={dfData.mfat.cycleCount} />
                    <ReadOnlyField label="Stress Cycles" value={dfData.mfat.stressCycles} />
                    
                    <ReadOnlyField label="Fatigue Category" value={dfData.mfat.fatigueCategory} />
                    <NumericField label="Design Cycles" value={dfData.mfat.designCycles} />
                    
                    <NumericField label="DF MFAT" value={dfData.mfat.dfMfat.toFixed(1)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF CUI Section */}
            <AccordionItem value="df-cui">
              <AccordionTrigger className="text-lg font-semibold">
                DF CUI
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReadOnlyField label="Equipment ID" value={dfData.cui.eqId} />
                    <FieldGroup label="Coating Quality">
                      <StatusBadge status={dfData.cui.coatingQuality} />
                    </FieldGroup>
                    
                    <DateField label="New Coat Date" value={dfData.cui.newCoatDate} />
                    <DateField label="Last Inspection Date" value={dfData.cui.lastInspectionDate} />
                    
                    <NumericField label="Trd (mm)" value={dfData.cui.trd.toFixed(1)} />
                    <NumericField label="Agetk (year)" value={dfData.cui.agetk.toFixed(1)} />
                    
                    <NumericField label="Agecoat (year)" value={dfData.cui.agecoat.toFixed(1)} />
                    <NumericField label="Coatadj" value={dfData.cui.coatadj.toFixed(1)} />
                    
                    <NumericField label="Age" value={dfData.cui.age.toFixed(1)} />
                    <ReadOnlyField label="Ext. Environment" value={dfData.cui.extEnvironment} />
                    
                    <ReadOnlyField label="Insulation Type" value={dfData.cui.insulationType} />
                    <ReadOnlyField label="Complexity" value={dfData.cui.complexity} />
                    
                    <FieldGroup label="Condition">
                      <StatusBadge status={dfData.cui.condition} />
                    </FieldGroup>
                    <ReadOnlyField label="Eq. Design & Fabrication" value={dfData.cui.eqDesignFab} />
                    
                    <ReadOnlyField label="Interface" value={dfData.cui.interface} />
                    <NumericField label="CRexp" value={dfData.cui.crexp.toFixed(3)} />
                    
                    <NumericField label="CRact" value={dfData.cui.cract.toFixed(3)} />
                    <NumericField label="Art" value={dfData.cui.art.toFixed(2)} />
                    
                    <NumericField label="FSCUIF" value={dfData.cui.fscuif.toFixed(2)} />
                    <NumericField label="SRCUIF" value={dfData.cui.srcuif.toFixed(2)} />
                    
                    <NumericField label="NCUIFA" value={dfData.cui.ncuifa.toFixed(3)} />
                    <NumericField label="NCUIFB" value={dfData.cui.ncuifb.toFixed(3)} />
                    
                    <NumericField label="NCUIFC" value={dfData.cui.ncuifc.toFixed(3)} />
                    <NumericField label="NCUIFD" value={dfData.cui.ncuifd.toFixed(3)} />
                    
                    <FieldGroup label="DATA CONFIDENCE">
                      <StatusBadge status={dfData.cui.dataConfidence} />
                    </FieldGroup>
                    <NumericField label="ICUIF1" value={dfData.cui.icuif1.toFixed(2)} />
                    
                    <NumericField label="ICUIF2" value={dfData.cui.icuif2.toFixed(2)} />
                    <NumericField label="ICUIF3" value={dfData.cui.icuif3.toFixed(2)} />
                    
                    <NumericField label="PoCUIFP1" value={dfData.cui.pocuifp1.toFixed(3)} />
                    <NumericField label="PoCUIFP2" value={dfData.cui.pocuifp2.toFixed(3)} />
                    
                    <NumericField label="PoCUIFP3" value={dfData.cui.pocuifp3.toFixed(3)} />
                    <NumericField label="βCUIF1" value={dfData.cui.bcuif1.toFixed(2)} />
                    
                    <NumericField label="βCUIF2" value={dfData.cui.bcuif2.toFixed(2)} />
                    <NumericField label="βCUIF3" value={dfData.cui.bcuif3.toFixed(2)} />
                    
                    <NumericField label="DFCUIFF" value={dfData.cui.dfcuiff.toFixed(2)} />
                    <NumericField label="Remaining Life" value={dfData.cui.remainingLife.toFixed(1)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF SCC SSC Section */}
            <AccordionItem value="df-scc-ssc">
              <AccordionTrigger className="text-lg font-semibold">
                DF SCC SSC
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReadOnlyField label="Equipment ID" value={dfData.sccSsc.eqId} />
                    <ReadOnlyField label="Susceptibility?" value={dfData.sccSsc.susceptibility} />
                    
                    <ReadOnlyField label="H2S in Water" value={dfData.sccSsc.h2sInWater} />
                    <NumericField label="pH" value={dfData.sccSsc.ph.toFixed(1)} />
                    
                    <FieldGroup label="Env. Severity">
                      <StatusBadge status={dfData.sccSsc.envSeverity} />
                    </FieldGroup>
                    <ReadOnlyField label="PWHT?" value={dfData.sccSsc.pwht} />
                    
                    <NumericField label="Hardness (Brinnell)" value={dfData.sccSsc.hardnessBrinnell} />
                    <FieldGroup label="SSC Susc. f to HT">
                      <StatusBadge status={dfData.sccSsc.sscSuscFToHt} />
                    </FieldGroup>
                    
                    <NumericField label="SVI" value={dfData.sccSsc.svi} />
                    <FieldGroup label="Insp. Eff.">
                      <StatusBadge status={dfData.sccSsc.inspEff} />
                    </FieldGroup>
                    
                    <NumericField label="DF SCC FB" value={dfData.sccSsc.dfSccFb.toFixed(1)} />
                    <DateField label="Last Insp." value={dfData.sccSsc.lastInsp} />
                    
                    <NumericField label="DF SCC" value={dfData.sccSsc.dfScc.toFixed(1)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF SCC SOHIC Section */}
            <AccordionItem value="df-scc-sohic">
              <AccordionTrigger className="text-lg font-semibold">
                DF SCC SOHIC
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReadOnlyField label="Equipment ID" value={dfData.sccSohic.eqId} />
                    <ReadOnlyField label="Susceptibility?" value={dfData.sccSohic.susceptibility} />
                    
                    <ReadOnlyField label="H2S in Water" value={dfData.sccSohic.h2sInWater} />
                    <NumericField label="pH" value={dfData.sccSohic.ph.toFixed(1)} />
                    
                    <FieldGroup label="Env. Severity">
                      <StatusBadge status={dfData.sccSohic.envSeverity} />
                    </FieldGroup>
                    <ReadOnlyField label="PWHT?" value={dfData.sccSohic.pwht} />
                    
                    <ReadOnlyField label="Steel S Content" value={dfData.sccSohic.steelSContent} />
                    <FieldGroup label="Susc. to Crack">
                      <StatusBadge status={dfData.sccSohic.suscToCrack} />
                    </FieldGroup>
                    
                    <NumericField label="SVI" value={dfData.sccSohic.svi} />
                    <FieldGroup label="Insp. Eff.">
                      <StatusBadge status={dfData.sccSohic.inspEff} />
                    </FieldGroup>
                    
                    <NumericField label="DF SOHIC FB" value={dfData.sccSohic.dfSohicFb.toFixed(1)} />
                    <DateField label="Last Insp." value={dfData.sccSohic.lastInsp} />
                    
                    <ReadOnlyField label="Online Monitoring" value={dfData.sccSohic.onlineMonitoring} />
                    <NumericField label="DF SCC" value={dfData.sccSohic.dfScc.toFixed(1)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF LIN Section */}
            <AccordionItem value="df-lin">
              <AccordionTrigger className="text-lg font-semibold">
                DF LIN (DF LIN &lt;DMG&gt;)
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReadOnlyField label="Equipment ID" value={dfData.lin.eqId} />
                    <DateField label="Last Insp. Date" value={dfData.lin.lastInspDate} />
                    
                    <ReadOnlyField label="Lining Type" value={dfData.lin.liningType} />
                    <FieldGroup label="Lining Condition">
                      <StatusBadge status={dfData.lin.liningCondition} />
                    </FieldGroup>
                    
                    <ReadOnlyField label="Lining Monitoring" value={dfData.lin.liningMonitoring} />
                    <NumericField label="DF Elin." value={dfData.lin.dfElin.toFixed(1)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DF CUI CLSCC Section */}
            <AccordionItem value="df-cui-clscc">
              <AccordionTrigger className="text-lg font-semibold">
                DF CUI CLSCC
              </AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted/10 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ReadOnlyField label="Equipment ID" value={dfData.cuiClscc.eqId} />
                    <FieldGroup label="Coating Quality">
                      <StatusBadge status={dfData.cuiClscc.coatingQuality} />
                    </FieldGroup>
                    
                    <DateField label="New Coat Date" value={dfData.cuiClscc.newCoatDate} />
                    <DateField label="Last Inspection Date" value={dfData.cuiClscc.lastInspectionDate} />
                    
                    <NumericField label="Agecrack" value={dfData.cuiClscc.agecrack.toFixed(1)} />
                    <NumericField label="Agecoat" value={dfData.cuiClscc.agecoat.toFixed(1)} />
                    
                    <NumericField label="Coatadj" value={dfData.cuiClscc.coatadj.toFixed(1)} />
                    <NumericField label="Age" value={dfData.cuiClscc.age.toFixed(1)} />
                    
                    <ReadOnlyField label="Ext. Environment" value={dfData.cuiClscc.extEnvironment} />
                    <FieldGroup label="CUI CL SCC Susc.">
                      <StatusBadge status={dfData.cuiClscc.cuiClSccSusc} />
                    </FieldGroup>
                    
                    <ReadOnlyField label="Piping Complexity" value={dfData.cuiClscc.pipingComplexity} />
                    <FieldGroup label="Insulation Condition">
                      <StatusBadge status={dfData.cuiClscc.insulationCondition} />
                    </FieldGroup>
                    
                    <ReadOnlyField label="Chloride Free Insulation" value={dfData.cuiClscc.chlorideFreeInsulation} />
                    <FieldGroup label="CUI CL SCC Susc. Final">
                      <StatusBadge status={dfData.cuiClscc.cuiClSccSuscFinal} />
                    </FieldGroup>
                    
                    <NumericField label="SVI" value={dfData.cuiClscc.svi} />
                    <FieldGroup label="Insp. Eff.">
                      <StatusBadge status={dfData.cuiClscc.inspEff} />
                    </FieldGroup>
                    
                    <NumericField label="DF CUI CL SCC FB" value={dfData.cuiClscc.dfCuiClSccFb.toFixed(1)} />
                    <NumericField label="DF Ext CL SCC" value={dfData.cuiClscc.dfExtClScc.toFixed(1)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default DFRiskFactorDetailPage;
