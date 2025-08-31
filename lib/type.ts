// types/product.ts

export interface Product {
    id: string
    name: string
    description: string | null
    buyPrice: number
    stockQty: number
    createdAt: Date
    updatedAt: Date
  }
  
  export interface CreateProductData {
    name: string
    description?: string
    buyPrice: number
    stockQty: number
  }
  
  export interface UpdateProductData {
    name: string
    description?: string
    buyPrice: number
    stockQty: number
  }
  
  export interface StockMovement {
    id: string
    productId: string
    movementType: "BUY" | "SELL" | "ADJUST"
    quantity: number
    userId: string | null
    createdAt: Date
    user?: {
      name: string
      email: string
    }
  }
  
  export interface ProductStats {
    totalProducts: number
    lowStockProducts: number
    outOfStockProducts: number
    totalStockValue: number
    totalUnits: number
  }
  
  export type StockStatus = "in_stock" | "low_stock" | "out_of_stock"
  export type StockFilter = "all" | StockStatus
  
  export interface ProductFilters {
    search?: string
    stockFilter?: StockFilter
    sortBy?: "name" | "stock" | "value" | "updated"
    sortOrder?: "asc" | "desc"
  }