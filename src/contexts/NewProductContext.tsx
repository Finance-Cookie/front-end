import { createContext, useContext, useState, ReactNode } from 'react'

type Product = {
  id?: number
  nome?: string
  valor?: number
  descricao?: string
}

type ProductContextType = {
  product: Product
  setProduct: React.Dispatch<React.SetStateAction<Product>>
}

const ProductContext = createContext<ProductContextType | null>(null)

export function NewProductProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product>({})

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useNewProduct() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct deve ser usado dentro de ProductProvider')
  }
  return context
}