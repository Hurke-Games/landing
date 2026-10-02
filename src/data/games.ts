/**
 * Hurke Games Catalog
 * To add a new game link manually in code:
 * Simply copy one of the objects below and append it to INITIAL_GAMES!
 */

import poopFlyImg from '../assets/images/poop_fly_screenshot.svg';
import galacticClashImg from '../assets/images/galactic_clash_screenshot.svg';
import fleetCommandImg from '../assets/images/fleet_command_screenshot_1790979237310.jpg';

export interface GameItem {
  id: string;
  title: string;
  url: string;
  tagline: string;
  description: string;
  detailedDescription?: string;
  genre: string;
  releaseYear: string;
  platforms: string[];
  controls: string;
  image: string;
  isCustom?: boolean;
}

export const INITIAL_GAMES: GameItem[] = [
  {
    id: 'fleet-command',
    title: 'Fleet Command',
    url: 'https://hurke-games.github.io/Fleet-Command/',
    tagline: 'Tactical Real-Time Space Conquest Across 50 Sectors',
    description: 'Command planetary sectors, deploy heavy cruisers, launch automated mining fleets, and orchestrate orbital assaults against rival AI commanders.',
    detailedDescription: 'A minimalist 2D real-time space conquest strategy game with procedural planetary sectors, continuous fleet routing, and adaptive AI commanders. Capture starbases like Aegis Prime, extract celestial ore, and coordinate tactical defensive swarms across a 50-sector campaign.',
    genre: 'Space RTS',
    releaseYear: '2026',
    platforms: ['Desktop Browser', 'Tablets', 'Mobile Web'],
    controls: 'Right-click or Drag to route fleets; 1-4 for Game Speed; Space to Pause; F for Fullscreen',
    image: fleetCommandImg,
  },
  {
    id: 'poop-fly',
    title: 'Poop Fly',
    url: 'https://hurke-games.github.io/PoopFly/',
    tagline: 'Procedural 2D Side-Scrolling Airborne Survival',
    description: 'Help the fly survive by feeding on food items, dodging environmental hazards, and dropping tactical poop bombs on enemies below.',
    detailedDescription: 'A procedurally generated 2D side-scrolling arcade reflex game. Guide your agile housefly across shifting airborne stages, maintaining stamina by eating while neutralizing pursuing pests and predators with precision aerial drops.',
    genre: '2D Arcade',
    releaseYear: '2026',
    platforms: ['Desktop', 'Mobile Touch', 'Keyboard / Tap'],
    controls: 'Space / Tap to flap wings & gain altitude; Key / Button to drop poop on enemies',
    image: poopFlyImg,
  },
  {
    id: 'galactic-clash',
    title: 'Galactic Clash',
    url: 'https://hurke-games.github.io/Galactic-Clash/',
    tagline: 'Real-Time Tactical Space Conquest & Orbital Defense',
    description: 'Tactical space strategy with randomized star systems, planetary infrastructure, orbital defenses, colony fleets, and AI factions.',
    detailedDescription: 'A real-time top-down tactical space conquest game. Establish orbital colonies, extract celestial resources, deploy defense platforms, and command interstellar fleets in tactical skirmishes to dominate the star cluster.',
    genre: 'Sci-Fi Strategy',
    releaseYear: '2026',
    platforms: ['Desktop Browser', 'Mouse / Trackpad'],
    controls: 'Left Click/Drag to select fleets, Right Click to navigate or target, Scroll to zoom starmap',
    image: galacticClashImg,
  },
];

/**
 * Generates clean, semantic HTML snippet for any game card
 */
export function generateGameCardHtml(game: GameItem): string {
  return `<!-- Game Card: ${game.title} -->
<article class="game-card">
  <div class="card-media">
    <img src="${game.image}" alt="${game.title} gameplay cover" loading="lazy" />
    <span class="genre-tag">${game.genre}</span>
  </div>
  <div class="card-body">
    <div class="card-meta">
      <span>${game.genre}</span>
      <span aria-hidden="true">·</span>
      <span>${game.releaseYear}</span>
      <span aria-hidden="true">·</span>
      <span>${game.platforms.join(' / ')}</span>
    </div>
    <h3 class="card-title">${game.title}</h3>
    <p class="card-desc">${game.description}</p>
    <div class="card-controls">
      <strong>Controls:</strong> ${game.controls}
    </div>
    <div class="card-actions">
      <a href="${game.url}" target="_blank" rel="noopener noreferrer" class="btn-play">
        Play ${game.title} &rarr;
      </a>
    </div>
  </div>
</article>`;
}

/**
 * Generates the full standalone pure HTML & CSS document
 */
