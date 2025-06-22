import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '15px 0 5px 32px'
  },
  title: {
    fontSize: '37px',
    fontWeight: 'bold',
    textAlign: 'left'
  }
}
