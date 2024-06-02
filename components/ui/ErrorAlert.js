import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive({className,children}) {
  return (
    <Alert className={className} variant="destructive">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {/* Your session has expired. Please log in again. */}
        {children}
      </AlertDescription>
    </Alert>
  )
}
