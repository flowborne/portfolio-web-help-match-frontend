import { Box, Typography } from "@mui/material"
import { styles } from "./FilterListElement.styles"


interface FilterListElementProps {
    imageSrc: string
    text: string
    isSelected?: boolean
  }
  
  export const FilterListElement = ({ imageSrc, text, isSelected }: FilterListElementProps) => {
    return (
      <Box sx={styles.wrapper}>
        <Box
          sx={{
            ...styles.imageBox,
            border: isSelected ? '5px solid' : 'none',
            borderColor: isSelected ? 'primary.main' : 'transparent'
          }}
        >
          <img src={imageSrc} alt={text}   draggable={false} style={styles.image as React.CSSProperties} />
        </Box>
        <Box sx={styles.textBox}>
          <Typography>{text}</Typography>
        </Box>
      </Box>
    )
  }
  