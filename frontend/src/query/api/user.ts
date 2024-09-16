import { axiosbase } from "@/axiosConfig";

export async function getUser() {
   return await axiosbase.get('/user/who')
}