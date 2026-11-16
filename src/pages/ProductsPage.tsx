import { ProductCard } from '../components/ProductCard'
import { catalogProducts } from '../data/products'

interface ProductsPageProps {
  onAdded: (name: string) => void
}

export function ProductsPage({ onAdded }: ProductsPageProps) {
  return (
    <div className="page">
      <h1 className="page-title">제철상품</h1>
      <p className="muted" style={{ marginTop: -8, marginBottom: 16 }}>
        제주 감귤 · 청송 사과 · 통영 생굴 · 해남 고구마
      </p>
      <div className="product-grid">
        {catalogProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdded={onAdded}
          />
        ))}
      </div>
    </div>
  )
}
