'use client';

/**
 * PURPOSE:
 * Renders the Schedule & Logistics form section for the Event Creation panel.
 * Contains input controls for Start Date, End Date, and Organization Date & Time.
 *
 * CONTEXT/PARENT FILE:
 * Sibling component of CreateEventClient.tsx, located at 'app/events/create/components/ScheduleSection.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - register (UseFormRegister<EventInsert>, Required): react-hook-form register callback.
 * - errors (FieldErrors<EventInsert>, Required): react-hook-form errors validation map.
 */

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { EventInsert } from '@/app/types/event';
import { EventForm } from '../CreateEventClient';

interface ScheduleSectionProps {
  register: UseFormRegister<EventForm>;
  errors: FieldErrors<EventForm>;
}

export default function ScheduleSection({ register, errors }: ScheduleSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-slate-200">
      {/* Section description side */}
      <div className="lg:col-span-4 flex gap-3 select-none">
        <div className="w-1 h-5 bg-[#00c2b2] rounded-full shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Schedule & Logistics
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Configure the event start and end date & time in your local timezone.
          </p>
        </div>
      </div>

      {/* Section fields container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-sm">
        {/* Start Date & Time */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider select-none">
            Start Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            className="bg-slate-50 text-slate-900 border border-slate-200 text-sm p-3 rounded-lg outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/20 focus:bg-white transition-all w-full shadow-inner"
            {...register('start_date', { required: 'Start date and time is required' })}
          />
          {errors.start_date && (
            <span className="text-xs text-red-500 font-medium">
              {errors.start_date.message || 'Start date and time is required'}
            </span>
          )}
        </div>

        {/* End Date & Time */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider select-none">
            End Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            className="bg-slate-50 text-slate-900 border border-slate-200 text-sm p-3 rounded-lg outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/20 focus:bg-white transition-all w-full shadow-inner"
            {...register('end_date', { required: 'End date and time is required' })}
          />
          {errors.end_date && (
            <span className="text-xs text-red-500 font-medium">
              {errors.end_date.message || 'End date and time is required'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
