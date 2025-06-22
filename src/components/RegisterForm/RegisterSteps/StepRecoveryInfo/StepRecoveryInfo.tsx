import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SECURITY_QUESTIONS } from '~components/RegisterForm/securityQuestions.constants';

interface Props {
  formData: {
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
    question3: string;
    answer3: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const StepRecoveryInfo: React.FC<Props> = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const onChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const used = [
    formData.question1,
    formData.question2,
    formData.question3,
  ];

  const renderSelect = (
    qField: 'question1' | 'question2' | 'question3',
    aField: 'answer1' | 'answer2' | 'answer3',
    questionLabelKey: 'recoveryQuestion1' | 'recoveryQuestion2' | 'recoveryQuestion3',
  ) => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>{t(questionLabelKey)}</InputLabel>
        <Select
          value={formData[qField]}
          label={t(questionLabelKey)}
          onChange={e => onChange(qField, e.target.value)}
        >
          {SECURITY_QUESTIONS
            .filter(q => !used.includes(q.value) || q.value === formData[qField])
            .map(q => (
              <MenuItem key={q.value} value={q.value}>
                {t(q.labelKey)}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        label={t('answer')}
        value={formData[aField]}
        onChange={e => onChange(aField, e.target.value)}
        fullWidth
      />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {renderSelect('question1', 'answer1', 'recoveryQuestion1')}
      {renderSelect('question2', 'answer2', 'recoveryQuestion2')}
      {renderSelect('question3', 'answer3', 'recoveryQuestion3')}
    </Box>
  );
};
