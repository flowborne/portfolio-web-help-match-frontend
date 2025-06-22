import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  root: {
    p: 2,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  },
  infoBox: {
    mt: '150px',
  },
  centerBox: {
    p: 4,
    textAlign: 'center',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '10px 0px 0px 32px'
  },
  title: {
    fontSize: '37px',
    fontWeight: 'bold',
    textAlign: 'left'
  }
}
