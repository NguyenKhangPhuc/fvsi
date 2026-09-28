'use client'

/**
 * PURPOSE:
 * Interactive Client Component for the Memory Book Setup Tutorial.
 * Renders a responsive 7-step guide with progress tracking, multi-OS command blocks,
 * callout alerts, smooth Framer Motion transitions, and accessible Back/Next navigation.
 *
 * BREAKPOINTS & RESPONSIVENESS:
 * - Phone (~375px): Single column, compact stepper selector, full-width bottom controls.
 * - iPad/Tablet (~768-1024px): Scrollable stepper ribbon, expanded reading margins.
 * - Desktop (~1280px+): Standard max-w-[1280px] grid layout with horizontal step pills.
 *
 * THEME:
 * Adheres strictly to app/constants/design-tokens.ts and Tailwind v4 @theme inline.
 */

import { useState, useEffect, useCallback, useTransition } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import DownloadIcon from '@mui/icons-material/Download'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import LanguageIcon from '@mui/icons-material/Language'
import LaptopMacIcon from '@mui/icons-material/LaptopMac'
import ComputerIcon from '@mui/icons-material/Computer'
import TerminalIcon from '@mui/icons-material/Terminal'
import PsychologyIcon from '@mui/icons-material/Psychology'
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import CodeIcon from '@mui/icons-material/Code'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import CloseIcon from '@mui/icons-material/Close'
import BackButton from '@/app/components/BackButton'
import CommandLineBlock from './components/CommandLineBlock'
import CodeViewer from './components/CodeViewer'
import { TUTORIAL_STEPS, TutorialStep, CalloutItem } from './data/tutorialSteps'

