
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-epomsx-success text-white hover:bg-epomsx-success/90",
        info: "bg-epomsx-info text-white hover:bg-epomsx-info/90",
        warning: "bg-epomsx-warning text-white hover:bg-epomsx-warning/90",
        danger: "bg-epomsx-danger text-white hover:bg-epomsx-danger/90",
        purple: "bg-epomsx-purple text-white hover:bg-epomsx-purple/90",
        teal: "bg-epomsx-teal text-white hover:bg-epomsx-teal/90",
        amber: "bg-epomsx-amber text-black hover:bg-epomsx-amber/90",
        indigo: "bg-epomsx-indigo text-white hover:bg-epomsx-indigo/90",
        "outline-success": "border border-epomsx-success text-epomsx-success hover:bg-epomsx-success/10",
        "outline-info": "border border-epomsx-info text-epomsx-info hover:bg-epomsx-info/10",
        "outline-warning": "border border-epomsx-warning text-epomsx-warning hover:bg-epomsx-warning/10",
        "outline-danger": "border border-epomsx-danger text-epomsx-danger hover:bg-epomsx-danger/10",
        "outline-purple": "border border-epomsx-purple text-epomsx-purple hover:bg-epomsx-purple/10",
        "outline-teal": "border border-epomsx-teal text-epomsx-teal hover:bg-epomsx-teal/10",
        "outline-amber": "border border-epomsx-amber text-epomsx-amber hover:bg-epomsx-amber/10",
        "outline-indigo": "border border-epomsx-indigo text-epomsx-indigo hover:bg-epomsx-indigo/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
