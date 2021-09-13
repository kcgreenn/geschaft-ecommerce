import React, { useContext, useState } from 'react';
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
  Button,
  NoSsr,
  Menu,
  MenuItem,
} from '@material-ui/core';
import useStyles from '../utils/Styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
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
    const newDarkMode = !darkMode;
    dispatch({ type: newDarkMode ? 'DARK_MODE_ON' : 'DARK_MODE_OFF' });
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
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
                <NoSsr>
                  <Switch
                    checked={darkMode}
                    onChange={darkModeChangeHandler}
                  ></Switch>
                </NoSsr>
                <NextLink href="/cart" passHref>
                  <Link className={classes.navitems}>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Link>
                </NextLink>
                {userInfo ? (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleMenuOpen}
                      className={classes.navbarButton}
                    >
                      {userInfo.name}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                      <MenuItem onClick={handleCloseMenu}>My Account</MenuItem>
                      <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <NextLink className={classes.navitems} href="/login" passHref>
                    <Link>Login</Link>
                  </NextLink>
                )}
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
