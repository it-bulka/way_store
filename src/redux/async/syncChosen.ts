import { createAsyncThunk } from '@reduxjs/toolkit'
import { getChosenFromFirestore, addChosenToFirestore } from '@/services/chosenFirestore'
import type { IProduct } from '@/models/goodsType'
import type { RootState } from '@/redux/store'

export const syncChosen = createAsyncThunk<IProduct[], string>(
  'products/syncChosen',
  async (uid, { getState }) => {
    const local = (getState() as RootState).products.chosen
    const remote = await getChosenFromFirestore(uid)

    const newItems = local.filter(p => !remote.some(r => r.id === p.id))
    await addChosenToFirestore(uid, newItems)

    const localIds = new Set(local.map(p => p.id))
    return [...local, ...remote.filter(r => !localIds.has(r.id))]
  }
)
