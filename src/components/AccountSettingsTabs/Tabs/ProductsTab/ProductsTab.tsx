
import React, { useEffect, useState } from 'react';
import { Box, Pagination, CircularProgress, Typography } from '@mui/material';
import { ProductsList, Product } from '~components/ProductsList/ProductsList';
import { useUserContext } from '~contexts/user-context';
import { useHTTP } from '~hooks/http.hook';
import { useSnackbar } from '~hooks/snackbar.hook';
import { getUserProducts, deleteProduct } from '~services/productService';
import { FooterBar } from '~components/FooterBar/FooterBar';
import { styles } from './ProductTab.styles';

export const ProductsTab: React.FC = () => {
  const { userData } = useUserContext();
  const { request } = useHTTP();
  const { showSnackbar } = useSnackbar();

  const [products, setProducts]     = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const limit = 10;

  const fetchPage = async (page: number) => {
    if (!userData.userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProducts(request, userData.userId, {
        page,
        limit,
        search: '',
        category: '',
      });
      const list: Product[] = Array.isArray(data)
        ? data
        : Array.isArray((data as any).tasks)
          ? (data as any).tasks
          : [];
      setProducts(list);
      setTotalPages((data as any).pagination?.totalPages || 1);
    } catch (err: any) {
      console.error('Failed to load user products', err);
      setError(err.message || 'Error loading products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(currentPage);
  }, [userData.userId, currentPage, request]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (productId: string) => {
    setProducts(prev => prev.filter(p => p._id !== productId));
    try {
      await deleteProduct(request, productId);
      showSnackbar('Product deleted', 'success');
    } catch (err: any) {
      console.error('Delete failed', err);
      showSnackbar(err.message || 'Delete failed', 'error');
      fetchPage(currentPage);
    }
  };

  return (
    <Box>
      <Box sx={styles.container}>
        {loading && <CircularProgress />}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {!loading && !error && (
          <ProductsList
            buildLink={((pid, uid) =>`/accountSettings/product-details/${encodeURIComponent(pid)}/${encodeURIComponent(uid)}`)}
            products={products}
            showDelete
            onDelete={handleDelete}
          />
        )}
      </Box>

      <FooterBar>
        <Box sx={styles.footerBox}>
          <Box sx={styles.paginationBox}>
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                sx={styles.pagination}
              />
            )}
          </Box>
        </Box>
      </FooterBar>
    </Box>
  );
};
