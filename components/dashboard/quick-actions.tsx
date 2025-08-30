import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Package, ShoppingCart, FileText, Download, Upload } from "lucide-react"

const quickActions = [
  {
    title: "Nouvelle Vente",
    description: "Enregistrer une vente rapide",
    icon: ShoppingCart,
    href: "/ventes/nouvelle",
    variant: "default" as const,
  },
  {
    title: "Ajouter Produit",
    description: "Créer un nouveau produit",
    icon: Plus,
    href: "/produits/nouveau",
    variant: "outline" as const,
  },
  {
    title: "Ajuster Stock",
    description: "Modifier les quantités",
    icon: Package,
    href: "/stock/ajuster",
    variant: "outline" as const,
  },
  {
    title: "Générer Rapport",
    description: "Exporter les données",
    icon: FileText,
    href: "/rapports",
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-center gap-2 text-center"
            >
              <action.icon className="w-6 h-6" />
              <div>
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Importer
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
