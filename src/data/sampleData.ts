
import { 
  FacilityLocation, 
  System, 
  Package, 
  Asset, 
  BomAssembly, 
  SparePart,
  ItemsMaster,
  Inventory 
} from "@/types/manage";

// Facility Location Sample Data
export const facilityLocations: FacilityLocation[] = [
  { id: "1", code: "FAC001", name: "Main Plant" },
  { id: "2", code: "FAC002", name: "Offshore Platform A" },
  { id: "3", code: "FAC003", name: "Refinery South" },
  { id: "4", code: "FAC004", name: "Chemical Plant" },
  { id: "5", code: "FAC005", name: "Storage Terminal" },
];

// System Sample Data
export const systems: System[] = [
  { id: "1", systemNo: "SYS001", name: "HVAC System", code: "HVAC-1", facilityLocationId: "1", facilityLocation: "Main Plant" },
  { id: "2", systemNo: "SYS002", name: "Fire Protection", code: "FP-1", facilityLocationId: "1", facilityLocation: "Main Plant" },
  { id: "3", systemNo: "SYS003", name: "Water Treatment", code: "WT-1", facilityLocationId: "2", facilityLocation: "Offshore Platform A" },
  { id: "4", systemNo: "SYS004", name: "Production Line", code: "PL-1", facilityLocationId: "3", facilityLocation: "Refinery South" },
  { id: "5", systemNo: "SYS005", name: "Electrical System", code: "ES-1", facilityLocationId: "4", facilityLocation: "Chemical Plant" },
];

// Package Sample Data
export const packages: Package[] = [
  { id: "1", packageNo: "PKG001", name: "Air Handling Unit 1", tag: "AHU-1", systemId: "1", systemName: "HVAC System", type: "Mechanical" },
  { id: "2", packageNo: "PKG002", name: "Sprinkler System", tag: "SPK-1", systemId: "2", systemName: "Fire Protection", type: "Safety" },
  { id: "3", packageNo: "PKG003", name: "Filtration Unit", tag: "FIL-1", systemId: "3", systemName: "Water Treatment", type: "Process" },
  { id: "4", packageNo: "PKG004", name: "Compressor Package", tag: "CMP-1", systemId: "4", systemName: "Production Line", type: "Mechanical" },
  { id: "5", packageNo: "PKG005", name: "Transformer Unit", tag: "TRX-1", systemId: "5", systemName: "Electrical System", type: "Electrical" },
];

// Asset Sample Data
export const assets: Asset[] = [
  { 
    id: "1", 
    assetNo: "AST001", 
    name: "Centrifugal Pump", 
    packageId: "1", 
    package: "Air Handling Unit 1", 
    systemId: "1", 
    system: "HVAC System", 
    facilityId: "1", 
    facility: "Main Plant", 
    assetTag: "PMP-001", 
    model: "CP-500", 
    status: "Active", 
    sceCode: "SC-001", 
    criticalityCode: "A"
  },
  { 
    id: "2", 
    assetNo: "AST002", 
    name: "Control Valve", 
    packageId: "2", 
    package: "Sprinkler System", 
    systemId: "2", 
    system: "Fire Protection", 
    facilityId: "1", 
    facility: "Main Plant", 
    assetTag: "VLV-001", 
    model: "CV-200", 
    status: "Active", 
    sceCode: "SC-002", 
    criticalityCode: "A"
  },
  { 
    id: "3", 
    assetNo: "AST003", 
    name: "Filter Unit", 
    packageId: "3", 
    package: "Filtration Unit", 
    systemId: "3", 
    system: "Water Treatment", 
    facilityId: "2", 
    facility: "Offshore Platform A", 
    assetTag: "FLT-001", 
    model: "F-100", 
    status: "Active", 
    sceCode: "SC-003", 
    criticalityCode: "B"
  },
  { 
    id: "4", 
    assetNo: "AST004", 
    name: "Electric Motor", 
    packageId: "4", 
    package: "Compressor Package", 
    systemId: "4", 
    system: "Production Line", 
    facilityId: "3", 
    facility: "Refinery South", 
    assetTag: "MTR-001", 
    model: "EM-750", 
    status: "Inactive", 
    sceCode: "SC-004", 
    criticalityCode: "B"
  },
  { 
    id: "5", 
    assetNo: "AST005", 
    name: "Transformer", 
    packageId: "5", 
    package: "Transformer Unit", 
    systemId: "5", 
    system: "Electrical System", 
    facilityId: "4", 
    facility: "Chemical Plant", 
    assetTag: "TRF-001", 
    model: "TX-1000", 
    status: "Active", 
    sceCode: "SC-005", 
    criticalityCode: "A"
  },
];

// BOM Assembly Sample Data
export const bomAssemblies: BomAssembly[] = [
  { id: "1", code: "BOM001", name: "Pump Assembly" },
  { id: "2", code: "BOM002", name: "Valve Assembly" },
  { id: "3", code: "BOM003", name: "Filter Assembly" },
  { id: "4", code: "BOM004", name: "Motor Assembly" },
  { id: "5", code: "BOM005", name: "Transformer Assembly" },
];

