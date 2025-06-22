

export interface CatigoryContextProps {
  selectedFilter :string
  setSelectedFilter: (filter: string) => void,
}

export type CatigoryProviderProps = {
  children: React.ReactNode
}

