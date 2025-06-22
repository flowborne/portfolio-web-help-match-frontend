import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styles } from './AdvertisementsLayout.styles';
import { ProductsTabs } from '~components/ProductsTabs/ProductsTabs';

export const AdvertisementsLayout: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box sx={styles.titleContainer}>
        <Typography sx={styles.title} variant='bodyTextSecondary'>
          {t('advertisements')}
        </Typography>
      </Box>
      <ProductsTabs />
    </Box>
  );
};
