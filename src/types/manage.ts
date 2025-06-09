
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
  parent_asset_no: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface AssetWithRelations extends Asset {
  facility?: Facility;
  system?: System;
  package?: Package;
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
