import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from './ProductsListElement.styles';

export interface ProductsListElementProps {
  imageSrc:    string;
  name:        string;
  description: string;
  showDelete?: boolean;
  onDelete?:   () => void;
}

export const ProductsListElement: React.FC<ProductsListElementProps> = ({
  imageSrc,
  name,
  description,
  showDelete = false,
  onDelete,
}) => {
  return (
    <Box sx={{ ...styles.container, position: 'relative' }}>
      {showDelete && onDelete && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Box
        sx={{
          ...styles.imageBox,
          backgroundImage: `url(${imageSrc})`,
        }}
      />

      <Box sx={styles.contentBox}>
        <Typography variant="subtitle1" sx={styles.nameText}>
          {name}
        </Typography>
        <Typography variant="body2" sx={styles.descriptionText}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
