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
  },
  loader: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    minHeight: 48,
    maxHeight: 72,
    overflow: 'hidden',
  },
  saleJumbotron: {
    marginTop: '5vh',
    marginBottom: '64px',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  catSection: {
    justifyContent: 'space-between',
    borderTop: '1px solid #aaa',
    marginTop: '24px',
  },
  catContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '18px',
  },
  pagiSection: {
    minHeight: '80vh',
  },
  catAvatar: {
    height: 'auto',
    width: '128px',
  },
  pastOrderBtn: {
    marginTop: 48,
  },
  strikeThrough: {
    textDecoration: 'line-through',
  },
  prodDescItem: {
    maxHeight: '196px',
    overflow: 'hidden',
  },
  readMoreBtn: {
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  ddSection: {
    borderTop: '1px solid #aaa',
    marginTop: '24px',
  },
  alsoBoughtSection: {
    marginTop: '24px',
  },
  spaceContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  prodDescLI: {},
});

export default useStyles;
