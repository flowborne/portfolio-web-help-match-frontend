
import { SxProps, Theme } from '@mui/system';

export const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    width: '100%',
    padding: '0 32px',
    bgcolor: '#fff',
    borderRadius: '8px',
  },
  row: {
    display: 'flex',
    gap: '15px',
    marginBottom: '16px',
  },
  textField: {
    flex: 1,
  },
  formControl: {
    flex: 1,
  },
};
