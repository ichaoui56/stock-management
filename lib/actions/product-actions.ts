"use server"

import { auth } from "@/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

// Types matching your schema
export interface Product {
  id: string
  name: string
  description: string | null
  buyPrice: number
  stockQty: number
  createdAt: Date
  updatedAt: Date
}

export interface PaginatedProducts {
  products: Product[]
  totalCount: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginationParams {
  page?: number
  perPage?: number
  searchQuery?: string
  stockFilter?: 'in_stock' | 'low_stock' | 'out_of_stock'
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

// PAGINATED Products with Search and Filters
export const getProductsPaginated = async ({
  page = 1,
  perPage = 10,
  searchQuery,
  stockFilter
}: PaginationParams = {}): Promise<PaginatedProducts> => {
  try {
    const skip = (page - 1) * perPage

    // Build where clause
    const where: any = {}

    // Search functionality
    if (searchQuery && searchQuery.trim()) {
      where.OR = [
        { name: { contains: searchQuery.trim(), mode: 'insensitive' } },
        { description: { contains: searchQuery.trim(), mode: 'insensitive' } },
      ]
    }

    // Stock filter
    if (stockFilter) {
      switch (stockFilter) {
        case 'in_stock':
          where.stockQty = { gt: 10 }
          break
        case 'low_stock':
          where.stockQty = { gt: 0, lte: 10 }
          break
        case 'out_of_stock':
          where.stockQty = 0
          break
      }
    }

    // Get total count for pagination
    const totalCount = await prisma.product.count({ where })

    // Get products
    const products = await prisma.product.findMany({
      where,
      skip,
      take: perPage,
      orderBy: [
        { updatedAt: 'desc' },
        { name: 'asc' }
      ],
    })

    const totalPages = Math.ceil(totalCount / perPage)

    return {
      products: products.map(product => ({
        ...product,
        buyPrice: Number(product.buyPrice),
      })),
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  } catch (error) {
    console.error("Get paginated products error:", error)
    return {
      products: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
  }
}

// CREATE Product
export const createProduct = async (
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string; product?: Product }> => {
  try {
    const session = await auth()
    if (!session) {
      return { success: false, error: "Non authentifié" }
    }

    // Extract and validate form data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const buyPrice = parseFloat(formData.get("buy_price") as string)
    const stockQty = parseInt(formData.get("stock_qty") as string)

    // Validation
    if (!name || name.trim().length === 0) {
      return { success: false, error: "Le nom du produit est requis" }
    }

    if (isNaN(buyPrice) || buyPrice < 0) {
      return { success: false, error: "Le prix d'achat doit être un nombre positif" }
    }

    if (isNaN(stockQty) || stockQty < 0) {
      return { success: false, error: "La quantité doit être un nombre positif" }
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        buyPrice,
        stockQty,
      },
    })

    // Create initial stock movement record
    if (stockQty > 0) {
      await prisma.stockMovement.create({
        data: {
          productId: product.id,
          movementType: "ADJUST",
          quantity: stockQty,
          userId: session.user?.id || null,
        },
      })
    }

    revalidatePath("/produits")
    
    return { 
      success: true, 
      product: {
        ...product,
        buyPrice: Number(product.buyPrice)
      }
    }

  } catch (error) {
    console.error("Create product error:", error)
    return { success: false, error: "Erreur lors de la création du produit" }
  }
}

// UPDATE Product
export const updateProduct = async (
  id: string,
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string; product?: Product }> => {
  try {
    const session = await auth()
    if (!session) {
      return { success: false, error: "Non authentifié" }
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return { success: false, error: "Produit introuvable" }
    }

    // Extract and validate form data
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const buyPrice = parseFloat(formData.get("buy_price") as string)
    const stockQty = parseInt(formData.get("stock_qty") as string)

    // Validation
    if (!name || name.trim().length === 0) {
      return { success: false, error: "Le nom du produit est requis" }
    }

    if (isNaN(buyPrice) || buyPrice < 0) {
      return { success: false, error: "Le prix d'achat doit être un nombre positif" }
    }

    if (isNaN(stockQty) || stockQty < 0) {
      return { success: false, error: "La quantité doit être un nombre positif" }
    }

    // Calculate stock difference for movement tracking
    const stockDifference = stockQty - existingProduct.stockQty

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        buyPrice,
        stockQty,
        updatedAt: new Date(),
      },
    })

