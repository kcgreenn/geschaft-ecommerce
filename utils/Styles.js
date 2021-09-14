import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  main: {
    minHeight: '80vh',
  },
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
    marginLeft: 20,
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  grow: {},
  navitems: {
    marginLeft: 20,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  productInfo: {
    minHeight: '70vh',
  },
  relatedItems: {
    minHeight: '15vh',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth: {
    width: '100%',
  },
  dailyImg: {
    height: '256px',
  },
});

export default useStyles;
