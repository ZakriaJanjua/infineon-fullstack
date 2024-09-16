import { axiosbase } from "@/axiosConfig";

export async function getSuperheroes(page: number) {
   const params = {
      page
   }
   return await axiosbase.get('/superhero/getSuperheroes', { params })
}

export async function getSuperheroDetails(name: string) {
   const params = {
      name
   }
   return await axiosbase.get('/superhero/getSuperheroDetails', { params })
}

export async function setSuperheroDetails(data: any) {
   return await axiosbase.patch('/superhero/setSuperheroDetails', { ...data })
}

export async function getRecommendations() {
   return await axiosbase.get('/superhero/recommendations')
}