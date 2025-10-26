import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

export const NavBar: React.FC = React.memo(() => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [quickMenuOpen, setQuickMenuOpen] = useState<boolean>(false);
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  const dropdownRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const quickMenuButtonRef = useRef<HTMLButtonElement | null>(null);

  // ✅ Handle click outside quick menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quickMenuOpen &&
        quickMenuButtonRef.current &&
        !quickMenuButtonRef.current.contains(event.target as Node)
      ) {
        setQuickMenuOpen(false);
      }
    };

    if (quickMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [quickMenuOpen]);

  // ... all your handlers (toggle menus, dropdowns, etc.)

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <div className="text-lg font-bold">MyApp</div>
      {/* Example Menu Button */}
      <button
        ref={quickMenuButtonRef}
        onClick={() => setQuickMenuOpen(!quickMenuOpen)}
        className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        Menu
      </button>
      {quickMenuOpen && (
        <div className="absolute top-12 right-4 bg-white shadow-lg rounded-lg p-3">
          <p>Quick actions here</p>
        </div>
      )}
    </nav>
  );
});