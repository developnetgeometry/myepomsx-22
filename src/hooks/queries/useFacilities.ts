
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { facilityService } from "@/services/facilityService";
import { Facility } from "@/types/manage";

export const useFacilities = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: facilityService.getFacilities,
  });
};

export const useFacility = (id: number) => {
  return useQuery({
    queryKey: ["facility", id],
    queryFn: () => facilityService.getFacilityById(id),
    enabled: !!id,
  });
};

export const useCreateFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: facilityService.createFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};

export const useAddFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: facilityService.createFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};

export const useUpdateFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: facilityService.updateFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};

export const useDeleteFacility = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: facilityService.deleteFacility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};
