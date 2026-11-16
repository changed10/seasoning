import { useNavigate } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { StampGrid } from '../components/StampGrid'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'
import { recipes } from '../data/recipes'

interface HomePageProps {
  onAdded: (name: string) => void
}

export function HomePage({ onAdded }: HomePageProps) {
  const navigate = useNavigate()
  const { stampList, progress } = useStore()
  const featured = products.filter((p) => p.featuredOnHome).slice(0, 2)
  const recipe = recipes[0]
  const bannerImage =
    products.find((p) => p.id === 'tangerine')?.image ?? recipe.image

  return (
    <div className="page">
      <section className="hero" aria-label="메인 배너">
        <img src={bannerImage} alt="제주 감귤" />
        <div className="hero-overlay">
          <span className="hero-label">1월 산지직송</span>
          <h1>지금 가장 맛있는 꼬막</h1>
          <button
            type="button"
            className="hero-cta"
            onClick={() => navigate('/products/komak')}
          >
            꼬막 보러 가기
          </button>
        </div>
      </section>

      <div className="section-head">
        <div>
          <h2>지금이 제철</h2>
          <p>산지에서 바로 올라온 제철 먹거리</p>
        </div>
        <button
          type="button"
          className="link-btn"
          onClick={() => navigate('/products')}
        >
          전체보기
        </button>
      </div>

      <div className="product-grid">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdded={onAdded}
          />
        ))}
      </div>

      <div className="section-head">
        <div>
          <h2>제철 레시피</h2>
          <p>오늘 장본 재료로 바로 만들어 보세요</p>
        </div>
      </div>

      <button
        type="button"
        className="recipe-card"
        onClick={() => navigate(`/recipes/${recipe.id}`)}
      >
        <img src={recipe.image} alt={recipe.title} />
        <div className="recipe-card-copy">
          <span>제철 한 접시</span>
          <strong>{recipe.title}</strong>
        </div>
      </button>

      <div className="section-head">
        <div>
          <h2>스탬프투어</h2>
          <p>지역 먹거리를 사면 스탬프가 쌓여요</p>
        </div>
        <button
          type="button"
          className="link-btn"
          onClick={() => navigate('/stamps')}
        >
          자세히
        </button>
      </div>

      <section className="stamp-panel">
        <h3>지역 먹거리를 사면 스탬프가 쌓여요</h3>
        <p>제주 · 경북 · 경남 · 전남 도장을 모아보세요</p>
        <StampGrid stamps={stampList} />
        <div className="stamp-progress">
          <span>수집 현황</span>
          <strong>
            {progress.count} / {progress.total}
          </strong>
        </div>
      </section>
    </div>
  )
}
