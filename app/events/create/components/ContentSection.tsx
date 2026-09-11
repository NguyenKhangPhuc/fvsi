'use client';

/**
 * PURPOSE:
 * Renders the Event Description & Content form section for the Event Creation panel.
 * Contains textarea input for Short Description (Abstract) and the theme-adapted RichTextEditor for Full Specification.
 *
 * CONTEXT/PARENT FILE:
 * Sibling component of CreateEventClient.tsx, located at 'app/events/create/components/ContentSection.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - register (UseFormRegister<EventInsert>, Required): react-hook-form register callback.
 * - control (Control<EventInsert>, Required): react-hook-form control object for Controller binding.
 * - errors (FieldErrors<EventInsert>, Required): react-hook-form errors validation map.
 */

import { UseFormRegister, Control, FieldErrors, Controller } from 'react-hook-form';
import { EventInsert } from '@/app/types/event';
import RichTextEditor from '@/app/components/RichTextEditor';

interface ContentSectionProps {
  register: UseFormRegister<EventInsert>;
  control: Control<EventInsert>;
  errors: FieldErrors<EventInsert>;
}

export default function ContentSection({ register, control, errors }: ContentSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-slate-200">
      {/* Section description side */}
      <div className="lg:col-span-4 flex gap-3 select-none">
        <div className="w-1 h-5 bg-[#00c2b2] rounded-full shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Event Content
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Provide a short summary for card indexing and write rich technical descriptions, agendas, and guidelines.
          </p>
        </div>
      </div>

      {/* Section fields container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-8 flex flex-col gap-6 shadow-sm">
        {/* Abstract / Short description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider select-none">
            Short Description (Abstract) <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Brief summary displayed on the event overview and preview cards..."
            rows={3}
            className="bg-slate-50 text-slate-900 border border-slate-200 text-sm p-3 rounded-lg outline-none focus:border-[#00c2b2] focus:ring-2 focus:ring-[#00c2b2]/20 focus:bg-white transition-all w-full resize-none shadow-inner"
            {...register('short_description', { required: 'Short description is required' })}
          />
          {errors.short_description && (
            <span className="text-xs text-red-500 font-medium">
              {errors.short_description.message || 'Short description is required'}
            </span>
          )}
        </div>

        {/* Rich Text Editor */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider select-none">
            Detailed Description
          </label>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value || ''}
                onChange={field.onChange}
                placeholder="Write full event program, keynote speakers, prerequisites, schedule rules, guidelines..."
                className="min-h-[300px]"
              />
            )}
          />
          {errors.content && (
            <span className="text-xs text-red-500 font-medium">
              {errors.content.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
