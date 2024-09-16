import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecommendations, getSuperheroDetails, getSuperheroes, setSuperheroDetails } from "../api/superhero";

export function useGetSuperheroes(page: number) {
   return useQuery({
      queryKey: ['getSuperheroes', page],
      queryFn: () => getSuperheroes(page)
   })
}

export function useGetSuperheroDetails(name: string) {
   return useQuery({
      queryKey: ['getSuperheroDetails', name],
      queryFn: () => getSuperheroDetails(name)
   })
}

export function useSetSuperheroDetails() {
   return useMutation({
      mutationFn: (data: any) => setSuperheroDetails(data),
      mutationKey: ['setSuperheroDetails']
   })
}

export function useGetRecommendations() {
   const queryClient = useQueryClient()

   const { data: recommendations, isLoading: recommendationsLoading, error } = useQuery({
      queryKey: ['getRecommendations'],
      queryFn: () => getRecommendations(),
      staleTime: Infinity
   })

   const useRecommendedHero = (heroId: string) => {
      const { data: currentRecommendations } = queryClient.getQueryData(['getRecommendations']) as any
      if (currentRecommendations) {
         const updatedRecommendations = currentRecommendations.filter((hero: any) => hero._id !== heroId)

         // If all recommendations have been used, refetch
         if (updatedRecommendations.length === 0) {
            queryClient.invalidateQueries({ queryKey: ['getRecommendations'] });
         }
      }
   }

   return { recommendations, recommendationsLoading, error, useRecommendedHero }
}