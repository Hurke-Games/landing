import React, { useState } from 'react';
import { ExternalLink, Play, Trash2, HelpCircle } from 'lucide-react';
import { GameItem } from '../data/games';

interface GameCardProps {
  game: GameItem;
  onPlayGame: (game: GameItem) => void;
  onDelete?: (id: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onPlayGame,
  onDelete,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900 hover:shadow-2xl">
      
      {/* Card Visual / Media Slot */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
        {!imageError ? (
          <img
            src={game.image}
            alt={`${game.title} screenshot`}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-6 text-center">
            <span className="font-heading text-2xl font-black tracking-wider text-neutral-400 uppercase">
              {game.title}
            </span>
            <span className="mt-2 text-xs font-mono text-neutral-500">
              {game.genre}
            </span>
          </div>
        )}

        {/* Quiet genre indicator */}
        <div className="absolute top-3 right-3 rounded bg-neutral-950/80 px-2.5 py-1 text-xs font-semibold text-neutral-200 backdrop-blur-sm border border-neutral-800/80">
          {game.genre}
        </div>

        {/* Hover play action */}
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={() => onPlayGame(game)}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-xs font-bold text-neutral-950 shadow-xl hover:bg-amber-300 transition-transform active:scale-95"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Play</span>
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        
        {/* Unboxed Metadata Line */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
          <span className="text-amber-400/90 font-medium">{game.genre}</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>{game.releaseYear}</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span className="truncate">{game.platforms.join(' / ')}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
          {game.title}
        </h3>

        {/* Tagline */}
        <p className="mt-1 text-xs font-medium text-neutral-400">
          {game.tagline}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm text-neutral-300 leading-relaxed line-clamp-3">
          {game.description}
        </p>

        {/* Controls Scheme */}
        <div className="mt-4 rounded-lg border border-neutral-800/80 bg-neutral-950/60 p-3 text-xs text-neutral-300">
          <div className="flex items-center gap-1.5 text-neutral-400 font-medium mb-1">
            <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
            <span className="font-mono text-[11px] uppercase tracking-wide">Controls</span>
          </div>
          <p className="text-neutral-300 leading-snug">{game.controls}</p>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 flex items-center gap-2 pt-2 border-t border-neutral-800/60">
          {/* Direct Link to Game on GitHub Pages */}
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-100 py-2.5 px-4 text-xs font-bold text-neutral-950 hover:bg-white transition-colors active:scale-98"
          >
            <span>Play on GitHub Pages</span>
            <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
          </a>

          {/* In-window Play button */}
          <button
            onClick={() => onPlayGame(game)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-xs font-semibold text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
            title={`Play ${game.title} here`}
          >
            <Play className="h-3.5 w-3.5 text-amber-400 fill-current" />
            <span>Play</span>
          </button>

          {/* Delete button if custom */}
          {game.isCustom && onDelete && (
            <button
              onClick={() => onDelete(game.id)}
              className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
              title="Delete custom game"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

      </div>
    </article>
  );
};
