import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import NextLink from 'next/link';
import useStyles from '../utils/Styles';

export default function Page({ index, category, totalResults }) {
  const classes = useStyles();

  const { data, error } = useSWR(
    `/api/categories/${category}/${index}`,
    axios.get
  );

  const round2 = (number) => Math.round(number * 100 + Number.EPSILON) / 100;

  if (error) return <div></div>;
  if (!data)
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={10}>
          <Typography variant="h2" component="h2">
            Category:&nbsp;{category}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h2" component="h2">
            {index == 0 ? 1 : (index - 1) * 12} - {index == 0 ? 12 : index * 12}{' '}
            of {totalResults} results
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.catRoot}>
        {data.data.map((product) => (
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
                      {product.title.length > 84
                        ? product.title.substring(0, 84) + '...'
                        : product.title.substring(0, 84)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <Typography>${round2(product.price).toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add To Cart
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
