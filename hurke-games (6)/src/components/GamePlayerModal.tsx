import React, { useState } from 'react';
import { X, ExternalLink, Maximize2, RefreshCw, AlertCircle } from 'lucide-react';
import { GameItem } from '../data/games';

interface GamePlayerModalProps {
  game: GameItem | null;
  onClose: () => void;
}

export const GamePlayerModal: React.FC<GamePlayerModalProps> = ({
  game,
  onClose,
}) => {
  const [iframeKey, setIframeKey] = useState(0);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-950/90 backdrop-blur-md">
      <div 
        className="relative flex h-[92vh] w-full max-w-6xl flex-col rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar */}
        <div className="flex h-14 items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h2 className="font-heading text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{game.title}</span>
                <span className="font-mono text-xs font-normal text-neutral-400 hidden sm:inline">
                  ({game.genre})
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIframeKey(k => k + 1)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              title="Restart game session"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <a
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-colors"
            >
              <span>Play in New Tab</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-2"
              aria-label="Close game window"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Game Iframe Canvas */}
        <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
          <iframe
            key={iframeKey}
            src={game.url}
            title={`${game.title} interactive session`}
            allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
            className="h-full w-full border-0"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Bottom Hints & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 bg-neutral-900/60 px-4 sm:px-6 py-2.5 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-mono font-medium text-amber-400">Controls:</span>
            <span className="text-neutral-300">{game.controls}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
            <span>In development</span>
            <span className="text-neutral-600">/</span>
            <a
              href="mailto:hurkegames@gmail.com?subject=Hurke%20Games%20Feedback"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              Email suggestions: hurkegames@gmail.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
