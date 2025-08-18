"use client"

import React, { useState } from 'react';
import { onLogin, onSignup } from "@/lib/commons/auth"
export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-md w-full p-6 border rounded-lg shadow-md bg-[var(--muted)]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={(e) => {isLogin ? onLogin(e) : onSignup(e)}} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full p-3 border rounded bg-white text-black"
            />
          )}
          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded bg-white text-black"
            />
          )}
          <input
            type="text"
            name="username"
            placeholder="username"
            className="w-full p-3 border rounded bg-white text-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded bg-white text-black"
          />
          <button
            type="submit"
            className="w-full p-3 rounded bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-2 text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </main>
  );
}