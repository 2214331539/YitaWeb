// Ported from jnsahaj/tweakcn components/ui/button.tsx (Apache-2.0).
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

const buttonVariants = cva(
  "ch:inline-flex ch:shrink-0 ch:items-center ch:justify-center ch:gap-2 ch:rounded-md ch:text-sm ch:font-medium ch:whitespace-nowrap ch:transition-all ch:outline-none ch:focus-visible:ring-[3px] ch:focus-visible:ring-ring/50 ch:disabled:pointer-events-none ch:disabled:opacity-50 ch:[&_svg]:pointer-events-none ch:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "ch:bg-primary ch:text-primary-foreground ch:hover:bg-primary/90",
        outline:
          "ch:border ch:bg-background ch:shadow-xs ch:hover:bg-accent ch:hover:text-accent-foreground",
        secondary:
          "ch:bg-secondary ch:text-secondary-foreground ch:hover:bg-secondary/80",
        ghost: "ch:hover:bg-accent ch:hover:text-accent-foreground",
      },
      size: {
        default: "ch:h-9 ch:px-4 ch:py-2",
        lg: "ch:h-10 ch:rounded-md ch:px-8",
        icon: "ch:size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
