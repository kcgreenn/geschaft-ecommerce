import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import useStyles from '../../utils/Styles';
import Page from '../../components/page';
import db from '../../utils/db';
import Product from '../../Models/Product';

const Category = ({ count, products }) => {
  const classes = useStyles();
  const router = useRouter();
  const { category } = router.query;
  const [pageIndex, setPageIndex] = useState(0);
  const [catCount, setCatCount] = useState('');

  const handlePaginate = (event, value) => {
    setPageIndex(value);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className={classes.pagiSection}>
        <Page
          index={pageIndex}
          category={category}
          totalResults={count}
          initialProducts={products}
        />
        <div style={{ display: 'none' }}>
          <Page
            index={pageIndex + 1}
            category={category}
            totalResults={catCount}
          />
        </div>
      </div>
      <Pagination
        count={
          Math.round(count / 15) > 1
            ? Math.round(count / 15) - 1
            : Math.round(count / 15)
        }
        color="primary"
        page={pageIndex ? pageIndex : 1}
        variant="outlined"
        className={classes.pagination}
        onChange={handlePaginate}
      />
    </Layout>
  );
};

export default Category;

export async function getServerSideProps({ params }) {
  const category = params.category;
  await db.connect();
  const count = await Product.count({ category: category });
  const products = await Product.find(
    {
      category: category,
    },
    null,
    {
      skip: 0,
      limit: 15,
    }
  );
  await db.disconnect();
  return {
    props: {
      count: count,
      products: JSON.parse(JSON.stringify(products)),
    }, // will be passed to the page component as props
  };
}
