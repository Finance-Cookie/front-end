import { createContext, useContext, useState, ReactNode } from 'react'

type Product = { id: string; name: string; qty: number }

type Entry = {
  type?: number
  client?: string
  typeName?: string
  products?: Product[]
  freight?: number
  discount?: number
  payment?: string
  description?: string
  value?: number
}

type NewEntryContextType = {
  entry: Entry
  setEntry: React.Dispatch<React.SetStateAction<Entry>>
}

const NewEntryContext = createContext<NewEntryContextType | null>(null)

export function NewEntryProvider({ children }: { children: ReactNode }) {
  const [entry, setEntry] = useState<Entry>({
    type: undefined,
    typeName: "",
  })

  return (
    <NewEntryContext.Provider value={{ entry, setEntry }}>
      {children}
    </NewEntryContext.Provider>
  )
}

export function useNewEntry() {
  const context = useContext(NewEntryContext)
  if (!context) {
    throw new Error('useNewEntry deve ser usado dentro de NewEntryProvider')
  }
  return context
}