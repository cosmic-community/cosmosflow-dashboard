import type { DashboardMetrics } from '@/types'

interface ProgressMetricsProps {
  metrics: DashboardMetrics
}

export default function ProgressMetrics({ metrics }: ProgressMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Tasks Completed */}
      <div className="bg-cosmic-bg-light rounded-xl p-6 cosmic-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-cosmic-primary/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-cosmic-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cosmic-primary">
              {metrics.tasksCompleted}
            </div>
            <div className="text-xs text-cosmic-text-dim">
              / {metrics.tasksTotal}
            </div>
          </div>
        </div>
        <div>
          <p className="text-cosmic-text font-medium">Tasks Completed</p>
          <p className="text-xs text-cosmic-text-dim mt-1">
            {metrics.tasksTotal > 0
              ? Math.round((metrics.tasksCompleted / metrics.tasksTotal) * 100)
              : 0}
            % completion rate
          </p>
        </div>
      </div>
      
      {/* Focus Time */}
      <div className="bg-cosmic-bg-light rounded-xl p-6 cosmic-glow-secondary">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-cosmic-secondary/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-cosmic-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cosmic-secondary">
              {Math.round(metrics.focusMinutes / 60 * 10) / 10}
            </div>
            <div className="text-xs text-cosmic-text-dim">hours</div>
          </div>
        </div>
        <div>
          <p className="text-cosmic-text font-medium">Focus Time</p>
          <p className="text-xs text-cosmic-text-dim mt-1">
            {metrics.focusMinutes} minutes total
          </p>
        </div>
      </div>
      
      {/* Energy Rating */}
      <div className="bg-cosmic-bg-light rounded-xl p-6 cosmic-glow-accent">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-cosmic-accent/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-cosmic-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cosmic-accent">
              {metrics.averageEnergy.toFixed(1)}
            </div>
            <div className="text-xs text-cosmic-text-dim">/ 5.0</div>
          </div>
        </div>
        <div>
          <p className="text-cosmic-text font-medium">Avg Energy</p>
          <p className="text-xs text-cosmic-text-dim mt-1">
            Cosmic energy rating
          </p>
        </div>
      </div>
      
      {/* Weekly Progress */}
      <div className="bg-cosmic-bg-light rounded-xl p-6 cosmic-glow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-cosmic-primary/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-cosmic-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cosmic-primary">
              {metrics.weeklyProgress}%
            </div>
          </div>
        </div>
        <div>
          <p className="text-cosmic-text font-medium">Weekly Progress</p>
          <p className="text-xs text-cosmic-text-dim mt-1">
            Last 7 days performance
          </p>
        </div>
      </div>
    </div>
  )
}