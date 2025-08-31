"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface ProductsPaginationProps {
  currentPage: number
  totalPages: number
  totalCount: number
  perPage: number
}

export function ProductsPagination({
  currentPage,
  totalPages,
  totalCount,
  perPage
}: ProductsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    
    // Use push instead of replace to allow back navigation
    router.push(`/produits?${params.toString()}`)
  }

  const changePerPage = (newPerPage: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newPerPage !== '10') {
      params.set('per_page', newPerPage)
    } else {
      params.delete('per_page')
    }
    
    // Reset to page 1 when changing per page
    params.delete('page')
    router.push(`/produits?${params.toString()}`)
  }

  // Fixed pagination range calculation
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots:any = []

    // Handle edge case where there are no pages
    if (totalPages <= 1) return [1]

    // Calculate the range around current page
    const start = Math.max(2, currentPage - delta)
    const end = Math.min(totalPages - 1, currentPage + delta)

    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    // Always show page 1
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    // Add the calculated range (avoiding duplicates)
    range.forEach(pageNum => {
      if (!rangeWithDots.includes(pageNum)) {
        rangeWithDots.push(pageNum)
      }
    })

    // Always show last page (if it's not already included)
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1 && !rangeWithDots.includes(totalPages)) {
      rangeWithDots.push(totalPages)
    }

    // Remove duplicates and sort
    return rangeWithDots.filter((item:any, index:any, arr:any) => 
      index === 0 || item !== arr[index - 1]
    )
  }

  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalCount)

  // Always show pagination - let the component handle its own visibility
  // if (totalPages <= 1 && currentPage === 1) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div>
          Affichage de {startItem} à {endItem} sur {totalCount} produits
        </div>
        
        <div className="flex items-center gap-2">
          <span>Éléments par page:</span>
          <Select value={perPage.toString()} onValueChange={changePerPage}>
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* First page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNumber:any, index:any) => (
            <div key={`${pageNumber}-${index}`}>
              {pageNumber === '...' ? (
                <span className="px-2 py-1 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigateToPage(pageNumber as number)}
                  className="h-8 w-8 p-0"
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 p-0"
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}