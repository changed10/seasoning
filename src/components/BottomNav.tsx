import { Home, Leaf, MapPinned, UtensilsCrossed } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const items = [
  { path: '/', label: '홈', icon: Home },
  { path: '/products', label: '제철상품', icon: Leaf },
  { path: '/recipes', label: '레시피추천', icon: UtensilsCrossed },
  { path: '/stamps', label: '스탬프투어', icon: MapPinned },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {items.map(({ path, label, icon: Icon }) => {
        const active =
          path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)
        return (
          <button
            key={path}
            type="button"
            className={`nav-item${active ? ' active' : ''}`}
            onClick={() => navigate(path)}
          >
            <Icon size={20} strokeWidth={active ? 2.4 : 2} />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
