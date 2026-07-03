import { createContext, useContext, useState, ReactNode } from 'react'

type Address = {
  neighborhood?: string
  street?: string
  number?: string
}

type Client = {
  name?: string
  phone?: string
  address?: Address
  email?: string
}

type ClientContextType = {
  client: Client
  setClient: React.Dispatch<React.SetStateAction<Client>>
}

const ClientContext = createContext<ClientContextType | null>(null)

export function NewClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<Client>({})

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {children}
    </ClientContext.Provider>
  )
}

export function useNewClient() {
  const context = useContext(ClientContext)
  if (!context) {
    throw new Error('useClient deve ser usado dentro de ClientProvider')
  }
  return context
}