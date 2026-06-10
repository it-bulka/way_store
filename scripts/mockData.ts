import type { IProduct, ProductType } from '../src/models/goodsType'
import { mockRings } from '../src/data/mock/rings'
import { mockNecklaces } from '../src/data/mock/necklaces'
import { mockBracelets } from '../src/data/mock/bracelets'
import { mockEarrings } from '../src/data/mock/earrings'
import { mockPendants } from '../src/data/mock/pendants'
import { mockWatches } from '../src/data/mock/watches'
import { mockCufflinks } from '../src/data/mock/cufflinks'
import { mockChains } from '../src/data/mock/chains'
import { mockRingsEn } from '../src/data/mock/rings.en'
import { mockNecklacesEn } from '../src/data/mock/necklaces.en'
import { mockBraceletsEn } from '../src/data/mock/bracelets.en'
import { mockEarringsEn } from '../src/data/mock/earrings.en'
import { mockPendantsEn } from '../src/data/mock/pendants.en'
import { mockWatchesEn } from '../src/data/mock/watches.en'
import { mockCufflinksEn } from '../src/data/mock/cufflinks.en'
import { mockChainsEn } from '../src/data/mock/chains.en'

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

export const seedDataEn: Record<ProductType, IProduct[]> = {
  rings: mockRingsEn,
  necklaces: mockNecklacesEn,
  bracelets: mockBraceletsEn,
  earrings: mockEarringsEn,
  pendants: mockPendantsEn,
  watches: mockWatchesEn,
  cufflinks: mockCufflinksEn,
  chains: mockChainsEn,
}
