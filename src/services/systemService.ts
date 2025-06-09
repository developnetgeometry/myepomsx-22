
import { supabase } from "@/lib/supabaseClient";
import { System } from "@/types/manage";

export const systemService = {
  async getSystems(): Promise<System[]> {
    const { data, error } = await supabase
      .from("e_system")
      .select("*")
      .order("system_code");

    if (error) {
      throw new Error(`Error fetching systems: ${error.message}`);
    }

    return data || [];
  },

  async getSystemById(id: number): Promise<System> {
    const { data, error } = await supabase
      .from("e_system")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching system: ${error.message}`);
    }

    if (!data) {
      throw new Error(`System with id ${id} not found`);
    }

    return data;
  },

  async getSystemsByFacilityId(facilityId: number): Promise<System[]> {
    const { data, error } = await supabase
      .from("e_system")
      .select("*")
      .eq("facility_id", facilityId)
      .order("system_code");

    if (error) {
      throw new Error(`Error fetching systems for facility: ${error.message}`);
    }

    return data || [];
  },

  async createSystem(system: Omit<System, "id">): Promise<System> {
    const { data, error } = await supabase
      .from("e_system")
      .insert({
        system_code: system.system_code,
        system_name: system.system_name,
        system_no: system.system_no,
        facility_id: system.facility_id,
        is_active: system.is_active,
        created_at: system.created_at,
        created_by: system.created_by,
        updated_at: system.updated_at,
        updated_by: system.updated_by
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating system: ${error.message}`);
    }

    return data;
  },

  async updateSystem(system: System): Promise<System> {
    const { data, error } = await supabase
      .from("e_system")
      .update({
        system_code: system.system_code,
        system_name: system.system_name,
        system_no: system.system_no,
        facility_id: system.facility_id,
        is_active: system.is_active,
        updated_at: system.updated_at,
        updated_by: system.updated_by
      })
      .eq("id", system.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating system: ${error.message}`);
    }

    return data;
  },

  async deleteSystem(id: number): Promise<void> {
    const { error } = await supabase.from("e_system").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting system: ${error.message}`);
    }
  },
};
