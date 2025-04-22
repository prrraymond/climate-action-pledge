'use client'

import React from 'react'

export default function LoginPage() {
  const handleTestLogin = () => {
    /* … */
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <form className="rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <div className="mb-4">{/* …inputs… */}</div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleTestLogin}
              className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
            >
              Test Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
