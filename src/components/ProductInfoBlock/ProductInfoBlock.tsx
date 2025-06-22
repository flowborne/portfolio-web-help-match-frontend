import React from 'react'
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  Chip,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import ChatIcon from '~assets/icons/chat.svg'
import { styles } from './ProductInfoBlock.styles'

interface ProductInfoBlockProps {
  description: string
  category: string
  onChatClick: () => void
}

export const ProductInfoBlock: React.FC<ProductInfoBlockProps> = ({
  description,
  category,
  onChatClick,
}) => {
  const { t } = useTranslation()
  const userName = 'User name'

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Avatar sx={styles.avatar}>
          {userName.charAt(0)}
        </Avatar>
        <Typography variant="subtitle1" sx={styles.userName}>
          {userName}
        </Typography>
        <IconButton
          onClick={onChatClick}
          sx={styles.chatButton}
          size="small"
        >
          <Box
            component="img"
            src={ChatIcon}
            alt="chat"
            sx={{ width: 30, height: 30 }}
          />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={styles.description}>
        {description}
      </Typography>

      <Chip label={t(`categories.${category}`)} sx={styles.chip} />
    </Box>
  )
}
