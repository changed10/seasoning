import { useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice, getProduct } from '../data/products'
import { REGION_LABEL } from '../data/regions'

interface ProductDetailPageProps {
  onAdded: (name: string) => void
}

export function ProductDetailPage({ onAdded }: ProductDetailPageProps) {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { addToCart } = useStore()

  if (!product) {
    return (
      <div className="page">
        <div className="empty">상품을 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="detail-hero">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="detail-body">
        <div className="origin">
          {product.origin} · {REGION_LABEL[product.regionId]} 스탬프
        </div>
        <h1>
          {product.name} {product.weight}
        </h1>
        <div className="price">{formatPrice(product.price)}</div>
        <p className="desc">{product.description}</p>
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            addToCart(product.id)
            onAdded(product.name)
          }}
        >
          + 담기
        </button>
      </div>
    </div>
  )
}
