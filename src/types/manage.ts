
export interface PackageType {
  id: number;
  name: string;
}

export interface Package {
  id: number;
  package_no: string;
  package_name: string;
  package_tag: string;
  system_id: number;
  package_type_id: number;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  package_type: PackageType;
}

export interface PackageCreate {
  package_no: string;
  package_name: string;
  package_tag: string;
  system_id: number;
  package_type_id: number;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface PackageUpdate {
  id: number;
  package_no: string;
  package_name: string;
  package_tag: string;
  system_id: number;
  package_type_id: number;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export type PackageData = Package;

// Add missing interfaces
export interface Facility {
  id: number;
  location_code: string;
  location_name: string;
  is_active: boolean;
  project_id: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface System {
  id: number;
  system_code: string;
  system_name: string;
  system_no: string;
  facility_id: number;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface Asset {
  id: number;
  asset_no: string;
  asset_name: string;
  facility_id: number;
  system_id: number;
  package_id: number;
  asset_tag_id: number;
  status_id: number;
  asset_group_id: number;
  asset_sce_id: number;
  asset_detail_id: number;
  commission_date: string;
  parent_asset_no?: number; // Made optional
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface AssetDetail {
  id: number;
  manufacturer_id: number;
  model: string;
  serial_number: string;
  specification: string;
  maker_no: string;
  hs_code: string;
  is_active: boolean;
  is_integrity: boolean;
  is_reliability: boolean;
  bom_id?: number;
  category: AssetCategory;
  type: AssetType;
  manufacturer: Manufacturer;
  asset_class: AssetClass;
  iot_sensor: IoTSensor;
  child_assets: ChildAsset[];
}

export interface AssetClass {
  id: number;
  name: string;
}

export interface IoTSensor {
  id: number;
  sensor_type: SensorType;
}

export interface SensorType {
  id: number;
  name: string;
}

export interface ChildAsset {
  id: number;
  type: AssetType;
  asset: Asset[];
}

export interface AssetInstallation {
  id: number;
  asset_id: number;
  installation_date: string;
  description: string;
  intermittent_service: string;
  actual_installation_date: string;
}

export interface AssetTag {
  id: number;
  name: string;
  is_active: boolean;
}

export interface AssetStatus {
  id: number;
  name: string;
  is_active: boolean;
}

export interface AssetWithRelations extends Asset {
  facility?: Partial<Facility>;
  system?: Partial<System>;
  package?: Partial<Package>;
  asset_detail?: Partial<AssetDetail>;
  asset_installation?: Partial<AssetInstallation>[];
  asset_tag?: AssetTag;
  asset_status?: AssetStatus;
}

export interface AssetDetailWithRelations {
  id: number;
  // Add other asset detail properties as needed
}

export interface AssetHierarchyNode {
  id: number;
  name: string;
  children?: AssetHierarchyNode[];
}

// Add missing types for material.ts
export interface AssetCategory {
  id: number;
  name: string;
  asset_category_group_id?: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface AssetType {
  id: number;
  name: string;
  asset_category_id?: number;
  asset_type_group_id?: number;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface Criticality {
  id: number;
  name: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface ItemGroup {
  id: number;
  name: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface Unit {
  id: number;
  name: string;
  symbol?: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

// Asset attachment interface
export interface AssetAttachment {
  id: number;
  asset_id: number;
  type: string;
  file_path: string;
  notes: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}
