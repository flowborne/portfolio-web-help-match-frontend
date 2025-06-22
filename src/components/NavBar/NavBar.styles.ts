import { SxProps, Theme } from '@mui/material/styles'
export const styles: { [key: string]: SxProps<Theme> } = {
  appBar: {
    height: '70px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    boxShadow: 'none',
    marginLeft: '5px',
    position: 'fixed',
    top: 0,
    zIndex: 5
  },
  menu: {
    mt: '45px'
  },
  avatarButton: {
    p: 0
  },
  menuItem: {
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    minWidth: '100px',
    justifyContent: 'center'
  },
  icon: {
    width: '15px',
    height: '15px'
  },
  listItemText: {
    marginLeft: '8px',
    fontSize: '14px',
    whiteSpace: 'nowrap'
  },
  logo: {
    marginRight: '15px',
    height: '40px',
    width: '40px',
  }
}
