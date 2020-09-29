import Link from 'next/link'
import { useRouter } from 'next/router'
const MenuItem = ({ children, href, as }) => {
  const router = useRouter()
  const active = router.pathname === href
  const inactiveClass = 'text-xl mx-2 px-2 inline-block align-bottom rounded-md text-center text-white hover:shadow-xl'
  const activeClass = 'text-xl mx-2 px-2 inline-block text-center font-extrabold border-b-4 border-green-500 text-white hover:shadow-xl hover:text-white'
  return (
    <Link href={href} as={as || href}>
      <li className={active ? activeClass : inactiveClass}>
        <a className='inline-block align-bottom no-underline hover:text-white'>{children}</a>
      </li>
    </Link>
  )
}
function Header ({ user, mutate }) {
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE'
    })
    mutate(null)
  }
  return (
    <header className='z-10 shadow sticky top-0'>
      <nav className='container mx-auto flex items-center justify-between flex-wrap  py-2 '>
        <Link href='/'>
          <div id='Brand' className='text-4xl text-white font-hairline '>
            <img className='h-10 mr-4 inline' src='/groat-small.svg' />
            Ruru House Herbarium
          </div>
        </Link>
        <ul className=' flex   '>
          {/* <MenuItem href='/'>Home</MenuItem> */}
          <MenuItem href='/plants'>Plants</MenuItem>

          {!user ? (
            <>
              <MenuItem href='/about'>About</MenuItem>
              <MenuItem href='/login'>Sign in</MenuItem>
              <MenuItem href='/signup'>Sign up</MenuItem>
            </>
          ) : (
            <>
              <MenuItem href='/species'>Species</MenuItem>
              <MenuItem href='/logbook'>Log Book</MenuItem>
              <MenuItem href='/user/[userId]' as={`/user/${user._id}`}>Profile</MenuItem>
              <MenuItem href='/about'>About</MenuItem>

              <a
                className='block mt-4 inline-block rounded-md text-center bg-orange-200 hover:bg-orange-500 px-4 py-2 m-2 lg:mt-0 hover:text-white mr-4'
                tabIndex={0} role='button' onClick={handleLogout}
              >
                Logout
              </a>
            </>
          )}

        </ul>
      </nav>

    </header>
  )
}

export default Header
