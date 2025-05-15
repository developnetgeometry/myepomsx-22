
// RBI Assessment Types
export interface RBIAssessment {
  id: string;
  rbiId: string;
  asset: string;
  likelihood: 'Low' | 'Medium' | 'High';
  consequence: 'Low' | 'Medium' | 'High';
  riskRank: 'Low' | 'Medium' | 'High' | 'Critical';
  nextAssessmentDate: string;
  status: 'Active' | 'Complete' | 'On Hold';
  
  // POF Assessment - General
  coatingQuality: 'Good' | 'Fair' | 'Poor';
  dataConfidence: 'High' | 'Medium' | 'Low';
  hasCladding: boolean;
  nominalThickness: number;
  tMin: number;
  currentThickness: number;
  description: string;
  
  // Damage Factor
  lastInspectionDate: string;
  lastCoatingDate: string;
  nthinA: number;
  nthinB: number;
  fsThin: number;
  srThin: number;
  dfThin1: number;
  dfThin2: number;
  creep: number;
  pothin1: number;
  agerc: number;
  bhthin: number;
  
  // COF Assessment - COF PROD
  fcommd: number;
  fatta: number;
  outagehrs: number;
  outagemult: number;
  lrapprod: number;
  fprodd: number;
  popdens: number;
  injcost: number;
  facexp: number;
  volinv: number;
  fc: number;
  ftotal: number;
  envcost: number;
  fatality: number;
  evacuation: number;
  
  // COF Assessment - COF AREA
  isoSys: 'Manual' | 'Auto' | 'Semi-Auto';
  detSys: 'Manual' | 'Auto' | 'Semi-Auto';
  mitigationSystem: 'Basic' | 'Advanced' | 'Premium';
  idealGasSpecificHeatEQ: 'Standard' | 'Modified' | 'Advanced';
  pkkpa: number;
  prtankKpa: number;
  wtkg: number;
  releaseType: 'Gas' | 'Liquid' | 'Two-Phase';
  ratton: number;
  inventorykg: number;
  caCmdfail: number;
  caInjfail: number;
  caInjfatal: number;
  caCmdfatal: number;
  k: number;
  timemstep: number;
  ldmax: number;
  
  // Risk & IRP
  dfhta: number;
  dbrint: number;
  dfmat: number;
  dfextclsc: number;
  dfcuiiff: number;
  dmsccssc: number;
  dmfat: number;
  dpSCCSOHIC: number;
  cofFinancial: number;
  cofArea: number;
  dfthin: number;
  pof: number;
  pofValue: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskRanking: 'Low' | 'Medium' | 'High' | 'Critical';
  
  // Additional fields for DF Forms
  // Added for DF EXT form
  extAge?: number;
  extEnvironment?: string;
  pipeSupport?: string;
  soilWaterInterface?: string;
  crexp?: number;
  cract?: number;
  art?: number;
  fsextcorr?: number;
  srextcorr?: number;
  remainingLife?: number;
  rl?: number;
  remarks?: string;
  
  // Added for DF EXT.CLSCC form
  agecrack?: number;
  agecoat?: number;
  coatadj?: number;
  extClSccSusc?: string;
  svi?: number;
  inspectionEfficiency?: number;
  dfExtClSccFb?: number;
}
