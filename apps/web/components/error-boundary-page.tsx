import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

export default function ErrorBoundaryPage({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-sm">{error?.message}</p>
      <div>
        <Button
          size="medium"
          icon={<Icons.reload className="h-4 w-4" />}
          onClick={() => resetErrorBoundary()}
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
