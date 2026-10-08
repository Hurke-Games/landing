import React from 'react';
import { ExternalLink, Play, Sparkles, Crosshair, Compass, Shield, Zap, Radio, Map, Activity, Hammer } from 'lucide-react';
import { GameItem } from '../data/games';

interface GameDeepDiveProps {
  games: GameItem[];
  onPlayGame: (game: GameItem) => void;
}

export const GameDeepDive: React.FC<GameDeepDiveProps> = ({
  games,
  onPlayGame,
}) => {
  const zombieSurvivor = games.find((g) => g.id === 'zombie-survivor');
  const tankWars = games.find((g) => g.id === 'tank-wars');
  const fleetCommand = games.find((g) => g.id === 'fleet-command');
  const galacticClash = games.find((g) => g.id === 'galactic-clash');
  const poopFly = games.find((g) => g.id === 'poop-fly');

  return (
    <section id="game-details" className="border-t border-neutral-800 bg-neutral-950/70 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>In-Depth Game Breakdown</span>
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            Behind The Code & Gameplay
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            Detailed breakdown of Hurke Games' featured titles, their mechanics, procedural generation, and control schemas.
          </p>
        </div>

        {/* Featured Breakdowns: Responsive Grid for 5 Games */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Game 1: Zombie Survivor */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="text-red-400 font-semibold">01. TACTICAL SURVIVAL SIM</span>
                <span>GITHUB PAGES</span>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-white">
                Zombie Survivor
              </h3>
              
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                An intense top-down apocalypse survival simulation set in Knox County. Fortify safehouses, manage calorie & hydration meters, and survive dynamic horde migrations.
              </p>

              {/* Core Mechanics List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    <Hammer className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Safehouse Barricades & Workbenches:</strong>
                    Craft barricades, chests, and equipment rigs to reinforce your perimeter against nightfall horde incursions.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    <Activity className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Calorie & Hydration Survival Loop:</strong>
                    Monitor vital food [U] and water [Y] reserves, scavenging suburban kitchens while avoiding infected danger zones.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-red-500/10 text-red-400 border border-red-500/20">
                    <Radio className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Overseer AI & God-View Telemetry:</strong>
                    Satellite surveillance feed tracks regional weather, municipal grid states, and daylight vs. night horde activity phases.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col gap-3">
              <span className="font-mono text-xs text-neutral-400">
                Desktop Keyboard & Mouse / Mobile Web
              </span>
              {zombieSurvivor && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlayGame(zombieSurvivor)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Play className="h-3 w-3 text-amber-400 fill-current" />
                    <span>Play</span>
                  </button>
                  <a
                    href={zombieSurvivor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Game 2: Tank Wars */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="text-emerald-400 font-semibold">02. 32-BIT TURN-BASED TACTICS</span>
                <span>GITHUB PAGES</span>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-white">
                Tank Wars: Advance Grid
              </h3>
              
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                A 32-bit GBA style turn-based tactical strategy game. Maneuver armor battalions across hex grids, capture cities for production, and wage supply-line warfare.
              </p>

              {/* Core Mechanics List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Supply Lines & City Conquest:</strong>
                    Occupy neutral towns and headquarters to extract industrial production and keep armor garrisons supplied and combat-ready.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Map className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Tactical Radar & Topography:</strong>
                    Navigate natural chokepoints and water barriers with an active 35x35 tactical radar overview monitoring enemy movements.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Crosshair className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Custom Scenario Workshop:</strong>
                    Create customized battlefields, adjust commander doctrines, and test tactical strategies against reactive AI commanders.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col gap-3">
              <span className="font-mono text-xs text-neutral-400">
                Desktop Mouse / Keys & Mobile Touch
              </span>
              {tankWars && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlayGame(tankWars)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Play className="h-3 w-3 text-amber-400 fill-current" />
                    <span>Play</span>
                  </button>
                  <a
                    href={tankWars.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Game 3: Fleet Command */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="text-cyan-400 font-semibold">03. TACTICAL REAL-TIME RTS</span>
                <span>GITHUB PAGES</span>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-white">
                Fleet Command
              </h3>
              
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                Minimalist 2D real-time space conquest with procedural planetary sectors, continuous fleet routing, and adaptive AI commanders.
              </p>

              {/* Core Mechanics List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Radio className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Aegis Prime & Cruisers:</strong>
                    Fortify orbital hubs, automate cruiser production, and direct continuous offensive vectors across the star cluster.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Mining Fleets & Swarms:</strong>
                    Harvest celestial ore to power Heavy Cruiser foundries and deploy extended-reach orbital defense swarms.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Compass className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">50 Campaign Sectors:</strong>
                    Advance through 50 procedural sectors with variable simulation speeds (1x-8x) against hostile AI warlords.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col gap-3">
              <span className="font-mono text-xs text-neutral-400">
                Desktop & Mobile Touch
              </span>
              {fleetCommand && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlayGame(fleetCommand)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Play className="h-3 w-3 text-amber-400 fill-current" />
                    <span>Play</span>
                  </button>
                  <a
                    href={fleetCommand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Game 4: Galactic Clash */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="text-amber-400 font-semibold">04. 4X TACTICAL SPACE</span>
                <span>GITHUB PAGES</span>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-white">
                Galactic Clash
              </h3>
              
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                A real-time top-down tactical space conquest game combining randomized stellar cartography and reactive AI factions.
              </p>

              {/* Core Mechanics List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Planetary Infrastructure:</strong>
                    Colonize resource-rich planets, upgrade starbases, and install perimeter orbital defense platforms.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Compass className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Starmap Cartography:</strong>
                    Procedural galaxy generation with varied celestial bodies, nebulae hazards, and hyperlane chokepoints.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Crosshair className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Fleet Coordination:</strong>
                    Dispatch strike wings, scout fleets, and dreadnoughts in real-time skirmishes.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col gap-3">
              <span className="font-mono text-xs text-neutral-400">
                Desktop Mouse / Keys
              </span>
              {galacticClash && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlayGame(galacticClash)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Play className="h-3 w-3 text-amber-400 fill-current" />
                    <span>Play</span>
                  </button>
                  <a
                    href={galacticClash.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Game 5: Poop Fly */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-7 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="text-amber-400 font-semibold">05. SIDE-SCROLLING SURVIVAL</span>
                <span>GITHUB PAGES</span>
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-white">
                Poop Fly
              </h3>
              
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                A procedurally generated 2D side-scrolling arcade reflex game. Command a nimble housefly dodging aerial danger zones.
              </p>

              {/* Core Mechanics List */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Zap className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Stamina & Food Loop:</strong>
                    Energy drains in flight. Devour food morsels to stay alive and fuel your tactical drop gauge.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Crosshair className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Precision Bombing:</strong>
                    Time your altitude and drop poop bombs right onto pursuers to score bonus points.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Compass className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Procedural Scaling:</strong>
                    Dynamic obstacle hazards, speed tiers, and power-up spawn rates scale with survival time.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-col gap-3">
              <span className="font-mono text-xs text-neutral-400">
                Desktop & Mobile Touch
              </span>
              {poopFly && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPlayGame(poopFly)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Play className="h-3 w-3 text-amber-400 fill-current" />
                    <span>Play</span>
                  </button>
                  <a
                    href={poopFly.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
