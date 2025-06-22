import { SxProps, Theme } from "@mui/system"

export const styles: { [key: string]: SxProps<Theme> } = {
  wrapper: {
    width: '100px',
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageBox: {
    borderRadius: '360px',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'transparent' 
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  textBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  }
}
