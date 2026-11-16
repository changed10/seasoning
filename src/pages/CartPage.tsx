import { Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice, getProduct } from '../data/products'

export function CartPage() {
  const navigate = useNavigate()
  const {
    cart,
    cartTotal,
    setQuantity,
    removeFromCart,
    completeOrder,
  } = useStore()

  const handleOrder = () => {
    if (cart.length === 0) return
    completeOrder()
    navigate('/order-complete', { replace: true })
  }

  return (
    <div className="page">
      <h1 className="page-title">장바구니</h1>

      {cart.length === 0 ? (
        <div className="empty">
          장바구니가 비어 있어요.
          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              className="add-btn"
              style={{ width: 'auto', paddingInline: 18 }}
              onClick={() => navigate('/products')}
            >
              제철상품 보러가기
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => {
              const product = getProduct(item.productId)
              if (!product) return null
              return (
                <div key={item.productId} className="cart-item">
                  <img src={product.image} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <div className="muted" style={{ fontSize: 12 }}>
                      {product.origin} · {product.weight}
                    </div>
                    <div style={{ fontWeight: 700, marginTop: 4 }}>
                      {formatPrice(product.price * item.quantity)}
                    </div>
                    <div className="qty">
                      <button
                        type="button"
                        aria-label="수량 감소"
                        onClick={() =>
                          setQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        aria-label="수량 증가"
                        onClick={() =>
                          setQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    aria-label={`${product.name} 삭제`}
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )
            })}
          </div>

          <div className="cart-summary">
            <div className="row">
              <span>상품 합계</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <div className="row muted" style={{ fontSize: 13 }}>
              <span>배송비</span>
              <span>테스트 주문 · 무료</span>
            </div>
            <div className="row total">
              <span>결제 예정</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <button type="button" className="primary-btn" onClick={handleOrder}>
              테스트 주문하기
            </button>
          </div>
        </>
      )}
    </div>
  )
}
