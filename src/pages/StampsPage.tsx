import { StampGrid } from '../components/StampGrid'
import { useStore } from '../context/StoreContext'
import { REGION_LABEL } from '../data/regions'

export function StampsPage() {
  const { stampList, progress } = useStore()

  return (
    <div className="page">
      <h1 className="page-title">스탬프투어</h1>
      <section className="stamp-panel">
        <h3>지역 먹거리를 사면 스탬프가 쌓여요</h3>
        <p>
          상품을 주문 완료하면 산지 지역 도장이 적립됩니다. 지역별로 도장은 한
          개만 모을 수 있어요.
        </p>
        <StampGrid stamps={stampList} />
        <div className="stamp-progress">
          <span>수집 현황</span>
          <strong>
            {progress.count} / {progress.total}
          </strong>
        </div>
      </section>

      <div className="list-stack" style={{ marginTop: 16 }}>
        {stampList.map((stamp) => (
          <div key={stamp.id} className="product-row" style={{ alignItems: 'center' }}>
            <div
              className={`stamp ${stamp.collected ? 'filled' : 'empty'}`}
              style={{ width: 72, height: 72 }}
            >
              {REGION_LABEL[stamp.id]}
            </div>
            <div>
              <strong>{stamp.name}</strong>
              <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>
                {stamp.collected
                  ? '도장을 모았어요'
                  : '해당 지역 상품을 주문하면 채워집니다'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
