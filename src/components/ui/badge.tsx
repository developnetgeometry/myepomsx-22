
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
        success:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200/80",
        danger:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200/80",
        // Add new variants
        "outline-info": 
          "border border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100",
        "outline-success": 
          "border border-green-500 text-green-700 bg-green-50 hover:bg-green-100",
        "outline-amber": 
          "border border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100",
        "outline-indigo": 
          "border border-indigo-500 text-indigo-700 bg-indigo-50 hover:bg-indigo-100",
        "solid-success": 
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        "solid-warning": 
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        "solid-info": 
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        "solid-danger": 
          "border-transparent bg-red-500 text-white hover:bg-red-600",
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
