import { useState } from 'react'
import { MapPin, Navigation, Layers, ShieldAlert, CloudRain, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface InteractiveMapProps {
  recommendedSelected?: boolean
  selectedRouteIndex?: number
  onSelectRoute?: (index: number) => void
}

export function InteractiveMap({ selectedRouteIndex = 0, onSelectRoute }: InteractiveMapProps) {
  const [layers, setLayers] = useState({
    recommended: true,
    restrictions: true,
    weather: false,
    storage: true,
  })

  return (
    <div className="relative w-full h-[380px] lg:h-[480px] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between p-4">
      {/* Background SVG Grid / Simulated Map */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Route A - Direct / Restriction */}
        <path
          d="M 80 280 C 180 260, 260 180, 380 120"
          fill="none"
          stroke={selectedRouteIndex === 1 ? '#f59e0b' : '#3f3f46'}
          strokeWidth={selectedRouteIndex === 1 ? '5' : '2'}
          strokeDasharray="4 4"
        />

        {/* Route B - Recommended */}
        {layers.recommended && (
          <path
            d="M 80 280 Q 200 320, 290 220 T 380 120"
            fill="none"
            stroke={selectedRouteIndex === 0 ? '#10b981' : '#3f3f46'}
            strokeWidth={selectedRouteIndex === 0 ? '6' : '3'}
          />
        )}

        {/* Route C - Express */}
        <path
          d="M 80 280 Q 120 120, 380 120"
          fill="none"
          stroke={selectedRouteIndex === 2 ? '#3b82f6' : '#3f3f46'}
          strokeWidth={selectedRouteIndex === 2 ? '5' : '2'}
        />
      </svg>

      {/* Top Map Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-zinc-900/90 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded-lg text-xs">
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-zinc-200">Ames, IA Farm 4</span>
          <span className="text-zinc-500">→</span>
          <span className="font-semibold text-zinc-200">Des Moines Elevator</span>
        </div>

        <div className="flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur border border-zinc-800 p-1 rounded-lg">
          <Button
            size="sm"
            variant={layers.restrictions ? 'secondary' : 'ghost'}
            className="h-7 text-[10px] px-2"
            onClick={() => setLayers((l) => ({ ...l, restrictions: !l.restrictions }))}
          >
            Restrictions
          </Button>
          <Button
            size="sm"
            variant={layers.storage ? 'secondary' : 'ghost'}
            className="h-7 text-[10px] px-2"
            onClick={() => setLayers((l) => ({ ...l, storage: !l.storage }))}
          >
            Elevators
          </Button>
        </div>
      </div>

      {/* Interactive Map Visual Markers */}
      <div className="relative z-10 my-auto flex items-center justify-around px-8 pointer-events-none">
        {/* Origin */}
        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 p-2 rounded-full text-zinc-950 shadow-lg shadow-emerald-500/20">
            <Truck className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 mt-1 bg-zinc-900/80 px-2 py-0.5 rounded">
            Origin: Ames, IA
          </span>
        </div>

        {/* Bridge Alert Pin */}
        {layers.restrictions && (
          <div
            className="flex flex-col items-center cursor-pointer pointer-events-auto"
            title="IA-210 Bridge Weight Restriction (34 ton limit)"
          >
            <div className="bg-amber-500/20 border border-amber-500 p-1.5 rounded-full text-amber-400 animate-pulse">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-amber-300 bg-zinc-900/90 px-1.5 py-0.5 rounded border border-amber-500/30 mt-1">
              IA-210 Bridge (34T)
            </span>
          </div>
        )}

        {/* Destination */}
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 p-2 rounded-full text-white shadow-lg shadow-blue-500/20">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-blue-400 mt-1 bg-zinc-900/80 px-2 py-0.5 rounded">
            Des Moines Terminal
          </span>
        </div>
      </div>

      {/* Bottom Map Legend */}
      <div className="relative z-10 flex items-center justify-between text-xs bg-zinc-900/90 backdrop-blur border border-zinc-800 p-2 rounded-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectRoute?.(0)}
            className="flex items-center gap-1.5 hover:opacity-80"
          >
            <span className="w-3 h-1 bg-emerald-500 rounded-full" />
            <span className="text-[11px] text-zinc-300">Route B (Recommended)</span>
          </button>
          <button
            onClick={() => onSelectRoute?.(1)}
            className="flex items-center gap-1.5 hover:opacity-80"
          >
            <span className="w-3 h-1 bg-amber-500 rounded-full" />
            <span className="text-[11px] text-zinc-400">Route A (Direct)</span>
          </button>
        </div>

        <Badge variant="outline" className="bg-zinc-800 text-zinc-400 border-zinc-700 text-[10px]">
          Demo Map View
        </Badge>
      </div>
    </div>
  )
}
