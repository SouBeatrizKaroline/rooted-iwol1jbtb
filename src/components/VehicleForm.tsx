import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { createVehicle, Vehicle } from '@/services/vehicles'
import { toast } from 'sonner'

interface VehicleFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function VehicleForm({ open, onOpenChange, onSuccess }: VehicleFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Class 8 Hopper Semi',
    vehicle_type: 'Semi Tractor',
    trailer_type: 'Grain Hopper',
    empty_weight_lb: 31000,
    cargo_weight_lb: 49000,
    gross_weight_lb: 80000,
    axles: 5,
    axle_config: '3S2',
    height_ft: 13.5,
    width_ft: 8.5,
    length_ft: 65,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createVehicle({ ...formData, is_default: true })
      toast.success('Vehicle added successfully')
      onSuccess?.()
      onOpenChange(false)
    } catch (err: any) {
      toast.error('Failed to add vehicle: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-md">
        <DialogHeader>
          <DialogTitle>Add Agricultural Vehicle</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label className="text-xs text-zinc-400">Vehicle Profile Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-zinc-950 border-zinc-800 text-zinc-100 h-9"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-zinc-400">Empty Weight (lb)</Label>
              <Input
                type="number"
                value={formData.empty_weight_lb}
                onChange={(e) =>
                  setFormData({ ...formData, empty_weight_lb: Number(e.target.value) })
                }
                className="bg-zinc-950 border-zinc-800 text-zinc-100 h-9"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-400">Max Gross Weight (lb)</Label>
              <Input
                type="number"
                value={formData.gross_weight_lb}
                onChange={(e) =>
                  setFormData({ ...formData, gross_weight_lb: Number(e.target.value) })
                }
                className="bg-zinc-950 border-zinc-800 text-zinc-100 h-9"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-zinc-400">Axles Count</Label>
              <Input
                type="number"
                value={formData.axles}
                onChange={(e) => setFormData({ ...formData, axles: Number(e.target.value) })}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 h-9"
              />
            </div>
            <div>
              <Label className="text-xs text-zinc-400">Height (ft)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.height_ft}
                onChange={(e) => setFormData({ ...formData, height_ft: Number(e.target.value) })}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 h-9"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              {loading ? 'Saving...' : 'Save Vehicle'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
