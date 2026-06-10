import { auth } from '@/base/firebase'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'

export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const user = auth.currentUser
  if (!user) throw { code: 'auth/user-not-found' }
  const credential = EmailAuthProvider.credential(email, oldPassword)
  await reauthenticateWithCredential(user, credential)
  await updatePassword(user, newPassword)
}
