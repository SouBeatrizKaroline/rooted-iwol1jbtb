import { useState, useEffect } from 'react'
import { MapPin, Navigation, Truck, ShieldAlert, Search, X, ZoomIn, ZoomOut } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingState, ErrorState } from '@/components/StateViews'
import { cn } from '@/lib/utils'

interface MapLocation {
  id: number
  name: string
  category: 'origin' | 'destination' | 'storage' | 'restriction'
  distance: number
  status: string
  description: string
  x: number
  y: number
}

const locations: MapLocation[] = [
  {
    id: 1,
    name: 'Ames Farm (Origin)',
    category: 'origin',
    distance: 0,
    status: 'Departure',
    description: 'Agricultural production origin',
    x: 15,
    y: 75,
  },
  {
    id: 2,
    name: 'Skunk River Bridge',
    category: 'restriction',
    distance: 12.5,
    status: '34 ton limit',
    description: 'Posted weight restriction on IA-210',
    x: 38,
    y: 55,
  },
  {
    id: 3,
    name: 'Ames Grain Co-op',
    category: 'storage',
    distance: 18.2,
    status: '72% capacity',
    description: 'Regional grain elevator facility',
    x: 30,
    y: 70,
  },
  {
    id: 4,
    name: 'Story City Terminal',
    category: 'storage',
    distance: 41.5,
    status: '91% capacity',
    description: 'Regional bulk storage terminal',
    x: 50,
    y: 40,
  },
  {
    id: 5,
    name: 'Des Moines Terminal',
    category: 'destination',
    distance: 34.0,
    status: 'Open',
    description: 'Grain processing destination terminal',
    x: 82,
    y: 30,
  },
]

const categoryConfig = {
  origin: { label: 'Origin', color: '#10b981' },
  destination: { label: 'Destination', color: '#3b82f6' },
  storage: { label: 'Storage', color: '#8b5cf6' },
  restriction: { label: 'Restriction', color: '#f59e0b' },
}

const layerLabels: Record<string, string> = {
  recommended: 'Routes',
  restrictions: 'Restrictions',
  storage: 'Storage',
  weather: 'Weather',
}

interface InteractiveMapProps {
  selectedRouteIndex?: number
  onSelectRoute?: (index: number) => void
}

export function InteractiveMap({ selectedRouteIndex = 0, onSelectRoute }: InteractiveMapProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')
  const [layers, setLayers] = useState<Record<string, boolean>>({
    recommended: true,
    restrictions: true,
    storage: true,
    weather: false,
  })
  const [selected, setSelected] = useState<MapLocation | null>(null)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const toggleLayer = (k: string) => setLayers((l) => ({ ...l, [k]: !l[k] }))
  const retry = () => {
    setError(false)
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
  }

  const filtered = locations.filter((l) => {
    const matchesSearch = !search || l.name.toLowerCase().includes(search.toLowerCase())
    const hiddenByLayer =
      (!layers.restrictions && l.category === 'restriction') ||
      (!layers.storage && l.category === 'storage')
    return matchesSearch && !hiddenByLayer
  })

  if (loading) {
    return (
      <div className="w-full h-[380px] lg:h-[480px] bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center">
        <LoadingState label="Loading map..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-[380px] lg:h-[480px] bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-center">
        <ErrorState message="Unable to load map data" onRetry={retry} />
      </div>
    )
  }

  return (
    <div className="relative w-full h-[380px] lg:h-[480px] bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {layers.recommended && (
          <path
            d="M 80 280 Q 200 320, 290 220 T 380 120"
            fill="none"
            stroke={selectedRouteIndex === 0 ? '#10b981' : '#3f3f46'}
            stroke-width={selectedRouteIndex === 0 ? '6' : '3'}
          />
        )}
        <path
          d="M 80 280 C 180 260, 260 180, 380 120"
          fill="none"
          stroke={selectedRouteIndex === 1 ? '#f59e0b' : '#3f3f46'}
          stroke-width={selectedRouteIndex === 1 ? '5' : '2'}
          stroke-dasharray="4 4"
        />
        <path
          d="M 80 280 Q 120 120, 380 120"
          fill="none"
          stroke={selectedRouteIndex === 2 ? '#3b82f6' : '#3f3f46'}
          stroke-width={selectedRouteIndex === 2 ? '5' : '2'}
        />
      </svg>

      <div className="relative z-10 p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search locations..."
              className="bg-zinc-900/90 border-zinc-800 text-zinc-100 text-xs h-8 pl-8"
              aria-label="Search map locations"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-0.5 bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.2, 1.6))}
              className="p-1 hover:bg-zinc-800 rounded"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5 text-zinc-400" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
              className="p-1 hover:bg-zinc-800 rounded"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {Object.entries(layers).map(([key, val]) => (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              className={cn(
                'text-[10px] px-2 py-1 rounded-md font-medium transition-colors',
                val
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800',
              )}
            >
              {layerLabels[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex-1">
        {filtered.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc)}
            className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            aria-label={`${categoryConfig[loc.category].label}: ${loc.name}`}
          >
            <span
              className="block w-3 h-3 rounded-full border-2 border-zinc-950 shadow-lg transition-transform group-hover:scale-125"
              style={{ backgroundColor: categoryConfig[loc.category].color }}
            />
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-zinc-500">No locations found</p>
          </div>
        )}
      </div>

      <div className="relative z-10 p-2 bg-zinc-900/90 border-t border-zinc-800 flex items-center gap-3 text-xs">
        <button
          onClick={() => onSelectRoute?.(0)}
          className="flex items-center gap-1.5 hover:opacity-80"
        >
          <span className="w-3 h-1 bg-emerald-500 rounded-full" />
          <span className="text-[11px] text-zinc-300">Route B</span>
        </button>
        <button
          onClick={() => onSelectRoute?.(1)}
          className="flex items-center gap-1.5 hover:opacity-80"
        >
          <span className="w-3 h-1 bg-amber-500 rounded-full" />
          <span className="text-[11px] text-zinc-400">Route A</span>
        </button>
      </div>

      {selected && (
        <div className="absolute bottom-12 left-3 right-3 md:right-auto md:w-80 bg-zinc-900 border border-zinc-800 rounded-xl p-3 shadow-xl z-20 animate-fade-in-up">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: categoryConfig[selected.category].color }}
              />
              <span className="font-semibold text-sm text-zinc-100">{selected.name}</span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-zinc-500 hover:text-zinc-300"
              aria-label="Close info card"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-zinc-400 mb-2">{selected.description}</p>
          <div className="flex items-center gap-3 text-[10px] text-zinc-500">
            <span>{selected.distance} mi</span>
            <Badge variant="outline" className="text-[9px] border-zinc-700 text-zinc-400">
              {selected.status}
            </Badge>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-2 h-7 text-[11px] border-zinc-700 text-zinc-300"
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  )
}
