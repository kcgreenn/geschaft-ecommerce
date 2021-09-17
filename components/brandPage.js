import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Box,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../utils/Styles';
import { Skeleton } from '@material-ui/lab';

export default function BrandPage({ index, brand, totalResults }) {
  const classes = useStyles();

  const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;

  const { data, error } = useSWR(`/api/brands/${brand}/${index}`, axios.get);
  if (error) return <div></div>;
  if (!data)
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={10}>
            <Typography variant="h2" component="h2">
              <Skeleton variant="rect" width="128px" height="12px" />
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h2" component="h2">
              <Skeleton variant="rect" width="128px" height="12px" />
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.placeHolderImages}>
          <Grid item xs={12} className={classes.cpGrid}>
            <CircularProgress />
          </Grid>
          <Grid item xs={12} md={4} className={classes.placeHolderImage}>
            <Skeleton variant="rect" width={320} height={240} />
            <Box pt={0.5}>
              <Skeleton width="75%" />
              <Skeleton width="60%" />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.placeHolderImage}>
            <Skeleton variant="rect" width={320} height={240} />
            <Box pt={0.5}>
              <Skeleton width="75%" />
              <Skeleton width="60%" />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.placeHolderImage}>
            <Skeleton variant="rect" width={320} height={240} />
            <Box pt={0.5}>
              <Skeleton width="75%" />
              <Skeleton width="60%" />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.placeHolderImage}>
            <Skeleton variant="rect" width={320} height={240} />
            <Box pt={0.5}>
              <Skeleton width="75%" />
              <Skeleton width="60%" />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.placeHolderImage}>
            <Skeleton variant="rect" width={320} height={240} />
            <Box pt={0.5}>
              <Skeleton width="75%" />
              <Skeleton width="60%" />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.placeHolderImage}>
            <Skeleton variant="rect" width={320} height={240} />
            <Box pt={0.5}>
              <Skeleton width="75%" />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        </Grid>
      </div>
    );

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={10}>
          <Typography variant="h2" component="h2">
            Brand:&nbsp;{brand}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h2" component="h2">
            {totalResults} results
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.catRoot}>
        {data.data.map((product) => (
          <Grid item md={4} key={product._id}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    className={classes.dailyImg}
                    component="img"
                    image={product.imageURL}
                    title={product.title}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.title.substring(0, 40)}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${round2(product.price).toFixed(2)}</Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCartHandler(product)}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
