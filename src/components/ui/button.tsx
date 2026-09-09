import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-md hover:brightness-110 active:scale-[0.97]",
        secondary:
          "bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 active:scale-[0.97]",
        outline:
          "border border-border bg-transparent text-foreground rounded-md hover:bg-secondary active:scale-[0.97]",
        ghost:
          "bg-transparent text-muted-foreground rounded-md hover:text-foreground hover:bg-secondary",
        destructive:
          "bg-destructive text-destructive-foreground rounded-md hover:brightness-110 active:scale-[0.97]",
        link: "text-primary underline-offset-4 hover:underline",
        // Navigation call to action. PRD section 8.1.
        navCta:
          "text-foreground bg-nav-button hover:bg-nav-button/80 active:scale-[0.97] transition-all",
        // Hero primary. PRD section 8.2.
        hero: "bg-primary text-primary-foreground rounded-sm hover:brightness-110 active:scale-[0.97]",
        // Hero secondary. PRD section 8.2.
        heroOutline:
          "bg-white text-background rounded-sm hover:brightness-90 active:scale-[0.97]",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-6 text-sm",
        xl: "px-6 py-3 text-sm md:px-8 md:py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
