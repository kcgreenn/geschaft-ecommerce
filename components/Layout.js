import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  Badge,
} from '@material-ui/core';
import useStyles from '../utils/Styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Layout({ children, title, description }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - SprawlMart` : 'SprawlMart'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <AppBar className={classes.navbar} position="static">
          <Container>
            <Toolbar className={classes.toolbar}>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>sprawlmart</Typography>
                </Link>
              </NextLink>
              <div className={classes.grow}>
                <Switch
                  checked={darkMode}
                  onChange={darkModeChangeHandler}
                ></Switch>
                <NextLink href="/cart" passHref>
                  <Link>
                    {state.cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={state.cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Link>
                </NextLink>
                <NextLink className={classes.navitems} href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved SprawlMart</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
