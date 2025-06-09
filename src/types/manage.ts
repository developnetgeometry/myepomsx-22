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
