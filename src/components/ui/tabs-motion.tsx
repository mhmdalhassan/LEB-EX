"use client";

import * as React from "react";
import {
  Tabs as BaseTabs,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  TabsContent as BaseTabsContent,
} from "@/components/ui/tabs";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

// Highlight logic
type MotionHighlightMode = "children" | "parent";

type Bounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type MotionHighlightContextType<T extends string> = {
  mode: MotionHighlightMode;
  activeValue: T | null;
  setActiveValue: (value: T | null) => void;
  setBounds: (bounds: DOMRect) => void;
  clearBounds: () => void;
  id: string;
  hover: boolean;
  className?: string;
  activeClassName?: string;
  setActiveClassName: (cls: string) => void;
  transition?: Transition;
  disabled?: boolean;
  enabled?: boolean;
  exitDelay?: number;
  forceUpdateBounds?: boolean;
};

const MotionHighlightContext =
  React.createContext<MotionHighlightContextType<any> | undefined>(undefined);

function useMotionHighlight<T extends string>(): MotionHighlightContextType<T> {
  const context = React.useContext(MotionHighlightContext);
  if (!context) {
    throw new Error("useMotionHighlight must be used within a MotionHighlightProvider");
  }
  return context as MotionHighlightContextType<T>;
}

type MotionHighlightProps<T extends string> = React.ComponentProps<"div"> & {
  value?: T | null;
  defaultValue?: T | null;
  className?: string;
  hover?: boolean;
  transition?: Transition;
  exitDelay?: number;
  boundsOffset?: Partial<Bounds>;
  enabled?: boolean;
  itemsClassName?: string;
  children: React.ReactNode;
};

const MotionHighlight = React.forwardRef<HTMLDivElement, MotionHighlightProps<any>>(
  (props, ref) => {
    const {
      children,
      value,
      defaultValue,
      className,
      transition = { type: "spring", stiffness: 350, damping: 35 },
      hover = false,
      enabled = true,
      exitDelay = 0.15,
      boundsOffset,
      itemsClassName,
      ...rest
    } = props;

    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    const [activeValue, setActiveValue] = React.useState<string | null>(value ?? defaultValue ?? null);
    const [bounds, setBounds] = React.useState<Bounds | null>(null);

    const safeSetBounds = React.useCallback(
      (b: DOMRect) => {
        if (!localRef.current) return;
        const containerRect = localRef.current.getBoundingClientRect();
        const offset = boundsOffset ?? {};
        setBounds({
          top: b.top - containerRect.top + (offset.top ?? 0),
          left: b.left - containerRect.left + (offset.left ?? 0),
          width: b.width + (offset.width ?? 0),
          height: b.height + (offset.height ?? 0),
        });
      },
      [boundsOffset]
    );

    const providerValue = {
      mode: "children",
      activeValue,
      setActiveValue,
      setBounds: safeSetBounds,
      clearBounds: () => setBounds(null),
      id: React.useId(),
      hover,
      className,
      transition,
      disabled: false,
      enabled,
      exitDelay,
      activeClassName: "",
      setActiveClassName: () => {},
      forceUpdateBounds: false,
    };

    return (
      <MotionHighlightContext.Provider value={providerValue}>
        <div ref={localRef} className="relative w-full" {...rest}>
          <AnimatePresence initial={false}>
            {bounds && (
              <motion.div
                layoutId="motionHighlight"
                animate={{ ...bounds, opacity: 1 }}
                initial={{ ...bounds, opacity: 0 }}
                exit={{
                  opacity: 0,
                  transition: {
                    ...transition,
                    delay: (transition?.delay ?? 0) + exitDelay,
                  },
                }}
                transition={transition}
                className={cn("bg-muted absolute rounded-md z-0", className)}
              />
            )}
          </AnimatePresence>
          {children}
        </div>
      </MotionHighlightContext.Provider>
    );
  }
);

MotionHighlight.displayName = "MotionHighlight";

// Tabs context
type TabsContextType<T extends string> = {
  activeValue: T;
  handleValueChange: (value: T) => void;
};

const TabsContext = React.createContext<TabsContextType<any> | undefined>(undefined);

export function useTabs<T extends string = string>(): TabsContextType<T> {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("Tabs must be inside TabsProvider");
  return context;
}

// Motion Tabs main component
export const Tabs = <T extends string = string>({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode;
  defaultValue: T;
  className?: string;
}) => {
  const [activeValue, setActiveValue] = React.useState<T>(defaultValue);

  return (
    <TabsContext.Provider value={{ activeValue, handleValueChange: setActiveValue }}>
      <BaseTabs defaultValue={defaultValue} className={className}>
        {children}
      </BaseTabs>
    </TabsContext.Provider>
  );
};

// UI Components
export const TabsList = ({ children, className }: any) => {
  const { activeValue } = useTabs();
  return (
    <MotionHighlight value={activeValue} className="rounded-lg bg-muted shadow-sm">
      <BaseTabsList className={cn("inline-flex gap-1 px-1 h-10 items-center rounded-lg", className)}>
        {children}
      </BaseTabsList>
    </MotionHighlight>
  );
};

export const TabsTrigger = ({ value, children, className }: any) => {
  const { activeValue, handleValueChange } = useTabs();

  return (
    <BaseTabsTrigger
      value={value}
      onClick={() => handleValueChange(value)}
      data-active={activeValue === value}
      className={cn(
        "relative z-10 h-8 px-3 text-sm font-medium transition-colors rounded-md",
        "data-[active=true]:text-black data-[active=false]:text-gray-500",
        className
      )}
    >
      {children}
    </BaseTabsTrigger>
  );
};

export const TabsContent = ({ value, children, className }: any) => {
  const { activeValue } = useTabs();
  return (
    <BaseTabsContent
      value={value}
      className={cn("relative", className)}
      hidden={activeValue !== value}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: activeValue === value ? 1 : 0, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        {children}
      </motion.div>
    </BaseTabsContent>
  );
};
