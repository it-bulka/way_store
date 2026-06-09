import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/base/firebase'
import type { RootState } from '@/redux/store'
import type { IOrder } from '@/models/orderType'

export const fetchOrders = createAsyncThunk<IOrder[], void, { state: RootState }>(
  'orders/fetchOrders',
  async (_, { getState, rejectWithValue }) => {
    const uid = getState().auth.uid
    if (!uid) return rejectWithValue('Not authenticated')
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'orders'))
      return snap.docs.map(d => ({ ...d.data(), id: d.id } as IOrder))
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)
