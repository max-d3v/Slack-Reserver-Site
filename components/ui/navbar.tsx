"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LockKeyhole, Menu, X } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { Profile } from './profileDropdown';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mouseNearTop, setMouseNearTop] = useState(false);

  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // navbar hider
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100 && !mouseNearTop) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e: any) => {
      if (e.clientY <= 80) {
        setMouseNearTop(true);
        setVisible(true);
      } else {
        setMouseNearTop(false);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, mouseNearTop]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex gap-4 items-center font-bold text-xl">
              <Image
                src="/images/butler_separated.png"
                width={50}
                height={50}
                alt="Butler Logo"
                className=' rounded-lg '
              />
              <span className="text-black">Reserver</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-black transition-colors px-2 py-1 text-sm font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-black transition-colors px-2 py-1 text-sm font-medium flex items-center gap-1"
              >
                <LockKeyhole className="h-4 w-4" />
                Privacy
              </Link>

              {session && !isLoading ?
                <Profile session_data={session} />
                :
                <Link
                  href="/signIn"
                  className="bg-[#4A154B] text-white hover:bg-[#3b113c] block px-3 py-2 rounded-md text-base font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              }
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-[#4A154B] focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ?
                <X className="h-6 w-6" /> :
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 border-t border-gray-100">
          <div className="flex flex-col space-y-4 pt-2 pb-3">
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-[#4A154B] block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-[#4A154B] block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LockKeyhole className="h-4 w-4" />
              Privacy
            </Link>

            {session && !isLoading ?
              <Profile session_data={session} />
              :
              <Link
                href="/signIn"
                className="bg-[#4A154B] text-white hover:bg-[#3b113c] block px-3 py-2 rounded-md text-base font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            }
          </div>
        </div>
      )}
    </nav>
  );
};