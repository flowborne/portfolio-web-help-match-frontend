import React, { useCallback } from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import { styles } from './SearchInput.styles';

interface SearchInputProps {
  setSearchTerm: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ setSearchTerm }) => {
  const { t } = useTranslation();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchTerm(query);
    }, 150),
    [setSearchTerm]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <Box width={600}>
      <TextField
        sx={styles.commonFieldStyles}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon aria-label={t('search')} sx={{ color: '#bbb' }} />
            </InputAdornment>
          ),
        }}
        fullWidth
        onChange={handleSearchChange}
        placeholder={t('searchPlaceholder')}
        size="small"
      />
    </Box>
  );
};
