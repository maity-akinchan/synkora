'use client';

import { redirect, RedirectType } from 'next/navigation'

export async function onLogin(e: React.FormEvent<HTMLFormElement>, setErrorState : Function, setErrorMessage : Function, resetForm:  Function) {
  e.preventDefault();
  let errorState : number = 1;
  let errorMessage : string = 'und';
  const formData = new FormData(e.currentTarget);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  console.log(username, password)
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username": username, "password": password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      errorMessage = errorData.message || 'Login failed'
      errorState = 1
      resetForm();
    }

    const { success, token, user } = await res.json();

    if (success && token && user) {
      console.log('User logged in:', user);
      errorMessage = "Success"
      errorState = 0
    } else {
      errorMessage = "Server fault!"
      errorState = 1
      resetForm();
    }
  } catch (err: any) {
    console.log(err.message)
  } finally {
    setErrorState(errorState)
    setErrorMessage(errorMessage)
    if (errorMessage == "Success") {
      redirect("/dashboard", RedirectType.push)
    }
  }
}
export async function onSignup(e: React.FormEvent<HTMLFormElement>, setErrorState : Function, setErrorMessage : Function, resetForm: Function) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;

  let errorState : number = 1;
  let errorMessage : string = 'und';

  try {
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      errorMessage = errorData.message || 'Signup failed'
      errorState = 1
    }

    const { success, id } = await res.json();

    if (success && id) {
      errorMessage = "Success"
      errorState = 0
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err: any) {
    console.error('Signup error:', err.message);
    errorMessage = "Server fault!"
    errorState = 1
  } finally {
    setErrorState(errorState)
    setErrorMessage(errorMessage)
    if (errorMessage == "Success") {
      console.log("Redirecting..")
      resetForm();
    }
  }
}