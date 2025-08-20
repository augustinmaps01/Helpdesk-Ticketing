import { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface AppLogoIconProps extends HTMLAttributes<HTMLImageElement> {
  size?: string; // Tailwind classes like "w-20 h-20" or "w-full h-auto"
}

export default function AppLogoIcon({
  size,
  className,
  ...props
}: AppLogoIconProps) {
  const defaultSize = "w-32 h-32";

  return (
    <img
      {...props}
      src="/images/logos.png"
      alt="App Logo"
      className={clsx("object-contain", className, size ?? defaultSize)}
    />
  );
}
