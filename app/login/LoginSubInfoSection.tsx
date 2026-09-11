/**
 * PURPOSE:
 * Renders the auxiliary form options (Remember me, Forgot password link, and Terms/Privacy checkboxes)
 * for the Login portal, styled with the light theme design system.
 *
 * CONTEXT/PARENT FILE:
 * Mounted inside 'app/login/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - register (UseFormRegister<LoginForm>, Required): React Hook Form register function.
 * - errors (FieldErrors<LoginForm>, Required): React Hook Form field validation errors object.
 */

import Link from "next/link"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { LoginForm } from "../types/form_data"

interface LoginSubInfoSectionProps {
  register: UseFormRegister<LoginForm>
  errors: FieldErrors<LoginForm>
}

const LoginSubInfoSection = ({ register, errors }: LoginSubInfoSectionProps) => {
  return (
    <>
      {/* Remember me & Forgot password link */}
      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 cursor-pointer accent-teal-600 rounded"
          />
          <span>Remember me</span>
        </label>
        <Link
          href="/forget-password"
          className="text-sm text-teal-700 font-semibold hover:underline transition-colors cursor-pointer"
        >
          Forgot password?
        </Link>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="flex flex-col mt-4">
        <div className="flex items-start space-x-2.5">
          <input
            type="checkbox"
            id="isTermAccepted"
            className="mt-0.5 h-3.5 w-3.5 cursor-pointer accent-teal-600 rounded shrink-0"
            {...register("isTermAccepted", {
              required: "You must accept the Terms and Privacy Policy to continue",
            })}
          />
          <label
            htmlFor="isTermAccepted"
            className="text-sm text-slate-600 cursor-pointer leading-relaxed"
          >
            I have read and agree to the{" "}
            <Link
              href="/terms-and-conditions"
              target="_blank"
              className="text-teal-700 font-semibold underline hover:text-teal-800 transition-colors"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-teal-700 font-semibold underline hover:text-teal-800 transition-colors"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {errors.isTermAccepted && (
          <p className="text-red-500 text-xs mt-1">
            {errors.isTermAccepted.message}
          </p>
        )}
      </div>
    </>
  )
}

export default LoginSubInfoSection