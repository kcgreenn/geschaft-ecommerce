import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  CardActions,
  Typography,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import db from '../utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import Product from '../Models/Product';
import { Store } from '../utils/Store';
import useStyles from '../utils/Styles';
import ShopByCategory from '../components/shopByCategory';

export default function Home(props) {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert('Sorry, product is unavailable.');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    router.push('/cart');
  };

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Layout>
      <Grid container spacing={3} className={classes.saleJumbotron}>
        <Grid item xs={12}>
          <Card>
            <NextLink href="/categories/Treats" passHref>
              <CardActionArea>
                {matches ? (
                  <CardMedia
                    key={1}
                    component="img"
                    image="/images/saleJumbotron.jpg"
                    title="Buy One Get One Free"
                  ></CardMedia>
                ) : (
                  <CardMedia
                    key={2}
                    component="img"
                    image="/images/saleJumbotronMobile.jpg"
                    title="Buy One Get One Free"
                  ></CardMedia>
                )}
              </CardActionArea>
            </NextLink>
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.ddSection}>
          <Typography variant="h1" component="h1">
            Daily Deals
          </Typography>
        </Grid>
        {products.map((product) => (
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
              <CardActions>
                <Typography>
                  <emphasis className={classes.strikeThrough}>
                    ${(product.price * 1.2).toFixed(2)}
                  </emphasis>{' '}
                  <strong>${product.price.toFixed(2)}</strong>
                </Typography>
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

        <ShopByCategory />
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({
    asin: { $in: ['B001QC0E66', 'B000255OSG', 'B000084DWM'] },
  });
  db.disconnect();
  return {
    props: {
      // products: products.map(db.convertDocToObj),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
