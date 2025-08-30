import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj)
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj)
}

export function calculateMargin(sellPrice: number, buyPrice: number): number {
  if (sellPrice === 0) return 0
  return ((sellPrice - buyPrice) / sellPrice) * 100
}

export function getStockStatus(quantity: number): "low" | "medium" | "high" {
  if (quantity <= 10) return "low"
  if (quantity <= 50) return "medium"
  return "high"
}

export function getStockStatusColor(status: string): string {
  switch (status) {
    case "low":
      return "text-red-600 bg-red-50"
    case "medium":
      return "text-yellow-600 bg-yellow-50"
    case "high":
      return "text-green-600 bg-green-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}
