import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useStyles from '../utils/Styles';

export default function Placeholders() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:800px');
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
  return placeHolders;
}
