/**
 * PURPOSE:
 * Client Component representing the Sign In portal.
 * Authenticates users via email/password or Github OAuth, manages verification triggers,
 * and renders a light themed login container.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/login/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

'use client'

import GitHubIconMui from "@mui/icons-material/GitHub"
import GoogleIcon from "@mui/icons-material/Google"
// import MicrosoftIcon from "@mui/icons-material/Microsoft"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { createClient } from "../utils/supabase/client"
import { login } from "../actions/authentication/post/login"
import { resendVerificationCode } from "../actions/authentication/post/resendVerificationCode"
import { useNotification } from "../context/NotificationContext"
import { useLoader } from "../context/LoaderContext"
import { useRouter } from "next/navigation"
import LoginSubInfoSection from "./LoginSubInfoSection"
import LoginMainInfoSection from "./LoginMainInfoSection"
import BackButton from "../components/BackButton"
import { AUTH_ERROR_CODE } from "../types/enum"
import { LoginForm } from "../types/form_data"

const Home = () => {
  const { showNotification } = useNotification()
  const supabase = createClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>()
  const { setIsOpenLoader } = useLoader()
  const router = useRouter()

  /**
   * BEHAVIORAL MECHANISM:
   * Initiates Github OAuth flow after validating Terms & Conditions acceptance.
   *
   * PARAMETERS:
   * None.
   *
   * RETURNS:
   * - Promise<void>
   */
  const handleLoginWithGithub = async (): Promise<void> => {
    const isAcceptedTerm = getValues("isTermAccepted")
    if (isAcceptedTerm) {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } else {
      showNotification("Please accept the terms conditions and privacy policy")
    }
  }

  /*
  const handleLoginWithMicrosoft = async (): Promise<void> => {
    const isAcceptedTerm = getValues("isTermAccepted")
    if (isAcceptedTerm) {
      await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: "email openid profile",
        },
      })
    } else {
      showNotification("Please accept the terms conditions and privacy policy")
    }
  }
  */

  /**
   * BEHAVIORAL MECHANISM:
   * Initiates Google OAuth flow after validating Terms & Conditions acceptance.
   *
   * PARAMETERS:
   * None.
   *
   * RETURNS:
   * - Promise<void>
   */
  const handleGoogleOauthLogin = async (): Promise<void> => {
    const isAcceptedTerm = getValues("isTermAccepted")
    if (isAcceptedTerm) {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } else {
      showNotification("Please accept the terms conditions and privacy policy")
    }
  }

  /**
   * BEHAVIORAL MECHANISM:
   * Triggers the user login server action and handles unverified email redirects.
   *
   * PARAMETERS:
   * - userInfo (LoginForm): Form payload containing email, password, and terms checkbox.
   *
   * RETURNS:
   * - Promise<void>
   */
  const onSubmit = async (userInfo: LoginForm): Promise<void> => {
    setIsOpenLoader(true)
    try {
      const { error } = await login(userInfo)
      if (error) {
        throw new Error(error)
      }
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        if (error.message === AUTH_ERROR_CODE.EMAIL_NOT_CONFIRMED) {
          try {
            await resendVerificationCode(userInfo.email, window.location.origin)
            showNotification("Please verify your email")
            router.push(`/sign-up/verify-account?email=${userInfo.email}`)
          } catch (error) {
            showNotification("Failed to send verification code")
          }
        } else if (error.message === AUTH_ERROR_CODE.INVALID_CREDENTIALS) {
          showNotification("Invalid credentials")
        } else {
          showNotification("Failed to login")
        }
      } else if (error instanceof Error && error.message === "NEXT_REDIRECT") {
        showNotification("Login successfully")
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
          {/* Header Title & Badge */}
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3 bg-teal-500 rounded-full" />
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Sign In
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500">Enter your credentials to access your account.</p>
          </div>

          {/* Form Inputs */}
          <LoginMainInfoSection register={register} errors={errors} />
          <LoginSubInfoSection register={register} errors={errors} />

          {/* Primary Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-[#00c2b2] text-white font-bold text-sm py-3.5 rounded-lg hover:bg-[#00b4a6] transition-all cursor-pointer shadow-sm"
          >
            Sign In
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