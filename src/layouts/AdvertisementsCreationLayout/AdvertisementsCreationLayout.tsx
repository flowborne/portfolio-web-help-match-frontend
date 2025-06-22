import { Box, Typography } from '@mui/material'
import { AdvertisementsCreationForm } from '~components/AdvertisementsCreationForm/AdvertisementsCreationForm'
import { styles } from './AdvertisementsCreationLayout.styles'
import { useTranslation } from 'react-i18next';


export const AdvertisementsCreationLayout = () => {
    const { t } = useTranslation();
  return (
    <Box>
    <Box sx={styles.titleContainer}>
      <Typography sx={styles.title} variant='bodyTextSecondary'>
        {t('createNewAdvertisements')}
      </Typography>
    </Box>
    <AdvertisementsCreationForm />
  </Box>
  )
}


