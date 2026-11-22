import React, { useState } from 'react';
import { 
  X, 
  Code, 
  Copy, 
  Check, 
  Download, 
  Settings, 
  Layers,
  BookOpen
} from 'lucide-react';
import { GameItem, generateFullStandaloneHtml, generateGameCardHtml } from '../data/games';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: GameItem[];
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  games,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'snippets' | 'export'>('guide');

  // Copy States
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [copiedFullHtml, setCopiedFullHtml] = useState(false);
  const [copiedGuideSnippet, setCopiedGuideSnippet] = useState(false);

  if (!isOpen) return null;

  const fullHtml = generateFullStandaloneHtml(games);

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
                <span>Hurke Games Developer & Code Tools</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Dev Manual
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Code instructions for adding games, standalone HTML export, and embed snippets.
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
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Adding Games in Code</span>
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
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-900/50">
          
          {/* TAB 1: CODE INSTRUCTIONS */}
          {activeTab === 'guide' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Manual Instructions: Adding Games to Hurke Games
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  All game links and details are managed securely directly in code files with no runtime backdoor.
                </p>
              </div>

              {/* Step 1: React App File */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
                <h4 className="font-heading font-semibold text-amber-400 text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 text-xs font-mono">1</span>
                  <span>In This Project: Edit <code className="text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded">src/data/games.ts</code></span>
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Open <code className="text-amber-300 font-mono">src/data/games.ts</code> and append a new game definition to the <code className="text-amber-300 font-mono">INITIAL_GAMES</code> array:
                </p>
                <pre className="p-4 rounded-lg bg-neutral-900 font-mono text-xs text-neutral-300 overflow-x-auto border border-neutral-800">{`{
  id: 'astro-dodger',
  title: 'Astro Dodger',
  url: 'https://hurke-games.github.io/AstroDodger/',
  tagline: 'Precision evasion in deep asteroid belts',
  description: 'Navigate your vessel through high-density kinetic hazards. Collect fuel cells and avoid gravity anomalies.',
  genre: '2D Arcade',
  releaseYear: '2026',
  platforms: ['Desktop', 'Mobile Web'],
  controls: 'Arrow Keys / Touch Drag to maneuver; Space for retro-thrusters',
  image: '/src/assets/images/astro_dodger_cover.jpg'
}`}</pre>
                <p className="text-[11px] text-neutral-400">
                  Tip: Put your cover screenshot in <code className="text-neutral-300 font-mono">src/assets/images/</code> and import it at the top of <code className="text-neutral-300 font-mono">src/data/games.ts</code>.
                </p>
              </div>

              {/* Step 2: Hosting the Game Repository on GitHub Pages */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-3">
                <h4 className="font-heading font-semibold text-amber-400 text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 text-xs font-mono">2</span>
                  <span>Hosting the Playable Game on GitHub</span>
                </h4>
                <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  <li>Create a new repository under your organization (e.g. <code className="text-amber-300 font-mono">github.com/hurke-games/YourGame</code>).</li>
                  <li>Push your game files with an <code className="text-white font-mono">index.html</code> entrypoint.</li>
                  <li>In the repository's <strong>Settings &rarr; Pages</strong>, enable GitHub Pages.</li>
                  <li>Your live game URL will be: <code className="text-amber-300 font-mono">https://hurke-games.github.io/YourGame/</code></li>
                </ul>
              </div>

              {/* Step 3: Pure HTML (If exporting or maintaining standalone static site) */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 space-y-4">
                <h4 className="font-heading font-semibold text-amber-400 text-sm flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 text-xs font-mono">3</span>
                  <span>Pure HTML / Standalone Export (<code className="text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded">index.html</code>)</span>
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  If using the standalone static HTML export, paste this snippet inside the <code className="text-amber-300 font-mono">&lt;div class="grid"&gt;</code> container:
                </p>
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-neutral-900 font-mono text-xs text-neutral-300 overflow-x-auto border border-neutral-800">
                    {sampleHtmlSnippet}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(sampleHtmlSnippet);
                      setCopiedGuideSnippet(true);
                      setTimeout(() => setCopiedGuideSnippet(false), 2000);
                    }}
                    className="absolute top-2 right-2 rounded bg-neutral-800 px-2.5 py-1 text-[11px] font-mono text-neutral-300 hover:text-white border border-neutral-700 active:scale-95 transition-transform"
                  >
                    {copiedGuideSnippet ? 'Copied!' : 'Copy Snippet'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CARD HTML SNIPPETS */}
          {activeTab === 'snippets' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Individual Game HTML Snippets
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Copy individual <code className="text-amber-300 font-mono">&lt;article class="game-card"&gt;</code> blocks to insert into any HTML page.
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

          {/* TAB 3: EXPORT STANDALONE HTML & CSS */}
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

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-950 px-6 py-3 text-xs text-neutral-400">
          <span>Hurke Games Developer Manual</span>
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
