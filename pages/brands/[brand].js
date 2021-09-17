import { Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import BrandPage from '../../components/brandPage';
import useStyles from '../../utils/Styles';

export default function Brand() {
  const classes = useStyles();
  const router = useRouter();
  const { brand } = router.query;
  const [pageIndex, setPageIndex] = useState(0);
  const [brandCount, setBrandCount] = useState(0);

  const handlePaginate = (event, value) => {
    setPageIndex(value);
    window.scrollTo(0, 0);
  };

  const getCount = async () => {
    const { data } = await axios.get(`/api/brands/${brand}/count`);
    setBrandCount(data.count);
  };

  useEffect(() => {
    getCount();
  }, [brandCount]);

  return (
    <Layout>
      <div className={classes.pagiSection}>
        <BrandPage index={pageIndex} brand={brand} totalResults={brandCount} />
        <div style={{ display: 'none' }}>
          <BrandPage
            index={pageIndex + 1}
            brand={brand}
            totalResults={brandCount}
          />
        </div>
      </div>
      <Pagination
        count={
          Math.round(brandCount / 15) > 1
            ? Math.round(brandCount / 15) - 1
            : Math.round(brandCount / 15)
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
