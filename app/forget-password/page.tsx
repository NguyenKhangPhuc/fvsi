/**
 * PURPOSE:
 * Client Component for requesting password reset OTP emails.
 * Sends reset password OTP to specified user email via Supabase Auth,
 * and renders a light themed form card.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/forget-password/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

'use client'

import GitHubIconMui from "@mui/icons-material/GitHub"
import GoogleIcon from "@mui/icons-material/Google"
// import MicrosoftIcon from "@mui/icons-material/Microsoft"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { createClient } from "../utils/supabase/client"
import { useNotification } from "../context/NotificationContext"
import { useRouter } from "next/navigation"
import { useLoader } from "../context/LoaderContext"
import BackButton from "../components/BackButton"
import { LoginForm } from "../types/form_data"

const Home = () => {
  const { showNotification } = useNotification()
  const supabase = createClient()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()
  const { setIsOpenLoader } = useLoader()

  /**
   * BEHAVIORAL MECHANISM:
   * Initiates Github OAuth flow.
   *
   * PARAMETERS:
   * None.
   *
   * RETURNS:
   * - Promise<void>
   */
  const handleLoginWithGithub = async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  /*
  const handleLoginWithMicrosoft = async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "email openid profile",
      },
    })
  }
  */

  /**
   * BEHAVIORAL MECHANISM:
   * Initiates Google OAuth flow.
   *
   * PARAMETERS:
   * None.
   *
   * RETURNS:
   * - Promise<void>
   */
  const handleGoogleOauthLogin = async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  /**
   * BEHAVIORAL MECHANISM:
   * Sends password reset OTP for target email address.
   *
   * PARAMETERS:
   * - userInfo (LoginForm): Form data payload containing target email.
   *
   * RETURNS:
   * - Promise<void>
   */
  const onSubmit = async (userInfo: LoginForm): Promise<void> => {
    setIsOpenLoader(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(userInfo.email)
      if (error) {
        throw new Error("Failed to send the verification code")
      }
      showNotification("Send OTP code successfully")
      setIsOpenLoader(false)
      router.push(`/reset-password?email=${userInfo.email}`)
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message)
      }
      setIsOpenLoader(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 py-12 select-none">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Top Navigation */}
        <BackButton />

        {/* Auth Form Container Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg flex flex-col gap-5"
        >
          {/* Back to Sign In Link */}
          <Link
            href="/login"
            className="flex text-sm text-slate-500 hover:text-teal-700 transition-colors items-center gap-2 cursor-pointer pb-4 border-b border-slate-100"
          >
            <ArrowBackIosNewIcon sx={{ fontSize: "12px" }} />
            <span>Back to sign in</span>
          </Link>

          {/* Header Title & Badge */}
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3 bg-teal-500 rounded-full" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Password Recovery
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Forgot your password?
            </h1>
            <p className="text-sm text-slate-500">Enter your email and we will send you a reset code.</p>
          </div>

          {/* Email Address Input */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Account Email</span>
              <span className="text-teal-600">*</span>
            </label>
            <div className="relative flex items-center w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all text-slate-900">
              <span className="pl-3 text-slate-400 flex items-center shrink-0">
                <AlternateEmailIcon fontSize="small" />
              </span>
              <input
                type="text"
                placeholder="Enter your registered email"
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
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-[#00c2b2] text-white font-bold text-sm py-3.5 rounded-lg hover:bg-[#00b4a6] transition-all cursor-pointer shadow-sm"
          >
            Send OTP
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

          {/* Divider */}
          <div className="flex items-center gap-4 my-1">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] text-slate-400 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-2.5">
            <div
              onClick={handleGoogleOauthLogin}
              className="w-full flex items-center justify-between px-4 bg-white border border-slate-200 text-slate-800 hover:border-teal-400 hover:bg-slate-50 font-semibold text-sm py-3 rounded-lg transition-all cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-3">
                <GoogleIcon fontSize="small" className="text-teal-600" />
                <span>Sign In with Google</span>
              </div>
              <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                Recommended
              </span>
            </div>

            <div
              onClick={handleLoginWithGithub}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50 font-semibold text-sm py-3 rounded-lg transition-all cursor-pointer"
            >
              <GitHubIconMui fontSize="small" className="text-slate-700" />
              <span>Sign In with Github</span>
            </div>

            {/*
            <div
              onClick={handleLoginWithMicrosoft}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50 font-semibold text-sm py-3 rounded-lg transition-all cursor-pointer"
            >
              <MicrosoftIcon fontSize="small" />
              <span>Sign In with Microsoft</span>
            </div>
            */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home