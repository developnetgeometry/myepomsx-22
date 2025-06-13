
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
  updated_by: string;
}

export interface TaskWithDetails extends Task {
  task_details?: TaskDetail[];
}

export interface DisciplineOption {
  id: number;
  name: string;
  value: number;
  label: string;
}

export interface createTaskDTO {
  task_name: string;
  task_code: string;
  description?: string;
  discipline_id?: number;
  is_active: boolean;
  created_by: string;
  updated_by: string;
}

export interface MinAcceptanceCriteria {
  id: number;
  criteria_name: string;
  field_name?: string;
  criteria?: string;
  description?: string;
  min_value?: number;
  max_value?: number;
}

export interface createPMScheduleDTO {
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
  pm_no?: string;
  service_notes?: string;
  checksheet_attachment?: string;
  checksheet_notes?: string;
  additional_info?: string;
}

export interface createPMWorkOrder {
  pm_schedule_id: number;
  work_order_no: string;
  description: string;
  work_order_type_id: number;
  priority_id: number;
  asset_id: number;
  created_by: string;
  updated_by: string;
}

export interface PMScheduleDetail extends PMSchedule {
  task?: Task;
  facility?: any;
  system?: any;
  asset?: any;
  package?: any;
  work_center?: any;
  discipline?: DisciplineOption;
  maintenance_type?: any;
  priority?: any;
  frequency?: any;
  service_notes?: string;
  checksheet_attachment?: string;
  checksheet_notes?: string;
  additional_info?: string;
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
  service_notes?: string;
  checksheet_attachment?: string;
  checksheet_notes?: string;
  additional_info?: string;
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
  service_notes?: string;
  checksheet_attachment?: string;
  checksheet_notes?: string;
  additional_info?: string;
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
  service_notes?: string;
  checksheet_attachment?: string;
  checksheet_notes?: string;
  additional_info?: string;
}
