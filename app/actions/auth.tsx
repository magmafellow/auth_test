'use server'

import { createSession } from '@/app/lib/session'
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { cookies } from 'next/headers'
import { deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import pg from 'pg'

const { Pool } = pg
 
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'win7&',
  port: 5432,
  database: 'auth_test'

})
pool.query

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for insertion into database
  const { username, email, password } = validatedFields.data
 
  // 3. Insert the user into the database or call an Auth Library's API
  const data = await pool.query('INSERT INTO person (username, email, password) VALUES ($1, $2, $3)', [username, email, password])

  const r = await pool.query('SELECT * FROM person WHERE email = $1', [email])
  
  const user = r.rows[0]
  
  if(!user){
    return {
      message: 'An error occured while creating your account'
    }
  }

  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  redirect('/welcome')
  
  // Call the provider or db to create a user...
}

export async function logout() {
  deleteSession()
  redirect('/login')
}