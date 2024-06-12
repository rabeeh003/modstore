import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { Switch } from "@nextui-org/react";
import { MoonStar, Plus, SunMoon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight, setDark } from '../../../redux/Them.jsx';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import CreatePost from './post/CreatePost.jsx';
import { setCleanAdmin } from '../../../redux/Admin.jsx';

function AdminNavbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentThem } = useSelector((state) => state.them);
  const dispatch = useDispatch()

  const [androidOpen, setAndroidOpen] = React.useState(false);
  const handleShowAndroid = () => {
    setAndroidOpen(true);
  };
  const handleCloseAndroid = () => {
    setAndroidOpen(false);
  };

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
            <NavLink to={'/admin'} className="font-bold text-inherit">Modapps Admin</NavLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <NavLink color="foreground" to={''}>
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem >
            <NavLink color="foreground" to={'post-list'} >
              Posts
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink color="foreground" to={'advertisement'}>
              Advertisement
            </NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Plus />
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
              <DropdownItem key="android" onClick={handleShowAndroid}>Android</DropdownItem>
              <DropdownItem key="windows" onClick={handleShowAndroid}>Windows</DropdownItem>
              <DropdownItem key="blog" onClick={()=>navigate("create-blog")}>Blog</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Switch
            isSelected={currentThem == 'dark' ? true : false}
            onClick={handleClick}
            size="lg"
            color="success"
            startContent={<SunMoon color='white' />}
            endContent={<MoonStar />}
          >
          </Switch>
          <NavbarItem className='hidden sm:flex'>
            <Button onClick={()=>dispatch(setCleanAdmin())} color="success" href="#" variant="flat">
              <span className='text-red-500' >Logout</span>
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className='bg-black-400 '>
          <NavLink to={'/admin'}>
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
          <NavLink to={'post-list'} >
            <NavbarMenuItem className='bg-background text-foreground-900 bg-opacity-30 rounded-lg py-2'>
              <span
                color={"foreground"}
                className="w-full px-3"
                size="lg"
              >
                Posts
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink to={'advertisement'}>
            <NavbarMenuItem className='bg-background text-foreground-900 bg-opacity-30 rounded-lg py-2'>
              <span
                color={"foreground"}
                className="w-full px-3"
                size="lg"
              >
                Advertisement
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink onClick={()=>dispatch(setCleanAdmin())}>
            <NavbarMenuItem className='bg-background text-foreground-900 bg-opacity-30 rounded-lg py-2'>
              <span
                className="w-full px-3 text-danger-500"
                size="lg"
              >
                Logout
              </span>
            </NavbarMenuItem>
          </NavLink>
        </NavbarMenu>
      </Navbar>

      <CreatePost name="Create Post" isOpen={androidOpen} onClose={handleCloseAndroid} />
      <Outlet />
    </>
  );
}

export default AdminNavbar