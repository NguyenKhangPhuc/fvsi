/**
 * PURPOSE:
 * Server Component for the Single Event Detail route (/events/[id]).
 * Fetches single event data using getSingleEvent server action and renders SingleEventPage.
 * Follows layout structure of polar-spot with light design tokens.
 *
 * CONTEXT/PARENT FILE:
 * Route: 'app/events/[id]/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - params: Promise<{ id: string }>
 */

import React from 'react'
import { getSingleEvent } from '@/app/actions/events/get/getSingleEvent'
import SingleEventPage from './SingleEventPage'
import BackButton from '@/app/components/BackButton'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import { Metadata } from 'next'

interface SingleEventPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: SingleEventPageProps): Promise<Metadata> {
  const { id } = await params
  const { data: event } = await getSingleEvent(id)

  return {
    title: event?.title
      ? `${event.title} | VN–FI Collaboration`
      : 'Event Details | VN–FI Collaboration',
    description:
      event?.short_description ||
      'View event details, overview, schedule guidelines, and specifications.',
  }
}

export default async function Page({ params }: SingleEventPageProps) {
  const { id } = await params
  const { data: event, error } = await getSingleEvent(id)

  if (error || !event) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8fafc] flex items-center justify-center p-6">
        <div className="bg-white border border-red-200 rounded-xl p-8 max-w-md w-full text-center shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
            <ErrorOutlinedIcon sx={{ fontSize: 24 }} />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Event Not Found</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {typeof error === 'string'
                ? error
                : 'The event record you requested could not be located in the database.'}
            </p>
          </div>
          <div className="pt-2 flex justify-center">
            <BackButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8fafc] py-8 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto w-full">
        <SingleEventPage event={event} />
      </div>
    </div>
  )
}
