import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { IOrder } from '@/models/orderType'
import { createOrder } from '@/redux/async/createOrder'
import { fetchOrders } from '@/redux/async/fetchOrders'

interface IOrdersSlice {
  orders: IOrder[]
  loading: boolean
  error: string | null
}

const initialState: IOrdersSlice = {
  orders: [],
  loading: false,
  error: null,
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrder.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.orders.push(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchOrders.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const orderActions = orderSlice.actions
export const { reducer: orderReducer } = orderSlice
