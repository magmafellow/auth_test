'use client'
 
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from '@/app/actions/auth'
 
export function SignupButton() {
  const { pending } = useFormStatus()
 
  return (
    <button className='bg-sky-300 p-2 rounded' aria-disabled={pending} type="submit">
      {pending ? 'Submitting...' : 'Sign up'}
    </button>
  )
}

export function SignupForm() {
  const [state, action] = useFormState(signup, undefined)
 
  return (
    <form className='text-center' action={action}>
      <div className='mb-4'>
        <label className='mr-2' htmlFor="name">Name</label>
        <input className='border p-0.5 border-black' id="name" name="username" placeholder="Name" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      
      <div className='mb-4'>
        <label className='mr-2' htmlFor="email">Email</label>
        <input className='border p-0.5 border-black' id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div className='mb-4'>
        <label className='mr-2' htmlFor="password">Password</label>
        <input className='border p-0.5 border-black' id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className='text-center'><SignupButton /></div>
      
    </form>
  )
}
