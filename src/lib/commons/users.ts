import { redirect, RedirectType } from 'next/navigation'

import {getErrorMessage,
  SetErrorState,
  SetErrorMessage,
  Response,
  putJson,  
} from "./requests";

export interface FormData {
  avatarUrl: string | null
  jobRole: string
  companyName: string
  dateOfBirth: Date | undefined
  bio: string
  teamName: string
  socialLinks: {
    linkedin: string
    github: string
    portfolio: string
  }
  skills: string[]
  referral: string 
  goals: string 
}

export async function onUserInfoSubmit(
  formData: FormData,
  setErrorState: SetErrorState,
  setErrorMessage: SetErrorMessage,
) {
  let errorState = 1;
  let errorMessage = 'Unknown error';
  
  try {
    const { ok, data } = await putJson<Response>(`/api/user?id=${2}`, {
      avatarUrl: formData.avatarUrl,
      jobRole: formData.jobRole,
      companyName: formData.companyName,
      dateOfBirth: formData.dateOfBirth,
      bio: formData.bio
    })

    if (!ok) {
      errorMessage = (data && (data as Response).message) || 'Signup failed'
    } else {
      const { success } = data as Response
      if (success) {
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
      redirect('/dashboard', RedirectType.push)
    }
  }
}