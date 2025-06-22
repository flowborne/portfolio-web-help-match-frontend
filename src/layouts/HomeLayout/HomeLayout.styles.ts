import { SxProps, Theme } from '@mui/material/styles'
export const styles: { [key: string]: SxProps<Theme> } = {
  mainContainer: {
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden'
  },
  contentContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    position: 'relative',
    top: '70px'
  }
}
