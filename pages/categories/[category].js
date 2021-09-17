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

const Category = () => {
  const classes = useStyles();
  const router = useRouter();
  const { category } = router.query;
  const [pageIndex, setPageIndex] = useState(0);
  const [catCount, setCatCount] = useState('');

  const handlePaginate = (event, value) => {
    setPageIndex(value);
    window.scrollTo(0, 0);
  };

  const getCount = async () => {
    const { data } = await axios.get(`/api/categories/${category}/count`);
    setCatCount(data.count);
  };

  useEffect(() => {
    getCount();
  }, [catCount]);

  return (
    <Layout>
      <div className={classes.pagiSection}>
        <Page index={pageIndex} category={category} totalResults={catCount} />
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
          Math.round(catCount / 15) > 1
            ? Math.round(catCount / 15) - 1
            : Math.round(catCount / 15)
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
