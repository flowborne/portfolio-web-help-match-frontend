import React, { useEffect, useState } from "react";
import { Box, Button, Pagination } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { SearchInput } from "~components/SearchInput/SearchInput";
import { styles } from "./ProductTab.styles";
import { FilterList } from "~components/FilterList/FilterList";
import { ProductsList } from "~components/ProductsList/ProductsList";
import { useHTTP } from "~hooks/http.hook";
import { getAllProducts } from "~services/productService";
import { useProductContext } from "~contexts/product-context";
import { useCatigoryContext } from "~contexts/catigory-context";
import { FooterBar } from "~components/FooterBar/FooterBar";
import { useNavigate } from "react-router-dom";

interface ProductTabProps {
  purpose: 'needs' | 'proposals';
}

export const ProductTab: React.FC<ProductTabProps> = ({ purpose }) => {
  const { t } = useTranslation();
  const { setProduct } = useProductContext();
  const { request } = useHTTP();
  const navigate = useNavigate();
  const { selectedFilter } = useCatigoryContext();

  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(request, {
        page: currentPage,
        limit,
        search,
        category: selectedFilter,
        purpose
      });
      setTotalPages(data?.pagination.totalPages ?? 1);
      setProduct(data?.cards || []);
    };
    fetchProducts();
  }, [request, currentPage, limit, search, selectedFilter, purpose]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearch(searchTerm);
    setCurrentPage(1);
  };

  const postForm = async () => {
    navigate('/advertisements/create');
  };

  return (
    <Box>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <SearchInput setSearchTerm={handleSearchChange} />
          <Button
            color="primary"
            startIcon={<AddIcon />}
            variant="primaryVariant6"
            onClick={postForm}
          >
            {t('newAdvertisements')}
          </Button>
        </Box>

        <FilterList />
        <ProductsList />
      </Box>

      <FooterBar>
        <Box sx={styles.footerBox}>
          <Box sx={styles.paginationBox}>
            {currentPage > 0 && (
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
