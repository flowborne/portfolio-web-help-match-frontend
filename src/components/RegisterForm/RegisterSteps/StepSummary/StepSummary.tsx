import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  recoveryKey: string;
  onCopy: () => void;
}

export const StepSummary: React.FC<Props> = ({ recoveryKey, onCopy }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">
        {t('recoveryMessage')}
      </Typography>
      <TextField
        multiline
        minRows={3}
        value={recoveryKey}
        onCopy={onCopy}
        fullWidth
      />
    </Box>
  );
};
