
import React, { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { styles } from './PhotoGallery.styles'

interface PhotoGalleryProps {
  images?: string[]
  width?: number | string
  height?: number | string
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images = [],
  width = 360,
  height = 360,
}) => {
  const [current, setCurrent] = useState(0)
  const count = images.length

  if (count === 0) {
    return (
      <Box sx={{ ...styles.empty, width, height }}>
        <Typography sx={styles.emptyText}>Немає зображень</Typography>
      </Box>
    )
  }

  const prev = () => setCurrent((c) => (c === 0 ? count - 1 : c - 1))
  const next = () => setCurrent((c) => (c + 1) % count)

  return (
    <Box sx={{ ...styles.root, width, height }}>
      <Box
        sx={{
          ...styles.container,
          ...styles.image,
          backgroundImage: `url(${images[current]})`,
        }}
      />

      <IconButton onClick={prev} size="small" sx={styles.arrowLeft}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>

      <IconButton onClick={next} size="small" sx={styles.arrowRight}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>

      <Box sx={styles.pagination}>
        {images.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              ...styles.dot,
              bgcolor: idx === current ? 'primary.main' : 'grey.400',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
