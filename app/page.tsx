import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getDashboardStats } from "@/lib/actions"
import { SalesChart } from "@/components/charts/sales-chart"
import { CategoryChart } from "@/components/charts/category-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Package, Euro, TrendingUp, AlertTriangle, Plus, FileDown } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const session = await auth()

  if (!session) {
    redirect("/connexion")
  }

  return (
    <DashboardLayout title="Tableau de Bord" subtitle="Planifiez, priorisez et gérez votre stock avec facilité.">
      <div className="space-y-6">
        {/* Actions rapides en haut */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter Produit
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileDown className="w-4 h-4" />
              Importer Données
            </Button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Valeur du Stock"
            value={`${stats.totalStockValue.toLocaleString("fr-FR")} MAD`}
            subtitle="Valeur totale des produits"
            variant="primary"
            icon={<Package className="w-6 h-6 text-primary-foreground" />}
            trend={{
              value: 12,
              isPositive: true,
              label: "depuis le mois dernier",
            }}
          />

          <StatCard
            title="Chiffre d'Affaires"
            value={`${stats.totalRevenue.toLocaleString("fr-FR")} MAD`}
            subtitle="Revenus totaux"
            icon={<Euro className="w-6 h-6 text-muted-foreground" />}
            trend={{
              value: 8,
              isPositive: true,
              label: "depuis le mois dernier",
            }}
          />

          <StatCard
            title="Bénéfices"
            value={`${stats.totalProfit.toLocaleString("fr-FR")} MAD`}
            subtitle="Profits réalisés"
            icon={<TrendingUp className="w-6 h-6 text-muted-foreground" />}
            trend={{
              value: 15,
              isPositive: true,
              label: "depuis le mois dernier",
            }}
          />

          <StatCard
            title="Stock Faible"
            value={stats.lowStockProducts}
            subtitle="Produits à réapprovisionner"
            icon={<AlertTriangle className="w-6 h-6 text-orange-500" />}
            className={stats.lowStockProducts > 0 ? "border-orange-200 bg-orange-50" : ""}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <CategoryChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed />
          </div>
          <QuickActions />
        </div>

        {/* Section existante réorganisée */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ventes récentes */}
          <Card>
            <CardHeader>
              <CardTitle>Ventes Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentSales.length > 0 ? (
                  stats.recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{sale.client_name || "Client anonyme"}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(sale.sale_date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{sale.total_sell.toLocaleString("fr-FR")} MAD</p>
                        <p className="text-sm text-green-600">+{sale.profit.toLocaleString("fr-FR")} MAD profit</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">Aucune vente récente</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Alertes stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Alertes Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <p className="font-medium">Souris Logitech</p>
                    <p className="text-sm text-muted-foreground">Stock: 8 unités</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Réapprovisionner
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <p className="font-medium">Écran 24 pouces</p>
                    <p className="text-sm text-muted-foreground">Stock: 3 unités</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Réapprovisionner
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
