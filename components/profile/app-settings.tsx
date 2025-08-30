"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Settings, Bell, Palette, Download, Trash2 } from "lucide-react"
import { useState } from "react"

export function AppSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    stockAlerts: true,
    darkMode: false,
    compactView: false,
    autoSave: true,
    currency: "EUR",
    dateFormat: "DD/MM/YYYY",
    language: "fr",
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications push</p>
              <p className="text-sm text-muted-foreground">Recevoir des notifications dans l'application</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(value) => handleSettingChange("notifications", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertes par email</p>
              <p className="text-sm text-muted-foreground">Recevoir des alertes importantes par email</p>
            </div>
            <Switch
              checked={settings.emailAlerts}
              onCheckedChange={(value) => handleSettingChange("emailAlerts", value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Alertes de stock</p>
              <p className="text-sm text-muted-foreground">Notifications pour les stocks faibles</p>
            </div>
            <Switch
              checked={settings.stockAlerts}
              onCheckedChange={(value) => handleSettingChange("stockAlerts", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Apparence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Apparence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mode sombre</p>
              <p className="text-sm text-muted-foreground">Utiliser le thème sombre</p>
            </div>
            <Switch checked={settings.darkMode} onCheckedChange={(value) => handleSettingChange("darkMode", value)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Vue compacte</p>
              <p className="text-sm text-muted-foreground">Affichage plus dense des données</p>
            </div>
            <Switch
              checked={settings.compactView}
              onCheckedChange={(value) => handleSettingChange("compactView", value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Préférences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Préférences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sauvegarde automatique</p>
              <p className="text-sm text-muted-foreground">Sauvegarder automatiquement les modifications</p>
            </div>
            <Switch checked={settings.autoSave} onCheckedChange={(value) => handleSettingChange("autoSave", value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Devise</Label>
              <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollar ($)</SelectItem>
                  <SelectItem value="GBP">Livre (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format de date</Label>
              <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange("dateFormat", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Exporter mes données
            </Button>
            <Button variant="outline" className="gap-2 text-destructive hover:text-destructive bg-transparent">
              <Trash2 className="w-4 h-4" />
              Supprimer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
