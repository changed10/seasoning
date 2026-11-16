import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { getProduct } from '../data/products'
import { INITIAL_STAMPS, stampProgress, toStampList } from '../data/regions'
import type { CartItem, RegionId } from '../types'

const CART_KEY = 'seasoning.cart'
const STAMPS_KEY = 'seasoning.stamps'

interface StoreContextValue {
  cart: CartItem[]
  stamps: Record<RegionId, boolean>
  stampList: ReturnType<typeof toStampList>
  progress: { count: number; total: number }
  cartCount: number
  cartTotal: number
  addToCart: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  completeOrder: () => { earned: RegionId[]; alreadyHad: RegionId[] }
}

const StoreContext = createContext<StoreContextValue | null>(null)

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item) =>
        typeof item?.productId === 'string' &&
        typeof item?.quantity === 'number' &&
        item.quantity > 0 &&
        Boolean(getProduct(item.productId)),
    )
  } catch {
    return []
  }
}

function readStamps(): Record<RegionId, boolean> {
  try {
    const raw = localStorage.getItem(STAMPS_KEY)
    if (!raw) return { ...INITIAL_STAMPS }
    const parsed = JSON.parse(raw) as Partial<Record<RegionId, boolean>>
    return {
      jeju: Boolean(parsed.jeju ?? INITIAL_STAMPS.jeju),
      gyeongbuk: Boolean(parsed.gyeongbuk ?? INITIAL_STAMPS.gyeongbuk),
      gyeongnam: Boolean(parsed.gyeongnam ?? INITIAL_STAMPS.gyeongnam),
      jeonnam: Boolean(parsed.jeonnam ?? INITIAL_STAMPS.jeonnam),
    }
  } catch {
    return { ...INITIAL_STAMPS }
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readCart())
  const [stamps, setStamps] = useState<Record<RegionId, boolean>>(() =>
    readStamps(),
  )
  const cartRef = useRef(cart)
  const stampsRef = useRef(stamps)
  cartRef.current = cart
  stampsRef.current = stamps

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(STAMPS_KEY, JSON.stringify(stamps))
  }, [stamps])

  const addToCart = useCallback((productId: string, quantity = 1) => {
    if (!getProduct(productId)) return
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prev, { productId, quantity }]
    })
  }, [])

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.productId !== productId)
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      )
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const completeOrder = useCallback(() => {
    const earned: RegionId[] = []
    const alreadyHad: RegionId[] = []
    const next = { ...stampsRef.current }

    for (const item of cartRef.current) {
      const product = getProduct(item.productId)
      if (!product) continue
      if (next[product.regionId]) {
        if (!alreadyHad.includes(product.regionId)) {
          alreadyHad.push(product.regionId)
        }
      } else {
        next[product.regionId] = true
        if (!earned.includes(product.regionId)) {
          earned.push(product.regionId)
        }
      }
    }

    setStamps(next)
    setCart([])
    return { earned, alreadyHad }
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProduct(item.productId)
        return sum + (product?.price ?? 0) * item.quantity
      }, 0),
    [cart],
  )

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      stamps,
      stampList: toStampList(stamps),
      progress: stampProgress(stamps),
      cartCount,
      cartTotal,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      completeOrder,
    }),
    [
      cart,
      stamps,
      cartCount,
      cartTotal,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      completeOrder,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
