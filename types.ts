// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  thumbnail?: string
}

// Galaxy (Project) type
export interface Galaxy extends CosmicObject {
  type: 'galaxies'
  metadata: {
    name: string
    description?: string
    color?: string
    icon?: string
    progress?: number
  }
}

// Task priority type literal
export type TaskPriority = 'supernova' | 'stellar' | 'cosmic-dust'

// Task status type literal
export type TaskStatus = 'mission-planned' | 'in-orbit' | 'completed' | 'black-hole'

// Task type
export interface Task extends CosmicObject {
  type: 'tasks'
  metadata: {
    title: string
    description?: string
    content?: string
    priority: {
      key: TaskPriority
      value: string
    }
    status: {
      key: TaskStatus
      value: string
    }
    due_date?: string
    galaxy?: Galaxy
    energy_rating?: number
  }
}

// Focus Session type
export interface FocusSession extends CosmicObject {
  type: 'focus-sessions'
  metadata: {
    session_name: string
    duration: number
    start_time?: string
    end_time?: string
    task?: Task
    notes?: string
    completed?: boolean
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Dashboard metrics
export interface DashboardMetrics {
  tasksCompleted: number
  tasksTotal: number
  focusMinutes: number
  averageEnergy: number
  weeklyProgress: number
  dailyProgress: number
}

// Progress data for Galaxy Hub visualization
export interface ProgressData {
  daily: {
    completed: number
    total: number
    percentage: number
  }
  weekly: {
    completed: number
    total: number
    percentage: number
  }
  galaxies: Array<{
    id: string
    name: string
    color: string
    progress: number
    taskCount: number
  }>
}