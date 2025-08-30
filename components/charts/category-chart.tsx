"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const categoryData = [
  { name: "Informatique", value: 45, color: "hsl(var(--primary))" },
  { name: "Accessoires", value: 30, color: "hsl(var(--accent))" },
  { name: "Téléphonie", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Audio", value: 10, color: "hsl(var(--chart-4))" },
]

export function CategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition par Catégorie</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, "Pourcentage"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
