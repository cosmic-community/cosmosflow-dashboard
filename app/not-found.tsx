import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cosmic-bg flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl mb-4">🌌</div>
        <h1 className="text-4xl font-bold text-cosmic-text mb-2">404</h1>
        <p className="text-cosmic-text-dim mb-6">
          Lost in the cosmic void. This page doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-cosmic-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-all cosmic-glow"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}