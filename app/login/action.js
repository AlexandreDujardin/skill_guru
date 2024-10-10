'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/private')
}

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/private')
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  redirect('/login')
}


export async function loginWithGoogle() {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/')
  redirect('/private')
}