import React, { useContext } from 'react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import NextLink from 'next/link';
import axios from 'axios';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Select,
  MenuItem,
  Chip,
  Paper,
  Collapse,
  Divider,
} from '@material-ui/core';
import useStyles from '../../utils/Styles';
import db from '../../utils/db';
import Product from '../../Models/Product';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();
  const [showMore, setShowMore] = React.useState(false);
  let selectedQuantity = 1;

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);

    const quantity = existItem
      ? existItem.quantity + selectedQuantity
      : selectedQuantity;
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

  const updateQuantityHandler = (quantity) => {
    selectedQuantity = quantity;
  };

  const handleCategoryClick = (element) => {
    router.push(`/categories/${element.target.lastChild.data}`);
  };
  const handleBrandClick = (element) => {
    router.push(`/brands/${element.target.lastChild.data}`);
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Layout title={product.title} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1} className={classes.productInfo}>
        <Grid item md={4} xs={12}>
          <Image
            src={product.imageURL}
            alt={product.title}
            width={480}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  {product.title}
                </Typography>
              </ListItem>
              <ListItem className={classes.prodCatSection}>
                <Typography>
                  <strong>Categories:</strong>
                </Typography>
                {product.category.map((category) => (
                  <Chip
                    label={category}
                    onClick={(element) => handleCategoryClick(element)}
                  />
                ))}
              </ListItem>
              <ListItem>
                <Typography>
                  <strong>Brand:&nbsp;</strong>
                </Typography>
                <Chip
                  label={product.brand}
                  onClick={(element) => handleBrandClick(element)}
                >
                  {product.brand}
                </Chip>
              </ListItem>
              <ListItem>
                <Typography>
                  <strong>Rating:</strong> {product.rating} stars ({23} reviews)
                </Typography>
              </ListItem>
              <ListItem className={classes.prodDescLI}>
                <Collapse in={showMore} collapsedSize={212}>
                  <Typography className={classes.prodDescItem}>
                    <strong>Description:</strong> {product.description}
                  </Typography>
                </Collapse>
              </ListItem>
              {product.description.length > 432 ? (
                <div>
                  <Divider />
                  <ListItem className={classes.readMoreBtn}>
                    <Button
                      size="small"
                      color="primary"
                      onClick={handleShowMore}
                    >
                      Read More
                    </Button>
                  </ListItem>
                </div>
              ) : (
                ''
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="primary"> ${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Availability: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0
                        ? `${product.countInStock} Left In Stock`
                        : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Quantity: </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      value={selectedQuantity}
                      onChange={(e) => updateQuantityHandler(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem key={x + 1} value={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <Grid container className={classes.relatedItems}>
        <Typography variant="h1" component="h1">
          Similar Items
        </Typography>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
