import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  accentColor?: string;
}

const GlassInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, accentColor, style, ...props }, ref) => {
    const dynamicStyle = {
      ...style,
      "--accent-color": accentColor,
    } as React.CSSProperties;

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-white/10 bg-secondary/50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 transition-shadow duration-300",
          className
        )}
        ref={ref}
        style={dynamicStyle}
        {...props}
      />
    );
  }
);
GlassInput.displayName = "GlassInput";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  accentColor?: string;
}

const GlassTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, accentColor, style, ...props }, ref) => {
    const dynamicStyle = {
      ...style,
      "--accent-color": accentColor,
    } as React.CSSProperties;
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-white/10 bg-secondary/50 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 transition-shadow duration-300",
          className
        )}
        ref={ref}
        style={dynamicStyle}
        {...props}
      />
    );
  }
);
GlassTextarea.displayName = "GlassTextarea";

export { GlassInput, GlassTextarea };