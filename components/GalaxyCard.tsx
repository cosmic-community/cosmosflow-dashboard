import type { Galaxy } from '@/types'

interface GalaxyCardProps {
  galaxy: Galaxy
}

export default function GalaxyCard({ galaxy }: GalaxyCardProps) {
  const color = galaxy.metadata?.color || '#00d9ff'
  const icon = galaxy.metadata?.icon || '🌌'
  const name = galaxy.metadata?.name || galaxy.title
  const description = galaxy.metadata?.description || ''
  const progress = galaxy.metadata?.progress || 0
  
  return (
    <div
      className="bg-cosmic-bg-light rounded-xl p-6 hover:cosmic-glow transition-all duration-300 cursor-pointer group"
      style={{
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${color}20` }}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-cosmic-text group-hover:text-cosmic-primary transition-colors">
              {name}
            </h3>
            {description && (
              <p className="text-xs text-cosmic-text-dim mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-cosmic-text-dim">Progress</span>
          <span className="text-sm font-bold" style={{ color }}>
            {progress}%
          </span>
        </div>
        <div className="w-full bg-cosmic-bg rounded-full h-2 overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
      
      {/* Thumbnail if available */}
      {galaxy.thumbnail && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <img
            src={`${galaxy.thumbnail}?w=400&h=200&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-32 object-cover"
          />
        </div>
      )}
    </div>
  )
}