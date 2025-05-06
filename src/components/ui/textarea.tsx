
import * as React from "react"
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  ListOrdered, 
  List, 
  Link, 
  Image 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  richText?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, richText = false, ...props }, ref) => {
    return (
      <div className={cn(richText && "border rounded-md border-input")}>
        {richText && (
          <div className="flex flex-wrap items-center gap-0.5 border-b border-input p-1 bg-muted/30">
            <select className="h-8 rounded border border-input bg-background px-2 text-xs">
              <option>Paragraph</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>
            
            <div className="h-4 mx-1 border-r border-input"></div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Underline className="h-4 w-4" />
            </Button>
            
            <div className="h-4 mx-1 border-r border-input"></div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <AlignRight className="h-4 w-4" />
            </Button>
            
            <div className="h-4 mx-1 border-r border-input"></div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
            
            <div className="h-4 mx-1 border-r border-input"></div>
            
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Link className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <Image className="h-4 w-4" />
            </Button>
          </div>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            richText && "border-0 rounded-t-none",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
