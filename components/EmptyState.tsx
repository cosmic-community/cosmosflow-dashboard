interface EmptyStateProps {
  title: string
  description: string
  icon?: string
  className?: string
}

export default function EmptyState({
  title,
  description,
  icon = '🌌',
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-cosmic-text mb-2">{title}</h3>
      <p className="text-cosmic-text-dim max-w-md mx-auto">{description}</p>
    </div>
  )
}