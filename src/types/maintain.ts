
export interface Task {
  id: number;
  task_name: string;
  task_code: string;
  description?: string;
  discipline_id?: number;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface TaskCreate {
  task_name: string;
  task_code: string;
  description?: string;
  discipline_id?: number;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}

export interface TaskUpdate {
  id: number;
  task_name: string;
  task_code: string;
  description?: string;
  discipline_id?: number;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}

export interface TaskDetail {
  id: number;
  task_id: number;
  sequence: number;
  task_list: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface TaskDetailCreate {
  task_id: number;
  sequence: number;
  task_list: string;
  created_by: string;
  updated_by: string;
}

export interface TaskDetailUpdate {
  id: number;
  task_id: number;
  sequence: number;
  task_list: string;
  created_by: string;
  updated_by: string;
}

export interface PMSchedule {
  id: number;
  pm_no: string;
  pm_description: string;
  due_date: string;
  maintenance_id: number;
  priority_id: number;
  work_center_id: number;
  discipline_id: number;
  task_id: number;
  frequency_id: number;
  asset_id: number;
  system_id: number;
  package_id: number;
  pm_group_id: number;
  pm_sce_group_id: number;
  facility_id: number;
  is_active: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface PMScheduleCreate {
  pm_description: string;
  due_date: string;
  maintenance_id: number;
  priority_id: number;
  work_center_id: number;
  discipline_id: number;
  task_id: number;
  frequency_id: number;
  asset_id: number;
  system_id: number;
  package_id: number;
  pm_group_id: number;
  pm_sce_group_id: number;
  facility_id: number;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}

export interface PMScheduleUpdate {
  id: number;
  pm_description: string;
  due_date: string;
  maintenance_id: number;
  priority_id: number;
  work_center_id: number;
  discipline_id: number;
  task_id: number;
  frequency_id: number;
  asset_id: number;
  system_id: number;
  package_id: number;
  pm_group_id: number;
  pm_sce_group_id: number;
  facility_id: number;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}
