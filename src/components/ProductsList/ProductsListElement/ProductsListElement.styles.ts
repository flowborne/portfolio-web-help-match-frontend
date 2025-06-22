import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    width: "100%",
    height: 320,
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    bgcolor: "#fff"
  },
  imageBox: {
    mt: '20px',
    height: "50%",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  contentBox: {
    height: "50%",
    bgcolor: "#fff",
    padding: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  nameText: {
    fontWeight: 500
  },
  descriptionText: {
    color: "text.secondary"
  }
}
