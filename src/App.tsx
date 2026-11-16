import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useOutletContext } from 'react-router-dom'
import { Layout, type AppOutletContext } from './components/Layout'
import { StoreProvider } from './context/StoreContext'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { OrderCompletePage } from './pages/OrderCompletePage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { RecipeDetailPage } from './pages/RecipeDetailPage'
import { RecipesPage } from './pages/RecipesPage'
import { StampsPage } from './pages/StampsPage'

function withNotify(
  Page: (props: { onAdded: (name: string) => void }) => ReactNode,
) {
  return function Wrapped() {
    const { notify } = useOutletContext<AppOutletContext>()
    return <Page onAdded={notify} />
  }
}

const Home = withNotify(HomePage)
const Products = withNotify(ProductsPage)
const ProductDetail = withNotify(ProductDetailPage)

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="recipes" element={<RecipesPage />} />
            <Route path="recipes/:id" element={<RecipeDetailPage />} />
            <Route path="stamps" element={<StampsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order-complete" element={<OrderCompletePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
