import type { IProduct } from '@/models/goodsType'
import { mockRings } from './mock/rings'
import { mockNecklaces } from './mock/necklaces'
import { mockBracelets } from './mock/bracelets'
import { mockEarrings } from './mock/earrings'
import { mockPendants } from './mock/pendants'
import { mockWatches } from './mock/watches'
import { mockCufflinks } from './mock/cufflinks'
import { mockChains } from './mock/chains'

export const mockProducts: IProduct[] = [
  ...mockRings,
  ...mockNecklaces,
  ...mockBracelets,
  ...mockEarrings,
  ...mockPendants,
  ...mockWatches,
  ...mockCufflinks,
  ...mockChains,
]
