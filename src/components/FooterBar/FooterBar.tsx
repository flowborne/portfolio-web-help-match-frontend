import * as React from 'react'
import Box from '@mui/material/Box'
import { styles } from './FooterBar.styles'


interface FooterBarProps {
  children: React.ReactNode
}

export const FooterBar: React.FC<FooterBarProps> = ({ children }) => {
  return (
    <Box sx={styles.footerBar}>
      <Box sx={styles.childrenBox}>{children}</Box>
    </Box>
  )
}
