import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
    label: string
  }
  icon?: React.ReactNode
  className?: string
  variant?: "default" | "primary"
}

export function StatCard({ title, value, subtitle, trend, icon, className, variant = "default" }: StatCardProps) {
  return (
    <Card
      className={cn(
        "bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow",
        variant === "primary" && "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0",
        className,
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p
              className={cn(
                "text-sm font-medium",
                variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                "text-3xl font-bold mt-2",
                variant === "primary" ? "text-primary-foreground" : "text-foreground",
              )}
            >
              {value}
            </p>
            {subtitle && (
              <p
                className={cn(
                  "text-sm mt-1",
                  variant === "primary" ? "text-primary-foreground/70" : "text-muted-foreground",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                variant === "primary" ? "bg-primary-foreground/20" : "bg-muted",
              )}
            >
              {icon}
            </div>
          )}
        </div>

        {trend && (
          <div className="flex items-center gap-2 mt-4">
            {trend.isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={cn("text-sm font-medium", trend.isPositive ? "text-green-600" : "text-red-600")}>
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <span
              className={cn("text-sm", variant === "primary" ? "text-primary-foreground/70" : "text-muted-foreground")}
            >
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
