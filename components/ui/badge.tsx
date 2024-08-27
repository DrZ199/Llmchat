import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils/clsx";

const badgeVariants = cva(
  "flex items-center whitespace-nowrap rounded-sm px-2 py-0.5  min-h-2 text-[0.7rem] font-medium transition-colors text-zinc-500 ",
  {
    variants: {
      variant: {
        default: "text-zinc-800 dark:text-zinc-100 bg-zinc-500/20 rounded-full",
        secondary: "border-transparent bg-secondary hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground bg-white dark:bg-zinc-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };