import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import type { IOrder } from '@/models/orderType'
import { createOrderDoc } from '@/services/createOrderDoc'

export const createOrder = createAsyncThunk<IOrder, Omit<IOrder, 'id'>, { state: RootState }>(
  'orders/createOrder',
  async (orderData, { getState, rejectWithValue }) => {
    const uid = getState().auth.uid
    if (!uid) return rejectWithValue('Користувач не авторизований')
    try {
      const docRef = await createOrderDoc(uid, orderData)
      return { ...orderData, id: docRef.id }
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  }
)
