import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all tasks with galaxy data
export async function getTasks() {
  try {
    const response = await cosmic.objects
      .find({ type: 'tasks' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch tasks')
  }
}

// Fetch all galaxies
export async function getGalaxies() {
  try {
    const response = await cosmic.objects
      .find({ type: 'galaxies' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(0)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch galaxies')
  }
}

// Fetch all focus sessions
export async function getFocusSessions() {
  try {
    const response = await cosmic.objects
      .find({ type: 'focus-sessions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch focus sessions')
  }
}

// Calculate dashboard metrics
export async function getDashboardMetrics() {
  const [tasks, sessions] = await Promise.all([
    getTasks(),
    getFocusSessions(),
  ])
  
  const completedTasks = tasks.filter(
    task => task.metadata?.status?.key === 'completed'
  )
  
  const totalFocusMinutes = sessions.reduce(
    (sum, session) => sum + (session.metadata?.duration || 0),
    0
  )
  
  const averageEnergy = tasks.length > 0
    ? tasks.reduce((sum, task) => sum + (task.metadata?.energy_rating || 0), 0) / tasks.length
    : 0
  
  // Calculate weekly progress (last 7 days)
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weeklyCompletedTasks = completedTasks.filter(task => {
    const completedDate = new Date(task.modified_at)
    return completedDate >= weekAgo
  })
  
  // Calculate daily progress (today)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dailyCompletedTasks = completedTasks.filter(task => {
    const completedDate = new Date(task.modified_at)
    completedDate.setHours(0, 0, 0, 0)
    return completedDate.getTime() === today.getTime()
  })
  
  return {
    tasksCompleted: completedTasks.length,
    tasksTotal: tasks.length,
    focusMinutes: totalFocusMinutes,
    averageEnergy: Math.round(averageEnergy * 10) / 10,
    weeklyProgress: tasks.length > 0 ? Math.round((weeklyCompletedTasks.length / tasks.length) * 100) : 0,
    dailyProgress: tasks.length > 0 ? Math.round((dailyCompletedTasks.length / tasks.length) * 100) : 0,
  }
}

// Get progress data for Galaxy Hub visualization
export async function getProgressData() {
  const [tasks, galaxies] = await Promise.all([
    getTasks(),
    getGalaxies(),
  ])
  
  const completedTasks = tasks.filter(
    task => task.metadata?.status?.key === 'completed'
  )
  
  // Daily progress
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dailyCompletedTasks = completedTasks.filter(task => {
    const completedDate = new Date(task.modified_at)
    completedDate.setHours(0, 0, 0, 0)
    return completedDate.getTime() === today.getTime()
  })
  
  // Weekly progress
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const weeklyCompletedTasks = completedTasks.filter(task => {
    const completedDate = new Date(task.modified_at)
    return completedDate >= weekAgo
  })
  
  // Galaxy-specific data
  const galaxyData = galaxies.map(galaxy => {
    const galaxyTasks = tasks.filter(
      task => task.metadata?.galaxy?.id === galaxy.id
    )
    
    return {
      id: galaxy.id,
      name: galaxy.metadata?.name || galaxy.title,
      color: galaxy.metadata?.color || '#00d9ff',
      progress: galaxy.metadata?.progress || 0,
      taskCount: galaxyTasks.length,
    }
  })
  
  return {
    daily: {
      completed: dailyCompletedTasks.length,
      total: tasks.length,
      percentage: tasks.length > 0 ? Math.round((dailyCompletedTasks.length / tasks.length) * 100) : 0,
    },
    weekly: {
      completed: weeklyCompletedTasks.length,
      total: tasks.length,
      percentage: tasks.length > 0 ? Math.round((weeklyCompletedTasks.length / tasks.length) * 100) : 0,
    },
    galaxies: galaxyData,
  }
}