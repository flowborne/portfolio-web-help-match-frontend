import { Box } from '@mui/material'
import { styles } from './FormContainer.styles'


interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return (
<Box sx={{ margin: '32px 32px 0px 32px' }}>
    <Box sx={styles.container}>
{children}
    </Box>
</Box>
  )
}


