import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  CardActions,
  Typography,
  Button,
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

  return (
    <Layout>
      <Grid container spacing={3} className={classes.saleJumbotron}>
        <Grid item xs={12}>
          <Card>
            <NextLink href="/categories/Food" passHref>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image="/images/saleJumbotron.jpg"
                  title="Buy One Get One Free"
                ></CardMedia>
              </CardActionArea>
            </NextLink>
          </Card>
        </Grid>
        <Grid item xs={12}>
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

        <ShopByCategory />
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.aggregate([{ $sample: { size: 3 } }]);
  db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
