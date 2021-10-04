import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import BrandPage from '../../components/brandPage';
import useStyles from '../../utils/Styles';
import db from '../../utils/db';
import Product from '../../Models/Product';

export default function Brand({ count, products }) {
  const classes = useStyles();
  const router = useRouter();
  const { brand } = router.query;
  const [pageIndex, setPageIndex] = useState(0);

  const handlePaginate = (event, value) => {
    setPageIndex(value);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className={classes.pagiSection}>
        <BrandPage
          index={pageIndex}
          brand={brand}
          totalResults={count}
          initialProducts={products}
        />
        <div style={{ display: 'none' }}>
          <BrandPage index={pageIndex + 1} brand={brand} totalResults={count} />
        </div>
      </div>
      <Pagination
        count={
          Math.round(count / 15) > 1
            ? Math.round(count / 15) - 1
            : Math.round(count / 15)
        }
        color="secondary"
        page={pageIndex ? pageIndex : 1}
        variant="outlined"
        className={classes.pagination}
        onChange={handlePaginate}
      />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const brand = params.brand;
  await db.connect();
  const count = await Product.count({ brand: brand });
  const products = await Product.find(
    {
      brand: brand,
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
