/**
 * PURPOSE:
 * Server Component that orchestrates the Navigation Bar.
 * Fetches the current authenticated user and their profile server-side,
 * then passes the profile to both desktop (Navbar) and mobile (NavbarMobile) client components.
 * Renders the appropriate bar based on viewport using hidden/block Tailwind utilities.
 *
 * CONTEXT/PARENT FILE:
 * Imported and rendered at the top of app/layout.tsx.
 */

import { getUser } from '@/app/actions/authentication/get/getUser'
import { getUserProfile } from '@/app/actions/profiles/get/getUserProfile'
import NavBar from './Navbar'
import NavbarMobile from './NavbarMobile'

const NavbarServer = async () => {
  const { data } = await getUser()
  const userId = data?.user?.id

  let profile = userId ? (await getUserProfile(userId)).data : null
  // console.log(profile)

  return (
    <>
      {/* Desktop — xl and above */}
      <div className="xl:block hidden">
        <NavBar initialUser={profile} />
      </div>
      {/* Mobile/Tablet — below xl */}
      <div className="xl:hidden block">
        <NavbarMobile initialUser={profile} />
      </div>
    </>
  )
}

export default NavbarServer
