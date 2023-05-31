import { createContext,useState } from "react"

export const UserContext = createContext()
UserContext.displayName = 'Usuario'

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState("")
  const [saldo, setSaldo] = useState(0)

  return (
    <UserContext.Provider value={{usuario, setUsuario, saldo, setSaldo}}>
      {children}
    </UserContext.Provider>
  )

}
