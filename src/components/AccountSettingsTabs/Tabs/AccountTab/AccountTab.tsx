
import React, { useState, useEffect, ChangeEvent, DragEvent } from 'react';
import { Box, Avatar, Button, CircularProgress, Typography } from '@mui/material';
import { FormContainer } from '~components/FormContainer/FormContainer';
import { useHTTP } from '~hooks/http.hook';
import { useSnackbar } from '~hooks/snackbar.hook';
import { putUser } from '~services/authorizationService';
import { useUserContext } from '~contexts/user-context';
import { useTranslation } from 'react-i18next';


export const AccountTab: React.FC = () => {
  const { request } = useHTTP();
  const { showSnackbar } = useSnackbar();
  const { userData, setUserData } = useUserContext();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(userData.avatarUrl);
  const [dragActive, setDragActive] = useState(false);
  const [saving, setSaving] = useState(false);
const { t } = useTranslation();
  useEffect(() => {
    setPreview(userData.avatarUrl);
  }, [userData.avatarUrl]);

  const handleFile = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const handleSave = async () => {
    if (!preview) {
      showSnackbar('Please select or drop an image first', 'error');
      return;
    }
    setSaving(true);
    try {
      const response = await putUser(request, { avatar: preview }) as { avatarUrl: string };
      const { avatarUrl } = response;
      setUserData({
        ...userData,
        avatarUrl,
      });
      showSnackbar('Avatar updated!', 'success');
    } catch (err: any) {
      showSnackbar(err.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!userData.userId) {
    return (
      <FormContainer>
        <CircularProgress />
      </FormContainer>
    );
  }

  return (
    <FormContainer>

      <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center' }}>
        {userData.userName}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          maxWidth: 360,
          mx: 'auto',
        }}
      >
        <Avatar src={preview || undefined} sx={{ width: 80, height: 80 }} />

        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: '2px dashed',
            borderColor: dragActive ? 'primary.main' : 'grey.400',
            borderRadius: 1,
            p: 2,
            width: '100%',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <input
            id="avatar-upload-input"
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <label htmlFor="avatar-upload-input">
            <Button variant="primaryVariant7" component="span">
              {t('accountSettings.selectImage')}
            </Button>
          </label>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t('accountSettings.dragDrop')}

          </Typography>
        </Box>

        <Button
          variant="primaryVariant6"
          onClick={handleSave}
          disabled={saving || !file}
          startIcon={saving ? <CircularProgress size={20} /> : undefined}
          fullWidth
        >
          {saving ? t('accountSettings.saveChanges') : t('accountSettings.saving')}
        </Button>
      </Box>
    </FormContainer>
  );
};
