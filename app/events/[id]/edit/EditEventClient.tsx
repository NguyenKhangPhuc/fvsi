'use client';

/**
 * PURPOSE:
 * Client Component coordinating event editing workflow.
 * Manages react-hook-form state handlers prefilled with existing event data,
 * calls updateEventInfo action, manages loader status, dispatches notifications,
 * and navigates back to event detail.
 *
 * CONTEXT/PARENT FILE:
 * Mounted in 'app/events/[id]/edit/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - event (Event, Required): The event database record being edited.
 */

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SaveIcon from '@mui/icons-material/Save';
import { updateEventInfo } from '@/app/actions/events/put/updateEventInfo';
import { useNotification } from '@/app/context/NotificationContext';
import { useLoader } from '@/app/context/LoaderContext';
import { Event, EventInsert } from '@/app/types/event';
import { convertLocalToUTC, convertUTCToLocalInput } from '@/app/helpers/dateTime';
import BackButton from '@/app/components/BackButton';
import BasicInfoSection from '@/app/events/create/components/BasicInfoSection';
import ScheduleSection from '@/app/events/create/components/ScheduleSection';
import ContentSection from '@/app/events/create/components/ContentSection';
import { EventForm } from '@/app/events/create/CreateEventClient';

interface EditEventClientProps {
  event: Event;
}

export default function EditEventClient({ event }: EditEventClientProps) {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { setIsOpenLoader } = useLoader();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventForm>({
    defaultValues: {
      title: event.title || '',
      short_description: event.short_description || '',
      content: event.content || '',
      location: event.location || '',
      start_date: convertUTCToLocalInput(event.start_date),
      end_date: convertUTCToLocalInput(event.end_date),
    },
  });

  const handleUpdateEvent = async (formData: EventForm): Promise<void> => {
    setIsOpenLoader(true);
    try {
      const updatedEventPayload: EventInsert = {
        id: event.id,
        title: formData.title,
        short_description: formData.short_description,
        content: formData.content,
        location: formData.location,
        start_date: convertLocalToUTC(formData.start_date),
        end_date: convertLocalToUTC(formData.end_date),
      };

      const { error } = await updateEventInfo({ event: updatedEventPayload });

      if (error) {
        throw new Error(typeof error === 'string' ? error : 'Failed to update event.');
      }

      showNotification('Event updated successfully.');
      router.push(`/events/${event.id}`);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message);
      } else {
        showNotification('Failed to update event.');
      }
    } finally {
      setIsOpenLoader(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: custom * 0.1 },
    }),
  };

  return (
    <div className="w-full flex flex-col gap-8 select-none">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <BackButton href={`/events/${event.id}`} label="Back to Event" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Edit Mode // ID: {event.id.slice(0, 8)}
        </span>
      </div>

      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-1.5 h-14 bg-[#4bbca9] rounded-full shrink-0" />
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Edit Event: {event.title || 'Untitled Event'}
            </h1>
            <p className="text-sm text-slate-600">
              Update event details, logistics timeline, and specification guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Forms Content */}
      <form onSubmit={handleSubmit(handleUpdateEvent)} className="w-full flex flex-col gap-8 select-text">
        {/* SECTION 1: BASIC INFO */}
        <BasicInfoSection register={register} errors={errors} />

        {/* SECTION 2: SCHEDULE & LOGISTICS */}
        <ScheduleSection register={register} errors={errors} />

        {/* SECTION 3: DESCRIPTION & RICH TEXT CONTENT */}
        <ContentSection register={register} control={control} errors={errors} />

        {/* Submit action block */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="flex justify-end select-none mt-2"
        >
          <button
            type="submit"
            className="px-6 py-3 bg-[#4bbca9] hover:bg-[#3ea694] text-white text-xs uppercase font-bold tracking-widest rounded-lg cursor-pointer flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <SaveIcon sx={{ fontSize: 18 }} />
            <span>Save Changes</span>
          </button>
        </motion.div>
      </form>
    </div>
  );
}
