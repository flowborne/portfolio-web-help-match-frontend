import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { styles } from './AdvertisementsCreationForm.styles';
import { ImageUploadList } from '~components/ImageUploadCard/ImageUploadCard';
import { FooterBar } from '~components/FooterBar/FooterBar';
import { useNavigate, useParams } from 'react-router-dom';
import { useHTTP } from '~hooks/http.hook';
import { createProduct, getProduct, putProduct} from '~services/productService';
import { FormContainer } from '~components/FormContainer/FormContainer';
import { CATEGORY_OPTIONS, PURPOSE_OPTIONS } from './AdvertisementsCreationForm.constants';

export const AdvertisementsCreationForm: React.FC = () => {
  const { t } = useTranslation();
  const { request } = useHTTP();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    purpose: '',
    description: '',
    uploadedImages: [] as string[],
  });
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    if (!productId) return;
    const fetchProductDetails = async () => {
      try {
        const resp = (await getProduct(request, productId)) as any;
        const product = resp.task;
        setFormData({
          name: product.name,
          category: product.category,
          purpose: product.purpose,
          description: product.description,
          uploadedImages: product.images,
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [request, productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };
  const handlePurposeChange = (e: SelectChangeEvent<string>) => {
    setFormData(prev => ({ ...prev, purpose: e.target.value }));
  };
  const handleImagesUpdate = (imgs: string[]) => {
    setFormData(prev => ({ ...prev, uploadedImages: imgs }));
  };

  const isFormInvalid =
    !formData.name.trim() ||
    !formData.category ||
    !formData.purpose ||
    !formData.description.trim() ||
    formData.uploadedImages.length === 0;

  const handleSave = async () => {
    const payload = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      images: formData.uploadedImages,
      purpose: formData.purpose,
    };

    if (productId) {
      await putProduct(request,payload,productId);
    } else {
      await createProduct(request, payload);
    }
    navigate(-1);
  };

  return (
    <Box>
      <FormContainer>
        <Typography variant="h6">
          {productId ? t('editAdvertisement') : t('basicInformation')}
        </Typography>
        <Box sx={styles.row}>
          <TextField
            fullWidth
            label={t('advertisementName')}
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={styles.textField}
          />
          <FormControl fullWidth sx={styles.formControl}>
            <InputLabel id="category-label">{t('category')}</InputLabel>
            <Select
              labelId="category-label"
              label={t('category')}
              value={formData.category}
              onChange={handleCategoryChange}
            >
              {CATEGORY_OPTIONS.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={styles.formControl}>
            <InputLabel id="purpose-label">{t('purpose')}</InputLabel>
            <Select
              labelId="purpose-label"
              label={t('purpose')}
              value={formData.purpose}
              onChange={handlePurposeChange}
            >
              {PURPOSE_OPTIONS.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h6">{t('uploadImages')}</Typography>
        <Box sx={{ mb: 3 }}>
          <ImageUploadList
            maxImages={5}
            uploadedImages={formData.uploadedImages}
            onImagesUpdate={handleImagesUpdate}
          />
        </Box>
        <Typography variant="h6">{t('description')}</Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
      </FormContainer>
      <FooterBar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIosIcon sx={{ width: 16, height: 16 }} />}
            variant="primaryVariant7"
          >
            {t('backToAll')}
          </Button>
          <Button
            onClick={handleSave}
            startIcon={productId ? <EditIcon /> : <CheckCircleOutlineIcon />}
            variant="primaryVariant6"
            disabled={isFormInvalid}
          >
            {productId ? t('edit') : t('create')}
          </Button>
        </Box>
      </FooterBar>
    </Box>
  );
};
