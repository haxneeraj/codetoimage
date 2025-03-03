"use client";

import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname } from "next/navigation";

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [navItems, setNavItems] = useState([
      { name: "Home", href: "/", current: true },
  ]);
  const [isDark, setIsDark] = useState(() => {
      if (typeof document !== "undefined") {
        return localStorage.getItem("theme") === "dark";
      }
      return false;
  });
  
  useEffect(() => {
    setNavItems((prev) =>
      prev.map((item) => ({
        ...item,
        current: item.href === pathname,
      }))
    );
  }, [pathname]);  
  
  useEffect(() => {
    setMounted(true);
  }, []);
    
  useEffect(() => {
    if (isDark) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  
  function toggleDarkMode() {
      setIsDark((prev) => !prev);
  }

  useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
  window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);
      

  return (
    <Disclosure as="nav" className={classNames(
        "top-0 w-full z-50 transition-all duration-300 py-3 bg-white bg-white shadow-md dark:bg-gray-900 dark:shadow-lg", 
        scrolled ? "fixed" : ""
      )}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link href={item.href} key={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 dark:bg-gray-700 text-white' : 'text-gray-900 text-gray-900 dark:text-white hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Search Bar */}
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white dark:bg-gray-700 text-gray-700 dark:text-white px-3 py-1 rounded-md focus:ring-2 focus:ring-indigo-500 border border-gray-300 dark:border-gray-600"
              />
              <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative rounded-full bg-white dark:bg-gray-800 p-1 text-gray-400 hover:text-white border border-gray-800 dark:border-gray-600 focus:outline-none"
            >
                {mounted ? (
                    isDark ? (
                    <SunIcon className="w-6 h-6 text-yellow-500" />
                    ) : (
                    <MoonIcon className="w-6 h-6 text-gray-800" />
                    )
                ) : (
                    <MoonIcon className="w-6 h-6 text-gray-500" /> // Default for SSR
                )}
            </button>
            
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white">
                  <img
                    alt="User"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auhref=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 ring-1 shadow-lg">
                <MenuItem>
                  <Link key="/login" href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</Link>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItems.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
