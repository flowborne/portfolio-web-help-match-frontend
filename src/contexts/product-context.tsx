import { createContext, FC, useContext, useState } from 'react'
import { ProductContextProps, ProductProviderProps, ProductsData } from '~types/product'


const ProductContext = createContext<ProductContextProps>({
    product: [],
    setProduct:() => {},
})

const ProductProvider: FC<ProductProviderProps> = ({ children }) => {
    const [product, setProduct] = useState<ProductsData[]>([])
  return (
    <ProductContext.Provider
      value={{
        product, 
        setProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

const useProductContext = () => {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within an AssetsProvider')
  }
  return context
}

export { ProductProvider, useProductContext }