    // Create stock movement record if stock changed
    if (stockDifference !== 0) {
      await prisma.stockMovement.create({
        data: {
          productId: id,
          movementType: "ADJUST",
          quantity: stockDifference,
          userId: session.user?.id || null,
        },
      })
    }

    revalidatePath("/produits")
    
    return { 
      success: true, 
      product: {
        ...updatedProduct,
        buyPrice: Number(updatedProduct.buyPrice)
      }
    }

  } catch (error) {
    console.error("Update product error:", error)
    return { success: false, error: "Erreur lors de la mise à jour du produit" }
  }
}

// DELETE Product
export const deleteProduct = async (id: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const session = await auth()
    if (!session) {
      return { success: false, error: "Non authentifié" }
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        saleItems: true,
      },
    })

    if (!product) {
      return { success: false, error: "Produit introuvable" }
    }

    // Check if product has been sold (has sale items)
    if (product.saleItems.length > 0) {
      return { 
        success: false, 
        error: "Impossible de supprimer un produit qui a été vendu. Vous pouvez le désactiver à la place." 
      }
    }

    // Delete related stock movements first (due to foreign key constraint)
    await prisma.stockMovement.deleteMany({
      where: { productId: id },
    })

    // Delete the product
    await prisma.product.delete({
      where: { id },
    })

    revalidatePath("/produits")
    return { success: true }

  } catch (error) {
    console.error("Delete product error:", error)
    return { success: false, error: "Erreur lors de la suppression du produit" }
  }
}

// UTILITY FUNCTIONS

// Adjust stock quantity (for inventory management)
export const adjustProductStock = async (
  productId: string, 
  newQuantity: number, 
  movementType: "BUY" | "SELL" | "ADJUST" = "ADJUST"
): Promise<{ success: boolean; error?: string }> => {
  try {
    const session = await auth()
    if (!session) {
      return { success: false, error: "Non authentifié" }
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return { success: false, error: "Produit introuvable" }
    }

    if (newQuantity < 0) {
      return { success: false, error: "La quantité ne peut pas être négative" }
    }

    const quantityDifference = newQuantity - product.stockQty

    // Update product stock
    await prisma.product.update({
      where: { id: productId },
      data: { 
        stockQty: newQuantity,
        updatedAt: new Date(),
      },
    })

    // Create stock movement record
    if (quantityDifference !== 0) {
      await prisma.stockMovement.create({
        data: {
          productId,
          movementType,
          quantity: quantityDifference,
          userId: session.user?.id || null,
        },
      })
    }

    revalidatePath("/produits")
    return { success: true }

  } catch (error) {
    console.error("Adjust stock error:", error)
    return { success: false, error: "Erreur lors de l'ajustement du stock" }
  }
}

// Get products with low stock (for alerts)
export const getLowStockProducts = async (threshold: number = 10): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        stockQty: {
          lte: threshold,
        },
      },
      orderBy: { stockQty: 'asc' },
    })

    return products.map(product => ({
      ...product,
      buyPrice: Number(product.buyPrice),
    }))
  } catch (error) {
    console.error("Get low stock products error:", error)
    return []
  }
}

