import type { Recipe } from '../types'

/** seasoning_ai.html 레시피 구조를 참고한 감귤 루꼴라 샐러드 */
export const recipes: Recipe[] = [
  {
    id: 'citrus-arugula',
    title: '감귤 루꼴라 샐러드',
    subtitle: '제철 감귤의 단맛과 루꼴라의 쌉싸름함이 만나 상큼한 한 접시',
    image: '/images/salad.jpg',
    time: '15분',
    servings: '2인분',
    ingredients: [
      { name: '제주 감귤', amount: '2개' },
      { name: '와일드 루꼴라', amount: '80g' },
      { name: '로메인', amount: '50g' },
      { name: '아보카도', amount: '1/2개' },
      { name: '페타치즈', amount: '30g' },
      { name: '석류알', amount: '2큰술' },
      { name: '감귤즙', amount: '2큰술' },
      { name: '올리브유', amount: '1큰술' },
      { name: '올리고당', amount: '1큰술' },
      { name: '소금·후추', amount: '약간' },
    ],
    steps: [
      '루꼴라와 로메인은 찬물에 헹군 뒤 물기를 털고, 한입 크기로 뜯어 준비합니다.',
      '감귤은 껍질을 벗겨 둥글게 슬라이스하고, 하나는 즙을 짜 드레싱용으로 남겨 둡니다.',
      '아보카도는 얇게 썰고, 석류는 알만 골라냅니다.',
      '감귤즙에 올리브유·올리고당·소금·후추를 넣고 잘 섞어 드레싱을 만듭니다.',
      '접시에 잎채소 → 감귤 슬라이스 → 아보카도 → 페타치즈 → 석류 순으로 올린 뒤 드레싱을 뿌려 바로 즐깁니다.',
    ],
    tip: '감귤은 제철장터 제주 감귤을 쓰면 당도가 살아 드레싱이 더 향긋해집니다.',
  },
]

export function getRecipe(id: string) {
  return recipes.find((r) => r.id === id)
}
