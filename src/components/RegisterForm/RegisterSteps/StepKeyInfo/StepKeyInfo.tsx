import React from 'react';
import { Box, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  formData: {
    userName: string;
    password: string;
    confirmPassword: string;
    agreed: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const StepKeyInfo: React.FC<Props> = ({ formData, setFormData }) => {
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
        label={t('userName')}
        value={formData.userName}
        onChange={e => onChange('userName', e.target.value)}
        fullWidth
      />
      <TextField
        label={t('password')}
        type="password"
        value={formData.password}
        onChange={e => onChange('password', e.target.value)}
        fullWidth
      />
      <TextField
        label={t('confirmPassword')}
        type="password"
        value={formData.confirmPassword}
        onChange={e => onChange('confirmPassword', e.target.value)}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.agreed}
            onChange={e => onChange('agreed', e.target.checked)}
          />
        }
        label={t('agreeRules')}
      />
    </Box>
  );
};
