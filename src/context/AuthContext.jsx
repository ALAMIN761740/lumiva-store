import { createContext, useContext, useMemo, useState } from 'react'
import * as auth from '../services/authService'

const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => auth.getSession())

  const value = useMemo(
    () => ({
      user,
      register: async (data) => setUser(await auth.register(data)),
      login: async (data) => setUser(await auth.login(data)),
      logout: () => {
        auth.logout()
        setUser(null)
      },
      updateProfile: async (patch) => setUser(await auth.updateProfile(user.id, patch)),
    }),
    [user],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
