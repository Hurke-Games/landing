/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GameCard } from './components/GameCard';
import { GameDeepDive } from './components/GameDeepDive';
import { AdminModal } from './components/AdminModal';
import { GamePlayerModal } from './components/GamePlayerModal';
import { Footer } from './components/Footer';
import { INITIAL_GAMES, GameItem } from './data/games';
import { Sparkles } from 'lucide-react';

const STORAGE_KEY = 'hurke_games_catalog_v1';

// Helper to determine if current URL is targeting admin tools
function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path.endsWith('/admin') ||
    path === '/admin' ||
    hash === '#admin' ||
    search.includes('admin')
  );
}

export default function App() {
  const [games, setGames] = useState<GameItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge initial games so latest artwork/updates are preserved
          const customOnly = parsed.filter((item: GameItem) => item.isCustom);
          return [...INITIAL_GAMES, ...customOnly];
        }
      }
    } catch (e) {
      console.error('Failed to load saved games catalog:', e);
    }
    return INITIAL_GAMES;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'arcade' | 'strategy' | 'custom'>('all');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(() => checkIsAdminRoute());
  const [selectedGameForPlay, setSelectedGameForPlay] = useState<GameItem | null>(null);

  // Sync route changes & support Ctrl+Shift+A secret shortcut
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminRoute()) {
        setIsAdminModalOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret developer shortcut: Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = useCallback(() => {
    setIsAdminModalOpen(false);
    // If URL contains /admin or #admin, cleanly revert the address bar without reloading
    if (typeof window !== 'undefined' && checkIsAdminRoute()) {
      const cleanPath = window.location.pathname.replace(/\/admin\/?$/i, '') || '/landing/';
      const cleanSearch = window.location.search.replace(/[?&]admin(=[^&]*)?/i, '').replace(/^\?$/, '');
      const cleanHash = window.location.hash === '#admin' ? '' : window.location.hash;
      const targetUrl = (cleanPath.endsWith('/') ? cleanPath : cleanPath + '/') + cleanSearch + cleanHash;
      window.history.replaceState(null, '', targetUrl);
    }
  }, []);

  // Sync custom games to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    } catch (e) {
      console.error('Failed to persist games catalog:', e);
    }
  }, [games]);

  const handleAddGame = (newGame: GameItem) => {
    setGames((prev) => [newGame, ...prev]);
  };

  const handleDeleteGame = (id: string) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  // Filter logic
  const filteredGames = games.filter((game) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'arcade') return game.genre.toLowerCase().includes('arcade');
    if (activeFilter === 'strategy') return game.genre.toLowerCase().includes('strategy') || game.genre.toLowerCase().includes('sci-fi');
    if (activeFilter === 'custom') return game.isCustom;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* 2-Zone Clean Top Navigation */}
      <Navbar
        gameCount={games.length}
      />

      <main className="flex-1">
        {/* Studio Hero Section */}
        <Hero
          gameCount={games.length}
        />

        {/* Playable Games Showcase Grid */}
        <section id="games" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Playable Catalog</span>
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white">
                Featured Browser Games
              </h2>
              <p className="mt-1 text-sm text-neutral-400">
                Click any title to jump directly into the game on GitHub Pages or play in-window.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  All ({games.length})
                </button>
                <button
                  onClick={() => setActiveFilter('arcade')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeFilter === 'arcade'
                      ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  2D Arcade
                </button>
                <button
                  onClick={() => setActiveFilter('strategy')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeFilter === 'strategy'
                      ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Strategy
                </button>
                {games.some((g) => g.isCustom) && (
                  <button
                    onClick={() => setActiveFilter('custom')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeFilter === 'custom'
                        ? 'bg-neutral-800 text-amber-400 font-semibold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Custom Added
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlayGame={(g) => setSelectedGameForPlay(g)}
                onDelete={handleDeleteGame}
              />
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-12 text-center">
              <p className="text-neutral-400 text-sm">No games match this category.</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-3 text-xs text-amber-400 hover:underline"
              >
                Reset filter
              </button>
            </div>
          )}

        </section>

        {/* Detailed Game Breakdown & Analysis Section */}
        <GameDeepDive
          games={games}
          onPlayGame={(g) => setSelectedGameForPlay(g)}
        />
      </main>

      {/* Quiet Footer without visible admin links */}
      <Footer />

      {/* Consolidated Admin & HTML Tools Modal (accessible via /landing/admin or Ctrl+Shift+A) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={handleCloseAdmin}
        games={games}
        onAddGame={handleAddGame}
        onDeleteGame={handleDeleteGame}
      />

      {/* In-app Game Player Session */}
      <GamePlayerModal
        game={selectedGameForPlay}
        onClose={() => setSelectedGameForPlay(null)}
      />

    </div>
  );
}
