import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import Logo from '/src/assets/HelpMatch-logo.png';
import { styles } from './ExternalBar.styles';

export const ExternalBar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'uk', label: 'Українська' },
  ];

  const openLangMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElLang(e.currentTarget);
  const closeLangMenu = () => setAnchorElLang(null);
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    closeLangMenu();
  };

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Box sx={{ backgroundColor: '#FFF', margin: '25px 32px 10px', borderRadius: '16px' }}>
        <Toolbar sx={styles.toolbar}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={Logo} alt="HelpMatch Logo" sx={styles.logo} />
            <Typography
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                marginLeft: 1,
                fontSize: '1.25rem'
              }}
            >
              HelpMatch
            </Typography>
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <Tooltip title={t('changeLanguage')}>
              <IconButton onClick={openLangMenu} sx={styles.langButton}>
                <LanguageIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElLang}
              open={Boolean(anchorElLang)}
              onClose={closeLangMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={styles.menu}
            >
              {languages.map(lang => (
                <MenuItem
                  key={lang.code}
                  selected={i18n.language === lang.code}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
