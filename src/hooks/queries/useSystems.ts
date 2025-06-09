
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { systemService } from "@/services/systemService";
import { System } from "@/types/manage";

export const useSystems = () => {
  return useQuery({
    queryKey: ["systems"],
    queryFn: systemService.getSystems,
  });
};

export const useSystem = (id: number) => {
  return useQuery({
    queryKey: ["system", id],
    queryFn: () => systemService.getSystemById(id),
    enabled: !!id,
  });
};

export const useSystemsByFacility = (facilityId: number) => {
  return useQuery({
    queryKey: ["systems", "facility", facilityId],
    queryFn: () => systemService.getSystemsByFacilityId(facilityId),
    enabled: !!facilityId,
  });
};

export const useCreateSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: systemService.createSystem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systems"] });
    },
  });
};

export const useUpdateSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: systemService.updateSystem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systems"] });
    },
  });
};

export const useDeleteSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: systemService.deleteSystem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systems"] });
    },
  });
};
