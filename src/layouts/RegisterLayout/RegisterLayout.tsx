import { Box, Typography } from '@mui/material'
import { RegisterForm } from '~components/RegisterForm/RegisterForm'
import { styles } from './RegisterLayout.styles'
import { useTranslation } from 'react-i18next';


export const RegisterLayout = () => {
      const { t } = useTranslation();
  return (
        <Box>
        <Box sx={styles.titleContainer}>
          <Typography sx={styles.title} variant='bodyTextSecondary'>
            {t('StepsOfRegistration')}
          </Typography>
        </Box>
        <RegisterForm/>
      </Box>
  )
}


