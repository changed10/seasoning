import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Header } from './Header'
import { SearchSheet } from './SearchSheet'
import { Toast } from './Toast'

const HIDE_NAV = ['/cart', '/order-complete']

export function Layout() {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState('')

  const hideNav = HIDE_NAV.some((path) => location.pathname.startsWith(path))
  const isDetail =
    location.pathname.startsWith('/products/') ||
    location.pathname.startsWith('/recipes/')
  const showSearch =
    location.pathname === '/' || location.pathname.startsWith('/products')

  useEffect(() => {
    setSearchOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 1800)
    return () => window.clearTimeout(timer)
  }, [toast])

  return (
    <div className="app-shell">
      <div className="phone">
        <Header
          showBack={isDetail || hideNav}
          title={
            location.pathname.startsWith('/cart')
              ? '장바구니'
              : location.pathname.startsWith('/order-complete')
                ? '주문 완료'
                : isDetail
                  ? '상세'
                  : undefined
          }
          onSearch={showSearch ? () => setSearchOpen(true) : undefined}
          hideActions={location.pathname.startsWith('/order-complete')}
        />
        <div className={`phone-scroll${hideNav ? ' no-nav' : ''}`}>
          <Outlet context={{ notify: (name: string) => setToast(`${name}을(를) 담았어요`) }} />
        </div>
        {!hideNav && <BottomNav />}
        {searchOpen && <SearchSheet onClose={() => setSearchOpen(false)} />}
        <Toast message={toast} />
      </div>
    </div>
  )
}

export type AppOutletContext = {
  notify: (name: string) => void
}
