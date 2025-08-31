// lib/pdf-export.ts
import { jsPDF } from 'jspdf'
import autoTable, { UserOptions } from 'jspdf-autotable'

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}
import type { Product } from '@/lib/actions/product-actions'

interface ExportStats {
  totalProducts: number
  totalStockValue: number
  totalUnits: number
  lowStockProducts: number
  outOfStockProducts: number
}

interface ExportFilters {
  searchQuery?: string
  stockFilter?: string
  dateRange?: string
}

export const generateProductsPDF = (
  products: Product[],
  stats: ExportStats,
  filters?: ExportFilters
) => {
  // Create new PDF document
  const doc = new jsPDF('p', 'mm', 'a4')
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let currentY = 20

  // Professional color palette - explicitly typed as ColorValue[]
  const darkBlue: [number, number, number] = [25, 35, 50]      // #19232e
  const mediumBlue: [number, number, number] = [52, 73, 94]    // #34495e
  const lightGray: [number, number, number] = [236, 240, 241]  // #ecf0f1
  const darkGray: [number, number, number] = [52, 58, 64]      // #343a40
  const green: [number, number, number] = [39, 174, 96]        // #27ae60
  const orange: [number, number, number] = [230, 126, 34]      // #e67e22
  const red: [number, number, number] = [231, 76, 60]          // #e74c3c

  // Helper function to format currency properly
  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString('fr-FR', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    })} MAD`
  }
  

  // Helper function to format numbers properly
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  // Helper function to add header
  const addHeader = () => {
    // Professional header with gradient effect
    doc.setFillColor(darkBlue[0], darkBlue[1], darkBlue[2])
    doc.rect(0, 0, pageWidth, 45, 'F')
    
    // Add subtle accent line
    doc.setFillColor(mediumBlue[0], mediumBlue[1], mediumBlue[2])
    doc.rect(0, 40, pageWidth, 5, 'F')
    
    // Company logo placeholder (you can replace with actual logo)
    doc.setFillColor(255, 255, 255)
    doc.circle(25, 22, 8, 'F')
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2])
    doc.setFontSize(12)
    doc.setFont('times', 'bold')
    doc.text('PMS', 25, 25, { align: 'center' })
    
    // Title
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('times', 'bold')
    doc.text('RAPPORT D\'INVENTAIRE', pageWidth / 2, 20, { align: 'center' })
    
    doc.setFontSize(12)
    doc.setFont('times', 'normal')
    doc.text('Système de Gestion des Produits', pageWidth / 2, 30, { align: 'center' })
    
    currentY = 55
  }

  // Helper function to add document info
  const addDocumentInfo = () => {
    // Document info box
    doc.setFillColor(...lightGray)
    doc.rect(20, currentY, pageWidth - 40, 25, 'F')
    doc.setDrawColor(...mediumBlue)
    doc.setLineWidth(0.5)
    doc.rect(20, currentY, pageWidth - 40, 25)
    
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFontSize(11)
    doc.setFont('times', 'normal')
    
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    const currentTime = new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
    
    doc.text(`Date de génération: ${currentDate} à ${currentTime}`, 25, currentY + 8)
    doc.text(`Nombre total de produits: ${formatNumber(products.length)}`, 25, currentY + 15)
    
    // Add filters if applied
    if (filters?.searchQuery || filters?.stockFilter) {
      currentY += 30
      
      doc.setFillColor(250, 250, 250)
      doc.rect(20, currentY, pageWidth - 40, 20, 'F')
      doc.setDrawColor(...mediumBlue)
      doc.rect(20, currentY, pageWidth - 40, 20)
      
      doc.setFont('times', 'bold')
      doc.text('Filtres appliqués:', 25, currentY + 8)
      doc.setFont('times', 'normal')
      
      let filterText = ''
      if (filters.searchQuery) {
        filterText += `Recherche: "${filters.searchQuery}"`
      }
      
      if (filters.stockFilter && filters.stockFilter !== 'all') {
        const filterLabels: any = {
          'in_stock': 'En stock (>10 unités)',
          'low_stock': 'Stock faible (1-10 unités)',
          'out_of_stock': 'Rupture de stock'
        }
        if (filterText) filterText += ' | '
        filterText += `Statut: ${filterLabels[filters.stockFilter]}`
      }
      
      doc.text(filterText, 25, currentY + 15)
      currentY += 25
    } else {
      currentY += 30
    }
  }

  // Helper function to add statistics section
  const addStatistics = () => {
    // Section header
    doc.setFillColor(...mediumBlue)
    doc.rect(20, currentY, pageWidth - 40, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont('times', 'bold')
    doc.text('RÉSUMÉ STATISTIQUE', 25, currentY + 8)
    
    currentY += 20

    // Statistics in a clean grid layout
    const statsData = [
      {
        label: 'Total Produits',
        value: formatNumber(stats.totalProducts),
        color: mediumBlue
      },
      {
        label: 'Valeur du Stock',
        value: formatCurrency(stats.totalStockValue),
        color: green
      },
      {
        label: 'Unités Totales',
        value: formatNumber(stats.totalUnits),
        color: mediumBlue
      },
      {
        label: 'Stock Faible',
        value: formatNumber(stats.lowStockProducts),
        color: orange
      },
      {
        label: 'Ruptures de Stock',
        value: formatNumber(stats.outOfStockProducts),
        color: red
      }
    ]

    // Professional statistics table
    autoTable(doc, {
      startY: currentY,
      head: [['Indicateur', 'Valeur']],
      body: statsData.map(stat => [stat.label, stat.value]),
      theme: 'grid',
      styles: {
        fontSize: 11,
        cellPadding: 5,
        textColor: darkGray,
        font: 'times'
      },
      headStyles: {
        fillColor: mediumBlue,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 12
      },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: 'bold' },
        1: { cellWidth: 60, halign: 'right', fontStyle: 'bold' }
      },
      margin: { left: 20, right: 20 }
    })

    currentY = doc.lastAutoTable.finalY + 20;
  }

  // Helper function to add products table
  const addProductsTable = () => {
    // Section header
    doc.setFillColor(...mediumBlue)
    doc.rect(20, currentY, pageWidth - 40, 12, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(14)
    doc.setFont('times', 'bold')
    doc.text('INVENTAIRE DÉTAILLÉ', 25, currentY + 8)
    
    currentY += 20

    // Prepare table data with proper formatting
    const tableData = products.map((product, index) => {
      const totalValue = product.buyPrice * product.stockQty
      const status = product.stockQty === 0 ? 'Rupture' : 
                    product.stockQty <= 10 ? 'Stock faible' : 'En stock'
      
      return [
        (index + 1).toString(),
        product.name,
        product.description || '-',
        formatCurrency(product.buyPrice),
        formatNumber(product.stockQty),
        status,
        formatCurrency(totalValue)
      ]
    })

    // Professional products table
    autoTable(doc, {
      startY: currentY,
      head: [[
        'N°',
        'Nom du Produit',
        'Description',
        'Prix Unitaire',
        'Quantité',
        'Statut',
        'Valeur Totale'
      ]],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 4,
        textColor: darkGray,
        font: 'times',
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: mediumBlue,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 45, fontStyle: 'bold' },
        2: { cellWidth: 50 },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 18, halign: 'center' },
        5: { cellWidth: 25, halign: 'center' },
        6: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
      },
      didParseCell: (data: any) => {
        // Color code status column
        if (data.column.index === 5 && data.cell.text && Array.isArray(data.cell.text) && data.cell.text.length > 0) {
          const status = data.cell.text[0];
          if (status === 'Rupture') {
            data.cell.styles.textColor = red;
            data.cell.styles.fontStyle = 'bold';
          } else if (status === 'Stock faible') {
            data.cell.styles.textColor = orange;
            data.cell.styles.fontStyle = 'bold';
          } else {
            data.cell.styles.textColor = green;
            data.cell.styles.fontStyle = 'bold';
          }
        }
        
        // Alternate row colors for better readability
        if (data.row.index % 2 === 0 && data.section === 'body') {
          data.cell.styles.fillColor = [249, 250, 251]
        }
      },
      margin: { left: 20, right: 20 },
      tableWidth: 'wrap'
    })

    currentY = doc.lastAutoTable.finalY + 15
  }

  // Helper function to add professional footer
  const addFooter = () => {
    const pageCount = doc.getNumberOfPages()
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      
      // Footer background
      doc.setFillColor(...lightGray)
      doc.rect(0, pageHeight - 25, pageWidth, 25, 'F')
      
      // Footer border
      doc.setDrawColor(...mediumBlue)
      doc.setLineWidth(0.8)
      doc.line(0, pageHeight - 25, pageWidth, pageHeight - 25)
      
      // Footer content
      doc.setFontSize(9)
      doc.setFont('times', 'normal')
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      
      // Left: Company info
      doc.text(
        'Système de Gestion des Produits - Rapport Confidentiel',
        20,
        pageHeight - 15
      )
      
      // Center: Generation date
      doc.text(
        `Généré le ${new Date().toLocaleDateString('fr-FR')}`,
        pageWidth / 2,
        pageHeight - 15,
        { align: 'center' }
      )
      
      // Right: Page number
      doc.setFont('times', 'bold')
      doc.text(
        `Page ${i} / ${pageCount}`,
        pageWidth - 20,
        pageHeight - 15,
        { align: 'right' }
      )
    }
  }

  // Helper function to add summary section
  const addSummarySection = () => {
    // Calculate additional metrics
    const averagePrice = stats.totalProducts > 0 ? stats.totalStockValue / stats.totalUnits : 0
    const stockHealthPercentage = stats.totalProducts > 0 ? 
      ((stats.totalProducts - stats.outOfStockProducts - stats.lowStockProducts) / stats.totalProducts * 100) : 0

    // Summary box
    doc.setFillColor(248, 249, 250)
    doc.rect(20, currentY, pageWidth - 40, 40, 'F')
    doc.setDrawColor(...mediumBlue)
    doc.setLineWidth(0.5)
    doc.rect(20, currentY, pageWidth - 40, 40)

    // Summary title
    doc.setTextColor(darkBlue[0], darkBlue[1], darkBlue[2])
    doc.setFontSize(12)
    doc.setFont('times', 'bold')
    doc.text('RÉSUMÉ EXÉCUTIF', 25, currentY + 10)

    // Summary content
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
    doc.setFontSize(10)
    doc.setFont('times', 'normal')
    
    const summaryLines = [
      `• Inventaire de ${formatNumber(stats.totalProducts)} produits pour une valeur totale de ${formatCurrency(stats.totalStockValue)}`,
      `• Prix moyen par unité: ${formatCurrency(averagePrice)}`,
      `• Santé du stock: ${stockHealthPercentage.toFixed(1)}% des produits en stock suffisant`,
      `• Attention requise: ${formatNumber(stats.lowStockProducts + stats.outOfStockProducts)} produits nécessitent un réapprovisionnement`
    ]

    summaryLines.forEach((line, index) => {
      doc.text(line, 25, currentY + 18 + (index * 5))
    })

    currentY += 50
  }

  // Generate PDF
  try {
    addHeader()
    addDocumentInfo()
    
    // Check if we need a new page for summary
    if (currentY > pageHeight - 80) {
      doc.addPage()
      currentY = 20
    }
    
    addSummarySection()
    
    // Check if we need a new page for statistics
    if (currentY > pageHeight - 60) {
      doc.addPage()
      currentY = 20
    }
    
    addStatistics()
    
    // Check if we need a new page for table
    if (currentY > pageHeight - 100) {
      doc.addPage()
      currentY = 20
    }
    
    addProductsTable()
    
    // Add professional footer
    addFooter()

    return doc
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Erreur lors de la génération du PDF')
  }
}