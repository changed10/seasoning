import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  onAdded?: (name: string) => void
}

export function ProductCard({ product, onAdded }: ProductCardProps) {
  const navigate = useNavigate()
  const { addToCart } = useStore()

  return (
    <article className="product-card">
      <button
        type="button"
        className="media"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
      </button>
      <div className="product-body">
        <button
          type="button"
          className="media"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <div className="product-origin">{product.origin}</div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-meta">{product.weight}</div>
          <div className="product-price">{formatPrice(product.price)}</div>
        </button>
        <button
          type="button"
          className="add-btn"
          onClick={() => {
            addToCart(product.id)
            onAdded?.(product.name)
          }}
        >
          + 담기
        </button>
      </div>
    </article>
  )
}
