/**
 * PURPOSE:
 * Client Component representing the Sign Up portal.
 * Registers new user accounts, handles terms acceptance validation, triggers OAuth flow,
 * and renders a light themed sign-up form card.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/sign-up/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

'use client'

import { useState } from "react"
import HttpsIcon from "@mui/icons-material/Https"
import GitHubIconMui from "@mui/icons-material/GitHub"
import GoogleIcon from "@mui/icons-material/Google"
// import MicrosoftIcon from "@mui/icons-material/Microsoft"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import PersonIcon from "@mui/icons-material/Person"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useForm } from "react-hook-form"
import { createClient } from "../utils/supabase/client"
import { signup } from "../actions/authentication/post/signup"
import { useNotification } from "../context/NotificationContext"
import Link from "next/link"
import { useLoader } from "../context/LoaderContext"
import { useRouter } from "next/navigation"
import BackButton from "../components/BackButton"
import { AUTH_ERROR_CODE } from "../types/enum"
import { SignupForm } from "../types/form_data"

const Home = () => {
  const { showNotification } = useNotification()
  const supabase = createClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupForm>()
  const { setIsOpenLoader } = useLoader()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  /**
   * BEHAVIORAL MECHANISM:
   * Triggers user sign-up action and reports existing account warnings.
   *
   * PARAMETERS:
   * - signupInfo (SignupForm): Form values payload.
   *
   * RETURNS:
   * - Promise<void>
   */
  const onSubmit = async (signupInfo: SignupForm): Promise<void> => {
    setIsOpenLoader(true)
    try {
      const { error } = await signup(signupInfo, window.location.origin)
      if (error) {
        throw new Error(error)
      }
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        if (error.message === AUTH_ERROR_CODE.EXISTED_USER) {
          showNotification("User already existed")
        } else {
          showNotification("Fail to sign up")
        }
      } else if (error instanceof Error && error.message === "NEXT_REDIRECT") {
        showNotification("Sign up successfully, please verify your email")
      }
      setIsOpenLoader(false)
    }
  }

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
                Create Account
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Join us today
            </h1>
            <p className="text-sm text-slate-500">Fill in your details to create a new account.</p>
          </div>

          {/* Microsoft Verification Note */}
          <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700">
            <InfoOutlinedIcon sx={{ fontSize: 16 }} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed">
              If you are using a Microsoft account to sign up manually, the verification email code can arrive very late and may land in your junk folder.
            </p>
          </div>

          {/* Full Name Input */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Full Name</span>
              <span className="text-teal-600">*</span>
            </label>
            <div className="relative flex items-center w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all text-slate-900">
              <span className="pl-3 text-slate-400 flex items-center shrink-0">
                <PersonIcon fontSize="small" />
              </span>
              <input
                type="text"
                placeholder="Enter your Full Name"
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm p-3 outline-none border-none"
                {...register("fullName", {
                  required: "Full name is required",
                })}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Address Input */}
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
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
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
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between mt-1">
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
          <div className="flex flex-col mt-1">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-[#00c2b2] text-slate-950 font-bold text-sm py-3.5 rounded-lg hover:bg-[#00b4a6] transition-all cursor-pointer shadow-sm"
          >
            Sign Up
          </button>

          {/* Switch to Sign In */}
          <p className="text-center text-sm text-slate-500 mt-1">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-teal-700 font-semibold hover:underline transition-colors"
            >
              Sign In
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
                <span>Sign Up with Google</span>
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
              <span>Sign Up with Github</span>
            </div>

            {/*
            <div
              onClick={handleLoginWithMicrosoft}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-50 font-semibold text-sm py-3 rounded-lg transition-all cursor-pointer"
            >
              <MicrosoftIcon fontSize="small" />
              <span>Sign Up with Microsoft</span>
            </div>
            */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home