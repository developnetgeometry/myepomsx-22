
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        status: "border-transparent",
        success: "border-transparent bg-epomsx-success/20 text-epomsx-success hover:bg-epomsx-success/30",
        info: "border-transparent bg-epomsx-info/20 text-epomsx-info hover:bg-epomsx-info/30",
        warning: "border-transparent bg-epomsx-warning/20 text-epomsx-warning hover:bg-epomsx-warning/30",
        danger: "border-transparent bg-epomsx-danger/20 text-epomsx-danger hover:bg-epomsx-danger/30",
        purple: "border-transparent bg-epomsx-purple/20 text-epomsx-purple hover:bg-epomsx-purple/30",
        teal: "border-transparent bg-epomsx-teal/20 text-epomsx-teal hover:bg-epomsx-teal/30",
        amber: "border-transparent bg-epomsx-amber/20 text-epomsx-amber hover:bg-epomsx-amber/30",
        indigo: "border-transparent bg-epomsx-indigo/20 text-epomsx-indigo hover:bg-epomsx-indigo/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
