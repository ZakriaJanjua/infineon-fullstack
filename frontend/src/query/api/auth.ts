import { axiosbase } from "@/axiosConfig";

export async function signUp({ email, password }: { email: string, password: string }) {
   const body = {
      email,
      password
   }
   return await axiosbase.post('/auth/signUp', { ...body })
}

export async function signIn({ email, password }: { email: string, password: string }) {
   const body = {
      email,
      password
   }
   return await axiosbase.post('/auth/signIn', { ...body })
}

