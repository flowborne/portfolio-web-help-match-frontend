import React, { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { FormContainer } from '~components/FormContainer/FormContainer'
import { PhotoGallery } from '~components/PhotoGallery/PhotoGallery'
import { ProductInfoBlock } from '~components/ProductInfoBlock/ProductInfoBlock'
import { useHTTP } from '~hooks/http.hook'
import { createChatRoom } from '~services/chatService'
import { getProduct } from '~services/productService'
import { styles } from './AdvertisementsProductDetailsLayout.styles'

interface Product {
  _id: string
  name: string
  description: string
  images: string[]
  category: string
  purpose: string
  userId: string
  __v: number
}

interface GetProductResponse {
  task: Product
}

interface ChatRoomResponse {
  roomId: string
  productId: string
  participants: string[]
}

export const AdvertisementsProductDetailsLayout: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { request } = useHTTP()
  const [product, setProduct] = useState<Product | null>(null)
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true)

  const goToChat = async (): Promise<void> => {
    if (!productId) return
    try {
      const { roomId } = await createChatRoom(request, productId) as ChatRoomResponse
      navigate(`/chats/${roomId}`)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      if (!productId) return
      try {
        const data = await getProduct(request, productId) as GetProductResponse
        setProduct(data.task)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingProduct(false)
      }
    }
    fetchProduct()
  }, [productId, request])

  if (loadingProduct) {
    return (
      <FormContainer>
        <Box sx={styles.centerBox}>
          <CircularProgress />
        </Box>
      </FormContainer>
    )
  }

  if (!product) {
    return (
      <FormContainer>
        <Box sx={styles.centerBox}>
          <Typography>Продукт не знайдено</Typography>
        </Box>
      </FormContainer>
    )
  }

  return (
    <Box>
      <Box sx={styles.titleContainer}>
        <Typography sx={styles.title} variant='bodyTextSecondary'>
          {product.name}
        </Typography>
      </Box>
      <FormContainer>
        <Box sx={styles.root}>
          <PhotoGallery images={product.images} width={600} height={600} />
          <Box sx={styles.infoBox}>
            <ProductInfoBlock
              description={product.description}
              category={product.category}
              onChatClick={goToChat}
            />
          </Box>
        </Box>
      </FormContainer>
    </Box>
  )
}
