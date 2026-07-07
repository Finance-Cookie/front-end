import { createContext, useContext, useState, ReactNode } from 'react'

type PurchaseItem = {
  id: string
  name: string
  value: number
  qty: number
}

type Exit = {
  type?: number
  place?: string
  typeName?: string
  items?: PurchaseItem[]
  freight?: number
  discount?: number
  payment?: string
  description?: string
  value?: number
}

type NewExitContextType = {
  exit: Exit
  setExit: React.Dispatch<React.SetStateAction<Exit>>
}

const NewExitContext = createContext<NewExitContextType | null>(null)

export function NewExitProvider({ children }: { children: ReactNode }) {
  const [exit, setExit] = useState<Exit>({})

  return (
    <NewExitContext.Provider value={{ exit, setExit }}>
      {children}
    </NewExitContext.Provider>
  )
}

export function useNewExit() {
  const context = useContext(NewExitContext)
  if (!context) {
    throw new Error('useNewExit deve ser usado dentro de NewExitProvider')
  }
  return context
}
