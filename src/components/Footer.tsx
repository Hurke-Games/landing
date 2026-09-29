import React from 'react';
import { Gamepad2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-12 text-sm text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-800/80">
          
          {/* Brand mark */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-white font-heading font-bold text-lg">
              <Gamepad2 className="h-5 w-5 text-amber-400" />
              <span>Hurke Games</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Independent game development collective building web-based arcade and strategy experiences on GitHub Pages.
            </p>
          </div>

          {/* Clean text navigation */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-400">
            <a href="#games" className="hover:text-white transition-colors">
              Playable Games
            </a>
            <a href="#game-details" className="hover:text-white transition-colors">
              Game Mechanics
            </a>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Hurke Games. All games and assets licensed to their respective authors.</p>
        </div>

      </div>
    </footer>
  );
};
