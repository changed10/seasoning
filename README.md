# Seasoning · 제철장터

한국어 제철 식품 쇼핑 웹앱입니다. 모바일 홈에서 제철 상품을 담고, 테스트 주문으로 지역 스탬프를 모을 수 있습니다.

## 기능

- 홈 / 제철상품 / 레시피추천 / 스탬프투어 탭
- 상품명·산지 검색, 장바구니(수량 변경·삭제·합계)
- **테스트 주문하기**: 결제 연동 없이 주문 완료 + 산지 스탬프 적립
- 지역별 스탬프 1개 제한, 장바구니·스탬프 `localStorage` 유지

## 실행

```bash
npm install
npm run dev
```

개발 서버는 `http://localhost:3847` 에서 실행됩니다.

```bash
npm run build
npm run preview
```

## 스택

React · TypeScript · Vite · React Router · lucide-react
