
import { supabase } from "@/lib/supabaseClient";
import { Facility } from "@/types/manage";

export const facilityService = {
  async getFacilities(): Promise<Facility[]> {
    const { data, error } = await supabase
      .from("e_facility")
      .select("*")
      .order("location_code");

    if (error) {
      throw new Error(`Error fetching facilities: ${error.message}`);
    }

    return data || [];
  },

  async getFacilityById(id: number): Promise<Facility> {
    const { data, error } = await supabase
      .from("e_facility")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching facility: ${error.message}`);
    }

    if (!data) {
      throw new Error(`Facility with id ${id} not found`);
    }

    return data;
  },

  async createFacility(facility: Omit<Facility, "id">): Promise<Facility> {
    const { data, error } = await supabase
      .from("e_facility")
      .insert({
        location_code: facility.location_code,
        location_name: facility.location_name,
        is_active: facility.is_active,
        project_id: facility.project_id,
        created_at: facility.created_at,
        created_by: facility.created_by,
        updated_at: facility.updated_at,
        updated_by: facility.updated_by
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating facility: ${error.message}`);
    }

    return data;
  },

  async updateFacility(facility: Facility): Promise<Facility> {
    const { data, error } = await supabase
      .from("e_facility")
      .update({
        location_code: facility.location_code,
        location_name: facility.location_name,
        is_active: facility.is_active,
        project_id: facility.project_id,
        updated_at: facility.updated_at,
        updated_by: facility.updated_by
      })
      .eq("id", facility.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating facility: ${error.message}`);
    }

    return data;
  },

  async deleteFacility(id: number): Promise<void> {
    const { error } = await supabase.from("e_facility").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting facility: ${error.message}`);
    }
  },
};
