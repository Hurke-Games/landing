import React from 'react';
import { Gamepad2, Mail, Hammer } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-12 text-sm text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-neutral-800/80">
          
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

          {/* Development & Feedback Callout */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 max-w-md">
            <div className="flex items-start gap-3">
              <Hammer className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-semibold text-neutral-200">Games Under Active Development</span>
                <p className="text-neutral-400 mt-0.5 leading-relaxed">
                  These games are continuously evolved. Have an idea, suggestion, or bug report? Reach out at{' '}
                  <a
                    href="mailto:hurkegames@gmail.com?subject=Hurke%20Games%20Feedback%20%26%20Suggestions"
                    className="text-amber-400 font-semibold hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                  >
                    <span>hurkegames@gmail.com</span>
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Clean text navigation */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-neutral-400">
            <a href="#games" className="hover:text-white transition-colors">
              Playable Games
            </a>
            <a href="#game-details" className="hover:text-white transition-colors">
              Game Mechanics
            </a>
            <a
              href="mailto:hurkegames@gmail.com?subject=Hurke%20Games%20Feedback%20%26%20Suggestions"
              className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 text-neutral-300"
            >
              <Mail className="h-3.5 w-3.5 text-amber-400" />
              <span>Contact & Suggestions</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Hurke Games. All games and assets licensed to their respective authors.</p>
          <p className="font-mono text-[11px]">Feedback & suggestions welcome: hurkegames@gmail.com</p>
        </div>

      </div>
    </footer>
  );
};
