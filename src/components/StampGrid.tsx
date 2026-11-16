import type { RegionStamp } from '../types'

interface StampGridProps {
  stamps: RegionStamp[]
  freshlyEarned?: string[]
}

export function StampGrid({ stamps, freshlyEarned = [] }: StampGridProps) {
  return (
    <div className="stamp-row" aria-label="지역 스탬프">
      {stamps.map((stamp) => (
        <div
          key={stamp.id}
          className={`stamp ${stamp.collected ? 'filled' : 'empty'}${
            freshlyEarned.includes(stamp.id) ? ' fresh' : ''
          }`}
          aria-label={`${stamp.name} ${stamp.collected ? '보유' : '미보유'}`}
        >
          {stamp.name}
        </div>
      ))}
    </div>
  )
}
