import { Box, Typography } from '@mui/material'
import { ForgotPasswordForm } from '~components/ForgotPasswordForm/ForgotPasswordForm'
import { styles } from './ForgotPasswordLayout.styles'
import { useTranslation } from 'react-i18next';


export const ForgotPasswordLayout = () => {
        const { t } = useTranslation();
  return (
        <Box>
        <Box sx={styles.titleContainer}>
          <Typography sx={styles.title} variant='bodyTextSecondary'>
            {t('StepsOfForgotPassword')}
          </Typography>
        </Box>
  <ForgotPasswordForm />
      </Box>
  )
}
