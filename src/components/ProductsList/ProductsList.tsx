import React from 'react';
import { Box, Grid } from '@mui/material';
import { useProductContext } from '~contexts/product-context';
import { useNavigate } from 'react-router-dom';
import { ProductsListElement } from './ProductsListElement/ProductsListElement';

export interface Product {
  _id:        string;
  userId:     string;
  images:     string[];
  name:       string;
  description:string;
}

export interface ProductsListProps {
  products?: Product[];    
  buildLink?: (productId: string, userId: string) => string;
  showDelete?: boolean;
  onDelete?:   (productId: string) => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products: productsProp,
  buildLink,
  showDelete = false,
  onDelete,
}) => {
  const { product: contextProducts } = useProductContext();
  const navigate = useNavigate();

  const raw = productsProp ?? contextProducts;
  const productsToShow: Product[] = Array.isArray(raw) ? raw : [];

  const makeLink = buildLink
    ?? ((pid, uid) =>
        `/advertisements/product-details/${encodeURIComponent(pid)}/${encodeURIComponent(uid)}`
      );

  const handleClick = (pid: string, uid: string) => {
    navigate(makeLink(pid, uid));
  };

  return (
    <Box sx={{ p: 2, mb: '100px' }}>
      <Grid container spacing={2}>
        {productsToShow.map(item => (
          <Grid
            key={item._id}
            item xs={12} sm={6} md={4} lg={2.4}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleClick(item._id, item.userId)}
          >
            <ProductsListElement
              imageSrc={item.images[0]}
              name={item.name}
              description={item.description}
              showDelete={showDelete}
              onDelete={onDelete ? () => onDelete(item._id) : undefined}
            />
          </Grid>
        ))}

        {productsToShow.length === 0 && (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            No products to display.
          </Box>
        )}
      </Grid>
    </Box>
  );
};
