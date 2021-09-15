import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';
import useStyles from '../utils/Styles';

export default function ShopByCategory() {
  const classes = useStyles();
  const categories = [
    { name: 'Dogs', image: '/images/dog1small.jpg', link: '/Dogs' },
    { name: 'Cats', image: '/images/cat1small.jpg', link: '/Cats' },
    {
      name: 'Horses',
      image: '/images/horse1small.jpg',
      link: '/Horses',
    },
    {
      name: 'Birds',
      image: '/images/bird1small.jpg',
      link: '/Birds',
    },
    {
      name: 'Reptiles',
      image: '/images/reptile1small.jpg',
      link: '/Reptiles',
    },
    {
      name: 'Collars',
      image: '/images/collar1small.jpg',
      link: '/Collars',
    },
    { name: 'Fish', image: '/images/fish1small.jpg', link: '/Fish' },
    {
      name: 'Food',
      image: '/images/food1small.jpg',
      link: '/Food',
    },
    {
      name: 'Behavior',
      image: '/images/petBehaviorCenter1small.jpg',
      link: '/Behavior',
    },
  ];
  return (
    <Grid container spacing={3} className={classes.catSection}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h1">
          Shop By Category
        </Typography>
      </Grid>
      {categories.map((category) => (
        <Grid item xs={12} md={1}>
          <NextLink href={`/categories${category.link}`} passHref>
            <Link color="secondary" className={classes.catContent}>
              <Avatar
                src={category.image}
                alt={category.name}
                className={classes.catAvatar}
              />
              <Typography>{category.name}</Typography>
            </Link>
          </NextLink>
        </Grid>
      ))}
    </Grid>
  );
}
