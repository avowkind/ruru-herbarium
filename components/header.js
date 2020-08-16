import Link from 'next/link'
import { useRouter } from 'next/router'

const MenuItem = ({ children, href, as }) => {
  const router = useRouter()
  const active = router.pathname === href
  const inactiveClass = 'block mt-4 inline-block rounded-md text-center bg-orange-200 hover:bg-orange-500 px-4 py-2 m-2 lg:mt-0 hover:text-white mr-4'
  const activeClass = 'block mt-4 inline-block rounded-md text-center bg-blue-200 hover:bg-blue-700 px-4 py-2 m-2 lg:mt-0 hover:text-white mr-4'
  return (
    <Link href={href} as={as || href}>
      <li className={active ? activeClass : inactiveClass}>
        <a className='no-underline hover:text-white'>{children}</a>
      </li>
    </Link>
  )
}

function Header ({ user, mutate }) {
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };
  return (
    <header className='bg-orange-300 sticky top-0'>
      <nav className='container mx-auto flex items-center justify-between flex-wrap  py-2 '>
        <Link href="/"> 
          <div id='Brand' className='text-3xl text-black-700'>
            Ruru House Herbarium
          </div>
        </Link>
        <ul className=' flex   '>
          <MenuItem href='/'>
              Home
          </MenuItem>
          <MenuItem href='/species'>Species</MenuItem>
          <MenuItem href='/logbook'>Log Book</MenuItem>
          <MenuItem href='/about'>About</MenuItem>
          
          {!user ? (
            <>
              <MenuItem href='/login'>Sign in</MenuItem>
              <MenuItem href='/signup'>Sign up</MenuItem>
            </>
          ) : (
            <>
              <MenuItem href='/user/[userId]' as={`/user/${user._id}`}>Profile</MenuItem>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className='block mt-4 inline-block rounded-md text-center bg-orange-200 hover:bg-orange-500 px-4 py-2 m-2 lg:mt-0 hover:text-white mr-4'
                tabIndex={0} role="button" onClick={handleLogout}>
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
