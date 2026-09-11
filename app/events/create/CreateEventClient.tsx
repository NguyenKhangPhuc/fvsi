'use client';

/**
 * PURPOSE:
 * Client Component coordinating event creation workflow.
 * Manages react-hook-form state handlers, calls the createEvent action,
 * dispatches notifications, manages global loader status, and redirects users to events management.
 *
 * CONTEXT/PARENT FILE:
 * Mounted in 'app/events/create/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import { createEvent } from '@/app/actions/events/post/createEvent';
import { useNotification } from '@/app/context/NotificationContext';
import { useLoader } from '@/app/context/LoaderContext';
import { EventInsert } from '@/app/types/event';
import { convertLocalToUTC } from '@/app/helpers/dateTime';
import BackButton from '@/app/components/BackButton';
import BasicInfoSection from './components/BasicInfoSection';
import ScheduleSection from './components/ScheduleSection';
import ContentSection from './components/ContentSection';
import { Database } from '@/app/types/database.types';

export interface EventForm {
  title?: string | null,
  short_description?: string | null,
  content?: string | null
  location?: string | null
  start_date?: string | null;
  status?: Database["public"]["Enums"]["EVENT_STATUS"] | null;
  created_at?: string;
  end_date?: string | null;
  id?: string;
}

export default function CreateEventClient() {
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
      title: '',
      short_description: '',
      content: '',
      location: '',
    },
  });

  /**
   * BEHAVIORAL MECHANISM:
   * Event submission callback handler. Converts local start and end dates
   * to UTC-0:0 ISO format, calls database insertions via createEvent server action,
   * triggers notifications, and redirects back to the events management dashboard.
   */
  const handleCreateNewEvent = async (event: EventInsert): Promise<void> => {
    setIsOpenLoader(true);
    try {
      const updatedEventPayload: EventInsert = {
        ...event,
        start_date: convertLocalToUTC(event.start_date),
        end_date: convertLocalToUTC(event.end_date),
      };

      const { data, error } = await createEvent({ event: updatedEventPayload });

      if (error) {
        throw new Error(typeof error === 'string' ? error : 'Failed to create new event.');
      }
      if (!data) {
        throw new Error('Failed to load newly created event.');
      }

      showNotification('Event created successfully.');
      router.push('/events-management');
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message);
      } else {
        showNotification('Failed to create new event.');
      }
    } finally {
      setIsOpenLoader(false);
    }
  };

  // Animation variants for sections fade-in entry
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
        <BackButton href="/events-management" label="Back to Events" />
      </div>

      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-1.5 h-14 bg-[#00c2b2] rounded-full shrink-0" />
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Create New Event
            </h1>
            <p className="text-sm text-slate-600">
              Fill in the event details, schedule timeline, and detailed description.
            </p>
          </div>
        </div>
      </div>

      {/* Forms Content */}
      <form onSubmit={handleSubmit(handleCreateNewEvent)} className="w-full flex flex-col gap-8 select-text">
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
            className="px-6 py-3 bg-[#00c2b2] hover:bg-[#00a89d] text-white text-xs uppercase font-bold tracking-widest rounded-lg cursor-pointer flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <AddIcon sx={{ fontSize: 18 }} />
            <span>Create Event</span>
          </button>
        </motion.div>
      </form>
    </div>
  );
}
