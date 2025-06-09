
import { supabase } from "@/lib/supabaseClient";
import { Package, PackageCreate, PackageUpdate } from "@/types/manage";

export const packageService = {
  async getPackages(): Promise<Package[]> {
    const { data, error } = await supabase
      .from("e_package")
      .select(`
        *,
        package_type: e_package_type(*)
      `)
      .order("package_no");

    if (error) {
      throw new Error(`Error fetching packages: ${error.message}`);
    }

    // Transform data to ensure package_type includes id
    const transformedData = data?.map((pkg: any) => ({
      ...pkg,
      package_type: {
        id: pkg.package_type?.id || pkg.package_type_id,
        name: pkg.package_type?.name || 'Unknown',
      },
    })) || [];

    return transformedData;
  },

  async getPackageById(id: number): Promise<Package> {
    const { data, error } = await supabase
      .from("e_package")
      .select(`
        *,
        package_type: e_package_type(*)
      `)
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(`Error fetching package: ${error.message}`);
    }

    if (!data) {
      throw new Error(`Package with id ${id} not found`);
    }

    // Transform data to ensure package_type includes id
    const transformedData = {
      ...data,
      package_type: {
        id: data.package_type?.id || data.package_type_id,
        name: data.package_type?.name || 'Unknown',
      },
    };

    return transformedData;
  },

  async createPackage(packageData: PackageCreate): Promise<Package> {
    const { data, error } = await supabase
      .from("e_package")
      .insert(packageData)
      .select(`
        *,
        package_type: e_package_type(*)
      `)
      .single();

    if (error) {
      throw new Error(`Error creating package: ${error.message}`);
    }

    return data;
  },

  async updatePackage(packageData: PackageUpdate): Promise<Package> {
    const { data, error } = await supabase
      .from("e_package")
      .update(packageData)
      .eq("id", packageData.id)
      .select(`
        *,
        package_type: e_package_type(*)
      `)
      .single();

    if (error) {
      throw new Error(`Error updating package: ${error.message}`);
    }

    return data;
  },

  async deletePackage(id: number): Promise<void> {
    const { error } = await supabase.from("e_package").delete().eq("id", id);

    if (error) {
      throw new Error(`Error deleting package: ${error.message}`);
    }
  },
};
