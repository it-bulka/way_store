export interface IWayforpayParams {
  merchantAccount: string
  merchantDomainName: string
  merchantSignature: string
  orderReference: string
  orderDate: number
  amount: number
  currency: 'UAH'
  productName: string[]
  productCount: number[]
  productPrice: number[]
  clientFirstName?: string
  clientPhone?: string
  language: 'UA' | 'EN'
}

export type WayforpayEvent =
  | 'WfpWidgetEventApproved'
  | 'WfpWidgetEventDeclined'
  | 'WfpWidgetEventPending'

export interface IWayforpaySignatureFields {
  merchantAccount: string
  merchantDomainName: string
  orderReference: string
  orderDate: number
  amount: number
  currency: string
  productName: string[]
  productCount: number[]
  productPrice: number[]
}
