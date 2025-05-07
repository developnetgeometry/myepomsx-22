
/**
 * Type definitions for all modules in the system
 */

// CMMS Module Types
export interface Facility {
  id: string;
  facilityCode: string;
  facilityLocation: string;
}

export interface System {
  id: string;
  systemNo: string;
  systemName: string;
  systemCode: string;
  facilityLocationId: string;
  facilityLocation?: string;
}

export interface Package {
  id: string;
  packageNo: string;
  packageName: string;
  discipline: string;
  taskType: string;
  department: string;
  description?: string;
}

export interface Asset {
  id: string;
  assetNo: string;
  assetName: string;
  systemId: string;
  system?: string;
  assetType: string;
  assetClass: string;
  discipline: string;
  status: string;
  workCenter: string;
}

export interface BOMAssembly {
  id: string;
  bomAssemblyId: string;
  sparePartName: string;
  quantity: number;
  unit: string;
}

export interface ItemMaster {
  id: string;
  itemNo: string;
  itemDescription: string;
  unitOfMeasure: string;
  itemCategory: string;
  manufacturer?: string;
  model?: string;
  specification?: string;
  status: string;
}

export interface Inventory {
  id: string;
  itemNo: string;
  itemDescription?: string;
  location: string;
  availableQuantity: number;
  reservedQuantity: number;
  unitOfMeasure: string;
  unitPrice: number;
  totalPrice: number;
  lastUpdated: string;
}

// Maintain Module Types
export interface PMSchedule {
  id: string;
  pmNo: string;
  assetId: string;
  asset?: string;
  task: string;
  planStartDate: string;
  planEndDate: string;
  status: string;
}

export interface WorkRequest {
  id: string;
  workRequestNo: string;
  description: string;
  status: string;
  requestedById: string;
  requestedBy?: string;
  workCenter: string;
  workOrderNo?: string;
  woStatus?: string;
  assetId: string;
  asset?: string;
  requestDate: string;
  workType: string;
  dateFinding?: string;
}

export interface WorkOrder {
  id: string;
  workOrderNo: string;
  planDueDate: string;
  task: string;
  pmNo?: string;
  packageNo?: string;
  assetNo: string;
  frequency: string;
  workType: string;
  workCenter: string;
  woStatus: string;
  description: string;
}

export interface TaskLibrary {
  id: string;
  taskCode: string;
  taskName: string;
  discipline: string;
  counter: number;
}

export interface WOHistory {
  id: string;
  date: string;
  generatedBy: string;
  start: string;
  end: string;
  totalPMSchedule: number;
  totalWOGenerated: number;
  totalProblem: number;
}

// IMS Module Types
export interface Integrity {
  id: string;
  assetCode: string;
  assetName: string;
  area: string;
  system: string;
  status: string;
}

export interface RBIAssessment {
  id: string;
  rbiId: string;
  asset: string;
  likelihood: string;
  consequence: string;
  riskRank: string;
  nextAssessmentDate: string;
  status: string;
  // Additional fields for detailed view
  coatingQuality?: string;
  dataConfidence?: string;
  hasCladding?: boolean;
  nominalThickness?: number;
  tMin?: number;
  currentThickness?: number;
  description?: string;
  lastInspectionDate?: string;
  lastCoatingDate?: string;
  nthinA?: number;
  nthinB?: number;
  fsThin?: number;
  srThin?: number;
  dfThin1?: number;
  dfThin2?: number;
  creep?: number;
  fcommd?: string;
  // Add all other required fields
}

export interface CorrosionStudy {
  id: string;
  studyId: string;
  system: string;
  asset: string;
  studyName: string;
  dateConducted: string;
  corrosionRate: number;
  notes?: string;
}

export interface InspectionData {
  id: string;
  inspectionId: string;
  asset: string;
  inspector: string;
  inspectionType: string;
  result: string;
  actionRequired?: string;
  date: string;
}

// RMS Module Types
export interface RMSAsset {
  id: string;
  assetId: string;
  assetName: string;
  location: string;
  system: string;
  healthStatus: string;
  lastSync: string;
}

export interface CriticalAsset {
  id: string;
  assetName: string;
  metric1: number;
  metric1Name?: string;
  metric2: number;
  metric2Name?: string;
  thresholdExceeded: boolean;
  alertLevel: string;
}

// Common Status Types
export type Status = 
  | 'Active' 
  | 'Inactive' 
  | 'Pending' 
  | 'Complete' 
  | 'In Progress' 
  | 'Overdue'
  | 'Critical'
  | 'Warning'
  | 'Normal'
  | 'Low Risk'
  | 'Medium Risk'
  | 'High Risk';

// Common field value arrays for dropdown options
export const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Complete', label: 'Complete' },
  { value: 'Overdue', label: 'Overdue' }
];

export const disciplineOptions = [
  { value: 'Mechanical', label: 'Mechanical' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Instrumentation', label: 'Instrumentation' },
  { value: 'Civil', label: 'Civil' },
  { value: 'Process', label: 'Process' }
];

export const workTypeOptions = [
  { value: 'Preventive', label: 'Preventive' },
  { value: 'Corrective', label: 'Corrective' },
  { value: 'Emergency', label: 'Emergency' },
  { value: 'Condition-Based', label: 'Condition-Based' }
];

export const riskRankOptions = [
  { value: 'Low Risk', label: 'Low Risk' },
  { value: 'Medium Risk', label: 'Medium Risk' },
  { value: 'High Risk', label: 'High Risk' }
];

export const unitOptions = [
  { value: 'EA', label: 'Each (EA)' },
  { value: 'PCS', label: 'Pieces (PCS)' },
  { value: 'KG', label: 'Kilograms (KG)' },
  { value: 'L', label: 'Liters (L)' },
  { value: 'M', label: 'Meters (M)' }
];
