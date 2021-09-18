import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  Button,
  Card,
  CardActionArea,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
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

  const matches = useMediaQuery('(min-width:600px)');

  const placeHolders = matches ? (
    <div>
      <Grid container className={classes.placeHolderImages}>
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
  ) : (
    <div>
      <Grid container className={classes.placeHolderImages}>
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

        <Grid item xs={6} md={4} className={classes.placeHolderImage}>
          <Skeleton variant="rect" width={'90%'} height={240} />
          <Box pt={0.5}>
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </Box>
        </Grid>
        <Grid item xs={6} md={4} className={classes.placeHolderImage}>
          <Skeleton variant="rect" width={'90%'} height={240} />
          <Box pt={0.5}>
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </Box>
        </Grid>
        <Grid item xs={6} md={4} className={classes.placeHolderImage}>
          <Skeleton variant="rect" width={'90%'} height={240} />
          <Box pt={0.5}>
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </Box>
        </Grid>
        <Grid item xs={6} md={4} className={classes.placeHolderImage}>
          <Skeleton variant="rect" width={'90%'} height={240} />
          <Box pt={0.5}>
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </Box>
        </Grid>
        <Grid item xs={6} md={4} className={classes.placeHolderImage}>
          <Skeleton variant="rect" width={'90%'} height={240} />
          <Box pt={0.5}>
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </Box>
        </Grid>
        <Grid item xs={6} md={4} className={classes.placeHolderImage}>
          <Skeleton variant="rect" width={'90%'} height={240} />
          <Box pt={0.5}>
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );

  if (error) return <div></div>;
  if (!data) return placeHolders;

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={10}>
          <Typography variant="h2" component="h2">
            {category == 'Treats'
              ? 'Buy One Get One Sale on Treats'
              : `Category:&nbsp;${category}`}
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
                      {product.title.length > 39
                        ? product.title.substring(0, 39) + '...'
                        : product.title +
                          '\u00A0'.repeat(39 - product.title.length)}
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
