import { memo, useMemo } from 'react'
import { Accordion } from '@/components/ui/Accordion/Accordion.tsx'
import { useTranslation } from 'react-i18next'
import type { IProduct } from '@/models'

export const GoodsAccordion = memo(({ prod }: { prod: IProduct }) => {
  const { t } = useTranslation('goods')
  const { t: tEnums } = useTranslation('enums')
  const accordionItems = useMemo(
    () => [
      {
        id: '1',
        title: t('details.title'),
        content: (
          <div>
            <p>
              {t('details.material')} {prod.material}
            </p>
            <p>
              {t('details.metal')}{' '}
              {(prod.metal ?? []).map(m => tEnums(`metal.${m}` as never)).join(', ')}
            </p>
            {(prod.stones ?? []).length > 0 && (
              <p>
                {t('details.stones')}{' '}
                {(prod.stones ?? []).map(s => tEnums(`stone.${s}` as never)).join(', ')}
              </p>
            )}
            <p>
              {t('details.weight', { num: prod.weight.num, measurement: prod.weight.measurement })}
            </p>
          </div>
        ),
      },
      {
        id: '2',
        title: t('sizes.title'),
        content: prod.sizes?.length ? (
          <p>{t('sizes.available', { sizes: prod.sizes.join(', ') })}</p>
        ) : (
          <p>{t('sizes.universal')}</p>
        ),
      },
      {
        id: '3',
        title: t('care.title'),
        content: (
          <div>
            {(prod.metal ?? []).map(m => (
              <p key={m}>{tEnums(`careInstructions.${m}` as never)}</p>
            ))}
          </div>
        ),
      },
      {
        id: '4',
        title: t('delivery.title'),
        content: (
          <div>
            {tEnums('deliveryInfo')
              .split('\n\n')
              .map((line, i) => (
                <p key={i}>{line}</p>
              ))}
          </div>
        ),
      },
    ],
    [prod, t, tEnums]
  )
  return <Accordion items={accordionItems} />
})
