import React, { useState, useMemo, FormEvent } from 'react';
import { Box, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next';
import { useHTTP } from '~hooks/http.hook';
import { useSnackbar } from '~hooks/snackbar.hook';
import { FormContainer } from '~components/FormContainer/FormContainer';
import { CustomStepper } from '~components/CustomStepper/CustomStepper';
import { FooterBar } from '~components/FooterBar/FooterBar';
import { StepRecoveryInfo } from './ForgotPasswordSteps/StepRecoveryInfo/StepRecoveryInfo';
import { StepResetPassword } from './ForgotPasswordSteps/StepResetPassword/StepResetPassword';
import { postValidateReset, postReset, postLogin } from '~services/authorizationService';
import { useAuthContext } from '~contexts/auth-context';
import { useNavigate } from 'react-router-dom';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const { request } = useHTTP();
  const { showSnackbar } = useSnackbar();
  const { login } = useAuthContext();
    const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    userName: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
    privateKeyPart: ''
  });
  const [resetPasswordData, setResetPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);

  const isStepValid = useMemo(() =>
    formData.userName.trim() !== '' &&
    formData.question1 && formData.answer1.trim() !== '' &&
    formData.question2 && formData.answer2.trim() !== '' &&
    formData.question3 && formData.answer3.trim() !== '' &&
    formData.privateKeyPart.trim() !== ''
  , [formData]);

  const isResetValid = useMemo(() =>
    PASSWORD_REGEX.test(resetPasswordData.password) &&
    resetPasswordData.password === resetPasswordData.confirmPassword
  , [resetPasswordData]);

  const handleNext = async () => {
    if (!isStepValid) return;
    setLoading(true);
    try {
      const res = await postValidateReset(request, {
        userName: formData.userName,
        securityQuestions: {
          question1: formData.question1,
          answer1: formData.answer1,
          question2: formData.question2,
          answer2: formData.answer2,
          question3: formData.question3,
          answer3: formData.answer3
        },
        privateKeyPart: formData.privateKeyPart
      }) as { resetToken: string };
      setResetToken(res.resetToken);
      setActiveStep(1);
    } catch {
      showSnackbar(t('verificationFailed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isResetValid) return;
    setLoading(true);
    try {
      await postReset(request, {
        newPassword: resetPasswordData.password,
        resetToken : resetToken
      });
      showSnackbar(t('passwordResetSuccess'), 'success');
          try {
            const payload = {
              userName: formData.userName,
              password: resetPasswordData.password
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
    } catch {
      showSnackbar(t('resetFailed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormContainer>
        <CustomStepper
          activeStep={activeStep}
          steps={[t('preliminaryInfo'), t('passwordRecovery')]}
          width="800px"
        />

        <Box sx={{ mt: 4 }}>
          {activeStep === 0 && (
            <StepRecoveryInfo
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {activeStep === 1 && (
            <StepResetPassword
              formData={resetPasswordData}
              setFormData={setResetPasswordData}
            />
          )}
        </Box>
      </FormContainer>

      <FooterBar>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          {activeStep === 0 && (
            <Button
              variant="primaryVariant6"
              onClick={handleNext}
              disabled={!isStepValid || loading}
              endIcon={<ArrowForwardIosIcon />}
            >
              {t('sendData')}
            </Button>
          )}

          {activeStep === 1 && (
            <Button
              type="submit"
              variant="primaryVariant6"
              disabled={!isResetValid || loading}
            >
              {t('resetPassword')}
            </Button>
          )}
        </Box>
      </FooterBar>
    </Box>
  );
};
