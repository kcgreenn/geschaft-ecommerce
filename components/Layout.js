import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useStyles from '../utils/Styles';

export default function Layout({ children, title, description }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title ? `${title} - SprawlMart` : 'SprawlMart'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar className={classes.navbar} position="static">
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>sprawlmart</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved SprawlMart</Typography>
      </footer>
    </div>
  );
}
