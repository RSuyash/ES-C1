import { useEffect, useState, type ReactNode, useRef } from 'react';
import { useInView } from 'motion/react';

type DeferredSectionProps = {
  id: string;
  minHeight: number;
  className?: string;
  rootMargin?: string;
  initiallyVisible?: boolean;
  children: ReactNode;
};

export function DeferredSection({
  id,
  minHeight,
  className,
  rootMargin = '500px 0px',
  initiallyVisible = false,
  children,
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: rootMargin as never, once: true });
  const [shouldRender, setShouldRender] = useState(initiallyVisible);

  useEffect(() => {
    if (inView) {
      setShouldRender(true);
    }
  }, [inView]);

  return (
    <div id={id} ref={ref} className={className}>
      {shouldRender ? children : <div aria-hidden="true" style={{ minHeight }} />}
    </div>
  );
}
