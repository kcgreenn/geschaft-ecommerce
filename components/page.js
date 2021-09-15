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

export default function Page({ index, category }) {
  const classes = useStyles();

  const { data, error } = useSWR(
    `/api/categories/${category}/${index}`,
    axios.get
  );
  if (error) return <div></div>;
  if (!data) return <CircularProgress />;

  return (
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
              <Typography>${product.price}</Typography>
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
  );
}
