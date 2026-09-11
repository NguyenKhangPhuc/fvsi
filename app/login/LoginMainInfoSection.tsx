/**
 * PURPOSE:
 * Renders the primary form input fields (Email and Password) for the Login portal,
 * styled using the light theme design system with focus ring transitions and error handling.
 *
 * CONTEXT/PARENT FILE:
 * Mounted inside 'app/login/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - register (UseFormRegister<LoginForm>, Required): React Hook Form register function.
 * - errors (FieldErrors<LoginForm>, Required): React Hook Form field validation errors object.
 */

import { useState } from 'react'
import HttpsIcon from '@mui/icons-material/Https'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { LoginForm } from '../types/form_data'

interface LoginMainInfoSectionProps {
  register: UseFormRegister<LoginForm>
  errors: FieldErrors<LoginForm>
}

const LoginMainInfoSection = ({ register, errors }: LoginMainInfoSectionProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <>
      {/* Email Input Field */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span>Email Address</span>
          <span className="text-teal-600">*</span>
        </label>
        <div className="relative flex items-center w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all text-slate-900">
          <span className="pl-3 text-slate-400 flex items-center shrink-0">
            <AlternateEmailIcon fontSize="small" />
          </span>
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm p-3 outline-none border-none"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid Email",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Input Field */}
      <div className="flex flex-col mt-4">
        <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span>Password</span>
          <span className="text-teal-600">*</span>
        </label>
        <div className="relative flex items-center w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all text-slate-900">
          <span className="pl-3 text-slate-400 flex items-center shrink-0">
            <HttpsIcon fontSize="small" />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm p-3 outline-none border-none"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must above 8 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="pr-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none flex items-center shrink-0 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
    </>
  )
}

export default LoginMainInfoSection