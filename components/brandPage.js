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
  useMediaQuery,
} from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../utils/Styles';
import { Skeleton } from '@material-ui/lab';
import Placeholders from './Placeholders';

export default function BrandPage({
  index,
  brand,
  totalResults,
  initialProducts,
}) {
  const classes = useStyles();

  const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;

  const { data, error } = useSWR(`/api/brands/${brand}/${index}`, axios.get);
  const matches = useMediaQuery('(min-width:600px)');

  if (error) return <div></div>;
  if (!data) return <Placeholders />;
  const dataToMap = index === 0 ? initialProducts : data.data;

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
            {totalResults > 1
              ? totalResults + ' Results'
              : totalResults + ' Result'}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.catRoot}>
        {dataToMap.map((product) => (
          <Grid item xs={6} md={4} key={product._id}>
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
                    <Typography className={classes.cardTitle}>
                      {' '}
                      {product.title.length > 64
                        ? product.title.substring(0, 64) + '...'
                        : product.title +
                          '\u00A0'.repeat(64 - product.title.length)}
                    </Typography>
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
