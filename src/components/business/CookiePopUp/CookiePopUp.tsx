import { type FC } from 'react'
import cls from './CookiePopUp.module.scss'
import { Portal } from '@/components/ui/Portal/Portal'
import { Typography } from '@/components/ui/Typography/Typography'
import { Button } from '@/components/ui/Button/Button'
import { useCookies } from 'react-cookie'
import { getDateExpires } from '@/utils/getDateExpires'

interface CookiePopUpProps {
  className?: string
  onConfirm?: () => void
  onDecline?: () => void
}
const CONSENT_COOKIE = 'consent'

export const CookiePopUp: FC<CookiePopUpProps> = ({ className = '', onConfirm, onDecline }) => {
  const [, setCookie, removeCookie] = useCookies()

  const onConfirmClick = () => {
    setCookie(CONSENT_COOKIE, true, { expires: getDateExpires(180) })
    onConfirm && onConfirm()
  }

  const onDeclineClick = () => {
    removeCookie(CONSENT_COOKIE)
    onDecline && onDecline()
  }

  return (
    <Portal>
      <div className={cls.cookie + ' ' + className}>
        <div className={cls.content + ' container'}>
          <Typography className={cls.info}>
            Мы используем файлы cookie, чтобы обеспечивать правильную работу нашего веб-сайта,
            персонализировать рекламные объявления и другие материалы, обеспечивать работу функций
            социальных сетей и анализировать сетевой трафик. Мы также предоставляем информацию об
            использовании вами нашего веб-сайта своим партнерам по социальным сетям, рекламе и
            аналитическим системам.
          </Typography>

          <div className={cls.btns}>
            <Button title="отмена" onClick={onDeclineClick} />
            <Button title="подвердить" onClick={onConfirmClick} />
          </div>
        </div>
      </div>
    </Portal>
  )
}
