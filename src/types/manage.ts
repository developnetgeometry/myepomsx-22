
// Facility Location Types
export interface FacilityLocation {
  id: string;
  code: string;
  name: string;
}

// System Types
export interface System {
  id: string;
  systemNo: string;
  name: string;
  code: string;
  facilityLocationId: string;
  facilityLocation?: string;
}

// Package Types
export interface Package {
  id: string;
  packageNo: string;
  name: string;
  tag: string;
  systemId: string;
  systemName?: string;
  type: string;
}

// Asset Types
export interface Asset {
  id: string;
  assetNo: string;
  name: string;
  packageId: string;
  package?: string;
  systemId: string;
  system?: string;
  facilityId: string;
  facility?: string;
  assetTag: string;
  model: string;
  status: string;
  sceCode: string;
  criticalityCode: string;
}

// BOM Assembly Types
export interface BomAssembly {
  id: string;
  code: string;
  name: string;
}

export interface SparePart {
  id: string;
  bomAssemblyId: string;
  name: string;
  description: string;
}

// Items Master Types
export interface ItemsMaster {
  id: string;
  itemsNo: string;
  name: string;
  manufacturerPartsNo: string;
  manufacturer: string;
  type: string;
  category: string;
}

// Inventory Types
export interface Inventory {
  id: string;
  store: string;
  rackNo: string;
  itemsNo: string;
  itemName: string;
  manufacturerPartsNo: string;
  manufacturer: string;
  type: string;
  category: string;
  description: string;
  minLevel: number;
  maxLevel: number;
  reorderLevel: number;
  balance: number;
  unitPrice: number;
  totalPrice: number;
}
