// Types TypeScript pour l'application de gestion de stock

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar_url?: string
  created_at: Date
  updated_at: Date
}

export interface Product {
  id: string
  name: string
  description?: string
  buy_price: number
  stock_qty: number
  min_stock_alert: number
  category?: string
  barcode?: string
  created_at: Date
  updated_at: Date
}

export interface Sale {
  id: string
  client_name?: string
  client_phone?: string
  user_id?: string
  sale_date: Date
  total_buy: number
  total_sell: number
  profit: number
  status: "completed" | "pending" | "cancelled"
  notes?: string
  user?: User
  sale_items?: SaleItem[]
}

export interface SaleItem {
  id: string
  sale_id: string
  product_id: string
  quantity: number
  unit_buy_price: number
  unit_sell_price: number
  total_buy: number
  total_sell: number
  product?: Product
}

export interface Invoice {
  id: string
  sale_id: string
  invoice_number: string
  pdf_url?: string
  generated_at: Date
  sale?: Sale
}

export interface StockMovement {
  id: string
  product_id: string
  movement_type: "BUY" | "SELL" | "ADJUST"
  quantity: number
  reason?: string
  user_id?: string
  created_at: Date
  product?: Product
  user?: User
}

export interface ActivityLogEntry {
  id: string
  type: "sale" | "stock" | "product" | "user"
  message: string
  details?: string
  user?: string
  created_at: Date
}

export interface DashboardStats {
  totalStockValue: number
  totalRevenue: number
  totalProfit: number
  totalProducts: number
  lowStockProducts: number
  recentSales: Sale[]
  topProducts: Array<{
    product: Product
    totalSold: number
    revenue: number
  }>
}

export interface ChartData {
  name: string
  value: number
  date?: string
}
