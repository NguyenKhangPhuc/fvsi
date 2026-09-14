import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "./app/utils/supabase/proxy"
import { adminRouteProxy } from "./app/middleware/admin-route"
import { createEventRoute } from "./app/middleware/create-event"
import { editEventRoute } from "./app/middleware/edit-event"



export async function proxy(request: NextRequest) {

    // 2. Session refresh + shared Supabase client.
    //    updateSession creates the client ONCE and handles auth redirects.
    //    All downstream handlers receive this same client — no re-instantiation.
    const { supabaseResponse, supabase } = await updateSession(request)
    if (supabaseResponse.status !== 200) return supabaseResponse

    // 3. Resolve the authenticated user ONCE using the shared client.
    //    getUser() makes a single network call to Supabase Auth.
    const { data: { user } } = await supabase.auth.getUser()

    // 4. Path-based dispatch.
    //    Each branch only invokes handlers whose route patterns could possibly match,
    //    eliminating the prior sequential await-waterfall across all 13 handlers.
    const pathname = request.nextUrl.pathname

    if (pathname.startsWith('/events/')) {
        // All /events/:id/* sub-routes and /events/create live here.
        const createResult = await createEventRoute({ request, user, supabase })
        if (createResult.status !== 200) return createResult

        const editResult = await editEventRoute({ request, user, supabase })
        if (editResult.status !== 200) return editResult

    } else if (
        pathname.startsWith('/user-management') ||
        pathname.startsWith('/group-management') ||
        pathname.startsWith('/events-management')
    ) {
        const result = await adminRouteProxy({ request, user, supabase })
        if (result.status !== 200) return result
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}