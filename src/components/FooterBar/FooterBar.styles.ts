import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  footerBar: {
    height: '60px',
    width: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    position: 'fixed',
    bottom: 0,
    zIndex: 5
  },
  childrenBox: {
    margin: '0px 32px 0px 32px',
    height: '60px',
    width: '100%',
    display: 'flex'
  }
}
