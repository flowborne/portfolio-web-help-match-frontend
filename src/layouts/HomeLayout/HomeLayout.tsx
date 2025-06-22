import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { styles } from './HomeLayout.styles'
import { NavBar } from '~components/NavBar/NavBar'

export const HomeLayout = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.contentContainer}>
       <NavBar />
        <Outlet />
      </Box>
    </Box>
  )
}

