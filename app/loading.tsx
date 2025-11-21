export default function Loading() {
  return (
    <div className="min-h-screen bg-cosmic-bg flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin-slow w-16 h-16 border-4 border-cosmic-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-cosmic-text-dim">Loading your cosmic dashboard...</p>
      </div>
    </div>
  )
}