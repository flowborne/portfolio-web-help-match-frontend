import React, { useState, useMemo, FormEvent } from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import { useHTTP } from '~hooks/http.hook';
import { useSnackbar } from '~hooks/snackbar.hook';
import { useAuthContext } from '~contexts/auth-context';
import { FormContainer } from '~components/FormContainer/FormContainer';
import { CustomStepper } from '~components/CustomStepper/CustomStepper';
import { StepKeyInfo } from './RegisterSteps/StepKeyInfo/StepKeyInfo';
import { StepRecoveryInfo } from './RegisterSteps/StepRecoveryInfo/StepRecoveryInfo';
import { StepSummary } from './RegisterSteps/StepSummary/StepSummary';
import { FooterBar } from '~components/FooterBar/FooterBar';
import { postLogin, postRegister } from '~services/authorizationService';
import { useParams, useNavigate } from 'react-router-dom';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    agreed: false,
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
    recoveryKey: '',
    copied: false
  });

  const { request } = useHTTP();
  const { showSnackbar } = useSnackbar();
  const { login } = useAuthContext();
    const navigate = useNavigate();
  const { ReferralCode } = useParams<{ ReferralCode?: string }>();


  const validateStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          formData.userName.trim() !== '' &&
          PASSWORD_REGEX.test(formData.password) &&
          formData.password === formData.confirmPassword &&
          formData.agreed
        );
      case 1:
        return (
          formData.question1 &&
          formData.answer1.trim() !== '' &&
          formData.question2 &&
          formData.answer2.trim() !== '' &&
          formData.question3 &&
          formData.answer3.trim() !== ''
        );
      case 2:
        return formData.copied;
      default:
        return false;
    }
  };

  const isStepValid = useMemo(
    () => validateStep(activeStep),
    [activeStep, formData]
  );

  const handleNext = async () => {
    if (activeStep === 1) {
      try {
        const payload = {
          userName: formData.userName,
          password: formData.password,
          securityQuestions: {
            question1: formData.question1,
            answer1: formData.answer1,
            question2: formData.question2,
            answer2: formData.answer2,
            question3: formData.question3,
            answer3: formData.answer3
          }
        };
        const res = await postRegister(request, payload, ReferralCode) as { privateKeyPart: string };
        setFormData(prev => ({ ...prev, recoveryKey: res.privateKeyPart }));
      } catch {
        showSnackbar(t('registrationFailed'), 'error');
        return;
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0 && activeStep < 2) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const payload = {
        userName: formData.userName,
        password: formData.password
      };
      const data = await postLogin(request, payload) as {
        accessToken: string;
        refreshToken: string;
        userId: string;
      };
      login(data.accessToken, data.refreshToken);
      navigate('/platform');
    } catch {
      showSnackbar(t('loginAfterRegistrationFailed'), 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormContainer>
        <CustomStepper
          activeStep={activeStep}
          steps={[
            t('basicInformation'),
            t('recoveryInformation'),
            t('summary')
          ]}
          width={'800px'}
        />

        <Box sx={{ mt: 4 }}>
          {activeStep === 0 && (
            <StepKeyInfo formData={formData} setFormData={setFormData} />
          )}
          {activeStep === 1 && (
            <StepRecoveryInfo
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {activeStep === 2 && (
            <StepSummary
              recoveryKey={formData.recoveryKey}
              onCopy={() =>
                setFormData(prev => ({ ...prev, copied: true }))
              }
            />
          )}
        </Box>
      </FormContainer>

      <FooterBar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            variant="primaryVariant7"
            startIcon={<ArrowBackIosIcon sx={{ width: 16, height: 16 }} />}
            disabled={activeStep !== 1}
            onClick={handleBack}
          >
            {t('lastStep')}
          </Button>

          {activeStep < 2 && (
            <Button
              variant="primaryVariant6"
              onClick={handleNext}
              disabled={!isStepValid}
              endIcon={
                activeStep === 0
                  ? <ArrowForwardIosIcon />
                  : <CheckCircleOutlineIcon />
              }
            >
              {activeStep === 0
                ? t('nextStep')
                : t('sendData')}
            </Button>
          )}

          {activeStep === 2 && (
            <Button
              type="submit"
              variant="primaryVariant6"
              endIcon={<ArrowForwardIosIcon />}
              disabled={!formData.copied}
            >
              {t('goToPlatform')}
            </Button>
          )}
        </Box>
      </FooterBar>
    </Box>
  );
};
