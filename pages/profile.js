import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
  Link,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/Styles';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import AddressForm from '../components/profile/AddressForm';

export default function Profile() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/profile');
    }
  }, []);

  const classes = useStyles();

  return (
    <Layout>
      <Typography variant="h1" component="h1">
        <strong>Profile</strong>
      </Typography>
      <AddressForm />
      <Grid item xs={12}>
        <Button
          color="primary"
          variant="outlined"
          fullWidth
          className={classes.pastOrderBtn}
        >
          View Past Orders
        </Button>
      </Grid>
    </Layout>
  );
}
