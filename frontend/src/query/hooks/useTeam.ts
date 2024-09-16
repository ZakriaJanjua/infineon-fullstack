import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTeamMember, deleteTeamMember, getTeam, getTeamBouts, getTeamIds } from "../api/team";

export function useGetTeam() {
   return useQuery({
      queryKey: ['getTeam'],
      queryFn: () => getTeam()
   })
}

export function useAddTeamMember() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationKey: ['addTeamMember'],
      mutationFn: (superheroId: string) => addTeamMember(superheroId),
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['getTeamIds'] })
         queryClient.invalidateQueries({ queryKey: ['getTeam'] })
      }
   })
}

export function useDeleteTeamMember() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationKey: ['deleteTeamMember'],
      mutationFn: (superheroId: string) => deleteTeamMember(superheroId),
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['getTeamIds'] })
         queryClient.invalidateQueries({ queryKey: ['getTeam'] })
      }
   })
}


export function useGetTeamIds() {
   return useQuery({
      queryKey: ['getTeamIds'],
      queryFn: () => getTeamIds()
   })
}

export function useGetBouts() {
   return useQuery({
      queryKey: ['runBouts'],
      queryFn: () => getTeamBouts(),
      staleTime: Infinity
   })
}