export default function MemoryBookTutorialClient() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [activeOptionTab, setActiveOptionTab] = useState<Record<string, string>>({})
  const [showSolutionModal, setShowSolutionModal] = useState(false)
  const [unlockedSolutions, setUnlockedSolutions] = useState<Record<number, boolean>>({})
  const [activeCodeTab, setActiveCodeTab] = useState<Record<number, 'starter' | 'solution'>>({})
  const [, startTransition] = useTransition()

  const currentStep: TutorialStep = TUTORIAL_STEPS[currentStepIndex]
  const totalSteps = TUTORIAL_STEPS.length
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100)

  // Scroll to step content top when step changes
  const scrollToStepTop = () => {
    const el = document.getElementById('tutorial-content-anchor')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNext = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < totalSteps - 1) {
        return prev + 1
      }
      return prev
    })
    scrollToStepTop()
  }, [totalSteps])

  const handleBack = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev > 0) {
        return prev - 1
      }
      return prev
    })
    scrollToStepTop()
  }, [])

  const handleSelectStep = (index: number) => {
    startTransition(() => {
      setCurrentStepIndex(index)
    })
    scrollToStepTop()
  }

  const handleRequestSolution = (taskNumber: number) => {
    if (unlockedSolutions[taskNumber]) {
      setActiveCodeTab((prev) => ({ ...prev, [taskNumber]: 'solution' }))
    } else {
      setShowSolutionModal(true)
    }
  }

  const handleConfirmSolution = (taskNumber: number) => {
    setUnlockedSolutions((prev) => ({ ...prev, [taskNumber]: true }))
    setActiveCodeTab((prev) => ({ ...prev, [taskNumber]: 'solution' }))
    setShowSolutionModal(false)
  }

  const handleSelectStarter = (taskNumber: number) => {
    setActiveCodeTab((prev) => ({ ...prev, [taskNumber]: 'starter' }))
  }

  // Keyboard navigation: Left/Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      if (e.key === 'ArrowRight' && currentStepIndex < totalSteps - 1) {
        handleNext()
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        handleBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStepIndex, totalSteps, handleNext, handleBack])

  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 pb-20 select-none">
      {/* ── Background Matrix Grid ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg
          className="w-full h-full opacity-40 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="tutorial-grid-matrix"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#00a89d"
                strokeDasharray="3 5"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tutorial-grid-matrix)" />
          <circle cx="15%" cy="20%" r="340" fill="none" stroke="#00a89d" strokeWidth="1" opacity="0.25" />
          <circle
            cx="85%"
            cy="75%"
            r="420"
            fill="none"
            stroke="#008f85"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.2"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* ── Top Bar: Back & Category Badge ── */}
        <div className="mb-6 flex items-center justify-between">
          <BackButton />
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Interactive Setup Guide
          </span>
        </div>

        {/* ── Hero Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#f8fafc] border border-slate-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
                <span>Developer Tutorial</span>
                <span className="text-slate-300">•</span>
                <span className="text-teal-700">Next.js 16 + React 19 + Supabase</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Memory Book Development Setup
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Step-by-step instructions to configure your developer environment, clone the
                Memory Book repository, spin up local Supabase database containers via Docker, and launch
                the 3D flipbook application.
              </p>
            </div>

            {/* Quick Progress Indicator */}
            <div className="flex flex-col sm:items-end justify-center shrink-0 p-4 rounded-xl bg-[#f8fafc] border border-slate-200 min-w-[200px]">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Overall Progress
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {progressPercent}%
                </span>
                <span className="text-xs text-teal-700 font-semibold">
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                <motion.div
                  className="bg-[#4bbca9] h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Stepper Navigation Tabs ── */}
        <div className="mb-8" id="tutorial-content-anchor">
          {/* Desktop & Tablet: 2-Row Horizontal Stepper (8 on top, 7 on bottom, no scroll) */}
          <div className="hidden sm:flex flex-col gap-1.5 p-2 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
            {/* Row 1: Steps 1 - 8 (8 items) */}
            <div className="grid grid-cols-8 gap-1.5 w-full">
              {TUTORIAL_STEPS.slice(0, 8).map((step, idx) => {
                const isActive = idx === currentStepIndex
                const isPast = idx < currentStepIndex
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-center transition-all cursor-pointer w-full overflow-hidden ${
                      isActive
                        ? 'bg-teal-50 border border-teal-300 text-teal-950 font-bold shadow-xs'
                        : isPast
                        ? 'bg-slate-50/90 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircleIcon sx={{ fontSize: 15, color: '#00a89d', flexShrink: 0 }} />
                    ) : (
                      <span
                        className={`w-4.5 h-4.5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#4bbca9] text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold truncate leading-tight">
                      {step.shortTitle}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Row 2: Steps 9 - 15 (7 items) */}
            <div className="grid grid-cols-7 gap-1.5 w-full">
              {TUTORIAL_STEPS.slice(8, 15).map((step, localIdx) => {
                const idx = localIdx + 8
                const isActive = idx === currentStepIndex
                const isPast = idx < currentStepIndex
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl text-center transition-all cursor-pointer w-full overflow-hidden ${
                      isActive
                        ? 'bg-teal-50 border border-teal-300 text-teal-950 font-bold shadow-xs'
                        : isPast
                        ? 'bg-slate-50/90 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircleIcon sx={{ fontSize: 15, color: '#00a89d', flexShrink: 0 }} />
                    ) : (
                      <span
                        className={`w-4.5 h-4.5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#4bbca9] text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold truncate leading-tight">
                      {step.shortTitle}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile: Compact Step Selector Bar */}
          <div className="sm:hidden flex items-center justify-between gap-3 p-3 bg-white border border-slate-200/90 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#4bbca9] text-white flex items-center justify-center text-xs font-bold">
                {currentStep.stepNumber}
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 truncate max-w-[190px]">
                  {currentStep.shortTitle}
                </span>
                <span className="text-[10px] text-slate-500">
                  Step {currentStepIndex + 1} of {totalSteps}
                </span>
              </div>
            </div>

            <select
              aria-label="Jump to tutorial step"
              value={currentStepIndex}
              onChange={(e) => handleSelectStep(Number(e.target.value))}
              className="px-2.5 py-1.5 text-xs font-semibold bg-[#f8fafc] border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#4bbca9]"
            >
              {TUTORIAL_STEPS.map((s, i) => (
                <option key={s.id} value={i}>
                  Step {s.stepNumber}: {s.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Main Step Card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white border border-slate-200/90 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 mb-8"
          >
            {/* Step Card Header */}
            <div className="pb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 border border-teal-200 text-teal-800">
                    Step {currentStep.stepNumber} • {currentStep.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <AccessTimeIcon sx={{ fontSize: 14 }} />
                    <span>Est. {currentStep.estimatedTime}</span>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  {currentStep.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                  {currentStep.summary}
                </p>
              </div>
            </div>

            {/* Step Body: Either Coding Task View OR Standard Setup Sections */}
            {currentStep.codingTask ? (
              <div className="py-6 space-y-8">
                {/* 1. Target File & Origin Card */}
                <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target File:</span>
                    <code className="text-xs font-mono font-bold text-teal-800 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                      {currentStep.codingTask.file}
                    </code>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Invoked By:</span>
                    <code className="text-xs font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                      {currentStep.codingTask.usedBy}
                    </code>
                  </div>
                </div>

                {/* 2. Task Purpose & Business Context */}
                <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/70 border border-teal-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-slate-900">
                    <LightbulbIcon sx={{ fontSize: 20, color: '#00a89d' }} />
                    <span>Task Purpose & Architecture Overview</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentStep.codingTask.purpose}
                  </p>
                </div>

                {/* 3. Deep-Dive: Key Concepts & Variables Explanation */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <PsychologyIcon sx={{ fontSize: 20, color: '#00a89d' }} />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Why These Functions & Variables Exist (Architectural Deep-Dive)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Each variable, parameter, and function call in this task plays a specific role in data sanitization, server security, and frontend state synchronization:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {currentStep.codingTask.keyConcepts.map((concept, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-4 rounded-xl border border-slate-200 bg-[#f8fafc] shadow-xs space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <code className="font-mono text-xs font-bold text-teal-800 bg-white px-2 py-0.5 rounded border border-teal-200">
                              {concept.name}
                            </code>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                              {concept.role}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {concept.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Interactive Code View: Starter vs Solution with Modal Prompt */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                        <CodeIcon sx={{ fontSize: 20, color: '#00a89d' }} />
                        <span>Source Code Implementation</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Work on your task using the starter template below, or check the reference solution when you need guidance.
                      </p>
                    </div>

                    {/* Mode Switcher Tabs */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleSelectStarter(currentStep.codingTask!.taskNumber)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          (activeCodeTab[currentStep.codingTask.taskNumber] || 'starter') === 'starter'
                            ? 'bg-white text-slate-950 font-bold shadow-xs border border-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <CodeIcon sx={{ fontSize: 16 }} />
                        <span>Starter Code</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRequestSolution(currentStep.codingTask!.taskNumber)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          activeCodeTab[currentStep.codingTask.taskNumber] === 'solution'
                            ? 'bg-[#4bbca9] text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {unlockedSolutions[currentStep.codingTask.taskNumber] ? (
                          <LockOpenIcon sx={{ fontSize: 15 }} />
                        ) : (
                          <LockIcon sx={{ fontSize: 15 }} />
                        )}
                        <span>Solution</span>
                      </button>
                    </div>
                  </div>

                  {/* CodeViewer component */}
                  <CodeViewer
                    code={
                      activeCodeTab[currentStep.codingTask.taskNumber] === 'solution'
                        ? currentStep.codingTask.solutionCode
                        : currentStep.codingTask.starterCode
                    }
                    filename={currentStep.codingTask.file}
                    badge={
                      activeCodeTab[currentStep.codingTask.taskNumber] === 'solution'
                        ? 'Verified Solution'
                        : 'Your Starter Task'
                    }
                    isSolution={activeCodeTab[currentStep.codingTask.taskNumber] === 'solution'}
                  />

                  {/* If Solution is active: show the diff explanation */}
                  {activeCodeTab[currentStep.codingTask.taskNumber] === 'solution' && (
                    <div className="p-4 sm:p-5 rounded-xl bg-teal-50/80 border border-teal-200 text-teal-950 text-xs sm:text-sm space-y-1.5 shadow-xs">
                      <div className="flex items-center gap-2 font-bold text-teal-900">
                        <CheckCircleIcon sx={{ fontSize: 18, color: '#00a89d' }} />
                        <span>Solution Highlights & Analysis</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {currentStep.codingTask.solutionExplanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Standard Setup Step Sections */
              <div className="py-6 space-y-8">
                {currentStep.sections.map((section, sIdx) => {
                  const optKey = `${currentStep.id}-${sIdx}`
                  const selectedOptId =
                    section.options && section.options.length > 0
                      ? activeOptionTab[optKey] || section.options[0].id
                      : null
                  const currentOpt =
                    section.options && section.options.length > 0
                      ? section.options.find((o) => o.id === selectedOptId) || section.options[0]
                      : null

                return (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>{section.title}</span>
                    </h3>

                    {section.description && (
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {section.description}
                      </p>
                    )}

                    {/* Method Options Selector (e.g. Option A: Website vs Option B: CLI) */}
                    {section.options && section.options.length > 0 && (
                      <div className="pt-1">
                        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80 mb-4">
                          {section.options.map((opt) => {
                            const isSelected = opt.id === currentOpt?.id
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() =>
                                  setActiveOptionTab((prev) => ({
                                    ...prev,
                                    [optKey]: opt.id,
                                  }))
                                }
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-white text-slate-950 shadow-sm border border-slate-200/90 font-bold'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                                }`}
                              >
                                {opt.id === 'website' ? (
                                  <DownloadIcon sx={{ fontSize: 16, color: isSelected ? '#00a89d' : '#64748b' }} />
                                ) : (
                                  <TerminalIcon sx={{ fontSize: 16, color: isSelected ? '#00a89d' : '#64748b' }} />
                                )}
                                <span>{opt.title}</span>
                              </button>
                            )
                          })}
                        </div>

                        {/* Active Option Content */}
                        {currentOpt && (
                          <div className="space-y-3 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-100">
                              <span className="font-bold text-sm sm:text-base text-slate-900">
                                {currentOpt.title}
                              </span>
                              {currentOpt.badge && (
                                <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                                  {currentOpt.badge}
                                </span>
                              )}
                            </div>

                            {currentOpt.description && (
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {currentOpt.description}
                              </p>
                            )}

                            {/* Direct Download Banner if websiteUrl is available */}
                            {currentOpt.websiteUrl && (
                              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1 max-w-xl">
                                  <div className="flex items-center gap-2">
                                    <LanguageIcon sx={{ fontSize: 18, color: '#00a89d' }} />
                                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                                      Official Download Portal
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600">
                                    Download the installer package directly from the verified vendor portal.
                                  </p>
                                </div>
                                <a
                                  href={currentOpt.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#4bbca9] hover:bg-[#3ea694] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                                >
                                  <DownloadIcon sx={{ fontSize: 16 }} />
                                  <span>{currentOpt.websiteButtonText || 'Open Official Download Page'}</span>
                                  <OpenInNewIcon sx={{ fontSize: 14 }} />
                                </a>
                              </div>
                            )}

                            {/* Bullet points */}
                            {currentOpt.bulletPoints && currentOpt.bulletPoints.length > 0 && (
                              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-1">
                                {currentOpt.bulletPoints.map((pt, ptIdx) => (
                                  <li key={ptIdx} className="leading-relaxed">
                                    {pt}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Platform Guides */}
                            {currentOpt.platformGuides && currentOpt.platformGuides.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                                {currentOpt.platformGuides.map((pg, pgIdx) => (
                                  <div
                                    key={pgIdx}
                                    className="p-3.5 rounded-xl border border-slate-200 bg-[#f8fafc] flex flex-col justify-between"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between gap-2 mb-2">
                                        <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                                          {pg.os === 'macos' && (
                                            <LaptopMacIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                          )}
                                          {pg.os === 'windows' && (
                                            <ComputerIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                          )}
                                          {pg.os === 'linux' && (
                                            <TerminalIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                          )}
                                          {pg.platform}
                                        </span>
                                        {pg.badge && (
                                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/90 text-slate-700">
                                            {pg.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-slate-600 leading-relaxed">
                                        {pg.instructions}
                                      </p>
                                    </div>
                                    {pg.commands &&
                                      pg.commands.map((cmd, cIdx) => (
                                        <CommandLineBlock key={cIdx} snippet={cmd} />
                                      ))}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Option Commands */}
                            {currentOpt.commands && currentOpt.commands.length > 0 && (
                              <div className="space-y-3 pt-1">
                                {currentOpt.commands.map((cmd, cIdx) => (
                                  <CommandLineBlock key={cIdx} snippet={cmd} />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bullet points */}
                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 pl-1">
                        {section.bulletPoints.map((pt, ptIdx) => (
                          <li key={ptIdx} className="leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Commands */}
                    {section.commands && section.commands.length > 0 && (
                      <div className="space-y-3 pt-1">
                        {section.commands.map((cmd, cIdx) => (
                          <CommandLineBlock key={cIdx} snippet={cmd} />
                        ))}
                      </div>
                    )}

                    {/* Callout alerts */}
                    {section.callouts && section.callouts.length > 0 && (
                      <div className="space-y-3 pt-2">
                        {section.callouts.map((callout, coIdx) => (
                          <CalloutBox key={coIdx} callout={callout} />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            )}

            {/* ── Card Bottom Navigation Controls ── */}
            <div className="pt-6 border-t border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                aria-label="Go to previous step"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentStepIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200'
                    : 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                <span>Previous Step</span>
              </button>

              {/* Center status */}
              <div className="text-xs text-slate-500 font-medium text-center">
                <span className="hidden sm:inline">Use </span>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-100 border border-slate-300 rounded font-mono text-slate-700">
                  ←
                </kbd>{' '}
                and{' '}
                <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-100 border border-slate-300 rounded font-mono text-slate-700">
                  →
                </kbd>{' '}
                keys to navigate
              </div>

              {/* Next / Finish Button */}
              {currentStepIndex < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Go to next step"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#4bbca9] hover:bg-[#3ea694] transition-all shadow-md cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </button>
              ) : (
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#00a89d] hover:bg-[#008f85] transition-all shadow-md cursor-pointer"
                >
                  <KeyboardReturnIcon sx={{ fontSize: 18 }} />
                  <span>Finish & Return Home</span>
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Summary Checklist Card ── */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-md">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            Setup Checklist Summary
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Follow each milestone to ensure your local environment is configured without missing prerequisites:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TUTORIAL_STEPS.map((s, idx) => {
              const isDone = idx < currentStepIndex
              const isCurrent = idx === currentStepIndex
              return (
                <div
                  key={s.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                    isCurrent
                      ? 'bg-teal-50/70 border-teal-300 text-teal-950 font-medium'
                      : isDone
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-white border-slate-200/80 text-slate-500'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                      isDone
                        ? 'bg-[#00a89d] text-white'
                        : isCurrent
                        ? 'bg-[#4bbca9] text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : s.stepNumber}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 truncate">
                      {s.shortTitle}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {s.badge}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Solution Confirmation Modal ── */}
      <AnimatePresence>
        {showSolutionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative space-y-4"
            >
              <button
                type="button"
                onClick={() => setShowSolutionModal(false)}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg cursor-pointer"
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </button>

              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <PsychologyIcon sx={{ fontSize: 28 }} />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Are you sure you want to view the solution?
                </h3>
                <p className="text-xs text-teal-700 font-semibold italic">
                  Take a moment to give it another try before revealing the answer!
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Solving tasks independently helps you master Next.js Server Actions and database mutations. Would you like to think a bit more, or reveal the reference solution?
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowSolutionModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-all cursor-pointer"
                >
                  Keep Thinking
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleConfirmSolution(currentStep.codingTask?.taskNumber || 1)
                  }
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#4bbca9] hover:bg-[#3ea694] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Reveal Solution
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * ── Callout Box Helper ──
 */
function CalloutBox({ callout }: { callout: CalloutItem }) {
  const styles = {
    tip: {
      bg: 'bg-teal-50/80 border-teal-200 text-teal-950',
      icon: <TipsAndUpdatesIcon sx={{ fontSize: 18, color: '#00a89d' }} />,
    },
    info: {
      bg: 'bg-sky-50/80 border-sky-200 text-sky-950',
      icon: <InfoOutlinedIcon sx={{ fontSize: 18, color: '#0284c7' }} />,
    },
    warning: {
      bg: 'bg-amber-50/80 border-amber-200 text-amber-950',
      icon: <WarningAmberIcon sx={{ fontSize: 18, color: '#d97706' }} />,
    },
    important: {
      bg: 'bg-indigo-50/80 border-indigo-200 text-indigo-950',
      icon: <PriorityHighIcon sx={{ fontSize: 18, color: '#4f46e5' }} />,
    },
  }[callout.type]

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${styles.bg} text-xs sm:text-sm leading-relaxed`}
    >
      <div className="shrink-0 mt-0.5">{styles.icon}</div>
      <div className="space-y-1">
        <span className="font-bold block">{callout.title}</span>
        <p className="opacity-90">{callout.message}</p>
      </div>
    </div>
  )
}
