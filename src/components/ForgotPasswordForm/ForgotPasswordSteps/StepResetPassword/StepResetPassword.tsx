import React from 'react';
import { Box, TextField, } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  formData: {
    password: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const StepResetPassword: React.FC<Props> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const onChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        gap: 2,
      }}
    >
      <TextField
        label={t('newPassword')}
        type="password"
        value={formData.password}
        onChange={e => onChange('password', e.target.value)}
        fullWidth
      />
      <TextField
        label={t('confirmNewPassword')}
        type="password"
        value={formData.confirmPassword}
        onChange={e => onChange('confirmPassword', e.target.value)}
        fullWidth
      />
    </Box>
  );
};
