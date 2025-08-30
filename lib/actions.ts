"use server"

import { revalidatePath } from "next/cache"
import type { Product, Sale, DashboardStats, StockMovement, ActivityLogEntry } from "@/types"

// Simulation de base de données en mémoire pour la démo
// En production, remplacer par des appels à PostgreSQL

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Ordinateur Portable Dell",
    description: "Dell Inspiron 15 3000",
    buy_price: 450.0,
    stock_qty: 25,
    min_stock_alert: 5,
    category: "Informatique",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "2",
    name: "Souris Logitech",
    description: "Souris optique sans fil",
    buy_price: 15.0,
    stock_qty: 8,
    min_stock_alert: 20,
    category: "Accessoires",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "3",
    name: "Clavier Mécanique",
    description: "Clavier gaming RGB",
    buy_price: 85.0,
    stock_qty: 45,
    min_stock_alert: 10,
    category: "Accessoires",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "4",
    name: "Écran 24 pouces",
    description: "Moniteur Full HD IPS",
    buy_price: 180.0,
    stock_qty: 3,
    min_stock_alert: 5,
    category: "Informatique",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "5",
    name: "Casque Audio",
    description: "Casque Bluetooth premium",
    buy_price: 120.0,
    stock_qty: 60,
    min_stock_alert: 15,
    category: "Audio",
    created_at: new Date(),
    updated_at: new Date(),
  },
]

const mockSales: Sale[] = [
  {
    id: "1",
    client_name: "Jean Dupont",
    client_phone: "+33987654321",
    sale_date: new Date(),
    total_buy: 465.0,
    total_sell: 650.0,
    profit: 185.0,
    status: "completed",
  },
]

// Données simulées pour les mouvements de stock
const mockStockMovements: StockMovement[] = [
  {
    id: "1",
    product_id: "1",
    movement_type: "BUY",
    quantity: 25,
    reason: "Stock initial",
    user_id: "550e8400-e29b-41d4-a716-446655440000",
    created_at: new Date(Date.now() - 86400000), // Hier
    product: mockProducts[0],
  },
  {
    id: "2",
    product_id: "2",
    movement_type: "SELL",
    quantity: -2,
    reason: "Vente client",
    user_id: "550e8400-e29b-41d4-a716-446655440000",
    created_at: new Date(Date.now() - 43200000), // Il y a 12h
    product: mockProducts[1],
  },
  {
    id: "3",
    product_id: "4",
    movement_type: "ADJUST",
    quantity: -2,
    reason: "Produit endommagé",
    user_id: "550e8400-e29b-41d4-a716-446655440000",
    created_at: new Date(Date.now() - 21600000), // Il y a 6h
    product: mockProducts[3],
  },
]

// Données simulées pour le journal d'activité
const mockActivityLog: ActivityLogEntry[] = [
  {
    id: "1",
    type: "sale",
    message: "Vente réalisée - Ordinateur Portable Dell",
    details: "Montant: 650 €, Bénéfice: 185 €",
    user: "Admin Système",
    created_at: new Date(Date.now() - 7200000), // Il y a 2h
  },
  {
    id: "2",
    type: "stock",
    message: "Stock ajouté - Souris Logitech",
    details: "+50 unités ajoutées",
    user: "Admin Système",
    created_at: new Date(Date.now() - 14400000), // Il y a 4h
  },
  {
    id: "3",
    type: "product",
    message: "Nouveau produit créé - Casque Audio",
    details: "Catégorie: Audio, Prix: 120 €",
    user: "Admin Système",
    created_at: new Date(Date.now() - 21600000), // Il y a 6h
  },
  {
    id: "4",
    type: "stock",
    message: "Ajustement de stock - Écran 24 pouces",
    details: "-2 unités (produit endommagé)",
    user: "Admin Système",
    created_at: new Date(Date.now() - 28800000), // Il y a 8h
  },
  {
    id: "5",
    type: "user",
    message: "Connexion utilisateur",
    details: "Connexion réussie",
    user: "Admin Système",
    created_at: new Date(Date.now() - 36000000), // Il y a 10h
  },
]

// Données simulées pour l'utilisateur
const mockUser = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Admin Système",
  email: "admin@stockpro.com",
  phone: "+33123456789",
  avatar_url: "/admin-avatar.png",
  created_at: new Date("2024-01-15"),
  role: "Administrateur",
  location: "Paris, France",
}

const mockUserStats = {
  totalSales: 45,
  totalRevenue: 28500,
  productsAdded: 12,
  lastLogin: new Date(),
}

// Actions pour les produits
export async function getProducts(): Promise<Product[]> {
  // Simulation d'un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProducts
}

export async function createProduct(prevState: any, formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const buy_price = Number.parseFloat(formData.get("buy_price") as string)
    const stock_qty = Number.parseInt(formData.get("stock_qty") as string)
    const min_stock_alert = Number.parseInt(formData.get("min_stock_alert") as string) || 10
    const category = formData.get("category") as string
    const barcode = formData.get("barcode") as string

    if (!name || isNaN(buy_price) || isNaN(stock_qty)) {
      return { success: false, error: "Veuillez remplir tous les champs obligatoires" }
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      description,
      buy_price,
      stock_qty,
      min_stock_alert,
      category,
      barcode,
      created_at: new Date(),
      updated_at: new Date(),
    }

    mockProducts.push(newProduct)
    revalidatePath("/produits")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de la création du produit" }
  }
}

// Actions pour les ventes
export async function getSales(): Promise<Sale[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockSales
}

export async function createSale(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const client_name = formData.get("client_name") as string
    const client_phone = formData.get("client_phone") as string
    const total_buy = Number.parseFloat(formData.get("total_buy") as string)
    const total_sell = Number.parseFloat(formData.get("total_sell") as string)
    const profit = total_sell - total_buy

    const newSale: Sale = {
      id: Date.now().toString(),
      client_name,
      client_phone,
      sale_date: new Date(),
      total_buy,
      total_sell,
      profit,
      status: "completed",
    }

    mockSales.push(newSale)
    revalidatePath("/ventes")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Erreur lors de la création de la vente" }
  }
}

// Actions pour les mouvements de stock
export async function getStockMovements(): Promise<StockMovement[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockStockMovements.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

// Actions pour le journal d'activité
export async function getActivityLog(): Promise<ActivityLogEntry[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockActivityLog.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

// Actions pour le tableau de bord
export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const totalStockValue = mockProducts.reduce((sum, product) => sum + product.buy_price * product.stock_qty, 0)
  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.total_sell, 0)
  const totalProfit = mockSales.reduce((sum, sale) => sum + sale.profit, 0)
  const lowStockProducts = mockProducts.filter((product) => product.stock_qty <= product.min_stock_alert).length

  return {
    totalStockValue,
    totalRevenue,
    totalProfit,
    totalProducts: mockProducts.length,
    lowStockProducts,
    recentSales: mockSales.slice(-5),
    topProducts: [],
  }
}

// Actions pour le profil utilisateur
export async function getUserProfile() {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockUser
}

export async function getUserStats() {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockUserStats
}
