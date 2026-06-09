import { memo, useCallback } from 'react'
import PersonIcon from '@/assets/general/person.svg'
import cls from './HeaderAuthControls.module.scss'
import { AuthModal } from '@/components/ui/AuthModal/AuthModal'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getIsAuthenticated } from '@/redux/selectors/getAuthSelector'
import { signOutUser } from '@/redux/async/signOutUser'
import { useControlModal } from '@/hooks/useControlModal'
import { useNavigate } from 'react-router-dom'

export const HeaderAuthControls = memo(() => {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const { isModalOpen, openModal, closeModal } = useControlModal(false)
  const dispatch = useAppDispatch()
  const navigateTo = useNavigate()

  const handleSignOut = useCallback(() => {
    dispatch(signOutUser())
    navigateTo('/')
  }, [dispatch, navigateTo])

  return (
    <>
      {isAuthenticated ? (
        <>
          <button onClick={() => navigateTo('/account/profile')}>
            <PersonIcon />
          </button>
          <button className={cls.signOutBtn} onClick={handleSignOut}>
            Вийти
          </button>
        </>
      ) : (
        <button className={cls.signInBtn} onClick={openModal}>
          Увійти
        </button>
      )}
      <AuthModal isOpened={isModalOpen} close={closeModal} overlay="on" />
    </>
  )
})

HeaderAuthControls.displayName = 'HeaderAuthControls'