// Spare Parts Sample Data
export const spareParts: SparePart[] = [
  { id: "1", bomAssemblyId: "1", name: "Impeller", description: "Centrifugal pump impeller" },
  { id: "2", bomAssemblyId: "1", name: "Mechanical Seal", description: "Pump shaft seal" },
  { id: "3", bomAssemblyId: "2", name: "Valve Stem", description: "Control valve stem" },
  { id: "4", bomAssemblyId: "2", name: "Valve Seat", description: "Control valve seat" },
  { id: "5", bomAssemblyId: "3", name: "Filter Element", description: "Replaceable filter element" },
  { id: "6", bomAssemblyId: "3", name: "O-Ring Set", description: "Filter housing seals" },
  { id: "7", bomAssemblyId: "4", name: "Bearing Set", description: "Motor bearings" },
  { id: "8", bomAssemblyId: "4", name: "Cooling Fan", description: "Motor cooling fan" },
  { id: "9", bomAssemblyId: "5", name: "Bushing", description: "Transformer bushing" },
  { id: "10", bomAssemblyId: "5", name: "Cooling Radiator", description: "Transformer cooling system" },
];

// Items Master Sample Data
export const itemsMaster: ItemsMaster[] = [
  { id: "1", itemsNo: "ITM001", name: "Bearing", manufacturerPartsNo: "B-12345", manufacturer: "SKF", type: "Mechanical", category: "Rotating Equipment" },
  { id: "2", itemsNo: "ITM002", name: "Gasket", manufacturerPartsNo: "G-67890", manufacturer: "Flexitallic", type: "Mechanical", category: "Sealing" },
  { id: "3", itemsNo: "ITM003", name: "Circuit Breaker", manufacturerPartsNo: "CB-34567", manufacturer: "Schneider", type: "Electrical", category: "Protection" },
  { id: "4", itemsNo: "ITM004", name: "Pressure Gauge", manufacturerPartsNo: "PG-78901", manufacturer: "Wika", type: "Instrumentation", category: "Measurement" },
  { id: "5", itemsNo: "ITM005", name: "Control Valve", manufacturerPartsNo: "CV-23456", manufacturer: "Fisher", type: "Mechanical", category: "Flow Control" },
];

// Inventory Sample Data
export const inventory: Inventory[] = [
  { 
    id: "1", 
    store: "Main Warehouse", 
    rackNo: "R-101", 
    itemsNo: "ITM001", 
    itemName: "Bearing", 
    manufacturerPartsNo: "B-12345", 
    manufacturer: "SKF", 
    type: "Mechanical", 
    category: "Rotating Equipment", 
    description: "Ball bearing for pump applications", 
    minLevel: 10, 
    maxLevel: 50, 
    reorderLevel: 15, 
    balance: 25, 
    unitPrice: 45.99, 
    totalPrice: 1149.75 
  },
  { 
    id: "2", 
    store: "Main Warehouse", 
    rackNo: "R-102", 
    itemsNo: "ITM002", 
    itemName: "Gasket", 
    manufacturerPartsNo: "G-67890", 
    manufacturer: "Flexitallic", 
    type: "Mechanical", 
    category: "Sealing", 
    description: "Spiral wound gasket for flange connections", 
    minLevel: 20, 
    maxLevel: 100, 
    reorderLevel: 30, 
    balance: 45, 
    unitPrice: 12.50, 
    totalPrice: 562.50 
  },
  { 
    id: "3", 
    store: "Electrical Store", 
    rackNo: "R-201", 
    itemsNo: "ITM003", 
    itemName: "Circuit Breaker", 
    manufacturerPartsNo: "CB-34567", 
    manufacturer: "Schneider", 
    type: "Electrical", 
    category: "Protection", 
    description: "3-phase circuit breaker", 
    minLevel: 5, 
    maxLevel: 20, 
    reorderLevel: 8, 
    balance: 12, 
    unitPrice: 89.99, 
    totalPrice: 1079.88 
  },
  { 
    id: "4", 
    store: "Instrument Store", 
    rackNo: "R-301", 
    itemsNo: "ITM004", 
    itemName: "Pressure Gauge", 
    manufacturerPartsNo: "PG-78901", 
    manufacturer: "Wika", 
    type: "Instrumentation", 
    category: "Measurement", 
    description: "0-10 bar pressure gauge", 
    minLevel: 10, 
    maxLevel: 40, 
    reorderLevel: 15, 
    balance: 22, 
    unitPrice: 35.75, 
    totalPrice: 786.50 
  },
  { 
    id: "5", 
    store: "Main Warehouse", 
    rackNo: "R-103", 
    itemsNo: "ITM005", 
    itemName: "Control Valve", 
    manufacturerPartsNo: "CV-23456", 
    manufacturer: "Fisher", 
    type: "Mechanical", 
    category: "Flow Control", 
    description: "2-inch globe valve", 
    minLevel: 2, 
    maxLevel: 10, 
    reorderLevel: 3, 
    balance: 4, 
    unitPrice: 325.00, 
    totalPrice: 1300.00 
  },
];

// Hierarchy for tree view
export const assetHierarchy = {
  facilities: facilityLocations.map(facility => ({
    id: facility.id,
    name: facility.name,
    type: 'facility',
    children: systems
      .filter(system => system.facilityLocationId === facility.id)
      .map(system => ({
        id: system.id,
        name: system.name,
        type: 'system',
        children: packages
          .filter(pkg => pkg.systemId === system.id)
          .map(pkg => ({
            id: pkg.id,
            name: pkg.name,
            type: 'package',
            children: assets
              .filter(asset => asset.packageId === pkg.id)
              .map(asset => ({
                id: asset.id,
                name: asset.name,
                type: 'asset',
                children: []
              }))
          }))
      }))
  }))
};
