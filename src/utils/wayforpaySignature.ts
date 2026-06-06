import HmacMD5 from 'crypto-js/hmac-md5'
import type { IWayforpaySignatureFields } from '@/models/paymentType'

export const generateWayforpaySignature = (
  secretKey: string,
  fields: IWayforpaySignatureFields
): string => {
  const parts: Array<string | number> = [
    fields.merchantAccount,
    fields.merchantDomainName,
    fields.orderReference,
    fields.orderDate,
    fields.amount,
    fields.currency,
    ...fields.productName,
    ...fields.productCount,
    ...fields.productPrice,
  ]
  return HmacMD5(parts.join(';'), secretKey).toString()
}
