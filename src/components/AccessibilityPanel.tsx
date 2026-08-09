import { useState, useEffect } from 'react'
import {
  Accessibility,
  X,
  Contrast,
  Eye,
  Type,
  Zap,
  Keyboard,
  Captions,
  Volume2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useI18n } from '@/hooks/use-i18n'

export function AccessibilityPanel() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    colorBlindMode: 'default',
    largerText: false,
    reduceAnimations: false,
    keyboardNav: false,
    screenReader: false,
    captions: false,
    enableVoice: false,
    vlibras: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem('rooted_a11y')
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch {
        /* intentionally ignored */
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('rooted_a11y', JSON.stringify(settings))
    const root = document.documentElement
    root.classList.toggle('a11y-high-contrast', settings.highContrast)
    root.classList.toggle('a11y-large-text', settings.largerText)
    root.classList.toggle('a11y-reduce-animations', settings.reduceAnimations)
    root.setAttribute('data-colorblind', settings.colorBlindMode)
  }, [settings])

  const toggle = (key: keyof typeof settings) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }))
  }

  const colorBlindModes = [
    { id: 'default', label: t.accessibility.colorBlindDefault },
    { id: 'deuteranopia', label: t.accessibility.colorBlindDeuteranopia },
    { id: 'protanopia', label: t.accessibility.colorBlindProtanopia },
    { id: 'tritanopia', label: t.accessibility.colorBlindTritanopia },
    { id: 'high-contrast', label: t.accessibility.colorBlindHighContrast },
  ]

  const toggles = [
    { key: 'highContrast' as const, icon: Contrast, label: t.accessibility.highContrast },
    { key: 'largerText' as const, icon: Type, label: t.accessibility.largerText },
    { key: 'reduceAnimations' as const, icon: Zap, label: t.accessibility.reduceAnimations },
    { key: 'keyboardNav' as const, icon: Keyboard, label: t.accessibility.keyboardNav },
    { key: 'screenReader' as const, icon: Eye, label: t.accessibility.screenReader },
    { key: 'captions' as const, icon: Captions, label: t.accessibility.captions },
    { key: 'enableVoice' as const, icon: Volume2, label: t.accessibility.enableVoice },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full',
          'bg-zinc-900 border border-zinc-700 text-emerald-400',
          'flex items-center justify-center shadow-lg hover:bg-zinc-800 transition-colors',
          'md:bottom-20 md:right-4',
        )}
        aria-label={t.accessibility.title}
      >
        <Accessibility className="w-5 h-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-t-2xl md:rounded-2xl w-full max-w-md p-5 space-y-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <Accessibility className="w-5 h-5 text-emerald-400" />
                {t.accessibility.title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {toggles.map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <Label className="text-xs text-zinc-300 flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-zinc-400" />
                    {item.label}
                  </Label>
                  <Switch
                    checked={settings[item.key] as boolean}
                    onCheckedChange={() => toggle(item.key)}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <Label className="text-xs text-zinc-300 flex items-center gap-2">
                <Eye className="w-4 h-4 text-zinc-400" />
                {t.accessibility.colorBlindMode}
              </Label>
              <div className="flex flex-wrap gap-1.5">
                {colorBlindModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSettings((s) => ({ ...s, colorBlindMode: mode.id }))}
                    className={cn(
                      'text-[10px] px-2.5 py-1 rounded-md font-medium transition-colors',
                      settings.colorBlindMode === mode.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800',
                    )}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <Label className="text-xs text-zinc-300">{t.accessibility.vlibras}</Label>
              <Switch checked={settings.vlibras} onCheckedChange={() => toggle('vlibras')} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
