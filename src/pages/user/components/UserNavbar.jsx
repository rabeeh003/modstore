import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { Switch } from "@nextui-org/react";
import { Moon, MoonStar, SunMoon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight, setDark } from '../../../redux/Them.jsx';
import { NavLink, Outlet } from 'react-router-dom';

function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {currentThem} = useSelector((state) => state.them);
  const dispatch = useDispatch()

  const handleClick = () => {
    if (currentThem == 'dark') {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
  };

  const menuItems = [
    "Home",
    "Android",
    "windows",
    "News",
  ];

  return (
    <>
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <NavLink color="foreground" to={'/'}>
            Home
          </NavLink>
        </NavbarItem>
        <NavbarItem >
          <Link color="foreground" href="#" >
            Android
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Windows
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Switch
          isSelected={currentThem == 'dark' ? true : false }
          onClick={handleClick}
          size="lg"
          color="success"
          startContent={<SunMoon color='white' />}
          endContent={<MoonStar /> }
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
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                currentThem == 'dark' ? "background" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
    <Outlet/>
    </>
  );
}

export default UserNavbar