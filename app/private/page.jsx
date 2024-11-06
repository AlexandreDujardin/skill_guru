import { redirect } from 'next/navigation'

import Link from 'next/link';

import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mt-4 text-center">
        <p>Hello {data.user.email}</p>
      </div>


      <div className="mt-4 text-center">
        <Link href="/">
          <button
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-500 focus:outline-none"
          >
            Retour à l'accueil
          </button>
        </Link>
      </div>
    </div>
  )

}