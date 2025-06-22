import React from 'react';
import { Box, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { FilterListElement } from "./FilterListElement/FilterListElement";
import { styles } from "./FilterList.styles";
import { filters } from "./FilterList.constants";
import { useCatigoryContext } from "~contexts/catigory-context";

export const FilterList: React.FC = () => {
  const { t } = useTranslation();
  const { selectedFilter, setSelectedFilter } = useCatigoryContext();

  const handleSelect = (filterValue: string) => {
    setSelectedFilter(filterValue);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerBox}>
        <Grid container spacing={2} justifyContent="center">
          {filters.map(filter => (
            <Grid
              key={filter.value}
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={1.5}
              sx={styles.gridItem}
              onClick={() => handleSelect(filter.value)}
            >
              <FilterListElement
                imageSrc={filter.imageSrc}
                text={t(filter.labelKey)}
                isSelected={selectedFilter === filter.value}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
