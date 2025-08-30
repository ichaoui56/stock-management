"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const salesData = [
  { name: "Lun", ventes: 2400, profits: 800 },
  { name: "Mar", ventes: 1398, profits: 600 },
  { name: "Mer", ventes: 9800, profits: 3200 },
  { name: "Jeu", ventes: 3908, profits: 1200 },
  { name: "Ven", ventes: 4800, profits: 1800 },
  { name: "Sam", ventes: 3800, profits: 1400 },
  { name: "Dim", ventes: 4300, profits: 1600 },
]

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Évolution des Ventes (7 derniers jours)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-muted-foreground" fontSize={12} />
            <YAxis className="text-muted-foreground" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString("fr-FR")} €`,
                name === "ventes" ? "Ventes" : "Profits",
              ]}
            />
            <Area
              type="monotone"
              dataKey="ventes"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="profits"
              stackId="2"
              stroke="hsl(var(--accent))"
              fill="hsl(var(--accent))"
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
