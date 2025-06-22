import { SxProps, Theme } from "@mui/system"

export const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    mt: 4
  },
  innerBox: {
    width: '100%'
  },
  gridItem: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center'
  }
}
