import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products, formatPrice } from '../data/products'

interface SearchSheetProps {
  onClose: () => void
}

export function SearchSheet({ onClose }: SearchSheetProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div
      className="search-sheet"
      role="dialog"
      aria-modal="true"
      aria-label="상품 검색"
      onClick={onClose}
    >
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="상품명 또는 산지로 검색"
          aria-label="상품명 또는 산지 검색"
        />
        <div className="search-results">
          {results.length === 0 && (
            <div className="empty">검색 결과가 없습니다.</div>
          )}
          {results.map((product) => (
            <button
              key={product.id}
              type="button"
              className="search-item"
              onClick={() => {
                onClose()
                navigate(`/products/${product.id}`)
              }}
            >
              <img src={product.image} alt="" />
              <div>
                <strong>{product.name}</strong>
                <div className="muted" style={{ fontSize: 12 }}>
                  {product.origin} · {formatPrice(product.price)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
