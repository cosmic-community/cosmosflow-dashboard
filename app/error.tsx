'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-cosmic-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-cosmic-bg-light rounded-2xl p-8 text-center cosmic-glow">
        <div className="w-16 h-16 bg-cosmic-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-cosmic-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-cosmic-text mb-2">
          Houston, we have a problem
        </h2>
        
        <p className="text-cosmic-text-dim mb-6">
          Something went wrong in the cosmic void. Let's try to recover.
        </p>
        
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-cosmic-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-all cosmic-glow"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}