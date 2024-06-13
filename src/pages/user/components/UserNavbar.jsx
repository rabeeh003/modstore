import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { Switch } from '@nextui-org/react';
import { MoonStar, SunMoon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLight, setDark } from '../../../redux/Them.jsx';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const styles = {
  activeLink: {
    borderBottom: '3px solid #28a745',
    paddingBottom: '5px',
    fontWeight: 'bold',
  },
  navItem: {
    paddingBottom: '8px',
  },
  menuItem: {
    borderRadius: '8px',
    padding: '10px',
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0', // Light background for active state
    color: '#28a745', // Success color for text
  },
  menuItemActive: {
    backgroundColor: '#28a745', // Success color for background
    color: 'white',
  },
};

function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { currentThem } = useSelector((state) => state.them);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    if (currentThem === 'dark') {
      dispatch(setLight());
    } else {
      dispatch(setDark());
    }
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    console.log('NavbarMenuItem clicked');
  };

  const getMenuItemStyle = (path) =>
    location.pathname === path ? styles.menuItemActive : styles.menuItem;

  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
          <NavbarBrand>
            <NavLink to={'/'} className="font-bold text-2xl text-inherit">
              Modapps
            </NavLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem style={styles.navItem}>
            <NavLink
              to="/"
              className="text-md"
              style={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Home
            </NavLink>
          </NavbarItem>
          <NavbarItem style={styles.navItem}>
            <NavLink
              to="/android"
              className="text-md"
              style={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Android
            </NavLink>
          </NavbarItem>
          <NavbarItem style={styles.navItem}>
            <NavLink
              to="/windows"
              className="text-md"
              style={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Windows
            </NavLink>
          </NavbarItem>
          <NavbarItem style={styles.navItem}>
            <NavLink
              to="/blog"
              className="text-md"
              style={({ isActive }) => (isActive ? styles.activeLink : undefined)}
            >
              Blog
            </NavLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Switch
            isSelected={currentThem === 'dark'}
            onClick={handleClick}
            size="lg"
            color='default'
          
            startContent={<SunMoon color="white"  />}
            endContent={<MoonStar color='black'/>}
          />
        </NavbarContent>
        <NavbarMenu className="bg-black-400">
          <NavLink to="/">
            <NavbarMenuItem
              onClick={handleMenuItemClick}
              className="bg-background dark:text-white text-foreground-900 bg-opacity-30 rounded-lg py-2"
              style={getMenuItemStyle('/')}
            >
              <span className="w-[100%] px-3" size="lg">
                Home
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink to="/android">
            <NavbarMenuItem
              onClick={handleMenuItemClick}
              className="bg-background dark:text-white text-foreground-900 bg-opacity-30 rounded-lg py-2"
              style={getMenuItemStyle('/android')}
            >
              <span className="w-full px-3" size="lg">
                Android
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink to="/windows">
            <NavbarMenuItem
              onClick={handleMenuItemClick}
              className="bg-background dark:text-white text-foreground-900 bg-opacity-30 rounded-lg py-2"
              style={getMenuItemStyle('/windows')}
            >
              <span className="w-full px-3" size="lg">
                Windows
              </span>
            </NavbarMenuItem>
          </NavLink>
          <NavLink to="/blog">
            <NavbarMenuItem
              onClick={handleMenuItemClick}
              className="bg-background dark:text-white text-foreground-900 bg-opacity-30 rounded-lg py-2"
              style={getMenuItemStyle('/blog')}
            >
              <span className="w-full px-3" size="lg">
                Blog
              </span>
            </NavbarMenuItem>
          </NavLink>
        </NavbarMenu>
      </Navbar>
      <Outlet />
    </>
  );
}

export default UserNavbar;
