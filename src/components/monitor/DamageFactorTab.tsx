
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RBIAssessment } from '@/types/monitoring';

interface DamageFactorTabProps {
  assessment: RBIAssessment;
  onAssessmentChange?: (assessment: RBIAssessment) => void;
  readOnly?: boolean;
}

const DamageFactorTab: React.FC<DamageFactorTabProps> = ({ 
  assessment, 
  onAssessmentChange,
  readOnly = false 
}) => {
  const handleInputChange = (
    field: keyof RBIAssessment,
    value: string | number | boolean
  ) => {
    if (readOnly || !onAssessmentChange) return;
    
    let processedValue: any = value;
    if (typeof value === 'string' && !isNaN(Number(value))) {
      processedValue = Number(value);
    }
    
    onAssessmentChange({
      ...assessment,
      [field]: processedValue
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Last Inspection Date */}
        <div>
          <Label htmlFor="lastInspectionDate">Last Inspection Date</Label>
          <Input 
            id="lastInspectionDate"
            type="date"
            value={assessment.lastInspectionDate || ''}
            onChange={(e) => handleInputChange('lastInspectionDate', e.target.value)}
            readOnly={readOnly}
            className="w-full"
          />
        </div>
        
        {/* Last Coating Date */}
        <div>
          <Label htmlFor="lastCoatingDate">Last Coating Date</Label>
          <Input 
            id="lastCoatingDate"
            type="date"
            value={assessment.lastCoatingDate || ''}
            onChange={(e) => handleInputChange('lastCoatingDate', e.target.value)}
            readOnly={readOnly}
            className="w-full"
          />
        </div>
        
        {/* Nthin A */}
        <div>
          <Label htmlFor="nthinA">Nthin A</Label>
          <Input 
            id="nthinA"
            type="number"
            value={assessment.nthinA || 0}
            onChange={(e) => handleInputChange('nthinA', e.target.value)}
            readOnly={readOnly}
            className="w-full"
            step="0.01"
          />
        </div>
        
        {/* Nthin B */}
        <div>
          <Label htmlFor="nthinB">Nthin B</Label>
          <Input 
            id="nthinB"
            type="number"
            value={assessment.nthinB || 0}
            onChange={(e) => handleInputChange('nthinB', e.target.value)}
            readOnly={readOnly}
            className="w-full"
            step="0.01"
          />
        </div>
        
        {/* FS Thin */}
        <div>
          <Label htmlFor="fsThin">FS Thin</Label>
          <Input 
            id="fsThin"
            type="number"
            value={assessment.fsThin || 0}
            onChange={(e) => handleInputChange('fsThin', e.target.value)}
            readOnly={readOnly}
            className="w-full"
            step="0.01"
          />
        </div>
        
        {/* SR Thin */}
        <div>
          <Label htmlFor="srThin">SR Thin</Label>
          <Input 
            id="srThin"
            type="number"
            value={assessment.srThin || 0}
            onChange={(e) => handleInputChange('srThin', e.target.value)}
            readOnly={readOnly}
            className="w-full"
            step="0.01"
          />
        </div>
        
        {/* DFThin1 */}
        <div>
          <Label htmlFor="dfThin1">DFThin1</Label>
          <Input 
            id="dfThin1"
            type="number"
            value={assessment.dfThin1 || 0}
            onChange={(e) => handleInputChange('dfThin1', e.target.value)}
            readOnly={readOnly}
            className="w-full"
            step="0.01"
          />
        </div>
        
        {/* DFThin2 */}
        <div>
          <Label htmlFor="dfThin2">DFThin2</Label>
          <Input 
            id="dfThin2"
            type="number"
            value={assessment.dfThin2 || 0}
            onChange={(e) => handleInputChange('dfThin2', e.target.value)}
            readOnly={readOnly}
            className="w-full"
            step="0.01"
          />
        </div>
        
        {/* Creep */}
        <div>
          <Label htmlFor="creep">Creep</Label>
          <Input 
            id="creep"
            type="number"
            value={assessment.creep || 0}
            onChange={(e) => handleInputChange('creep', e.target.value)}
            readOnly={readOnly}
            className="w-full"
            step="0.01"
          />
        </div>
      </div>

      <hr className="my-6 border-t border-gray-200" />
    </div>
  );
};

export default DamageFactorTab;
