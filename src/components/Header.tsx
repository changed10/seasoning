import { ArrowLeft, Search, ShoppingCart, Sprout } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onSearch?: () => void
  hideActions?: boolean
}

export function Header({
  title,
  showBack = false,
  onSearch,
  hideActions = false,
}: HeaderProps) {
  const navigate = useNavigate()
  const { cartCount } = useStore()

  return (
    <header className="topbar">
      {showBack ? (
        <div className="back-row" style={{ margin: 0 }}>
          <button
            type="button"
            className="back-btn"
            aria-label="뒤로"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
          </button>
          <strong>{title}</strong>
        </div>
      ) : (
        <button type="button" className="brand" onClick={() => navigate('/')}>
          <span className="brand-mark" aria-hidden>
            <Sprout size={18} />
          </span>
          <span className="brand-text">
            <span className="brand-kicker">&lt;&lt;Seasoning&gt;&gt;</span>
            <span className="brand-name">{title ?? '제철장터'}</span>
          </span>
        </button>
      )}

      {!hideActions && (
        <div className="top-actions">
          {onSearch && (
            <button
              type="button"
              className="icon-btn"
              aria-label="검색"
              onClick={onSearch}
            >
              <Search size={18} />
            </button>
          )}
          <button
            type="button"
            className="icon-btn"
            aria-label="장바구니"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      )}
    </header>
  )
}
