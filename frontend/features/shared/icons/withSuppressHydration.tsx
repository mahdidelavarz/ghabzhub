// src/features/shared/icons/withSuppressHydration.tsx
import { SVGProps } from 'react';

export function withSuppressHydration<T extends SVGProps<SVGSVGElement>>(
  Component: React.ComponentType<T>
) {
  return function HydrationSafeIcon(props: T) {
    return (
      <Component
        {...props}
        suppressHydrationWarning
      />
    );
  };
}