import { useState } from 'react'
import { MapPin, Navigation, Truck, ShieldAlert } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface InteractiveMapProps {
  selectedRouteIndex?: number
  onSelectRoute?: (index: number) => void
}

const layerLabels: Record<string, string> = {
  recommended: 'Recommended',
  restrictions: 'Restrictions',
  bridges: 'Bridges',
  storage: 'Storage',
  elevators: 'Elevators',
  weather: 'Weather',
  traffic: 'Traffic',
  freightHubs: 'Freight Hubs',
}

export function InteractiveMap({ selectedRouteIndex = 0, onSelectRoute }: InteractiveMapProps) {
  const [layers, setLayers] = useState<Record<string, boolean>>({
    recommended: true,
    restrictions: true,
    bridges: false,
    storage: false,
    elevators: false,
    weather: false,
    traffic: false,
    freightHubs: false,
  })

  const toggleLayer = (key: string) => setLayers((l) => ({ ...l, [key]: !l[key] }))

  return (
    <div className="relative w-full h-[380px] lg:h-[480px] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between p-4">
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path
          d="M 80 280 C 180 260, 260 180, 380 120"
          fill="none"
          stroke={selectedRouteIndex === 1 ? '#f59e0b' : '#3f3f46'}
          stroke-width={selectedRouteIndex === 1 ? '5' : '2'}
          stroke-dasharray="4 4"
        />
        {layers.recommended && (
          <path
            d="M 80 280 Q 200 320, 290 220 T 380 120"
            fill="none"
            stroke={selectedRouteIndex === 0 ? '#10b981' : '#3f3f46'}
            stroke-width={selectedRouteIndex === 0 ? '6' : '3'}
          />
        )}
        <path
          d="M 80 280 Q 120 120, 380 120"
          fill="none"
          stroke={selectedRouteIndex === 2 ? '#3b82f6' : '#3f3f46'}
          stroke-width={selectedRouteIndex === 2 ? '5' : '2'}
        />
        {selectedRouteIndex === 3 && (
          <path
            d="M 80 280 Q 160 340, 250 280 T 380 120"
            fill="none"
            stroke="#8b5cf6"
            stroke-width="5"
          />
        )}
      </svg>

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-zinc-900/90 backdrop-blur border border-zinc-800 px-3 py-1.5 rounded-lg text-xs">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-zinc-200">Ames, IA</span>
            <span className="text-zinc-500">→</span>
            <span className="font-semibold text-zinc-200">Des Moines</span>
          </div>
          <Badge
            variant="outline"
            className="bg-zinc-900/90 text-zinc-400 border-zinc-700 text-[10px]"
          >
            Demo Map
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1">
          {Object.entries(layers).map(([key, val]) => (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              className={`text-[10px] px-2 py-1 rounded-md font-medium transition-colors ${val ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
            >
              {layerLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-around px-8 pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 p-2 rounded-full text-zinc-950 shadow-lg shadow-emerald-500/20">
            <Truck className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-emerald-400 mt-1 bg-zinc-900/80 px-2 py-0.5 rounded">
            Origin: Ames, IA
          </span>
        </div>
        {layers.restrictions && (
          <div
            className="flex flex-col items-center"
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
        <div className="flex flex-col items-center">
          <div className="bg-blue-500 p-2 rounded-full text-white shadow-lg shadow-blue-500/20">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-blue-400 mt-1 bg-zinc-900/80 px-2 py-0.5 rounded">
            Des Moines Terminal
          </span>
        </div>
      </div>

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
      </div>
    </div>
  )
}
