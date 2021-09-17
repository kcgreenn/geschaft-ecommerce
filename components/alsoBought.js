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
import { Rating } from '@material-ui/lab';
import NextLink from 'next/link';
import useStyles from '../utils/Styles';

export default function AlsoBought({ alsoBought }) {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.alsoBoughtSection}>
      <Grid item xs={12}>
        <Typography variant="h2" component="h2">
          Customers also Bought
        </Typography>
      </Grid>
      {alsoBought.map((product) => (
        <Grid item xs={12} md={4} key={product._id}>
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
                    {product.title.length > 84
                      ? product.title.substring(0, 84) + '...'
                      : product.title.substring(0, 84)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </NextLink>
            <CardActions className={classes.spaceContent}>
              <Typography>${product.price.toFixed(2)}</Typography>
              <Rating name="read-only" readOnly value={product.rating} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
