import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabPanelProps } from '~types/tabPanel';
import { styles } from './ProductsTabs.styles';
import { ProductTab } from './ProductTab/ProductTab';

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && <Box sx={{ textTransform: 'none' }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ProductsTabs: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const tabMapping: Array<'needs' | 'proposals'> = ['needs', 'proposals'];
  const [value, setValue] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as 'needs' | 'proposals' | null;
    const idx = tab ? tabMapping.indexOf(tab) : -1;
    setValue(idx === -1 ? 0 : idx);
  }, [location.search, tabMapping]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(`?tab=${tabMapping[newValue]}`);
  };

  return (
    <Box sx={styles.rootBox}>
      <Tabs aria-label="product tabs" onChange={handleChange} value={value}>
        <Tab
          label={t('purposes.needs')}
          {...a11yProps(0)}
          sx={{ ...styles.taskCreationTab, textTransform: 'none' }}
        />
        <Tab
          label={t('purposes.proposals')}
          {...a11yProps(1)}
          sx={{ ...styles.resultsTabLabel, textTransform: 'none' }}
        />
      </Tabs>

      <CustomTabPanel index={0} value={value}>
        <ProductTab purpose="needs" />
      </CustomTabPanel>
      <CustomTabPanel index={1} value={value}>
        <ProductTab purpose="proposals" />
      </CustomTabPanel>
    </Box>
  );
};
