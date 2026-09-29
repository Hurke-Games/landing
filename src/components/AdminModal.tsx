import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Code, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Settings, 
  FileCode, 
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { GameItem, generateFullStandaloneHtml, generateGameCardHtml } from '../data/games';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: GameItem[];
  onAddGame: (game: GameItem) => void;
  onDeleteGame: (id: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  games,
  onAddGame,
  onDeleteGame,
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'export' | 'snippets' | 'guide'>('add');

  // Form State for Add Game
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('https://hurke-games.github.io/');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('2D Arcade');
  const [releaseYear, setReleaseYear] = useState('2026');
  const [controls, setControls] = useState('Arrow keys / Mouse');
  const [platforms, setPlatforms] = useState('Desktop & Mobile');
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Copy States
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [copiedFullHtml, setCopiedFullHtml] = useState(false);
  const [copiedGuideSnippet, setCopiedGuideSnippet] = useState(false);

  if (!isOpen) return null;

  const fullHtml = generateFullStandaloneHtml(games);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Game title is required.');
      return;
    }
    if (!url.trim() || !url.startsWith('http')) {
      setFormError('Please enter a valid URL (starting with https:// or http://).');
      return;
    }
    if (!description.trim()) {
      setFormError('Please provide a short description.');
      return;
    }

    const newGame: GameItem = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      url: url.trim(),
      tagline: tagline.trim() || `${genre} web game`,
      description: description.trim(),
      genre: genre.trim() || 'Arcade',
      releaseYear: releaseYear.trim() || '2026',
      platforms: platforms.split(',').map((p) => p.trim()).filter(Boolean),
      controls: controls.trim() || 'Mouse / Keyboard',
      image: imageUrl.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      isCustom: true,
    };

    onAddGame(newGame);
    setTitle('');
    setUrl('https://hurke-games.github.io/');
    setTagline('');
    setDescription('');
    setImageUrl('');
    setFormError('');
    setFormSuccess(`Successfully added "${newGame.title}" to catalog!`);
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const handleCopySnippet = (id: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleCopyFullHtml = () => {
    navigator.clipboard.writeText(fullHtml);
    setCopiedFullHtml(true);
    setTimeout(() => setCopiedFullHtml(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  const sampleHtmlSnippet = `<!-- Add inside the <div class="grid"> container of your HTML -->
<article class="game-card">
  <div class="card-media">
    <img src="YOUR_GAME_SCREENSHOT.jpg" alt="Your Game Title" loading="lazy" />
    <span class="genre-tag">2D Arcade</span>
  </div>
  <div class="card-body">
    <div class="card-meta">
      <span>2D Arcade</span> · <span>2026</span> · <span>Desktop & Mobile</span>
    </div>
    <h3 class="card-title">Your Game Title</h3>
    <p class="card-desc">Description of your game mechanics and objectives.</p>
    <div class="card-controls">
      <strong>Controls:</strong> Space / Touch to jump, Click to interact
    </div>
    <div class="card-actions">
      <a href="https://hurke-games.github.io/YourGame/" target="_blank" rel="noopener noreferrer" class="btn-play">
        Play Your Game &rarr;
      </a>
    </div>
  </div>
</article>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl text-neutral-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Admin Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Settings className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                <span>Hurke Games Admin & HTML Tools</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Manager
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Add game links, export standalone HTML, and copy code snippets.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close admin modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/50 px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'add'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Game Link</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'export'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Export Standalone HTML</span>
          </button>

          <button
            onClick={() => setActiveTab('snippets')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'snippets'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Card HTML Snippets ({games.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Code Instructions</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-900/50">
          
          {/* TAB 1: ADD GAME LINK */}
          {activeTab === 'add' && (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h3 className="font-heading text-lg font-bold text-white">
                  Add a New Game Link
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Submitting this form adds the title directly into the playable catalog and saves it in your browser.
                </p>
              </div>

              {formSuccess && (
                <div className="mb-4 rounded-lg bg-emerald-950/60 border border-emerald-800 p-3 text-xs text-emerald-300 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {formError && (
                <div className="mb-4 rounded-lg bg-red-950/60 border border-red-800 p-3 text-xs text-red-300">
                  {formError}
                </div>
              )}

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Game Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Astro Dodger"
                      required
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Game URL (GitHub Pages) *
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://hurke-games.github.io/YourGame/"
                      required
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Genre
                    </label>
                    <input
                      type="text"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="2D Arcade"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Release Year
                    </label>
                    <input
                      type="text"
                      value={releaseYear}
                      onChange={(e) => setReleaseYear(e.target.value)}
                      placeholder="2026"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Platforms
                    </label>
                    <input
                      type="text"
                      value={platforms}
                      onChange={(e) => setPlatforms(e.target.value)}
                      placeholder="Desktop, Mobile"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Short punchy 1-sentence hook"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Description & Objectives *
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summary of gameplay mechanics, survival rules, and player goals..."
                    required
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Controls
                  </label>
                  <input
                    type="text"
                    value={controls}
                    onChange={(e) => setControls(e.target.value)}
                    placeholder="e.g. Arrow keys or Screen Tap to flap; Space to drop bombs"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Image / Screenshot URL (optional)
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://hurke-games.github.io/YourGame/cover.jpg"
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-mono text-xs"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-6 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg"
                  >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                    Add Game to Catalog
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: EXPORT STANDALONE HTML & CSS */}
          {activeTab === 'export' && (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <div>
                  <h3 className="font-heading text-sm font-bold text-white">
                    Pure Single-File HTML & CSS Document
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Contains the responsive layout, CSS, and all {games.length} game cards. No build steps required.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyFullHtml}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                  >
                    {copiedFullHtml ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied Complete Code!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy HTML File</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadHtml}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:text-white transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download index.html</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs text-neutral-300 overflow-auto max-h-[460px]">
                <pre>{fullHtml}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: CARD HTML SNIPPETS */}
          {activeTab === 'snippets' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Individual Game HTML Snippets
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Copy individual <code className="text-amber-300">&lt;article class="game-card"&gt;</code> blocks to insert into any HTML page.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {games.map((game) => {
                  const snippet = generateGameCardHtml(game);
                  const isCopied = copiedSnippetId === game.id;

                  return (
                    <div
                      key={game.id}
                      className="rounded-xl border border-neutral-800 bg-neutral-950 p-4"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-neutral-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-white text-sm">
                            {game.title}
                          </span>
                          <span className="font-mono text-xs text-neutral-400">
                            ({game.genre})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {game.isCustom && (
                            <button
                              onClick={() => onDeleteGame(game.id)}
                              className="text-xs text-red-400 hover:text-red-300 mr-2"
                            >
                              Delete
                            </button>
                          )}
                          <button
                            onClick={() => handleCopySnippet(game.id, snippet)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs font-mono text-neutral-200 hover:text-white transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy Card HTML</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <pre className="font-mono text-xs text-neutral-400 overflow-x-auto p-2 bg-neutral-900/60 rounded-lg">
                        {snippet}
                      </pre>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CODE INSTRUCTIONS */}
          {activeTab === 'guide' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  How to Update HTML Code with More Game Links
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Step-by-step instructions for adding links both in static HTML files and in this codebase.
                </p>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-4">
                <h4 className="font-heading font-semibold text-amber-400 text-sm">
                  1. In Pure HTML (<code className="text-white">index.html</code>)
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Inside your HTML file, find the <code className="text-amber-300">&lt;div class="grid"&gt;</code> element. Paste a new card article inside it:
                </p>
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-neutral-900 font-mono text-xs text-neutral-300 overflow-x-auto">
                    {sampleHtmlSnippet}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(sampleHtmlSnippet);
                      setCopiedGuideSnippet(true);
                      setTimeout(() => setCopiedGuideSnippet(false), 2000);
                    }}
                    className="absolute top-2 right-2 rounded bg-neutral-800 px-2.5 py-1 text-[11px] font-mono text-neutral-300 hover:text-white border border-neutral-700"
                  >
                    {copiedGuideSnippet ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
                <h4 className="font-heading font-semibold text-amber-400 text-sm">
                  2. In This React App Code (<code className="text-white">src/data/games.ts</code>)
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Open <code className="text-amber-300">src/data/games.ts</code> and add an object to <code className="text-amber-300">INITIAL_GAMES</code>:
                </p>
                <pre className="p-4 rounded-lg bg-neutral-900 font-mono text-xs text-neutral-300 overflow-x-auto">{`{
  id: 'my-game',
  title: 'My Game',
  url: 'https://hurke-games.github.io/MyGame/',
  tagline: 'Endless arcade action',
  description: 'Dodge obstacles and survive.',
  genre: 'Arcade',
  releaseYear: '2026',
  platforms: ['Desktop', 'Mobile'],
  controls: 'Space to jump',
  image: '/src/assets/images/my_game.svg'
}`}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-950 px-6 py-3 text-xs text-neutral-400">
          <span>Hurke Games Studio Manager</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-neutral-800 px-4 py-1.5 text-xs font-medium text-white hover:bg-neutral-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
