import { SystemStyleObject, Theme } from '@mui/system'

export const styles: Record<string, SystemStyleObject<Theme>> = {
  root: { position: 'relative', overflow: 'hidden', borderRadius: 2 },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'grey.100',
    borderRadius: 2,
  },
  emptyText: { color: 'text.secondary' },
  container: { width: '100%', height: '100%' },
  image: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: 8,
    transform: 'translateY(-50%)',
    bgcolor: 'rgba(255,255,255,0.7)',
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: 8,
    transform: 'translateY(-50%)',
    bgcolor: 'rgba(255,255,255,0.7)',
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 1,
  },
  dot: { width: 8, height: 8, borderRadius: '50%' },
}
