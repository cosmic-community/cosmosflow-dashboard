export default function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-cosmic-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-cosmic-secondary border-t-transparent rounded-full animate-spin-slow"></div>
      </div>
    </div>
  )
}