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
import { Controller, useForm } from 'react-hook-form';

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
  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(
        err.response.data ? err.response.data.message : err.message,
        { variant: 'error' }
      );
    }
  };
  if (!userInfo) return <div>hello</div>;
  return (
    <Layout>
      <Typography variant="h1" component="h1">
        <strong>{userInfo.name}'s Profile</strong>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <form action="" onSubmit={submitHandler}>
            <Typography component="h2" variant="h2">
              Email and Password
            </Typography>

            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: 'password' }}
                ></TextField>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                >
                  Update
                </Button>
              </ListItem>
            </List>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <form action="" onSubmit={submitHandler}>
            <Typography component="h2" variant="h2">
              Shipping Address
            </Typography>
            <List>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: 'text' }}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  inputProps={{ type: 'text' }}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: 'text' }}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: 'text' }}
                ></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  inputProps={{ type: 'text' }}
                ></TextField>
              </ListItem>
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                >
                  Update
                </Button>
              </ListItem>
            </List>
          </form>
        </Grid>
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
      </Grid>
    </Layout>
  );
}
