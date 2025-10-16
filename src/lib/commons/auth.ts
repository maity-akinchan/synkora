'use client';

import { redirect, RedirectType } from 'next/navigation'
import {getErrorMessage,
  SetErrorState,
  SetErrorMessage,
  Response as SignupResponse,
  postJson,
  LoginResponse,
  
} from "./requests";
import { setUserCookies } from '../utils/auth';
import { sanitizeUser } from '../utils/user';
import { User } from '@/generated/prisma';

/**
 * Handle login form submit. Calls callbacks to set error UI state.
 */
export async function onLogin(
  e: React.FormEvent<HTMLFormElement>,
  setErrorState: SetErrorState,
  setErrorMessage: SetErrorMessage,
) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const username = (formData.get('email') || '').toString().trim()
  const password = (formData.get('password') || '').toString()

  let errorState = 1
  let errorMessage = 'Unknown error'

  if (!username || !password) {
    errorMessage = 'Email and password are required'
    setErrorState(errorState)
    setErrorMessage(errorMessage)
    return
  }

  try {
    const { ok, data } = await postJson<LoginResponse>('/api/auth/login', { username, password })

    if (!ok) {
  errorMessage = (data && (data as LoginResponse).message) || 'Login failed'
    } else {
      const { success, token, user } = data as LoginResponse
      if (success && token && user) {
        errorMessage = 'Success'
        errorState = 0
      } else {
  errorMessage = 'Invalid response from server'
      }
    }
  } catch (err: unknown) {
    const msg = getErrorMessage(err)
    console.error('Login error:', msg)
    errorMessage = 'Server error'
  } finally {
    setErrorState(errorState)
    setErrorMessage(errorMessage)
    if (errorMessage === 'Success') {
      redirect('/dashboard', RedirectType.push)
    }
  }
}

/**
 * Handle signup form submit. Calls callbacks to set error UI state.
 */
export async function onSignup(
  e: React.FormEvent<HTMLFormElement>,
  setErrorState: SetErrorState,
  setErrorMessage: SetErrorMessage,
) {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const hashedPassword = (formData.get('password') || '').toString()
  const email = (formData.get('email') || '').toString().trim()
  const firstName = (formData.get('firstName') || '').toString()
  const lastName = (formData.get('lastName') || '').toString()
  const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()
  const username = email

  let errorState = 1
  let errorMessage = 'Unknown error'

  if (!email || !hashedPassword) {
    errorMessage = 'Email and password are required'
    setErrorState(errorState)
    setErrorMessage(errorMessage)
    return
  }

  try {
    const { ok, data } = await postJson<SignupResponse>('/api/user', { email, fullName, username, hashedPassword })

    if (!ok) {
      errorMessage = (data && (data as SignupResponse).message) || 'Signup failed'
    } else {
      const { success, id } = data as SignupResponse
      if (success && id) {
        errorMessage = 'Success'
        errorState = 0
      } else {
        errorMessage = 'Invalid response from server'
      }
    }
  } catch (err: unknown) {
    const msg = getErrorMessage(err)
    console.error('Signup error:', msg)
    errorMessage = 'Server error'
  } finally {
    setErrorState(errorState)
    setErrorMessage(errorMessage)
    if (errorMessage === 'Success') {
      redirect('/userinfo', RedirectType.push)
    }
  }
}