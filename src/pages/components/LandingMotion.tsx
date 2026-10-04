import { m } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

const motionPreference =
  typeof window === "undefined"
    ? null
    : window.matchMedia("(prefers-reduced-motion: reduce)");
function subscribe(listener: () => void) {
  motionPreference?.addEventListener("change", listener);
  return () => motionPreference?.removeEventListener("change", listener);
}
export function useReducedAnimation() {
  return useSyncExternalStore(
    subscribe,
    () => motionPreference?.matches ?? false,
    () => false,
  );
}

export const entrance = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedAnimation();
  return (
    <m.div
      className={className}
      data-landing-reveal
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={entrance}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay }}
    >
      {children}
    </m.div>
  );
}
