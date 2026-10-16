import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-outline text-foreground",
        travel: "bg-[#e0f4ff] text-[#00687b] dark:bg-[#004d5c]/40 dark:text-[#b1e9ff]",
        daily: "bg-[#d4f0d4] text-[#1b5e20] dark:bg-[#1b5e20]/40 dark:text-[#d4f0d4]",
        gym: "bg-[#ffe0cc] text-[#e65100] dark:bg-[#e65100]/40 dark:text-[#ffe0cc]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
