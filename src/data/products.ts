import type { Product } from '../types'

export const products: Product[] = [
  {
    id: 'komak',
    name: '벌교 새꼬막',
    origin: '전남 보성 벌교',
    regionId: 'jeonnam',
    weight: '1kg',
    price: 16800,
    description:
      '갯벌에서 갓 수확한 벌교 새꼬막입니다. 살이 통통하고 바다 향이 진해 찜·무침·탕에 모두 잘 어울립니다.',
    image: '/images/komak.jpg',
  },
  {
    id: 'tangerine',
    name: '제주 감귤',
    origin: '제주 서귀포',
    regionId: 'jeju',
    weight: '3kg',
    price: 15900,
    description:
      '당도 높은 제주 노지 감귤입니다. 얇은 껍질과 진한 단맛으로 제철 간식으로 딱 좋아요.',
    image: '/images/tangerine.jpg',
  },
  {
    id: 'apple',
    name: '청송 사과',
    origin: '경북 청송',
    regionId: 'gyeongbuk',
    weight: '2kg',
    price: 19900,
    description:
      '일교차가 큰 청송에서 자란 아삭한 사과입니다. 단맛과 신맛이 균형 있어 생과·주스 모두 추천합니다.',
    image: '/images/apple.jpg',
    featuredOnHome: true,
  },
  {
    id: 'oyster',
    name: '통영 생굴',
    origin: '경남 통영',
    regionId: 'gyeongnam',
    weight: '500g',
    price: 12900,
    description:
      '맑은 통영 바다에서 수확한 생굴입니다. 신선도가 생명인 만큼 산지 직송으로 빠르게 보내드립니다.',
    image: '/images/oyster.jpg',
    featuredOnHome: true,
  },
  {
    id: 'sweetpotato',
    name: '해남 호박고구마',
    origin: '전남 해남',
    regionId: 'jeonnam',
    weight: '2kg',
    price: 9900,
    description:
      '해남 황토에서 자란 호박고구마입니다. 찌거나 구우면 달콤한 밤맛이 살아납니다.',
    image: '/images/sweetpotato.jpg',
  },
]

export const catalogProducts = products.filter((p) =>
  ['tangerine', 'apple', 'oyster', 'sweetpotato'].includes(p.id),
)

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function formatPrice(price: number) {
  return `${price.toLocaleString('ko-KR')}원`
}
