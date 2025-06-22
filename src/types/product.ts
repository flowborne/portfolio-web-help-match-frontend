

export interface ProductContextProps {
    product: ProductsData[]
    setProduct: React.Dispatch<React.SetStateAction<ProductsData[]>>
  }
  
  export type ProductProviderProps = {
    children: React.ReactNode
  }
  

  export interface ProductsData {
    _id: string
    userId: string
    name: string
    description: string
    category: string
    images: string[]
}

export interface ProductsDataResponse {
    cards: ProductsData[]
    pagination: {
      totalPages: number;
    };
}

export interface GetAllProductsParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  purpose?: 'needs' | 'proposals'; 
}


