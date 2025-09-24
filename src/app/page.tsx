import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to dashboard to showcase MVP features
  redirect('/dashboard')
}
