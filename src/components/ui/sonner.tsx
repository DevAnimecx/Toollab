"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react"
import { motion } from "framer-motion"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-transparent group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

const CinematicNotification = ({ type, title, description }: { type: string, title: React.ReactNode, description: React.ReactNode }) => {
  const iconConfig = {
    success: { Icon: CheckCircle2, color: "hsl(142.1 76.2% 36.3%)" },
    error: { Icon: XCircle, color: "hsl(0 84.2% 60.2%)" },
    warning: { Icon: AlertTriangle, color: "hsl(47.9 95.8% 53.1%)" },
    info: { Icon: Info, color: "hsl(213 94% 68%)" },
    default: { Icon: Info, color: "hsl(210 40% 98%)" },
  };

  const { Icon, color } = iconConfig[type as keyof typeof iconConfig] || iconConfig.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative w-full max-w-md p-4 rounded-2xl overflow-hidden
                 bg-card/50 backdrop-blur-xl border border-white/10
                 shadow-2xl shadow-black/20"
    >
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.1 } }}
          style={{ color }}
        >
          <Icon className="h-6 w-6 mt-1" />
        </motion.div>
        <div className="flex-1">
          <p className="font-bold text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export { Toaster, CinematicNotification }