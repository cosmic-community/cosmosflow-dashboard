'use client'

import { useEffect, useState } from 'react'
import type { ProgressData } from '@/types'

interface GalaxyHubProps {
  progressData: ProgressData
}

export default function GalaxyHub({ progressData }: GalaxyHubProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-cosmic-bg-light rounded-2xl">
        <div className="animate-pulse text-cosmic-text-dim">Loading Galaxy Hub...</div>
      </div>
    )
  }
  
  // Calculate orbital positions for galaxies
  const galaxyPositions = progressData.galaxies.map((galaxy, index) => {
    const angle = (index / progressData.galaxies.length) * 2 * Math.PI
    const radius = 150
    const x = 250 + Math.cos(angle) * radius
    const y = 250 + Math.sin(angle) * radius
    
    return {
      ...galaxy,
      x,
      y,
      angle,
    }
  })
  
  // Calculate star positions based on completed tasks
  const generateStars = (count: number) => {
    const stars = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + Math.random() * 0.3
      const radius = 80 + Math.random() * 120
      stars.push({
        x: 250 + Math.cos(angle) * radius,
        y: 250 + Math.sin(angle) * radius,
        size: 2 + Math.random() * 3,
        opacity: 0.6 + Math.random() * 0.4,
      })
    }
    return stars
  }
  
  const dailyStars = generateStars(progressData.daily.completed)
  const weeklyStars = generateStars(Math.min(progressData.weekly.completed, 50))
  
  return (
    <div className="relative w-full">
      <div className="bg-cosmic-bg-light rounded-2xl p-8 cosmic-glow">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* SVG Visualization */}
          <div className="flex-1 flex justify-center">
            <svg
              viewBox="0 0 500 500"
              className="w-full max-w-[500px] h-auto"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0, 217, 255, 0.3))' }}
            >
              {/* Background glow effect */}
              <defs>
                <radialGradient id="cosmic-glow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="star-glow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Central glow */}
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="url(#cosmic-glow)"
              />
              
              {/* Orbital paths */}
              <circle
                cx="250"
                cy="250"
                r="80"
                fill="none"
                stroke="#00d9ff"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="5,5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 250 250"
                  to="360 250 250"
                  dur="30s"
                  repeatCount="indefinite"
                />
              </circle>
              
              <circle
                cx="250"
                cy="250"
                r="150"
                fill="none"
                stroke="#ff006e"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="5,5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 250 250"
                  to="-360 250 250"
                  dur="45s"
                  repeatCount="indefinite"
                />
              </circle>
              
              <circle
                cx="250"
                cy="250"
                r="220"
                fill="none"
                stroke="#b967ff"
                strokeWidth="1"
                opacity="0.3"
                strokeDasharray="5,5"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 250 250"
                  to="360 250 250"
                  dur="60s"
                  repeatCount="indefinite"
                />
              </circle>
              
              {/* Center core */}
              <circle
                cx="250"
                cy="250"
                r="15"
                fill="#00d9ff"
                className="animate-pulse-slow"
              />
              
              {/* Completed task stars - weekly */}
              {weeklyStars.map((star, index) => (
                <circle
                  key={`weekly-star-${index}`}
                  cx={star.x}
                  cy={star.y}
                  r={star.size}
                  fill="#ffffff"
                  opacity={star.opacity * 0.6}
                >
                  <animate
                    attributeName="opacity"
                    values={`${star.opacity * 0.6};${star.opacity};${star.opacity * 0.6}`}
                    dur={`${2 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              
              {/* Completed task stars - daily (brighter) */}
              {dailyStars.map((star, index) => (
                <g key={`daily-star-${index}`}>
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={star.size * 1.5}
                    fill="url(#star-glow)"
                    opacity={star.opacity * 0.3}
                  />
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={star.size}
                    fill="#00d9ff"
                    opacity={star.opacity}
                  >
                    <animate
                      attributeName="opacity"
                      values={`${star.opacity};${star.opacity + 0.3};${star.opacity}`}
                      dur={`${1 + Math.random()}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
              
              {/* Galaxy positions */}
              {galaxyPositions.map((galaxy, index) => (
                <g key={galaxy.id}>
                  <circle
                    cx={galaxy.x}
                    cy={galaxy.y}
                    r="20"
                    fill={galaxy.color}
                    opacity="0.8"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                  >
                    <animate
                      attributeName="r"
                      values="20;22;20"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={galaxy.x}
                    y={galaxy.y + 35}
                    textAnchor="middle"
                    fill="#e0e6ed"
                    fontSize="12"
                    fontWeight="500"
                  >
                    {galaxy.name.split(' ')[0]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          
          {/* Progress Stats */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cosmic-text">Galaxy Hub</h3>
              <p className="text-cosmic-text-dim">
                Your cosmic journey visualized through orbital paths and stellar progress
              </p>
            </div>
            
            {/* Daily Progress */}
            <div className="bg-cosmic-bg rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cosmic-text-dim text-sm">Daily Progress</span>
                <span className="text-cosmic-primary font-bold text-2xl">
                  {progressData.daily.percentage}%
                </span>
              </div>
              <div className="w-full bg-cosmic-bg-light rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cosmic-primary to-cosmic-secondary transition-all duration-500"
                  style={{ width: `${progressData.daily.percentage}%` }}
                />
              </div>
              <p className="text-xs text-cosmic-text-dim mt-2">
                {progressData.daily.completed} of {progressData.daily.total} tasks completed today
              </p>
            </div>
            
            {/* Weekly Progress */}
            <div className="bg-cosmic-bg rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cosmic-text-dim text-sm">Weekly Progress</span>
                <span className="text-cosmic-secondary font-bold text-2xl">
                  {progressData.weekly.percentage}%
                </span>
              </div>
              <div className="w-full bg-cosmic-bg-light rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cosmic-secondary to-cosmic-accent transition-all duration-500"
                  style={{ width: `${progressData.weekly.percentage}%` }}
                />
              </div>
              <p className="text-xs text-cosmic-text-dim mt-2">
                {progressData.weekly.completed} of {progressData.weekly.total} tasks completed this week
              </p>
            </div>
            
            {/* Galaxy Legend */}
            <div className="bg-cosmic-bg rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-3 text-cosmic-text">Active Galaxies</h4>
              <div className="space-y-2">
                {progressData.galaxies.map(galaxy => (
                  <div key={galaxy.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: galaxy.color }}
                      />
                      <span className="text-sm text-cosmic-text-dim">{galaxy.name}</span>
                    </div>
                    <span className="text-xs text-cosmic-text-dim">
                      {galaxy.taskCount} tasks
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}