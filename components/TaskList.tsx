import type { Task } from '@/types'

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-cosmic-bg-light rounded-xl p-8 text-center">
        <p className="text-cosmic-text-dim">No tasks found. Start your cosmic journey!</p>
      </div>
    )
  }
  
  // Group tasks by status
  const tasksByStatus = {
    'mission-planned': tasks.filter(t => t.metadata?.status?.key === 'mission-planned'),
    'in-orbit': tasks.filter(t => t.metadata?.status?.key === 'in-orbit'),
    'completed': tasks.filter(t => t.metadata?.status?.key === 'completed'),
    'black-hole': tasks.filter(t => t.metadata?.status?.key === 'black-hole'),
  }
  
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'supernova':
        return 'text-cosmic-secondary'
      case 'stellar':
        return 'text-cosmic-primary'
      case 'cosmic-dust':
        return 'text-cosmic-text-dim'
      default:
        return 'text-cosmic-text'
    }
  }
  
  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'supernova':
        return '⭐'
      case 'stellar':
        return '✨'
      case 'cosmic-dust':
        return '💫'
      default:
        return '🌟'
    }
  }
  
  const renderTaskCard = (task: Task) => (
    <div
      key={task.id}
      className="bg-cosmic-bg rounded-lg p-4 hover:cosmic-glow transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getPriorityIcon(task.metadata?.priority?.key)}</span>
          <h4 className="font-semibold text-cosmic-text">{task.metadata?.title || task.title}</h4>
        </div>
        {task.metadata?.energy_rating && (
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-cosmic-text-dim">{task.metadata.energy_rating}</span>
          </div>
        )}
      </div>
      
      {task.metadata?.description && (
        <p className="text-sm text-cosmic-text-dim mb-3 line-clamp-2">
          {task.metadata.description}
        </p>
      )}
      
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          {task.metadata?.galaxy && (
            <span
              className="px-2 py-1 rounded-full"
              style={{
                backgroundColor: `${task.metadata.galaxy.metadata?.color}20`,
                color: task.metadata.galaxy.metadata?.color || '#00d9ff',
              }}
            >
              {task.metadata.galaxy.metadata?.icon} {task.metadata.galaxy.metadata?.name}
            </span>
          )}
          <span className={`font-medium ${getPriorityColor(task.metadata?.priority?.key)}`}>
            {task.metadata?.priority?.value || 'No Priority'}
          </span>
        </div>
        
        {task.metadata?.due_date && (
          <span className="text-cosmic-text-dim">
            Due: {new Date(task.metadata.due_date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  )
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cosmic-text">Mission Control</h2>
      
      {/* Mission Planned */}
      {tasksByStatus['mission-planned'].length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-cosmic-text-dim mb-3">
            🚀 Mission Planned ({tasksByStatus['mission-planned'].length})
          </h3>
          <div className="space-y-3">
            {tasksByStatus['mission-planned'].map(renderTaskCard)}
          </div>
        </div>
      )}
      
      {/* In Orbit */}
      {tasksByStatus['in-orbit'].length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-cosmic-text-dim mb-3">
            🛸 In Orbit ({tasksByStatus['in-orbit'].length})
          </h3>
          <div className="space-y-3">
            {tasksByStatus['in-orbit'].map(renderTaskCard)}
          </div>
        </div>
      )}
      
      {/* Completed */}
      {tasksByStatus['completed'].length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-cosmic-text-dim mb-3">
            ✅ Completed ({tasksByStatus['completed'].length})
          </h3>
          <div className="space-y-3">
            {tasksByStatus['completed'].map(renderTaskCard)}
          </div>
        </div>
      )}
      
      {/* Black Hole */}
      {tasksByStatus['black-hole'].length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-cosmic-text-dim mb-3">
            🕳️ Black Hole ({tasksByStatus['black-hole'].length})
          </h3>
          <div className="space-y-3">
            {tasksByStatus['black-hole'].map(renderTaskCard)}
          </div>
        </div>
      )}
    </div>
  )
}