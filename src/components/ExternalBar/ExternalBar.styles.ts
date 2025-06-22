import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  appBar: {
    height: '70px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    boxShadow: 'none',
    position: 'fixed',
    top: 0,
    zIndex: 5
  },
  toolbar: {
    justifyContent: 'space-between',
    width: '100%'
  },
  logo: {
    marginRight: '15px',
    height: '40px',
    width: '40px',
  },
  langButton: {
    mx: 1,
  },
  menu: {
    mt: '45px'
  }
}
