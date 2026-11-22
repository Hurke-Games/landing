import React, { useState } from 'react';
import { Gamepad2, Menu, X } from 'lucide-react';

interface NavbarProps {
  gameCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  gameCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Gamepad2 className="h-4 w-4" />
          </span>
          <span className="font-heading">Hurke Games</span>
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a href="#games" className="hover:text-white transition-colors">
            Games ({gameCount})
          </a>
          <a href="#game-details" className="hover:text-white transition-colors">
            About The Games
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex p-2 text-neutral-400 hover:text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-800 bg-neutral-950/95 px-4 pt-3 pb-5 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-neutral-300">
            <a 
              href="#games" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Playable Games ({gameCount})
            </a>
            <a 
              href="#game-details" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Game Analysis & Mechanics
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