export function generateFullStandaloneHtml(games: GameItem[]): string {
  const cardsHtml = games.map(g => generateGameCardHtml(g)).join('\n\n    ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hurke Games | Indie Web Games Studio</title>
  <meta name="description" content="Explore browser games by Hurke Games including Fleet Command, Poop Fly, and Galactic Clash.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* ==========================================================================
       Pure CSS - Responsive Landing Page for Hurke Games
       ========================================================================== */
    :root {
      --bg: #09090b;
      --card-bg: #121216;
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(255, 255, 255, 0.2);
      --text: #f4f4f5;
      --text-muted: #a1a1aa;
      --accent: #f59e0b;
      --accent-hover: #d97706;
      --font-display: 'Outfit', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* Layout */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Header */
    header {
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      background: rgba(9, 9, 11, 0.85);
      backdrop-filter: blur(12px);
      z-index: 50;
    }
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }
    .brand {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text);
      text-decoration: none;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      background: var(--accent);
      border-radius: 50%;
    }
    nav {
      display: flex;
      gap: 1.75rem;
    }
    nav a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.15s ease;
    }
    nav a:hover {
      color: var(--text);
    }

    /* Hero */
    .hero {
      padding: 5rem 0 3.5rem;
      border-bottom: 1px solid var(--border);
      background: radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.08), transparent 70%);
      text-align: center;
    }
    .hero-kicker {
      font-size: 0.85rem;
      color: var(--accent);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
    }
    .hero h1 {
      font-family: var(--font-display);
      font-size: clamp(2.25rem, 5vw, 3.75rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      max-width: 800px;
      margin: 0 auto 1.25rem;
      text-wrap: balance;
    }
    .hero p {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 620px;
      margin: 0 auto 2rem;
    }
    .hero-meta {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Games Grid */
    .section-games {
      padding: 4.5rem 0;
    }
    .section-header {
      margin-bottom: 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .section-title {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 700;
    }
    .section-subtitle {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-top: 0.25rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }

    /* Game Card */
    .game-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
    }
    .game-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-hover);
    }
    .card-media {
      position: relative;
      aspect-ratio: 16 / 9;
      background: #18181b;
      overflow: hidden;
    }
    .card-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .game-card:hover .card-media img {
      transform: scale(1.03);
    }
    .genre-tag {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #fff;
    }
    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 0.75rem;
    }
    .card-title {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .card-desc {
      color: var(--text-muted);
      font-size: 0.925rem;
      line-height: 1.55;
      margin-bottom: 1.25rem;
      flex: 1;
    }
    .card-controls {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      font-size: 0.8rem;
      color: #cbd5e1;
      margin-bottom: 1.5rem;
      line-height: 1.45;
    }
    .card-controls strong {
      color: #f1f5f9;
    }
    .card-actions {
      display: flex;
      gap: 0.75rem;
    }
    .btn-play {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem 1.25rem;
      background: var(--text);
      color: var(--bg);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: 8px;
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .btn-play:hover {
      background: #ffffff;
      transform: translateY(-1px);
    }

    /* Adding more games helper section */
    .helper-section {
      background: #101014;
      border: 1px dashed var(--border);
      border-radius: 12px;
      padding: 2.5rem 2rem;
      margin: 3rem 0;
    }
    .helper-section h2 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      margin-bottom: 0.75rem;
    }
    .helper-section p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }
    .code-block {
      background: #060608;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      font-family: var(--font-mono);
      font-size: 0.825rem;
      color: #a5b4fc;
      overflow-x: auto;
      white-space: pre;
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 3rem 0;
      text-align: center;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    footer a {
      color: var(--text);
      text-decoration: none;
    }
    footer a:hover {
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 640px) {
      nav { display: none; }
      .grid { grid-template-columns: 1fr; }
      .hero { padding: 3.5rem 0 2.5rem; }
    }
  </style>
</head>
<body>

  <!-- Top Navigation (3-Zone Contract) -->
  <header>
    <div class="container header-content">
      <a href="#" class="brand">
        <span class="brand-dot"></span>
        Hurke Games
      </a>
      <nav>
        <a href="#games">Games</a>
        <a href="https://github.com/hurke-games" target="_blank" rel="noopener">GitHub</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-kicker">Indie Browser Gaming</div>
      <h1>Direct Browser Games Ready to Play</h1>
      <p>Instant indie games built for web browsers. Click any title to play immediately with no install or sign-up needed.</p>
      <div class="hero-meta">
        <span>${games.length} Live Titles</span>
        <span aria-hidden="true">·</span>
        <span>Updated 2026</span>
      </div>
    </div>
  </section>

  <!-- Games Showcase -->
  <section id="games" class="section-games">
    <div class="container">
      <div class="section-header">
        <div>
          <h2 class="section-title">Playable Games</h2>
          <p class="section-subtitle">Select a game below to launch directly in your browser.</p>
        </div>
      </div>

      <div class="grid">
        ${cardsHtml}
      </div>

    </div>
  </section>

  <!-- Quiet Footer -->
  <footer>
    <div class="container">
      <p>&copy; 2026 Hurke Games. Independent game studio published on GitHub Pages.</p>
    </div>
  </footer>

</body>
</html>`;
}
