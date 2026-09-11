'use client';

/**
 * PURPOSE:
 * Renders the Basic Information form section for the Event Creation panel.
 * Contains input controls for Event Title, Max Members count, and Location.
 *
 * CONTEXT/PARENT FILE:
 * Sibling component of CreateEventClient.tsx, located at 'app/events/create/components/BasicInfoSection.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - register (UseFormRegister<EventInsert>, Required): react-hook-form register callback.
 * - errors (FieldErrors<EventInsert>, Required): react-hook-form errors validation map.
 */

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { EventInsert } from '@/app/types/event';
import { EventForm } from '../CreateEventClient';

interface BasicInfoSectionProps {
  register: UseFormRegister<EventForm>;
  errors: FieldErrors<EventForm>;
}

export default function BasicInfoSection({ register, errors }: BasicInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-slate-200">
      {/* Section description side */}
      <div className="lg:col-span-4 flex gap-3 select-none">
        <div className="w-1 h-5 bg-[#00c2b2] rounded-full shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Basic Information
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Define the primary title and venue or virtual meeting link.
          </p>
        </div>
      </div>

      {/* Section fields container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-8 flex flex-col gap-5 shadow-sm">
        {/* Event Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider select-none">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Bilateral AI & Edge Computing Symposium 2026"
            className="bg-slate-50 text-slate-900 border border-slate-200 text-sm p-3 rounded-lg outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/20 focus:bg-white transition-all w-full shadow-inner"
            {...register('title', { required: 'Event title is required' })}
          />
          {errors.title && (
            <span className="text-xs text-red-500 font-medium">
              {errors.title.message || 'Event title is required'}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider select-none">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. University of Oulu / Online Hub"
            className="bg-slate-50 text-slate-900 border border-slate-200 text-sm p-3 rounded-lg outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/20 focus:bg-white transition-all w-full shadow-inner"
            {...register('location', { required: 'Event location is required' })}
          />
          {errors.location && (
            <span className="text-xs text-red-500 font-medium">
              {errors.location.message || 'Location is required'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
