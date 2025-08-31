// components/products/ProductsContentWrapper.tsx
import { Suspense } from "react"
import { ProductsStats } from "@/components/products/products-stats"
import { ProductsTable } from "@/components/products/products-table"
import { ProductsPagination } from "@/components/products/ProductsPagination"
import { getProductsPaginated, type PaginatedProducts } from "@/lib/actions/product-actions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "../ui/skeleton"

type StockFilterType = 'in_stock' | 'low_stock' | 'out_of_stock' | undefined;

interface ProductsWrapperProps {
  searchQuery?: string
  stockFilter?: string
  page?: number
  perPage?: number
}

// Async component that fetches data
async function ProductsWrapper({ 
  searchQuery, 
  stockFilter,
  page = 1,
  perPage = 10
}: ProductsWrapperProps) {
  // Get paginated products
  const paginatedData: PaginatedProducts = await getProductsPaginated({
    page,
    perPage,
    searchQuery: searchQuery?.trim(),
    stockFilter: (stockFilter === 'in_stock' || stockFilter === 'low_stock' || stockFilter === 'out_of_stock') 
      ? stockFilter as StockFilterType 
      : undefined
  })

  const { products, totalCount, totalPages, currentPage } = paginatedData

  return (
    <>
      <ProductsStats 
        products={products} 
        totalCount={totalCount}
        currentFilters={{ searchQuery, stockFilter }}
      />
      <ProductsTable products={products} />
      {totalPages > 1 && (
        <ProductsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          perPage={perPage}
        />
      )}
    </>
  )
}

// Main component with Suspense wrapper
export function ProductsContentWrapper(props: ProductsWrapperProps) {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsWrapper {...props} />
    </Suspense>
  )
}

export function ProductsLoading() {
  return (
    <div className="space-y-6">
      {/* Stats loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="ml-4 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table loading */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 border rounded">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pagination loading */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  )
}