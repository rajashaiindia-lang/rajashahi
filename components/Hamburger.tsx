'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Hamburger() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const menuItems = [
    { label: 'Gallery', href: '/gallery', icon: '🖼️' },
    { label: 'About', href: '/about', icon: 'ℹ️' },
    { label: 'Admin Login', href: '/admin', icon: '🔐' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        className={`p-3 rounded-lg transition-all duration-300 ${
          open 
            ? 'bg-yellow-500/30 border-2 border-yellow-500' 
            : 'bg-gray-800/50 border-2 border-gray-700 hover:bg-yellow-500/20 hover:border-yellow-500/50'
        }`}
      >
        {/* Animated hamburger icon */}
        <div className="w-6 space-y-1.5">
          <div 
            className={`h-0.5 bg-yellow-400 transition-all duration-300 ${
              open ? 'rotate-45 translate-y-2' : ''
            }`} 
          />
          <div 
            className={`h-0.5 bg-yellow-400 transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`} 
          />
          <div 
            className={`h-0.5 bg-yellow-400 transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`} 
          />
        </div>
      </button>
      
      {/* Dropdown Menu */}
      {open && (
        <div className={`absolute right-0 mt-3 w-56 transition-all duration-300 ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-600/50 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
            {/* Menu Header */}
            <div className="bg-gradient-to-r from-[#7b0c2b] to-[#a01638] px-4 py-3 border-b-2 border-yellow-600/50">
              <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-wider">Menu</h3>
            </div>
            
            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-200 border-l-4 border-transparent hover:border-yellow-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Menu Footer */}
            <div className="bg-gray-900/50 px-4 py-2 border-t border-gray-700">
              <p className="text-xs text-gray-500 text-center">Rajashahi Chart</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}