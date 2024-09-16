import { axiosbase } from "@/axiosConfig";

export async function getTeam() {
   return await axiosbase.get('/team/getTeam')
}

export async function addTeamMember(superheroId: string) {
   return await axiosbase.post('/team/add', { superheroId })
}

export async function deleteTeamMember(superheroId: string) {
   const params = {
      superheroId
   }
   return await axiosbase.delete('/team/delete', { params })
}

export async function getTeamIds() {
   return await axiosbase.get('/team/getTeamIds')
}

export async function getTeamBouts() {
   return await axiosbase.get('/team/runBouts')
}