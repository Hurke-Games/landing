import React from 'react';
import { ArrowDown, Gamepad2, Sparkles } from 'lucide-react';
import heroImg from '../assets/images/hurke_games_hero_1790641592502.jpg';

interface HeroProps {
  gameCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  gameCount,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950">
      {/* Background with measured scrim */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <img
          src={heroImg}
          alt="Hurke Games Studio Atmosphere"
          className="h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 text-center">
        {/* Unboxed Kicker Metadata */}
        <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-wider uppercase text-amber-400 font-mono">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Indie Web Game Showcase</span>
        </div>

        {/* Hero Title with text-wrap balance */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
          Direct Browser Games. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400">
            Instant Play, Zero Install.
          </span>
        </h1>

        {/* Stylized Welcome */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-400/40" />
          <p className="text-lg sm:text-xl font-medium tracking-wide text-neutral-200">
            Welcome to <span className="font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-orange-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.3)]">Hurke Games</span>
          </p>
          <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-400/40" />
        </div>

        {/* Clean unboxed proof metadata */}
        <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-neutral-400 font-mono">
          <span className="text-neutral-200 font-medium">{gameCount} Playable Titles</span>
          <span aria-hidden="true" className="text-neutral-700">/</span>
          <span>100% Free on GitHub Pages</span>
        </div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#games"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-200 transition-colors shadow-lg active:scale-95"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Play Games</span>
            <ArrowDown className="h-4 w-4" />
          </a>

          <a
            href="#game-details"
            className="inline-flex items-center gap-2 rounded-lg bg-neutral-900/80 border border-neutral-800 px-6 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
          >
            About Mechanics
          </a>
        </div>
      </div>
    </section>
  );
};
