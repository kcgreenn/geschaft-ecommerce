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
    { key: 1, name: 'Dogs', image: '/images/dog1small.jpg', link: '/Dogs' },
    { key: 2, name: 'Cats', image: '/images/cat1small.jpg', link: '/Cats' },
    {
      key: 3,
      name: 'Horses',
      image: '/images/horse1small.jpg',
      link: '/Horses',
    },
    { key: 4, name: 'Birds', image: '/images/bird1small.jpg', link: '/Birds' },
    {
      key: 5,
      name: 'Reptiles',
      image: '/images/reptile1small.jpg',
      link: '/Reptiles and Amphibians',
    },
    // {
    //   name: 'Collars',
    //   image: '/images/collar1small.jpg',
    //   link: '/Collars',
    // },
    {
      key: 6,
      name: 'Fish',
      image: '/images/fish1small.jpg',
      link: '/Fish and Aquatic Pets',
    },
    { key: 7, name: 'Food', image: '/images/food1small.jpg', link: '/Food' },
    // {
    //   name: 'Behavior',
    //   image: '/images/petBehaviorCenter1small.jpg',
    //   link: '/Pet Behavior Center',
    // },
    {
      key: 8,
      name: 'Health Supplies',
      image: '/images/health1small.jpg',
      link: '/Health Supplies',
    },
  ];
  return (
    <Grid container className={classes.catSection}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h1">
          Shop By Category
        </Typography>
      </Grid>
      {categories.map((category) => (
        <Grid item xs={6} md={3} key={category.key}>
          <NextLink href={`/categories${category.link}`} passHref>
            <Link color="secondary" className={classes.catContent}>
              <Avatar
                src={category.image}
                alt={category.name}
                // className={classes.catAvatar}
                style={{ width: '128px', height: '128px' }}
              />
              <Typography variant="h2" component="h2">
                {category.name}
              </Typography>
            </Link>
          </NextLink>
        </Grid>
      ))}
    </Grid>
  );
}
