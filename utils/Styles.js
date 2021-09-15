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
  searchBar: {
    minWidth: '40%',
    maxHeight: '50px',
  },
  prodCatSection: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: 4,
    },
  },
  pagination: {
    width: '100%',
    margin: '24px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  catRoot: {
    flexGrow: 1,
    margin: '36px 0',
  },
  cardTitle: {
    minHeight: 48,
  },
  saleJumbotron: {
    marginTop: '64px',
    marginBottom: '64px',
  },
  catSection: {
    justifyContent: 'space-between',
  },
  catContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagiSection: {
    minHeight: '80vh',
  },
  catAvatar: {
    height: 84,
    width: 84,
    marginBottom: 24,
  },
});

export default useStyles;
