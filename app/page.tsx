import { getDashboardMetrics, getProgressData, getTasks, getGalaxies } from '@/lib/cosmic'
import GalaxyHub from '@/components/GalaxyHub'
import ProgressMetrics from '@/components/ProgressMetrics'
import TaskList from '@/components/TaskList'
import GalaxyCard from '@/components/GalaxyCard'

export default async function HomePage() {
  const [metrics, progressData, tasks, galaxies] = await Promise.all([
    getDashboardMetrics(),
    getProgressData(),
    getTasks(),
    getGalaxies(),
  ])
  
  return (
    <main className="min-h-screen bg-cosmic-bg">
      {/* Header */}
      <header className="border-b border-cosmic-bg-light">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold cosmic-gradient bg-clip-text text-transparent">
                CosmosFlow
              </h1>
              <p className="text-cosmic-text-dim mt-1">Your Cosmic Productivity Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-cosmic-text-dim">Today</p>
                <p className="text-2xl font-bold text-cosmic-primary">{progressData.daily.percentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Metrics */}
        <ProgressMetrics metrics={metrics} />
        
        {/* Galaxy Hub - Central Visualization */}
        <div className="my-8">
          <GalaxyHub progressData={progressData} />
        </div>
        
        {/* Galaxies Grid */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-cosmic-text">Your Galaxies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galaxies.map(galaxy => (
              <GalaxyCard key={galaxy.id} galaxy={galaxy} />
            ))}
          </div>
        </section>
        
        {/* Task List */}
        <section className="my-8">
          <TaskList tasks={tasks} />
        </section>
      </div>
    </main>
  )
}