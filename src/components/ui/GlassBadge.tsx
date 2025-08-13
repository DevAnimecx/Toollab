import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  accentColor?: string;
}

function GlassBadge({ className, variant, accentColor, style, ...props }: BadgeProps) {
  const dynamicStyle = {
    ...style,
    background: accentColor ? `linear-gradient(to right, ${accentColor}40, transparent)` : undefined,
    borderColor: accentColor ? `${accentColor}60` : undefined,
    textShadow: `0 0 4px ${accentColor}`,
  } as React.CSSProperties;

  return (
    <div className={cn(badgeVariants({ variant }), className)} style={dynamicStyle} {...props} />
  );
}

export { GlassBadge, badgeVariants };