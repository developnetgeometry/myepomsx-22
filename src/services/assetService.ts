import { supabase } from "@/lib/supabaseClient";
import { Asset, AssetWithRelations, AssetHierarchyNode, AssetAttachment } from "@/types/manage";

export const assetService = {
  async getAssets(): Promise<Asset[]> {
    const { data, error } = await supabase
      .from("e_asset")
      .select(`
        id,
        asset_no,
        asset_name,
        facility_id,
        system_id,
        package_id,
        asset_tag_id,
        status_id,
        asset_group_id,
        asset_sce_id,
        asset_detail_id,
        commission_date,
        created_at,
        created_by,
        updated_at,
        updated_by
      `)
      .order("asset_no");

    if (error) {
      throw new Error(`Error fetching assets: ${error.message}`);
    }

    return data || [];
  },

  async getAssetsWithRelations(): Promise<AssetWithRelations[]> {
    const { data, error } = await supabase
      .from("e_asset")
      .select(`
        id,
        asset_no,
        asset_name,
        facility_id,
        system_id,
        package_id,
        asset_tag_id,
        status_id,
        asset_group_id,
        asset_sce_id,
        asset_detail_id,
        commission_date,
        created_at,
        created_by,
        updated_at,
        updated_by,
        e_facility!inner(id, location_code, location_name),
        e_system!inner(id, system_code, system_name),
        e_package!inner(id, package_no, package_name),
        e_asset_sce!inner(id, sce_code, group_name)
      `)
      .order("asset_no");

    if (error) {
      throw new Error(`Error fetching assets with relations: ${error.message}`);
    }

    return data || [];
  },

  async getAssetHierarchy(): Promise<{ facilities: AssetHierarchyNode[] }> {
    // Get facilities
    const { data: facilities, error: facilitiesError } = await supabase
      .from("e_facility")
      .select("id, location_name")
      .order("location_name");

    if (facilitiesError) {
      throw new Error(`Error fetching facilities: ${facilitiesError.message}`);
    }

    const facilityNodes: AssetHierarchyNode[] = facilities?.map((facility) => ({
      id: facility.id,
      name: facility.location_name || `Facility ${facility.id}`,
      children: []
    })) || [];

    // Get systems for each facility
    for (const facilityNode of facilityNodes) {
      const { data: systems, error: systemsError } = await supabase
        .from("e_system")
        .select("id, system_name")
        .eq("facility_id", facilityNode.id)
        .order("system_name");

      if (systemsError) {
        throw new Error(`Error fetching systems: ${systemsError.message}`);
      }

      const systemNodes: AssetHierarchyNode[] = systems?.map((system) => ({
        id: system.id,
        name: system.system_name || `System ${system.id}`,
        children: []
      })) || [];

      // Get assets for each system
      for (const systemNode of systemNodes) {
        const { data: assets, error: assetsError } = await supabase
          .from("e_asset")
          .select("id, asset_name, asset_no")
          .eq("system_id", systemNode.id)
          .order("asset_no");

        if (assetsError) {
          throw new Error(`Error fetching assets: ${assetsError.message}`);
        }

        systemNode.children = assets?.map((asset) => ({
          id: asset.id,
          name: asset.asset_name || asset.asset_no
        })) || [];
      }

      facilityNode.children = systemNodes;
    }

    return { facilities: facilityNodes };
  },

  async getAssetByIdWithRelations(id: number): Promise<AssetWithRelations> {
    const { data, error } = await supabase
      .from("e_asset")
      .select(`
        id,
        asset_no,
        asset_name,
        facility_id,
        system_id,
        package_id,
        asset_tag_id,
        status_id,
        asset_group_id,
        asset_sce_id,
        asset_detail_id,
        commission_date,
        created_at,
        created_by,
        updated_at,
        updated_by,
        e_facility(id, location_code, location_name),
        e_system(id, system_code, system_name),
        e_package(id, package_no, package_name),
        e_asset_detail(id, manufacturer_id, model, serial_number, specification),
        e_asset_installation(id, asset_id, description),
        e_asset_tag(id, name, is_active),
        e_asset_status(id, name, is_active)
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching asset: ${error.message}`);
    }

    if (!data) {
      throw new Error(`Asset with id ${id} not found`);
    }

    // Transform the data to match AssetWithRelations interface
    const assetWithRelations: AssetWithRelations = {
      ...data,
      facility: data.e_facility || undefined,
      system: data.e_system || undefined,
      package: data.e_package || undefined,
      asset_detail: data.e_asset_detail || undefined,
      asset_installation: data.e_asset_installation || undefined,
      asset_tag: data.e_asset_tag || undefined,
      asset_status: data.e_asset_status || undefined,
    };

    return assetWithRelations;
  },

  async getItemsByBomId(bomId: number): Promise<any[]> {
    const { data, error } = await supabase
      .from("e_bom_assembly")
      .select(`
        id,
        bom_code,
        bom_name,
        description,
        item_master_id,
        e_item_master(id, item_no, item_name, manufacturer_part_no, specification)
      `)
      .eq("id", bomId);

    if (error) {
      throw new Error(`Error fetching BOM items: ${error.message}`);
    }

    return data || [];
  },

  async getWorkOrdersByAssetId(assetId: number): Promise<any[]> {
    const { data, error } = await supabase
      .from("e_cm_general")
      .select(`
        id,
        work_request_id,
        due_date,
        target_start_date,
        target_end_date,
        downtime,
        asset_id
      `)
      .eq("asset_id", assetId)
      .order("due_date", { ascending: false });

    if (error) {
      throw new Error(`Error fetching work orders: ${error.message}`);
    }

    return data || [];
  },

  async getAssetAttachments(assetId: number): Promise<AssetAttachment[]> {
    const { data, error } = await supabase
      .from("e_asset_attachment")
      .select("*")
      .eq("asset_id", assetId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error fetching asset attachments: ${error.message}`);
    }

    return data || [];
  },

  async getAssetById(id: number): Promise<Asset> {
    const { data, error } = await supabase
      .from("e_asset")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching asset: ${error.message}`);
    }

    if (!data) {
      throw new Error(`Asset with id ${id} not found`);
    }

    return data;
  },

  async createAsset(asset: Omit<Asset, "id">): Promise<Asset> {
    const { data, error } = await supabase
      .from("e_asset")
      .insert(asset)
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating asset: ${error.message}`);
    }

    return data;
  },

  async updateAsset(asset: Asset): Promise<Asset> {
    const { data, error } = await supabase
      .from("e_asset")
      .update(asset)
      .eq("id", asset.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating asset: ${error.message}`);
    }

    return data;
  },

  async deleteAsset(id: number): Promise<void> {
    const { error } = await supabase.from("e_asset").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting asset: ${error.message}`);
    }
  },
};
