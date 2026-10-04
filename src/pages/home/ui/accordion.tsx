// Ported from jnsahaj/tweakcn components/ui/accordion.tsx (Apache-2.0).
import type { ComponentProps } from "react";
import * as Primitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";

export const Accordion = Primitive.Root;
export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      className={cn("ch:border-b ch:last:border-b-0", className)}
      {...props}
    />
  );
}
export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Header className="ch:flex">
      <Primitive.Trigger
        className={cn(
          "ch:flex ch:flex-1 ch:items-start ch:justify-between ch:gap-4 ch:rounded-md ch:py-4 ch:text-left ch:text-sm ch:font-medium ch:transition-all ch:outline-none ch:hover:underline ch:focus-visible:ring-[3px] ch:focus-visible:ring-ring/50 ch:[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          size={16}
          className="ch:pointer-events-none ch:shrink-0 ch:translate-y-0.5 ch:text-muted-foreground ch:transition-transform ch:duration-200"
        />
      </Primitive.Trigger>
    </Primitive.Header>
  );
}
export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      className="landing-faq-content ch:overflow-hidden ch:text-sm"
      {...props}
    >
      <div className={cn("ch:pt-0 ch:pb-4", className)}>{children}</div>
    </Primitive.Content>
  );
}
