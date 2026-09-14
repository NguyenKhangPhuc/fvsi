/**
 * PURPOSE:
 * Server Component representing the Create Event page wrapper route (/events/create).
 * Mounts and renders the client-side CreateEventClient component.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/events/create/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

import CreateEventClient from './CreateEventClient';

export const metadata = {
  title: 'Create Event | FVSI',
  description: 'Create a new collaboration or academic event.',
};

export default function CreateEventPage() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8fafc] py-8 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto w-full">
        <CreateEventClient />
      </div>
    </div>
  );
}
