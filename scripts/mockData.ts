import type { IProduct, ProductType } from '../src/models/goodsType'
import { mockRings } from '../src/data/mock/rings'
import { mockNecklaces } from '../src/data/mock/necklaces'
import { mockBracelets } from '../src/data/mock/bracelets'
import { mockEarrings } from '../src/data/mock/earrings'
import { mockPendants } from '../src/data/mock/pendants'
import { mockWatches } from '../src/data/mock/watches'
import { mockCufflinks } from '../src/data/mock/cufflinks'
import { mockChains } from '../src/data/mock/chains'

export const seedData: Record<ProductType, IProduct[]> = {
  rings: mockRings,
  necklaces: mockNecklaces,
  bracelets: mockBracelets,
  earrings: mockEarrings,
  pendants: mockPendants,
  watches: mockWatches,
  cufflinks: mockCufflinks,
  chains: mockChains,
}
