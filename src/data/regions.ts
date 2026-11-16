import type { RegionId, RegionStamp } from '../types'

export const REGION_ORDER: RegionId[] = [
  'jeju',
  'gyeongbuk',
  'gyeongnam',
  'jeonnam',
]

export const REGION_LABEL: Record<RegionId, string> = {
  jeju: '제주',
  gyeongbuk: '경북',
  gyeongnam: '경남',
  jeonnam: '전남',
}

/** 시안 초기값: 제주·경북 컬러, 경남·전남 점선 */
export const INITIAL_STAMPS: Record<RegionId, boolean> = {
  jeju: true,
  gyeongbuk: true,
  gyeongnam: false,
  jeonnam: false,
}

export function toStampList(
  collected: Record<RegionId, boolean>,
): RegionStamp[] {
  return REGION_ORDER.map((id) => ({
    id,
    name: REGION_LABEL[id],
    collected: Boolean(collected[id]),
  }))
}

export function stampProgress(collected: Record<RegionId, boolean>) {
  const total = REGION_ORDER.length
  const count = REGION_ORDER.filter((id) => collected[id]).length
  return { count, total }
}
