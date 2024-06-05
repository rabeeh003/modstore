import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { MoonStar, SunMoon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight, setDark } from '../../../redux/Them.jsx';
import { NavLink, Outlet } from 'react-router-dom';

function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentThem } = useSelector((state) => state.them);
  const dispatch = useDispatch()

  const handleClick = () => {
    if (currentThem == 'dark') {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
  };

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <NavLink to={'/'} className="font-bold text-inherit">Mod`Store</NavLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <NavLink color="foreground" to={'/'}>
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem >
            <NavLink color="foreground" to={'/android'} >
              Android
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to={'/windows'}>
              Windows
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to={'/blog'}>
              Blog
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Switch
            isSelected={currentThem == 'dark' ? true : false}
            onClick={handleClick}
            size="lg"
            color="success"
            startContent={<SunMoon color='white' />}
            endContent={<MoonStar />}
          >
          </Switch>
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem> */}
        </NavbarContent>
        <NavbarMenu className='bg-black-400 '>
          <NavLink to={'/'}>
            <NavbarMenuItem onChange={() => setIsMenuOpen(false)} className='bg-background text-foreground-900 bg-opacity-30 rounded-lg py-2'>
              <span
                color={"foreground"}
                className="w-[100%] px-3"
                size="lg"
              >
                Home
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink to={'/android'} >
            <NavbarMenuItem className='bg-background text-foreground-900 bg-opacity-30 rounded-lg py-2'>
              <span
                color={"foreground"}
                className="w-full px-3"
                size="lg"
              >
                Android
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink to={'/windows'}>
            <NavbarMenuItem className='bg-background text-foreground-900 bg-opacity-30 rounded-lg py-2'>
              <span
                color={"foreground"}
                className="w-full px-3"
                size="lg"
              >
                windows
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink to={'/blog'}>
            <NavbarMenuItem className='bg-background text-foreground-900 bg-opacity-30 rounded-lg py-2'>
              <span
                color={"foreground"}
                className="w-full px-3"
                size="lg"
              >
                blog
              </span>
            </NavbarMenuItem>
          </NavLink>
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </>
  );
}

export default UserNavbar