// Get product statistics (enhanced with filters)
export const getProductStats = async (filters?: {
  searchQuery?: string
  stockFilter?: string
}) => {
  try {
    let where: any = {}

    // Apply search filter
    if (filters?.searchQuery && filters.searchQuery.trim()) {
      where.OR = [
        { name: { contains: filters.searchQuery.trim(), mode: 'insensitive' } },
        { description: { contains: filters.searchQuery.trim(), mode: 'insensitive' } },
      ]
    }

    // Apply stock filter for filtered stats
    const filteredWhere = { ...where }
    if (filters?.stockFilter && filters.stockFilter !== 'all') {
      switch (filters.stockFilter) {
        case 'in_stock':
          filteredWhere.stockQty = { gt: 10 }
          break
        case 'low_stock':
          filteredWhere.stockQty = { gt: 0, lte: 10 }
          break
        case 'out_of_stock':
          filteredWhere.stockQty = 0
          break
      }
    }

    const totalProducts = await prisma.product.count({ where: filteredWhere })
    const lowStockProducts = await prisma.product.count({
      where: { ...where, stockQty: { lte: 10 } },
    })
    const outOfStockProducts = await prisma.product.count({
      where: { ...where, stockQty: 0 },
    })

    const totalStockValue = await prisma.product.aggregate({
      where: filteredWhere,
      _sum: {
        buyPrice: true,
      },
    })

    const totalUnits = await prisma.product.aggregate({
      where: filteredWhere,
      _sum: {
        stockQty: true,
      },
    })

    return {
      totalProducts,
      lowStockProducts,
      outOfStockProducts,
      totalStockValue: Number(totalStockValue._sum.buyPrice || 0),
      totalUnits: totalUnits._sum.stockQty || 0,
    }
  } catch (error) {
    console.error("Get product stats error:", error)
    return {
      totalProducts: 0,
      lowStockProducts: 0,
      outOfStockProducts: 0,
      totalStockValue: 0,
      totalUnits: 0,
    }
  }
}

// Get stock movements for a product (history)
export const getProductStockMovements = async (productId: string) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return movements
  } catch (error) {
    console.error("Get stock movements error:", error)
    return []
  }
}

// Search products (kept for backward compatibility)
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    if (!query || query.trim().length === 0) {
      return getProducts()
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { name: 'asc' },
    })

    return products.map(product => ({
      ...product,
      buyPrice: Number(product.buyPrice),
    }))
  } catch (error) {
    console.error("Search products error:", error)
    return []
  }
}

// READ Products (Get all - kept for backward compatibility)
export const getProducts = async (): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany({
      orderBy: [
        { updatedAt: 'desc' },
        { name: 'asc' }
      ],
    })

    return products.map(product => ({
      ...product,
      buyPrice: Number(product.buyPrice),
    }))
  } catch (error) {
    console.error("Get products error:", error)
    return []
  }
}

// READ Product (Get single)
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) return null

    return {
      ...product,
      buyPrice: Number(product.buyPrice),
    }
  } catch (error) {
    console.error("Get product by ID error:", error)
    return null
  }
}

// Export products functionality
export const exportProducts = async (filters?: {
  searchQuery?: string
  stockFilter?: string
}): Promise<{ success: boolean; data?: Product[]; error?: string }> => {
  try {
    const session = await auth()
    if (!session) {
      return { success: false, error: "Non authentifié" }
    }

    let where: any = {}

    // Apply search filter
    if (filters?.searchQuery && filters.searchQuery.trim()) {
      where.OR = [
        { name: { contains: filters.searchQuery.trim(), mode: 'insensitive' } },
        { description: { contains: filters.searchQuery.trim(), mode: 'insensitive' } },
      ]
    }

    // Apply stock filter
    if (filters?.stockFilter && filters.stockFilter !== 'all') {
      switch (filters.stockFilter) {
        case 'in_stock':
          where.stockQty = { gt: 10 }
          break
        case 'low_stock':
          where.stockQty = { gt: 0, lte: 10 }
          break
        case 'out_of_stock':
          where.stockQty = 0
          break
      }
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [
        { name: 'asc' }
      ],
    })

    return {
      success: true,
      data: products.map(product => ({
        ...product,
        buyPrice: Number(product.buyPrice),
      }))
    }
  } catch (error) {
    console.error("Export products error:", error)
    return { success: false, error: "Erreur lors de l'export des produits" }
  }
}