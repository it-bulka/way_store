import { useCallback, useState } from 'react'

export const useControlModal = (initialState: boolean) => {
  const [isModalOpen, setModalOpen] = useState(initialState)

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  const openModal = useCallback(() => {
    setModalOpen(true)
  }, [])

  const toggleModal = useCallback(() => {
    setModalOpen(prev => !prev)
  }, [])

  return { isModalOpen, closeModal, openModal, toggleModal }
}
