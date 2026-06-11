import { useCallback, useEffect, useRef, useState } from 'react'
import { generateWayforpaySignature } from '@/utils/wayforpaySignature'
import type { IWayforpayParams, WayforpayEvent } from '@/models/paymentType'
import type { ICartItem } from '@/redux/types/cartTypes'

const SCRIPT_ID = 'wayforpay-widget'
const SCRIPT_URL = 'https://secure.wayforpay.com/server/pay-widget.js'

const MERCHANT_ACCOUNT = import.meta.env.VITE_WAYFORPAY_MERCHANT_ACCOUNT as string
const MERCHANT_SECRET = import.meta.env.VITE_WAYFORPAY_MERCHANT_SECRET as string

interface IPayOptions {
  orderReference: string
  items: ICartItem[]
  clientFirstName?: string
  clientPhone?: string
  onApproved: () => void
  onDeclined: () => void
  onClose?: () => void
}

interface UseWayforpayReturn {
  isReady: boolean
  pay: (opts: IPayOptions) => void
}

export const useWayforpay = (): UseWayforpayReturn => {
  const [isReady, setIsReady] = useState(false)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (loadedRef.current || document.getElementById(SCRIPT_ID)) {
      setIsReady(true)
      return
    }
    loadedRef.current = true

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_URL
    script.async = true
    script.onload = () => setIsReady(true)
    document.body.appendChild(script)
  }, [])

  const pay = useCallback(
    (opts: IPayOptions) => {
      if (!isReady || !window.Wayforpay) return

      const merchantDomainName = window.location.hostname
      const orderDate = Math.floor(Date.now() / 1000)
      const amount = opts.items.reduce((sum, item) => sum + item.price * item.amount, 0)
      const productName = opts.items.map(item => item.title)
      const productCount = opts.items.map(item => item.amount)
      const productPrice = opts.items.map(item => item.price)

      const merchantSignature = generateWayforpaySignature(MERCHANT_SECRET, {
        merchantAccount: MERCHANT_ACCOUNT,
        merchantDomainName,
        orderReference: opts.orderReference,
        orderDate,
        amount,
        currency: 'UAH',
        productName,
        productCount,
        productPrice,
      })

      const params: IWayforpayParams = {
        merchantAccount: MERCHANT_ACCOUNT,
        merchantDomainName,
        merchantSignature,
        orderReference: opts.orderReference,
        orderDate,
        amount,
        currency: 'UAH',
        productName,
        productCount,
        productPrice,
        clientFirstName: opts.clientFirstName,
        clientPhone: opts.clientPhone,
        language: 'UA',
      }

      const wfp = new window.Wayforpay()
      wfp.run(params, event => {
        const status = event.data as WayforpayEvent | string
        if (status === 'WfpWidgetEventApproved') opts.onApproved()
        else if (status === 'WfpWidgetEventDeclined') opts.onDeclined()
        else if (status === 'WfpWidgetEventClose') opts.onClose?.()
      })
    },
    [isReady]
  )

  return { isReady, pay }
}
