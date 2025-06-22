import React, { useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import UploadIcon from '~assets/icons/upload.svg';
import { styles } from './ImageUploadCard.styles';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

export interface ImageUploadListProps {
  maxImages: number;
  uploadedImages: string[];
  onImagesUpdate: (images: string[]) => void;
}

export const ImageUploadList: React.FC<ImageUploadListProps> = ({
  maxImages,
  uploadedImages = [],
  onImagesUpdate,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    onImagesUpdate(uploadedImages);
  }, [uploadedImages, onImagesUpdate]);

  const handleFiles = (files: FileList) => {
    const newImages = [...uploadedImages];
    Array.from(files).forEach((file) => {
      if (newImages.length < maxImages) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          if (!newImages.includes(base64String)) {
            newImages.push(base64String);
          }
          onImagesUpdate(newImages);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadedImages.length >= maxImages) return;
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    onImagesUpdate(newImages);
  };

  return (
    <Box sx={styles.container}>
      {uploadedImages.map((image, index) => (
        <Box key={index} sx={styles.imageBox(image)}>
          <IconButton
            draggable="false"
            onClick={() => handleRemoveImage(index)}
            sx={styles.closeButton}
          >
            <CloseIcon sx={styles.closeIcon} />
          </IconButton>
          <Box
            alt={t('uploadedImageAlt', { index: index + 1 })}
            component="img"
            draggable="false"
            onDragStart={(e) => e.preventDefault()}
            src={image}
            sx={styles.image}
          />
        </Box>
      ))}
      {uploadedImages.length < maxImages && (
        <Box sx={styles.imageBox(null)}>
          <label htmlFor="contained-button-file">
            <IconButton
              component="span"
              draggable="false"
              sx={styles.addIconBox}
            >
              <Box
                alt={t('fileIconAlt')}
                component="img"
                draggable="false"
                onDragStart={(e) => e.preventDefault()}
                src={UploadIcon}
              />
              <Typography sx={styles.addText}>
                {t('uploadReferenceOrDrag')}
              </Typography>
            </IconButton>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              onChange={handleUploadClick}
              style={{ display: 'none' }}
              type="file"
            />
          </label>
        </Box>
      )}
    </Box>
  );
};
