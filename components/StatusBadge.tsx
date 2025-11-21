interface StatusBadgeProps {
  status: string
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'mission-planned':
        return {
          bg: 'bg-blue-500/20',
          text: 'text-blue-400',
          icon: '🚀',
          label: 'Mission Planned',
        }
      case 'in-orbit':
        return {
          bg: 'bg-cosmic-primary/20',
          text: 'text-cosmic-primary',
          icon: '🛸',
          label: 'In Orbit',
        }
      case 'completed':
        return {
          bg: 'bg-green-500/20',
          text: 'text-green-400',
          icon: '✅',
          label: 'Completed',
        }
      case 'black-hole':
        return {
          bg: 'bg-cosmic-secondary/20',
          text: 'text-cosmic-secondary',
          icon: '🕳️',
          label: 'Black Hole',
        }
      default:
        return {
          bg: 'bg-cosmic-text-dim/20',
          text: 'text-cosmic-text-dim',
          icon: '❓',
          label: 'Unknown',
        }
    }
  }
  
  const styles = getStatusStyles()
  
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text} ${className}`}
    >
      <span>{styles.icon}</span>
      <span>{styles.label}</span>
    </span>
  )
}