
import * as z from 'zod';

/**
 * Common form schemas for different modules
 */

// CMMS Module Schemas
export const facilitySchema = z.object({
  facilityCode: z.string().min(1, "Facility code is required"),
  facilityLocation: z.string().min(1, "Facility location is required"),
});

export const systemSchema = z.object({
  systemNo: z.string().min(1, "System No is required"),
  systemName: z.string().min(1, "System Name is required"),
  systemCode: z.string().min(1, "System Code is required"),
  facilityLocationId: z.string().min(1, "Facility Location is required"),
});

export const packageSchema = z.object({
  packageNo: z.string().min(1, "Package No is required"),
  packageName: z.string().min(1, "Package Name is required"),
  discipline: z.string().min(1, "Discipline is required"),
  taskType: z.string().min(1, "Task Type is required"),
  department: z.string().min(1, "Department is required"),
  description: z.string().optional(),
});

export const assetSchema = z.object({
  assetNo: z.string().min(1, "Asset No is required"),
  assetName: z.string().min(1, "Asset Name is required"),
  systemId: z.string().min(1, "System is required"),
  assetType: z.string().min(1, "Asset Type is required"),
  assetClass: z.string().min(1, "Asset Class is required"),
  discipline: z.string().min(1, "Discipline is required"),
  status: z.string().min(1, "Status is required"),
  workCenter: z.string().min(1, "Work Center is required"),
});

export const bomAssemblySchema = z.object({
  bomAssemblyId: z.string().min(1, "BOM Assembly ID is required"),
  sparePartName: z.string().min(1, "Spare Part Name is required"),
  quantity: z.coerce.number().min(0, "Quantity must be a positive number"),
  unit: z.string().min(1, "Unit is required"),
});

export const itemMasterSchema = z.object({
  itemNo: z.string().min(1, "Item No is required"),
  itemDescription: z.string().min(1, "Item Description is required"),
  unitOfMeasure: z.string().min(1, "Unit of Measure is required"),
  itemCategory: z.string().min(1, "Item Category is required"),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  specification: z.string().optional(),
  status: z.string().min(1, "Status is required"),
});

export const inventorySchema = z.object({
  itemNo: z.string().min(1, "Item No is required"),
  location: z.string().min(1, "Location is required"),
  availableQuantity: z.coerce.number().min(0, "Available Quantity must be a positive number"),
  reservedQuantity: z.coerce.number().min(0, "Reserved Quantity must be a positive number"),
  unitOfMeasure: z.string().min(1, "Unit of Measure is required"),
  unitPrice: z.coerce.number().min(0, "Unit Price must be a positive number"),
});

// Maintain Module Schemas
export const pmScheduleSchema = z.object({
  pmNo: z.string().min(1, "PM No is required"),
  assetId: z.string().min(1, "Asset is required"),
  task: z.string().min(1, "Task is required"),
  planStartDate: z.string().min(1, "Plan Start Date is required"),
  planEndDate: z.string().min(1, "Plan End Date is required"),
  status: z.string().min(1, "Status is required"),
});

export const workRequestSchema = z.object({
  workRequestNo: z.string().min(1, "Work Request No is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().min(1, "Status is required"),
  requestedById: z.string().min(1, "Requested By is required"),
  workCenter: z.string().min(1, "Work Center is required"),
  assetId: z.string().min(1, "Asset is required"),
  requestDate: z.string().min(1, "Request Date is required"),
  workType: z.string().min(1, "Work Type is required"),
  dateFinding: z.string().optional(),
});

export const workOrderSchema = z.object({
  workOrderNo: z.string().min(1, "Work Order No is required"),
  planDueDate: z.string().min(1, "Plan Due Date is required"),
  task: z.string().min(1, "Task is required"),
  pmNo: z.string().optional(),
  packageNo: z.string().optional(),
  assetNo: z.string().min(1, "Asset No is required"),
  frequency: z.string().min(1, "Frequency is required"),
  workType: z.string().min(1, "Work Type is required"),
  workCenter: z.string().min(1, "Work Center is required"),
  woStatus: z.string().min(1, "WO Status is required"),
  description: z.string().min(1, "Description is required"),
});

export const taskLibrarySchema = z.object({
  taskCode: z.string().min(1, "Task Code is required"),
  taskName: z.string().min(1, "Task Name is required"),
  discipline: z.string().min(1, "Discipline is required"),
  counter: z.coerce.number().int().min(0, "Counter must be a non-negative integer"),
});

// IMS Module Schemas
export const integritySchema = z.object({
  assetCode: z.string().min(1, "Asset Code is required"),
  assetName: z.string().min(1, "Asset Name is required"),
  area: z.string().min(1, "Area is required"),
  system: z.string().min(1, "System is required"),
  status: z.string().min(1, "Status is required"),
});

export const rbiAssessmentSchema = z.object({
  rbiId: z.string().min(1, "RBI ID is required"),
  asset: z.string().min(1, "Asset is required"),
  likelihood: z.string().min(1, "Likelihood is required"),
  consequence: z.string().min(1, "Consequence is required"),
  riskRank: z.string().min(1, "Risk Rank is required"),
  nextAssessmentDate: z.string().min(1, "Next Assessment Date is required"),
  status: z.string().min(1, "Status is required"),
});

export const corrosionStudiesSchema = z.object({
  studyId: z.string().min(1, "Study ID is required"),
  system: z.string().min(1, "System is required"),
  asset: z.string().min(1, "Asset is required"),
  studyName: z.string().min(1, "Study Name is required"),
  dateConducted: z.string().min(1, "Date Conducted is required"),
  corrosionRate: z.coerce.number().min(0, "Corrosion Rate must be a positive number"),
  notes: z.string().optional(),
});

export const inspectionDataSchema = z.object({
  inspectionId: z.string().min(1, "Inspection ID is required"),
  asset: z.string().min(1, "Asset is required"),
  inspector: z.string().min(1, "Inspector is required"),
  inspectionType: z.string().min(1, "Inspection Type is required"),
  result: z.string().min(1, "Result is required"),
  actionRequired: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

// RMS Module Schemas
export const rmsAssetSchema = z.object({
  assetId: z.string().min(1, "Asset ID is required"),
  assetName: z.string().min(1, "Asset Name is required"),
  location: z.string().min(1, "Location is required"),
  system: z.string().min(1, "System is required"),
  healthStatus: z.string().min(1, "Health Status is required"),
});

export const criticalAssetSchema = z.object({
  assetName: z.string().min(1, "Asset Name is required"),
  metric1: z.coerce.number(),
  metric2: z.coerce.number(),
  thresholdExceeded: z.boolean(),
  alertLevel: z.string().min(1, "Alert Level is required"),
});
