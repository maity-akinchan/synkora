'use client';

export async function onLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

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
      throw new Error(errorData.message || 'Login failed');
    }

    const { success, token, user } = await res.json();

    if (success && token && user) {
      console.log('User logged in:', user);
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err: any) {
    console.log(err.message)
  } finally {
    console.log("Login Successful!")
  }
}
export async function onSignup(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;

  try {
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    const { success, token, user } = await res.json();

    if (success && token && user) {
      console.log('User signed up and logged in:', user);
      // Optional: redirect to dashboard or show success message
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err: any) {
    console.error('Signup error:', err.message);
    // Optionally show error to user
  } finally {
    console.log('Done loading!');
  }
}