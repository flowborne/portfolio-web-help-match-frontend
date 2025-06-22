import React, { useState, FormEvent } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useHTTP } from '~hooks/http.hook';
import { useAuthContext } from '~contexts/auth-context';
import { styles } from './LoginLayout.styles';
import { postLogin } from '~services/authorizationService';

export const LoginLayout: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuthContext();
  const { loading, request } = useHTTP();

  const [inForm, setInForm] = useState({ userName: '', password: '' });
  const [errors, setErrors] = useState({ userName: '', password: '' });

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'userName' && !value) {
      error = t('usernameRequired');
    }
    if (name === 'password') {
      if (!value) {
        error = t('passwordRequired');
      } else if (value.length < 8) {
        error = t('passwordMinLength');
      } else if (!/[A-Z]/.test(value)) {
        error = t('passwordUppercase');
      } else if (!/[0-9]/.test(value)) {
        error = t('passwordNumber');
      } else if (!/[!@#$%^&*]/.test(value)) {
        error = t('passwordSpecialChar');
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const changeInForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInForm(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const isFormValid = () =>
    Object.values(inForm).every(v => v !== '') &&
    Object.values(errors).every(e => e === '');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
    try {
      const data = (await postLogin(request, {
        userName: inForm.userName,
        password: inForm.password
      })) as { accessToken: string; refreshToken: string };
      login(data.accessToken, data.refreshToken);
    } catch {
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={styles.container}>
        <Avatar sx={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signIn')}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={styles.form}>
          <TextField
            autoComplete="username"
            autoFocus
            error={Boolean(errors.userName)}
            fullWidth
            helperText={errors.userName}
            id="userName"
            label={t('username')}
            margin="normal"
            name="userName"
            onChange={changeInForm}
            required
          />
          <TextField
            autoComplete="current-password"
            error={Boolean(errors.password)}
            fullWidth
            helperText={errors.password}
            id="password"
            label={t('password')}
            margin="normal"
            name="password"
            onChange={changeInForm}
            required
            type="password"
          />
          <Box sx={{ width: '100%', textAlign: 'right', mt: 1 }}>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
            >
              {t('forgotPassword')}
            </Link>
          </Box>
          <Button
            disabled={loading || !isFormValid()}
            fullWidth
            sx={styles.submitButton}
            type="submit"
            variant="primaryVariant6"
          >
            {t('signIn')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
