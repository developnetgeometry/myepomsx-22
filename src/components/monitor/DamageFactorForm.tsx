
import React from 'react';
import { RBIAssessment } from '@/types/monitoring';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DamageFactorFormProps {
  assessment: RBIAssessment;
  onAssessmentChange: (assessment: RBIAssessment) => void;
  readOnly?: boolean;
  formType: 'ext' | 'ext-clscc' | 'mfat' | 'cui' | 'scc-ssc' | 'scc-sohic' | 'lin' | 'cui-clscc';
}

interface FormSection {
  title: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  tooltip?: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: { label: string; value: string }[];
  isCritical?: boolean;
}

const DamageFactorForm: React.FC<DamageFactorFormProps> = ({
  assessment,
  onAssessmentChange,
  readOnly = false,
  formType
}) => {
  const handleInputChange = (field: keyof RBIAssessment, value: string | number) => {
    if (readOnly) return;
    
    // Convert string numbers to actual numbers
    let processedValue: any = value;
    if (typeof value === 'string' && !isNaN(Number(value)) && field !== 'asset') {
      processedValue = Number(value);
    }
    
    onAssessmentChange({
      ...assessment,
      [field]: processedValue
    });
  };

  const handleSelectChange = (field: keyof RBIAssessment, value: string) => {
    if (readOnly) return;
    
    // Convert to boolean if the field is hasCladding
    let processedValue: any = value;
    if (field === 'hasCladding') {
      processedValue = value === 'true';
    }
    
    onAssessmentChange({
      ...assessment,
      [field]: processedValue
    });
  };

  const formSections = getFormSections(formType);

  // Helper function to safely convert any value to a string for select components
  const safeValueToString = (value: any): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'boolean') return value.toString();
    return String(value);
  };

  return (
    <div className="space-y-6">
      {formSections.map((section, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-base font-medium text-muted-foreground">{section.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {section.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  <span className="flex items-center gap-1">
                    {field.label}
                    {field.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">{field.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </span>
                </Label>
                
                {field.type === 'select' ? (
                  <Select 
                    value={safeValueToString(assessment[field.id as keyof RBIAssessment])}
                    onValueChange={(value) => handleSelectChange(field.id as keyof RBIAssessment, value)}
                    disabled={readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    value={assessment[field.id as keyof RBIAssessment] || ''}
                    onChange={(e) => handleInputChange(field.id as keyof RBIAssessment, e.target.value)}
                    readOnly={readOnly}
                    className="w-full"
                    step={field.type === 'number' ? "0.01" : undefined}
                  />
                )}
                
                {field.isCritical && (
                  <Badge 
                    className={getCriticalBadgeClass(assessment[field.id as keyof RBIAssessment])} 
                    variant="outline"
                  >
                    {assessment[field.id as keyof RBIAssessment] || 'N/A'}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to determine badge color based on value
const getCriticalBadgeClass = (value: any): string => {
  if (!value || value === 'N/A') return "bg-gray-100 text-gray-700";
  
  if (typeof value === 'number') {
    if (value > 0.75) return "bg-red-100 text-red-700";
    else if (value > 0.45) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  }
  
  return "bg-green-100 text-green-700";
};

// Helper function to get form sections based on form type
const getFormSections = (formType: string): FormSection[] => {
  switch (formType) {
    case 'ext':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "coatingQuality", label: "Coating Quality", type: "select", 
              options: [
                { label: "Good", value: "Good" },
                { label: "Fair", value: "Fair" },
                { label: "Poor", value: "Poor" }
              ] 
            },
            { id: "lastCoatingDate", label: "New Coat Date", type: "date" },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" },
            { id: "dataConfidence", label: "DATA CONFIDENCE", type: "select",
              options: [
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" }
              ]
            }
          ]
        },
        {
          title: "Age & Environment",
          fields: [
            { id: "extAge", label: "Age (year)", type: "number" },
            { id: "extEnvironment", label: "External Environment", type: "text" },
            { id: "pipeSupport", label: "Pipe Support", type: "text" },
            { id: "soilWaterInterface", label: "Soil/Water Interface", type: "text" }
          ]
        },
        {
          title: "Corrosion Parameters",
          fields: [
            { id: "crexp", label: "CRexp (mm/year)", type: "number", tooltip: "Expected corrosion rate" },
            { id: "cract", label: "CRact (mm/year)", type: "number", tooltip: "Actual corrosion rate" },
            { id: "art", label: "Art", type: "number" },
            { id: "fsextcorr", label: "FSextcorr", type: "number", tooltip: "Factor of safety for external corrosion" },
            { id: "srextcorr", label: "SRextcorr", type: "number", tooltip: "Severity ratio for external corrosion" }
          ]
        },
        {
          title: "Damage Factor",
          fields: [
            { id: "dfextclsc", label: "DFextcorrF", type: "number", isCritical: true },
            { id: "remainingLife", label: "Remaining Life", type: "number", isCritical: true },
            { id: "rl", label: "RL", type: "number", isCritical: true }
          ]
        },
        {
          title: "Additional Information",
          fields: [
            { id: "remarks", label: "Remarks", type: "text" }
          ]
        }
      ];
    case 'ext-clscc':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "coatingQuality", label: "Coating Quality", type: "select",
              options: [
                { label: "Good", value: "Good" },
                { label: "Fair", value: "Fair" },
                { label: "Poor", value: "Poor" }
              ] 
            },
            { id: "lastCoatingDate", label: "New Coat Date", type: "date" },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" }
          ]
        },
        {
          title: "Age Parameters",
          fields: [
            { id: "agecrack", label: "Agecrack", type: "number", tooltip: "Age of crack" },
            { id: "agecoat", label: "Agecoat", type: "number", tooltip: "Age of coating" },
            { id: "coatadj", label: "Coatadj", type: "number", tooltip: "Coating adjustment factor" },
            { id: "extAge", label: "Age", type: "number" }
          ]
        },
        {
          title: "Environment & Susceptibility",
          fields: [
            { id: "extEnvironment", label: "External Environment", type: "text" },
            { id: "extClSccSusc", label: "Ext CL SCC Susc.", type: "text", tooltip: "External Chloride SCC susceptibility" },
            { id: "svi", label: "SVI", type: "number", tooltip: "Severity index" },
            { id: "inspectionEfficiency", label: "Inspection Efficiency", type: "number" }
          ]
        },
        {
          title: "Damage Factors",
          fields: [
            { id: "dfExtClSccFb", label: "DF Ext CL SCC FB", type: "number", isCritical: true },
            { id: "dfextclsc", label: "DF Ext CL SCC", type: "number", isCritical: true }
          ]
        }
      ];
    case 'cui':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" },
            { id: "dataConfidence", label: "DATA CONFIDENCE", type: "select",
              options: [
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" }
              ]
            },
            { id: "hasCladding", label: "Has Cladding", type: "select",
              options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" }
              ]
            }
          ]
        },
        {
          title: "CUI Assessment Parameters",
          fields: [
            { id: "currentThickness", label: "Current Thickness", type: "number" },
            { id: "nominalThickness", label: "Nominal Thickness", type: "number" },
            { id: "dfcuiiff", label: "DF CUI IFF", type: "number", isCritical: true }
          ]
        }
      ];
    // Add more form types as needed
    case 'mfat':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "dataConfidence", label: "DATA CONFIDENCE", type: "select",
              options: [
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" }
              ]
            },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" }
          ]
        },
        {
          title: "Mechanical Fatigue Parameters",
          fields: [
            { id: "dmfat", label: "Damage Factor (MFAT)", type: "number", isCritical: true }
          ]
        }
      ];
    case 'scc-ssc':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" }
          ]
        },
        {
          title: "SCC SSC Parameters",
          fields: [
            { id: "dmsccssc", label: "Damage Factor (SCC SSC)", type: "number", isCritical: true }
          ]
        }
      ];
    case 'scc-sohic':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" }
          ]
        },
        {
          title: "SCC SOHIC Parameters",
          fields: [
            { id: "dpSCCSOHIC", label: "Damage Factor (SCC SOHIC)", type: "number", isCritical: true }
          ]
        }
      ];
    case 'lin':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" }
          ]
        },
        {
          title: "Linear Thinning Parameters",
          fields: [
            { id: "dfthin", label: "Damage Factor (Linear Thinning)", type: "number", isCritical: true }
          ]
        }
      ];
    case 'cui-clscc':
      return [
        {
          title: "General Information",
          fields: [
            { id: "asset", label: "EQ. ID", type: "text" },
            { id: "lastInspectionDate", label: "Last Inspection Date", type: "date" },
            { id: "hasCladding", label: "Has Cladding", type: "select",
              options: [
                { label: "Yes", value: "true" },
                { label: "No", value: "false" }
              ]
            }
          ]
        },
        {
          title: "CUI CLSCC Parameters",
          fields: [
            { id: "dfcuiiff", label: "DF CUI IFF", type: "number", isCritical: true },
            { id: "dfextclsc", label: "DF CLSCC", type: "number", isCritical: true }
          ]
        }
      ];
    default:
      return [];
  }
};

export default DamageFactorForm;
