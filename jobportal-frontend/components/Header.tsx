'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ showHeader }: { showHeader: boolean }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/';

  // Simulate logged-in user state (replace with auth context in production)
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  // Check for user on mount
  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  // Only render header if showHeader is true and not on auth pages
  if (!showHeader || isAuthPage) return null;

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Job Portal</h1>
      <div className="flex items-center space-x-4">
        {loggedInUser ? (
          <>
            <span className="text-sm">Welcome, {loggedInUser}</span>
            <Button
              variant="outline"
              onClick={() => {
                setLoggedInUser(null);
                sessionStorage.removeItem('loggedInUser');
                sessionStorage.removeItem('userRole');
                sessionStorage.removeItem('jwtToken');
                alert('Logged out');
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="outline" className="mr-2">
                Login
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}