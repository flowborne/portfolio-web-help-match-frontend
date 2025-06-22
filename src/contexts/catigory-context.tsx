import { createContext, FC, useContext, useState } from 'react'
import { CatigoryContextProps, CatigoryProviderProps } from '~types/catigory'

const CatigoryContext = createContext<CatigoryContextProps>({
    selectedFilter :'', 
    setSelectedFilter: () => {},
})

const CatigoryProvider: FC<CatigoryProviderProps> = ({ children }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('military')

  return (
    <CatigoryContext.Provider
      value={{
        selectedFilter, 
        setSelectedFilter
      }}
    >
      {children}
    </CatigoryContext.Provider>
  )
}

const useCatigoryContext = () => {
  const context = useContext(CatigoryContext)
  if (context === undefined) {
    throw new Error('useCatigoryContext must be used within an AssetsProvider')
  }
  return context
}

export { CatigoryProvider, useCatigoryContext }
