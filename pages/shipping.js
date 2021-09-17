import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/Styles';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/checkoutWizard';
import axios from 'axios';

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);

  const postShippingAddress = async (shipAddr) => {
    const { data } = await axios.put('/api/users/shipping', {
      params: { userInfo, shipAddr },
    });
  };

  const classes = useStyles();

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    const shipAddr = { fullName, address, city, postalCode, country };
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    if (
      fullName !== userInfo.fullName ||
      address !== userInfo.address ||
      postalCode !== userInfo.postalCode ||
      city !== userInfo.city ||
      country !== userInfo.country
    ) {
      postShippingAddress(shipAddr);
    }
    Cookies.set(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    router.push('/placeOrder');
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <form
        action=""
        onSubmit={handleSubmit(submitHandler)}
        className={classes.form}
      >
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue={userInfo.fullName ? userInfo.fullName : ''}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName ? 'Full Name is required.' : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue={userInfo.address ? userInfo.address : ''}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.address)}
                  helperText={errors.address ? 'Address is required.' : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue={userInfo.city ? userInfo.city : ''}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.city)}
                  helperText={errors.city ? 'City is required.' : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue={userInfo.postalCode ? userInfo.postalCode : ''}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode ? 'Postal Code is required' : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue={userInfo.country ? userInfo.country : ''}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.country)}
                  helperText={errors.country ? 'Country is required.' : ''}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
