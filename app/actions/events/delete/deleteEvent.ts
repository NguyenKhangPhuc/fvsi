'use client'

/**
 * PURPOSE:
 * Creates a new event record with ONGOING status owned by the currently authenticated user.
 *
 * CONTEXT/PARENT FILE:
 * Extracted from app/actions/events.ts as part of decomposing server actions into per-file HTTP intent structure.
 *
 * INPUTS / PARAMETERS:
 * - params (Object, Required): Object containing event insert payload.
 *   - event (EventInsert, Required): Object containing title, description, content, location, dates, max_group_members.
 */

import { createClient } from '@/app/utils/supabase/client'
import { Event, EventInsert } from '@/app/types/event'
import { PostgrestError } from '@supabase/supabase-js'

/**
 * BEHAVIORAL MECHANISM:
 * Gets the current authenticated user ID, then inserts a new row into the 'events' table setting its status
 * to ONGOING and owner_id to the user ID. Returns the created event or error message on failure.
 *
 * PARAMETERS:
 * - { event }: Parameter object containing event (EventInsert).
 *
 * RETURN VALUE:
 * - Promise<{ data: Event | null, error: string | null }>: Object containing created event payload or error string.
 */
export async function deleteEventById({ eventId }: { eventId: String }) {
    const supabase = createClient();


    const { data, error }: { data: Event | null, error: PostgrestError | null } = await supabase.from("events").delete().eq('id', eventId)

    if (error) {
        return { error: "Fail to delete the event, please contact staffs" }
    }

    return { data, error: null }
}
