import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('auth')

  const handleSignOut = useCallback(() => {
    dispatch(signOutUser())
    navigateTo('/')
  }, [dispatch, navigateTo])

  return (
    <>
      {isAuthenticated ? (
        <>
          <button onClick={() => navigateTo('/account/profile')} aria-label="Profile">
            <PersonIcon />
          </button>
          <button className={cls.signOutBtn} onClick={handleSignOut}>
            {t('signOut')}
          </button>
        </>
      ) : (
        <button className={cls.signInBtn} onClick={openModal}>
          {t('signIn')}
        </button>
      )}
      <AuthModal isOpened={isModalOpen} close={closeModal} overlay="on" />
    </>
  )
})

HeaderAuthControls.displayName = 'HeaderAuthControls'
