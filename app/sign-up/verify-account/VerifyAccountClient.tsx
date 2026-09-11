/**
 * PURPOSE:
 * Client Component for account OTP verification.
 * Receives email via props, accepts the user's OTP input, triggers account verification via server action,
 * and renders a light themed form card.
 *
 * CONTEXT/PARENT FILE:
 * Rendered by 'app/sign-up/verify-account/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - email (string, Required): User email passed from search parameters.
 */

'use client'

import { useForm } from "react-hook-form"
import HttpsIcon from "@mui/icons-material/Https"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { verifySignUpAccount } from "@/app/actions/profiles/post/verifySignUpAccount"
import { useLoader } from "@/app/context/LoaderContext"
import { useNotification } from "@/app/context/NotificationContext"
import { VerifyAccountForm } from "@/app/types/form_data"

export const VerifyAccount = ({ email }: { email: string }) => {
  const { showNotification } = useNotification()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyAccountForm>({
    defaultValues: {
      email,
    },
  })
  const { setIsOpenLoader } = useLoader()

  /**
   * BEHAVIORAL MECHANISM:
   * Submits OTP payload to server action for account verification.
   *
   * PARAMETERS:
   * - userInfo (VerifyAccountForm): Form data containing email and OTP string.
   *
   * RETURNS:
   * - Promise<void>
   */
  const onSubmit = async (userInfo: VerifyAccountForm): Promise<void> => {
    setIsOpenLoader(true)
    try {
      const { error } = await verifySignUpAccount(userInfo)
      if (error) {
        throw new Error(error)
      }
      setIsOpenLoader(false)
      showNotification("Verify successfully")
      router.push("/login")
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        showNotification(error.message)
      }
      setIsOpenLoader(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg flex flex-col gap-5 w-full"
    >
      {/* Header Title & Badge */}
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-3 bg-teal-500 rounded-full" />
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
            Verify Account
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Check your email
        </h1>
        <p className="text-sm text-slate-500">Enter the OTP code sent to your inbox to verify your account.</p>
      </div>

      {/* Disabled Email Input */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span>Target Email</span>
          <span className="text-slate-400 text-[10px]">(Locked)</span>
        </label>
        <div className="relative flex items-center w-full bg-slate-100 border border-slate-200 rounded-lg text-slate-500">
          <span className="pl-3 text-slate-400 flex items-center shrink-0">
            <AlternateEmailIcon fontSize="small" />
          </span>
          <input
            disabled
            type="text"
            placeholder="Enter your Email"
            className="w-full bg-transparent text-slate-500 placeholder-slate-400 text-sm p-3 outline-none border-none cursor-not-allowed"
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
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Received OTP Input */}
      <div className="flex flex-col">
        <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
          <span>Received OTP Code</span>
          <span className="text-teal-600">*</span>
        </label>
        <div className="relative flex items-center w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all text-slate-900">
          <span className="pl-3 text-slate-400 flex items-center shrink-0">
            <HttpsIcon fontSize="small" />
          </span>
          <input
            type="password"
            placeholder="Enter your Received OTP"
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm p-3 outline-none border-none"
            {...register("otp", {
              required: "OTP is required",
            })}
          />
        </div>
        {errors.otp && (
          <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 w-full bg-[#00c2b2] text-slate-950 font-bold text-sm py-3.5 rounded-lg hover:bg-[#00b4a6] transition-all cursor-pointer shadow-sm"
      >
        Verify your account
      </button>

      {/* Switch to Sign Up */}
      <p className="text-center text-sm text-slate-500 mt-1">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-teal-700 font-semibold hover:underline transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </form>
  )
}

export default VerifyAccount