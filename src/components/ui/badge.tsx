
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
        cyan: "border-transparent bg-epomsx-cyan/20 text-epomsx-cyan hover:bg-epomsx-cyan/30",
        pink: "border-transparent bg-epomsx-pink/20 text-epomsx-pink hover:bg-epomsx-pink/30",
        lime: "border-transparent bg-epomsx-lime/20 text-epomsx-lime hover:bg-epomsx-lime/30",
        orange: "border-transparent bg-epomsx-orange/20 text-epomsx-orange hover:bg-epomsx-orange/30",
        "solid-success": "border-transparent bg-epomsx-success text-white",
        "solid-info": "border-transparent bg-epomsx-info text-white",
        "solid-warning": "border-transparent bg-epomsx-warning text-white",
        "solid-danger": "border-transparent bg-epomsx-danger text-white",
        "solid-purple": "border-transparent bg-epomsx-purple text-white",
        "solid-teal": "border-transparent bg-epomsx-teal text-white",
        "solid-amber": "border-transparent bg-epomsx-amber text-black",
        "solid-indigo": "border-transparent bg-epomsx-indigo text-white",
        "solid-cyan": "border-transparent bg-epomsx-cyan text-white",
        "solid-pink": "border-transparent bg-epomsx-pink text-white",
        "solid-lime": "border-transparent bg-epomsx-lime text-black",
        "solid-orange": "border-transparent bg-epomsx-orange text-white",
        "outline-success": "bg-transparent border-epomsx-success text-epomsx-success",
        "outline-info": "bg-transparent border-epomsx-info text-epomsx-info",
        "outline-warning": "bg-transparent border-epomsx-warning text-epomsx-warning",
        "outline-danger": "bg-transparent border-epomsx-danger text-epomsx-danger",
        "outline-purple": "bg-transparent border-epomsx-purple text-epomsx-purple",
        "outline-teal": "bg-transparent border-epomsx-teal text-epomsx-teal",
        "outline-amber": "bg-transparent border-epomsx-amber text-epomsx-amber",
        "outline-indigo": "bg-transparent border-epomsx-indigo text-epomsx-indigo",
        "outline-cyan": "bg-transparent border-epomsx-cyan text-epomsx-cyan",
        "outline-pink": "bg-transparent border-epomsx-pink text-epomsx-pink",
        "outline-lime": "bg-transparent border-epomsx-lime text-epomsx-lime",
        "outline-orange": "bg-transparent border-epomsx-orange text-epomsx-orange",
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
