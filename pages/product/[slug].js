import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
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
  Modal,
  Divider,
  useMediaQuery,
} from '@material-ui/core';
import useStyles from '../../utils/Styles';
import db from '../../utils/db';
import Product from '../../Models/Product';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import AlsoBought from '../../components/alsoBought';
import Reviews from '../../components/Reviews';
import Review from '../../Models/Review';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product, alsoBought, reviews } = props;
  const [open, setOpen] = useState(false);
  const matches = useMediaQuery('(min-width:600px)');

  const classes = useStyles();
  const [showMore, setShowMore] = React.useState(false);
  let selectedQuantity = 1;

  if (!product) {
    return <div>Product Not Found</div>;
  }

  useEffect(() => {}, [product]);

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
    setShowMore((showMore) => !showMore);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <Card className={classes.modalContent}>
      <Typography variant="h2" component="h2">
        Description:
      </Typography>
      <Typography>{product.description.substring(0, 2048)}</Typography>
    </Card>
  );

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
            height={480}
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
                  <strong>Rating:</strong>{' '}
                  <Rating name="read-only" readOnly value={product.rating} />
                </Typography>
              </ListItem>

              {product.description.length > 432 ? (
                <div>
                  {matches ? (
                    <div>
                      <ListItem>
                        <Typography className={classes.prodDescItem}>
                          <strong>Description:</strong> {product.description}
                        </Typography>
                      </ListItem>
                      <Divider />
                      <ListItem className={classes.btnCntnr}>
                        <Button
                          type="button"
                          variant="outlined"
                          color="primary"
                          onClick={handleOpen}
                        >
                          Read More
                        </Button>
                      </ListItem>
                      <Modal
                        open={open}
                        className={classes.modal}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                        {body}
                      </Modal>
                    </div>
                  ) : (
                    <div>
                      <ListItem>
                        <Collapse in={showMore} collapsedSize={100}>
                          <Typography className={classes.prodDescItemMobile}>
                            <strong>Description:</strong> {product.description}
                          </Typography>
                        </Collapse>
                      </ListItem>
                      <Divider />
                      <ListItem className={classes.btnCntnr}>
                        <Button
                          type="button"
                          onClick={handleShowMore}
                          variant="outlined"
                          color="primary"
                          className={classes.readMoreBtn}
                        >
                          Read More
                        </Button>
                      </ListItem>
                    </div>
                  )}
                </div>
              ) : (
                <ListItem>
                  <Typography className={classes.prodDescItem}>
                    <strong>Description:</strong> {product.description}
                  </Typography>
                </ListItem>
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
                    <Typography color="primary">
                      {['B001QC0E66', 'B000255OSG', 'B000084DWM'].includes(
                        product.asin
                      ) ? (
                        <span>
                          <emphasis className={classes.strikeThrough}>
                            ${(product.price * 1.2).toFixed(2)}
                          </emphasis>{' '}
                          <strong>${product.price.toFixed(2)}</strong>
                        </span>
                      ) : (
                        <strong>${product.price.toFixed(2)}</strong>
                      )}
                    </Typography>
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
        <AlsoBought alsoBought={alsoBought} />
        <Reviews reviews={reviews} />
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const alsoBought = await Product.find({ category: product.category }, null, {
    limit: 3,
  });
  const reviews = await Review.find({ asin: product.asin });
  db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
      alsoBought: JSON.parse(JSON.stringify(alsoBought)),
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
}
