import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StampGrid } from '../components/StampGrid'
import { useStore } from '../context/StoreContext'

export function OrderCompletePage() {
  const navigate = useNavigate()
  const { stampList, progress } = useStore()

  return (
    <div className="page">
      <div className="complete">
        <div className="complete-icon">
          <Check size={34} />
        </div>
        <h1>주문이 완료됐어요</h1>
        <p>
          테스트 주문이 반영되었습니다.
          <br />
          장바구니는 비워졌고, 산지 스탬프가 적립됐어요.
        </p>
      </div>

      <section className="stamp-panel">
        <h3>업데이트된 스탬프</h3>
        <p>같은 지역은 중복 적립되지 않습니다</p>
        <StampGrid stamps={stampList} />
        <div className="stamp-progress">
          <span>수집 현황</span>
          <strong>
            {progress.count} / {progress.total}
          </strong>
        </div>
      </section>

      <button
        type="button"
        className="primary-btn"
        onClick={() => navigate('/')}
      >
        홈으로 돌아가기
      </button>
      <button
        type="button"
        className="add-btn ghost"
        style={{ marginTop: 10 }}
        onClick={() => navigate('/stamps')}
      >
        스탬프투어 보기
      </button>
    </div>
  )
}
