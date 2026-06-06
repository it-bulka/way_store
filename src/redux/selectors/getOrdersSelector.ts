import type { RootState } from '@/redux/store'
import type { IOrder } from '@/models/orderType'

export const getOrders = (state: RootState): IOrder[] => state.orders.orders
export const getOrdersLoading = (state: RootState): boolean => state.orders.loading
