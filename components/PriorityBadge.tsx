interface PriorityBadgeProps {
  priority: string
  className?: string
}

export default function PriorityBadge({ priority, className = '' }: PriorityBadgeProps) {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'supernova':
        return {
          bg: 'bg-cosmic-secondary/20',
          text: 'text-cosmic-secondary',
          icon: '⭐',
          label: 'Supernova',
        }
      case 'stellar':
        return {
          bg: 'bg-cosmic-primary/20',
          text: 'text-cosmic-primary',
          icon: '✨',
          label: 'Stellar',
        }
      case 'cosmic-dust':
        return {
          bg: 'bg-cosmic-text-dim/20',
          text: 'text-cosmic-text-dim',
          icon: '💫',
          label: 'Cosmic Dust',
        }
      default:
        return {
          bg: 'bg-cosmic-accent/20',
          text: 'text-cosmic-accent',
          icon: '🌟',
          label: 'Unknown',
        }
    }
  }
  
  const styles = getPriorityStyles()
  
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text} ${className}`}
    >
      <span>{styles.icon}</span>
      <span>{styles.label}</span>
    </span>
  )
}