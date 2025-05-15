import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RBIAssessment } from '@/types/monitoring';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DamageFactorTabProps {
  assessment: RBIAssessment;
}

interface FieldGroupProps {
  title: string;
  children: React.ReactNode;
}

interface FieldItemProps {
  label: string;
  value: string | number | boolean | null | undefined;
  tooltip?: string;
  isCritical?: boolean;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ title, children }) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

const FieldItem: React.FC<FieldItemProps> = ({ label, value, tooltip, isCritical }) => {
  const displayValue = value === null || value === undefined ? '-' : 
                      typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value.toString();
  
  const renderLabel = () => {
    if (tooltip) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-1 text-sm font-medium">
                {label} <Info className="h-3.5 w-3.5 text-muted-foreground" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return <span className="text-sm font-medium">{label}</span>;
  };
  
  const renderValue = () => {
    if (isCritical) {
      let colorClass = "bg-green-100 text-green-700";
      
      if (typeof value === 'number') {
        if (value > 0.75) colorClass = "bg-red-100 text-red-700";
        else if (value > 0.45) colorClass = "bg-yellow-100 text-yellow-700";
      }
      
      return (
        <Badge className={colorClass + " font-medium"} variant="outline">
          {displayValue}
        </Badge>
      );
    }
    
    return <span className="text-sm">{displayValue}</span>;
  };
  
  return (
    <div className="space-y-1">
      {renderLabel()}
      {renderValue()}
    </div>
  );
};

