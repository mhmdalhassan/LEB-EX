'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs-motion";

import { motion, AnimatePresence, type Transition, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type MotionHighlightMode = 'children' | 'parent';

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
  setActiveClassName: (className: string) => void;
  transition?: Transition;
  disabled?: boolean;
  enabled?: boolean;
  exitDelay?: number;
  forceUpdateBounds?: boolean;
};

const MotionHighlightContext = React.createContext<
  MotionHighlightContextType<any> | undefined
>(undefined);

function useMotionHighlight<T extends string>(): MotionHighlightContextType<T> {
  const context = React.useContext(MotionHighlightContext);
  if (!context) {
    throw new Error(
      'useMotionHighlight must be used within a MotionHighlightProvider',
    );
  }
  return context as unknown as MotionHighlightContextType<T>;
}

type BaseMotionHighlightProps<T extends string> = {
  mode?: MotionHighlightMode;
  value?: T | null;
  defaultValue?: T | null;
  onValueChange?: (value: T | null) => void;
  className?: string;
  transition?: Transition;
  hover?: boolean;
  disabled?: boolean;
  enabled?: boolean;
  exitDelay?: number;
};

type ParentModeMotionHighlightProps = {
  boundsOffset?: Partial<Bounds>;
  containerClassName?: string;
  forceUpdateBounds?: boolean;
};

type MotionHighlightProps<T extends string> = React.ComponentProps<'div'> &
  BaseMotionHighlightProps<T> &
  Partial<ParentModeMotionHighlightProps> & {
    controlledItems?: boolean;
    children: React.ReactNode;
    itemsClassName?: string;
  };

const MotionHighlight = React.forwardRef<HTMLDivElement, MotionHighlightProps<any>>(
  (props, ref) => {
    const {
      children,
      value,
      defaultValue,
      onValueChange,
      className,
      transition = { type: 'spring', stiffness: 350, damping: 35 },
      hover = false,
      enabled = true,
      controlledItems = false,
      disabled = false,
      exitDelay = 0.2,
      mode = 'children',
      boundsOffset,
      containerClassName,
      forceUpdateBounds,
      itemsClassName,
      ...rest
    } = props;

    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    const [activeValue, setActiveValue] = React.useState<string | null>(
      value ?? defaultValue ?? null,
    );
    const [bounds, setBounds] = React.useState<Bounds | null>(null);
    const [activeClassName, setActiveClassName] = React.useState('');

    const id = React.useId();

    const safeSetBounds = React.useCallback(
      (b: DOMRect) => {
        if (!localRef.current) return;
        const containerRect = localRef.current.getBoundingClientRect();
        const offset = boundsOffset ?? {};
        const newBounds: Bounds = {
          top: b.top - containerRect.top + (offset.top ?? 0),
          left: b.left - containerRect.left + (offset.left ?? 0),
          width: b.width + (offset.width ?? 0),
          height: b.height + (offset.height ?? 0),
        };
        setBounds(newBounds);
      },
      [boundsOffset],
    );

    const clearBounds = () => setBounds(null);

    React.useEffect(() => {
      if (value !== undefined) setActiveValue(value);
    }, [value]);

    const providerValue = {
      mode,
      activeValue,
      setActiveValue,
      setBounds: safeSetBounds,
      clearBounds,
      id,
      hover,
      className,
      transition,
      disabled,
      enabled,
      exitDelay,
      activeClassName,
      setActiveClassName,
      forceUpdateBounds,
    };

    const renderChildren = (childrenToRender: React.ReactNode) =>
      mode === 'parent' ? (
        <div
          ref={localRef}
          className={cn('relative', containerClassName)}
          {...rest}
        >
          <AnimatePresence initial={false}>
            {bounds && (
              <motion.div
                animate={{
                  top: bounds.top,
                  left: bounds.left,
                  width: bounds.width,
                  height: bounds.height,
                  opacity: 1,
                }}
                initial={{
                  top: bounds.top,
                  left: bounds.left,
                  width: bounds.width,
                  height: bounds.height,
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    ...transition,
                    delay: (transition?.delay ?? 0) + (exitDelay ?? 0),
                  },
                }}
                transition={transition}
                className={cn(
                  'absolute bg-muted z-0 rounded-md',
                  className,
                  activeClassName,
                )}
              />
            )}
          </AnimatePresence>
          {childrenToRender}
        </div>
      ) : (
        childrenToRender
      );

    return (
      <MotionHighlightContext.Provider value={providerValue}>
        {enabled
          ? controlledItems
            ? renderChildren(children)
            : renderChildren(
                React.Children.map(children, (child: any) =>
                  React.cloneElement(child, {
                    className: cn(child.props.className, itemsClassName),
                  }),
                ),
              )
          : children}
      </MotionHighlightContext.Provider>
    );
  },
);
MotionHighlight.displayName = 'MotionHighlight';

type TabsContextType<T extends string> = {
  activeValue: T;
  handleValueChange: (value: T) => void;
};

const TabsContext = React.createContext<TabsContextType<any> | undefined>(
  undefined,
);

export function useTabs<T extends string = string>(): TabsContextType<T> {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('Tabs must be inside TabsProvider');
  return context;
}

export type TabsProps<T extends string = string> = {
  children: React.ReactNode;
  defaultValue: T;
  className?: string;
};

export const Tabs = <T extends string = string>({
  children,
  defaultValue,
  className,
}: TabsProps<T>) => {
  const [activeValue, setActiveValue] = React.useState<T>(defaultValue);

  return (
    <TabsContext.Provider
      value={{ activeValue, handleValueChange: setActiveValue }}
    >
      <div className={cn('flex flex-col gap-3', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeValue } = useTabs();

  return (
    <MotionHighlight
      controlledItems
      className="rounded-lg bg-muted shadow-sm"
      value={activeValue}
    >
      <div
        role="tablist"
        className={cn(
          'inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-muted px-1',
          className,
        )}
      >
        {children}
      </div>
    </MotionHighlight>
  );
};

export const TabsTrigger = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeValue, handleValueChange } = useTabs();

  return (
    <motion.button
      role="tab"
      whileTap={{ scale: 0.95 }}
      onClick={() => handleValueChange(value)}
      data-active={activeValue === value}
      className={cn(
        'relative z-10 h-8 cursor-pointer rounded-md px-3 text-sm font-medium transition-colors',
        'data-[active=true]:text-black data-[active=false]:text-gray-500',
        className,
      )}
      data-value={value}
    >
      {children}
    </motion.button>
  );
};

export const TabsContent = ({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { activeValue } = useTabs();
  const isActive = activeValue === value;

  return (
    <motion.div
      role="tabpanel"
      className={cn('relative', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      hidden={!isActive}
    >
      {children}
    </motion.div>
  );
};
