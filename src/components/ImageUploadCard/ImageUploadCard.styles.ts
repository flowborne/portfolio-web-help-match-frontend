export const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1
  },
  imageBox: (image: string | null) => ({
    width: 220,
    height: 220,
    border: image ? 'none' : '4px dashed #0000001A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: 4,
    margin: '5px 15px 0px 0px',
    background: image ? 'none' : '#f5f5f5'
  }),

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
    p: 0.3
  },
  addIconBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    borderRadius: 4
  },
  closeIcon: {
    fontSize: 15
  },
  addIcon: {
    fontSize: 24,
    color: 'gray'
  },
  addText: {
    color: 'gray',
    fontSize: 12
  }
}