const DamageFactorTab: React.FC<DamageFactorTabProps> = ({ assessment }) => {
  return (
    <div className="space-y-6">
      <Accordion type="multiple" className="w-full space-y-4">
        {/* DF THIN */}
        <AccordionItem value="df-thin" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF THIN</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Last Inspection Date" value={assessment.lastInspectionDate} />
              <FieldItem label="Last Coating Date" value={assessment.lastCoatingDate} />
            </FieldGroup>
            
            <FieldGroup title="Thickness Measurements">
              <FieldItem 
                label="NThin A" 
                value={assessment.nthinA} 
                tooltip="Thickness parameter A"
              />
              <FieldItem 
                label="NThin B" 
                value={assessment.nthinB} 
                tooltip="Thickness parameter B"
              />
              <FieldItem 
                label="FS Thin" 
                value={assessment.fsThin} 
                tooltip="Factor of safety for thinning"
              />
              <FieldItem 
                label="SR Thin" 
                value={assessment.srThin} 
                tooltip="Severity ratio for thinning"
              />
            </FieldGroup>
            
            <FieldGroup title="Damage Factors">
              <FieldItem 
                label="DFThin1" 
                value={assessment.dfThin1} 
                isCritical={true}
                tooltip="Primary damage factor for thinning"
              />
              <FieldItem 
                label="DFThin2" 
                value={assessment.dfThin2} 
                isCritical={true}
                tooltip="Secondary damage factor for thinning"
              />
              <FieldItem 
                label="Creep" 
                value={assessment.creep} 
                tooltip="Creep factor"
              />
              <FieldItem 
                label="POThin1" 
                value={assessment.pothin1} 
                tooltip="Probability of thinning 1"
              />
            </FieldGroup>
            
            <FieldGroup title="Additional Parameters">
              <FieldItem 
                label="Age RC" 
                value={assessment.agerc}
                tooltip="Age factor for remaining corrosion"
              />
              <FieldItem 
                label="BHThin" 
                value={assessment.bhthin}
                tooltip="Base hazard for thinning"
              />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>
        
        {/* DF EXT */}
        <AccordionItem value="df-ext" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF EXT</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Coating Quality" value={assessment.coatingQuality} />
              <FieldItem label="New Coat Date" value={assessment.lastCoatingDate} />
              <FieldItem label="Last Inspection Date" value={assessment.lastInspectionDate} />
              <FieldItem label="DATA CONFIDENCE" value={assessment.dataConfidence} />
            </FieldGroup>
            
            <FieldGroup title="Age & Environment">
              <FieldItem label="Age (year)" value="N/A" />
              <FieldItem label="External Environment" value="N/A" />
              <FieldItem label="Pipe Support" value="N/A" />
              <FieldItem label="Soil/Water Interface" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Corrosion Parameters">
              <FieldItem label="CRexp (mm/year)" value="N/A" tooltip="Expected corrosion rate" />
              <FieldItem label="CRact (mm/year)" value="N/A" tooltip="Actual corrosion rate" />
              <FieldItem label="Art" value="N/A" />
              <FieldItem label="FSextcorr" value="N/A" tooltip="Factor of safety for external corrosion" />
              <FieldItem label="SRextcorr" value="N/A" tooltip="Severity ratio for external corrosion" />
            </FieldGroup>
            
            <FieldGroup title="Damage Factor">
              <FieldItem label="DFextcorrF" value={assessment.dfextclsc || "N/A"} isCritical={true} />
              <FieldItem label="Remaining Life" value="N/A" isCritical={true} />
              <FieldItem label="RL" value="N/A" isCritical={true} />
            </FieldGroup>
            
            <FieldGroup title="Additional Information">
              <FieldItem label="Remarks" value="N/A" />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* DF EXT.CLSCC */}
        <AccordionItem value="df-ext-clscc" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF EXT.CLSCC</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Coating Quality" value={assessment.coatingQuality} />
              <FieldItem label="New Coat Date" value={assessment.lastCoatingDate} />
              <FieldItem label="Last Inspection Date" value={assessment.lastInspectionDate} />
            </FieldGroup>
            
            <FieldGroup title="Age Parameters">
              <FieldItem label="Agecrack" value="N/A" tooltip="Age of crack" />
              <FieldItem label="Agecoat" value="N/A" tooltip="Age of coating" />
              <FieldItem label="Coatadj" value="N/A" tooltip="Coating adjustment factor" />
              <FieldItem label="Age" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Environment & Susceptibility">
              <FieldItem label="External Environment" value="N/A" />
              <FieldItem label="Ext CL SCC Susc." value="N/A" tooltip="External Chloride SCC susceptibility" />
              <FieldItem label="SVI" value="N/A" tooltip="Severity index" />
              <FieldItem label="Inspection Efficiency" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Damage Factors">
              <FieldItem label="DF Ext CL SCC FB" value="N/A" isCritical={true} />
              <FieldItem label="DF Ext CL SCC" value="N/A" isCritical={true} />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* DF MFAT */}
        <AccordionItem value="df-mfat" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF MFAT</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Previous Failure" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Vibration & Load">
              <FieldItem label="Visible/Audible Shaking" value="N/A" />
              <FieldItem label="Shaking Frequency" value="N/A" />
              <FieldItem label="Cyclic Load Type" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="System Design">
              <FieldItem label="Corrective Action" value="N/A" />
              <FieldItem label="Pipe Complexity" value="N/A" />
              <FieldItem label="Pipe Condition" value="N/A" />
              <FieldItem label="Joint/Branch Design" value="N/A" />
              <FieldItem label="Branch Diameter" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Damage Factors">
              <FieldItem label="D MFAT FB" value={assessment.dmfat || "N/A"} isCritical={true} tooltip="Fatigue damage factor base" />
              <FieldItem label="D MFAT" value={assessment.dmfat || "N/A"} isCritical={true} tooltip="Fatigue damage factor" />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* DF CUI */}
        <AccordionItem value="df-cui" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF CUI</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Coating Quality" value={assessment.coatingQuality} />
              <FieldItem label="New Coat Date" value={assessment.lastCoatingDate} />
              <FieldItem label="Last Inspection Date" value={assessment.lastInspectionDate} />
            </FieldGroup>
            
            <FieldGroup title="Age & Environment">
              <FieldItem label="Trd (mm)" value="N/A" tooltip="Thickness reduction" />
              <FieldItem label="Agetk (year)" value="N/A" tooltip="Age of thickness" />
              <FieldItem label="Agecoat (year)" value="N/A" tooltip="Age of coating" />
              <FieldItem label="Coatadj" value="N/A" tooltip="Coating adjustment" />
              <FieldItem label="Age" value="N/A" />
              <FieldItem label="External Environment" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Insulation Properties">
              <FieldItem label="Insulation Type" value="N/A" />
              <FieldItem label="Insulation Complexity" value="N/A" />
              <FieldItem label="Insulation Condition" value="N/A" />
              <FieldItem label="Equipment Design & Fabrication" value="N/A" />
              <FieldItem label="Interface" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Corrosion Parameters">
              <FieldItem label="CRexp (mm/year)" value="N/A" tooltip="Expected corrosion rate" />
              <FieldItem label="CRact (mm/year)" value="N/A" tooltip="Actual corrosion rate" />
              <FieldItem label="Art" value="N/A" />
              <FieldItem label="FSCUIF" value="N/A" tooltip="Factor of safety for CUI" />
              <FieldItem label="SRCUIF" value="N/A" tooltip="Severity ratio for CUI" />
            </FieldGroup>
            
            <FieldGroup title="Damage Factors">
              <FieldItem label="DATA CONFIDENCE" value={assessment.dataConfidence} />
              <FieldItem label="DFCUIFF" value={assessment.dfcuiiff || "N/A"} isCritical={true} tooltip="Damage factor for CUI" />
              <FieldItem label="Remaining Life" value="N/A" isCritical={true} />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Continuing with other accordion items... */}
        {/* DF SCC SSC */}
        <AccordionItem value="df-scc-ssc" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF SCC SSC</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Susceptibility?" value="N/A" />
              <FieldItem label="Last Inspection" value={assessment.lastInspectionDate} />
            </FieldGroup>
            
            <FieldGroup title="Environmental Factors">
              <FieldItem label="H2S in Water (ppm)" value="N/A" />
              <FieldItem label="pH" value="N/A" />
              <FieldItem label="Environmental Severity" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Material Properties">
              <FieldItem label="PWHT?" value="N/A" tooltip="Post-weld heat treatment" />
              <FieldItem label="Hardness (Brinnell)" value="N/A" />
              <FieldItem label="SSC Susceptibility to Heat Treatment" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Inspection & Damage Factors">
              <FieldItem label="SVI" value="N/A" tooltip="Severity Index" />
              <FieldItem label="Inspection Efficiency" value="N/A" />
              <FieldItem label="DF SCC FB" value="N/A" isCritical={true} tooltip="Damage factor for stress corrosion cracking base" />
              <FieldItem label="DF SCC" value={assessment.dpSCCSOHIC || "N/A"} isCritical={true} tooltip="Damage factor for stress corrosion cracking" />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* DF SCC SOHIC */}
        <AccordionItem value="df-scc-sohic" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF SCC SOHIC</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Susceptibility?" value="N/A" />
              <FieldItem label="Last Inspection" value={assessment.lastInspectionDate} />
              <FieldItem label="Online Monitoring" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Environmental Factors">
              <FieldItem label="H2S in Water (ppm)" value="N/A" />
              <FieldItem label="pH" value="N/A" />
              <FieldItem label="Environmental Severity" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Material Properties">
              <FieldItem label="PWHT?" value="N/A" tooltip="Post-weld heat treatment" />
              <FieldItem label="Steel S Content" value="N/A" tooltip="Steel sulfur content" />
              <FieldItem label="Susceptibility To Crack" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Inspection & Damage Factors">
              <FieldItem label="SVI" value="N/A" tooltip="Severity Index" />
              <FieldItem label="Inspection Efficiency" value="N/A" />
              <FieldItem label="DF SOHIC FB" value="N/A" isCritical={true} tooltip="Damage factor for SOHIC base" />
              <FieldItem label="DF SCC" value={assessment.dpSCCSOHIC || "N/A"} isCritical={true} tooltip="Damage factor for stress corrosion cracking" />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* DF LIN (DF LIN <DMG>) */}
        <AccordionItem value="df-lin" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF LIN (DF LIN &lt;DMG&gt;)</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Last Inspection Date" value={assessment.lastInspectionDate} />
            </FieldGroup>
            
            <FieldGroup title="Lining Properties">
              <FieldItem label="Lining Type" value="N/A" />
              <FieldItem label="Lining Condition" value="N/A" />
              <FieldItem label="Lining Monitoring" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Damage Factors">
              <FieldItem label="DF Elin" value="N/A" isCritical={true} tooltip="Damage factor for lining" />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>

        {/* DF CUI CLSCC */}
        <AccordionItem value="df-cui-clscc" className="border rounded-lg overflow-hidden">
          <AccordionTrigger className="px-4 py-3 bg-muted/50 hover:bg-muted">
            <span className="text-base font-medium">DF CUI CLSCC</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-6">
            <FieldGroup title="General Information">
              <FieldItem label="EQ. ID" value={assessment.asset} />
              <FieldItem label="Coating Quality" value={assessment.coatingQuality} />
              <FieldItem label="New Coat Date" value={assessment.lastCoatingDate} />
              <FieldItem label="Last Inspection Date" value={assessment.lastInspectionDate} />
            </FieldGroup>
            
            <FieldGroup title="Age & Environment">
              <FieldItem label="Agecrack" value="N/A" tooltip="Age of crack" />
              <FieldItem label="Agecoat" value="N/A" tooltip="Age of coating" />
              <FieldItem label="Coatadj" value="N/A" tooltip="Coating adjustment factor" />
              <FieldItem label="Age" value="N/A" />
              <FieldItem label="External Environment" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="System & Material Properties">
              <FieldItem label="CUI CL SCC Susceptibility" value="N/A" tooltip="CUI chloride stress corrosion cracking susceptibility" />
              <FieldItem label="Piping Complexity" value="N/A" />
              <FieldItem label="Insulation Condition" value="N/A" />
              <FieldItem label="Chloride Free Insulation" value="N/A" />
              <FieldItem label="CUI CL SCC Susceptibility Final" value="N/A" />
            </FieldGroup>
            
            <FieldGroup title="Inspection & Damage Factors">
              <FieldItem label="SVI" value="N/A" tooltip="Severity Index" />
              <FieldItem label="Inspection Efficiency" value="N/A" />
              <FieldItem label="DF CUI CL SCC FB" value="N/A" isCritical={true} tooltip="Damage factor for CUI chloride SCC base" />
              <FieldItem label="DF Ext CL SCC" value="N/A" isCritical={true} tooltip="Damage factor for external chloride SCC" />
            </FieldGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          <p>Note: Values showing as "N/A" indicate that the data is not available in the assessment record.</p>
        </div>
      </div>
    </div>
  );
};

export default DamageFactorTab;
