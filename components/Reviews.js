import {
  Avatar,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useStyles from '../utils/Styles';

export default function Reviews({ reviews }) {
  const classes = useStyles();
  if (reviews.length == 0)
    return (
      <Typography variant="h2" component="h2">
        No Reviews
      </Typography>
    );
  return (
    <Grid container className={classes.alsoBoughtSection}>
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          Customer Reviews
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {reviews.map((review) => (
            <ListItem alignItems="flex-start" key={review._id}>
              <ListItemAvatar>
                <Avatar alt={review.reviewerName}>
                  {review.reviewerName.substring(0, 1)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div className={classes.spaceContent}>
                    {review.summary}{' '}
                    <span sx={{ marginLeft: '100px' }}>
                      {
                        <Rating
                          name="read-only"
                          readOnly
                          value={review.rating}
                        />
                      }
                    </span>
                  </div>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <strong>{review.reviewerName}</strong> -
                    </Typography>
                    {review.reviewText}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

Reviews.getInitialProps = async (asin) => {
  const { reviews } = await axios.get(`/api/reviews/${asin}`);
  return { reviews: reviews };
};
