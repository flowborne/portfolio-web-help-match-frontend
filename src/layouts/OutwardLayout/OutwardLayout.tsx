import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { styles } from './OutwardLayout.styles'
import { ExternalBar } from '~components/ExternalBar/ExternalBar'

export const OutwardLayout = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.contentContainer}>
       <ExternalBar />
        <Outlet />
      </Box>
    </Box>
  )
}

