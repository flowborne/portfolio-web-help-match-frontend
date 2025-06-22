import React, { useState, useEffect } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { styles } from './AccountSettingsTabs.styles'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AccountTab } from './Tabs/AccountTab/AccountTab'
import { TabPanelProps } from '~types/tabPanel'
import { useTranslation } from 'react-i18next'
import { ProductsTab } from './Tabs/ProductsTab/ProductsTab'
import InventoryIcon from '@mui/icons-material/Inventory';

export const AccountSettingsTabs: React.FC = () => {
  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const { t } = useTranslation();
  const tabMapping = [
    'yourAccount',
    'yourProducts'
  ]

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
    navigate(`?tab=${tabMapping[newValue]}`)
  }

  const settingsTabsProps = (index: number) => ({
    id: `settings-${index}`,
    'aria-controls': `settings-tabpanel-${index}`
  })

  const CustomTabPanel: React.FC<TabPanelProps & { style?: React.CSSProperties }> = ({ children, value, index, ...other }) => (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tabParam = params.get('tab')
    if (tabParam) {
      const idx = tabMapping.indexOf(tabParam)
      if (idx !== -1) setTab(idx)
    }
  }, [])

  return (
    <Box sx={styles.rootBox}>
      <Box sx={styles.tabsBox}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label='Account settings tabs'
          sx={styles.taskCreationTab}
        >
          <Tab
            icon={<AccountCircleIcon sx={styles.icon} />}
            iconPosition='start'
            label={t('accountSettings.yourAccount')}
            sx={styles.tab}
            {...settingsTabsProps(0)}
          />
            <Tab
            icon={<InventoryIcon sx={styles.icon} />}
            iconPosition='start'
            label={t('accountSettings.yourProducts')}
            sx={styles.tab}
            {...settingsTabsProps(1)}
          />

        </Tabs>
      </Box>

      <CustomTabPanel value={tab} index={0} >
        <AccountTab />
      </CustomTabPanel>
        <CustomTabPanel value={tab} index={1} >
        <ProductsTab />
      </CustomTabPanel>

    </Box>
  )
}