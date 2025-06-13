
import { supabase } from "@/lib/supabaseClient";
import {
  PMSchedule,
  PMScheduleDetail,
  createPMScheduleDTO,
  PMScheduleCreate,
  PMScheduleUpdate,
  createPMWorkOrder,
} from "@/types/maintain";

export const PMScheduleService = {
  async getAllPMSchedules(): Promise<PMScheduleDetail[]> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .select(`
        *,
        task:e_task(id, task_name, task_code, is_active, created_at, created_by, updated_at, updated_by),
        facility:e_facility(location_code, location_name),
        system:e_system(system_code, system_name),
        asset:e_asset(asset_no, asset_name),
        package:e_package(package_no, package_name),
        work_center:e_work_center(work_center_code, name),
        discipline:e_discipline(id, name),
        maintenance_type:e_general_maintenance(name),
        priority:e_priority(name),
        frequency:e_frequency(frequency_code, name)
      `)
      .order("id");

    if (error) {
      throw new Error(`Error fetching PM schedules: ${error.message}`);
    }

    return data || [];
  },

  async getPMScheduleById(id: number): Promise<PMScheduleDetail> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .select(`
        *,
        task:e_task(id, task_name, task_code, is_active, created_at, created_by, updated_at, updated_by),
        facility:e_facility(location_code, location_name),
        system:e_system(system_code, system_name),
        asset:e_asset(asset_no, asset_name),
        package:e_package(package_no, package_name),
        work_center:e_work_center(work_center_code, name),
        discipline:e_discipline(id, name),
        maintenance_type:e_general_maintenance(name),
        priority:e_priority(name),
        frequency:e_frequency(frequency_code, name)
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching PM schedule: ${error.message}`);
    }

    if (!data) {
      throw new Error(`PM schedule with id ${id} not found`);
    }

    return data;
  },

  async createPMSchedule(schedule: PMScheduleCreate): Promise<PMSchedule> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .insert(schedule)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating PM schedule: ${error.message}`);
    }

    return data;
  },

  async updatePMSchedule(schedule: PMScheduleUpdate): Promise<PMSchedule> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .update(schedule)
      .eq("id", schedule.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating PM schedule: ${error.message}`);
    }

    return data;
  },

  async deletePMSchedule(id: number): Promise<void> {
    const { error } = await supabase.from("pm_schedule").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting PM schedule: ${error.message}`);
    }
  },

  async createWorkOrderFromPM(workOrder: createPMWorkOrder): Promise<any> {
    const { data, error } = await supabase
      .from("e_cm_general")
      .insert(workOrder)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating work order: ${error.message}`);
    }

    return data;
  },

  // Generate multiple PM schedules based on frequency
  async generatePMSchedules(schedules: PMScheduleCreate[]): Promise<PMSchedule[]> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .insert(schedules)
      .select();

    if (error) {
      throw new Error(`Error generating PM schedules: ${error.message}`);
    }

    return data || [];
  },

  // Get PM schedules by various filters
  async getPMSchedulesByFacility(facilityId: number): Promise<PMScheduleDetail[]> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .select(`
        *,
        task:e_task(id, task_name, task_code, is_active, created_at, created_by, updated_at, updated_by),
        facility:e_facility(location_code, location_name),
        system:e_system(system_code, system_name),
        asset:e_asset(asset_no, asset_name),
        package:e_package(package_no, package_name),
        work_center:e_work_center(work_center_code, name),
        discipline:e_discipline(id, name),
        maintenance_type:e_general_maintenance(name),
        priority:e_priority(name),
        frequency:e_frequency(frequency_code, name)
      `)
      .eq("facility_id", facilityId)
      .order("due_date");

    if (error) {
      throw new Error(`Error fetching PM schedules by facility: ${error.message}`);
    }

    return data || [];
  },

  async getPMSchedulesByAsset(assetId: number): Promise<PMScheduleDetail[]> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .select(`
        *,
        task:e_task(id, task_name, task_code, is_active, created_at, created_by, updated_at, updated_by),
        facility:e_facility(location_code, location_name),
        system:e_system(system_code, system_name),
        asset:e_asset(asset_no, asset_name),
        package:e_package(package_no, package_name),
        work_center:e_work_center(work_center_code, name),
        discipline:e_discipline(id, name),
        maintenance_type:e_general_maintenance(name),
        priority:e_priority(name),
        frequency:e_frequency(frequency_code, name)
      `)
      .eq("asset_id", assetId)
      .order("due_date");

    if (error) {
      throw new Error(`Error fetching PM schedules by asset: ${error.message}`);
    }

    return data || [];
  },

  async getPMSchedulesDueInDateRange(startDate: string, endDate: string): Promise<PMScheduleDetail[]> {
    const { data, error } = await supabase
      .from("pm_schedule")
      .select(`
        *,
        task:e_task(id, task_name, task_code, is_active, created_at, created_by, updated_at, updated_by),
        facility:e_facility(location_code, location_name),
        system:e_system(system_code, system_name),
        asset:e_asset(asset_no, asset_name),
        package:e_package(package_no, package_name),
        work_center:e_work_center(work_center_code, name),
        discipline:e_discipline(id, name),
        maintenance_type:e_general_maintenance(name),
        priority:e_priority(name),
        frequency:e_frequency(frequency_code, name)
      `)
      .gte("due_date", startDate)
      .lte("due_date", endDate)
      .order("due_date");

    if (error) {
      throw new Error(`Error fetching PM schedules by date range: ${error.message}`);
    }

    return data || [];
  },
};
