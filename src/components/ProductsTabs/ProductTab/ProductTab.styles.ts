import { SxProps, Theme } from '@mui/system'

export const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    margin: '0px 32px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '58px',
    marginTop: '8px'
  },
  footerBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative'
  },
  paginationBox: {
    flexGrow: 1
  },
  pagination: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  }
}
