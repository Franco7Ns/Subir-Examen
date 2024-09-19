'use client';
 
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
 
export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction}>
      <div>
        <h1>
          Please log in to continue.
        </h1>
        <div >
          <div>
            <label
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
            >
              Password
            </label>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <button >
          Log in 
        </button>
        <div
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}