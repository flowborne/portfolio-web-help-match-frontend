
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { List, ListItemText } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '~contexts/auth-context';
import { useTranslation } from 'react-i18next';
import AdvertisementsIcon from '~assets/icons/Advertisements.svg';
import AdvertisementsActiveIcon from '~assets/icons/AdvertisementsActive.svg';
import ChatIcon from '~assets/icons/chat.svg';
import ChatActiveIcon from '~assets/icons/chatActive.svg';
import Logo from '/src/assets/HelpMatch-logo.png';
import { styles } from './NavBar.styles';
import { useHTTP } from '~hooks/http.hook';
import { postReferalLink } from '~services/referalService';
import { useUserContext } from '~contexts/user-context';

export const NavBar: React.FC = () => {
  const { logout } = useAuthContext();
  const { request } = useHTTP();
  const { i18n, t } = useTranslation();
  const { userData } = useUserContext();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'uk', label: 'Українська' },
  ];

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenLangMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElLang(e.currentTarget);
  const handleCloseLangMenu = () => setAnchorElLang(null);
  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    handleCloseLangMenu();
  };

  const handleCopyReferral = async () => {
    try {
      const data = await postReferalLink(request) as { code?: string };
      const code = data.code || '';
      const domain = import.meta.env.VITE_SERWERPORTDOMEN;
      const link = `${domain}/register/${code}`;
      await navigator.clipboard.writeText(link);
    } catch {
      console.error('Failed to copy referral link');
    }
  };

  const settings = [
    { name: t('logout'), action: () => logout() },
    { name: t('copyReferralLink'), action: handleCopyReferral },
    { name: t('settings'), action: () => navigate('/accountSettings') }
  ];

  const navItems = [
    {
      label: t('advertisements'),
      path: '/advertisements',
      icon: AdvertisementsIcon,
      activeIcon: AdvertisementsActiveIcon,
    },
    {
      label: t('messenger'),
      path: '/chats',
      icon: ChatIcon,
      activeIcon: ChatActiveIcon,
    },
  ];

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Box sx={{ backgroundColor: '#FFF', margin: '25px 32px 10px', borderRadius: '16px' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box component="img" src={Logo} alt="Logo" sx={styles.logo} />
          </Box>

          <List component="nav" sx={styles.navList}>
            {navItems.map(item => (
              <Box
                key={item.label}
                onClick={() => navigate(item.path)}
                onContextMenu={e => { e.preventDefault(); window.open(item.path, '_blank'); }}
                sx={{ ...styles.navItem, cursor: 'pointer' }}
              >
                <Box
                  component="img"
                  src={isActive(item.path) ? item.activeIcon : item.icon}
                  alt={`${item.label} Icon`}
                  sx={styles.icon}
                />
                <ListItemText
                  primary={item.label}
                  sx={{
                    ...styles.listItemText,
                    color: isActive(item.path) ? '#99150E' : '#575F6E',
                  }}
                />
              </Box>
            ))}
          </List>

          <Box />
          <Box sx={styles.container}>
            <Tooltip title={t('changeLanguage')}>
              <IconButton onClick={handleOpenLangMenu} >
                <LanguageIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElLang}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {languages.map(lang => (
                <MenuItem
                  key={lang.code}
                  selected={i18n.language === lang.code}
                  onClick={() => handleChangeLanguage(lang.code)}
                >
                  {lang.label}
                </MenuItem>
              ))}
            </Menu>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <Typography  sx={{ mr: 2 , color:'black'}}>
                {userData.userName}
              </Typography>
              <Tooltip title={t('openSettings')}>
                <IconButton onClick={handleOpenUserMenu} sx={styles.avatarButton}>
                  <Avatar src={userData.avatarUrl} sx={{ width: 30, height: 30 }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              sx={styles.menu}
            >
              {settings.map(setting => (
                <MenuItem
                  key={setting.name}
                  onClick={() => { setting.action(); handleCloseUserMenu(); }}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
