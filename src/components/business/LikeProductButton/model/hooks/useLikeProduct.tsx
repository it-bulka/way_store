import { useCallback, useMemo } from 'react'
import type { IProduct } from '@/models'
import { productsAction } from '@/redux/reducers/productsSlice.ts'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts'
import { getIsAuthenticated } from '@/redux/selectors/getAuthSelector.ts'
import { useControlModal } from '@/hooks/useControlModal.tsx'
import { getChosenProducts } from '@/redux/selectors/getChosenProducts.ts'
import { useToast } from '@/context/ToastContext.tsx'

export const useLikeProduct = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const chosen = useAppSelector(getChosenProducts)
  const chosenIds = useMemo(() => new Set(chosen.map(p => p.id)), [chosen])
  const { openModal, isModalOpen, closeModal } = useControlModal(false)
  const { addToast } = useToast()

  const onAddToFavorites = useCallback(
    (product: IProduct) => () => {
      if (!isAuthenticated) {
        openModal()
        return
      }
      if (chosenIds.has(product.id)) {
        dispatch(productsAction.deleteChosen(product.id))
        addToast('Видалено з обраного', 'info')
      } else {
        dispatch(productsAction.addChosen(product))
        addToast('Додано до обраного', 'success')
      }
    },
    [dispatch, addToast, isAuthenticated, openModal, chosenIds]
  )

  return {
    chosenIds,
    onAddToFavorites,
    isRestrictModalOpen: isModalOpen,
    closeRestrictModal: closeModal,
  }
}
